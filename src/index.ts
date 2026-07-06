/**
 * MCP Server para Dados Meteorológicos do Brasil
 * 
 * Este servidor expõe ferramentas para obter:
 * - Temperatura atual
 * - Previsão do tempo
 * - Dados de precipitação
 * 
 * Usa OpenMeteo como fonte de dados (gratuito, sem autenticação)
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  TextContent
} from '@modelcontextprotocol/sdk/types.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { logger, NivelLog } from './utils/logger.js';
import { cacheGlobal } from './utils/cache.js';
import { OpenMeteoAdapter } from './adapters/OpenMeteoAdapter.js';
import { TemperaturaTool, type ParamsTemperatura } from './tools/temperatureTool.js';
import { PrevisaoTool, type ParamsPrevisao } from './tools/forecastTool.js';
import { PrecipitacaoTool, type ParamsPrecipitacao } from './tools/precipitationTool.js';

// Configurar nível de log
const nivelLog = process.env.LOG_LEVEL === 'debug' ? NivelLog.DEBUG : NivelLog.INFO;
logger.setNivelMinimo(nivelLog);

// Inicializar adapter
const adapter = new OpenMeteoAdapter();

// Inicializar ferramentas
const temperaturaTool = new TemperaturaTool(adapter, cacheGlobal);
const previsaoTool = new PrevisaoTool(adapter, cacheGlobal);
const precipitacaoTool = new PrecipitacaoTool(adapter, cacheGlobal);

// Criar servidor MCP
const server = new Server({
  name: 'mcp-weather-brasil',
  version: '1.0.0'
}, {
  capabilities: {
    tools: {}
  }
});

/**
 * Handler para listar ferramentas disponíveis
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  logger.info('Listando ferramentas disponíveis');
  
  return {
    tools: [
      TemperaturaTool.obterSchema(),
      PrevisaoTool.obterSchema(),
      PrecipitacaoTool.obterSchema()
    ]
  };
});

/**
 * Handler para executar ferramentas
 */
server.setRequestHandler(CallToolRequestSchema, async (request: any) => {
  const nomeFerramenta = request.params.name;
  const parametros = request.params.arguments as Record<string, unknown>;

  logger.info(`Executando ferramenta: ${nomeFerramenta}`, parametros);

  try {
    let resultado: any;

    switch (nomeFerramenta) {
      case 'obter_temperatura_atual':
        resultado = await temperaturaTool.executar(parametros as unknown as ParamsTemperatura);
        break;

      case 'obter_previsao_tempo':
        resultado = await previsaoTool.executar(parametros as unknown as ParamsPrevisao);
        break;

      case 'obter_precipitacao':
        resultado = await precipitacaoTool.executar(parametros as unknown as ParamsPrecipitacao);
        // Calcular resumo
        const resumo = PrecipitacaoTool.calcularResumo(resultado);
        resultado = { dados: resultado, resumo };
        break;

      default:
        throw new Error(`Ferramenta desconhecida: ${nomeFerramenta}`);
    }

    logger.info(`Ferramenta ${nomeFerramenta} executada com sucesso`);

    // Formatar resposta
    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(resultado, null, 2)
        }
      ]
    };
  } catch (erro) {
    const mensagemErro = erro instanceof Error ? erro.message : String(erro);
    logger.error(`Erro ao executar ${nomeFerramenta}`, erro as Error);

    return {
      content: [
        {
          type: 'text' as const,
          text: `Erro ao executar ferramenta: ${mensagemErro}`
        }
      ],
      isError: true
    };
  }
});

/**
 * Inicia o servidor
 */
async function iniciarServidor() {
  const transporte = new StdioServerTransport();

  logger.info('Iniciando MCP Server - Dados Meteorológicos Brasil');
  logger.info(`Adapter: ${adapter.obterNome()}`);
  logger.info('Ferramentas disponíveis:');
  logger.info('  - obter_temperatura_atual');
  logger.info('  - obter_previsao_tempo');
  logger.info('  - obter_precipitacao');

  // Iniciar limpeza periódica do cache
  cacheGlobal.iniciarLimpezaPeriodica(600000); // A cada 10 minutos

  await server.connect(transporte);

  logger.info('MCP Server conectado e pronto para uso');
  logger.info('Aguardando requisições...');
}

// Tratamento de sinais
process.on('SIGINT', () => {
  logger.info('Encerrando servidor...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  logger.info('Encerrando servidor...');
  process.exit(0);
});

// Iniciar
iniciarServidor().catch((erro) => {
  logger.error('Erro ao iniciar servidor', erro);
  process.exit(1);
});

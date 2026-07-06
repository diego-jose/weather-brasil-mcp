/**
 * Ferramenta MCP para obter dados de precipitação
 */

import { CIDADES_BRASIL, DadosPrecipitacao } from '../types/weather.js';
import { Cache } from '../utils/cache.js';
import { logger } from '../utils/logger.js';
import { OpenMeteoAdapter } from '../adapters/OpenMeteoAdapter.js';

export interface ParamsPrecipitacao {
  cidade: string;
  estado?: string;
}

export class PrecipitacaoTool {
  private adapter: OpenMeteoAdapter;
  private cache: Cache;

  constructor(adapter?: OpenMeteoAdapter, cache?: Cache) {
    this.adapter = adapter || new OpenMeteoAdapter();
    this.cache = cache || new Cache(3600);
  }

  /**
   * Normaliza o nome da cidade
   */
  private normalizarCidade(cidade: string): string {
    return cidade.toLowerCase().trim();
  }

  /**
   * Obtém coordenadas de uma cidade
   */
  private obterCoordenadas(cidade: string) {
    const cidadeNormalizada = this.normalizarCidade(cidade);

    if (CIDADES_BRASIL[cidadeNormalizada]) {
      return CIDADES_BRASIL[cidadeNormalizada];
    }

    for (const [chave, coords] of Object.entries(CIDADES_BRASIL)) {
      if (chave.includes(cidadeNormalizada) || cidadeNormalizada.includes(chave)) {
        return coords;
      }
    }

    throw new Error(`Cidade "${cidade}" não encontrada no banco de dados`);
  }

  /**
   * Executa a ferramenta de precipitação
   */
  async executar(params: ParamsPrecipitacao): Promise<DadosPrecipitacao[]> {
    logger.info(`Buscando dados de precipitação para ${params.cidade}`);

    // Gerar chave de cache
    const chaveCachePrecipitacao = Cache.gerarChave('precipitacao', params.cidade);

    // Verificar cache
    const emCache = this.cache.obter<DadosPrecipitacao[]>(chaveCachePrecipitacao);
    if (emCache) {
      logger.info(`Dados de precipitação recuperados do cache para ${params.cidade}`);
      return emCache;
    }

    try {
      // Obter coordenadas da cidade
      const coordenadas = this.obterCoordenadas(params.cidade);
      logger.debug(`Coordenadas obtidas: ${coordenadas.latitude}, ${coordenadas.longitude}`);

      // Chamar adapter
      const precipitacao = await this.adapter.obterPrecipitacao(
        coordenadas,
        params.cidade
      );

      // Armazenar em cache (2 horas para dados de precipitação)
      this.cache.armazenar(chaveCachePrecipitacao, precipitacao, 7200);

      logger.info(`Dados de precipitação obtidos com sucesso para ${params.cidade}`);
      return precipitacao;
    } catch (erro) {
      logger.error(`Erro ao obter dados de precipitação para ${params.cidade}`, erro as Error);
      throw erro;
    }
  }

  /**
   * Calcula resumo de precipitação
   */
  static calcularResumo(dados: DadosPrecipitacao[]): {
    totalMM: number;
    mediaMMDia: number;
    diasComChuva: number;
    precipitacaoMaxima: number;
  } {
    const totalMM = dados.reduce((acc, d) => acc + d.precipitacao, 0);
    const diasComChuva = dados.filter(d => d.precipitacao > 0).length;
    const precipitacaoMaxima = Math.max(...dados.map(d => d.precipitacao), 0);

    return {
      totalMM: Math.round(totalMM * 10) / 10,
      mediaMMDia: Math.round((totalMM / dados.length) * 10) / 10,
      diasComChuva,
      precipitacaoMaxima: Math.round(precipitacaoMaxima * 10) / 10
    };
  }

  /**
   * Obtém o schema da ferramenta para MCP
   */
  static obterSchema() {
    return {
      name: 'obter_precipitacao',
      description: 'Obtém dados de precipitação (chuva) para os próximos dias em uma cidade brasileira. Inclui quantidade de chuva esperada e probabilidade.',
      inputSchema: {
        type: 'object',
        properties: {
          cidade: {
            type: 'string',
            description: 'Nome da cidade brasileira (ex: "São Paulo", "Rio de Janeiro")',
            enum: Object.keys(CIDADES_BRASIL)
          },
          estado: {
            type: 'string',
            description: 'Sigla do estado - opcional'
          }
        },
        required: ['cidade']
      }
    };
  }
}

/**
 * Ferramenta MCP para obter previsão do tempo
 */

import { CIDADES_BRASIL, PrevisaoTempo } from '../types/weather.js';
import { Cache } from '../utils/cache.js';
import { logger } from '../utils/logger.js';
import { OpenMeteoAdapter } from '../adapters/OpenMeteoAdapter.js';

export interface ParamsPrevisao {
  cidade: string;
  dias?: number;
  estado?: string;
}

export class PrevisaoTool {
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
   * Valida e ajusta número de dias
   */
  private validarDias(dias?: number): number {
    if (!dias) return 7;
    if (dias < 1) return 1;
    if (dias > 16) return 16; // Limite máximo do OpenMeteo
    return Math.floor(dias);
  }

  /**
   * Executa a ferramenta de previsão
   */
  async executar(params: ParamsPrevisao): Promise<PrevisaoTempo> {
    const dias = this.validarDias(params.dias);
    logger.info(`Buscando previsão de ${dias} dias para ${params.cidade}`);

    // Gerar chave de cache
    const chaveCachePrevisao = Cache.gerarChave('previsao', params.cidade, dias);

    // Verificar cache
    const emCache = this.cache.obter<PrevisaoTempo>(chaveCachePrevisao);
    if (emCache) {
      logger.info(`Previsão recuperada do cache para ${params.cidade}`);
      return emCache;
    }

    try {
      // Obter coordenadas da cidade
      const coordenadas = this.obterCoordenadas(params.cidade);
      logger.debug(`Coordenadas obtidas: ${coordenadas.latitude}, ${coordenadas.longitude}`);

      // Chamar adapter
      const previsao = await this.adapter.obterPrevisaoTempo(
        coordenadas,
        params.cidade,
        dias
      );

      // Armazenar em cache (1 hora para previsão)
      this.cache.armazenar(chaveCachePrevisao, previsao, 3600);

      logger.info(`Previsão obtida com sucesso para ${params.cidade} (${dias} dias)`);
      return previsao;
    } catch (erro) {
      logger.error(`Erro ao obter previsão para ${params.cidade}`, erro as Error);
      throw erro;
    }
  }

  /**
   * Obtém o schema da ferramenta para MCP
   */
  static obterSchema() {
    return {
      name: 'obter_previsao_tempo',
      description: 'Obtém a previsão do tempo para os próximos dias em uma cidade brasileira. Inclui temperatura máxima, mínima, precipitação, umidade e velocidade do vento.',
      inputSchema: {
        type: 'object',
        properties: {
          cidade: {
            type: 'string',
            description: 'Nome da cidade brasileira (ex: "São Paulo", "Rio de Janeiro")',
            enum: Object.keys(CIDADES_BRASIL)
          },
          dias: {
            type: 'number',
            description: 'Número de dias da previsão (1-16, padrão: 7)',
            minimum: 1,
            maximum: 16,
            default: 7
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

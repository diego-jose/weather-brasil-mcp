/**
 * Ferramenta MCP para obter temperatura atual
 */

import { CIDADES_BRASIL, TemperaturaAtual } from '../types/weather.js';
import { Cache } from '../utils/cache.js';
import { logger } from '../utils/logger.js';
import { OpenMeteoAdapter } from '../adapters/OpenMeteoAdapter.js';

export interface ParamsTemperatura {
  cidade: string;
  estado?: string;
}

export class TemperaturaTool {
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

    // Procura por correspondência exata
    if (CIDADES_BRASIL[cidadeNormalizada]) {
      return CIDADES_BRASIL[cidadeNormalizada];
    }

    // Procura por correspondência parcial
    for (const [chave, coords] of Object.entries(CIDADES_BRASIL)) {
      if (chave.includes(cidadeNormalizada) || cidadeNormalizada.includes(chave)) {
        return coords;
      }
    }

    throw new Error(`Cidade "${cidade}" não encontrada no banco de dados`);
  }

  /**
   * Executa a ferramenta de temperatura
   */
  async executar(params: ParamsTemperatura): Promise<TemperaturaAtual> {
    logger.info(`Buscando temperatura para ${params.cidade}`);

    // Gerar chave de cache
    const chaveCacheTemperatura = Cache.gerarChave('temperatura', params.cidade);
    
    // Verificar cache
    const emCache = this.cache.obter<TemperaturaAtual>(chaveCacheTemperatura);
    if (emCache) {
      logger.info(`Temperatura recuperada do cache para ${params.cidade}`);
      return emCache;
    }

    try {
      // Obter coordenadas da cidade
      const coordenadas = this.obterCoordenadas(params.cidade);
      logger.debug(`Coordenadas obtidas: ${coordenadas.latitude}, ${coordenadas.longitude}`);

      // Chamar adapter
      const temperatura = await this.adapter.obterTemperaturaAtual(
        coordenadas,
        params.cidade
      );

      // Armazenar em cache (30 minutos para dados em tempo real)
      this.cache.armazenar(chaveCacheTemperatura, temperatura, 1800);

      logger.info(`Temperatura obtida com sucesso para ${params.cidade}`);
      return temperatura;
    } catch (erro) {
      logger.error(`Erro ao obter temperatura para ${params.cidade}`, erro as Error);
      throw erro;
    }
  }

  /**
   * Obtém o schema da ferramenta para MCP
   */
  static obterSchema() {
    return {
      name: 'obter_temperatura_atual',
      description: 'Obtém a temperatura atual em uma cidade brasileira. Inclui temperatura, sensação térmica, umidade, vento e condições.',
      inputSchema: {
        type: 'object',
        properties: {
          cidade: {
            type: 'string',
            description: 'Nome da cidade brasileira (ex: "São Paulo", "Rio de Janeiro", "Brasília")',
            enum: Object.keys(CIDADES_BRASIL)
          },
          estado: {
            type: 'string',
            description: 'Sigla do estado (ex: "SP", "RJ", "DF") - opcional'
          }
        },
        required: ['cidade']
      }
    };
  }
}

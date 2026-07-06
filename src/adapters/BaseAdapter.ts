/**
 * Classe base abstrata para adaptadores de APIs meteorológicas
 */

import { 
  TemperaturaAtual, 
  PrevisaoTempo, 
  Coordenadas,
  HistoricoPrecipitacao,
  DadosPrecipitacao
} from '../types/weather.js';

export abstract class BaseAdapter {
  protected baseURL: string;
  protected timeout: number = 5000;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  /**
   * Obtém temperatura atual de uma localização
   */
  abstract obterTemperaturaAtual(
    coordenadas: Coordenadas,
    cidade: string
  ): Promise<TemperaturaAtual>;

  /**
   * Obtém previsão do tempo para os próximos dias
   */
  abstract obterPrevisaoTempo(
    coordenadas: Coordenadas,
    cidade: string,
    dias: number
  ): Promise<PrevisaoTempo>;

  /**
   * Obtém dados de precipitação
   */
  abstract obterPrecipitacao(
    coordenadas: Coordenadas,
    cidade: string
  ): Promise<DadosPrecipitacao[]>;

  /**
   * Obtém histórico de precipitação
   */
  abstract obterHistoricoPrecipitacao(
    coordenadas: Coordenadas,
    cidade: string,
    diasRetro: number
  ): Promise<HistoricoPrecipitacao>;

  /**
   * Converte código de condição para descrição em português
   */
  protected converterCondicao(codigo: number | string): string {
    const mapeamento: Record<string, string> = {
      '0': 'Céu limpo',
      '1': 'Parcialmente nublado',
      '2': 'Nublado',
      '3': 'Nublado',
      '45': 'Névoa',
      '48': 'Névoa com geada',
      '51': 'Garoa leve',
      '53': 'Garoa moderada',
      '55': 'Garoa densa',
      '61': 'Chuva leve',
      '63': 'Chuva moderada',
      '65': 'Chuva densa',
      '71': 'Neve leve',
      '73': 'Neve moderada',
      '75': 'Neve densa',
      '77': 'Grãos de neve',
      '80': 'Pancadas de chuva leve',
      '81': 'Pancadas de chuva moderada',
      '82': 'Pancadas de chuva violenta',
      '85': 'Pancadas de neve leve',
      '86': 'Pancadas de neve pesada',
      '95': 'Trovoada leve',
      '96': 'Trovoada com granizo leve',
      '99': 'Trovoada com granizo pesado'
    };

    return mapeamento[String(codigo)] || 'Desconhecido';
  }

  /**
   * Converte direção do vento em graus para descrição
   */
  protected converterDirecaoVento(graus: number): string {
    const direcoes = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
                      'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO'];
    const indice = Math.round(((graus % 360) / 22.5)) % 16;
    return direcoes[indice];
  }

  /**
   * Valida coordenadas
   */
  protected validarCoordenadas(coordenadas: Coordenadas): boolean {
    return (
      coordenadas.latitude >= -90 && 
      coordenadas.latitude <= 90 &&
      coordenadas.longitude >= -180 && 
      coordenadas.longitude <= 180
    );
  }

  /**
   * Método auxiliar para fazer requisições HTTP
   */
  protected async fazerRequisicao<T>(
    url: string,
    opcoes?: RequestInit
  ): Promise<T> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const resposta = await fetch(url, {
        ...opcoes,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!resposta.ok) {
        throw new Error(`HTTP ${resposta.status}: ${resposta.statusText}`);
      }

      return resposta.json() as Promise<T>;
    } catch (erro) {
      if (erro instanceof Error) {
        throw new Error(`Erro ao buscar dados de ${url}: ${erro.message}`);
      }
      throw erro;
    }
  }

  /**
   * Obtém o nome do adapter
   */
  abstract obterNome(): string;
}

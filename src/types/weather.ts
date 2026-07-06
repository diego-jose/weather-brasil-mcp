/**
 * Tipos compartilhados para dados meteorológicos
 */

export interface Coordenadas {
  latitude: number;
  longitude: number;
}

export interface TemperaturaAtual {
  cidade: string;
  temperatura: number; // em Celsius
  sensacaoTermica: number;
  umidade: number; // percentual
  velocidadeVento: number; // km/h
  direcaoVento: string; // N, NE, E, SE, S, SO, O, NO
  pressao: number; // hPa
  condicao: string; // "Ensolarado", "Nublado", "Chuvoso", etc
  icone: string; // Código do ícone
  timestamp: Date;
}

export interface DiaPrevisao {
  data: Date;
  temperaturaMax: number;
  temperaturaMin: number;
  precipitacao: number; // em mm
  probabilidadeChuva: number; // percentual
  umidadeMedia: number;
  velocidadeVentoMax: number;
  condicao: string;
  icone: string;
}

export interface PrevisaoTempo {
  cidade: string;
  coordenadas: Coordenadas;
  atualizadoEm: Date;
  dias: DiaPrevisao[];
}

export interface DadosPrecipitacao {
  cidade: string;
  data: Date;
  precipitacao: number; // em mm
  probabilidade: number; // percentual
  tipo: 'chuva' | 'neve' | 'granizo' | 'misto';
}

export interface HistoricoPrecipitacao {
  cidade: string;
  coordenadas: Coordenadas;
  periodo: {
    inicio: Date;
    fim: Date;
  };
  dados: DadosPrecipitacao[];
  totalMM: number;
  mediaMMDia: number;
}

export interface RespostaAPI {
  sucesso: boolean;
  dados?: any;
  erro?: string;
  timestamp: Date;
}

// Enum para tipos de requisição
export enum TipoRequisicao {
  TEMPERATURA_ATUAL = 'temperatura_atual',
  PREVISAO_TEMPO = 'previsao_tempo',
  PRECIPITACAO = 'precipitacao',
  HISTORICO_PRECIPITACAO = 'historico_precipitacao'
}

// Mapeamento de cidades brasileiras para coordenadas
export const CIDADES_BRASIL: Record<string, Coordenadas> = {
  'são paulo': { latitude: -23.5505, longitude: -46.6333 },
  'sp': { latitude: -23.5505, longitude: -46.6333 },
  'rio de janeiro': { latitude: -22.9068, longitude: -43.1729 },
  'rj': { latitude: -22.9068, longitude: -43.1729 },
  'brasília': { latitude: -15.8267, longitude: -47.9218 },
  'df': { latitude: -15.8267, longitude: -47.9218 },
  'salvador': { latitude: -12.9714, longitude: -38.5014 },
  'ba': { latitude: -12.9714, longitude: -38.5014 },
  'fortaleza': { latitude: -3.7319, longitude: -38.5267 },
  'ce': { latitude: -3.7319, longitude: -38.5267 },
  'belo horizonte': { latitude: -19.9191, longitude: -43.9386 },
  'mg': { latitude: -19.9191, longitude: -43.9386 },
  'curitiba': { latitude: -25.4284, longitude: -49.2733 },
  'pr': { latitude: -25.4284, longitude: -49.2733 },
  'porto alegre': { latitude: -30.0346, longitude: -51.2177 },
  'rs': { latitude: -30.0346, longitude: -51.2177 },
  'recife': { latitude: -8.0476, longitude: -34.8770 },
  'pe': { latitude: -8.0476, longitude: -34.8770 },
  'manaus': { latitude: -3.1190, longitude: -60.0217 },
  'am': { latitude: -3.1190, longitude: -60.0217 },
  'belém': { latitude: -1.4554, longitude: -48.5032 },
  'pa': { latitude: -1.4554, longitude: -48.5032 }
};

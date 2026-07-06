/**
 * Adapter para OpenMeteo - API gratuita e sem autenticação
 * Documentação: https://open-meteo.com/en/docs
 */

import { BaseAdapter } from './BaseAdapter.js';
import {
  TemperaturaAtual,
  PrevisaoTempo,
  Coordenadas,
  DiaPrevisao,
  HistoricoPrecipitacao,
  DadosPrecipitacao
} from '../types/weather.js';

interface RespostaOpenMeteo {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  current?: {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
  };
  hourly?: {
    time: string[];
    temperature_2m: number[];
    precipitation: number[];
    relative_humidity_2m: number[];
    weather_code: number[];
  };
  daily?: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    precipitation_probability_max: number[];
    relative_humidity_2m_max: number[];
    wind_speed_10m_max: number[];
  };
}

export class OpenMeteoAdapter extends BaseAdapter {
  constructor() {
    super('https://api.open-meteo.com/v1');
  }

  async obterTemperaturaAtual(
    coordenadas: Coordenadas,
    cidade: string
  ): Promise<TemperaturaAtual> {
    if (!this.validarCoordenadas(coordenadas)) {
      throw new Error('Coordenadas inválidas');
    }

    const url = `${this.baseURL}/forecast?latitude=${coordenadas.latitude}&longitude=${coordenadas.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m&timezone=America/Sao_Paulo`;

    const dados = await this.fazerRequisicao<RespostaOpenMeteo>(url);

    if (!dados.current) {
      throw new Error('Dados de temperatura atual não disponíveis');
    }

    const condicao = this.converterCondicao(dados.current.weather_code);

    return {
      cidade,
      temperatura: Math.round(dados.current.temperature_2m * 10) / 10,
      sensacaoTermica: Math.round(dados.current.apparent_temperature * 10) / 10,
      umidade: dados.current.relative_humidity_2m,
      velocidadeVento: Math.round(dados.current.wind_speed_10m * 10) / 10,
      direcaoVento: this.converterDirecaoVento(dados.current.wind_direction_10m),
      pressao: 0, // OpenMeteo não fornece pressão no current
      condicao,
      icone: String(dados.current.weather_code),
      timestamp: new Date(dados.current.time)
    };
  }

  async obterPrevisaoTempo(
    coordenadas: Coordenadas,
    cidade: string,
    dias: number = 7
  ): Promise<PrevisaoTempo> {
    if (!this.validarCoordenadas(coordenadas)) {
      throw new Error('Coordenadas inválidas');
    }

    if (dias < 1 || dias > 16) {
      dias = 7; // Default e limite máximo da API
    }

    const url = `${this.baseURL}/forecast?latitude=${coordenadas.latitude}&longitude=${coordenadas.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,relative_humidity_2m_max,wind_speed_10m_max&timezone=America/Sao_Paulo`;

    const dados = await this.fazerRequisicao<RespostaOpenMeteo>(url);

    if (!dados.daily) {
      throw new Error('Dados de previsão não disponíveis');
    }

    const diasPrevisao: DiaPrevisao[] = [];

    for (let i = 0; i < Math.min(dias, dados.daily.time.length); i++) {
      const condicao = this.converterCondicao(dados.daily.weather_code[i]);

      diasPrevisao.push({
        data: new Date(dados.daily.time[i]),
        temperaturaMax: Math.round(dados.daily.temperature_2m_max[i] * 10) / 10,
        temperaturaMin: Math.round(dados.daily.temperature_2m_min[i] * 10) / 10,
        precipitacao: Math.round(dados.daily.precipitation_sum[i] * 10) / 10,
        probabilidadeChuva: dados.daily.precipitation_probability_max[i],
        umidadeMedia: dados.daily.relative_humidity_2m_max[i],
        velocidadeVentoMax: Math.round(dados.daily.wind_speed_10m_max[i] * 10) / 10,
        condicao,
        icone: String(dados.daily.weather_code[i])
      });
    }

    return {
      cidade,
      coordenadas,
      atualizadoEm: new Date(),
      dias: diasPrevisao
    };
  }

  async obterPrecipitacao(
    coordenadas: Coordenadas,
    cidade: string
  ): Promise<DadosPrecipitacao[]> {
    // Usar dados de previsão que já incluem precipitação
    const previsao = await this.obterPrevisaoTempo(coordenadas, cidade, 7);

    return previsao.dias.map(dia => ({
      cidade,
      data: dia.data,
      precipitacao: dia.precipitacao,
      probabilidade: dia.probabilidadeChuva,
      tipo: dia.precipitacao > 0 ? 'chuva' : 'chuva'
    }));
  }

  async obterHistoricoPrecipitacao(
    coordenadas: Coordenadas,
    cidade: string,
    diasRetro: number = 30
  ): Promise<HistoricoPrecipitacao> {
    // OpenMeteo não fornece dados históricos na versão gratuita
    // Este é um exemplo que você pode expandir com INMET depois
    
    console.warn(`OpenMeteo não fornece histórico. Use INMET para dados históricos.`);

    const agora = new Date();
    const inicio = new Date();
    inicio.setDate(inicio.getDate() - diasRetro);

    // Retornar estrutura vazia como exemplo
    return {
      cidade,
      coordenadas,
      periodo: {
        inicio,
        fim: agora
      },
      dados: [],
      totalMM: 0,
      mediaMMDia: 0
    };
  }

  obterNome(): string {
    return 'OpenMeteo';
  }
}

// Exemplo de uso:
// const adapter = new OpenMeteoAdapter();
// const temp = await adapter.obterTemperaturaAtual(
//   { latitude: -23.5505, longitude: -46.6333 },
//   'São Paulo'
// );
// console.log(temp);

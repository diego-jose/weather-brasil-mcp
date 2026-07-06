/**
 * Exemplo de como usar o MCP Weather Brasil
 * 
 * Este arquivo mostra como usar as ferramentas meteorológicas
 * diretamente em código TypeScript
 */

import { OpenMeteoAdapter } from '../src/adapters/OpenMeteoAdapter.js';
import { TemperaturaTool } from '../src/tools/temperatureTool.js';
import { PrevisaoTool } from '../src/tools/forecastTool.js';
import { PrecipitacaoTool } from '../src/tools/precipitationTool.js';
import { Cache } from '../src/utils/cache.js';
import { logger } from '../src/utils/logger.js';

async function exemploCompleto() {
  console.log('='.repeat(60));
  console.log('Exemplo de Uso - MCP Weather Brasil');
  console.log('='.repeat(60));

  // Inicializar componentes
  const adapter = new OpenMeteoAdapter();
  const cache = new Cache(3600);
  
  const temperaturaTool = new TemperaturaTool(adapter, cache);
  const previsaoTool = new PrevisaoTool(adapter, cache);
  const precipitacaoTool = new PrecipitacaoTool(adapter, cache);

  try {
    // ============================================
    // EXEMPLO 1: Temperatura Atual
    // ============================================
    console.log('\n📍 EXEMPLO 1: Temperatura Atual em São Paulo');
    console.log('-'.repeat(60));

    const temperatura = await temperaturaTool.executar({
      cidade: 'São Paulo'
    });

    console.log(`Cidade: ${temperatura.cidade}`);
    console.log(`🌡️  Temperatura: ${temperatura.temperatura}°C`);
    console.log(`🤔 Sensação térmica: ${temperatura.sensacaoTermica}°C`);
    console.log(`💧 Umidade: ${temperatura.umidade}%`);
    console.log(`💨 Vento: ${temperatura.velocidadeVento} km/h ${temperatura.direcaoVento}`);
    console.log(`☁️  Condição: ${temperatura.condicao}`);
    console.log(`🕐 Atualizado: ${temperatura.timestamp.toLocaleString('pt-BR')}`);

    // ============================================
    // EXEMPLO 2: Previsão do Tempo (5 dias)
    // ============================================
    console.log('\n\n📅 EXEMPLO 2: Previsão do Tempo para Rio de Janeiro (5 dias)');
    console.log('-'.repeat(60));

    const previsao = await previsaoTool.executar({
      cidade: 'Rio de Janeiro',
      dias: 5
    });

    console.log(`Cidade: ${previsao.cidade}`);
    console.log(`Coordenadas: ${previsao.coordenadas.latitude}, ${previsao.coordenadas.longitude}\n`);

    previsao.dias.forEach((dia, idx) => {
      console.log(`Dia ${idx + 1} - ${dia.data.toLocaleDateString('pt-BR')}`);
      console.log(`  Max: ${dia.temperaturaMax}°C | Min: ${dia.temperaturaMin}°C`);
      console.log(`  Chuva: ${dia.precipitacao}mm (${dia.probabilidadeChuva}% de chance)`);
      console.log(`  Vento máx: ${dia.velocidadeVentoMax} km/h`);
      console.log(`  Condição: ${dia.condicao}\n`);
    });

    // ============================================
    // EXEMPLO 3: Precipitação (Chuva)
    // ============================================
    console.log('\n🌧️  EXEMPLO 3: Dados de Precipitação em Brasília');
    console.log('-'.repeat(60));

    const precipitacao = await precipitacaoTool.executar({
      cidade: 'Brasília'
    });

    const resumo = PrecipitacaoTool.calcularResumo(precipitacao);

    console.log('Próximos 7 dias:');
    precipitacao.forEach((dado) => {
      const emoji = dado.precipitacao > 5 ? '🌧️ ' : dado.precipitacao > 0 ? '🌦️ ' : '☀️ ';
      console.log(`${dado.data.toLocaleDateString('pt-BR')}: ${emoji}${dado.precipitacao}mm (${dado.probabilidade}%)`);
    });

    console.log('\nResumo:');
    console.log(`📊 Total: ${resumo.totalMM}mm`);
    console.log(`📈 Média/dia: ${resumo.mediaMMDia}mm`);
    console.log(`☔ Dias com chuva: ${resumo.diasComChuva}`);
    console.log(`💧 Máxima: ${resumo.precipitacaoMaxima}mm`);

    // ============================================
    // EXEMPLO 4: Múltiplas Cidades
    // ============================================
    console.log('\n\n🌐 EXEMPLO 4: Temperatura em Múltiplas Cidades');
    console.log('-'.repeat(60));

    const cidades = ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza'];

    for (const cidade of cidades) {
      try {
        const temp = await temperaturaTool.executar({ cidade });
        console.log(`${cidade.padEnd(20)}: ${temp.temperatura}°C - ${temp.condicao}`);
      } catch (erro) {
        console.log(`${cidade.padEnd(20)}: Erro ao buscar dados`);
      }
    }

    // ============================================
    // EXEMPLO 5: Verificar Cache
    // ============================================
    console.log('\n\n💾 EXEMPLO 5: Status do Cache');
    console.log('-'.repeat(60));

    const infoCache = cache.obterInfo();
    console.log(`Entradas em cache: ${infoCache.tamanho}`);
    console.log(`Chaves: ${infoCache.chaves.join(', ')}`);

  } catch (erro) {
    console.error('❌ Erro:', erro instanceof Error ? erro.message : String(erro));
  }

  console.log('\n' + '='.repeat(60));
  console.log('Exemplo finalizado com sucesso! ✅');
  console.log('='.repeat(60));
}

// Executar
exemploCompleto().catch(console.error);

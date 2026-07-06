# MCP Weather Brasil 🌦️

Um servidor **Model Context Protocol (MCP)** para obter dados meteorológicos do Brasil com acesso a:
- ✅ **Temperatura atual** (com sensação térmica, umidade, vento)
- ✅ **Previsão do tempo** (até 16 dias)
- ✅ **Dados de precipitação** (chuva com probabilidade)

Integrado com **OpenMeteo** (API pública e gratuita, sem autenticação necessária).

---

## 🚀 Quick Start

### 1️⃣ Instalação

```bash
# Clonar/criar o projeto
mkdir mcp-weather-brasil
cd mcp-weather-brasil

# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp src/.env.example .env
```

### 2️⃣ Compilar TypeScript

```bash
npm run build
```

### 3️⃣ Executar o servidor

**Desenvolvimento (com ts-node):**
```bash
npm run dev
```

**Produção:**
```bash
npm run build
npm start
```

---

## 📚 Estrutura do Projeto

```
mcp-weather-brasil/
├── src/
│   ├── index.ts                    # 🎯 Servidor MCP principal
│   ├── types/
│   │   └── weather.ts              # Tipos TypeScript
│   ├── adapters/
│   │   ├── BaseAdapter.ts          # Classe abstrata
│   │   └── OpenMeteoAdapter.ts     # Implementação OpenMeteo
│   ├── tools/
│   │   ├── temperatureTool.ts      # Ferramenta temperatura
│   │   ├── forecastTool.ts         # Ferramenta previsão
│   │   └── precipitationTool.ts    # Ferramenta precipitação
│   └── utils/
│       ├── cache.ts                # Cache em memória
│       └── logger.ts               # Sistema de logging
├── dist/                           # Saída compilada (gerada)
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

---

## 🔧 Configuração

### Variáveis de Ambiente (.env)

```env
# MCP
MCP_WEATHER_API=openmeteo
LOG_LEVEL=info

# OpenMeteo
OPENMETEO_BASE_URL=https://api.open-meteo.com/v1

# Cache (em segundos)
CACHE_TTL=3600

# Server
PORT=3000
```

---

## 📖 Ferramentas Disponíveis

### 1. `obter_temperatura_atual`

Obtém a temperatura **atual** de uma cidade.

**Parâmetros:**
- `cidade` (obrigatório): Nome da cidade (ex: "São Paulo", "Rio de Janeiro")
- `estado` (opcional): Sigla do estado

**Resposta:**
```json
{
  "cidade": "São Paulo",
  "temperatura": 25.3,
  "sensacaoTermica": 24.1,
  "umidade": 65,
  "velocidadeVento": 12.5,
  "direcaoVento": "NE",
  "condicao": "Parcialmente nublado",
  "timestamp": "2024-01-15T14:30:00Z"
}
```

---

### 2. `obter_previsao_tempo`

Obtém a **previsão do tempo** para os próximos dias.

**Parâmetros:**
- `cidade` (obrigatório): Nome da cidade
- `dias` (opcional): Número de dias (1-16, padrão: 7)

**Resposta:**
```json
{
  "cidade": "São Paulo",
  "coordenadas": {
    "latitude": -23.5505,
    "longitude": -46.6333
  },
  "dias": [
    {
      "data": "2024-01-15",
      "temperaturaMax": 28.5,
      "temperaturaMin": 20.3,
      "precipitacao": 0.5,
      "probabilidadeChuva": 40,
      "umidadeMedia": 70,
      "velocidadeVentoMax": 15,
      "condicao": "Parcialmente nublado"
    }
  ]
}
```

---

### 3. `obter_precipitacao`

Obtém dados de **precipitação (chuva)** para os próximos dias.

**Parâmetros:**
- `cidade` (obrigatório): Nome da cidade
- `estado` (opcional): Sigla do estado

**Resposta:**
```json
{
  "dados": [
    {
      "cidade": "São Paulo",
      "data": "2024-01-15",
      "precipitacao": 0.5,
      "probabilidade": 40,
      "tipo": "chuva"
    }
  ],
  "resumo": {
    "totalMM": 15.3,
    "mediaMMDia": 2.15,
    "diasComChuva": 5,
    "precipitacaoMaxima": 5.2
  }
}
```

---

## 🌍 Cidades Suportadas

O sistema vem com coordenadas pré-configuradas para as principais cidades brasileiras:

| Cidade | Código |
|--------|--------|
| São Paulo | sp |
| Rio de Janeiro | rj |
| Brasília | df |
| Salvador | ba |
| Fortaleza | ce |
| Belo Horizonte | mg |
| Curitiba | pr |
| Porto Alegre | rs |
| Recife | pe |
| Manaus | am |
| Belém | pa |

**Adicionar mais cidades:** Edite `src/types/weather.ts` e atualize o objeto `CIDADES_BRASIL`.

---

## 💾 Cache

O sistema implementa cache em memória para economizar requisições:

- **Temperatura atual**: 30 minutos
- **Previsão**: 1 hora
- **Precipitação**: 2 horas

O cache é automaticamente limpo de entradas expiradas a cada 10 minutos.

---

## 🏗️ Arquitetura

```
┌─────────────────────┐
│   Claude / MCP      │
│    Client           │
└──────────┬──────────┘
           │
           │ (CallTool)
           ▼
┌─────────────────────────────────────┐
│      MCP Server (index.ts)          │
│  ┌─────────────────────────────┐    │
│  │  Tools                      │    │
│  │ - TemperaturaTool          │    │
│  │ - PrevisaoTool             │    │
│  │ - PrecipitacaoTool         │    │
│  └─────────────────┬───────────┘    │
│                    │                │
│  ┌─────────────────▼───────────┐    │
│  │  OpenMeteoAdapter           │    │
│  │  (Implementação)            │    │
│  └─────────────────┬───────────┘    │
│                    │                │
│  ┌─────────────────▼───────────┐    │
│  │  Cache (em memória)         │    │
│  └─────────────────────────────┘    │
└──────────────────┬──────────────────┘
                   │
                   │ (HTTP fetch)
                   ▼
        ┌──────────────────┐
        │  OpenMeteo API   │
        │ open-meteo.com   │
        └──────────────────┘
```

---

## 🔌 Integração com Claude

Para usar com o Claude, você pode:

1. **Usando Claude Code CLI:**
   ```bash
   claude-code --mcp ./dist/index.js
   ```

2. **Usando Claude.ai (configurar manualmente):**
   - Adicione como servidor MCP personalizado nas configurações

3. **Usando via API Anthropic:**
   ```javascript
   const response = await anthropic.messages.create({
     model: 'claude-3-5-sonnet-20241022',
     max_tokens: 1024,
     tools: [
       // Ferramentas do MCP Weather Brasil
     ],
     messages: [...]
   });
   ```

---

## 🚀 Próximos Passos

### ✨ Melhorias Planejadas

1. **Adicionar INMET Adapter**
   - Dados oficiais brasileiros
   - Histórico de precipitação
   - Mais estações meteorológicas

2. **Geocodificação automática**
   - Suportar qualquer cidade brasileira (não apenas as pré-configuradas)
   - Integrar com API de geocodificação

3. **Alertas meteorológicos**
   - Avisos de tempestades, chuvas intensas
   - Notificações em tempo real

4. **Análise histórica**
   - Comparação com clima normal
   - Tendências sazonais

5. **Dashboard web**
   - Interface visual dos dados
   - Gráficos e mapas

---

## 🐛 Troubleshooting

### Erro: "Cidade não encontrada"
- Verifique a ortografia exata
- Adicione a cidade em `src/types/weather.ts`

### Erro: "Network timeout"
- OpenMeteo pode estar indisponível
- Verifique sua conexão de internet
- Tente usar um VPN

### Cache cheio ou comportamento estranho
```typescript
// Limpar cache manualmente
import { cacheGlobal } from './utils/cache.js';
cacheGlobal.limpar();
```

---

## 📝 Desenvolvimento

### Adicionar uma nova ferramenta

1. Criar arquivo em `src/tools/minhaTool.ts`
2. Estender `BaseAdapter` se precisar de novo método
3. Adicionar handler em `src/index.ts`
4. Registrar schema em `ListToolsRequestSchema`

### Adicionar novo adapter

1. Criar classe em `src/adapters/MeuAdapter.ts`
2. Estender `BaseAdapter`
3. Implementar todos os métodos abstratos
4. Usar em `src/index.ts`

---

## 📄 Licença

MIT - Use livremente!

---

## 🤝 Contribuições

Contribuições são bem-vindas! Faça um pull request com suas melhorias.

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Abra uma issue no GitHub
2. Consulte a documentação do OpenMeteo: https://open-meteo.com/en/docs
3. Verifique os logs com `LOG_LEVEL=debug`

---

## 🎯 Roadmap

- [ ] Suporte para INMET (dados brasileiros oficiais)
- [ ] Geocodificação automática
- [ ] Alertas meteorológicos
- [ ] API REST wrapper
- [ ] Dashboard web
- [ ] Suporte a múltiplos adapters simultâneos
- [ ] Métricas e monitoramento
- [ ] Testes automatizados

---

**Desenvolvido com ❤️ para o Brasil** 🇧🇷

# MCP Weather Brasil 🌦️

Um servidor **Model Context Protocol (MCP)** para obter dados meteorológicos do Brasil utilizando APIs públicas.

## Arquitetura

```
LLM
  │
  ▼
MCP Tool
  │
  ▼
Weather Service
  │
  ▼
OpenMeteo Client
  │
  ▼
Open-Meteo API
```

### Princípios

- As Tools apenas adaptam chamadas MCP.
- Toda regra de negócio fica em Services.
- Clients encapsulam chamadas HTTP para APIs externas.
- A primeira versão utiliza apenas o Open-Meteo.
- Cache e múltiplos providers serão adicionados em versões futuras.

## Roadmap v1

- Bootstrap
- MCP Server
- OpenMeteo Client
- IBGE Client (geocodificação)
- Weather Service
- search_city
- get_current_weather
- get_forecast

## Roadmap futuro

- INMET
- Alertas meteorológicos
- Cache
- Dashboard
- API REST

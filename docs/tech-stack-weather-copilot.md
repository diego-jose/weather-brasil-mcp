# Decisão Técnica — Stack Recomendada para o Weather Copilot

## Contexto
O projeto precisa combinar:
- um servidor MCP já existente em TypeScript;
- uma experiência conversacional semelhante a um chat;
- visualizações de clima, precipitação e mapas;
- desenvolvimento rápido para um MVP.

## Decisão
A stack recomendada para o MVP é:

- TypeScript
- Node.js
- Next.js
- React
- Tailwind CSS
- shadcn/ui
- Recharts
- MapLibre GL JS
- Vercel AI SDK
- MCP SDK

## Justificativa
### TypeScript + Node.js
Mantém coerência com o projeto atual e facilita a integração com o MCP.

### Next.js + React
Oferece uma base sólida para uma aplicação web moderna, com boa experiência de desenvolvimento e suporte a rotas, server components e UI dinâmica.

### Tailwind + shadcn/ui
Acelera a construção de UI limpa e consistente sem excesso de boilerplate.

### Recharts
Ideal para gráficos de temperatura e precipitação.

### MapLibre GL JS
Boa opção para mapas leves e customizáveis.

### Vercel AI SDK
Ajuda a criar uma experiência conversacional com streaming e respostas mais naturais.

### MCP SDK
Mantém a integração com o servidor MCP centralizado e compatível com a arquitetura proposta.

## Arquitetura sugerida
- Frontend em Next.js
- Backend leve em Node.js para orquestração
- Camada de agentes/conversa para interpretar a intenção do usuário
- Camada de consumo do MCP para buscar os dados meteorológicos
- Camada de renderização de widgets para gráficos, cards e mapas

## Alternativas consideradas
- Vue + Vite: viável, mas menos alinhado com o ecossistema atual de IA e aplicações conversacionais.
- Python + FastAPI: bom para IA, mas adiciona complexidade para um MVP que já começa em TypeScript.
- React sem framework: funcional, mas perde produtividade em rotas, SSR e estrutura geral.

## Recomendação final
Para o MVP, priorizar uma stack simples e rápida:
- Next.js + React + TypeScript
- Tailwind
- Recharts + MapLibre
- Vercel AI SDK
- integração com o MCP existente

Essa combinação entrega velocidade, clareza e espaço para crescer sem reescrever a arquitetura no futuro.

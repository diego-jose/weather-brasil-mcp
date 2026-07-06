# Epics e Histórias de Usuário — Weather Copilot

## Epic 1 — Conversa inicial e consulta meteorológica
### Objetivo
Permitir que o usuário faça perguntas simples sobre o clima de uma cidade e receba uma resposta útil com dados reais.

### Histórias
- Como usuário, quero perguntar pelo clima de uma cidade para obter uma resposta rápida e clara.
- Como usuário, quero informar uma cidade e receber temperatura atual, condição e resumo do clima.
- Como usuário, quero consultar a previsão para os próximos dias para planejar melhor minhas atividades.

## Epic 2 — Visualizações dinâmicas
### Objetivo
Apresentar os dados meteorológicos em blocos visuais que ajudem o usuário a compreender melhor a informação.

### Histórias
- Como usuário, quero ver um resumo textual do clima para compreender rapidamente a situação.
- Como usuário, quero visualizar uma previsão em formato de gráfico de temperatura para acompanhar a tendência.
- Como usuário, quero visualizar um gráfico de precipitação para entender a chance de chuva.
- Como usuário, quero ver um mapa simples com a cidade consultada para contextualizar a resposta.

## Epic 3 — Comparação entre cidades
### Objetivo
Permitir que o usuário compare duas cidades em uma mesma sessão.

### Histórias
- Como usuário, quero comparar clima entre duas cidades para decidir onde ir.
- Como usuário, quero ver uma comparação visual das temperaturas e da chance de chuva entre cidades.

## Epic 4 — Contexto e continuidade da conversa
### Objetivo
Manter contexto entre perguntas para oferecer uma experiência mais natural.

### Histórias
- Como usuário, quero continuar a conversa sem repetir a cidade a cada mensagem.
- Como usuário, quero fazer uma pergunta de acompanhamento, como “e amanhã?”, para obter uma resposta contextualizada.

## Epic 5 — Experiência de agente e composição de widgets
### Objetivo
Permitir que o sistema escolha automaticamente quais blocos mostrar com base na intenção do usuário.

### Histórias
- Como sistema, quero identificar a intenção do usuário para selecionar os blocos mais relevantes.
- Como usuário, quero receber uma resposta composta por blocos de texto, gráfico e mapa conforme a necessidade.
- Como usuário, quero receber sugestões de próximos passos após cada resposta.

## Critérios de aceite gerais
- O usuário consegue fazer uma consulta simples sem configuração extra.
- A resposta inclui dados reais obtidos pelo MCP.
- O sistema renderiza pelo menos um tipo de visualização para a consulta.
- A experiência funciona com uma conversa sequencial.

## Material de implementação para o time
- Histórias de desenvolvimento: [stories-weather-copilot.md](stories-weather-copilot.md)

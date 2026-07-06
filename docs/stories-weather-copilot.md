# Histórias de Desenvolvimento — Weather Copilot MVP

## Contexto
Estas histórias foram escritas em formato de implementação para o time de desenvolvimento, com foco no MVP do Weather Copilot. Elas assumem que o servidor MCP já está funcional e que a prioridade inicial é entregar uma experiência conversacional simples e útil.

---

## Story 1 — Tela de chat inicial
**Epic:** Conversa inicial e consulta meteorológica  
**Prioridade:** P0  
**Status:** Planejada

### Objetivo do negócio
Permitir que o usuário envie uma pergunta meteorológica e receba uma resposta em uma interface simples e intuitiva.

### História
Como usuário, quero abrir uma interface de chat e enviar uma pergunta sobre o clima, para que eu possa consultar informações meteorológicas sem precisar usar ferramentas técnicas.

### Critérios de aceite
- A interface exibe um campo de entrada e um botão de envio.
- O usuário consegue enviar uma mensagem e ver a resposta na mesma conversa.
- A tela mostra estado de carregamento enquanto a resposta é processada.
- Erros de comunicação são exibidos de forma amigável.

### Tarefas de implementação
- Criar a estrutura inicial da tela de chat.
- Implementar o fluxo de envio de mensagem para o backend.
- Exibir mensagens do usuário e do assistente em ordem cronológica.
- Criar estados de loading e erro.

### Observações técnicas
- A UI inicial pode ser simples, sem necessidade de componentes complexos.
- O backend pode retornar um payload estruturado para renderização.

---

## Story 2 — Orquestração de intenção do usuário
**Epic:** Experiência de agente e composição de widgets  
**Prioridade:** P0  
**Status:** Planejada

### Objetivo do negócio
Interpretar a intenção do usuário para decidir qual tipo de consulta meteorológica deve ser executada.

### História
Como sistema, quero identificar se o usuário está pedindo temperatura, previsão, precipitação ou comparação entre cidades, para que eu possa chamar a ferramenta correta e montar uma resposta adequada.

### Critérios de aceite
- A API recebe uma mensagem do usuário e identifica a intenção principal.
- O fluxo suporta pelo menos três intenções: clima atual, previsão e precipitação.
- Quando a intenção não for clara, o sistema retorna uma mensagem de confirmação ou solicitação de esclarecimento.

### Tarefas de implementação
- Definir um contrato de entrada para a mensagem do usuário.
- Implementar um determinador simples de intenção.
- Mapear cada intenção para um fluxo de execução específico.
- Retornar uma resposta estruturada com os dados necessários para renderização.

### Observações técnicas
- Este fluxo pode começar com regras simples e evoluir depois para um modelo mais sofisticado.
- O objetivo inicial é reduzir a complexidade e dar velocidade ao MVP.

---

## Story 3 — Integração com o MCP para dados meteorológicos
**Epic:** Conversa inicial e consulta meteorológica  
**Prioridade:** P0  
**Status:** Planejada

### Objetivo do negócio
Conectar a experiência conversacional ao servidor MCP já existente para obter dados reais de tempo.

### História
Como sistema, quero consultar as ferramentas do MCP para obter dados de temperatura, previsão e precipitação, para que a resposta do usuário seja baseada em informações reais.

### Critérios de aceite
- O fluxo consegue chamar o MCP para consulta de temperatura atual.
- O fluxo consegue chamar o MCP para previsão de múltiplos dias.
- O fluxo consegue chamar o MCP para dados de precipitação.
- O sistema trata falhas de conexão e mostra mensagem amigável.

### Tarefas de implementação
- Criar camada de serviço para comunicação com o MCP.
- Encapsular chamadas para as ferramentas existentes.
- Normalizar os dados retornados para o formato interno do sistema.
- Implementar tratamento de erro e timeout.

### Observações técnicas
- Reaproveitar o adapter e as ferramentas já implementados no projeto.
- Evitar duplicar lógica de obtenção de dados.

---

## Story 4 — Renderização de resumo textual e card de temperatura
**Epic:** Visualizações dinâmicas  
**Prioridade:** P0  
**Status:** Planejada

### Objetivo do negócio
Entregar uma resposta clara e visualmente simples para a consulta do usuário.

### História
Como usuário, quero ver um resumo textual do clima e um card com a temperatura atual, para que eu entenda rapidamente a condição do tempo.

### Critérios de aceite
- A resposta inclui um resumo textual legível.
- A temperatura aparece em um bloco visual destacado.
- O conteúdo é renderizado corretamente quando os dados do MCP chegam.

### Tarefas de implementação
- Criar componente de resumo textual.
- Criar componente de card de temperatura.
- Montar o plano de resposta com esses blocos.
- Estilizar a apresentação para leitura rápida.

### Observações técnicas
- O componente pode ser simples no MVP e evoluir depois.
- O contrato de resposta deve permitir agregar múltiplos blocos na mesma tela.

---

## Story 5 — Renderização de previsão e gráfico de precipitação
**Epic:** Visualizações dinâmicas  
**Prioridade:** P0  
**Status:** Planejada

### Objetivo do negócio
Mostrar a tendência do tempo em formato visual para facilitar a compreensão.

### História
Como usuário, quero visualizar a previsão para os próximos dias e a chance de chuva, para que eu possa planejar melhor minhas atividades.

### Critérios de aceite
- A resposta exibe uma prévisão com pelo menos 3 dias de dados.
- O sistema renderiza um gráfico ou lista de precipitação.
- Os dados são apresentados de forma legível e bem organizada.

### Tarefas de implementação
- Criar componente de lista ou gráfico de previsão.
- Criar componente de gráfico de precipitação.
- Adaptar os dados recebidos do MCP para o formato do widget.
- Garantir responsividade básica da UI.

### Observações técnicas
- Pode-se começar com uma lista simples e depois evoluir para gráficos mais ricos.
- O componente precisa aceitar dados em formato tabular.

---

## Story 6 — Contexto de conversa e perguntas de acompanhamento
**Epic:** Contexto e continuidade da conversa  
**Prioridade:** P1  
**Status:** Planejada

### Objetivo do negócio
Tornar a experiência mais natural ao lembrar o contexto da conversa.

### História
Como usuário, quero continuar a conversa sem repetir a cidade a cada pergunta, para que a interação fique mais fluida e parecida com uma conversa real.

### Critérios de aceite
- O sistema lembra a última cidade consultada na sessão.
- Perguntas como “e amanhã?” ou “e em Curitiba?” são interpretadas corretamente.
- A resposta segue o contexto da conversa sem exigir repetição manual.

### Tarefas de implementação
- Criar armazenamento simples de contexto de sessão.
- Atualizar o estado da conversa com a última cidade e intenção.
- Ajustar o orquestrador para usar esse contexto na próxima mensagem.
- Documentar o comportamento em testes manuais básicos.

### Observações técnicas
- A implementação inicial pode ser baseada em memória em tempo de execução.
- O foco é melhorar a experiência do usuário sem adicionar muita complexidade.

---

## Definition of Done do MVP
- O usuário consegue fazer uma consulta simples por texto.
- O sistema retorna dados reais do MCP.
- A resposta inclui pelo menos um resumo textual e um bloco visual.
- O fluxo funciona sem erro para o cenário principal de uso.
- A experiência é testada manualmente com perguntas reais de clima.

## Plano operacional de implementação
- Plano detalhado: [implementation-plan-weather-copilot.md](implementation-plan-weather-copilot.md)

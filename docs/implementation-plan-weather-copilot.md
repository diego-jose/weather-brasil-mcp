# Plano de Implementação — Weather Copilot MVP

## Objetivo
Transformar as histórias de produto em um plano de execução prático para o time de desenvolvimento, com foco no primeiro ciclo de entrega do MVP.

## Estratégia de entrega
A implementação deve seguir esta ordem para reduzir risco e entregar valor cedo:

1. Estrutura base da aplicação
2. Fluxo de chat simples
3. Integração com o MCP
4. Renderização de conteúdo meteorológico
5. Contexto da conversa e refinamentos

---

## Fase 1 — Estrutura base
**Objetivo:** criar a base para a interface e o backend de orquestração.

### Tarefas
- [ ] Criar a estrutura inicial do frontend.
- [ ] Criar a estrutura inicial do backend de orquestração.
- [ ] Definir o contrato de entrada e saída da API de chat.
- [ ] Criar os tipos principais para mensagem, intenção, contexto e resposta.
- [ ] Configurar o fluxo de comunicação entre UI e backend.

### Entregável
- Um app com um campo de entrada e uma resposta inicial de teste.

---

## Fase 2 — Fluxo de chat simples
**Objetivo:** permitir que o usuário envie perguntas e receba uma resposta básica.

### Tarefas
- [ ] Implementar envio de mensagem da UI para o backend.
- [ ] Exibir mensagens do usuário e do assistente no chat.
- [ ] Mostrar estado de carregamento enquanto a resposta é processada.
- [ ] Tratar erros simples de requisição.
- [ ] Definir uma resposta padrão para mensagens não estruturadas.

### Entregável
- O usuário consegue conversar com a aplicação de forma simples.

---

## Fase 3 — Orquestração e integração com o MCP
**Objetivo:** transformar a pergunta em uma ação real de consulta meteorológica.

### Tarefas
- [ ] Implementar um classificador inicial de intenção.
- [ ] Mapear intenções para os fluxos de temperatura, previsão e precipitação.
- [ ] Criar camada de serviço para chamar as ferramentas do MCP.
- [ ] Normalizar os dados retornados para o formato interno da aplicação.
- [ ] Adicionar tratamento de erro para falhas de serviços e API.

### Entregável
- A aplicação consegue buscar dados reais do MCP a partir de perguntas do usuário.

---

## Fase 4 — Blocos de resposta e widgets básicos
**Objetivo:** apresentar os dados de forma útil e visual.

### Tarefas
- [ ] Criar componente de resumo textual.
- [ ] Criar componente de card de temperatura.
- [ ] Criar componente de previsão para múltiplos dias.
- [ ] Criar componente de gráfico ou lista de precipitação.
- [ ] Criar componente de mapa simples para a cidade consultada.
- [ ] Montar um plano de resposta com múltiplos blocos.

### Entregável
- O usuário recebe uma resposta com texto e pelo menos um componente visual.

---

## Fase 5 — Contexto da conversa e refinamento
**Objetivo:** fazer a experiência parecer mais natural e contínua.

### Tarefas
- [ ] Implementar contexto de sessão para lembrar a última cidade consultada.
- [ ] Suportar perguntas de acompanhamento como “e amanhã?”.
- [ ] Melhorar a interpretação de cidades e perguntas implícitas.
- [ ] Adicionar sugestões de próximos passos após cada resposta.
- [ ] Validar cenários principais com testes manuais.

### Entregável
- A conversa passa a ter contexto e continuidade.

---

## Checklist de início de implementação
### Semana 1
- [ ] Definir a estrutura de pastas do projeto.
- [ ] Criar o endpoint inicial de chat.
- [ ] Conectar com o MCP e validar uma consulta simples.
- [ ] Exibir uma resposta de teste no frontend.

### Semana 2
- [ ] Implementar a interpretação de intenção.
- [ ] Exibir resumo e temperatura.
- [ ] Exibir previsão para os próximos dias.
- [ ] Adicionar visualização de precipitação.

### Semana 3
- [ ] Implementar contexto de conversa.
- [ ] Adicionar mapa simples.
- [ ] Validar fluxos principais com perguntas reais.
- [ ] Ajustar UX para o MVP.

---

## Critério de pronto do MVP
- O usuário consegue fazer uma pergunta simples sobre o clima.
- O sistema chama o MCP e retorna dados reais.
- A resposta inclui pelo menos um bloco visual.
- A experiência funciona de forma consistente em um cenário principal.

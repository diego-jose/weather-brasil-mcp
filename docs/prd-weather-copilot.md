# PRD — Weather Copilot Conversacional

## 1. Visão do Produto
Criar uma experiência web de meteorologia em formato de assistente conversacional, onde o usuário interage por linguagem natural e o sistema monta automaticamente os blocos de informação mais relevantes para a intenção do usuário. O produto utiliza o MCP Weather Brasil como camada de dados para obter temperatura, previsão e precipitação.

## 2. Problema
Os sites convencionais de clima oferecem informações dispersas e pouco adaptativas. O usuário precisa navegar por telas e menus para encontrar respostas específicas como:
- “Vai chover no fim de semana?”
- “Qual cidade é melhor para viajar?”
- “Como vai ficar o tempo em São Paulo para os próximos 5 dias?”

Essa experiência é funcional, mas pouco natural e pouco orientada à intenção do usuário.

## 3. Proposta de Solução
Construir um “Weather Copilot” que:
- entende perguntas naturais em português;
- chama as ferramentas do MCP Weather Brasil;
- monta visualizações dinâmicas conforme a intenção do usuário;
- combina texto, gráficos, mapas e cards em uma experiência fluida e conversacional.

## 4. Objetivos do Produto
### Objetivos principais
- permitir consultas meteorológicas por linguagem natural;
- oferecer uma experiência interativa, semelhante a um assistente conversacional;
- combinar dados meteorológicos com visualizações úteis;
- permitir evolução incremental sem exigir um layout fechado desde o início.

### Objetivos secundários
- facilitar a comparação entre cidades;
- apoiar decisões rápidas de viagem, rotina e planejamento;
- servir como base para futuras integrações com alertas, recomendações e automação.

## 5. Público-Alvo
- pessoas que querem acompanhar o clima de forma simples;
- usuários que preferem interação por perguntas e respostas;
- pessoas interessadas em planejar viagens, eventos ou rotina diária;
- usuários que valorizam visualizações rápidas e contextuais.

## 6. Personas
### Persona 1 — Usuário casual
Quer saber rapidamente o clima de uma cidade para hoje ou amanhã.

### Persona 2 — Usuário em planejamento
Quer comparar cidades, entender chuva e planejar atividades.

### Persona 3 — Usuário proativo
Quer acompanhar tendência, probabilidade de chuva e condições futuras.

## 7. Escopo do MVP
O MVP deve focar em uma experiência conversacional simples, com blocos dinâmicos e dados reais via MCP.

### Funcionalidades do MVP
- entrada de texto livre para consultar o clima;
- busca por cidade brasileira;
- temperatura atual;
- previsão para até 5 dias;
- dados de precipitação;
- renderização de blocos dinâmicos como:
  - resumo textual;
  - card de temperatura;
  - gráfico de temperatura;
  - gráfico de precipitação;
  - mapa simples com a cidade;
- comparação básica de duas cidades.

## 8. Requisitos Funcionais
### RF1 — Conversa natural
O sistema deve aceitar perguntas em linguagem natural, como:
- “Qual o tempo em São Paulo hoje?”
- “Vai chover amanhã em Brasília?”
- “Quero ver a previsão de 5 dias para o Rio.”

### RF2 — Integração com MCP
O sistema deve consumir as ferramentas do MCP Weather Brasil para obter:
- temperatura atual;
- previsão do tempo;
- precipitação.

### RF3 — Montagem dinâmica de conteúdo
Com base na intenção do usuário, o sistema deve montar blocos de informação, por exemplo:
- resumo
- gráfico
- mapa
- comparação
- recomendação

### RF4 — Visualizações
O sistema deve exibir pelo menos:
- cards de temperatura;
- gráficos de temperatura e chuva;
- mapa com a cidade selecionada;
- resumo textual do cenário meteorológico.

### RF5 — Comparação entre cidades
O usuário deve conseguir comparar duas cidades em uma mesma sessão.

### RF6 — Histórico de conversa
A sessão deve manter contexto recente para fazer perguntas sequenciais.

## 9. Requisitos Não Funcionais
- performance aceitável para respostas em até 5 segundos no MVP;
- interface responsiva;
- suporte a português brasileiro;
- dados atualizados via API externa;
- tolerância a falha quando a API estiver indisponível.

## 10. Experiência do Usuário
A experiência deve ser orientada a conversa, sem um layout fechado. O sistema deve agir como um agente que:
1. entende a intenção;
2. busca os dados;
3. organiza a resposta em blocos;
4. oferece opções para aprofundar a consulta.

Exemplo:
- Usuário: “Quero saber se vou precisar de guarda-chuva em Porto Alegre no fim de semana.”
- Sistema: mostra um resumo, gráfico de chuvas e recomendação curta.

## 11. Regras de Comportamento do Agente
- priorizar respostas objetivas e úteis;
- usar visualizações quando houver vantagem clara;
- mostrar contexto e limitações quando os dados forem incompletos;
- manter linguagem simples e direta;
- sugerir próximos passos após cada resposta.

## 12. Métricas de Sucesso
- taxa de conversão de perguntas para resposta útil;
- tempo médio para responder uma consulta;
- taxa de uso de gráficos e mapas;
- retenção de usuários por sessão;
- número de consultas por sessão.

## 13. Riscos e Mitigações
### Risco 1 — excesso de complexidade na interface
Mitigação: começar com blocos simples e crescer gradualmente.

### Risco 2 — dependência de dados externos
Mitigação: tratar falhas de API com mensagens claras e fallback simples.

### Risco 3 — baixa clareza da intenção do usuário
Mitigação: usar perguntas de follow-up e interpretação simples de intenção.

## 14. Roadmap Inicial
### Fase 1 — MVP
- integração com MCP;
- chat simples;
- cards e gráficos básicos;
- mapa simples;
- comparação básica.

### Fase 2 — Enriquecimento
- recomendações contextuais;
- histórico de consultas;
- temas e personalização;
- múltiplas cidades em uma única visão.

### Fase 3 — Expansão
- alertas;
- modo viagem;
- automações e notificações;
- integração com outras fontes meteorológicas.

## 15. Perguntas Abertas
- a interface deve ser um chat puro ou um chat + painel de widgets?
- o agente deve montar telas completas ou apenas blocos reutilizáveis?
- a experiência precisa de autenticação no MVP?
- qual o nível de personalização desejado para o usuário?

## 16. Decisão Inicial
Priorizar um produto conversacional com arquitetura modular, onde o usuário interage por linguagem natural e o sistema monta blocos de UI com base na intenção. O MCP será a origem dos dados e a base para a construção do MVP.

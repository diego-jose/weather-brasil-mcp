# Arquitetura Inicial — Weather Copilot MVP

## 1. Objetivo
Definir a estrutura inicial do sistema para um produto conversacional de meteorologia, com dados fornecidos pelo MCP Weather Brasil e uma camada de orquestração responsável por montar respostas e blocos visuais dinâmicos.

## 2. Visão Geral
O sistema será composto por quatro camadas principais:
1. Interface conversacional
2. Orquestrador de intenção
3. Camada de dados via MCP
4. Camada de renderização de widgets

## 3. Componentes Principais

### 3.1 Interface Conversacional
Responsável por receber a mensagem do usuário e exibir a resposta.

Componentes:
- chat input
- histórico de conversa
- mensagens do assistente
- blocos de conteúdo renderizados dinamicamente

### 3.2 Orquestrador de Intenção
Responsável por interpretar a intenção do usuário e decidir qual fluxo executar.

Exemplos de intenção:
- consulta de clima atual
- previsão de vários dias
- precipitação
- comparação entre cidades
- pergunta de acompanhamento

Fluxo:
1. O usuário envia uma mensagem.
2. O orquestrador identifica a intenção.
3. O orquestrador chama o MCP apropriado.
4. O resultado é transformado em um plano de resposta.
5. O plano é enviado para a camada de renderização.

### 3.3 Camada de Dados MCP
O MCP Weather Brasil fornece as capacidades necessárias:
- obter temperatura atual
- obter previsão do tempo
- obter dados de precipitação

### 3.4 Camada de Renderização
Responsável por montar os blocos que serão exibidos ao usuário.

Blocos possíveis:
- resumo textual
- card de temperatura
- gráfico de temperatura
- gráfico de precipitação
- mapa simples
- bloco de comparação

## 4. Fluxo de Execução
### Cenário 1 — Consulta simples
1. Usuário pergunta: “Qual o clima em São Paulo hoje?”
2. Orquestrador detecta intenção de clima atual.
3. Chama a ferramenta de temperatura do MCP.
4. Gera um resumo textual e um card de temperatura.

### Cenário 2 — Previsão de vários dias
1. Usuário pergunta: “Como vai ficar o tempo em Curitiba por 5 dias?”
2. Orquestrador detecta intenção de previsão.
3. Chama a ferramenta de previsão do MCP.
4. Gera um resumo e um gráfico de temperatura/chuva.

### Cenário 3 — Comparação entre cidades
1. Usuário pergunta: “Qual cidade tem melhor clima para viajar: Rio ou Florianópolis?”
2. O sistema busca dados de ambas as cidades.
3. Gera um bloco comparativo.

## 5. Estrutura de Pastas Sugerida
- src/
  - agents/
  - orchestrator/
  - ui/
  - widgets/
  - services/
  - mcp/
  - types/

## 6. Modelo de Dados
### Dados de contexto de conversa
- cidade atual
- última intenção
- lista de cidades consultadas
- histórico recente

### Dados de resposta
- resumo textual
- lista de blocos
- tipo de widget
- dados do MCP

## 7. Decisões de Design
- a interface não deve ser uma tela fixa;
- a composição deve ser dinâmica e baseada em intenção;
- o sistema deve ser modular para permitir evolução incremental;
- a camada de UI deve depender de um plano de resposta, não de lógica fixa.

## 8. MVP Recomendado
### Entregas iniciais
- chat simples
- consulta por cidade
- resumo textual
- previsão de 5 dias
- gráfico de precipitação
- card de temperatura
- mapa simples

## 9. Próximos Passos
- definir o contrato do orquestrador
- definir os tipos de widgets
- definir o fluxo de renderização
- implementar o primeiro fluxo conversacional com MCP

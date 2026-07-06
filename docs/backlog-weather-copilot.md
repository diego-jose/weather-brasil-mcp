# Backlog Inicial — Weather Copilot MVP

## Priorização
- P0: essencial para entregar valor no MVP
- P1: importante para melhorar a experiência
- P2: desejável para evolução futura

## P0 — Essencial
### 1. Integrar o MCP Weather Brasil ao fluxo conversacional
- Conectar a camada de chat com as ferramentas do MCP.
- Permitir busca de temperatura atual, previsão e precipitação.

### 2. Suportar consulta por cidade em linguagem natural
- O usuário deve poder dizer uma cidade e obter resposta relevante.
- O sistema deve resolver a cidade para o MCP.

### 3. Exibir resumo textual do clima
- Mostrar um resumo simples e objetivo com base nos dados retornados.

### 4. Exibir previsão de até 5 dias
- Renderizar a previsão em formato de lista ou gráfico simples.

### 5. Exibir gráfico de precipitação
- Mostrar a chance de chuva e valores de precipitação por dia.

### 6. Exibir um mapa simples da cidade
- Mostrar a localização da cidade selecionada.

## P1 — Importante
### 7. Suportar comparação entre duas cidades
- Permitir que o usuário compare clima entre cidades.
- Mostrar diferença estrutural de temperatura e chuva.

### 8. Manter contexto da conversa
- O sistema deve lembrar a cidade e o tema da última pergunta para perguntas de acompanhamento.

### 9. Sugerir próximos passos
- Após cada resposta, oferecer sugestões de perguntas relacionadas.

### 10. Tratar erros de API com fallback
- Se o MCP falhar, mostrar mensagem amigável e manter a experiência funcional.

## P2 — Desejável
### 11. Adicionar recomendações contextuais
- Exemplo: roupa ideal, atividades ao ar livre, melhor horário para sair.

### 12. Personalizar preferências do usuário
- Cidade favorita, unidade de temperatura, tema de interface.

### 13. Histórico de sessões
- Salvar as consultas recentes para retorno posterior.

### 14. Upgrade para visualizações mais ricas
- gráficos interativos, legendas, filtros e zoom.

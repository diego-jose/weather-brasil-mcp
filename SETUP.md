# 🚀 Guia de Setup Inicial - MCP Weather Brasil

## Fase 1: Preparação do Ambiente

### ✅ Pré-requisitos

Antes de começar, você precisa ter instalado:

```bash
# Verificar Node.js (versão 16+)
node --version

# Verificar npm (versão 8+)
npm --version

# Resultado esperado:
# v18.0.0 ou superior
# 8.0.0 ou superior
```

**Não tem Node.js?** Baixe em: https://nodejs.org/

---

## Fase 2: Download e Setup

### 📥 Passo 1: Clonar/Criar o Projeto

```bash
# Opção A: Se você tem Git
git clone <seu-repo> mcp-weather-brasil
cd mcp-weather-brasil

# Opção B: Se você baixou os arquivos ZIP
unzip mcp-weather-brasil.zip
cd mcp-weather-brasil
```

### 📦 Passo 2: Instalar Dependências

```bash
# Instalar todas as dependências (vai levar 1-2 minutos)
npm install

# Você deve ver algo como:
# added 150 packages in 45s
```

**⚠️ Se der erro de permissions:**
```bash
# No macOS/Linux
sudo npm install

# No Windows, rode o PowerShell como Admin
```

---

## Fase 3: Configuração

### ⚙️ Passo 3: Copiar Arquivo de Ambiente

```bash
# Copiar arquivo de exemplo
cp src/.env.example .env

# Ou no Windows
copy src\.env.example .env
```

**Verifique o arquivo `.env`:**
```
MCP_WEATHER_API=openmeteo
LOG_LEVEL=info
OPENMETEO_BASE_URL=https://api.open-meteo.com/v1
CACHE_TTL=3600
PORT=3000
```

---

## Fase 4: Compilação

### 🔨 Passo 4: Compilar TypeScript

```bash
# Compilar o código TypeScript para JavaScript
npm run build

# Você deve ver:
# Compilação completa sem erros
# Pasta 'dist/' criada com os arquivos .js
```

**Verificar se foi criada a pasta `dist/`:**
```bash
# Linux/macOS
ls -la dist/

# Windows
dir dist

# Resultado esperado:
# - index.js
# - adapters/
# - tools/
# - utils/
# - types/
```

---

## Fase 5: Teste Básico

### ✨ Passo 5: Executar o Servidor MCP

```bash
# Iniciar o servidor em modo desenvolvimento
npm run dev

# Você deve ver no console:
# ✅ Iniciando MCP Server - Dados Meteorológicos Brasil
# ✅ Adapter: OpenMeteo
# ✅ Ferramentas disponíveis:
#   - obter_temperatura_atual
#   - obter_previsao_tempo
#   - obter_precipitacao
# ✅ MCP Server conectado e pronto para uso
# ✅ Aguardando requisições...
```

**Se vir isso, significa que tudo está funcionando! ✅**

---

## Fase 6: Teste Prático

### 🧪 Passo 6: Testar as Ferramentas (Em outro terminal)

Enquanto o servidor está rodando em um terminal, abra **outro terminal** e rode:

```bash
# Compilar e rodar o exemplo
npm run build && npx ts-node examples/exemplo-uso.ts

# Você deve ver uma saída como:
# ============================================================
# Exemplo de Uso - MCP Weather Brasil
# ============================================================
# 
# 📍 EXEMPLO 1: Temperatura Atual em São Paulo
# ----
# Cidade: São Paulo
# 🌡️  Temperatura: 25.3°C
# 🤔 Sensação térmica: 24.1°C
# 💧 Umidade: 65%
# 💨 Vento: 12.5 km/h NE
# ☁️  Condição: Parcialmente nublado
```

---

## Fase 7: Verificação Completa

### ✅ Passo 7: Checklist Final

```bash
# 1. Verificar estrutura de pastas
ls -R src/
# Deve mostrar: types/, adapters/, tools/, utils/, index.ts

# 2. Verificar build
ls dist/
# Deve mostrar arquivos .js compilados

# 3. Verificar dependências
npm list @modelcontextprotocol/sdk
# Deve mostrar a versão instalada

# 4. Verificar variáveis de ambiente
cat .env
# Deve mostrar as configurações
```

---

## 🎯 Próximos Passos Após Setup

### Opção A: Integração com Claude
```bash
# Se tem Claude Code CLI instalado:
claude-code --mcp ./dist/index.js
```

### Opção B: Usar em Desenvolvimento
```bash
# Manter o servidor rodando
npm run dev

# E em outro terminal, fazer testes
npm run build && npm start
```

### Opção C: Modo Produção
```bash
# Compilar uma vez
npm run build

# Depois rodar
npm start
```

---

## 🐛 Troubleshooting

### ❌ Erro: "Command not found: npm"
```
Solução: Node.js não está instalado
👉 Baixe em https://nodejs.org/
```

### ❌ Erro: "Cannot find module @modelcontextprotocol/sdk"
```
Solução: Dependências não instaladas
👉 Execute: npm install
```

### ❌ Erro: "TypeScript compilation failed"
```
Solução: Arquivo tsconfig.json inválido
👉 Verifique o arquivo: cat tsconfig.json
```

### ❌ Erro: "Cannot fetch from openweathermap.com"
```
Solução: Sem conexão com internet ou API indisponível
👉 Verifique sua conexão
👉 Tente com VPN
👉 Aguarde a API ficar disponível
```

### ❌ Erro: "Cidade não encontrada"
```
Solução: Cidade não está no banco de dados
👉 Liste cidades suportadas em: src/types/weather.ts
👉 Adicione a cidade manualmente
```

### ❌ Erro: Permission denied (macOS/Linux)
```
Solução: Falta de permissão
👉 Execute: sudo npm install
```

---

## 📝 Comandos Úteis

```bash
# Instalar dependências
npm install

# Compilar TypeScript
npm run build

# Rodar em desenvolvimento (com reload automático)
npm run dev

# Rodar em produção
npm start

# Rodar exemplo
npx ts-node examples/exemplo-uso.ts

# Verificar versão do Node
node --version

# Limpar cache npm
npm cache clean --force

# Reinstalar dependências (nuclear option)
rm -rf node_modules package-lock.json
npm install
```

---

## 🎓 Entendendo o Projeto

### Estrutura de Pastas

```
mcp-weather-brasil/
│
├── src/                    # Código fonte TypeScript
│   ├── index.ts           # 🎯 Servidor MCP (arquivo principal)
│   ├── adapters/          # Conexões com APIs
│   │   ├── BaseAdapter.ts # Classe base abstrata
│   │   └── OpenMeteoAdapter.ts # Implementação OpenMeteo
│   ├── tools/             # Ferramentas para o MCP
│   │   ├── temperatureTool.ts
│   │   ├── forecastTool.ts
│   │   └── precipitationTool.ts
│   ├── types/             # Definições TypeScript
│   │   └── weather.ts
│   └── utils/             # Utilitários
│       ├── cache.ts       # Cache em memória
│       └── logger.ts      # Sistema de logs
│
├── dist/                  # Código compilado (gerado automaticamente)
│   └── (mesma estrutura de src/)
│
├── examples/              # Exemplos de uso
│   └── exemplo-uso.ts
│
├── package.json          # Dependências do projeto
├── tsconfig.json         # Configuração TypeScript
├── .env                  # Variáveis de ambiente (criar após setup)
└── README.md             # Documentação principal
```

### Fluxo de Execução

```
npm start / npm run dev
    ↓
dist/index.ts (código compilado)
    ↓
Servidor MCP inicia
    ↓
Carrega 3 Ferramentas:
  • TemperaturaTool
  • PrevisaoTool
  • PrecipitacaoTool
    ↓
Usa OpenMeteoAdapter para buscar dados
    ↓
Dados vão para Cache em memória
    ↓
Claude (ou outro cliente MCP) pode usar as ferramentas
```

---

## 💡 Dicas Importantes

### 📌 Dica 1: Entender o Log
```
[2024-01-15T14:30:00.123Z] [INFO] Iniciando MCP Server
  ↑                         ↑      ↑
  Timestamp ISO         Nível    Mensagem
```

### 📌 Dica 2: Ativar Debug
```bash
# Para ver logs detalhados:
LOG_LEVEL=debug npm run dev
```

### 📌 Dica 3: Testar Temperatura de uma Cidade
```bash
# Editar exemplo-uso.ts e mudar a cidade
# Ou usar a ferramenta direto via Claude
```

### 📌 Dica 4: Cache em Ação
```bash
# Primeira requisição: busca da API (mais lenta)
# Segunda requisição: do cache (instantâneo)
# Depois de 30 min: busca novamente da API
```

---

## ✅ Você Conseguiu!

Quando tudo estiver funcionando:

1. ✅ `npm install` completado
2. ✅ `npm run build` sem erros
3. ✅ `npm run dev` mostrando "Aguardando requisições..."
4. ✅ Exemplos rodando com dados reais

**Parabéns! 🎉 Seu MCP Weather Brasil está 100% funcional!**

---

## 🤔 O que fazer agora?

### Opção 1: Conectar com Claude
```bash
# Se tem Claude Code CLI
claude-code --mcp ./dist/index.js
```

### Opção 2: Adicionar Mais Cidades
- Edit: `src/types/weather.ts`
- Add cidades ao objeto `CIDADES_BRASIL`
- Run: `npm run build`

### Opção 3: Implementar INMET Adapter
- Criar: `src/adapters/InmetAdapter.ts`
- Estender `BaseAdapter`
- Integrar ao `src/index.ts`

### Opção 4: Explorar o Código
- Entender como funciona cada arquivo
- Adicionar mais funcionalidades
- Customizar para suas necessidades

---

## 📞 Suporte

Se tiver problemas:

1. **Verifique o Node.js:** `node --version`
2. **Verifique npm:** `npm --version`
3. **Verifique a pasta:** `ls -la` (deve ter `src/`, `package.json`, etc)
4. **Tente reinstalar:** `npm install`
5. **Limpe cache:** `npm cache clean --force`
6. **Veja os logs:** `LOG_LEVEL=debug npm run dev`

---

**Bom desenvolvimento! 💻✨**

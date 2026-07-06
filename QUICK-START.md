# ⚡ Quick Start - MCP Weather Brasil

## 📝 Checklist Rápido

```
☐ Node.js v16+ instalado (node --version)
☐ npm v8+ instalado (npm --version)
☐ Arquivos do projeto baixados
☐ Terminal aberto na pasta do projeto
```

---

## 🚀 3 Comandos para Começar

### 1️⃣ Instalar
```bash
npm install
```
**O que faz:** Baixa todas as dependências (demora 1-2 minutos)

---

### 2️⃣ Compilar
```bash
npm run build
```
**O que faz:** Converte TypeScript → JavaScript na pasta `dist/`

---

### 3️⃣ Rodar
```bash
npm run dev
```
**O que faz:** Inicia o servidor MCP (vai mostrar ✅ se tudo OK)

---

## 🎯 Verificar se Funcionou

**Você deve ver no console:**
```
✅ Iniciando MCP Server - Dados Meteorológicos Brasil
✅ Adapter: OpenMeteo
✅ Ferramentas disponíveis:
  - obter_temperatura_atual
  - obter_previsao_tempo
  - obter_precipitacao
✅ MCP Server conectado e pronto para uso
```

**Se viu isso = SUCESSO! 🎉**

---

## 📱 Testar as Ferramentas

### **Em um novo terminal** (enquanto `npm run dev` está rodando):

```bash
# Compilar e rodar exemplo
npm run build && npx ts-node examples/exemplo-uso.ts
```

**Você deve ver:**
- Temperatura atual de São Paulo
- Previsão de 5 dias
- Dados de chuva com resumo
- Múltiplas cidades
- Status do cache

---

## 🔧 Cheat Sheet de Comandos

| Comando | O que faz |
|---------|-----------|
| `npm install` | Instala dependências |
| `npm run build` | Compila TypeScript |
| `npm run dev` | Roda em desenvolvimento |
| `npm start` | Roda em produção |
| `npm run build && npm start` | Compila e roda produção |
| `npx ts-node examples/exemplo-uso.ts` | Executa exemplo |
| `node --version` | Verifica Node.js |
| `npm --version` | Verifica npm |
| `npm cache clean --force` | Limpa cache (nuclear) |

---

## 📂 Arquivos Importantes

```
src/index.ts           ← 🎯 Arquivo principal do MCP
src/adapters/          ← Como se conectar com APIs
src/tools/             ← As 3 ferramentas principais
src/types/weather.ts   ← Cidades e tipos
.env                   ← Configuração (criar após setup)
```

---

## 🔥 Problemas Comuns

### ❌ "Command not found: npm"
```bash
# Solução: Instalar Node.js
# https://nodejs.org/
```

### ❌ "Cannot find module"
```bash
# Solução: Instalar dependências
npm install
```

### ❌ "Compilation error"
```bash
# Solução: Limpar e reinstalar
rm -rf node_modules package-lock.json
npm install
npm run build
```

### ❌ "Cannot fetch from API"
```bash
# Solução: Verificar internet ou usar VPN
# Ou aguardar API ficar disponível
```

---

## 💡 Dicas Rápidas

### Ativar modo debug
```bash
LOG_LEVEL=debug npm run dev
```

### Adicionar mais cidades
Edit `src/types/weather.ts` → `CIDADES_BRASIL`

### Conectar com Claude
```bash
# Se tem Claude Code CLI
claude-code --mcp ./dist/index.js
```

---

## ✅ Validação Final

```bash
# Rodar teste automatizado (Linux/macOS)
bash test-mcp.sh

# Resultado esperado:
# ✅ TUDO ESTÁ FUNCIONANDO PERFEITAMENTE!
```

---

## 🎓 Próximas Ações

1. **Seguir passo 1-3 acima** ✅
2. **Ver dados reais da API** (rodar exemplo)
3. **Explorar o código** (entender como funciona)
4. **Conectar com Claude** (integração final)
5. **Expandir** (adicionar INMET, mais cidades, etc)

---

## 📞 Suporte

- 📖 Veja: `SETUP.md` (guia completo)
- 📚 Veja: `README.md` (documentação)
- 🔍 Veja: `src/adapters/OpenMeteoAdapter.ts` (código exemplo)

---

**Bom começo! 🚀**

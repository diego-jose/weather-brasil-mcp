#!/bin/bash

# ============================================================
# Script de Teste - MCP Weather Brasil
# Este script verifica se tudo está configurado corretamente
# ============================================================

echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║  🧪 Teste de Setup - MCP Weather Brasil               ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Contadores
PASSED=0
FAILED=0

# Função auxiliar
test_command() {
    local description=$1
    local command=$2
    
    echo -n "🔍 $description... "
    
    if eval "$command" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ PASSOU${NC}"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}❌ FALHOU${NC}"
        ((FAILED++))
        return 1
    fi
}

# ============================================================
# TESTE 1: Verificar Node.js
# ============================================================
echo -e "${BLUE}📋 TESTE 1: Ambiente${NC}"
echo "---"

test_command "Node.js instalado" "command -v node"
if [ $? -eq 0 ]; then
    NODE_VERSION=$(node --version)
    echo "   └─ Versão: $NODE_VERSION"
fi

test_command "npm instalado" "command -v npm"
if [ $? -eq 0 ]; then
    NPM_VERSION=$(npm --version)
    echo "   └─ Versão: $NPM_VERSION"
fi

echo ""

# ============================================================
# TESTE 2: Verificar Estrutura do Projeto
# ============================================================
echo -e "${BLUE}📋 TESTE 2: Estrutura do Projeto${NC}"
echo "---"

test_command "package.json existe" "test -f package.json"
test_command "tsconfig.json existe" "test -f tsconfig.json"
test_command "src/ existe" "test -d src"
test_command "src/index.ts existe" "test -f src/index.ts"
test_command "src/types/weather.ts existe" "test -f src/types/weather.ts"
test_command "src/adapters/OpenMeteoAdapter.ts existe" "test -f src/adapters/OpenMeteoAdapter.ts"
test_command "src/tools/ existe" "test -d src/tools"

echo ""

# ============================================================
# TESTE 3: Verificar Dependências
# ============================================================
echo -e "${BLUE}📋 TESTE 3: Dependências${NC}"
echo "---"

if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  Dependências não instaladas!${NC}"
    echo "   Instalando... (isso pode levar alguns minutos)"
    npm install > /dev/null 2>&1
fi

test_command "node_modules existe" "test -d node_modules"
test_command "@modelcontextprotocol/sdk instalado" "test -d node_modules/@modelcontextprotocol"
test_command "typescript instalado" "test -f node_modules/.bin/tsc"
test_command "axios instalado" "test -d node_modules/axios"

echo ""

# ============================================================
# TESTE 4: Verificar Configuração
# ============================================================
echo -e "${BLUE}📋 TESTE 4: Configuração${NC}"
echo "---"

if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  Arquivo .env não encontrado${NC}"
    echo "   Criando a partir de .env.example..."
    if cp src/.env.example .env 2>/dev/null; then
        echo -e "   ${GREEN}✅ Arquivo .env criado${NC}"
    fi
fi

test_command ".env existe" "test -f .env"
test_command ".env contém MCP_WEATHER_API" "grep -q MCP_WEATHER_API .env"
test_command ".env contém LOG_LEVEL" "grep -q LOG_LEVEL .env"

echo ""

# ============================================================
# TESTE 5: Compilação TypeScript
# ============================================================
echo -e "${BLUE}📋 TESTE 5: Compilação${NC}"
echo "---"

echo -n "🔨 Compilando TypeScript... "
if npm run build > /tmp/build.log 2>&1; then
    echo -e "${GREEN}✅ PASSOU${NC}"
    ((PASSED++))
else
    echo -e "${RED}❌ FALHOU${NC}"
    echo "   Erros de compilação:"
    cat /tmp/build.log | head -20
    ((FAILED++))
fi

test_command "dist/ foi criado" "test -d dist"
test_command "dist/index.js existe" "test -f dist/index.js"

echo ""

# ============================================================
# TESTE 6: Testes de Runtime
# ============================================================
echo -e "${BLUE}📋 TESTE 6: Runtime${NC}"
echo "---"

echo -n "🔌 Verificando imports TypeScript... "
if npx ts-node -e "import { OpenMeteoAdapter } from './src/adapters/OpenMeteoAdapter.js'; console.log('OK')" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ PASSOU${NC}"
    ((PASSED++))
else
    echo -e "${RED}❌ FALHOU${NC}"
    ((FAILED++))
fi

echo -n "📊 Verificando tipos... "
if npx ts-node -e "import { CIDADES_BRASIL } from './src/types/weather.js'; console.log(Object.keys(CIDADES_BRASIL).length)" > /dev/null 2>&1; then
    NUM_CIDADES=$(npx ts-node -e "import { CIDADES_BRASIL } from './src/types/weather.js'; console.log(Object.keys(CIDADES_BRASIL).length)" 2>/dev/null)
    echo -e "${GREEN}✅ PASSOU${NC} ($NUM_CIDADES cidades carregadas)"
    ((PASSED++))
else
    echo -e "${RED}❌ FALHOU${NC}"
    ((FAILED++))
fi

echo ""

# ============================================================
# TESTE 7: Conectividade
# ============================================================
echo -e "${BLUE}📋 TESTE 7: Conectividade com APIs${NC}"
echo "---"

echo -n "🌐 Testando conexão com OpenMeteo... "
if curl -s "https://api.open-meteo.com/v1/forecast?latitude=-23.5505&longitude=-46.6333&current=temperature_2m" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ PASSOU${NC}"
    ((PASSED++))
else
    echo -e "${RED}❌ FALHOU${NC} (verifique sua conexão de internet)"
    ((FAILED++))
fi

echo ""

# ============================================================
# RESULTADO FINAL
# ============================================================
TOTAL=$((PASSED + FAILED))

echo "╔════════════════════════════════════════════════════════╗"
echo "║  📊 Resultado Final                                    ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""
echo -e "Testes: ${GREEN}$PASSED PASSOU${NC} | ${RED}$FAILED FALHOU${NC} | Total: $TOTAL"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}╔════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║  ✅ TUDO ESTÁ FUNCIONANDO PERFEITAMENTE!              ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "🚀 Próximos passos:"
    echo "   1. npm run dev          # Iniciar servidor"
    echo "   2. (em outro terminal)"
    echo "   3. npm run build && npm start"
    echo ""
    exit 0
else
    echo -e "${RED}╔════════════════════════════════════════════════════════╗${NC}"
    echo -e "${RED}║  ❌ ALGUNS TESTES FALHARAM                             ║${NC}"
    echo -e "${RED}╚════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "💡 Dicas:"
    echo "   • Verifique se Node.js está instalado (v16+)"
    echo "   • Execute: npm install"
    echo "   • Verifique sua conexão de internet"
    echo "   • Veja o arquivo SETUP.md para troubleshooting"
    echo ""
    exit 1
fi

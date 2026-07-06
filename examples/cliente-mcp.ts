import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

async function main() {
  const transport = new StdioClientTransport({
    command: 'C:\\Program Files\\nodejs\\node.exe',
    args: ['dist/index.js']
  });

  const client = new Client({
    name: 'cliente-weather-demo',
    version: '1.0.0'
  });

  await client.connect(transport);

  console.log('Cliente MCP conectado');

  const ping = await client.ping();
  console.log('Ping OK', ping);

  const tools = await client.listTools();
  console.log('Ferramentas disponíveis:', tools.tools.map((tool: any) => tool.name));

  const resultado = await client.callTool({
    name: 'obter_temperatura_atual',
    arguments: { cidade: 'São Paulo' }
  });

  console.log('Resultado:');
  console.log(JSON.stringify(resultado, null, 2));

  await transport.close();
}

main().catch((erro) => {
  console.error('Erro no cliente MCP:', erro);
  process.exit(1);
});

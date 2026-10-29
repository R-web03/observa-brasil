// Cria um conteúdo novo a partir do molde da fase 0.
//   npm run novo -- aula o-que-a-economia-estuda
//   npm run novo -- verbete custo-de-oportunidade
// Tipos: aula, verbete, trilha, analise, comparacao, indicador
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const TIPOS = {
  aula: { molde: 'AULA.md', pasta: 'aulas' },
  verbete: { molde: 'VERBETE.md', pasta: 'verbetes' },
  trilha: { molde: 'TRILHA.md', pasta: 'trilhas' },
  analise: { molde: 'ANALISE.md', pasta: 'analises' },
  comparacao: { molde: 'COMPARACAO.md', pasta: 'comparacoes' },
  indicador: { molde: 'FICHA-INDICADOR.md', pasta: 'indicadores' },
};

const [tipo, nome] = process.argv.slice(2);
const config = TIPOS[tipo];
if (!config || !nome) {
  console.error(`Uso: npm run novo -- <${Object.keys(TIPOS).join('|')}> <nome-do-arquivo>`);
  process.exit(1);
}
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(nome)) {
  console.error('O nome deve ter só letras minúsculas sem acento, números e hífens. Ex.: custo-de-oportunidade');
  process.exit(1);
}

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const molde = join(raiz, '..', 'fase-0-fundacao', 'moldes', config.molde);
const destino = join(raiz, 'src', 'content', config.pasta, `${nome}.mdx`);

if (existsSync(destino)) {
  console.error(`Já existe: ${destino}`);
  process.exit(1);
}

// O molde usa comentários HTML (<!-- -->), que o MDX não aceita: viram {/* */}.
const texto = readFileSync(molde, 'utf8').replace(/<!--([\s\S]*?)-->/g, (_, c) => `{/*${c.replace(/\*\//g, '* /')}*/}`);

mkdirSync(dirname(destino), { recursive: true });
writeFileSync(destino, texto);
console.log(`Criado: src/content/${config.pasta}/${nome}.mdx`);
console.log('Preencha o cabeçalho e o texto. Regras em fase-0-fundacao/METODO.md e ESTILO.md.');

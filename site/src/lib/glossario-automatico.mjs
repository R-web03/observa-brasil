// Plugin do MDX: toda palavra do glossário que aparece num texto vira um link com
// a definição curta, que o balão (components/Glossa.astro) mostra ao passar o mouse
// ou tocar. Vale para aulas, verbetes e qualquer outro conteúdo em .mdx.
//
// Regras:
// - cada termo é marcado só na primeira vez em cada parágrafo, item de lista ou célula,
//   para o texto não virar um mar de sublinhados;
// - não marca dentro de títulos, links, código, resumos de <details> nem de <Termo>;
// - no próprio verbete, o termo não aponta para si mesmo;
// - `gatilhos` no cabeçalho do verbete substitui termo + sinônimos (lista vazia desliga).
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';

const PASTA = join(process.cwd(), 'src', 'content', 'verbetes');
const PULAR = new Set(['a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code', 'pre', 'summary', 'button', 'script', 'style', 'svg']);
const BLOCOS = new Set(['p', 'li', 'td', 'th', 'dd', 'dt', 'blockquote', 'figcaption']);
const LETRA = '[\\p{L}\\p{N}]';

function incluir(status) {
  if (process.env.NODE_ENV !== 'production' || process.env.INCLUIR_RASCUNHOS === '1') return true;
  return status !== 'rascunho';
}

/** Formas que o texto costuma usar: plural simples, -ão → -ões, -al → -ais. */
function variantes(palavra) {
  const formas = new Set([palavra]);
  if (/[aeiou]$/i.test(palavra)) formas.add(palavra + 's');
  if (/[rz]$/i.test(palavra)) formas.add(palavra + 'es');
  if (/ão$/.test(palavra)) formas.add(palavra.replace(/ão$/, 'ões'));
  if (/al$/.test(palavra)) formas.add(palavra.replace(/al$/, 'ais'));
  return [...formas];
}

const escapar = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function carregar() {
  const termos = [];
  for (const arquivo of readdirSync(PASTA)) {
    if (!arquivo.endsWith('.mdx') && !arquivo.endsWith('.md')) continue;
    const texto = readFileSync(join(PASTA, arquivo), 'utf8');
    const fm = parse(texto.split(/^---$/m)[1] ?? '') ?? {};
    if (!incluir(fm.status)) continue;
    const id = arquivo.replace(/\.mdx?$/, '');
    const explicitos = Array.isArray(fm.gatilhos);
    const gatilhos = explicitos ? fm.gatilhos : [fm.termo, ...(fm.sinonimos ?? [])];
    for (const g of gatilhos.filter(Boolean)) {
      for (const forma of variantes(String(g))) {
        // Siglas e nomes com mais de uma maiúscula (IPCA, Banco Central): só casam exatamente assim.
        // O resto casa com a primeira letra maiúscula ou minúscula (Juros, juros).
        // Gatilho escrito à mão com maiúscula (União) também é exato: evita "a união da família".
        const sensivel = explicitos ? /\p{Lu}/u.test(forma) : /\p{Lu}/u.test(forma.slice(1));
        const base = sensivel ? forma : forma[0].toLowerCase() + forma.slice(1);
        termos.push({ id, termo: fm.termo, definicao: fm.definicao, forma: base, sensivel });
      }
    }
  }
  // O mais longo primeiro: "déficit primário" ganha de "déficit".
  termos.sort((a, b) => b.forma.length - a.forma.length);
  return termos;
}

function montarBusca(termos) {
  if (termos.length === 0) return null;
  const partes = termos.map((t) => {
    if (t.sensivel) return escapar(t.forma);
    const primeira = t.forma[0];
    return `[${escapar(primeira)}${escapar(primeira.toUpperCase())}]${escapar(t.forma.slice(1))}`;
  });
  return new RegExp(`(?<!${LETRA})(?:${partes.join('|')})(?!${LETRA})`, 'gu');
}

function achar(termos, trecho) {
  const baixo = trecho.toLowerCase();
  return termos.find((t) => (t.sensivel ? t.forma === trecho : t.forma.toLowerCase() === baixo));
}

export function glossarioAutomatico() {
  const termos = carregar();
  const busca = montarBusca(termos);

  return (arvore, arquivo) => {
    if (!busca) return;
    const caminho = String(arquivo?.path ?? '').replace(/\\/g, '/');
    const proprio = caminho.includes('/content/verbetes/') ? caminho.split('/').pop().replace(/\.mdx?$/, '') : null;

    const percorrer = (no, usados) => {
      if (!no.children) return;
      const filhos = [];
      for (const filho of no.children) {
        if (filho.type === 'element' && PULAR.has(filho.tagName)) {
          filhos.push(filho);
          continue;
        }
        if ((filho.type === 'mdxJsxTextElement' || filho.type === 'mdxJsxFlowElement') && filho.name === 'Termo') {
          filhos.push(filho);
          continue;
        }
        if (filho.type === 'text') {
          filhos.push(...trocar(filho.value, usados));
          continue;
        }
        const novoBloco = filho.type === 'element' && BLOCOS.has(filho.tagName);
        percorrer(filho, novoBloco ? new Set() : usados);
        filhos.push(filho);
      }
      no.children = filhos;
    };

    const trocar = (texto, usados) => {
      const saida = [];
      let ultimo = 0;
      busca.lastIndex = 0;
      for (const m of texto.matchAll(busca)) {
        const t = achar(termos, m[0]);
        if (!t || t.id === proprio || usados.has(t.id)) continue;
        usados.add(t.id);
        if (m.index > ultimo) saida.push({ type: 'text', value: texto.slice(ultimo, m.index) });
        saida.push({
          type: 'element',
          tagName: 'a',
          properties: { className: ['glossa'], href: `/conceitos/${t.id}`, dataTermo: t.termo, dataDef: t.definicao },
          children: [{ type: 'text', value: m[0] }],
        });
        ultimo = m.index + m[0].length;
      }
      if (ultimo === 0) return [{ type: 'text', value: texto }];
      if (ultimo < texto.length) saida.push({ type: 'text', value: texto.slice(ultimo) });
      return saida;
    };

    percorrer(arvore, new Set());
  };
}

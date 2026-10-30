// Imagens de compartilhamento (1200 x 630), geradas no build: uma por estudo da pirâmide,
// mais as de /impactos e /impactos/onde-eu-entro. É o que aparece no WhatsApp ao colar o link.
import type { APIRoute, GetStaticPaths } from 'astro';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { CAMADAS, ESTUDOS, ROTULO_EFEITO, type Efeito, type Estudo } from '../../lib/impactos';
import { buscarGoverno } from '../../lib/governos';

// Cores do tema escuro (ds-tokens.css): a imagem tem fundo fixo, sem modo claro.
const COR = { fundo: '#08080A', superficie: '#121315', borda: '#2a2c30', tinta: '#F4F5F6', apagada: '#a9aeb4' };
const COR_EFEITO: Record<Efeito, string> = {
  ganhou: '#3fc1a0',
  pagou: '#f08a5d',
  misto: '#b9a6f2',
  incerto: '#a9aeb4',
  neutro: '#6b7078',
};

type No = { type: string; props: Record<string, unknown> & { children?: unknown } };
const h = (type: string, style: Record<string, unknown>, children?: unknown): No => ({ type, props: { style, children } });

// Lido do disco no build (o build roda na pasta site/).
const fonte = (arquivo: string) => readFile(join(process.cwd(), 'src/assets/fontes', arquivo));

function piramide(e: Estudo): No {
  return h(
    'div',
    { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: 560 },
    CAMADAS.map((c, i) => {
      const ef = e.camadas[c.id].efeito;
      return h(
        'div',
        {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: `${56 + i * 11}%`,
          height: 62,
          padding: '0 20px',
          background: COR.superficie,
          border: `1px solid ${COR.borda}`,
          borderLeft: `8px solid ${COR_EFEITO[ef]}`,
          borderRadius: 12,
        },
        [
          h('span', { fontFamily: 'Archivo', fontSize: 22, color: COR.tinta }, c.nome),
          h('span', { fontFamily: 'Plex', fontSize: 17, color: COR_EFEITO[ef], textTransform: 'uppercase', letterSpacing: 1 }, ROTULO_EFEITO[ef].texto),
        ],
      );
    }),
  );
}

function quadro(etiqueta: string, titulo: string, direita: No | null, rodape: string): No {
  return h('div', { display: 'flex', flexDirection: 'column', width: 1200, height: 630, padding: 56, background: COR.fundo, color: COR.tinta }, [
    h('div', { display: 'flex', flex: 1, gap: 48, alignItems: 'center' }, [
      h('div', { display: 'flex', flexDirection: 'column', flex: 1, gap: 20 }, [
        h('span', { fontFamily: 'Plex', fontSize: 18, color: COR.apagada, textTransform: 'uppercase', letterSpacing: 2 }, etiqueta),
        h('span', { fontFamily: 'Display', fontSize: titulo.length > 44 ? 50 : 60, lineHeight: 1.05, letterSpacing: -1.5 }, titulo),
      ]),
      ...(direita ? [direita] : []),
    ]),
    h('div', { display: 'flex', justifyContent: 'space-between', fontFamily: 'Plex', fontSize: 18, color: COR.apagada, borderTop: `1px solid ${COR.borda}`, paddingTop: 20 }, [
      h('span', { fontFamily: 'Display', fontSize: 24, color: COR.tinta }, 'Observa Brasil'),
      h('span', {}, rodape),
    ]),
  ]);
}

export const getStaticPaths = (() => [
  ...ESTUDOS.map((e) => ({ params: { id: e.id } })),
  { params: { id: 'impactos' } },
  { params: { id: 'onde-eu-entro' } },
]) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const e = ESTUDOS.find((x) => x.id === params.id);
  let arvore: No;
  if (e) {
    const g = buscarGoverno(e.governo);
    arvore = quadro(`Quem ganhou e quem pagou · ${g?.nome ?? ''}`, e.titulo, piramide(e), 'Faixa por faixa, com fonte e grau de evidência');
  } else if (params.id === 'onde-eu-entro') {
    arvore = quadro('Pirâmide de impacto', 'Onde a sua família entra em cada decisão, desde 2003', null, 'Diga a renda da sua casa e veja a sua faixa');
  } else {
    arvore = quadro('Pirâmide de impacto', 'Quem ganhou e quem pagou com cada decisão econômica', null, 'Do topo à pobreza, com o grau de evidência');
  }

  const svg = await satori(arvore as never, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Display', data: await fonte('archivo-800-italico.woff'), weight: 800, style: 'italic' },
      { name: 'Archivo', data: await fonte('archivo-400.woff'), weight: 400, style: 'normal' },
      { name: 'Plex', data: await fonte('plex-mono-500.woff'), weight: 500, style: 'normal' },
    ],
  });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};

import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';

// Em produção só aparece o que foi aprovado. Em desenvolvimento aparece tudo,
// com uma faixa avisando que é rascunho. INCLUIR_RASCUNHOS=1 faz o build gerar
// também os rascunhos, para que um erro de MDX apareça antes da aprovação
// (scripts/verificar-rascunhos.mjs).
const VISIVEIS_EM_PRODUCAO = new Set(['aprovado', 'publicado']);
const INCLUIR_RASCUNHOS = process.env.INCLUIR_RASCUNHOS === '1';

export function visivel(status: string): boolean {
  return import.meta.env.DEV || INCLUIR_RASCUNHOS || VISIVEIS_EM_PRODUCAO.has(status);
}

export async function listar<C extends CollectionKey>(colecao: C): Promise<CollectionEntry<C>[]> {
  const itens = await getCollection(colecao);
  return itens.filter((item) => visivel((item.data as { status: string }).status));
}

/** Endereço público de cada tipo de conteúdo. */
export const ROTAS = {
  aulas: '/curso',
  verbetes: '/conceitos',
  trilhas: '/trilhas',
  analises: '/analises',
  comparacoes: '/comparacoes',
  indicadores: '/indicadores',
} as const satisfies Record<CollectionKey, string>;

export function url(colecao: CollectionKey, id: string): string {
  return `${ROTAS[colecao]}/${id}`;
}

export const ROTULO_STATUS: Record<string, string> = {
  rascunho: 'Rascunho',
  'em-revisao': 'Em revisão',
  aprovado: 'Aprovado',
  publicado: 'Publicado',
};

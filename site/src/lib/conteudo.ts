import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';

// Em produção aparece o que foi aprovado e o que está em revisão (este com uma faixa
// avisando que ainda não passou pelos revisores externos). Em desenvolvimento aparece
// tudo, com uma faixa avisando que é rascunho. INCLUIR_RASCUNHOS=1 faz o build gerar
// também os rascunhos, para que um erro de MDX apareça antes da aprovação
// (scripts/verificar-rascunhos.mjs).
const VISIVEIS_EM_PRODUCAO = new Set(['em-revisao', 'aprovado', 'publicado']);
const FINALIZADOS = new Set(['aprovado', 'publicado']);

/** Já passou pela revisão: aparece sem faixa nem etiqueta de status. */
export function finalizado(status: string): boolean {
  return FINALIZADOS.has(status);
}
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

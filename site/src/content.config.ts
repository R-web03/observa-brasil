// Coleções de conteúdo. Cada esquema espelha um molde de fase-0-fundacao/moldes/.
// Se um arquivo não seguir o esquema, o build falha e diz qual campo está errado.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const status = z.enum(['rascunho', 'em-revisao', 'aprovado', 'publicado']);
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'use letras minúsculas, números e hífens');
const data = z.coerce.date();
// Campo de data deixado em branco no molde vira "ausente", e não 1º jan. 1970.
const dataOpcional = z.preprocess((v) => (v == null || v === '' ? undefined : v), z.coerce.date().optional());

const PUBLICAVEL = new Set(['aprovado', 'publicado']);

/**
 * Regra de REVISAO.md, aplicada pelo build: nada é aprovado sem revisor,
 * conteúdo sensível precisa de dois, e nenhum link provisório (.invalid) vai ao ar.
 */
function exigirRevisao(d: { status: string; revisores: string[]; revisao_cruzada?: boolean }, ctx: z.RefinementCtx) {
  if (!PUBLICAVEL.has(d.status)) return;
  const minimo = d.revisao_cruzada ? 2 : 1;
  if (d.revisores.length < minimo) {
    ctx.addIssue({
      code: 'custom',
      path: ['revisores'],
      message: `status "${d.status}" exige ${minimo} revisor(es)${d.revisao_cruzada ? ' (revisão cruzada)' : ''}`,
    });
  }
  if (JSON.stringify(d).includes('.invalid')) {
    ctx.addIssue({ code: 'custom', path: ['status'], message: 'há link provisório (.invalid) a preencher' });
  }
}

const correcao = z.object({
  data,
  antes: z.string(),
  depois: z.string(),
  muda_conclusao: z.boolean().default(false),
});

// Campos comuns a todo conteúdo editorial.
const editorial = {
  status,
  autoria: z.string(),
  revisores: z.array(z.string()).default([]),
  publicado_em: dataOpcional,
  atualizado_em: dataOpcional,
  correcoes: z.array(correcao).default([]),
};

const arquivos = (pasta: string) =>
  glob({ pattern: '**/[^_]*.{md,mdx}', base: `./src/content/${pasta}` });

const aulas = defineCollection({
  loader: arquivos('aulas'),
  schema: z.object({
    ...editorial,
    numero: z.number().int().min(1).max(11),
    titulo: z.string().max(110),
    linha_fina: z.string(),
    tempo_leitura_min: z.number().int().positive(),
    conceitos: z.array(slug).default([]),
    revisao_cruzada: z.boolean().default(false),
  }).superRefine(exigirRevisao),
});

const verbetes = defineCollection({
  loader: arquivos('verbetes'),
  schema: z.object({
    ...editorial,
    termo: z.string(),
    definicao: z.string().max(240), // a frase do aviso de uma linha
    sinonimos: z.array(z.string()).default([]),
    // Palavras que acionam o balão automático. Se ausente, usa termo + sinônimos;
    // lista vazia desliga (útil para palavras comuns, como "taxa").
    gatilhos: z.array(z.string()).optional(),
    familia: z.enum([
      'organizacao-do-estado',
      'fundamentos',
      'precos-e-moeda',
      'trabalho-e-renda',
      'crescimento',
      'contas-publicas',
      'estado-e-empresas',
      'correntes',
    ]),
    nivel: z.enum(['basico', 'aprofundamento']).default('basico'),
    nao_confundir_com: z.array(slug).default([]),
  }).superRefine(exigirRevisao),
});

const trilhas = defineCollection({
  loader: arquivos('trilhas'),
  schema: z.object({
    ...editorial,
    pergunta: z.string(),
    conceitos: z.array(slug).default([]),
    revisao_cruzada: z.boolean().default(true),
  }).superRefine(exigirRevisao),
});

const analises = defineCollection({
  loader: arquivos('analises'),
  schema: z.object({
    ...editorial,
    titulo: z.string(),
    linha_fina: z.string(),
    objeto: z.enum(['politica', 'proposta', 'declaracao']),
    autor_da_proposta: z.string(),
    data_da_afirmacao: data,
    fonte_da_afirmacao: z.url(),
    pre_requisitos: z.array(slug).max(4).default([]),
    data_de_corte_dos_dados: data,
    revisao_cruzada: z.boolean().default(true),
  }).superRefine(exigirRevisao),
});

const comparacoes = defineCollection({
  loader: arquivos('comparacoes'),
  schema: z.object({
    ...editorial,
    titulo: z.string(),
    formato: z.enum(['indicador-por-periodo', 'politica-contra-politica', 'brasil-e-outros-paises']),
    lados: z
      .array(
        z.object({
          nome: z.string(),
          inicio: z.string().regex(/^\d{4}-\d{2}$/),
          fim: z.string().regex(/^\d{4}-\d{2}$/),
          data_de_corte: dataOpcional,
        }),
      )
      .min(2),
    janela_equivalente: z.string(),
    indicadores: z.array(slug).min(2, 'compare mais de um indicador por tema'),
    revisao_cruzada: z.boolean().default(true),
  }).superRefine(exigirRevisao),
});

const indicadores = defineCollection({
  loader: arquivos('indicadores'),
  schema: z.object({
    nome: z.string(),
    o_que_mede: z.string(),
    unidade: z.string(),
    instituicao: z.string(),
    serie: z.string(),
    link: z.url(),
    frequencia: z.enum(['diaria', 'mensal', 'trimestral', 'anual']),
    quebras_de_serie: z.array(z.object({ data, motivo: z.string() })).default([]),
    verbete: z.preprocess((v) => v ?? undefined, slug.optional()),
    andam_junto: z.array(slug).default([]),
    status,
    atualizado_em: dataOpcional,
  }),
});

export const collections = { aulas, verbetes, trilhas, analises, comparacoes, indicadores };

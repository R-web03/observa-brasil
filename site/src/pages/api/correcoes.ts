// Recebe pedidos de correção dos leitores.
// Defesas: checagem de origem (Astro, security.checkOrigin), validação de todos
// os campos, campo isca contra robôs, limite de envios por IP (guardado só como
// hash) e gravação pelo servidor, sem expor o banco ao navegador.
import type { APIRoute } from 'astro';
import { z } from 'astro/zod';
import { IP_HASH_SALT } from 'astro:env/server';
import { supabaseServidor } from '../../lib/supabase';
import { hashIp, ipDoCliente, json } from '../../lib/seguranca';

export const prerender = false;

const LIMITE_POR_HORA = 5;

const vazioParaNull = (v: unknown) => (typeof v === 'string' && v.trim() === '' ? null : v);

const Pedido = z.object({
  pagina: z.string().trim().min(1).max(300),
  trecho: z.preprocess(vazioParaNull, z.string().trim().max(2000).nullable()).default(null),
  descricao: z.string().trim().min(10, 'Descreva o problema em pelo menos 10 caracteres.').max(4000),
  fonte_sugerida: z.preprocess(vazioParaNull, z.string().trim().max(1000).nullable()).default(null),
  email: z.preprocess(vazioParaNull, z.email('E-mail inválido.').max(254).nullable()).default(null),
  // Campo isca: invisível para pessoas. Se vier preenchido, é robô.
  site_web: z.string().max(0).optional(),
});

export const POST: APIRoute = async ({ request, redirect, clientAddress }) => {
  const ehFormulario = (request.headers.get('content-type') ?? '').includes('form');
  const responder = (ok: boolean, mensagem: string, status: number) =>
    ehFormulario
      ? redirect(`/correcoes?${ok ? 'enviado=1' : `erro=${encodeURIComponent(mensagem)}`}#pedido`, 303)
      : json({ ok, mensagem }, status);

  let bruto: Record<string, unknown>;
  try {
    bruto = ehFormulario ? Object.fromEntries(await request.formData()) : await request.json();
  } catch {
    return responder(false, 'Não foi possível ler o pedido.', 400);
  }

  const resultado = Pedido.safeParse(bruto);
  if (!resultado.success) {
    const mensagem = resultado.error.issues[0]?.message ?? 'Pedido inválido.';
    return responder(false, mensagem, 400);
  }
  // Robô: finge sucesso para não ensinar a contornar a defesa.
  if (resultado.data.site_web) return responder(true, 'Recebido.', 200);

  const db = supabaseServidor();
  if (!db || !IP_HASH_SALT) return responder(false, 'O envio de correções ainda não está disponível.', 503);

  const ipHash = await hashIp(ipDoCliente(request, clientAddress), IP_HASH_SALT);
  const umaHoraAtras = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count, error: erroContagem } = await db
    .from('pedidos_correcao')
    .select('id', { count: 'exact', head: true })
    .eq('ip_hash', ipHash)
    .gte('criado_em', umaHoraAtras);

  if (erroContagem) return responder(false, 'Erro ao registrar o pedido. Tente de novo mais tarde.', 500);
  if ((count ?? 0) >= LIMITE_POR_HORA) {
    return responder(false, 'Muitos envios em pouco tempo. Tente de novo em uma hora.', 429);
  }

  const { site_web: _isca, ...pedido } = resultado.data;
  const { error } = await db.from('pedidos_correcao').insert({ ...pedido, ip_hash: ipHash });
  if (error) return responder(false, 'Erro ao registrar o pedido. Tente de novo mais tarde.', 500);

  return responder(true, 'Pedido recebido. Obrigado.', 201);
};

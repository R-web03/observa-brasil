// Verificação simples para monitoramento. Não expõe nenhum segredo.
import type { APIRoute } from 'astro';
import { supabaseServidor } from '../../lib/supabase';
import { json } from '../../lib/seguranca';

export const prerender = false;

export const GET: APIRoute = async () => {
  const db = supabaseServidor();
  let banco: 'ok' | 'erro' | 'nao-configurado' = 'nao-configurado';
  if (db) {
    const { error } = await db.from('observacoes').select('serie_id', { head: true, count: 'exact' }).limit(1);
    banco = error ? 'erro' : 'ok';
  }
  return json({ ok: banco !== 'erro', banco, hora: new Date().toISOString() }, banco === 'erro' ? 503 : 200);
};

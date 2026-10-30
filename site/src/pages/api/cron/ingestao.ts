// Rotina agendada (Vercel Cron, ver vercel.json): coleta as séries oficiais,
// grava no banco e, se houver dado novo, dispara um novo build do site.
// A Vercel envia "Authorization: Bearer <CRON_SECRET>" nas chamadas agendadas.
import type { APIRoute } from 'astro';
import { CRON_SECRET, DEPLOY_HOOK_URL } from 'astro:env/server';
import { supabaseServidor } from '../../../lib/supabase';
import { segredoConfere, json } from '../../../lib/seguranca';
import { SERIES } from '../../../lib/ingestao/series';
import { ingerirSerie } from '../../../lib/ingestao/gravar';
import { anosAtras } from '../../../lib/ingestao/fontes';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ?? null;
  if (!segredoConfere(token, CRON_SECRET)) return json({ ok: false }, 401);

  const db = supabaseServidor();
  if (!db) return json({ ok: false, mensagem: 'Banco não configurado' }, 503);

  // Coleta incremental (2 anos) para caber no tempo da função; séries que a fonte
  // recalcula por inteiro (sempreCompleta) são baixadas completas.
  // A carga completa de tudo é feita uma vez com `npm run ingerir`.
  const desde = anosAtras(2);
  const resultados = await Promise.all(
    SERIES.map((serie) => ingerirSerie(db, serie, serie.sempreCompleta ? undefined : desde)),
  );

  const algumOk = resultados.some((r) => r.status === 'ok');
  let rebuild = false;
  if (algumOk && DEPLOY_HOOK_URL) {
    const resposta = await fetch(DEPLOY_HOOK_URL, { method: 'POST' }).catch(() => null);
    rebuild = resposta?.ok ?? false;
  }

  const falhas = resultados.filter((r) => r.status === 'erro');
  return json({ ok: falhas.length === 0, rebuild, resultados }, falhas.length ? 207 : 200);
};

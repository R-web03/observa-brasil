// Coleta uma série e grava no banco, registrando a execução em `ingestoes`.
// Recebe o cliente pronto, para funcionar tanto na rota agendada quanto no script.
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../database.types';
import { lerSerie } from './fontes';
import type { Serie } from './series';

const LOTE = 1000;

export type ResultadoIngestao = { serie: string; status: 'ok' | 'erro'; linhas: number; erro?: string };

/**
 * @param desde coleta só a partir desta data (incremental). Sem ela, coleta a série inteira.
 * Revisões das fontes dentro da janela são aplicadas pelo upsert.
 */
export async function ingerirSerie(
  db: SupabaseClient<Database>,
  serie: Serie,
  desde?: string,
): Promise<ResultadoIngestao> {
  const { data: registro } = await db
    .from('ingestoes')
    .insert({ serie_id: serie.id })
    .select('id')
    .single();

  try {
    const observacoes = await lerSerie(serie, desde);
    if (observacoes.length === 0) throw new Error('A fonte não devolveu nenhuma observação');

    for (let i = 0; i < observacoes.length; i += LOTE) {
      const lote = observacoes.slice(i, i + LOTE).map((o) => ({
        serie_id: serie.id,
        data: o.data,
        valor: o.valor,
        coletado_em: new Date().toISOString(),
      }));
      const { error } = await db.from('observacoes').upsert(lote, { onConflict: 'serie_id,data' });
      if (error) throw new Error(error.message);
    }

    if (registro) {
      await db
        .from('ingestoes')
        .update({ status: 'ok', linhas: observacoes.length, terminada_em: new Date().toISOString() })
        .eq('id', registro.id);
    }
    return { serie: serie.id, status: 'ok', linhas: observacoes.length };
  } catch (e) {
    const erro = e instanceof Error ? e.message : String(e);
    if (registro) {
      await db
        .from('ingestoes')
        .update({ status: 'erro', erro, terminada_em: new Date().toISOString() })
        .eq('id', registro.id);
    }
    return { serie: serie.id, status: 'erro', linhas: 0, erro };
  }
}

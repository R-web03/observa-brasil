// Leitura das séries no build, para páginas de indicador e comparações.
// Sem banco configurado, devolve listas vazias e o site continua gerando.
import { supabaseServidor } from './supabase';

export type Ponto = { data: string; valor: number; preliminar: boolean };

export async function observacoes(serieId: string, desde?: string): Promise<Ponto[]> {
  const db = supabaseServidor();
  if (!db) return [];

  const pontos: Ponto[] = [];
  const PAGINA = 1000;
  for (let de = 0; ; de += PAGINA) {
    let consulta = db
      .from('observacoes')
      .select('data, valor, preliminar')
      .eq('serie_id', serieId)
      .order('data', { ascending: true })
      .range(de, de + PAGINA - 1);
    if (desde) consulta = consulta.gte('data', desde);
    const { data, error } = await consulta;
    if (error) throw new Error(`Falha ao ler a série ${serieId}: ${error.message}`);
    pontos.push(...data);
    if (data.length < PAGINA) break;
  }
  return pontos;
}

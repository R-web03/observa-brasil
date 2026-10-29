// Coleta manual das séries, pela linha de comando.
//   npm run ingerir              todas as séries
//   npm run ingerir -- selic-meta só uma
//   npm run ingerir -- --testar   só lê as APIs e mostra as últimas observações, sem gravar
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/lib/database.types';
import { SERIES, buscarSerie } from '../src/lib/ingestao/series';
import { lerSerie } from '../src/lib/ingestao/fontes';
import { ingerirSerie } from '../src/lib/ingestao/gravar';

const args = process.argv.slice(2);
const testar = args.includes('--testar');
const ids = args.filter((a) => !a.startsWith('--'));

const series = ids.length ? ids.map((id) => buscarSerie(id) ?? sair(`Série desconhecida: ${id}`)) : SERIES;

function sair(mensagem: string): never {
  console.error(mensagem);
  process.exit(1);
}

if (testar) {
  for (const serie of series) {
    const obs = await lerSerie(serie);
    const ultimas = obs.slice(-3).map((o) => `${o.data}: ${o.valor}`).join(' · ');
    console.log(`${serie.id.padEnd(20)} ${String(obs.length).padStart(6)} observações  últimas: ${ultimas}`);
  }
  process.exit(0);
}

const url = process.env.SUPABASE_URL;
const chave = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !chave) sair('Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no arquivo .env');

const db = createClient<Database>(url, chave, { auth: { persistSession: false } });
let falhou = false;
for (const serie of series) {
  const r = await ingerirSerie(db, serie);
  console.log(`${r.status === 'ok' ? 'ok  ' : 'ERRO'} ${r.serie.padEnd(20)} ${r.linhas} linhas ${r.erro ?? ''}`);
  if (r.status === 'erro') falhou = true;
}
process.exit(falhou ? 1 : 0);

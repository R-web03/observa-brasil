// Leitores das APIs oficiais. Funções puras: recebem a série e devolvem
// observações normalizadas, sem tocar no banco. Assim podem ser testadas
// e usadas tanto pela rota agendada quanto pelo script de linha de comando.
import type { Serie } from './series';

export type Observacao = { data: string; valor: number };

// As APIs oficiais às vezes demoram (o SGS já levou 30 s numa consulta pequena).
const TIMEOUT_MS = 60_000;
const TENTATIVAS = 3;

async function buscarJson(url: string): Promise<unknown> {
  let ultimoErro: unknown;
  for (let tentativa = 1; tentativa <= TENTATIVAS; tentativa++) {
    try {
      const resposta = await fetch(url, {
        headers: { accept: 'application/json', 'user-agent': 'ObservaBrasil/0.1 (coleta de dados públicos)' },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (resposta.ok) return await resposta.json();
      // 4xx (fora 429) não melhora tentando de novo.
      if (resposta.status < 500 && resposta.status !== 429) throw new Error(`HTTP ${resposta.status} em ${url}`);
      ultimoErro = new Error(`HTTP ${resposta.status} em ${url}`);
    } catch (e) {
      ultimoErro = e;
      if (e instanceof Error && e.message.startsWith('HTTP 4')) throw e;
    }
    if (tentativa < TENTATIVAS) await new Promise((r) => setTimeout(r, 2_000 * tentativa));
  }
  throw new Error(`Falha após ${TENTATIVAS} tentativas em ${url}: ${ultimoErro instanceof Error ? ultimoErro.message : ultimoErro}`);
}

function hojeIso(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Descarta datas futuras (a meta Selic, por exemplo, vem projetada até a próxima reunião). */
function ateHoje(obs: Observacao[]): Observacao[] {
  const hoje = hojeIso();
  return obs.filter((o) => o.data <= hoje && Number.isFinite(o.valor));
}

// ---------------------------------------------------------------------------
// Banco Central — SGS
// https://api.bcb.gov.br/dados/serie/bcdata.sgs.{codigo}/dados?formato=json&dataInicial=dd/MM/aaaa&dataFinal=dd/MM/aaaa
// Séries diárias aceitam no máximo 10 anos por consulta; usamos janelas de 5,
// que respondem mais rápido.
// ---------------------------------------------------------------------------

const brParaIso = (d: string) => {
  const [dia, mes, ano] = d.split('/');
  return `${ano}-${mes}-${dia}`;
};
const isoParaBr = (d: string) => {
  const [ano, mes, dia] = d.split('-');
  return `${dia}/${mes}/${ano}`;
};

const JANELA_ANOS = 5;

export async function lerBcbSgs(codigo: number, desde: string): Promise<Observacao[]> {
  const resultado: Observacao[] = [];
  const fim = hojeIso();
  let inicio = desde;

  while (inicio <= fim) {
    const ano = Number(inicio.slice(0, 4));
    const janelaFim = `${Math.min(ano + JANELA_ANOS - 1, Number(fim.slice(0, 4)))}-12-31`;
    const url =
      `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${codigo}/dados?formato=json` +
      `&dataInicial=${isoParaBr(inicio)}&dataFinal=${isoParaBr(janelaFim < fim ? janelaFim : fim)}`;

    const dados = (await buscarJson(url)) as Array<{ data: string; valor: string }>;
    if (!Array.isArray(dados)) throw new Error(`Resposta inesperada do SGS ${codigo}`);
    for (const linha of dados) {
      resultado.push({ data: brParaIso(linha.data), valor: Number(linha.valor) });
    }
    inicio = `${ano + JANELA_ANOS}-01-01`;
  }
  return ateHoje(resultado);
}

// ---------------------------------------------------------------------------
// IBGE — Sidra
// https://apisidra.ibge.gov.br/values/t/{tabela}/n1/all/v/{variavel}/p/all
// O período vem como AAAAMM (mês) ou AAAATT (trimestre); usamos o 1º dia do mês.
// ---------------------------------------------------------------------------

export async function lerIbgeSidra(tabela: number, variavel: number, desde: string): Promise<Observacao[]> {
  const url = `https://apisidra.ibge.gov.br/values/t/${tabela}/n1/all/v/${variavel}/p/all`;
  const dados = (await buscarJson(url)) as Array<Record<string, string>>;
  if (!Array.isArray(dados) || dados.length < 1) throw new Error(`Resposta inesperada do Sidra ${tabela}`);

  // A primeira linha é o cabeçalho; a coluna de período é a última dimensão (D3C).
  const resultado: Observacao[] = [];
  for (const linha of dados.slice(1)) {
    const periodo = linha.D3C;
    const valor = Number(linha.V);
    if (!periodo || !/^\d{6}$/.test(periodo) || !Number.isFinite(valor)) continue; // "..." = sem dado
    const data = `${periodo.slice(0, 4)}-${periodo.slice(4, 6)}-01`;
    if (data >= desde) resultado.push({ data, valor });
  }
  return ateHoje(resultado);
}

/** Lê a série desde `desde` (padrão: o início configurado). */
export async function lerSerie(serie: Serie, desde = serie.desde): Promise<Observacao[]> {
  const inicio = desde > serie.desde ? desde : serie.desde;
  switch (serie.fonte) {
    case 'bcb-sgs':
      return lerBcbSgs(serie.codigo, inicio);
    case 'ibge-sidra':
      return lerIbgeSidra(serie.tabela, serie.variavel, inicio);
  }
}

/** Data de N anos atrás (AAAA-MM-DD), para coletas incrementais. */
export function anosAtras(n: number): string {
  const d = new Date();
  d.setUTCFullYear(d.getUTCFullYear() - n);
  return d.toISOString().slice(0, 10);
}

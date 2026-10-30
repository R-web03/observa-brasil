// Governos comparados e as regras que valem para todos (fase-0-fundacao/METODO.md, seção 6).
//
// Regras de atribuição, iguais para todos os governos:
// - Mês: conta para quem estava no exercício da Presidência. Por isso Dilma vai até
//   11 maio 2016 (afastamento pelo Senado) e Temer começa em 12 maio 2016 (interino;
//   efetivado em 31 ago. 2016).
// - Ano (dados anuais, como o PIB): conta para quem governou a maior parte do ano.
// - "Herdado": o último dado publicado antes do primeiro mês do governo.
// - "Entregue": o último dado dentro do governo (no governo em curso, o mais recente).
import type { Ponto } from './dados';

export type Governo = {
  id: string;
  nome: string;
  presidente: string;
  inicio: string; // AAAA-MM-DD, primeiro dia no exercício
  fim: string | null; // último dia; null = em curso
  nota?: string;
};

export const GOVERNOS: Governo[] = [
  { id: 'lula-1-2', nome: 'Lula 1 e 2', presidente: 'Luiz Inácio Lula da Silva', inicio: '2003-01-01', fim: '2010-12-31' },
  {
    id: 'dilma',
    nome: 'Dilma',
    presidente: 'Dilma Rousseff',
    inicio: '2011-01-01',
    fim: '2016-05-11',
    nota: 'Afastada pelo Senado em 12 de maio de 2016, no processo de impeachment concluído em 31 de agosto de 2016. Os meses a partir do afastamento contam para o governo Temer.',
  },
  {
    id: 'temer',
    nome: 'Temer',
    presidente: 'Michel Temer',
    inicio: '2016-05-12',
    fim: '2018-12-31',
    nota: 'Assumiu como presidente interino em 12 de maio de 2016 e foi efetivado em 31 de agosto de 2016.',
  },
  { id: 'bolsonaro', nome: 'Bolsonaro', presidente: 'Jair Bolsonaro', inicio: '2019-01-01', fim: '2022-12-31' },
  {
    id: 'lula-3',
    nome: 'Lula 3',
    presidente: 'Luiz Inácio Lula da Silva',
    inicio: '2023-01-01',
    fim: null,
    nota: 'Governo em curso, com mandato até 31 de dezembro de 2026. Os números usam os dados disponíveis até a última atualização do site.',
  },
];

export const buscarGoverno = (id: string) => GOVERNOS.find((g) => g.id === id);

const mes = (d: string) => d.slice(0, 7);

/** O ponto pertence ao governo? Compara por mês: o mês do início conta para quem assumiu. */
function noGoverno(p: Ponto, g: Governo, anual: boolean): boolean {
  if (anual) return anoDoGoverno(Number(p.data.slice(0, 4)))?.id === g.id;
  const m = mes(p.data);
  return m >= mes(g.inicio) && (g.fim === null || m <= mes(g.fim));
}

/** Para dados anuais: o governo que esteve no exercício na maior parte do ano. */
export function anoDoGoverno(ano: number): Governo | undefined {
  let melhor: Governo | undefined;
  let maior = 0;
  for (const g of GOVERNOS) {
    const ini = Math.max(Date.UTC(ano, 0, 1), Date.parse(g.inicio));
    const fimAno = Date.UTC(ano, 11, 31);
    const fim = Math.min(fimAno, g.fim ? Date.parse(g.fim) : fimAno);
    const dias = (fim - ini) / 864e5;
    if (dias > maior) {
      maior = dias;
      melhor = g;
    }
  }
  return melhor;
}

export type Resumo = {
  herdado?: Ponto; // último dado antes do governo
  entregue?: Ponto; // último dado dentro do governo
  media?: number;
  minimo?: Ponto;
  maximo?: Ponto;
  pontos: Ponto[]; // dados dentro do governo
};

export function resumir(pontos: Ponto[], g: Governo, anual = false): Resumo {
  const dentro = pontos.filter((p) => noGoverno(p, g, anual));
  const antes = anual
    ? pontos.filter((p) => Number(p.data.slice(0, 4)) < Number((dentro[0]?.data ?? g.inicio).slice(0, 4)))
    : pontos.filter((p) => mes(p.data) < mes(g.inicio));
  if (dentro.length === 0) return { herdado: antes.at(-1), pontos: [] };
  const soma = dentro.reduce((s, p) => s + p.valor, 0);
  const ordenado = [...dentro].sort((a, b) => a.valor - b.valor);
  return {
    herdado: antes.at(-1),
    entregue: dentro.at(-1),
    media: soma / dentro.length,
    minimo: ordenado[0],
    maximo: ordenado.at(-1),
    pontos: dentro,
  };
}

/**
 * Corrige valores em reais pela inflação (IPCA do mês), trazendo tudo a preços do
 * último mês com IPCA disponível. Pontos sem IPCA correspondente ficam de fora.
 */
export function deflacionar(pontos: Ponto[], ipcaMensal: Ponto[]): { pontos: Ponto[]; base?: string } {
  const indice = new Map<string, number>();
  let acumulado = 1;
  for (const p of ipcaMensal) {
    acumulado *= 1 + p.valor / 100;
    indice.set(mes(p.data), acumulado);
  }
  const ultimo = ipcaMensal.at(-1);
  if (!ultimo) return { pontos: [] };
  const final = indice.get(mes(ultimo.data))!;
  const corrigidos = pontos
    .filter((p) => indice.has(mes(p.data)))
    .map((p) => ({ ...p, valor: (p.valor * final) / indice.get(mes(p.data))! }));
  return { pontos: corrigidos, base: ultimo.data };
}

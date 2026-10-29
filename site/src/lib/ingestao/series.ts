// Catálogo das séries coletadas automaticamente.
// Cada série aqui tem a mesma origem que a ficha de indicador correspondente
// (src/content/indicadores/). Códigos conferidos nas APIs em 29 out. 2026.
//
// Para adicionar uma série: inclua aqui, rode `npm run ingerir -- <id>` e
// crie a ficha de indicador com o mesmo id.

export type Serie =
  | {
      id: string;
      nome: string;
      fonte: 'bcb-sgs';
      codigo: number; // código no SGS do Banco Central
      frequencia: 'diaria' | 'mensal' | 'trimestral' | 'anual';
      unidade: string;
      desde: string; // AAAA-MM-DD
    }
  | {
      id: string;
      nome: string;
      fonte: 'ibge-sidra';
      tabela: number; // tabela do Sidra
      variavel: number; // variável da tabela
      frequencia: 'mensal' | 'trimestral' | 'anual';
      unidade: string;
      desde: string;
    };

export const SERIES: Serie[] = [
  {
    id: 'ipca-12-meses',
    nome: 'IPCA, variação acumulada em 12 meses',
    fonte: 'ibge-sidra',
    tabela: 1737,
    variavel: 2265,
    frequencia: 'mensal',
    unidade: '%',
    desde: '2003-01-01',
  },
  {
    id: 'ipca-mensal',
    nome: 'IPCA, variação mensal',
    fonte: 'ibge-sidra',
    tabela: 1737,
    variavel: 63,
    frequencia: 'mensal',
    unidade: '%',
    desde: '2003-01-01',
  },
  {
    id: 'desocupacao',
    nome: 'Taxa de desocupação (PNAD Contínua, trimestre móvel)',
    fonte: 'ibge-sidra',
    tabela: 6381,
    variavel: 4099,
    frequencia: 'mensal', // trimestre móvel; data = último mês do trimestre
    unidade: '% da força de trabalho',
    desde: '2012-03-01',
  },
  {
    id: 'selic-meta',
    nome: 'Meta da taxa Selic definida pelo Copom',
    fonte: 'bcb-sgs',
    codigo: 432,
    frequencia: 'diaria',
    unidade: '% ao ano',
    desde: '2003-01-01',
  },
  {
    id: 'divida-bruta-pib',
    nome: 'Dívida bruta do governo geral (DBGG)',
    fonte: 'bcb-sgs',
    codigo: 13762,
    frequencia: 'mensal',
    unidade: '% do PIB',
    desde: '2006-12-01',
  },
];

export function buscarSerie(id: string): Serie | undefined {
  return SERIES.find((s) => s.id === id);
}

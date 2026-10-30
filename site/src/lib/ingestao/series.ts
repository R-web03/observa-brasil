// Catálogo das séries coletadas automaticamente.
// Cada série aqui tem a mesma origem que a ficha de indicador correspondente
// (src/content/indicadores/). Códigos conferidos nas APIs em 29 out. 2026.
//
// Para adicionar uma série: inclua aqui, rode `npm run ingerir -- <id>` e
// crie a ficha de indicador com o mesmo id.

// Opções comuns:
// - multiplicador: aplicado a cada valor (−1 inverte o sinal da fonte);
// - sempreCompleta: a coleta agendada baixa a série inteira, porque a fonte
//   recalcula o passado (ex.: valores reais refeitos a preços do mês mais recente).
type Opcoes = { multiplicador?: number; sempreCompleta?: boolean };

export type Serie = Opcoes &
  ({
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
    });

export const SERIES: Serie[] = [
  {
    id: 'ipca-12-meses',
    nome: 'IPCA, variação acumulada em 12 meses',
    fonte: 'ibge-sidra',
    tabela: 1737,
    variavel: 2265,
    frequencia: 'mensal',
    unidade: '%',
    desde: '2002-01-01',
  },
  {
    id: 'ipca-mensal',
    nome: 'IPCA, variação mensal',
    fonte: 'ibge-sidra',
    tabela: 1737,
    variavel: 63,
    frequencia: 'mensal',
    unidade: '%',
    desde: '2002-01-01',
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
    desde: '2002-01-01',
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
  {
    id: 'pib-crescimento',
    nome: 'PIB, taxa de variação real no ano',
    fonte: 'bcb-sgs',
    codigo: 7326,
    frequencia: 'anual',
    unidade: '% ao ano',
    desde: '2002-01-01',
  },
  {
    id: 'cambio-dolar',
    nome: 'Taxa de câmbio livre, dólar americano (venda), média mensal',
    fonte: 'bcb-sgs',
    codigo: 3698,
    frequencia: 'mensal',
    unidade: 'R$ por US$',
    desde: '2002-01-01',
  },
  {
    // A fonte publica a necessidade de financiamento (positivo = déficit).
    // Invertemos para ler como resultado: positivo = superávit, negativo = déficit.
    id: 'resultado-primario-pib',
    nome: 'Resultado primário do setor público consolidado, acumulado em 12 meses',
    fonte: 'bcb-sgs',
    codigo: 5793,
    frequencia: 'mensal',
    unidade: '% do PIB',
    desde: '2002-01-01',
    multiplicador: -1,
  },
  {
    id: 'salario-minimo',
    nome: 'Salário mínimo (valor nominal)',
    fonte: 'bcb-sgs',
    codigo: 1619,
    frequencia: 'mensal',
    unidade: 'R$',
    desde: '2002-01-01',
  },
  {
    id: 'rendimento-real',
    nome: 'Rendimento médio real habitual de todos os trabalhos (PNAD Contínua, trimestre móvel)',
    fonte: 'ibge-sidra',
    tabela: 6390,
    variavel: 5933,
    frequencia: 'mensal', // trimestre móvel; data = último mês do trimestre
    unidade: 'R$, a preços do último trimestre',
    desde: '2012-03-01',
    sempreCompleta: true,
  },
  {
    id: 'informalidade',
    nome: 'Taxa de informalidade das pessoas ocupadas (PNAD Contínua, trimestral)',
    fonte: 'ibge-sidra',
    tabela: 8529,
    variavel: 12466,
    frequencia: 'trimestral', // data = último mês do trimestre
    unidade: '% dos ocupados',
    desde: '2015-12-01',
  },
];

export function buscarSerie(id: string): Serie | undefined {
  return SERIES.find((s) => s.id === id);
}

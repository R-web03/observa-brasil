// A navegação por intenção: aprender, investigar um tema, comparar.
// Cada tema é apresentado pela pergunta que alguém faria, não pelo nome técnico.

export const INTENCOES = [
  {
    id: 'aprender',
    href: '/aprender',
    rotulo: 'Aprender',
    titulo: 'Aprender o básico',
    promessa: 'Aulas curtas que começam por uma pergunta do dia a dia. Cada uma funciona sozinha.',
    acao: 'Ver as perguntas',
  },
  {
    id: 'investigar',
    href: '/temas',
    rotulo: 'Investigar um tema',
    titulo: 'Investigar um tema',
    promessa: 'Uma decisão do governo de cada vez: o que foi feito, por quê, quem sentiu e o que ainda não se sabe.',
    acao: 'Ver os temas',
  },
  {
    id: 'comparar',
    href: '/comparar',
    rotulo: 'Comparar governos',
    titulo: 'Comparar governos ou períodos',
    promessa: 'O mesmo tema em épocas diferentes, com a mesma régua. Sem ranking e sem nota.',
    acao: 'Ver as comparações',
  },
] as const;

export type TipoTema = 'decisao' | 'resultado' | 'omissao';

export const ROTULO_TIPO_TEMA: Record<TipoTema, { nome: string; explica: string }> = {
  decisao: { nome: 'Decisões e políticas', explica: 'Leis, medidas e escolhas de quem tinha poder para decidir.' },
  resultado: { nome: 'Resultados e acontecimentos', explica: 'Números que viraram notícia, com o que veio de antes e de fora.' },
  omissao: { nome: 'Atrasos e omissões em discussão', explica: 'O que deixou de ser feito, ou foi feito tarde, segundo documentos e investigações.' },
};

export type Tema = {
  id: string;
  pergunta: string;
  assunto: string;
  tipo: TipoTema;
  quando: string;
  governo?: string; // id em lib/governos.ts
  href?: string; // sem href: em pesquisa, ainda sem página
  formatoNovo?: boolean; // já usa o molde de análise em camadas
};

export const ASSUNTOS = ['Combustíveis', 'Energia', 'Juros e crédito', 'Contas públicas', 'Trabalho e renda', 'Benefícios', 'Impostos', 'Saúde'] as const;

export const TEMAS: Tema[] = [
  { id: 'gasolina-2022', pergunta: 'Zerar os impostos da gasolina em 2022 baixou o preço para quem?', assunto: 'Combustíveis', tipo: 'decisao', quando: 'jun. a dez. 2022', governo: 'bolsonaro', href: '/temas/gasolina-2022', formatoNovo: true },
  { id: 'gasolina-2023', pergunta: 'Por que a gasolina subiu quando os impostos voltaram, em 2023?', assunto: 'Combustíveis', tipo: 'decisao', quando: 'jan. a jul. 2023', governo: 'lula-3', href: '/impactos/gasolina-2023' },
  { id: 'teto-icms-2022', pergunta: 'O que mudou quando o ICMS dos combustíveis e da luz ganhou um teto?', assunto: 'Combustíveis', tipo: 'decisao', quando: 'jun. 2022', governo: 'bolsonaro', href: '/impactos/teto-icms-2022' },
  { id: 'refinaria', pergunta: 'O que muda quando uma refinaria da Petrobras é vendida?', assunto: 'Combustíveis', tipo: 'decisao', quando: 'em pesquisa' },
  { id: 'privatizacao-eletrobras', pergunta: 'O que acontece com a conta de luz quando a Eletrobras é privatizada?', assunto: 'Energia', tipo: 'decisao', quando: 'lei de 2021; venda em 2022', governo: 'bolsonaro', href: '/impactos/privatizacao-eletrobras' },
  { id: 'conta-de-luz-2013-2015', pergunta: 'Por que a conta de luz caiu em 2013 e disparou em 2015?', assunto: 'Energia', tipo: 'decisao', quando: '2013 a 2015', governo: 'dilma', href: '/impactos/conta-de-luz-2013-2015' },
  { id: 'alta-da-selic-2021-2022', pergunta: 'Quem sentiu a alta dos juros de 2021 e 2022?', assunto: 'Juros e crédito', tipo: 'decisao', quando: 'mar. 2021 a ago. 2022', governo: 'bolsonaro', href: '/impactos/alta-da-selic-2021-2022' },
  { id: 'contas-2023', pergunta: 'Quanto do rombo de 2023 foi herdado e quanto foi decidido?', assunto: 'Contas públicas', tipo: 'resultado', quando: '2023', governo: 'lula-3', href: '/impactos/contas-2023' },
  { id: 'salario-minimo-2003-2010', pergunta: 'Quem ganhou com o salário mínimo subindo acima da inflação?', assunto: 'Trabalho e renda', tipo: 'decisao', quando: '2003 a 2010', governo: 'lula-1-2', href: '/impactos/salario-minimo-2003-2010' },
  { id: 'reforma-trabalhista-2017', pergunta: 'O que a reforma trabalhista mudou para quem trabalha?', assunto: 'Trabalho e renda', tipo: 'decisao', quando: '2017', governo: 'temer', href: '/impactos/reforma-trabalhista-2017' },
  { id: 'auxilio-emergencial-2020', pergunta: 'O que o Auxílio Emergencial fez com a pobreza na pandemia?', assunto: 'Benefícios', tipo: 'decisao', quando: '2020 e 2021', governo: 'bolsonaro', href: '/impactos/auxilio-emergencial-2020' },
  { id: 'bolsa-familia-2023', pergunta: 'O que mudou na volta do Bolsa Família?', assunto: 'Benefícios', tipo: 'decisao', quando: '2023', governo: 'lula-3', href: '/impactos/bolsa-familia-2023' },
  { id: 'isencao-ir-2026', pergunta: 'Quem deixa de pagar Imposto de Renda a partir de 2026?', assunto: 'Impostos', tipo: 'decisao', quando: 'vale desde 2026', governo: 'lula-3', href: '/impactos/isencao-ir-2026' },
  { id: 'vacinas', pergunta: 'Como as decisões sobre a compra de vacinas afetaram a população?', assunto: 'Saúde', tipo: 'omissao', quando: 'em pesquisa' },
];

// As aulas existentes, apresentadas pela pergunta. A da Selic já usa o molde novo.
export const PERGUNTAS_DAS_AULAS: Record<string, { pergunta: string; href?: string }> = {
  'o-que-a-economia-estuda': { pergunta: 'Afinal, o que a economia estuda?' },
  'micro-e-macro': { pergunta: 'Qual a diferença entre o preço do pão e a inflação do país?' },
  'oferta-demanda-e-precos': { pergunta: 'Por que alguns preços sobem e descem tanto?' },
  'inflacao-e-poder-de-compra': { pergunta: 'Por que o mesmo salário compra menos com o tempo?' },
  'juros-credito-e-selic': { pergunta: 'O que muda para mim quando a Selic sobe?', href: '/aprender/selic' },
  'emprego-desemprego-e-renda': { pergunta: 'Como se mede o desemprego, e por que ele importa?' },
  'tributos-orcamento-e-divida': { pergunta: 'De onde vem e para onde vai o dinheiro do governo?' },
};

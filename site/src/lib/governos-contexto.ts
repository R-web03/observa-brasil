// Contexto de cada governo: choques de fora e principais decisões econômicas.
// Regras (METODO.md): só fatos datados, com a norma ou o órgão responsável; descrição
// do que a medida faz, sem adjetivos nem atribuição de efeito. Efeitos por grupo social
// ficam na pirâmide de impacto, com grau de evidência.
// Status: em revisão. Toda entrada precisa ser conferida por revisores antes da aprovação.

export type Decisao = {
  data: string; // AAAA-MM ou AAAA-MM-DD
  titulo: string;
  oQueFaz: string;
  norma?: string; // lei, emenda, medida provisória ou órgão
  quemDecidiu: string; // Executivo, Congresso, Banco Central, empresa…
  impacto?: string; // id de um estudo na pirâmide de impacto, se houver
};

export type Contexto = { choques: string[]; decisoes: Decisao[] };

export const CONTEXTO: Record<string, Contexto> = {
  'lula-1-2': {
    choques: [
      'Alta dos preços internacionais de commodities nos anos 2000, puxada sobretudo pela demanda da China, o que favoreceu as exportações brasileiras.',
      'Crise financeira global de 2008 e 2009, iniciada nos Estados Unidos.',
    ],
    decisoes: [
      { data: '2003-12', titulo: 'Reforma da Previdência dos servidores', oQueFaz: 'Mudou regras de aposentadoria do serviço público, como a contribuição de servidores aposentados.', norma: 'Emenda Constitucional 41/2003', quemDecidiu: 'Executivo propôs; Congresso aprovou' },
      { data: '2003-12', titulo: 'Crédito consignado para o setor privado', oQueFaz: 'Permitiu descontar parcelas de empréstimo direto da folha de pagamento de trabalhadores com carteira e, depois, de aposentados do INSS.', norma: 'Lei 10.820/2003', quemDecidiu: 'Executivo propôs; Congresso aprovou' },
      { data: '2004-01', titulo: 'Criação do Bolsa Família', oQueFaz: 'Unificou programas de transferência de renda para famílias pobres, com condições ligadas a saúde e educação dos filhos.', norma: 'Lei 10.836/2004', quemDecidiu: 'Executivo propôs; Congresso aprovou' },
      { data: '2007-01', titulo: 'Programa de Aceleração do Crescimento (PAC)', oQueFaz: 'Reuniu investimentos públicos e incentivos em infraestrutura, como energia, transporte e saneamento.', quemDecidiu: 'Executivo' },
      { data: '2008-12', titulo: 'Medidas contra a crise de 2008', oQueFaz: 'Redução temporária do IPI de carros e eletrodomésticos e ampliação do crédito de bancos públicos.', quemDecidiu: 'Executivo' },
      { data: '2003-04', titulo: 'Aumentos reais do salário mínimo', oQueFaz: 'O mínimo foi reajustado acima da inflação em todos os anos do período; a partir de 2007, pela inflação mais o crescimento do PIB de dois anos antes.', quemDecidiu: 'Executivo, por medidas provisórias e leis anuais aprovadas pelo Congresso', impacto: 'salario-minimo-2003-2010' },
      { data: '2009-07', titulo: 'Minha Casa, Minha Vida', oQueFaz: 'Programa de financiamento e subsídio para compra de moradia, com faixas por renda familiar.', norma: 'Lei 11.977/2009', quemDecidiu: 'Executivo propôs; Congresso aprovou' },
    ],
  },
  dilma: {
    choques: [
      'Queda dos preços internacionais de commodities, mais forte a partir de 2014.',
      'Crise hídrica de 2014 e 2015 no Sudeste, com reservatórios baixos e uso maior de usinas térmicas, mais caras.',
    ],
    decisoes: [
      { data: '2011-02', titulo: 'Regra de valorização do salário mínimo em lei', oQueFaz: 'Fixou o reajuste do mínimo pela inflação mais o crescimento do PIB de dois anos antes, até 2015.', norma: 'Lei 12.382/2011', quemDecidiu: 'Executivo propôs; Congresso aprovou' },
      { data: '2011-12', titulo: 'Desoneração da folha de pagamentos', oQueFaz: 'Trocou, para setores escolhidos, a contribuição ao INSS sobre a folha por uma contribuição sobre o faturamento.', norma: 'Lei 12.546/2011', quemDecidiu: 'Executivo propôs; Congresso aprovou' },
      { data: '2013-01', titulo: 'Renovação antecipada das concessões de energia', oQueFaz: 'Renovou contratos de usinas e linhas de transmissão em troca de tarifas menores, reduzindo a conta de luz em 2013.', norma: 'Lei 12.783/2013', quemDecidiu: 'Executivo propôs; Congresso aprovou', impacto: 'conta-de-luz-2013-2015' },
      { data: '2015-01', titulo: 'Ajuste fiscal e realinhamento de preços controlados', oQueFaz: 'Corte de gastos, regras mais rígidas para seguro-desemprego e pensões, e reajustes de preços controlados pelo governo, como energia e combustíveis.', quemDecidiu: 'Executivo; parte das regras aprovada pelo Congresso' },
    ],
  },
  temer: {
    choques: [
      'Greve dos caminhoneiros em maio de 2018, que interrompeu o abastecimento no país por cerca de dez dias.',
    ],
    decisoes: [
      { data: '2016-10', titulo: 'Nova política de preços da Petrobras', oQueFaz: 'A Petrobras passou a acompanhar mais de perto os preços internacionais e o câmbio para reajustar gasolina e diesel.', quemDecidiu: 'Petrobras (empresa estatal)' },
      { data: '2016-12', titulo: 'Teto de gastos', oQueFaz: 'Limitou o crescimento da despesa primária federal à inflação do ano anterior, por até 20 anos.', norma: 'Emenda Constitucional 95/2016', quemDecidiu: 'Executivo propôs; Congresso aprovou' },
      { data: '2017-03', titulo: 'Lei da terceirização', oQueFaz: 'Ampliou a possibilidade de terceirizar atividades das empresas e mudou regras do trabalho temporário.', norma: 'Lei 13.429/2017', quemDecidiu: 'Congresso aprovou; Executivo sancionou' },
      { data: '2017-07', titulo: 'Reforma trabalhista', oQueFaz: 'Mudou mais de cem pontos da CLT, como a prevalência do negociado sobre o legislado e o fim da contribuição sindical obrigatória.', norma: 'Lei 13.467/2017', quemDecidiu: 'Executivo propôs; Congresso aprovou', impacto: 'reforma-trabalhista-2017' },
      { data: '2017-09', titulo: 'Nova taxa de juros do BNDES (TLP)', oQueFaz: 'Substituiu a TJLP por uma taxa ligada aos juros de mercado nos empréstimos do BNDES.', norma: 'Lei 13.483/2017', quemDecidiu: 'Executivo propôs; Congresso aprovou' },
    ],
  },
  bolsonaro: {
    choques: [
      'Pandemia de covid-19, a partir de março de 2020.',
      'Crise hídrica de 2021, com conta de luz mais cara pela bandeira tarifária de escassez hídrica.',
      'Guerra na Ucrânia, a partir de fevereiro de 2022, que encareceu petróleo, gás e alimentos no mundo.',
    ],
    decisoes: [
      { data: '2019-09', titulo: 'Lei da Liberdade Econômica', oQueFaz: 'Reduziu exigências de alvarás e licenças para atividades de baixo risco e mudou regras de registro de empresas.', norma: 'Lei 13.874/2019', quemDecidiu: 'Executivo propôs; Congresso aprovou' },
      { data: '2019-11', titulo: 'Reforma da Previdência', oQueFaz: 'Fixou idade mínima para aposentadoria no INSS e no serviço público federal e mudou o cálculo dos benefícios.', norma: 'Emenda Constitucional 103/2019', quemDecidiu: 'Executivo propôs; Congresso aprovou' },
      { data: '2020-04', titulo: 'Auxílio Emergencial', oQueFaz: 'Pagamento mensal temporário a trabalhadores informais, autônomos e desempregados durante a pandemia.', norma: 'Lei 13.982/2020', quemDecidiu: 'Congresso aprovou; Executivo sancionou', impacto: 'auxilio-emergencial-2020' },
      { data: '2021-02', titulo: 'Autonomia do Banco Central', oQueFaz: 'Deu mandatos fixos ao presidente e aos diretores do Banco Central, não coincidentes com o do presidente da República.', norma: 'Lei Complementar 179/2021', quemDecidiu: 'Congresso aprovou; Executivo sancionou' },
      { data: '2021-07', titulo: 'Privatização da Eletrobras', oQueFaz: 'Autorizou a venda de ações que tirou da União o controle da maior empresa de energia do país, concluída em junho de 2022.', norma: 'Lei 14.182/2021', quemDecidiu: 'Executivo propôs; Congresso aprovou', impacto: 'privatizacao-eletrobras' },
      { data: '2021-12', titulo: 'Auxílio Brasil', oQueFaz: 'Substituiu o Bolsa Família por um novo programa de transferência de renda.', norma: 'Lei 14.284/2021', quemDecidiu: 'Executivo propôs; Congresso aprovou' },
      { data: '2021-12', titulo: 'Limite para pagar precatórios', oQueFaz: 'Criou um teto anual para pagar dívidas da União reconhecidas pela Justiça; o que passava do limite ficava para depois. Abriu espaço no orçamento para o Auxílio Brasil de R$ 400.', norma: 'Emenda Constitucional 114/2021', quemDecidiu: 'Executivo apoiou; Congresso aprovou', impacto: 'contas-2023' },
      { data: '2022-06', titulo: 'Teto do ICMS sobre combustíveis, energia e telecomunicações', oQueFaz: 'Limitou a alíquota do ICMS, imposto dos estados, sobre esses itens, considerados essenciais.', norma: 'Lei Complementar 194/2022', quemDecidiu: 'Congresso aprovou; Executivo sancionou', impacto: 'teto-icms-2022' },
      { data: '2022-06', titulo: 'Impostos federais zerados na gasolina e no etanol', oQueFaz: 'Zerou PIS/Cofins e Cide sobre gasolina e etanol até o fim de 2022, no pico do preço do petróleo.', norma: 'Lei Complementar 194/2022', quemDecidiu: 'Congresso aprovou; Executivo sancionou', impacto: 'gasolina-2022' },
    ],
  },
  'lula-3': {
    choques: [
      'Juros altos nos Estados Unidos em 2023 e 2024, o que tende a valorizar o dólar e encarecer o crédito no mundo.',
      'Enchentes no Rio Grande do Sul em maio de 2024.',
    ],
    decisoes: [
      { data: '2023-05', titulo: 'Mudança na política de preços da Petrobras', oQueFaz: 'A Petrobras deixou de seguir automaticamente a paridade com os preços internacionais nos reajustes de combustíveis.', quemDecidiu: 'Petrobras (empresa estatal)', impacto: 'gasolina-2023' },
      { data: '2023-03', titulo: 'Volta dos impostos federais sobre a gasolina', oQueFaz: 'Depois de prorrogar a isenção até fevereiro, voltou a cobrar PIS/Cofins sobre gasolina e etanol em duas etapas, em março e no fim de junho de 2023.', norma: 'Medida Provisória 1.163/2023', quemDecidiu: 'Executivo', impacto: 'gasolina-2023' },
      { data: '2022-12', titulo: 'PEC da Transição', oQueFaz: 'Aprovada antes da posse, a pedido do governo eleito: autorizou até R$ 145 bilhões de gastos acima do teto em 2023, para manter o benefício de R$ 600 e aumentar o salário mínimo, entre outros.', norma: 'Emenda Constitucional 126/2022', quemDecidiu: 'Governo eleito propôs; Congresso aprovou', impacto: 'contas-2023' },
      { data: '2023-06', titulo: 'Volta do Bolsa Família', oQueFaz: 'Recriou o Bolsa Família no lugar do Auxílio Brasil, com valor mínimo por família e adicionais por criança.', norma: 'Lei 14.601/2023', quemDecidiu: 'Executivo propôs; Congresso aprovou', impacto: 'bolsa-familia-2023' },
      { data: '2023-08', titulo: 'Nova regra de valorização do salário mínimo', oQueFaz: 'Voltou a reajustar o mínimo pela inflação mais o crescimento do PIB de dois anos antes.', norma: 'Lei 14.663/2023', quemDecidiu: 'Executivo propôs; Congresso aprovou' },
      { data: '2023-08', titulo: 'Arcabouço fiscal', oQueFaz: 'Substituiu o teto de gastos por uma regra em que a despesa cresce acima da inflação, mas limitada a uma parte do crescimento da receita, com metas de resultado primário.', norma: 'Lei Complementar 200/2023', quemDecidiu: 'Executivo propôs; Congresso aprovou' },
      { data: '2025-11', titulo: 'Isenção do Imposto de Renda até R$ 5 mil', oQueFaz: 'Zerou o IR de quem ganha até R$ 5 mil por mês, reduziu até R$ 7.350 e criou tributação mínima para rendas acima de R$ 600 mil por ano.', norma: 'Lei 15.270/2025', quemDecidiu: 'Executivo propôs; Congresso aprovou', impacto: 'isencao-ir-2026' },
      { data: '2023-12', titulo: 'Reforma tributária do consumo', oQueFaz: 'Aprovou a troca gradual de cinco tributos sobre consumo por dois novos (CBS e IBS), com transição entre 2026 e 2033.', norma: 'Emenda Constitucional 132/2023', quemDecidiu: 'Congresso aprovou, a partir de propostas que já tramitavam' },
    ],
  },
};

// Texto oficial de cada norma no Planalto. Endereços e datas conferidos em 30 out. 2026.
const P = 'https://www.planalto.gov.br/ccivil_03/';
export const LINK_NORMA: Record<string, string> = {
  'Emenda Constitucional 114/2021': `${P}constituicao/emendas/emc/emc114.htm`,
  'Emenda Constitucional 126/2022': `${P}constituicao/emendas/emc/emc126.htm`,
  'Medida Provisória 1.163/2023': `${P}_ato2023-2026/2023/mpv/mpv1163.htm`,
  'Emenda Constitucional 41/2003': `${P}constituicao/emendas/emc/emc41.htm`,
  'Lei 10.820/2003': `${P}leis/2003/l10.820.htm`,
  'Lei 10.836/2004': `${P}_ato2004-2006/2004/lei/l10.836.htm`,
  'Lei 11.977/2009': `${P}_ato2007-2010/2009/lei/l11977.htm`,
  'Lei 12.382/2011': `${P}_ato2011-2014/2011/lei/l12382.htm`,
  'Lei 12.546/2011': `${P}_ato2011-2014/2011/lei/l12546.htm`,
  'Lei 12.783/2013': `${P}_ato2011-2014/2013/lei/l12783.htm`,
  'Emenda Constitucional 95/2016': `${P}constituicao/emendas/emc/emc95.htm`,
  'Lei 13.429/2017': `${P}_ato2015-2018/2017/lei/l13429.htm`,
  'Lei 13.467/2017': `${P}_ato2015-2018/2017/lei/l13467.htm`,
  'Lei 13.483/2017': `${P}_ato2015-2018/2017/lei/l13483.htm`,
  'Lei 13.874/2019': `${P}_ato2019-2022/2019/lei/l13874.htm`,
  'Emenda Constitucional 103/2019': `${P}constituicao/emendas/emc/emc103.htm`,
  'Lei 13.982/2020': `${P}_ato2019-2022/2020/lei/l13982.htm`,
  'Lei Complementar 179/2021': `${P}leis/lcp/lcp179.htm`,
  'Lei 14.182/2021': `${P}_ato2019-2022/2021/lei/l14182.htm`,
  'Lei 14.284/2021': `${P}_ato2019-2022/2021/lei/l14284.htm`,
  'Lei Complementar 194/2022': `${P}leis/lcp/lcp194.htm`,
  'Lei 14.601/2023': `${P}_ato2023-2026/2023/lei/l14601.htm`,
  'Lei 14.663/2023': `${P}_ato2023-2026/2023/lei/l14663.htm`,
  'Lei Complementar 200/2023': `${P}leis/lcp/lcp200.htm`,
  'Emenda Constitucional 132/2023': `${P}constituicao/emendas/emc/emc132.htm`,
  'Lei 15.270/2025': `${P}_ato2023-2026/2025/lei/l15270.htm`,
};

// Pirâmide de impacto: quem ganhou e quem pagou com cada decisão, por faixa de renda.
// Regras (METODO.md): todo efeito tem mecanismo escrito e grau de evidência; números só
// com fonte; quando não há estimativa confiável, o texto diz isso. Sem nota ao governo.
// Status: em revisão (exige revisão cruzada antes de aprovar).

export type Efeito = 'ganhou' | 'pagou' | 'misto' | 'incerto';
export type Evidencia = 'forte' | 'moderada' | 'fraca' | 'em disputa' | 'sem evidência';
export type Camada = 'alta' | 'media' | 'media-baixa' | 'base';

export const CAMADAS: { id: Camada; nome: string; faixa: string }[] = [
  { id: 'alta', nome: 'Topo', faixa: 'renda familiar acima de 15 salários mínimos' },
  { id: 'media', nome: 'Classe média', faixa: 'de 5 a 15 salários mínimos' },
  { id: 'media-baixa', nome: 'Classe média baixa', faixa: 'de 2 a 5 salários mínimos' },
  { id: 'base', nome: 'Base', faixa: 'até 2 salários mínimos' },
];

export const ROTULO_EFEITO: Record<Efeito, { icone: string; texto: string }> = {
  ganhou: { icone: '▲', texto: 'Ganhou' },
  pagou: { icone: '▼', texto: 'Pagou' },
  misto: { icone: '◐', texto: 'Misto' },
  incerto: { icone: '?', texto: 'Incerto' },
};

export type EfeitoNaCamada = {
  efeito: Efeito;
  curto: string; // a frase que aparece na pirâmide, sem precisar abrir
  detalhe: string; // o mecanismo: como a decisão chega ao bolso dessa faixa
  evidencia: Evidencia;
};

export type Estudo = {
  id: string;
  titulo: string;
  governo: string; // id em lib/governos.ts
  quando: string;
  quemDecidiu: string;
  resumo: string;
  fatos: string[]; // números e datas, cada um com a fonte no texto
  camadas: Record<Camada, EfeitoNaCamada>;
  quemPaga?: string; // custos que não caem numa faixa só (ex.: contas públicas)
  naoSabemos: string;
  fontes: { nome: string; url: string }[];
};

export const ESTUDOS: Estudo[] = [
  {
    id: 'alta-da-selic-2021-2022',
    titulo: 'A alta da Selic de 2021 e 2022',
    governo: 'bolsonaro',
    quando: 'mar. 2021 a ago. 2022',
    quemDecidiu: 'Copom, do Banco Central (com autonomia por lei desde fev. 2021)',
    resumo:
      'Depois de chegar a 2% ao ano, a menor da história, a Selic subiu em sequência até 13,75% para conter a inflação, que passou de 12% em 12 meses. Juros altos pesam de um jeito diferente em cada faixa de renda.',
    fatos: [
      'A meta da Selic ficou em 2% ao ano de 6 ago. 2020 a 17 mar. 2021, e subiu até 13,75% em 4 ago. 2022 (Banco Central, SGS 432).',
      'A inflação em 12 meses chegou a 12,1% em abr. 2022 e terminou o ano em 5,8% (IBGE, IPCA).',
      'O desemprego caiu de 14,9% no trimestre até mar. 2021 para 7,9% no trimestre até dez. 2022 (IBGE, PNAD Contínua). Os dois movimentos aconteceram ao mesmo tempo: a recuperação depois da pandemia pesou mais que os juros nesse período.',
    ],
    camadas: {
      alta: {
        efeito: 'ganhou',
        curto: 'Aplicações em renda fixa passaram a render mais.',
        detalhe: 'Quem tem dinheiro aplicado em títulos, CDBs e fundos atrelados à Selic passou a receber juros bem maiores. Essa faixa concentra a maior parte das aplicações financeiras do país.',
        evidencia: 'forte',
      },
      media: {
        efeito: 'misto',
        curto: 'Financiamento novo mais caro; aplicações rendendo mais.',
        detalhe: 'Quem precisava financiar carro ou imóvel pagou juros maiores nos contratos novos. Quem tinha aplicações ganhou mais com elas. O saldo depende de cada família: mais dívida ou mais poupança.',
        evidencia: 'moderada',
      },
      'media-baixa': {
        efeito: 'pagou',
        curto: 'Crédito para moto, carro e parcelados ficou mais caro.',
        detalhe: 'É a faixa que mais usa crediário, financiamento de veículo e empréstimo pessoal, e que tem pouca aplicação financeira para compensar. Juros maiores encarecem as prestações novas.',
        evidencia: 'moderada',
      },
      base: {
        efeito: 'misto',
        curto: 'Pouco financiamento; sente mais a inflação e o emprego.',
        detalhe: 'Essa faixa tem menos acesso a financiamentos longos, e os juros do cartão e do cheque especial já eram muito altos antes, por isso mudam relativamente menos. O que pesa mais aqui é a inflação, sobretudo de comida, que os juros tentam conter, e o risco de os juros altos frearem a criação de empregos.',
        evidencia: 'fraca',
      },
    },
    quemPaga: 'Contas públicas: com a Selic mais alta, aumenta o gasto do governo com juros da dívida, dinheiro que sai do orçamento de todos.',
    naoSabemos:
      'Não há estimativa publicada que separe, por faixa de renda, quanto cada família ganhou ou perdeu com essa alta específica. Também não dá para saber com certeza quanto a inflação teria subido sem ela.',
    fontes: [
      { nome: 'Banco Central: histórico das taxas de juros', url: 'https://www.bcb.gov.br/controleinflacao/historicotaxasjuros' },
      { nome: 'IBGE: IPCA (Sidra, tabela 1737)', url: 'https://sidra.ibge.gov.br/tabela/1737' },
      { nome: 'IBGE: PNAD Contínua (Sidra, tabela 6381)', url: 'https://sidra.ibge.gov.br/tabela/6381' },
    ],
  },
  {
    id: 'teto-icms-2022',
    titulo: 'O teto do ICMS sobre combustíveis e energia',
    governo: 'bolsonaro',
    quando: 'jun. 2022',
    quemDecidiu: 'Congresso aprovou; Executivo sancionou (Lei Complementar 194/2022)',
    resumo:
      'A lei passou a tratar combustíveis, energia elétrica, telecomunicações e transporte coletivo como essenciais, o que limitou o ICMS, imposto dos estados, sobre esses itens. Os preços caíram logo depois; a conta foi para os cofres dos estados.',
    fatos: [
      'A Lei Complementar 194 é de 23 jun. 2022.',
      'O IPCA do mês ficou negativo em jul. (−0,68%), ago. (−0,36%) e set. 2022 (−0,29%) (IBGE). Nesse período a Petrobras também reduziu o preço da gasolina nas refinarias, então a queda não vem só do imposto.',
      'Estados e União fizeram depois um acordo de compensação pelas perdas de arrecadação, homologado no Supremo Tribunal Federal.',
    ],
    camadas: {
      alta: {
        efeito: 'ganhou',
        curto: 'Gasolina e luz mais baratas; pesa pouco no orçamento.',
        detalhe: 'O desconto em reais pode ser grande para quem tem mais de um carro e consome muita energia, mas é uma parte pequena da renda dessa faixa.',
        evidencia: 'moderada',
      },
      media: {
        efeito: 'ganhou',
        curto: 'Gasolina mais barata para quem depende do carro.',
        detalhe: 'Combustível é um gasto relevante para famílias que usam carro todos os dias. A redução de imposto chegou à bomba logo depois da lei.',
        evidencia: 'moderada',
      },
      'media-baixa': {
        efeito: 'ganhou',
        curto: 'Luz, internet e combustível da moto ficaram mais baratos.',
        detalhe: 'Energia, telefone e combustível pesam bastante no orçamento dessa faixa, e todos tiveram o imposto reduzido.',
        evidencia: 'moderada',
      },
      base: {
        efeito: 'misto',
        curto: 'Conta de luz mais barata; risco de menos dinheiro para serviços estaduais.',
        detalhe: 'A conta de luz pesa proporcionalmente mais para quem ganha menos, então o desconto ajudou. Mas o ICMS financia escolas, hospitais e segurança dos estados, serviços que essa faixa usa mais. Quanto as perdas dos estados afetaram esses serviços não está medido.',
        evidencia: 'fraca',
      },
    },
    quemPaga: 'Estados e municípios: o ICMS é o principal imposto dos estados, e um quarto dele vai para os municípios. Parte da perda foi compensada pela União, ou seja, por todos os contribuintes.',
    naoSabemos:
      'Não há medida pública de quanto a perda de arrecadação mudou, na prática, os serviços estaduais de saúde, educação e segurança, nem de como isso se distribuiu entre as faixas de renda.',
    fontes: [
      { nome: 'Planalto: Lei Complementar 194/2022', url: 'https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp194.htm' },
      { nome: 'IBGE: IPCA (Sidra, tabela 1737)', url: 'https://sidra.ibge.gov.br/tabela/1737' },
    ],
  },
  {
    id: 'privatizacao-eletrobras',
    titulo: 'A privatização da Eletrobras',
    governo: 'bolsonaro',
    quando: 'lei em jul. 2021; venda das ações em jun. 2022',
    quemDecidiu: 'Executivo propôs; Congresso aprovou (Lei 14.182/2021)',
    resumo:
      'A União deixou de controlar a maior empresa de energia do país, por meio de uma venda de ações. A lei também previu dinheiro para reduzir tarifas e obrigou a contratação de novas usinas térmicas a gás. Se a conta de luz ficou mais cara ou mais barata por causa disso é um ponto em disputa.',
    fatos: [
      'A Lei 14.182 é de 12 jul. 2021. A oferta de ações que tirou da União o controle da empresa foi concluída em jun. 2022.',
      'A lei destinou parte do dinheiro da operação à Conta de Desenvolvimento Energético (CDE), um fundo do setor elétrico, para reduzir tarifas ao longo de vários anos.',
      'A mesma lei obrigou a contratação de usinas térmicas a gás em regiões definidas no texto, um custo que entra nas tarifas ao longo do tempo.',
      'Em 2021 e começo de 2022, a conta de luz já estava mais cara por causa da crise hídrica, com a bandeira tarifária de escassez hídrica. Isso mistura os efeitos.',
    ],
    camadas: {
      alta: {
        efeito: 'incerto',
        curto: 'Efeito na conta é pequeno perto da renda; acionistas ficaram expostos ao resultado da empresa.',
        detalhe: 'Quem comprou ações na oferta, inclusive trabalhadores que usaram parte do FGTS, passou a depender do desempenho da empresa privada. Ganhos ou perdas dependem do preço das ações depois.',
        evidencia: 'fraca',
      },
      media: {
        efeito: 'incerto',
        curto: 'Conta de luz: efeito líquido em disputa.',
        detalhe: 'De um lado, o dinheiro na CDE reduz tarifas. Do outro, as térmicas obrigatórias e o fim de contratos de energia mais barata aumentam custos. Estimativas de especialistas e entidades do setor apontam em direções diferentes.',
        evidencia: 'em disputa',
      },
      'media-baixa': {
        efeito: 'incerto',
        curto: 'Conta de luz: efeito líquido em disputa.',
        detalhe: 'O mesmo cabo de guerra entre desconto da CDE e custos novos. Como a energia pesa mais no orçamento dessa faixa, qualquer diferença na conta conta mais.',
        evidencia: 'em disputa',
      },
      base: {
        efeito: 'incerto',
        curto: 'É quem mais sente a conta de luz; a direção do efeito não está estabelecida.',
        detalhe: 'Famílias de baixa renda gastam proporcionalmente mais com energia, então são as mais expostas a qualquer mudança de tarifa. Parte delas tem a Tarifa Social, com desconto. Não há, por enquanto, estimativa confiável de quantos reais por mês a privatização acrescentou ou tirou da conta dessas famílias.',
        evidencia: 'em disputa',
      },
    },
    quemPaga: 'Os custos e descontos passam pelas tarifas de todos os consumidores, ao longo de muitos anos. A União recebeu recursos da operação e deixou de receber dividendos como controladora.',
    naoSabemos:
      'Ainda não há estudo independente que separe, na conta de luz das famílias, o efeito da privatização dos efeitos da crise hídrica, dos encargos do setor e dos reajustes anuais. Valores como "R$ 50 a mais por mês" circulam, mas não encontramos fonte que os sustente. Este estudo será atualizado quando houver.',
    fontes: [
      { nome: 'Planalto: Lei 14.182/2021', url: 'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14182.htm' },
      { nome: 'Aneel: tarifas e bandeiras tarifárias', url: 'https://www.gov.br/aneel' },
    ],
  },
];

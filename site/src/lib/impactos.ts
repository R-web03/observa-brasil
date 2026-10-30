// Pirâmide de impacto: quem ganhou e quem pagou com cada decisão, por faixa de renda.
// Regras (METODO.md): todo efeito tem mecanismo escrito e grau de evidência; números só
// com fonte; quando não há estimativa confiável, o texto diz isso. Sem nota ao governo.
// Status: em revisão (exige revisão cruzada antes de aprovar).

export type Efeito = 'ganhou' | 'pagou' | 'misto' | 'incerto' | 'neutro';
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
  neutro: { icone: '–', texto: 'Pouco afetado' },
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
      'Na sanção da lei, o ministro de Minas e Energia previu queda de 5% a 7% na tarifa de energia com o conjunto das medidas (Poder360, 13 jul. 2021).',
      'Em maio de 2022, deputados pediram que a Aneel recalculasse o impacto nas tarifas, afirmando que a simulação do governo não trazia memória de cálculo (eixos, 17 maio 2022).',
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
      { nome: 'Poder360: previsão do ministro na sanção', url: 'https://www.poder360.com.br/governo/usinas-termeletricas-a-gas-reduzirao-tarifa-de-energia-diz-albuquerque/' },
      { nome: 'eixos: pedido de novo cálculo à Aneel', url: 'https://eixos.com.br/deputados-da-oposicao-se-unem-para-impedir-privatizacao-da-eletrobras/' },
    ],
  },
  {
    id: 'auxilio-emergencial-2020',
    titulo: 'O Auxílio Emergencial na pandemia',
    governo: 'bolsonaro',
    quando: 'abr. 2020 a out. 2021',
    quemDecidiu: 'Congresso aprovou; Executivo sancionou (Lei 13.982/2020)',
    resumo:
      'Na pandemia, o governo pagou um auxílio mensal a trabalhadores informais, autônomos e desempregados. Foi a maior transferência de renda da história do país, e a extrema pobreza caiu em 2020 mesmo com a economia encolhendo. Quando o auxílio diminuiu, em 2021, ela voltou a subir.',
    fatos: [
      'A Lei 13.982 é de 2 abr. 2020. As primeiras parcelas foram de R$ 600, e de R$ 1.200 para mães chefes de família. No fim de 2020 caíram para R$ 300; em 2021, a nova rodada pagou de R$ 150 a R$ 375.',
      'Segundo o IBGE, a proporção de pessoas em extrema pobreza caiu de 6,8% em 2019 para 5,7% em 2020. Sem os benefícios sociais, teria chegado a 12,9% em 2020 (simulação do IBGE).',
      'Em 2021, com o auxílio menor e para menos pessoas, a extrema pobreza subiu para 8,4% (IBGE).',
      'O PIB encolheu 3,3% em 2020 (IBGE), e a dívida bruta chegou a 87,7% do PIB em out. 2020 (Banco Central), puxada pelos gastos da pandemia.',
    ],
    camadas: {
      alta: { efeito: 'neutro', curto: 'Não recebia; a conta veio pela dívida pública.', detalhe: 'Essa faixa não tinha direito ao auxílio. O custo foi pago com aumento da dívida do governo, que é de todos.', evidencia: 'forte' },
      media: { efeito: 'neutro', curto: 'Em geral, não recebia diretamente.', detalhe: 'A maior parte dessa faixa ficou acima do limite de renda. Pode ter se beneficiado indiretamente, se o consumo sustentado pelo auxílio segurou vendas e empregos, mas esse efeito não está medido por faixa.', evidencia: 'fraca' },
      'media-baixa': { efeito: 'ganhou', curto: 'Informais e autônomos dessa faixa receberam.', detalhe: 'O limite de renda (até meio salário mínimo por pessoa ou até 3 salários mínimos por família) incluiu parte dessa faixa, sobretudo quem trabalhava sem carteira e perdeu renda.', evidencia: 'moderada' },
      base: { efeito: 'ganhou', curto: 'A renda de quem tinha quase nada aumentou; a extrema pobreza caiu.', detalhe: 'Para muitas famílias da base, R$ 600 era mais do que a renda que tinham antes da pandemia. É o que explica a queda da extrema pobreza em 2020, segundo o IBGE, mesmo com o PIB caindo.', evidencia: 'forte' },
    },
    quemPaga: 'Contas públicas: o auxílio foi pago com aumento da dívida do governo federal, junto com os outros gastos da pandemia.',
    naoSabemos:
      'Quanto o auxílio evitou de perda de empregos e de falências, por sustentar o consumo, ainda é estimado de formas diferentes por pesquisadores. A simulação do IBGE mostra só o efeito direto na renda, sem considerar mudanças de comportamento. Atenção: o IBGE mudou a linha de pobreza depois desta edição, então estes números não se comparam diretamente com os de 2023.',
    fontes: [
      { nome: 'Planalto: Lei 13.982/2020', url: 'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2020/lei/l13982.htm' },
      { nome: 'IBGE: Síntese de Indicadores Sociais (dados de 2020)', url: 'https://agenciadenoticias.ibge.gov.br/agencia-noticias/32420-mesmo-com-beneficios-emergenciais-1-em-cada-4-brasileiros-vivia-em-situacao-de-pobreza-em-2020.html' },
    ],
  },
  {
    id: 'bolsa-familia-2023',
    titulo: 'A volta do Bolsa Família',
    governo: 'lula-3',
    quando: 'mar. a jun. 2023',
    quemDecidiu: 'Executivo propôs; Congresso aprovou (Lei 14.601/2023)',
    resumo:
      'O Bolsa Família voltou no lugar do Auxílio Brasil, com valor mínimo de R$ 600 por família e adicionais por criança. Em 2023, a extrema pobreza chegou ao menor nível desde 2012. O IBGE atribui essa queda principalmente aos benefícios sociais, e a queda da pobreza mais ampla principalmente ao mercado de trabalho.',
    fatos: [
      'A Lei 14.601 é de 19 jun. 2023. O valor mínimo de R$ 600 por família já era pago pelo Auxílio Brasil desde ago. 2022; a novidade foram os adicionais, como R$ 150 por criança de até 6 anos.',
      'Segundo o IBGE, a extrema pobreza caiu de 5,9% em 2022 para 4,4% em 2023, o menor nível da série iniciada em 2012. Sem os programas sociais, teria sido 11,2% em 2023 (simulação do IBGE).',
      'No mesmo período, o desemprego caiu de 7,9% para 7,4% (trimestres até dez. 2022 e dez. 2023, IBGE), o que também aumentou a renda das famílias mais pobres.',
    ],
    camadas: {
      alta: { efeito: 'neutro', curto: 'Não recebe; a conta sai do orçamento federal.', detalhe: 'O programa é pago com impostos, e é uma das maiores despesas do orçamento federal.', evidencia: 'forte' },
      media: { efeito: 'neutro', curto: 'Não recebe diretamente.', detalhe: 'Essa faixa está acima do limite de renda do programa. Efeitos indiretos, como mais consumo no comércio local, não estão medidos por faixa.', evidencia: 'fraca' },
      'media-baixa': { efeito: 'neutro', curto: 'Em geral, acima do limite de renda.', detalhe: 'O limite de entrada é baixo (renda por pessoa de até R$ 218 por mês). Famílias dessa faixa só recebem se a renda por pessoa cair muito, como numa perda de emprego.', evidencia: 'moderada' },
      base: { efeito: 'ganhou', curto: 'Renda maior para famílias com crianças pequenas; menos extrema pobreza.', detalhe: 'O adicional por criança aumentou a renda das famílias com filhos pequenos, que estão entre as mais pobres. O IBGE estima que, sem os programas sociais, a extrema pobreza seria mais que o dobro em 2023.', evidencia: 'forte' },
    },
    quemPaga: 'Orçamento federal, ou seja, os contribuintes. O programa disputa espaço com outras despesas dentro da regra fiscal.',
    naoSabemos:
      'Quanto da queda da extrema pobreza em 2023 vem do Bolsa Família em si, e não do conjunto dos benefícios (que inclui aposentadorias e o BPC) e do mercado de trabalho, não é separado nas publicações do IBGE. Os efeitos de longo prazo sobre escola e saúde das crianças ainda não podem ser medidos.',
    fontes: [
      { nome: 'Planalto: Lei 14.601/2023', url: 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14601.htm' },
      { nome: 'IBGE: Síntese de Indicadores Sociais 2024 (dados de 2023)', url: 'https://agenciadenoticias.ibge.gov.br/' },
    ],
  },
];

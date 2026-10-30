// Pirâmide de impacto: quem ganhou e quem pagou com cada decisão, por faixa de renda.
// Regras (METODO.md): todo efeito tem mecanismo escrito e grau de evidência; números só
// com fonte; quando não há estimativa confiável, o texto diz isso. Sem nota ao governo.
// Status: em revisão (exige revisão cruzada antes de aprovar).

export type Efeito = 'ganhou' | 'pagou' | 'misto' | 'incerto' | 'neutro';
export type Evidencia = 'forte' | 'moderada' | 'fraca' | 'em disputa' | 'sem evidência';
export type Camada = 'alta' | 'media' | 'media-baixa' | 'base' | 'pobreza';

// Salário mínimo usado para traduzir as faixas em reais (valor de 2026, Banco Central, SGS 1619).
export const SALARIO_MINIMO = 1621;

// Faixas por renda familiar total, exceto a de pobreza, que é por pessoa: é o corte do
// Cadastro Único (meio salário mínimo por pessoa), por onde se entra no Bolsa Família.
export const CAMADAS: { id: Camada; nome: string; faixa: string; quem: string }[] = [
  { id: 'alta', nome: 'Topo', faixa: 'renda da família acima de 15 salários mínimos', quem: 'Empresários, profissionais liberais bem pagos, altos executivos. Cerca de R$ 24 mil por mês ou mais.' },
  { id: 'media', nome: 'Classe média', faixa: 'de 5 a 15 salários mínimos', quem: 'Professores, enfermeiros, técnicos, pequenos comerciantes. De R$ 8 mil a R$ 24 mil por mês, somando a família.' },
  { id: 'media-baixa', nome: 'Classe média baixa', faixa: 'de 2 a 5 salários mínimos', quem: 'Vendedores, motoristas, operários com carteira, casais que ganham um pouco acima do mínimo. De R$ 3.200 a R$ 8 mil por mês.' },
  { id: 'base', nome: 'Base', faixa: 'até 2 salários mínimos', quem: 'Quem vive com o mínimo ou pouco mais: aposentados do piso do INSS, domésticas, trabalhadores sem carteira. Até R$ 3.200 por mês, acima da linha do Cadastro Único.' },
  { id: 'pobreza', nome: 'Pobreza', faixa: 'até meio salário mínimo por pessoa', quem: 'O público do Cadastro Único e do Bolsa Família: até R$ 810 por pessoa da casa. Uma família de quatro com até R$ 3.240 no total, ou bem menos que isso.' },
];

// Em qual camada uma família está, pela renda total e pelo número de pessoas da casa.
export function camadaDaRenda(rendaFamiliar: number, pessoas: number): Camada {
  if (pessoas > 0 && rendaFamiliar / pessoas <= SALARIO_MINIMO / 2) return 'pobreza';
  const sm = rendaFamiliar / SALARIO_MINIMO;
  if (sm <= 2) return 'base';
  if (sm <= 5) return 'media-baixa';
  if (sm <= 15) return 'media';
  return 'alta';
}

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

// De onde vem um resultado: decisão do próprio governo, herança de antes, ou algo de fora.
export type Origem = 'decisao' | 'herdado' | 'de-fora';

export const ROTULO_ORIGEM: Record<Origem, string> = {
  decisao: 'Decisão deste governo',
  herdado: 'Herdado de antes',
  'de-fora': 'Veio de fora',
};

export type Estudo = {
  id: string;
  titulo: string;
  governo: string; // id em lib/governos.ts
  inicio: string; // AAAA-MM, para ordenar a linha do tempo
  quando: string;
  quemDecidiu: string;
  resumo: string;
  fatos: string[]; // números e datas, cada um com a fonte no texto
  camadas: Record<Camada, EfeitoNaCamada>;
  quemPaga?: string; // custos que não caem numa faixa só (ex.: contas públicas)
  // Como a decisão chega ao bolso, um passo de cada vez, incluindo os efeitos de segunda ordem.
  caminho?: { passo: string; texto: string; evidencia?: Evidencia }[];
  // Conta de exemplo com números redondos. Os valores de entrada são hipotéticos e dito isso no texto.
  exemplo?: { titulo: string; linhas: string[]; aviso: string };
  // Quanto do resultado é do governo da vez, quanto foi herdado e quanto veio de fora.
  origens?: { origem: Origem; titulo: string; valor?: string; texto: string }[];
  grafico?: { serie: string; titulo: string; descricao: string; unidade: string; casas: number };
  naoSabemos: string;
  fontes: { nome: string; url: string }[];
};

export const ESTUDOS: Estudo[] = [
  {
    id: 'auxilio-emergencial-2020',
    titulo: 'O Auxílio Emergencial na pandemia',
    governo: 'bolsonaro',
    inicio: '2020-04',
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
      base: { efeito: 'ganhou', curto: 'Diaristas, ambulantes e informais que perderam o trabalho receberam.', detalhe: 'Quem vivia de bico e ficou sem trabalho no isolamento passou a ter uma renda mínima garantida por alguns meses. Para quem tinha carteira assinada, o auxílio não valia; esse grupo dependia do emprego se manter.', evidencia: 'moderada' },
      pobreza: { efeito: 'ganhou', curto: 'Para muitas famílias, R$ 600 era mais do que tinham; a extrema pobreza caiu.', detalhe: 'Para muitas famílias do Cadastro Único, R$ 600 era mais do que a renda que tinham antes da pandemia. Quem já recebia o Bolsa Família passou a receber o que fosse maior. É o que explica a queda da extrema pobreza em 2020, segundo o IBGE, mesmo com o PIB caindo.', evidencia: 'forte' },
    },
    caminho: [
      { passo: 'A decisão', texto: 'O Congresso aprova e o governo sanciona um pagamento mensal de R$ 600 para informais, autônomos e desempregados de baixa renda.' },
      { passo: 'O dinheiro chega', texto: 'A Caixa pagou inclusive por uma poupança digital aberta no celular, o que levou o dinheiro até quem nem tinha conta em banco.' },
      { passo: 'O efeito imediato', texto: 'Famílias que tinham perdido toda a renda conseguem comprar comida e pagar o aluguel. A extrema pobreza cai em 2020, mesmo com a economia encolhendo.', evidencia: 'forte' },
      { passo: 'O efeito de segunda ordem', texto: 'O consumo das famílias ajuda a segurar vendas no comércio de bairro. Quanto isso salvou de empregos ainda é estimado de formas diferentes.', evidencia: 'fraca' },
      { passo: 'A conta', texto: 'O auxílio foi pago com dívida pública. A dívida bruta passou de 87% do PIB em 2020; dívida maior significa mais juros pagos nos anos seguintes, por todos.', evidencia: 'forte' },
    ],
    quemPaga: 'Contas públicas: o auxílio foi pago com aumento da dívida do governo federal, junto com os outros gastos da pandemia.',
    naoSabemos:
      'Quanto o auxílio evitou de perda de empregos e de falências, por sustentar o consumo, ainda é estimado de formas diferentes por pesquisadores. A simulação do IBGE mostra só o efeito direto na renda, sem considerar mudanças de comportamento. Atenção: o IBGE mudou a linha de pobreza depois desta edição, então estes números não se comparam diretamente com os de 2023.',
    fontes: [
      { nome: 'Planalto: Lei 13.982/2020', url: 'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2020/lei/l13982.htm' },
      { nome: 'IBGE: Síntese de Indicadores Sociais (dados de 2020)', url: 'https://agenciadenoticias.ibge.gov.br/agencia-noticias/32420-mesmo-com-beneficios-emergenciais-1-em-cada-4-brasileiros-vivia-em-situacao-de-pobreza-em-2020.html' },
    ],
  },
  {
    id: 'alta-da-selic-2021-2022',
    titulo: 'A alta da Selic de 2021 e 2022',
    governo: 'bolsonaro',
    inicio: '2021-03',
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
        detalhe: 'Essa faixa tem menos acesso a financiamentos longos. A dívida mais comum aqui é a do cartão, do carnê e do empréstimo pessoal, cujos juros já eram muito altos antes, por isso mudam relativamente menos. O que pesa mais aqui é a inflação, sobretudo de comida, que os juros tentam conter, e o risco de os juros altos frearem a criação de empregos.',
        evidencia: 'fraca',
      },
      pobreza: {
        efeito: 'misto',
        curto: 'Quase não tem crédito; o que pesa é a comida cara e o emprego.',
        detalhe: 'Quem vive com até meio salário mínimo por pessoa raramente tem financiamento ou aplicação: os juros chegam pouco por aí. O que chega é a inflação, que em 2021 e 2022 foi puxada por comida e energia, os itens que mais pesam no orçamento dessa faixa. Os juros altos ajudam a frear essa inflação, mas também podem atrasar a volta do emprego.',
        evidencia: 'fraca',
      },
    },
    caminho: [
      { passo: 'A decisão', texto: 'O Copom sobe a Selic, a taxa que o Banco Central cobra e paga aos bancos por um dia.' },
      { passo: 'Os bancos repassam', texto: 'Os bancos passam a cobrar mais nos empréstimos novos e a pagar mais nas aplicações. Financiamento de carro e de casa, que são longos, sentem mais.', evidencia: 'forte' },
      { passo: 'Quem tem dívida, e de quê', texto: 'Segundo a CNC, em jan. 2026, 85% das famílias com dívida deviam no cartão de crédito; só 9,6% tinham financiamento de casa e 8,7% de carro. Ou seja: o financiamento longo, o que mais sente a Selic, é coisa principalmente da classe média.', evidencia: 'moderada' },
      { passo: 'O freio', texto: 'Com crédito mais caro, as pessoas compram menos a prazo e as empresas investem menos. Os preços sobem mais devagar. Esse é o objetivo.', evidencia: 'moderada' },
      { passo: 'O efeito colateral', texto: 'Comprar menos também pode significar vender menos e contratar menos. Em 2021 e 2022 o desemprego caiu mesmo assim, porque a economia vinha da pandemia, mas em outros momentos juros altos esfriam o emprego.', evidencia: 'moderada' },
    ],
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
    inicio: '2022-06',
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
      pobreza: {
        efeito: 'misto',
        curto: 'Luz um pouco mais barata; quase não abastece carro; depende mais dos serviços do estado.',
        detalhe: 'Muitas dessas famílias já tinham desconto na luz pela Tarifa Social, e poucas têm carro, então o ganho direto foi menor. Por outro lado, são as que mais dependem do posto de saúde, da escola pública e do ônibus, pagos em parte com o ICMS que os estados deixaram de arrecadar.',
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
    inicio: '2021-07',
    quando: 'lei em jul. 2021; venda das ações em jun. 2022',
    quemDecidiu: 'Executivo propôs; Congresso aprovou (Lei 14.182/2021)',
    resumo:
      'A União deixou de controlar a maior empresa de energia do país, por meio de uma venda de ações. A lei também previu dinheiro para reduzir tarifas e obrigou a contratação de novas usinas térmicas a gás. Se a conta de luz ficou mais cara ou mais barata por causa disso é um ponto em disputa.',
    fatos: [
      'A Lei 14.182 é de 12 jul. 2021. A oferta de ações que tirou da União o controle da empresa foi concluída em jun. 2022.',
      'Na sanção da lei, o ministro de Minas e Energia previu queda de 5% a 7% na tarifa de energia com o conjunto das medidas (Poder360, 13 jul. 2021).',
      'Em maio de 2022, deputados pediram que a Aneel recalculasse o impacto nas tarifas, afirmando que a simulação do governo não trazia memória de cálculo (eixos, 17 maio 2022).',
      'A lei manda a Eletrobras pagar à Conta de Desenvolvimento Energético (CDE), um fundo que abate encargos da conta de luz, metade do valor que os novos contratos acrescentam às usinas (art. 4º). Esse dinheiro entra ao longo de vários anos.',
      'A lei também acaba com o regime de cotas das usinas antigas da Eletrobras, que vendiam energia mais barata às distribuidoras, de forma gradual, em no mínimo 5 e no máximo 10 anos (art. 5º). É por isso que o efeito, se houver, aparece aos poucos, e não de uma vez.',
      'A mesma lei obrigou a contratação de usinas térmicas a gás em regiões definidas no texto, com entrega prevista a partir de 2026, um custo que entra nas tarifas ao longo de 15 anos de contrato. Essas regras foram alteradas por lei em 2025.',
      'No Tribunal de Contas da União, o voto do ministro Vital do Rêgo, em fev. 2022, citou um estudo da Fiesp de jul. 2021 com custo adicional para o consumidor de R$ 52,4 bilhões a R$ 104,2 bilhões em 30 anos, já descontado o dinheiro da CDE, "um aumento tarifário entre 4,3% e 6,5% ao ano". O Ministério de Minas e Energia projetava efeito neutro ou de queda (Money Times, 15 fev. 2022).',
      'Em 2021 e começo de 2022, a conta de luz já estava mais cara por causa da crise hídrica, com a bandeira tarifária de escassez hídrica. Isso mistura os efeitos.',
    ],
    caminho: [
      { passo: 'A decisão', texto: 'A União vende ações e deixa de mandar na Eletrobras, que passa a ser uma empresa privada sem dono controlador.' },
      { passo: 'O desconto na largada', texto: 'Parte do dinheiro da operação vai para a CDE e é usada para abater a conta de luz nos primeiros anos.', evidencia: 'forte' },
      { passo: 'A energia barata sai aos poucos', texto: 'As usinas antigas da Eletrobras, já pagas, vendiam energia a preço de custo para as distribuidoras. Com a privatização, essa energia passa a ser vendida a preço de mercado, mais alto, numa escada de 5 a 10 anos. A distribuidora precisa comprar energia mais cara para repor, e esse custo vai para a tarifa.', evidencia: 'moderada' },
      { passo: 'As térmicas obrigatórias chegam', texto: 'Usinas a gás que a lei mandou contratar começam a entregar energia a partir de 2026. Se custarem mais que as alternativas, a diferença também entra na tarifa, por 15 anos.', evidencia: 'em disputa' },
      { passo: 'O saldo na sua conta', texto: 'Desconto da CDE de um lado, energia mais cara do outro, ao longo de décadas. É por isso que o efeito pode ser pequeno no começo e crescer depois, e por isso as estimativas divergem tanto.', evidencia: 'em disputa' },
    ],
    exemplo: {
      titulo: 'O que as estimativas significam numa conta de R$ 150',
      linhas: [
        'Previsão do governo em 2021 (queda de 5% a 7%): de R$ 7,50 a R$ 10,50 a menos por mês.',
        'Estudo citado no TCU (alta de 4,3% a 6,5%): de R$ 6,45 a R$ 9,75 a mais por mês.',
        'Para chegar a R$ 50 ou R$ 60 a mais, a conta teria de subir de 33% a 40% só por causa da privatização. Nenhuma das estimativas publicadas que encontramos chega perto disso.',
      ],
      aviso: 'A conta de R$ 150 é um exemplo. Multiplique pela sua: o efeito é proporcional ao valor da conta.',
    },
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
        detalhe: 'Famílias que ganham pouco gastam proporcionalmente mais com energia, então são as mais expostas a qualquer mudança de tarifa. Se o custo extra se confirmar, ele chega aos poucos, ano a ano, conforme a energia barata das usinas antigas sai do sistema.',
        evidencia: 'em disputa',
      },
      pobreza: {
        efeito: 'incerto',
        curto: 'A Tarifa Social amortece; o efeito líquido não está estabelecido.',
        detalhe: 'Parte dessas famílias tem a Tarifa Social, com desconto na conta, o que reduz o peso de qualquer aumento. O custo do desconto é dividido entre os demais consumidores, pela CDE, o mesmo fundo que recebeu dinheiro da privatização. Não há estimativa de quantos reais por mês a privatização acrescentou ou tirou da conta dessas famílias.',
        evidencia: 'em disputa',
      },
    },
    quemPaga: 'Os custos e descontos passam pelas tarifas de todos os consumidores, ao longo de muitos anos. A União recebeu recursos da operação e deixou de receber dividendos como controladora.',
    naoSabemos:
      'Ainda não há estudo independente que meça, depois do fato, o efeito da privatização na conta de luz, separado da crise hídrica, dos encargos do setor e dos reajustes anuais. As estimativas que existem foram feitas antes, e apontam em direções opostas. Como a energia barata sai aos poucos até o começo da década de 2030, o efeito real só vai poder ser medido com o tempo. Valores como "R$ 50 a mais por mês" circulam, mas não encontramos fonte que os sustente. Este estudo será atualizado quando houver.',
    fontes: [
      { nome: 'Planalto: Lei 14.182/2021', url: 'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14182.htm' },
      { nome: 'Aneel: tarifas e bandeiras tarifárias', url: 'https://www.gov.br/aneel' },
      { nome: 'Poder360: previsão do ministro na sanção', url: 'https://www.poder360.com.br/governo/usinas-termeletricas-a-gas-reduzirao-tarifa-de-energia-diz-albuquerque/' },
      { nome: 'eixos: pedido de novo cálculo à Aneel', url: 'https://eixos.com.br/deputados-da-oposicao-se-unem-para-impedir-privatizacao-da-eletrobras/' },
      { nome: 'Money Times: voto no TCU e estimativas', url: 'https://www.moneytimes.com.br/venda-da-eletrobras-pode-gerar-impacto-de-ate-65-a-conta-de-luz-diz-vital-2/' },
    ],
  },
  {
    id: 'bolsa-familia-2023',
    titulo: 'A volta do Bolsa Família',
    governo: 'lula-3',
    inicio: '2023-03',
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
      base: { efeito: 'neutro', curto: 'Fica acima da linha de entrada; só entra se a renda cair.', detalhe: 'Uma família que vive com um ou dois salários mínimos costuma ter renda por pessoa acima de R$ 218, o limite de entrada. A regra de proteção deixa quem arruma emprego continuar recebendo metade do benefício por até dois anos, o que evita perder tudo ao melhorar um pouco de vida.', evidencia: 'moderada' },
      pobreza: { efeito: 'ganhou', curto: 'Renda maior para famílias com crianças pequenas; menos extrema pobreza.', detalhe: 'O adicional por criança aumentou a renda das famílias com filhos pequenos, que estão entre as mais pobres. O IBGE estima que, sem os programas sociais, a extrema pobreza seria mais que o dobro em 2023.', evidencia: 'forte' },
    },
    exemplo: {
      titulo: 'Uma família de quatro: mãe, pai e dois filhos, de 3 e 8 anos',
      linhas: [
        'Renda do trabalho: R$ 600 por mês, de bicos. Por pessoa: R$ 150, abaixo do limite de R$ 218. Entra no programa.',
        'Benefício: R$ 600 de piso + R$ 150 pela criança de 3 anos + R$ 50 pela de 8 anos = R$ 800 por mês.',
        'Renda total: R$ 1.400, ou R$ 350 por pessoa. Antes de 2023, o mesmo programa pagava R$ 600, sem os adicionais.',
      ],
      aviso: 'Família hipotética para mostrar a regra. Os valores de R$ 150 por criança até 6 anos e R$ 50 por criança e adolescente de 7 a 17 anos estão na Lei 14.601/2023.',
    },
    quemPaga: 'Orçamento federal, ou seja, os contribuintes. O programa disputa espaço com outras despesas dentro da regra fiscal.',
    naoSabemos:
      'Quanto da queda da extrema pobreza em 2023 vem do Bolsa Família em si, e não do conjunto dos benefícios (que inclui aposentadorias e o BPC) e do mercado de trabalho, não é separado nas publicações do IBGE. Os efeitos de longo prazo sobre escola e saúde das crianças ainda não podem ser medidos.',
    fontes: [
      { nome: 'Planalto: Lei 14.601/2023', url: 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14601.htm' },
      { nome: 'IBGE: Síntese de Indicadores Sociais 2024 (dados de 2023)', url: 'https://agenciadenoticias.ibge.gov.br/' },
    ],
  },
  {
    id: 'salario-minimo-2003-2010',
    titulo: 'Os aumentos reais do salário mínimo',
    governo: 'lula-1-2',
    inicio: '2003-04',
    quando: '2003 a 2010',
    quemDecidiu: 'Executivo, com o valor do mínimo fixado a cada ano por medida provisória ou lei aprovada pelo Congresso',
    resumo:
      'De 2003 a 2010, o salário mínimo subiu bem acima da inflação todos os anos. Como aposentadorias do INSS e o benefício para idosos e pessoas com deficiência de baixa renda não podem ser menores que o mínimo, o aumento chegou direto à base da pirâmide.',
    fatos: [
      'Corrigido pela inflação (IPCA) até set. 2026, o salário mínimo passou de R$ 755 em dez. 2002 para R$ 1.228 em dez. 2010, um aumento real de cerca de 63% (cálculo do Observa Brasil com dados do Banco Central e do IBGE).',
      'Pela Constituição, nenhuma aposentadoria ou pensão do INSS pode ser menor que o salário mínimo, e o BPC, pago a idosos e pessoas com deficiência de baixa renda, é de um salário mínimo.',
      'A regra de reajuste pela inflação mais o crescimento do PIB de dois anos antes foi praticada a partir de 2007 e virou lei em 2011 (Lei 12.382/2011).',
    ],
    camadas: {
      alta: { efeito: 'neutro', curto: 'Quase não muda a renda dessa faixa.', detalhe: 'Salários muito acima do mínimo não são reajustados por ele.', evidencia: 'forte' },
      media: { efeito: 'neutro', curto: 'Efeito direto pequeno.', detalhe: 'Poucos salários dessa faixa acompanham o mínimo. Pode haver custo maior para quem emprega trabalhadores domésticos ou pequenos negócios.', evidencia: 'fraca' },
      'media-baixa': { efeito: 'ganhou', curto: 'Pisos salariais e salários perto do mínimo subiram junto.', detalhe: 'Muitos pisos de categorias e salários de entrada acompanham o mínimo, então o aumento se espalha para quem ganha um pouco mais que ele.', evidencia: 'moderada' },
      base: { efeito: 'ganhou', curto: 'Aposentadoria do piso e salário mínimo compraram bem mais.', detalhe: 'Quem recebe exatamente um salário mínimo, como a maioria dos aposentados do INSS, teve o poder de compra aumentado de forma direta e garantida em lei.', evidencia: 'forte' },
      pobreza: { efeito: 'misto', curto: 'O BPC subiu junto; quem vive de bico, sem carteira, não sente direto.', detalhe: 'Idosos e pessoas com deficiência de baixa renda recebem o BPC, que é de um salário mínimo, então ganharam diretamente. Já quem vive de trabalho informal não tem o salário atrelado ao mínimo; o efeito para esse grupo depende de o aumento se espalhar para os bicos, o que os estudos não medem com clareza.', evidencia: 'moderada' },
    },
    exemplo: {
      titulo: 'Uma aposentada que ganha o piso do INSS',
      linhas: [
        'Em dez. 2002, o mínimo valia R$ 755 em dinheiro de hoje (corrigido pela inflação até set. 2026).',
        'Em dez. 2010, valia R$ 1.228 em dinheiro de hoje.',
        'Diferença: R$ 473 a mais por mês para comprar as mesmas coisas, cerca de 63% a mais.',
      ],
      aviso: 'Cálculo do Observa Brasil com o salário mínimo (Banco Central) e o IPCA (IBGE).',
    },
    quemPaga: 'O orçamento federal, porque a despesa do INSS e do BPC sobe junto com o mínimo; e quem emprega com salário mínimo, sobretudo pequenos negócios e regiões de renda mais baixa.',
    naoSabemos:
      'Quanto da queda da desigualdade nos anos 2000 se deve ao mínimo, e não ao Bolsa Família, à educação e ao mercado de trabalho, é discutido entre pesquisadores. Também há debate sobre se aumentos fortes empurram parte dos trabalhadores para a informalidade em regiões mais pobres.',
    fontes: [
      { nome: 'Banco Central: salário mínimo (SGS 1619)', url: 'https://www3.bcb.gov.br/sgspub' },
      { nome: 'IBGE: IPCA (Sidra, tabela 1737)', url: 'https://sidra.ibge.gov.br/tabela/1737' },
      { nome: 'Planalto: Lei 12.382/2011', url: 'https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12382.htm' },
    ],
  },
  {
    id: 'conta-de-luz-2013-2015',
    titulo: 'A conta de luz que caiu em 2013 e subiu em 2015',
    governo: 'dilma',
    inicio: '2013-01',
    quando: '2013 a 2015',
    quemDecidiu: 'Executivo propôs e Congresso aprovou a renovação das concessões (Lei 12.783/2013); os reajustes seguintes foram definidos pela Aneel',
    resumo:
      'Em 2013, a renovação antecipada das concessões de energia baixou a conta de luz. Com a seca de 2014 e 2015 e o uso de usinas térmicas, mais caras, os custos voltaram nas tarifas, e a conta subiu 51% em 2015. Somando os três anos, a energia subiu cerca do dobro da inflação.',
    fatos: [
      'Pelo IPCA do IBGE, a energia elétrica residencial caiu 15,66% em 2013, subiu 17,06% em 2014 e 51,00% em 2015 (Sidra, tabela 1419).',
      'No acumulado de 2013 a 2015, a energia residencial subiu cerca de 49%, enquanto o IPCA geral subiu cerca de 25% (cálculo do Observa Brasil com os mesmos dados).',
      'A Lei 12.783 é de 11 jan. 2013. O sistema de bandeiras tarifárias, que cobra mais quando a geração fica cara, passou a valer em 2015.',
    ],
    camadas: {
      alta: { efeito: 'misto', curto: 'Desconto em 2013, alta em 2015; pesa pouco no orçamento.', detalhe: 'A conta de luz é uma parte pequena da renda dessa faixa, então tanto o desconto quanto a alta mudaram pouco o orçamento.', evidencia: 'moderada' },
      media: { efeito: 'misto', curto: 'Desconto em 2013; a alta de 2015 levou o desconto embora.', detalhe: 'O mesmo vaivém: a queda de 2013 foi mais do que compensada pelas altas seguintes.', evidencia: 'moderada' },
      'media-baixa': { efeito: 'pagou', curto: 'No saldo de três anos, a conta subiu bem mais que a inflação.', detalhe: 'Como a energia pesa mais no orçamento dessa faixa, a alta acumulada acima da inflação apertou mais o bolso.', evidencia: 'moderada' },
      base: { efeito: 'pagou', curto: 'É quem mais sente a conta de luz; o saldo foi de alta acima da inflação.', detalhe: 'Famílias que ganham pouco gastam proporcionalmente mais com energia, e a maioria nessa faixa não tem direito à Tarifa Social.', evidencia: 'moderada' },
      pobreza: { efeito: 'pagou', curto: 'Alta forte, amortecida para quem tem a Tarifa Social.', detalhe: 'O desconto da Tarifa Social é um percentual sobre a conta, então a alta de 2015 também chegou a essas famílias, só que menor. Para quem não estava inscrito, o peso foi o mesmo da base, numa renda ainda menor.', evidencia: 'moderada' },
    },
    exemplo: {
      titulo: 'Uma conta de luz de R$ 100 em dez. 2012',
      linhas: [
        'Em 2013 caiu 15,66%: R$ 84,34.',
        'Em 2014 subiu 17,06%: R$ 98,73.',
        'Em 2015 subiu 51%: R$ 149,08.',
        'No fim, a conta ficou cerca de R$ 49 maior. Se tivesse só acompanhado a inflação, seria cerca de R$ 125.',
      ],
      aviso: 'Conta hipotética, com as variações da energia elétrica residencial no IPCA (IBGE). Cada distribuidora teve reajustes diferentes.',
    },
    quemPaga: 'Os consumidores de energia, nas tarifas dos anos seguintes, e o Tesouro, que fez aportes ao setor elétrico para segurar as tarifas em 2013 e 2014.',
    naoSabemos:
      'Quanto da alta de 2015 vem da renovação das concessões e quanto vem da seca e do uso das térmicas, que teriam pesado de qualquer jeito, é um ponto discutido entre especialistas do setor elétrico.',
    fontes: [
      { nome: 'IBGE: IPCA por subitem (Sidra, tabela 1419)', url: 'https://sidra.ibge.gov.br/tabela/1419' },
      { nome: 'Planalto: Lei 12.783/2013', url: 'https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12783.htm' },
    ],
  },
  {
    id: 'reforma-trabalhista-2017',
    titulo: 'A reforma trabalhista',
    governo: 'temer',
    inicio: '2017-11',
    quando: 'jul. 2017 (em vigor desde nov. 2017)',
    quemDecidiu: 'Executivo propôs; Congresso aprovou (Lei 13.467/2017)',
    resumo:
      'A reforma mudou mais de cem pontos da CLT: deixou acordos coletivos valerem sobre a lei em vários temas, criou o trabalho intermitente e acabou com a contribuição sindical obrigatória. O número de processos trabalhistas caiu muito; o efeito sobre o emprego é disputado.',
    fatos: [
      'A Lei 13.467 é de 13 jul. 2017 e passou a valer em nov. 2017.',
      'De jan. a ago. 2018, as novas ações trabalhistas ficaram em média 36,5% abaixo do mesmo período de 2017, segundo dados do Tribunal Superior do Trabalho divulgados pela imprensa.',
      'A arrecadação da contribuição sindical caiu de R$ 3,64 bilhões em 2017 para cerca de R$ 500 milhões em 2018, segundo levantamento publicado pela imprensa com dados do Ministério do Trabalho.',
      'A informalidade passou de 38,3% no trimestre até mar. 2016 para 40,8% no trimestre até dez. 2018 (IBGE). Os dados mostram o que aconteceu, não o efeito isolado da reforma.',
    ],
    camadas: {
      alta: { efeito: 'ganhou', curto: 'Para quem emprega: menos processos e regras mais flexíveis.', detalhe: 'Empresas passaram a ter menos ações trabalhistas e mais liberdade para negociar jornada, banco de horas e outros pontos.', evidencia: 'moderada' },
      media: { efeito: 'misto', curto: 'Mais negociação, menos proteção automática da lei.', detalhe: 'Trabalhadores com mais poder de negociação podem conseguir acordos melhores; outros podem perder garantias que a lei dava. O resultado depende da categoria.', evidencia: 'fraca' },
      'media-baixa': { efeito: 'incerto', curto: 'Trabalho intermitente formalizou bicos, mas com renda incerta.', detalhe: 'O contrato intermitente registra trabalhos por hora ou por dia, o que dá alguns direitos, mas sem renda garantida no mês. Se isso criou empregos novos ou só trocou empregos, é disputado.', evidencia: 'em disputa' },
      base: { efeito: 'incerto', curto: 'A promessa era mais emprego; os dados não permitem afirmar.', detalhe: 'O desemprego seguia alto em 2018 e a informalidade subiu no período. Separar o efeito da reforma do efeito da recessão e da recuperação lenta exige estudos que comparem com um cenário sem a reforma, e eles chegam a conclusões diferentes.', evidencia: 'em disputa' },
      pobreza: { efeito: 'neutro', curto: 'A maioria trabalha sem carteira, fora da CLT.', detalhe: 'A reforma muda as regras de quem tem carteira assinada. Quem vive de bico, sem contrato, não é alcançado diretamente; só seria se a reforma criasse vagas formais para esse grupo, o que os estudos não conseguem confirmar.', evidencia: 'fraca' },
    },
    quemPaga: 'Os sindicatos, que perderam a maior parte da arrecadação com o fim da contribuição obrigatória.',
    naoSabemos:
      'Não há consenso sobre o efeito da reforma no número de empregos, na informalidade e nos salários. Estudos chegam a conclusões diferentes, e o período foi marcado por recessão e recuperação lenta, o que mistura os efeitos.',
    fontes: [
      { nome: 'Planalto: Lei 13.467/2017', url: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13467.htm' },
      { nome: 'COAD: dados do TST sobre ações trabalhistas', url: 'https://www.coad.com.br/home/noticias-detalhe/90256/reforma-trabalhista-completa-1-ano-veja-os-principais-efeitos' },
      { nome: 'Poder360: arrecadação sindical em 2018', url: 'https://www.poder360.com.br/economia/arrecadacao-sindical-cai-86-em-2018-1o-ano-fechado-de-reforma-trabalhista/' },
      { nome: 'IBGE: informalidade (Sidra, tabela 8529)', url: 'https://sidra.ibge.gov.br/tabela/8529' },
    ],
  },
  {
    id: 'isencao-ir-2026',
    titulo: 'A isenção do Imposto de Renda até R$ 5 mil',
    governo: 'lula-3',
    inicio: '2026-01',
    quando: 'lei de nov. 2025; vale desde 2026',
    quemDecidiu: 'Executivo propôs; Congresso aprovou (Lei 15.270/2025)',
    resumo:
      'Quem ganha até R$ 5 mil por mês deixou de pagar Imposto de Renda, e quem ganha até R$ 7.350 passou a pagar menos. Para compensar, a lei criou uma cobrança mínima para quem recebe mais de R$ 600 mil por ano e uma retenção sobre dividendos altos.',
    fatos: [
      'A Lei 15.270 é de 26 nov. 2025. A redução vale para rendimentos de até R$ 5.000 por mês (imposto zero) e diminui até zerar em R$ 7.350.',
      'A partir do ano-calendário de 2026, quem recebe mais de R$ 600 mil no ano fica sujeito a uma tributação mínima, com alíquota que chega a 10% para rendas a partir de R$ 1,2 milhão.',
      'Dividendos acima de R$ 50 mil por mês, pagos pela mesma empresa à mesma pessoa, passam a ter retenção na fonte.',
      'O governo estimou que mais de 10 milhões de pessoas deixariam de pagar o imposto. As estimativas de custo para os cofres públicos variam entre as fontes.',
    ],
    camadas: {
      alta: { efeito: 'pagou', curto: 'Rendas acima de R$ 600 mil por ano passam a ter imposto mínimo.', detalhe: 'Quem tem renda muito alta, sobretudo de dividendos, que antes não pagavam imposto, passa a ter uma cobrança mínima. Para a maior parte dessa faixa, abaixo de R$ 600 mil por ano, nada muda.', evidencia: 'forte' },
      media: { efeito: 'neutro', curto: 'Acima de R$ 7.350 por mês, o imposto não muda.', detalhe: 'Essa faixa fica acima do limite da redução e abaixo do limite da tributação mínima.', evidencia: 'forte' },
      'media-baixa': { efeito: 'ganhou', curto: 'É a faixa mais beneficiada: imposto zerado ou menor.', detalhe: 'Com o salário mínimo de 2026, essa faixa vai de cerca de R$ 3.200 a R$ 8.100 por mês. Quase toda ela fica dentro da isenção ou da redução.', evidencia: 'forte' },
      base: { efeito: 'neutro', curto: 'Já não pagava Imposto de Renda.', detalhe: 'Quem ganha até dois salários mínimos já estava isento antes da lei, então não há ganho direto.', evidencia: 'forte' },
      pobreza: { efeito: 'neutro', curto: 'Nunca pagou Imposto de Renda.', detalhe: 'O imposto que pesa nessa faixa é o que vem embutido no preço da comida, da luz e do gás, e esse a lei não muda.', evidencia: 'forte' },
    },
    exemplo: {
      titulo: 'Uma pessoa com salário de R$ 4.500 por mês',
      linhas: [
        'Em 2025, pela tabela do Imposto de Renda, pagava cerca de R$ 200 por mês de imposto, descontado do salário.',
        'Em 2026, com a lei nova, paga zero.',
        'São cerca de R$ 2.600 a mais por ano no bolso, contando o 13º salário: mais de um salário mínimo e meio.',
      ],
      aviso: 'Cálculo aproximado, só com o desconto simplificado e sem dependentes. O valor exato depende de dependentes, pensão e outras deduções.',
    },
    quemPaga: 'Quem tem renda muito alta, pela tributação mínima e pela retenção sobre dividendos. Se a compensação não cobrir a perda de arrecadação, a diferença pesa no orçamento federal.',
    naoSabemos:
      'Ainda não há dados da primeira declaração com as regras novas. Não se sabe se a cobrança sobre rendas altas vai compensar toda a perda, nem quanto do dinheiro que fica com as famílias vira consumo.',
    fontes: [
      { nome: 'Planalto: Lei 15.270/2025', url: 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15270.htm' },
      { nome: 'Jovem Pan: sanção e estimativas do governo', url: 'https://jovempan.com.br/politica/lula-sanciona-isencao-de-ir-para-quem-ganha-ate-r-5-mil/' },
    ],
  },
  {
    id: 'gasolina-2022',
    titulo: 'Gasolina: impostos zerados no meio da guerra',
    governo: 'bolsonaro',
    inicio: '2022-06',
    quando: 'jun. a dez. 2022',
    quemDecidiu: 'Congresso aprovou; Executivo sancionou (Lei Complementar 194/2022). O preço nas refinarias era definido pela Petrobras.',
    resumo:
      'Com a guerra na Ucrânia, o petróleo disparou e o litro da gasolina passou de R$ 7. Em junho de 2022, uma lei zerou os impostos federais sobre a gasolina até o fim do ano e limitou o ICMS dos estados. Somado aos cortes da Petrobras, que acompanharam a queda do petróleo, o litro caiu cerca de R$ 2,50 até dezembro. A conta foi para os cofres públicos, e uma parte ficou para o governo seguinte decidir e pagar.',
    fatos: [
      'Pela pesquisa semanal da ANP, a média nacional do litro da gasolina comum chegou a R$ 7,39 na semana de 19 a 25 jun. 2022 e caiu para R$ 4,93 na semana de 18 a 24 dez. 2022.',
      'A Lei Complementar 194, de 23 jun. 2022, zerou PIS/Cofins e Cide sobre gasolina e etanol até 31 dez. 2022. Só o PIS/Cofins era de cerca de R$ 0,79 por litro de gasolina pura (Abicom, citada pela imprensa).',
      'No IPCA, a gasolina caiu 15,48% em jul., 11,64% em ago. e 8,33% em set. 2022 (IBGE). A inflação geral ficou negativa nesses três meses.',
      'Na época, a desoneração federal de gasolina e etanol em 2022 foi estimada em pelo menos R$ 35,2 bilhões (Valor Econômico, citado por eixos). Não encontramos o valor final oficial.',
      'Os estados estimaram ter perdido R$ 45 bilhões de ICMS de jun. a dez. 2022 (Comsefaz). Em 2023, a Lei Complementar 201 fixou a compensação da União em R$ 27 bilhões, paga até 2025, ou seja, pelo governo seguinte.',
      'A Petrobras seguia a paridade de importação (PPI), adotada em 2016: o preço nas refinarias acompanhava o petróleo lá fora e o dólar. Por isso, quando o petróleo caiu no segundo semestre, a gasolina também caiu.',
    ],
    camadas: {
      alta: { efeito: 'ganhou', curto: 'Desconto grande em reais, pequeno perto da renda.', detalhe: 'Quem tem dois carros e roda muito economizou bastante em reais. Mas é uma fatia pequena do orçamento dessa faixa.', evidencia: 'moderada' },
      media: { efeito: 'ganhou', curto: 'Quem usa carro todo dia sentiu o maior alívio no orçamento.', detalhe: 'Para a família que vai de carro ao trabalho e à escola, gasolina é um dos maiores gastos do mês. O desconto chegou à bomba em poucas semanas.', evidencia: 'moderada' },
      'media-baixa': { efeito: 'ganhou', curto: 'Moto, carro de aplicativo e frete ficaram mais baratos.', detalhe: 'Motoboys, motoristas de aplicativo e pequenos fretes trabalham com o combustível. Para eles, cada real a menos no litro é renda a mais no fim do mês.', evidencia: 'moderada' },
      base: { efeito: 'misto', curto: 'Pouca gente tem carro; o alívio veio pela inflação mais baixa.', detalhe: 'O ganho direto é pequeno, porque poucas famílias dessa faixa abastecem. O indireto foi a inflação negativa no segundo semestre. Do outro lado, os estados perderam receita de ICMS, que paga escola, posto de saúde e polícia.', evidencia: 'fraca' },
      pobreza: { efeito: 'misto', curto: 'Quase não abastece; depende mais dos serviços do estado.', detalhe: 'Quase nenhuma família dessa faixa tem carro. O efeito chega pelos preços em geral e pelos serviços públicos estaduais, que perderam parte da receita até a compensação ser paga.', evidencia: 'fraca' },
    },
    quemPaga: 'A União, que deixou de arrecadar, e os estados e municípios, que perderam ICMS e só foram compensados em parte, entre 2023 e 2025. No fim, todos os contribuintes.',
    caminho: [
      { passo: 'O choque de fora', texto: 'A Rússia invade a Ucrânia em fev. 2022 e o petróleo dispara. Como a Petrobras seguia o preço internacional, a gasolina sobe aqui também.', evidencia: 'forte' },
      { passo: 'A decisão', texto: 'O Congresso aprova e o governo sanciona: impostos federais zerados até dezembro e ICMS limitado. É ano de eleição, e o preço do combustível estava no centro do debate.' },
      { passo: 'O preço cai na bomba', texto: 'Sai o imposto federal (cerca de R$ 0,58 por litro na gasolina da bomba, que tem 27% de etanol, pelo nosso cálculo), cai o ICMS e a Petrobras reduz o preço com a queda do petróleo.', evidencia: 'forte' },
      { passo: 'A inflação cai', texto: 'Como a gasolina pesa muito no IPCA, a inflação fica negativa em jul., ago. e set. 2022.', evidencia: 'forte' },
      { passo: 'A conta fica para depois', texto: 'O desconto tinha data para acabar: 31 dez. 2022. O governo seguinte teria de escolher entre renovar, o que custa bilhões, ou voltar a cobrar, o que sobe o preço. E teria de pagar aos estados a compensação pelo ICMS.', evidencia: 'forte' },
    ],
    exemplo: {
      titulo: 'Um carro que roda 1.000 km por mês, fazendo 10 km por litro',
      linhas: [
        'São 100 litros por mês. A R$ 7,39 o litro (jun. 2022): R$ 739.',
        'A R$ 4,93 o litro (dez. 2022): R$ 493. São R$ 246 a menos por mês.',
        'Só os impostos federais zerados explicam cerca de R$ 58 desses R$ 246. O resto veio do ICMS menor e da queda do petróleo repassada pela Petrobras.',
        'Uma moto que roda 1.050 km por mês, fazendo 35 km por litro, usa 30 litros: R$ 74 a menos por mês no mesmo período.',
      ],
      aviso: 'Carro e moto hipotéticos. Os preços são médias nacionais da ANP; o imposto por litro é cálculo nosso, com a mistura de 27% de etanol.',
    },
    origens: [
      { origem: 'de-fora', titulo: 'A guerra e o petróleo', texto: 'A alta do primeiro semestre veio do preço internacional do petróleo, que nenhum governo controla.' },
      { origem: 'herdado', titulo: 'A regra de preço da Petrobras', texto: 'A paridade de importação foi adotada em 2016, no governo Temer, e mantida até 2023. Ela fazia o preço daqui subir e cair junto com o de fora.' },
      { origem: 'decisao', titulo: 'Zerar impostos com data para acabar', texto: 'A escolha de cortar impostos, e não de compensar de outro jeito, foi do governo e do Congresso. Ela baixou o preço na hora e deixou a decisão sobre 2023 para quem viesse depois.' },
    ],
    grafico: { serie: 'gasolina-real', titulo: 'A gasolina descontada a inflação, desde 2003', descricao: 'Índice do preço da gasolina no IPCA dividido pelo IPCA geral, com dez. 2002 igual a 100. Acima de 100, a gasolina está mais cara que em 2002 comparada ao resto dos preços.', unidade: 'índice, dez. 2002 = 100', casas: 0 },
    naoSabemos:
      'Quanto o preço teria ficado sem a desoneração depende do que a Petrobras teria feito, e isso ninguém sabe. Também não há medida de quanto a perda de ICMS afetou, na prática, escolas, hospitais e segurança nos estados.',
    fontes: [
      { nome: 'Planalto: Lei Complementar 194/2022', url: 'https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp194.htm' },
      { nome: 'Planalto: Lei Complementar 201/2023', url: 'https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp201.htm' },
      { nome: 'ANP: levantamento semanal de preços', url: 'https://www.gov.br/anp/pt-br/assuntos/precos-e-defesa-da-concorrencia/precos/levantamento-de-precos-de-combustiveis-ultimas-semanas-pesquisadas' },
      { nome: 'IBGE: IPCA por subitem (Sidra, tabela 7060)', url: 'https://sidra.ibge.gov.br/tabela/7060' },
      { nome: 'eixos: custo estimado da desoneração', url: 'https://eixos.com.br/?p=50470' },
      { nome: 'Comsefaz: perdas de ICMS', url: 'https://static.poder360.com.br/2023/11/NOTA-TECNICA-COMSEFAZ-023-2023-Impactos-das-LCs-192.22-e-LCs-194.22-sobre-arrecadacao-de-ICMS-dos-estados1-1.pdf' },
    ],
  },
  {
    id: 'gasolina-2023',
    titulo: 'Gasolina: impostos de volta e o fim da paridade',
    governo: 'lula-3',
    inicio: '2023-01',
    quando: 'jan. a jul. 2023',
    quemDecidiu: 'Executivo (Medidas Provisórias 1.157 e 1.163/2023). A Petrobras, com nova direção indicada pelo governo, mudou a política de preços.',
    resumo:
      'O novo governo prorrogou a isenção da gasolina por dois meses e depois voltou a cobrar os impostos federais em duas etapas, em março e na virada de junho para julho de 2023. Em maio, a Petrobras abandonou a paridade de importação. Desde então, a gasolina subiu mais que a inflação, em parte por causa dos impostos de volta.',
    fatos: [
      'A Medida Provisória 1.157 prorrogou a isenção da gasolina e do etanol até 28 fev. 2023. Em março, a cobrança voltou em parte (MP 1.163/2023), e voltou inteira na virada de junho para julho.',
      'Na primeira etapa, o imposto voltou com R$ 0,47 por litro de gasolina pura. Como a Petrobras baixou o preço em R$ 0,13 no mesmo dia, o aumento nas refinarias foi de R$ 0,34 (imprensa, com dados do governo e da Petrobras).',
      'O Ministério da Fazenda estimou arrecadar R$ 28,9 bilhões em 2023 com a volta dos impostos sobre gasolina e etanol.',
      'Em 16 maio 2023, a Petrobras anunciou o fim da paridade de importação e reduziu a gasolina nas refinarias em R$ 0,40 por litro, de R$ 3,18 para R$ 2,78 (Poder360).',
      'No IPCA, a gasolina subiu 8,33% em mar. e 4,75% em jul. 2023, os dois meses da volta dos impostos (IBGE).',
      'Descontada a inflação, a gasolina estava em set. 2026 cerca de 11% mais cara que em dez. 2022, e cerca de 10% mais barata que em dez. 2002 (cálculo do Observa Brasil com o IPCA).',
    ],
    camadas: {
      alta: { efeito: 'pagou', curto: 'Gasolina mais cara; pesa pouco na renda.', detalhe: 'O aumento em reais pode ser grande para quem roda muito, mas é uma parte pequena do orçamento dessa faixa.', evidencia: 'moderada' },
      media: { efeito: 'pagou', curto: 'Quem depende do carro pagou mais por litro.', detalhe: 'É o mesmo grupo que mais ganhou com a isenção de 2022 e o que mais sentiu a volta dos impostos.', evidencia: 'moderada' },
      'media-baixa': { efeito: 'pagou', curto: 'Moto, aplicativo e frete ficaram mais caros.', detalhe: 'Para quem trabalha com o veículo, o imposto de volta é um custo de trabalho, que reduz o que sobra no fim do mês.', evidencia: 'moderada' },
      base: { efeito: 'misto', curto: 'Pouco carro; o dinheiro arrecadado entra no orçamento dos benefícios.', detalhe: 'O efeito direto é pequeno. A gasolina mais cara chega aos poucos no preço de outras coisas. Do outro lado, a arrecadação entra no mesmo orçamento que paga o salário mínimo e os benefícios, mas não dá para ligar um real a outro.', evidencia: 'fraca' },
      pobreza: { efeito: 'neutro', curto: 'Quase não abastece.', detalhe: 'O efeito direto é muito pequeno. O indireto, pelos preços em geral, existe mas não está medido para essa faixa.', evidencia: 'fraca' },
    },
    quemPaga: 'Quem abastece, pela volta do imposto. Do lado da Petrobras, se ela vende abaixo do preço internacional por muito tempo, lucra menos e paga menos dividendos à União e aos acionistas.',
    caminho: [
      { passo: 'A herança', texto: 'A isenção acabava em 31 dez. 2022. Manter custaria cerca de R$ 28,9 bilhões no ano; voltar a cobrar subiria o preço.', evidencia: 'forte' },
      { passo: 'A decisão', texto: 'O governo prorroga por dois meses e depois volta a cobrar em duas etapas, para o aumento não vir de uma vez.' },
      { passo: 'A Petrobras amortece', texto: 'A empresa corta o preço nas refinarias em março e, em maio, muda a regra: deixa de copiar o preço de fora dia a dia e reduz o litro em R$ 0,40.', evidencia: 'forte' },
      { passo: 'O preço sobe na bomba', texto: 'Mesmo com os cortes, a gasolina sobe nos meses da volta do imposto: 8,33% em março e 4,75% em julho, pelo IPCA.', evidencia: 'forte' },
      { passo: 'O efeito de segunda ordem', texto: 'Arrecadar mais ajuda a fechar as contas do governo, e contas mais arrumadas tendem a baratear os juros. Mas não há como isolar quanto disso veio da gasolina.', evidencia: 'fraca' },
    ],
    exemplo: {
      titulo: 'O mesmo carro de 100 litros por mês',
      linhas: [
        'O imposto federal cheio é de cerca de R$ 0,79 por litro de gasolina pura, ou cerca de R$ 0,58 por litro na gasolina da bomba, com 27% de etanol.',
        'Se fosse repassado inteiro, seriam cerca de R$ 58 a mais por mês para quem abastece 100 litros, e R$ 17 para a moto de 30 litros.',
        'Na prática, os cortes da Petrobras no mesmo período compensaram uma parte desse aumento.',
      ],
      aviso: 'Carro e moto hipotéticos. O imposto por litro é cálculo nosso com o valor citado pela Abicom e a mistura de etanol vigente em 2023.',
    },
    origens: [
      { origem: 'herdado', titulo: 'Uma isenção com data para acabar', texto: 'A desoneração de 2022 terminava em 31 de dezembro. Qualquer governo que assumisse em 2023 teria de decidir o que fazer.' },
      { origem: 'decisao', titulo: 'Voltar a cobrar e mudar a regra da Petrobras', texto: 'A escolha de reonerar em duas etapas, e de mudar a política de preços da Petrobras, foi deste governo.' },
      { origem: 'de-fora', titulo: 'O preço do petróleo', texto: 'O petróleo lá fora continuou subindo e caindo. A regra nova suaviza esse vaivém, mas não o elimina.' },
    ],
    grafico: { serie: 'gasolina-real', titulo: 'A gasolina descontada a inflação, desde 2003', descricao: 'Índice do preço da gasolina no IPCA dividido pelo IPCA geral, com dez. 2002 igual a 100. Acima de 100, a gasolina está mais cara que em 2002 comparada ao resto dos preços.', unidade: 'índice, dez. 2002 = 100', casas: 0 },
    naoSabemos:
      'Quanto a nova política da Petrobras segurou o preço abaixo do que seria com a paridade, e quanto isso custou à empresa, é calculado de formas diferentes por analistas e pela própria Petrobras.',
    fontes: [
      { nome: 'Poder360: fim da paridade e redução de R$ 0,40', url: 'https://www.poder360.com.br/economia/petrobras-anuncia-reducao-de-r-040-no-litro-da-gasolina/' },
      { nome: 'Poder360: volta do imposto e corte da Petrobras', url: 'https://www.poder360.com.br/economia/lula-aumenta-imposto-e-petrobras-corta-preco-da-gasolina/' },
      { nome: 'Movimento Econômico: arrecadação estimada de R$ 28,9 bi', url: 'https://movimentoeconomico.com.br/economia/combustivel/2023/02/27/fazenda-anuncia-reoneracao-de-combustiveis-em-r-289-bilhoes/' },
      { nome: 'IBGE: IPCA por subitem (Sidra, tabela 7060)', url: 'https://sidra.ibge.gov.br/tabela/7060' },
    ],
  },
  {
    id: 'contas-2023',
    titulo: 'O rombo de 2023: quanto foi herdado',
    governo: 'lula-3',
    inicio: '2023-01',
    quando: '2023',
    quemDecidiu: 'Congresso aprovou a PEC da Transição (Emenda Constitucional 126/2022) a pedido do governo eleito; o pagamento dos precatórios atrasados foi autorizado pelo Supremo',
    resumo:
      'O governo federal fechou 2023 com déficit de R$ 230,5 bilhões. Mas R$ 92,4 bilhões disso foram dívidas judiciais que vinham sendo adiadas desde 2022 e foram pagas de uma vez. Outra parte veio de decisões do próprio governo, como os gastos aprovados na PEC da Transição. Aqui separamos as peças, e mostramos como um déficit chega ao bolso de quem nem recebe nada do governo.',
    fatos: [
      'Déficit primário do governo central em 2023: R$ 230,5 bilhões, 2,1% do PIB, o segundo maior da série do Tesouro, atrás de 2020. Em 2022, tinha havido superávit de R$ 54,1 bilhões (Tesouro Nacional).',
      'Desse total, R$ 92,4 bilhões foram precatórios, dívidas da União reconhecidas pela Justiça, pagos em dez. 2023. Sem eles, o déficit seria de R$ 138,1 bilhões, 1,3% do PIB (Tesouro Nacional).',
      'As Emendas Constitucionais 113 e 114, de dez. 2021, criaram um limite anual para pagar precatórios; o que passava do limite ficava para depois. Segundo o secretário do Tesouro do governo seguinte, cerca de R$ 50 bilhões foram adiados assim em 2022, o que ajudou o superávit daquele ano.',
      'No fim de 2023, o Supremo derrubou o limite e autorizou o pagamento do estoque atrasado com crédito extraordinário. O governo pagou tudo em dez. 2023.',
      'O orçamento de 2023 enviado em ago. 2022 pelo governo anterior previa o Auxílio Brasil com média de R$ 405, e não os R$ 600 prometidos pelos dois candidatos (InfoMoney).',
      'A PEC da Transição (EC 126/2022), aprovada em dez. 2022, autorizou até R$ 145 bilhões de gastos acima do teto em 2023: R$ 70 bilhões para o Bolsa Família e o restante para saúde, Farmácia Popular, aumento do salário mínimo e outras despesas (Agência Senado).',
      'A Lei Complementar 201/2023 fixou em R$ 27 bilhões a compensação aos estados pelo ICMS de 2022, paga até 2025, parte com abatimento de dívidas dos estados.',
      'A Selic caiu de 13,75% para 10,5% entre ago. 2023 e maio 2024, e voltou a subir até 15% em jun. 2025 (Banco Central). Na ata da reunião de dez. 2024, o Copom escreveu que a percepção sobre o anúncio fiscal do governo afetou de forma relevante os preços de ativos e as expectativas.',
    ],
    camadas: {
      alta: { efeito: 'incerto', curto: 'Juros altos rendem nas aplicações e encarecem os negócios.', detalhe: 'Se o déficit ajuda a manter os juros altos, quem tem dinheiro aplicado ganha e quem tem empresa endividada perde. O saldo depende de cada um.', evidencia: 'em disputa' },
      media: { efeito: 'misto', curto: 'Não recebe os programas; sente se os juros ficam altos.', detalhe: 'É a faixa que mais tem financiamento de casa e de carro. Se a desconfiança com as contas públicas segura a Selic alta, a prestação nova fica mais cara.', evidencia: 'fraca' },
      'media-baixa': { efeito: 'misto', curto: 'Ganhou com o mínimo maior; paga mais caro no crediário.', detalhe: 'Salários perto do mínimo subiram junto com ele. Ao mesmo tempo, é a faixa do crediário e do financiamento de moto, que encarecem com juros altos.', evidencia: 'fraca' },
      base: { efeito: 'ganhou', curto: 'Salário mínimo e aposentadoria do piso com aumento real.', detalhe: 'Parte do gasto autorizado pela PEC da Transição foi para o aumento do salário mínimo acima da inflação, que chega direto a quem ganha o piso e aos aposentados do INSS.', evidencia: 'moderada' },
      pobreza: { efeito: 'ganhou', curto: 'Bolsa Família de R$ 600, com adicionais por criança.', detalhe: 'Sem a PEC, o orçamento previa média de R$ 405. Com ela, o piso ficou em R$ 600, mais R$ 150 por criança pequena.', evidencia: 'forte' },
    },
    quemPaga: 'Todos, pela dívida pública: o déficit vira dívida, e dívida gera juros pagos com impostos nos anos seguintes.',
    caminho: [
      { passo: 'A decisão e a herança', texto: 'O governo gasta mais com programas sociais, aprovados na PEC da Transição, e paga de uma vez as dívidas judiciais que tinham sido adiadas.' },
      { passo: 'O déficit vira dívida', texto: 'Quando o governo gasta mais do que arrecada, ele pega dinheiro emprestado vendendo títulos. A dívida cresce.', evidencia: 'forte' },
      { passo: 'Quem empresta desconfia', texto: 'Se bancos e investidores acham que a dívida vai crescer sem controle, eles pedem juros maiores para emprestar ao governo. Os juros de longo prazo sobem.', evidencia: 'moderada' },
      { passo: 'O Banco Central reage', texto: 'Desconfiança derruba o real e o dólar caro sobe os preços. Para segurar a inflação, o Banco Central mantém ou sobe a Selic. Na ata de dez. 2024, o Copom escreveu que a percepção sobre o anúncio fiscal do governo afetou de forma relevante os preços e as expectativas.', evidencia: 'moderada' },
      { passo: 'Chega ao seu bolso', texto: 'Com Selic alta, financiamento de casa, de carro e o crediário ficam mais caros. Quem mais sente é a classe média, que concentra esses financiamentos. Quanto da Selic de 15% se deve às contas públicas, e não à inflação de alimentos e ao dólar, é disputado.', evidencia: 'em disputa' },
    ],
    exemplo: {
      titulo: 'Separando as peças do déficit de 2023',
      linhas: [
        'Déficit total: R$ 230,5 bilhões.',
        'Menos os precatórios atrasados, pagos de uma vez: R$ 92,4 bilhões. Sobram R$ 138,1 bilhões.',
        'O que sobra mistura gastos decididos pelo governo, como os da PEC da Transição, a compensação aos estados e o desempenho da arrecadação. Não existe uma conta oficial que divida esse resto por origem, e por isso não inventamos uma.',
      ],
      aviso: 'Números do Tesouro Nacional. A separação entre herdado e decidido é nossa, seguindo o método do site.',
    },
    origens: [
      { origem: 'herdado', titulo: 'Precatórios adiados', valor: 'R$ 92,4 bi', texto: 'Dívidas reconhecidas pela Justiça que a regra de 2021 empurrou para frente. A dívida existia de qualquer jeito; a escolha de 2023 foi pagar tudo de uma vez, em vez de aos poucos.' },
      { origem: 'herdado', titulo: 'Compensação do ICMS de 2022', valor: 'R$ 27 bi até 2025', texto: 'Conta da lei de 2022 que limitou o ICMS dos combustíveis. O valor foi fixado em acordo com os estados e pago em parcelas.' },
      { origem: 'decisao', titulo: 'Gastos da PEC da Transição', valor: 'até R$ 145 bi', texto: 'Bolsa Família de R$ 600 com adicionais, aumento do salário mínimo e saúde. Decisão do governo eleito, aprovada pelo Congresso. Os R$ 600 tinham sido prometidos pelos dois candidatos, mas não estavam no orçamento enviado em 2022.' },
      { origem: 'de-fora', titulo: 'Arrecadação e economia', texto: 'A receita do governo também depende do petróleo, do lucro das empresas e da economia. Não há uma separação oficial dessa parte, então não damos número.' },
    ],
    naoSabemos:
      'Não existe divisão oficial do déficit de 2023 entre decisões novas, heranças e economia. Também é disputado quanto da Selic alta de 2025 se deve à desconfiança com as contas públicas e quanto à inflação e ao dólar.',
    fontes: [
      { nome: 'Correio Braziliense: resultado de 2023 e precatórios', url: 'https://www.correiobraziliense.com.br/economia/2024/01/6794764-governo-fecha-2023-com-saldo-negativo-de-rs-2305-bilhoes.html' },
      { nome: 'Poder360: superávit de 2022', url: 'https://www.poder360.com.br/economia/governo-fecha-2022-com-superavit-de-r-54-bi-o-maior-em-9-anos/' },
      { nome: 'Agência Senado: PEC da Transição', url: 'https://www12.senado.leg.br/noticias/materias/2022/12/21/senado-confirma-mudancas-da-camara-e-aprova-pec-da-Transicao' },
      { nome: 'InfoMoney: orçamento de 2023 com Auxílio de R$ 405', url: 'https://www.infomoney.com.br/?p=1925851' },
      { nome: 'Planalto: Lei Complementar 201/2023', url: 'https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp201.htm' },
      { nome: 'Banco Central: histórico da Selic', url: 'https://www.bcb.gov.br/controleinflacao/historicotaxasjuros' },
      { nome: 'Banco Central: ata do Copom de dez. 2024', url: 'https://www.bcb.gov.br/content/copom/atascopom/Copom267-not20241211267.pdf' },
    ],
  },
];

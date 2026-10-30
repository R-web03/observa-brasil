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
  {
    id: 'salario-minimo-2003-2010',
    titulo: 'Os aumentos reais do salário mínimo',
    governo: 'lula-1-2',
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
      base: { efeito: 'ganhou', curto: 'Aposentadoria do piso, BPC e salário mínimo compraram bem mais.', detalhe: 'Quem recebe exatamente um salário mínimo, como a maioria dos aposentados do INSS e todos os beneficiários do BPC, teve o poder de compra aumentado de forma direta e garantida em lei.', evidencia: 'forte' },
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
      base: { efeito: 'pagou', curto: 'É quem mais sente a conta de luz; o saldo foi de alta acima da inflação.', detalhe: 'Famílias de baixa renda gastam proporcionalmente mais com energia. Parte delas tem a Tarifa Social, com desconto, o que suaviza o efeito.', evidencia: 'moderada' },
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
    },
    quemPaga: 'Quem tem renda muito alta, pela tributação mínima e pela retenção sobre dividendos. Se a compensação não cobrir a perda de arrecadação, a diferença pesa no orçamento federal.',
    naoSabemos:
      'Ainda não há dados da primeira declaração com as regras novas. Não se sabe se a cobrança sobre rendas altas vai compensar toda a perda, nem quanto do dinheiro que fica com as famílias vira consumo.',
    fontes: [
      { nome: 'Planalto: Lei 15.270/2025', url: 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15270.htm' },
      { nome: 'Jovem Pan: sanção e estimativas do governo', url: 'https://jovempan.com.br/politica/lula-sanciona-isencao-de-ir-para-quem-ganha-ate-r-5-mil/' },
    ],
  },
];

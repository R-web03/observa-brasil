// Peças comuns aos dois moldes novos: a aula de conceito e a análise de decisão pública.
// As duas revelam a informação em camadas, sempre na mesma ordem (ver CAMADAS_AULA e
// CAMADAS_ANALISE), e as duas usam o mapa de caminhos e o "quem sente" abaixo.

// O que uma ligação de causa e efeito é, em termos de evidência. Toda seta tem uma destas.
export type Natureza = 'observado' | 'provavel' | 'hipotese' | 'em-disputa';

export const NATUREZA: Record<Natureza, { rotulo: string; explica: string }> = {
  observado: { rotulo: 'Efeito observado', explica: 'Aconteceu e foi medido, com fonte.' },
  provavel: { rotulo: 'Provável, se...', explica: 'O mecanismo é conhecido, mas o tamanho depende de condições.' },
  hipotese: { rotulo: 'Hipótese plausível', explica: 'Faz sentido, mas ninguém mediu ainda.' },
  'em-disputa': { rotulo: 'Em disputa', explica: 'Há estudos ou leituras que apontam para lados diferentes.' },
};

// Um passo do caminho: a parada e a ligação que leva até ela, vinda da parada anterior.
export type Parada = {
  titulo: string;
  como: string; // o mecanismo da ligação, em linguagem simples
  natureza: Natureza;
  fonte?: string; // nome curto da fonte, quando houver
  fatores?: string[]; // ids de fatores que podem mudar o tamanho ou o sentido desta ligação
  aPesquisar?: string; // o que falta verificar antes de publicar
};

export type Caminho = {
  id: string;
  nome: string; // "Na bomba", "No frete e na comida"
  partida: string; // a decisão ou o choque de onde o caminho sai
  paradas: Parada[];
};

export type Fator = { id: string; nome: string; texto: string };

// Quem sente: por situação de vida, não só por renda.
export type Situacao = {
  situacao: string; // "Tem carro e roda todo dia"
  como: string;
  tipo: 'direto' | 'indireto';
  quando: 'na hora' | 'em meses' | 'em anos';
  exemplo?: string; // um valor em reais, só quando há conta com fonte
  natureza: Natureza;
};

export const ROTULO_TIPO = {
  direto: 'Impacto direto',
  indireto: 'Impacto indireto',
} as const;

// As camadas de cada molde, na ordem em que aparecem. O índice lateral usa estas listas.
export const CAMADAS_AULA = [
  { id: 'resposta', rotulo: 'Resposta rápida' },
  { id: 'exemplo', rotulo: 'Exemplo concreto' },
  { id: 'como-funciona', rotulo: 'Como funciona' },
  { id: 'quem-sente', rotulo: 'Quem sente e como' },
  { id: 'dados', rotulo: 'O que os dados mostram' },
  { id: 'incerto', rotulo: 'O que ainda é incerto' },
  { id: 'continuar', rotulo: 'Para continuar' },
] as const;

export const CAMADAS_ANALISE = [
  { id: 'resposta', rotulo: 'Resposta rápida' },
  { id: 'o-que-aconteceu', rotulo: 'O que aconteceu' },
  { id: 'por-que', rotulo: 'Por que foi decidido' },
  { id: 'caminhos', rotulo: 'Caminhos do efeito' },
  { id: 'quem-sente', rotulo: 'Quem sente e como' },
  { id: 'dados', rotulo: 'O que os dados mostram' },
  { id: 'incerto', rotulo: 'O que ainda é incerto' },
  { id: 'continuar', rotulo: 'Para continuar' },
] as const;

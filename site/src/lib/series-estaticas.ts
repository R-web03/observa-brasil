// Séries calculadas a partir de tabelas do IBGE que não entram na ingestão diária.
// gasolina-real: subitem gasolina do IPCA (Sidra 655, 2938, 1419 e 7060) dividido pelo IPCA
// geral (Sidra 1737), dez. 2002 = 100. Para atualizar, refaça o cálculo com as mesmas tabelas.
import type { Ponto } from './dados';
import gasolinaReal from './dados-gasolina-real.json';

export const SERIES_ESTATICAS: Record<string, Ponto[]> = {
  'gasolina-real': gasolinaReal as Ponto[],
};

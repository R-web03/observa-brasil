// Indicadores usados nas páginas de governos, todos com a mesma régua.
// Os dados são lidos do banco uma vez por build (cache em memória).
import { mensal, observacoes, type Ponto } from './dados';
import { deflacionar } from './governos';

export type IndicadorGoverno = {
  id: string; // id da série (e da ficha de indicador)
  nome: string;
  unidade: string;
  casas: number;
  anual?: boolean;
  nota?: string;
  pontos: Ponto[];
};

const DEFINICOES: Omit<IndicadorGoverno, 'pontos'>[] = [
  { id: 'pib-crescimento', nome: 'Crescimento do PIB', unidade: '% ao ano', casas: 1, anual: true, nota: 'Cada ano conta para quem governou a maior parte dele.' },
  { id: 'ipca-12-meses', nome: 'Inflação em 12 meses (IPCA)', unidade: '%', casas: 1 },
  { id: 'selic-meta', nome: 'Meta da Selic', unidade: '% ao ano', casas: 2, nota: 'Valor em vigor no fim de cada mês. Decidida pelo Copom, do Banco Central.' },
  { id: 'desocupacao', nome: 'Desemprego (taxa de desocupação)', unidade: '%', casas: 1, nota: 'A pesquisa começa em 2012.' },
  { id: 'informalidade', nome: 'Informalidade', unidade: '% dos ocupados', casas: 1, nota: 'A série começa no fim de 2015.' },
  { id: 'rendimento-real', nome: 'Rendimento médio real do trabalho', unidade: 'R$', casas: 0, nota: 'Corrigido pela inflação até o trimestre mais recente. A pesquisa começa em 2012.' },
  { id: 'salario-minimo-real', nome: 'Salário mínimo real', unidade: 'R$', casas: 0, nota: 'Valor nominal corrigido pelo IPCA até o último mês disponível.' },
  { id: 'resultado-primario-pib', nome: 'Resultado primário do setor público', unidade: '% do PIB, 12 meses', casas: 1, nota: 'Positivo é superávit; negativo, déficit. Sem os juros da dívida.' },
  { id: 'divida-bruta-pib', nome: 'Dívida bruta do governo geral', unidade: '% do PIB', casas: 1, nota: 'Metodologia do Banco Central a partir de dez. 2006.' },
  { id: 'cambio-dolar', nome: 'Dólar comercial', unidade: 'R$ por US$', casas: 2, nota: 'Média do mês, em reais da época (sem correção pela inflação).' },
];

let cache: Promise<IndicadorGoverno[]> | undefined;

export function indicadoresDeGoverno(): Promise<IndicadorGoverno[]> {
  cache ??= (async () => {
    const [ipcaMensal, salario] = await Promise.all([observacoes('ipca-mensal'), observacoes('salario-minimo')]);
    const real = deflacionar(salario, ipcaMensal);
    return Promise.all(
      DEFINICOES.map(async (d) => {
        if (d.id === 'salario-minimo-real') {
          const base = real.base ? ` (a preços de ${real.base.slice(5, 7)}/${real.base.slice(0, 4)})` : '';
          return { ...d, unidade: `R$${base}`, pontos: real.pontos };
        }
        const brutos = await observacoes(d.id);
        return { ...d, pontos: d.id === 'selic-meta' ? mensal(brutos) : brutos };
      }),
    );
  })();
  return cache;
}

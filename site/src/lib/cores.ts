// Cor fixa de cada série, igual em todo o site: a cor segue o indicador, nunca a posição.
// As cores vêm da paleta categórica do design system (--chart-1 a --chart-5).
// Nenhuma cor representa governo ou partido.
const COR_SERIE: Record<string, string> = {
  'ipca-12-meses': 'var(--chart-1)',
  'ipca-mensal': 'var(--chart-1)',
  'selic-meta': 'var(--chart-2)',
  desocupacao: 'var(--chart-3)',
  'divida-bruta-pib': 'var(--chart-4)',
};

export const corDaSerie = (id: string) => COR_SERIE[id] ?? 'var(--chart-1)';

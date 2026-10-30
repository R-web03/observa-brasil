// Cor fixa de cada série, igual em todo o site: a cor segue o indicador, nunca a posição.
// As cores vêm da paleta categórica do design system (--chart-1 a --chart-7; indicadores da mesma família dividem a cor e nunca aparecem no mesmo gráfico).
// Nenhuma cor representa governo ou partido.
const COR_SERIE: Record<string, string> = {
  'ipca-12-meses': 'var(--chart-1)',
  'ipca-mensal': 'var(--chart-1)',
  'selic-meta': 'var(--chart-2)',
  desocupacao: 'var(--chart-3)',
  informalidade: 'var(--chart-3)',
  'divida-bruta-pib': 'var(--chart-4)',
  'resultado-primario-pib': 'var(--chart-4)',
  'pib-crescimento': 'var(--chart-5)',
  'salario-minimo': 'var(--chart-6)',
  'rendimento-real': 'var(--chart-6)',
  'cambio-dolar': 'var(--chart-7)',
};

export const corDaSerie = (id: string) => COR_SERIE[id] ?? 'var(--chart-1)';

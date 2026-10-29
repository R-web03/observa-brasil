// Formatação no padrão do guia de estilo (fase-0-fundacao/ESTILO.md).

const MESES = ['jan.', 'fev.', 'mar.', 'abr.', 'maio', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'];
const MENOS = '−'; // sinal de menos verdadeiro

/** 28 out. 2026 */
export function formatarData(d: Date): string {
  return `${d.getUTCDate()} ${MESES[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** set. 2026 */
export function formatarMesAno(d: Date): string {
  return `${MESES[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** 2026-10-29, para atributos datetime */
export function dataIso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** 12.400 · 4,8 · −0,3 */
export function formatarNumero(valor: number, casas = 1): string {
  const texto = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
  }).format(Math.abs(valor));
  return valor < 0 ? `${MENOS}${texto}` : texto;
}

/** 4,8% */
export function formatarPorcentagem(valor: number, casas = 1): string {
  return `${formatarNumero(valor, casas)}%`;
}

/** −0,3 p.p. */
export function formatarPontos(valor: number, casas = 1): string {
  return `${formatarNumero(valor, casas)} p.p.`;
}

/** R$ 1.518 · R$ 2,3 bilhões */
export function formatarReais(valor: number): string {
  const abs = Math.abs(valor);
  const sinal = valor < 0 ? MENOS : '';
  if (abs >= 1e12) return `${sinal}R$ ${formatarNumero(abs / 1e12)} trilhões`;
  if (abs >= 1e9) return `${sinal}R$ ${formatarNumero(abs / 1e9)} bilhões`;
  if (abs >= 1e6) return `${sinal}R$ ${formatarNumero(abs / 1e6)} milhões`;
  return `${sinal}R$ ${formatarNumero(abs, abs % 1 === 0 ? 0 : 2)}`;
}

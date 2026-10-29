// Utilidades de segurança usadas pelas rotas de API.

/** Hash do IP com sal secreto. O IP em si nunca é guardado. */
export async function hashIp(ip: string, sal: string): Promise<string> {
  const bytes = new TextEncoder().encode(`${sal}:${ip}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
}

/** IP do cliente atrás do proxy da Vercel. */
export function ipDoCliente(request: Request, fallback: string): string {
  const encaminhado = request.headers.get('x-forwarded-for');
  return encaminhado?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || fallback;
}

/** Comparação em tempo constante, para conferir segredos. */
export function segredoConfere(recebido: string | null, esperado: string | undefined): boolean {
  if (!recebido || !esperado) return false;
  const a = new TextEncoder().encode(recebido);
  const b = new TextEncoder().encode(esperado);
  if (a.length !== b.length) return false;
  let diferenca = 0;
  for (let i = 0; i < a.length; i++) diferenca |= a[i]! ^ b[i]!;
  return diferenca === 0;
}

export function json(corpo: unknown, status = 200): Response {
  return new Response(JSON.stringify(corpo), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}

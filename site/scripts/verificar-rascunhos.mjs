// Gera o site incluindo os rascunhos, só para conferir que todos renderizam.
// O build de produção ignora rascunhos, então um erro de MDX num rascunho só
// apareceria no dia da aprovação. Roda antes do build real (npm run build).
import { spawnSync } from 'node:child_process';

const r = spawnSync('npx', ['astro', 'build'], {
  stdio: ['ignore', 'pipe', 'inherit'],
  shell: true,
  env: { ...process.env, INCLUIR_RASCUNHOS: '1' },
});

if (r.status !== 0) {
  console.error('\nverificação de rascunhos: FALHOU. Algum conteúdo (mesmo rascunho) não renderiza.');
  process.exit(r.status ?? 1);
}
console.log('verificação de rascunhos: ok, todo o conteúdo renderiza');

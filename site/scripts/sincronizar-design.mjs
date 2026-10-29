// Copia o design system (fonte única: ../observa-brasil-design-system) para o site.
// Roda sozinho antes de `dev` e `build`. Não edite src/styles/ds-*.css à mão.
import { copyFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const origem = join(raiz, '..', 'observa-brasil-design-system');
const destino = join(raiz, 'src', 'styles');

mkdirSync(destino, { recursive: true });
for (const [de, para] of [
  ['tokens.css', 'ds-tokens.css'],
  ['components.css', 'ds-components.css'],
]) {
  copyFileSync(join(origem, de), join(destino, para));
}
console.log('design system sincronizado');

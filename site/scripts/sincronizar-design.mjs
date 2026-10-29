// Copia o design system (fonte única: ../observa-brasil-design-system) para o site.
// Roda sozinho antes de `dev` e `build`. Não edite src/styles/ds-*.css à mão.
// As cópias ficam versionadas para o build funcionar quando só site/ for enviado.
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const origem = join(raiz, '..', 'observa-brasil-design-system');
const destino = join(raiz, 'src', 'styles');

// No deploy só a pasta site/ pode estar disponível: usa as cópias já versionadas.
if (!existsSync(origem)) {
  console.log('design system: pasta de origem ausente, usando as cópias versionadas');
  process.exit(0);
}

mkdirSync(destino, { recursive: true });
for (const [de, para] of [
  ['tokens.css', 'ds-tokens.css'],
  ['components.css', 'ds-components.css'],
]) {
  copyFileSync(join(origem, de), join(destino, para));
}
console.log('design system sincronizado');

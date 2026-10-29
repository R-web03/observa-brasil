# Instruções para agentes de código

## Projeto

Site de educação e análise econômica, neutro em relação a partidos. Antes de escrever conteúdo, leia `../fase-0-fundacao/METODO.md` e `ESTILO.md`. Nunca invente números, fontes, citações ou links.

## Regras do código

- Conteúdo editorial vive em `src/content/*.mdx`; esquemas em `src/content.config.ts`. Não afrouxe a regra de revisão (`exigirRevisao`).
- Cores, tamanhos e raios só por tokens do design system (`var(--token)`). Não edite `src/styles/ds-*.css`: são cópias geradas de `../observa-brasil-design-system`.
- Nada de `style="..."` inline nem `<script>` externo: a CSP bloqueia.
- Segredos só via `astro:env/server`. Nunca importe `src/lib/supabase.ts` em código que vai ao navegador.
- Rotas de API declaram `export const prerender = false` e validam toda entrada com zod.
- Números e datas sempre pelos formatadores de `src/lib/formato.ts`.
- Depois de mudar algo, rode `npm run build` (confere tipos, conteúdo e gera o site).

## Servidor de desenvolvimento

```
astro dev --background
```

Gerencie com `astro dev stop`, `astro dev status` e `astro dev logs`.

Documentação do Astro: https://docs.astro.build

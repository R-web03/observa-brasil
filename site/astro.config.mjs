// @ts-check
import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import { glossarioAutomatico } from './src/lib/glossario-automatico.mjs';

// Endereço público do site. Troque quando o domínio estiver definido.
const SITE_URL = process.env.SITE_URL ?? 'https://observa-brasil.vercel.app';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',

  // Páginas são geradas no build (HTML estático). Rotas de API declaram
  // `export const prerender = false` e rodam como funções na Vercel.
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: false },
    maxDuration: 60, // segundos; a coleta agendada é incremental para caber aqui
  }),

  // Processador unified (em vez do padrão do Astro 7) para rodar o plugin do glossário:
  // palavras do glossário viram links com balão de explicação em todo .md/.mdx.
  markdown: {
    processor: unified({ gfm: true, rehypePlugins: [glossarioAutomatico] }),
  },

  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/api/'),
    }),
  ],

  // Variáveis de ambiente tipadas. Segredos só existem no servidor.
  env: {
    schema: {
      SUPABASE_URL: envField.string({ context: 'server', access: 'secret', optional: true }),
      SUPABASE_SERVICE_ROLE_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      CRON_SECRET: envField.string({ context: 'server', access: 'secret', optional: true }),
      IP_HASH_SALT: envField.string({ context: 'server', access: 'secret', optional: true }),
      DEPLOY_HOOK_URL: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },

  security: {
    checkOrigin: true,
    csp: {
      algorithm: 'SHA-256',
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self' https://fonts.gstatic.com",
        "connect-src 'self'",
        "form-action 'self'",
        "base-uri 'self'",
        "object-src 'none'",
      ],
      styleDirective: {
        resources: ["'self'", 'https://fonts.googleapis.com'],
      },
      scriptDirective: {
        // A busca (Pagefind) usa WebAssembly.
        resources: ["'self'", "'wasm-unsafe-eval'"],
      },
    },
  },
});

# Observa Brasil · site

Site de educação e análise econômica. Astro 7 + TypeScript, Supabase (Postgres), deploy na Vercel.

## Rodar no computador

```sh
cd site
npm install
npm run dev          # http://localhost:4321
```

Sem banco configurado o site funciona normalmente: as páginas de indicador mostram "série ainda não carregada" e o formulário de correção avisa que está indisponível. Rascunhos aparecem em desenvolvimento, com uma faixa de aviso, e somem no build de produção.

## Comandos

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor local com recarga automática |
| `npm run build` | Confere tipos, valida o conteúdo, gera o site e o índice de busca |
| `npm run check` | Só a conferência de tipos e conteúdo |
| `npm run novo -- aula o-que-a-economia-estuda` | Cria um conteúdo a partir do molde (tipos: `aula`, `verbete`, `trilha`, `analise`, `comparacao`, `indicador`) |
| `npm run ingerir -- --testar` | Lê as APIs oficiais e mostra as últimas observações, sem gravar |
| `npm run ingerir` | Coleta todas as séries e grava no Supabase (precisa do `.env`) |
| `npm run ingerir -- selic-meta` | Coleta uma série |

## Estrutura

```
site/
├── src/
│   ├── content/              conteúdo editorial em .mdx (um arquivo = uma página)
│   │   ├── aulas/  verbetes/  trilhas/  analises/  comparacoes/  indicadores/
│   ├── content.config.ts     esquemas de cada tipo; o build falha se o conteúdo não seguir
│   ├── components/
│   │   ├── editorial/        Fonte, NotaMetodo, Efeito, Aviso, Afirmacao, Termo (usáveis no .mdx sem import)
│   │   ├── Artigo.astro      moldura de toda página de conteúdo
│   │   └── GraficoLinha.astro
│   ├── layouts/Base.astro    HTML base, tema, navegação, pular para o conteúdo
│   ├── lib/
│   │   ├── conteudo.ts       filtro de publicação e rotas
│   │   ├── formato.ts        números e datas no padrão do guia de estilo
│   │   ├── dados.ts          leitura das séries no build
│   │   ├── supabase.ts       cliente do servidor (service_role)
│   │   ├── seguranca.ts      hash de IP, comparação de segredo
│   │   └── ingestao/         catálogo de séries, leitores do BCB e do IBGE, gravação
│   ├── pages/                rotas do site
│   │   └── api/              correcoes (POST), cron/ingestao (GET agendado), saude (GET)
│   └── styles/               site.css + cópias do design system (geradas, não editar)
├── supabase/migrations/      esquema do banco, com RLS
├── scripts/                  novo.mjs, ingerir.ts, sincronizar-design.mjs
└── vercel.json               cabeçalhos de segurança e agendamento
```

## Escrever conteúdo

1. `npm run novo -- verbete custo-de-oportunidade`
2. Preencha o cabeçalho e o texto em `src/content/verbetes/custo-de-oportunidade.mdx`, seguindo `../fase-0-fundacao/METODO.md` e `ESTILO.md`.
3. Dentro do texto, use os componentes editoriais sem importar:

```mdx
O <Termo id="ipca">IPCA</Termo> acumulado em 12 meses foi de 4,6%.

<Fonte fonte="IBGE, IPCA" link="https://sidra.ibge.gov.br/tabela/1737" periodo="set. 2026" unidade="%" consulta="29 out. 2026" />

<Aviso tipo="incerteza" titulo="Estimativa com incerteza">Os estudos divergem sobre…</Aviso>

<Efeito tipo="misto" para="trabalhadores informais" />  <Afirmacao tipo="hipotese" evidencia="fraca" />
```

4. A página só vai ao ar com `status: aprovado` ou `publicado`. **O build recusa** conteúdo aprovado sem revisor (dois, quando `revisao_cruzada: true`) ou com link provisório `.invalid`.

## Banco de dados (Supabase)

O conteúdo editorial fica no Git, versionado e revisado. O banco guarda só o que muda sozinho ou vem dos leitores:

| Tabela | Conteúdo | Acesso público |
| --- | --- | --- |
| `observacoes` | valores das séries oficiais | só leitura |
| `ultimas_observacoes` (view) | último valor de cada série | só leitura |
| `ingestoes` | registro de cada coleta | nenhum |
| `pedidos_correcao` | pedidos dos leitores | nenhum (entra pelo endpoint) |

Para criar:

1. Crie um projeto no [Supabase](https://supabase.com) (região São Paulo, `sa-east-1`).
2. Rode `supabase/migrations/20261029000000_inicial.sql` no SQL Editor, ou `npx supabase db push`.
3. Copie `.env.example` para `.env` e preencha `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` (Settings → API).
4. Gere `CRON_SECRET` e `IP_HASH_SALT`: `node -e "console.log(crypto.randomBytes(32).toString('hex'))"`.
5. Carga inicial: `npm run ingerir`.

## Deploy (Vercel)

1. Suba o repositório para o GitHub e importe na Vercel com **Root Directory = `site`**.
2. Em Settings → Environment Variables, cadastre as mesmas variáveis do `.env`.
3. Opcional: crie um Deploy Hook (Settings → Git) e cadastre a URL em `DEPLOY_HOOK_URL`. Assim, quando a coleta diária traz dado novo, o site é gerado de novo com os números atualizados.
4. A coleta roda todo dia às 12h UTC (`vercel.json`), de forma incremental (últimos 2 anos).

## Segurança

- **Segredos** só em variáveis de ambiente do servidor (`astro:env/server`). O `.env` está no `.gitignore`. A chave `service_role` nunca chega ao navegador.
- **Banco**: RLS ligado em todas as tabelas; o público só lê observações; o resto passa pelo servidor.
- **Formulário**: checagem de origem (CSRF), validação de todos os campos, campo isca contra robôs, limite de 5 envios por hora por IP (o IP é guardado só como hash com sal).
- **Rotina agendada**: exige `Authorization: Bearer <CRON_SECRET>`, conferido em tempo constante.
- **CSP** gerada pelo Astro com hash de cada script e estilo; cabeçalhos HSTS, `nosniff`, `frame-ancestors 'none'`, `Referrer-Policy` e `Permissions-Policy` no `vercel.json`.
- **Dependências**: `npm audit` roda na CI; versões corrigidas forçadas em `overrides` no `package.json`.

## Séries coletadas

Definidas em `src/lib/ingestao/series.ts`. Códigos conferidos nas APIs em 29 out. 2026.

| id | Fonte | Código |
| --- | --- | --- |
| `ipca-12-meses` | IBGE Sidra | tabela 1737, variável 2265 |
| `ipca-mensal` | IBGE Sidra | tabela 1737, variável 63 |
| `desocupacao` | IBGE Sidra | tabela 6381, variável 4099 |
| `selic-meta` | BCB SGS | 432 |
| `divida-bruta-pib` | BCB SGS | 13762 |

Uma ficha em `src/content/indicadores/<id>.mdx` com o mesmo id liga o texto à série.

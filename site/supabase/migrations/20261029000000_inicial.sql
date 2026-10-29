-- Esquema inicial do Observa Brasil.
--
-- O conteúdo editorial (aulas, verbetes, análises) fica em arquivos Markdown
-- no repositório, versionado e revisado. O banco guarda só o que muda sozinho
-- ou vem dos leitores:
--   * observacoes       valores das séries oficiais (BCB, IBGE), coletados por rotina
--   * ingestoes         registro de cada coleta, para auditoria
--   * pedidos_correcao  pedidos de correção enviados pelos leitores
--
-- Segurança: RLS ligado em todas as tabelas. O público só lê observações.
-- Todo o resto passa pelo servidor com a chave service_role.

-- ---------------------------------------------------------------------------
-- Observações das séries
-- ---------------------------------------------------------------------------
create table public.observacoes (
  serie_id     text        not null check (serie_id ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  data         date        not null,
  valor        numeric     not null,
  preliminar   boolean     not null default false,
  coletado_em  timestamptz not null default now(),
  primary key (serie_id, data)
);

comment on table public.observacoes is
  'Valores das séries oficiais. serie_id corresponde a site/src/lib/ingestao/series.ts.';

alter table public.observacoes enable row level security;

create policy "observacoes são públicas para leitura"
  on public.observacoes for select
  to anon, authenticated
  using (true);

-- Última observação de cada série (para cartões de indicador).
create view public.ultimas_observacoes
with (security_invoker = true) as
select distinct on (serie_id) serie_id, data, valor, preliminar, coletado_em
from public.observacoes
order by serie_id, data desc;

-- ---------------------------------------------------------------------------
-- Registro das coletas
-- ---------------------------------------------------------------------------
create table public.ingestoes (
  id            bigint generated always as identity primary key,
  serie_id      text        not null,
  iniciada_em   timestamptz not null default now(),
  terminada_em  timestamptz,
  status        text        not null default 'rodando' check (status in ('rodando', 'ok', 'erro')),
  linhas        integer     not null default 0,
  erro          text
);

create index ingestoes_serie_idx on public.ingestoes (serie_id, iniciada_em desc);

alter table public.ingestoes enable row level security;
-- Sem políticas: só a service_role acessa.

-- ---------------------------------------------------------------------------
-- Pedidos de correção dos leitores
-- ---------------------------------------------------------------------------
create table public.pedidos_correcao (
  id              uuid        primary key default gen_random_uuid(),
  pagina          text        not null check (char_length(pagina) between 1 and 300),
  trecho          text                 check (char_length(trecho) <= 2000),
  descricao       text        not null check (char_length(descricao) between 10 and 4000),
  fonte_sugerida  text                 check (char_length(fonte_sugerida) <= 1000),
  email           text                 check (email is null or email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  status          text        not null default 'novo'
                              check (status in ('novo', 'em-analise', 'aceito', 'recusado', 'duplicado')),
  resposta        text,
  respondido_em   timestamptz,
  ip_hash         text        not null,
  criado_em       timestamptz not null default now()
);

create index pedidos_correcao_limite_idx on public.pedidos_correcao (ip_hash, criado_em desc);
create index pedidos_correcao_status_idx on public.pedidos_correcao (status, criado_em desc);

alter table public.pedidos_correcao enable row level security;
-- Sem políticas: leitores enviam pelo endpoint /api/correcoes, que valida,
-- limita a frequência e grava com a service_role. Ninguém lê pela API pública.

-- Garante que anon e authenticated não tenham nenhum privilégio direto
-- nas tabelas internas, mesmo que alguém crie uma política por engano.
revoke all on public.ingestoes        from anon, authenticated;
revoke all on public.pedidos_correcao from anon, authenticated;

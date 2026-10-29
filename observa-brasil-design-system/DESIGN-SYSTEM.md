# Observa Brasil — Design System

## Como usar

```html
<html lang="pt-BR">            <!-- tema Grafite (padrão) -->
<html lang="pt-BR" data-theme="light">  <!-- tema Claro -->

<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components.css">
```

- `tokens.css`: todas as variáveis (`var(--bg)`, `var(--space-5)`, `var(--radius-lg)`…) nos dois temas e as classes de texto `.t-display`, `.t-body`, `.t-figure-xl`…
- `components.css`: os componentes, com prefixo `ob-` (carrega as fontes do Google Fonts).
- `tokens.json`: os mesmos valores em dados, para Tailwind, Figma ou outra ferramenta.
- `componentes.html`: todos os componentes numa página, com botão para trocar de tema. Copie o HTML de lá.
- Nunca escreva cor, tamanho ou raio direto no código: sempre `var(--token)`.

## Para usar com Claude Code, Cursor, Lovable ou similar

Coloque esta pasta no projeto e diga: "Siga o design system em `observa-brasil-design-system/DESIGN-SYSTEM.md`. Use apenas os tokens de `tokens.css` e as classes de `components.css`."

---

## Direção visual: Grafite em Camadas

Um painel de vidro escuro onde o país é explicado com calma. A página é carvão (`bg`), as seções são painéis um tom acima (`surface`) e os cartões, mais um tom acima (`surface-soft`) — a profundidade vem dessas camadas, não de efeitos. Tudo que se clica é uma pílula ou um círculo. Texto em marfim (`ink`), uma pílula clara (`inverse`) para a ação principal e um único fio de cor, o azul elétrico (`accent`), para favoritos, a aba ativa e a série em foco.

**Grafite** é o tema principal. **Claro** (papel quente, cartões brancos, navegação grafite) usa os mesmos tokens e componentes — para leitura longa de dia, impressão e quem prefere fundo claro.

Princípios:

1. **O conteúdo manda.** Camadas, pílulas e cor servem à leitura; nada decorativo disputa atenção com um número ou uma frase.
2. **Neutro de verdade.** Nenhuma cor representa partido, governo ou lado. Vermelho e verde só aparecem como mensagens de sistema.
3. **Todo número tem endereço.** Fonte, período, unidade e método acompanham cada dado.
4. **Dizer o que se sabe e o que não se sabe.** Incerteza é um componente, não uma nota de rodapé escondida.
5. **Significado nunca só pela cor.** Cor + símbolo + palavra.

## Conteúdo e voz

- Português do Brasil, segunda pessoa quando fala com o leitor ("o que muda no seu bolso"), terceira pessoa para fatos.
- Caixa de frase em títulos, botões e rótulos. Maiúsculas apenas no sobretítulo (`eyebrow`) e nas etiquetas de seção ("NOSSA EQUIPE").
- Termo técnico na primeira menção vem explicado entre vírgulas ou num `Tooltip`: "o IPCA, índice oficial de inflação,".
- Títulos afirmam algo concreto sobre a vida das pessoas; títulos de gráfico dizem a conclusão.
- Números no padrão brasileiro: `4,8%`, `R$ 1.518`, `−0,3 p.p.` (sinal de menos verdadeiro), datas "28 out. 2026".
- Sem emoji. Sem adjetivos de juízo ("desastroso", "histórico") fora de citações atribuídas.
- Os números das amostras deste sistema são ilustrativos.

## Cor

Contraste (WCAG 2.1) listado como `bg` / `surface` / `surface-soft`.

| Papel | Token | Grafite | Claro | Função | Contraste (Grafite · Claro) |
|---|---|---|---|---|---|
| Fundo | `bg` | #2A2A28 | #F3F1ED | página | — |
| Painel | `surface` | #363633 | #FFFFFF | painéis, cartões soltos, gráficos | — |
| Cartão | `surface-soft` | #42423F | #E9E7E2 | cartões no painel, pílulas, trilhos | — |
| Vidro | `surface-glass` | 72% #3E3E3B | 72% branco | navegação fixa com blur | — |
| Texto | `ink` | #F3F1ED | #292A28 | texto e números | 12,8/10,8/8,9 · 12,8/14,4/11,7 |
| Texto secundário | `ink-muted` | #B3B2AC | #63645F | linha fina, legendas, eixos | 6,8/5,7/4,7 · 5,3/6,0/4,8 |
| Borda | `border` | #4A4A46 | #D8D6D0 | divisórias, contorno de pílulas | decorativa |
| Borda de controle | `border-strong` | #929189 | #7A7974 | campos, eixos, hover | 4,5/3,8/3,2 · 3,9/4,4/3,5 |
| Pílula de contraste | `inverse` / `inverse-ink` | #EDEBE6 / #292A28 | #292A28 / #F3F1ED | botão primário, tooltip, destaque | 12,1 · 12,8 |
| Navegação | `chrome` / `chrome-raised` | #363633 / #42423F | #292A28 / #353632 | barra principal | `chrome-muted` ≥4,7 |
| Destaque | `accent` | #5B8CFF | #2F5FD8 | favorito, aba ativa, série em foco | marcas: 4,6/3,8/3,2 · 5,0/5,6/4,5 |
| Destaque legível | `accent-ink` / `on-accent` | #8FB0FF / #10172E | #2A55C4 / #FFFFFF | texto azul, botão de destaque | 6,7/5,7/4,7 · 5,8/6,6/5,3 |
| Acento quente | `warm` / `warm-ink` | #D08B6A / #E3A98C | #A86A4D / #8F563B | citação, incerteza | texto 7,1/6,0/5,0 · 5,2/5,9 |
| Sucesso | `success` | #7BC0A0 | #2F6B4F | só feedback de sistema | 6,8 · 5,6 |
| Atenção | `warning` | #E0B060 | #8A5A00 | dado provisório, falha parcial | 7,2 · 5,3 |
| Erro | `error` | #F08A80 | #A93A32 | erro de sistema/formulário | 5,9 · 5,6 |
| Informação | `info` | #8DB8D8 | #2E5E7E | atualização, mudança de método | 6,8 · 6,2 |

Origem dos valores: a paleta proposta virou o tema Claro, com `ink-muted` ajustado de #696A66 para #63645F (o original dava 4,4:1 em `surface-soft`), `accent` e `warm` mantidos como cores de marca com pares legíveis `accent-ink`/`warm-ink`, e `border-strong` criada para controles. O tema Grafite segue a referência de painel escuro: camadas que clareiam a cada nível, texto marfim. O acento é o azul elétrico do ícone de referência: #5B8CFF no escuro, #2F5FD8 no claro (que substituíram o rosa queimado da paleta inicial).

Regras:

- Proporção aproximada por tela: 85% camadas neutras, 10% pílulas `inverse`, até 5% `accent`.
- `accent` aparece no máximo em três lugares por tela.
- Texto colorido só em `accent-ink`, `warm-ink` ou nas cores de estado sobre seus `*-soft`; símbolos dentro de círculos de estado em `on-status`.
- Cores de estado (`success`, `warning`, `error`, `info`) só para mensagens do sistema e avisos reais — nunca para dado político ou econômico.

## Cores de dados

- **Categóricas** `chart-1` petróleo, `chart-2` ocre, `chart-3` ameixa, `chart-4` sálvia, `chart-5` argila. No Grafite são as versões clareadas (≥4:1 em `bg` e `surface`); no Claro, as escuras (≥3:1). Terrosas e dessaturadas para não lembrar bandeira, partido ou semáforo. Use na ordem; a partir de três séries, rotule diretamente.
- **Foco + contexto**: uma série em `accent` (azul da marca) ou `chart-1`, o resto em `chart-context`. Não use `accent` e `chart-1` como duas séries diferentes no mesmo gráfico: são azuis próximos.
- **Sequencial** `seq-1`→`seq-5` para intensidade; no Grafite a escala vai do escuro (menor) ao claro (maior). Os passos próximos do fundo ficam abaixo de 3:1: separe as células com 1px de `surface`.
- **Divergente** `div-low-2`→`div-high-2` (terracota ↔ azul, centro `div-mid`) para acima/abaixo de uma referência nomeada. "Abaixo" não significa "ruim".
- **Efeitos para as pessoas**: `effect-benefit` (azul-petróleo esverdeado ▲ Benefício — distinto do azul da marca, para que a cor da marca nunca signifique "bom"), `effect-harm` (terracota ▼ Prejuízo), `effect-mixed` (ameixa ◐ Efeito misto), `effect-uncertain` (cinza tracejado ? Incerto). Sempre os três sinais juntos e sempre "para quem".
- Nunca associe uma cor fixa a um partido, candidato ou governo; quando for inevitável comparar partidos, use `chart-1…5` em ordem alfabética e rótulos diretos.
- Todo gráfico carrega `SourceLine` (fonte, período, unidade, atualização) e, quando houver escolhas de cálculo, `MethodNote`.

## Tipografia

Três famílias do Google Fonts, carregadas em `components/bundle.css`:

- `sans` **Plus Jakarta Sans** — a voz da interface: texto corrido, títulos de cartão e gráfico, rótulos, botões, números (sempre `tabular-nums`). Geométrica e arredondada como a referência, mas com boa leitura em parágrafos.
- `serif` **Newsreader** — só o editorial: título de análise (`display`, `title-1`), linha fina (`deck`) e citação. É o que separa uma análise de uma vitrine.
- `mono` **IBM Plex Mono** — apenas metadados técnicos (`meta`).

| Estilo | Família | Tamanho/linha | Peso | Uso |
|---|---|---|---|---|
| `display` | serif | 52/56 (36/40 no celular) | 500 | título de capa |
| `title-1` | serif | 40/46 (30/36) | 500 | título de análise |
| `title-2` | sans | 28/35 | 600 | seção, cabeçalho de painel |
| `title-3` | sans | 22/29 | 600 | cartão, gráfico |
| `deck` | serif | 21/31 | 400 | linha fina |
| `quote` | serif itálico | 24/34 | 400 | citação |
| `body-lg` | sans | 19/31 | 400 | texto de análise (desktop) |
| `body` | sans | 17/27 | 400 | texto (celular), cartões |
| `body-sm` | sans | 15/23 | 400 | notas, tooltip |
| `caption` | sans | 13/19 | 400 | fonte, legenda (mínimo) |
| `eyebrow` | sans | 12/16, +0,08em, maiúsculas | 700 | editoria |
| `label` | sans | 14/20 | 600 | rótulos, abas, cabeçalhos |
| `button` | sans | 15/20 | 600 | botões |
| `figure-xl` | sans | 44/48 | 600 | número de indicador |
| `figure` | sans | 24/30 | 600 | números secundários |
| `data` | sans | 15/22 | 400 | células numéricas |
| `meta` | mono | 12/18 | 400 | metadados |

- Largura de leitura `measure` = 68ch (60–75 caracteres por linha). Nunca texto corrido na largura total.
- Altura de linha: 1,6 para texto, 1,1–1,25 para títulos. Texto claro sobre escuro: nunca abaixo de peso 400.
- Títulos com `text-wrap: balance`; parágrafos com `text-wrap: pretty`.
- Nada abaixo de 13px.

## Espaço, grade e layout

- Escala de 4px: `space-1` 4 · `space-2` 8 · `space-3` 12 · `space-4` 16 · `space-5` 24 · `space-6` 32 · `space-7` 48 · `space-8` 64 · `space-9` 96.
- Painel: padding `space-3` e cartões separados por `space-3` — o mesmo vão em toda a borda, como na referência. Cartão: padding `space-5`.
- Entre blocos de leitura `space-5`…`space-7`; entre seções `space-8`…`space-9`.
- Grade: 4 colunas abaixo de `bp-sm` (640px), 8 até `bp-md` (960px), 12 acima; calha 12px dentro de painéis, 24px na página.
- Margem lateral `gutter-mobile` 16px → `gutter-desktop` 32px.
- Larguras: texto `content-text` 720px; gráficos e tabelas até `content-wide` 1040px; página e navegação até `content-max` 1240px.
- Grade de cartões tipo mosaico (como a referência): no desktop, 3 colunas com um cartão alto de 2 linhas; no tablet, 2 colunas; no celular, coluna única na ordem de leitura. Ordem do DOM = ordem visual.
- Alvo de toque mínimo `tap-target` 44px.

## Forma e profundidade

- Raios: `radius-pill` para tudo que se clica (botões, chips, abas, busca, etiquetas de seção) e círculos para `IconButton` · `radius-lg` 24 cartões · `radius-xl` 32 painéis · `radius-md` 18 notas e avisos · `radius-sm` 12 miniaturas e campos de formulário longo · `radius-xs` 8 etiquetas e tooltip.
- Raio interno = raio externo − vão (painel 32 com vão 12 → cartão 24).
- Profundidade pela camada: `bg` → `surface` → `surface-soft`, cada uma mais clara no Grafite. Sombras: `elevation-1` (no Grafite, um filete de luz interno no topo), `elevation-2` para painéis e hover, `elevation-3` só para camadas flutuantes.
- Vidro (`surface-glass` + blur 16px) só na navegação fixa e em painéis que flutuam sobre conteúdo rolando; nunca atrás de texto longo. Sem gradientes, sem brilho, sem sombras coloridas.
- Divisórias: 1px `border` entre itens; 2px `ink` para abrir seção ou cabeçalho de tabela.

## Estados de interação

- Hover: um passo de camada ou de borda (`border` → `border-strong`, `inverse` → `inverse-raised`), sem mudar tamanho; cartão clicável sobe 1px e ganha `elevation-2`.
- Foco: anel 2px `focus` com afastamento 2px (marfim no Grafite, grafite no Claro); na navegação, `chrome-ink`. Em `:focus-visible`, nunca removido.
- Selecionado: cor + sinal — ✓ no chip, pílula `inverse` na aba, ponto + `aria-current` na navegação, coração preenchido no salvar.
- Desabilitado: `surface-sunken` + `ink-disabled`, com atributo `disabled`.
- Carregando: `aria-busy`, spinner no botão, esqueleto `surface-sunken` no formato final do conteúdo.
- Movimento: 150ms em cor e sombra; nada se move com `prefers-reduced-motion`.

## Iconografia

- Ícones de traço simples, 1,75px, cantos arredondados, 18px, dentro de `IconButton` circulares. Cor `currentColor`. Ainda não há conjunto próprio; recomenda-se Lucide até que um seja definido.
- Seta ↗ = abrir; coração = salvar; lupa = buscar.
- Símbolos de significado são tipográficos e fixos: ▲ benefício, ▼ prejuízo, ◐ misto, ? incerto, ✓ sucesso, ! atenção, × erro, i informação.
- Ícone sozinho sempre com `aria-label` descrevendo a ação.
- Não há logotipo definido; o nome "Observa.Brasil" é composto em `serif` 600 numa pílula da navegação, com o ponto em `chrome-accent`.
- Fotos e ilustrações: tons neutros, sem saturação forte; dentro de cartões com `radius-lg`. Nada de fotos de políticos como decoração.

## Acessibilidade

- Texto ≥4,5:1 e marcas, bordas de controle, ícones e anel de foco ≥3:1 nos dois temas — os pares estão nas notas de cada token.
- Significado nunca só por cor: efeitos, estados e séries têm símbolo, palavra ou rótulo direto.
- Respeite `prefers-color-scheme` na primeira visita e ofereça a troca Grafite/Claro na navegação; lembre a escolha.
- Teclado: tudo alcançável por Tab na ordem visual; abas com setas; Esc fecha tooltip e menus; link "Pular para o conteúdo" no topo.
- Gráficos: `role="img"` + título e descrição; tabela de dados equivalente disponível ("Ver dados").
- Texto redimensionável até 200% sem perda; nada de texto em imagem.
- `lang="pt-BR"`, hierarquia de títulos sem saltos, `<figure>`/`<figcaption>` para gráficos, `scope` em tabelas.

## Consistência

- Um botão primário por bloco; um botão de destaque (`accent-ink`) por página.
- Um cartão `inverse` de destaque por seção.
- Todo número exibido: unidade + fonte + período.
- Mesmo indicador, mesma cor em todo o site; mesma cor nunca para indicadores diferentes na mesma tela.
- Novos componentes partem destes tokens e funcionam nos dois temas; valor fora da escala precisa de motivo escrito.


---

# Componentes

## AnalysisHeader

Abertura de toda análise: editoria, título, linha fina e assinatura.

- **Editoria** (`eyebrow`): tema em `accent-ink` + tipo de conteúdo em `ink-muted`, separados por ·.
- **Título** (`title-1`, `serif` 500, 40/46; 30/36 no celular): pergunta ou afirmação concreta sobre a vida das pessoas, até ~14 palavras, sem jargão. `text-wrap: balance`, máximo 22ch.
- **Linha fina** (`deck`, `ink-muted`): uma ou duas frases que dizem o que a pessoa vai entender.
- **Assinatura** (`caption`/14px): autoria, data de publicação e de atualização, tempo de leitura, separados do título por `border`.
- Datas sempre por extenso abreviado ("28 out. 2026").

```html
<header style="max-width:720px">
  <div class="ob-eyebrow">Economia<span class="ob-eyebrow-sep">·</span><span style="color:var(--ink-muted)">Explicador</span></div>
  <h1 class="ob-headline">O que muda no seu bolso com a nova regra do salário mínimo</h1>
  <p class="ob-deck">A correção passa a seguir inflação mais metade do crescimento da economia. Veja quem é afetado e quanto.</p>
  <div class="ob-byline"><span>Por <strong>Equipe Observa</strong></span><span>Publicado em 28 out. 2026</span><span>Leitura de 7 min</span></div>
</header>
```

## Button

Botão para ações; navegação para outra página é `Link`.

Todo botão é uma pílula (`radius-pill`).

- **Primário** (`ob-btn--primary`, `inverse` + `inverse-ink`): pílula clara no tema Grafite, grafite no Claro. A ação principal do bloco, no máximo uma.
- **Secundário** (`ob-btn--secondary`): pílula `surface-soft` com `border`; hover ganha `border-strong`. Ações de apoio ("Baixar os dados").
- **Destaque** (`ob-btn--accent`, `accent-ink` + `on-accent`): reservado para conversão (newsletter, apoio). Um por página.
- Ação só com ícone: use `IconButton`.
- **Discreto** (`ob-btn--ghost`): ações terciárias em barras de ferramentas.
- Tamanhos: padrão 44px de altura (`tap-target`); `ob-btn--sm` 36px só em barras densas no desktop.

O que o consumidor fornece: um `<button>` com texto em verbo + objeto, em caixa de frase ("Ver a análise completa", não "CLIQUE AQUI"). Ícone opcional à esquerda, sempre com texto.

Estados: hover muda um passo (`inverse-raised`, `border-strong`, brilho −8% no destaque); foco = anel `focus` 2px com afastamento 2px; desabilitado = `surface-sunken` + `ink-disabled` e atributo `disabled`; carregando = `aria-busy="true"`, spinner + verbo no gerúndio, largura mantida.

```html
<div class="ob-stack">
  <div class="ob-row">
    <button class="ob-btn ob-btn--primary">Ver a análise completa</button>
    <button class="ob-btn ob-btn--secondary">Baixar os dados</button>
    <button class="ob-btn ob-btn--accent">Assinar a newsletter</button>
    <button class="ob-btn ob-btn--ghost">Compartilhar</button>
  </div>
  <div class="ob-row">
    <button class="ob-btn ob-btn--secondary ob-btn--sm">Pequeno</button>
    <button class="ob-btn ob-btn--primary is-loading" aria-busy="true"><span class="ob-spinner" aria-hidden="true"></span>Carregando</button>
    <button class="ob-btn ob-btn--primary" disabled>Indisponível</button>
  </div>
</div>
```

## Card

Superfícies em camadas: a página (`bg`) recebe **painéis** (`ob-panel`), e os painéis recebem **cartões**. Cada camada é um passo mais clara no tema Grafite — a profundidade vem da troca de tom, a sombra só confirma.

| Nível | Uso | Tokens |
|---|---|---|
| Painel | agrupa uma seção inteira (grade de cartões, filtros + gráfico) | `surface`, `radius-xl`, `elevation-2`, padding `space-3` |
| Cartão no painel | conteúdo dentro do painel | `surface-soft`, `radius-lg`, sem sombra |
| Cartão solto | cartão direto sobre `bg` | `surface`, `border`, `elevation-1`, `radius-lg` |
| Hover clicável | cartão que leva a outra página | `elevation-2` + subida de 1px |
| Flutuante | tooltip, menu, diálogo | `elevation-3` |
| Destaque | um por seção | `inverse`, `radius-xl` |

- Cabeçalho de cartão (`ob-card-head`): etiqueta de seção (`Tag` `ob-tag--section`) à esquerda, `IconButton` à direita.
- Padding de cartão `space-5` (24px); `space-4` no celular. Espaço entre cartões do painel: `space-3` (12px), igual ao padding do painel.
- Raio interno = raio externo − padding: painel 32 → cartão 24 (com folga de 12px).
- Cartão clicável inteiro = um único `<a>`; o `IconButton` dentro é decorativo (`aria-hidden`) nesse caso.
- **Divisórias**: `ob-divider` (1px `border`) separa itens; `ob-divider--strong` (2px `ink`) abre seções e cabeçalho de tabela.

```html
<div class="ob-panel" style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
  <div class="ob-card"><div class="ob-card-head"><span class="ob-tag ob-tag--section">Explicador</span><button class="ob-iconbtn ob-iconbtn--inverse" aria-label="Abrir"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg></button></div><p style="margin:0;font:600 20px/26px var(--font-sans);letter-spacing:-0.01em">Por que o arroz ficou mais caro</p><p style="margin:8px 0 0;font:400 14px/21px var(--font-sans);color:var(--ink-muted)">Clima, câmbio e estoques em 5 minutos.</p></div>
  <div class="ob-card"><div class="ob-card-head"><span class="ob-tag ob-tag--section">Nível 0</span></div><p style="margin:0;font:400 15px/23px var(--font-sans);color:var(--ink-muted)">Cartão dentro do painel: <code>surface-soft</code>, sem sombra.</p></div>
  <div class="ob-card ob-card--inverse" style="border-radius:var(--radius-lg)"><div class="ob-card-head"><span class="ob-tag ob-tag--section" style="color:var(--inverse-ink);border-color:var(--inverse-muted)">Destaque</span></div><p style="margin:0;font:600 20px/26px var(--font-sans)">Um por seção</p><p style="margin:8px 0 0;font:400 14px/21px var(--font-sans);color:var(--inverse-muted)">inverse + inverse-ink</p></div>
</div>
<hr class="ob-divider"><hr class="ob-divider ob-divider--strong" style="margin:0">
```

## ChartFrame

Moldura de todo gráfico: título que afirma, subtítulo com a medida, legenda, gráfico, fonte.

- **Título** (`title-3` serif): a conclusão em uma frase ("…voltou a ficar acima da geral"), não o nome da variável.
- **Subtítulo**: o que é medido e a unidade.
- **Legenda** (`Legend`) acima do gráfico; prefira também rótulos diretos no fim das linhas.
- Marcas: linhas 2,5–3px; barras com cantos de 2px; grade `chart-grid` 1px só horizontal; linha zero `chart-axis`.
- **Cores**: `chart-1`…`chart-5` na ordem; com uma série em foco, ela fica `chart-1` (ou `accent`) e as demais `chart-context`. Referências (meta, média) tracejadas em `chart-context`.
- Escala sequencial `seq-1`…`seq-5` para intensidade; divergente `div-low-2`…`div-high-2` para acima/abaixo de uma referência — nomeie a referência.
- Nunca associe uma cor fixa a partido ou governo; a ordem segue os dados. Não use `success`/`error` em gráficos.
- **Rodapé** obrigatório: `SourceLine` (fonte, período, unidade) e, se houver, `MethodNote`.
- SVG com `role="img"` e `aria-labelledby` apontando título e subtítulo; ofereça a tabela dos dados ("Ver dados").

```html
<figure class="ob-chart" style="margin:0;max-width:720px">
  <h3 class="ob-chart-title" id="ct">Inflação de alimentos voltou a ficar acima da geral</h3>
  <p class="ob-chart-sub" id="cd">Variação acumulada em 12 meses, em %</p>
  <ul class="ob-legend"><li><span class="sw sw--line" style="background:var(--chart-1)"></span>Inflação geral (IPCA)</li><li><span class="sw sw--line" style="background:var(--chart-3)"></span>Alimentos e bebidas</li><li><span class="sw sw--dash"></span>Teto da meta</li></ul>
  <svg viewBox="0 0 640 220" role="img" aria-labelledby="ct cd">
  <g stroke="var(--chart-grid)" stroke-width="1"><line x1="40" x2="580" y1="30" y2="30"/><line x1="40" x2="580" y1="80" y2="80"/><line x1="40" x2="580" y1="130" y2="130"/></g>
  <line x1="40" x2="580" y1="180" y2="180" stroke="var(--chart-axis)" stroke-width="1"/>
  <g text-anchor="end"><text x="32" y="34">15</text><text x="32" y="84">10</text><text x="32" y="134">5</text><text x="32" y="184">0%</text></g>
  <g text-anchor="middle"><text x="40" y="202">2018</text><text x="175" y="202">2020</text><text x="310" y="202">2022</text><text x="445" y="202">2024</text><text x="580" y="202">2026</text></g>
  <line x1="40" x2="580" y1="135" y2="135" stroke="var(--chart-context)" stroke-width="2" stroke-dasharray="5 4"/>
  <polyline fill="none" stroke="var(--chart-3)" stroke-width="2.5" stroke-linejoin="round" points="40,140 107.5,116 175,39 242.5,101 310,64 377.5,170 445,103 512.5,115 580,119"/>
  <polyline fill="none" stroke="var(--chart-1)" stroke-width="3" stroke-linejoin="round" points="40,143 107.5,137 175,135 242.5,79 310,122 377.5,134 445,132 512.5,128 580,132"/>
  <circle cx="580" cy="132" r="4.5" fill="var(--chart-1)"/><circle cx="580" cy="119" r="4" fill="var(--chart-3)"/>
  <text x="590" y="117" class="lbl" style="fill:var(--chart-3)">Alimentos 6,1</text>
  <text x="590" y="144" class="lbl" style="fill:var(--chart-1)">Geral 4,8</text>
  <text x="44" y="158" style="font-size:11px">Teto da meta: 4,5</text>
</svg>
  <figcaption class="ob-chart-foot"><div class="ob-source"><span><b>Fonte:</b> IBGE, IPCA</span><span><b>Período:</b> 2018 – set. 2026</span><span><b>Unidade:</b> % em 12 meses</span></div></figcaption>
</figure>
```

## Comparison

Compara dois valores lado a lado (antes/depois, grupo A/B, Brasil/média de outros países).

- Dois lados iguais em peso tipográfico (`figure` 32px); a diferença no centro com sinal, unidade e percentual.
- Barras na mesma escala, começando do zero. O lado de referência em `chart-context`, o lado em foco em `chart-1`.
- Não use cores de efeito aqui a menos que acompanhe `EffectLabel` dizendo para quem.
- Valores corrigidos pela inflação dizem isso no rótulo ou na `SourceLine`.
- No celular, empilha: lado A, diferença, lado B.

```html
<div class="ob-compare" style="max-width:720px">
  <div class="ob-compare-side">
    <span class="k">Antes da mudança</span><span class="v">R$ 1.412</span>
    <div class="ob-bar"><span style="width:62%;background:var(--chart-context)"></span></div>
    <span class="d">salário mínimo em 2024</span>
  </div>
  <div class="ob-compare-mid"><span class="diff">+R$ 106</span><span class="dl">diferença<br>(+7,5%)</span></div>
  <div class="ob-compare-side">
    <span class="k">Depois</span><span class="v">R$ 1.518</span>
    <div class="ob-bar"><span style="width:67%;background:var(--chart-1)"></span></div>
    <span class="d">salário mínimo em 2025</span>
  </div>
</div>
```

## DataTable

Tabela de dados para consulta e alternativa acessível a gráficos.

- `surface`, `radius-lg`, rolagem horizontal própria no celular.
- `caption` em serif; cabeçalho `label` `ink-muted` com linha de 2px `ink`; linhas separadas por `border`.
- Números à direita, algarismos tabulares (`data`); texto à esquerda. Unidade no cabeçalho, não em cada célula.
- Linha de referência (Brasil, média) em `accent-soft` + peso 600.
- Hover de linha em `bg` (só ajuda a ler, não indica clique).
- `scope="col"`/`scope="row"`; fonte no `tfoot`.

```html
<div class="ob-table-wrap" style="max-width:720px">
<table class="ob-table">
  <caption>Rendimento médio mensal por região</caption>
  <thead><tr><th scope="col">Região</th><th scope="col" class="n">2024 (R$)</th><th scope="col" class="n">2026 (R$)</th><th scope="col" class="n">Variação</th></tr></thead>
  <tbody>
    <tr><td>Centro-Oeste</td><td class="n">3.630</td><td class="n">3.812</td><td class="n">+5,0%</td></tr>
    <tr><td>Sudeste</td><td class="n">3.590</td><td class="n">3.745</td><td class="n">+4,3%</td></tr>
    <tr class="is-highlight"><td>Brasil</td><td class="n">3.250</td><td class="n">3.410</td><td class="n">+4,9%</td></tr>
    <tr><td>Nordeste</td><td class="n">2.180</td><td class="n">2.322</td><td class="n">+6,5%</td></tr>
  </tbody>
  <tfoot><tr><td colspan="4"><div class="ob-source"><span><b>Fonte:</b> IBGE, PNAD Contínua</span><span><b>Unidade:</b> R$ de set./2026</span></div></td></tr></tfoot>
</table></div>
```

## EffectLabel

Indica o efeito de uma medida sobre um grupo de pessoas. Cor + símbolo + palavra, sempre os três.

| Efeito | Token | Símbolo | Palavra |
|---|---|---|---|
| Benefício | `effect-benefit` (azul-petróleo) | ▲ | Benefício |
| Prejuízo | `effect-harm` (terracota) | ▼ | Prejuízo |
| Misto | `effect-mixed` (ameixa) | ◐ | Efeito misto |
| Incerto | `effect-uncertain` (grafite médio, borda tracejada) | ? | Incerto |

- Azul-petróleo/laranja em vez de verde/vermelho: legível para daltonismo e sem associação partidária ou de semáforo. O benefício não usa o azul da marca (`accent`), para que a cor da marca nunca signifique "bom".
- O efeito é sempre **para quem**: "Prejuízo · para quem paga aluguel". Nunca rotule um governo, partido ou político.
- Em gráficos, as mesmas cores; incerto usa hachura ou contorno tracejado.

```html
<div class="ob-row" style="gap:10px">
  <span class="ob-effect ob-effect--benefit"><i aria-hidden="true">▲</i>Benefício</span>
  <span class="ob-effect ob-effect--harm"><i aria-hidden="true">▼</i>Prejuízo</span>
  <span class="ob-effect ob-effect--mixed"><i aria-hidden="true">◐</i>Efeito misto</span>
  <span class="ob-effect ob-effect--uncertain"><i aria-hidden="true">?</i>Incerto</span>
</div>
```

## FilterChips

Chips para filtrar listas e gráficos; cada um alterna sozinho (`aria-pressed`).

- Repouso: pílula `surface-soft` com `border` decorativa — o texto identifica o controle. Hover: `border-strong`.
- Selecionado: `accent-soft` + borda `accent-ink` **e** marca ✓ — o estado nunca depende só da cor.
- Desabilitado: sem resultados; texto `ink-disabled`, borda `border`.
- Contagem opcional em `ink-muted`, algarismos tabulares.
- Agrupe com `role="group"` e `aria-label`. Para escolha única entre visões, use `Tabs`.

```html
<div role="group" aria-label="Filtrar por tema" class="ob-row" style="gap:8px">
  <button class="ob-chip" aria-pressed="true">Economia <span class="ob-count">48</span></button>
  <button class="ob-chip" aria-pressed="false">Política <span class="ob-count">31</span></button>
  <button class="ob-chip is-hover" aria-pressed="false">Trabalho <span class="ob-count">17</span></button>
  <button class="ob-chip" aria-pressed="true">Saúde <span class="ob-count">12</span></button>
  <button class="ob-chip" disabled>Educação <span class="ob-count">0</span></button>
</div>
```

## IconButton

Botão circular de 44px (`tap-target`) com um ícone de traço: abrir (↗), salvar, buscar, avançar.

- Padrão: `surface-soft` com `border`. Hover: `border-strong`.
- `ob-iconbtn--inverse`: círculo `inverse` para a ação principal de um cartão (a seta no canto superior direito).
- Alternância (salvar): `aria-pressed="true"` pinta o ícone de `accent` e preenche o coração — forma muda junto com a cor.
- `aria-label` obrigatório, descrevendo a ação ("Abrir análise"), nunca o ícone ("Seta").
- Um por cartão no canto superior direito; nunca dois ícones sem texto lado a lado para ações diferentes sem rótulo visível por perto.

```html
<div class="ob-row">
  <button class="ob-iconbtn" aria-label="Abrir análise"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg></button>
  <button class="ob-iconbtn ob-iconbtn--inverse" aria-label="Abrir análise"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg></button>
  <button class="ob-iconbtn" aria-label="Salvar para depois" aria-pressed="true"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg></button>
  <button class="ob-iconbtn is-focus" aria-label="Buscar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg></button>
  <button class="ob-iconbtn" aria-label="Indisponível" disabled><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg></button>
</div>
```

## IndicatorCard

Um número, o que ele mede, como mudou e de onde vem.

- **Rótulo** (`label`): o nome que as pessoas entendem, com a medida técnica entre parênteses.
- **Valor** (`figure-xl`, algarismos tabulares); unidade menor em `ink-muted`, padrão brasileiro: vírgula decimal, ponto de milhar, "R$" antes, "%" depois.
- **Variação**: valor + unidade correta (**p.p.** para diferença entre percentuais) + base de comparação. Seta só junto com `EffectLabel` quando o efeito for claro; caso contrário, só o texto.
- **Meta** (fonte · período) sempre presente, abaixo de `border`.
- Variante grafite (`ob-kpi--inverse`, `radius-xl`): um por linha, para o número principal da página.
- Não use vermelho/verde para subida/queda: subir nem sempre é bom.

```html
<div class="ob-row" style="align-items:stretch;gap:16px">
  <div class="ob-kpi">
    <div class="ob-kpi-label">Inflação (IPCA, 12 meses)</div>
    <div class="ob-kpi-value">4,8<small>%</small></div>
    <div class="ob-kpi-delta"><b>−0,3 p.p.</b> em relação a agosto</div>
    <div class="ob-kpi-meta">IBGE · set. 2026</div>
  </div>
  <div class="ob-kpi">
    <div class="ob-kpi-label">Desemprego</div>
    <div class="ob-kpi-value">6,1<small>%</small></div>
    <div class="ob-kpi-delta"><span class="ob-effect ob-effect--benefit" style="padding:1px 8px;font-size:12px"><i>▲</i>Benefício</span> menor da série</div>
    <div class="ob-kpi-meta">IBGE, PNAD · 2º tri. 2026</div>
  </div>
  <div class="ob-kpi ob-kpi--inverse">
    <div class="ob-kpi-label">Salário mínimo</div>
    <div class="ob-kpi-value"><small style="margin:0 4px 0 0">R$</small>1.518</div>
    <div class="ob-kpi-delta"><b>+7,5%</b> sobre 2024</div>
    <div class="ob-kpi-meta">Governo federal · 2025</div>
  </div>
</div>
```

## Legend

Chave de cores de gráfico, acima do gráfico.

- Amostra quadrada 14px (`radius` 4px) para áreas/barras; traço 20×3px para linhas; tracejado para referências e incertezas.
- Texto `body-sm` em `ink`, nunca na cor da série.
- Ordem da legenda = ordem visual das séries.
- Escalas sequenciais e divergentes mostram os extremos em palavras ("Menor → maior", "Abaixo ← média → acima").
- Até 5 séries categóricas; acima disso, destaque uma e agrupe o resto em "Outros" (`chart-context`) ou divida em pequenos múltiplos.

```html
<div class="ob-stack" style="gap:8px">
  <ul class="ob-legend"><li><span class="sw" style="background:var(--chart-1)"></span>Série 1</li><li><span class="sw" style="background:var(--chart-2)"></span>Série 2</li><li><span class="sw" style="background:var(--chart-3)"></span>Série 3</li><li><span class="sw" style="background:var(--chart-4)"></span>Série 4</li><li><span class="sw" style="background:var(--chart-5)"></span>Série 5</li><li><span class="sw" style="background:var(--chart-context)"></span>Contexto</li></ul>
  <ul class="ob-legend"><li><span class="sw" style="background:var(--seq-1)"></span><span class="sw" style="background:var(--seq-2);margin-left:-6px"></span><span class="sw" style="background:var(--seq-3);margin-left:-6px"></span><span class="sw" style="background:var(--seq-4);margin-left:-6px"></span><span class="sw" style="background:var(--seq-5);margin-left:-6px"></span>Menor → maior</li><li><span class="sw" style="background:var(--div-low-2)"></span><span class="sw" style="background:var(--div-low-1);margin-left:-6px"></span><span class="sw" style="background:var(--div-mid);margin-left:-6px"></span><span class="sw" style="background:var(--div-high-1);margin-left:-6px"></span><span class="sw" style="background:var(--div-high-2);margin-left:-6px"></span>Abaixo ← média → acima</li></ul>
</div>
```

## Link

Link para navegar; ações que mudam algo na página são `Button`.

- **Em texto** (`ob-link`): texto `ink` com sublinhado `accent` de 2px. Hover: texto e sublinhado `accent-ink`. O sublinhado nunca some: a cor sozinha não identifica link.
- **De ação** (`ob-link--action`): peso 600, sem sublinhado em repouso, seta → no fim. Para "Leia mais", "Ver metodologia".
- **Externo** (`ob-link--external`): acrescenta ↗ e deve abrir na mesma aba, salvo PDFs de fonte.

O texto do link descreve o destino ("Comitê de Política Monetária"), nunca "clique aqui".

```html
<p class="ob-prose" style="margin:0 0 16px">A taxa Selic é decidida pelo <a class="ob-link" href="#">Comitê de Política Monetária</a> e afeta <a class="ob-link is-hover" href="#">o custo do crédito</a>.</p>
<div class="ob-row" style="gap:24px">
  <a class="ob-link ob-link--action" href="#">Entenda a inflação →</a>
  <a class="ob-link ob-link--external" href="#">Banco Central</a>
</div>
```

## MethodNote

Nota metodológica: como o número foi produzido, em linguagem simples, expansível.

- `<details>`/`<summary>`; fechada por padrão no meio do texto, aberta sob gráficos complexos. Teclado: Enter/Espaço alternam.
- `surface` com `border`, `radius-md`; corpo em `body-sm`.
- Campos fixos em lista de definição: **Unidade**, **Período**, **Limitação**; acrescente **Correção**, **Amostra** quando houver.
- Escreva o que foi feito e o que fica de fora; nada de "metodologia robusta".

```html
<details class="ob-method" open>
  <summary><span class="ob-method-icon">M</span>Como calculamos</summary>
  <div class="ob-method-body">
    Valores reais, corrigidos pelo IPCA até setembro de 2026. A estimativa de custo considera os benefícios ativos em agosto de 2026.
    <dl><dt>Unidade</dt><dd>R$ de set./2026</dd><dt>Período</dt><dd>jan. 2016 – set. 2026</dd><dt>Limitação</dt><dd>Não inclui efeitos sobre o emprego.</dd></dl>
  </div>
</details>
```

## NavBar

Navegação principal: um painel `chrome` (`radius-xl`, `elevation-2`) com tudo dentro em pílulas, como uma barra de ferramentas.

- **Nome**: pílula `chrome-raised` com "Observa.Brasil" em `serif` 600; o ponto em `chrome-accent`. Não há logotipo definido.
- **Itens**: pílulas de 44px; inativos em `chrome-muted`; hover e página atual em `chrome-raised` + `chrome-ink`. A atual tem também um ponto `chrome-accent` e `aria-current="page"` — não depende só da cor.
- **Busca**: pílula larga com botão circular `inverse` à direita.
- No tema Grafite, `chrome` é uma camada de painel; no Claro, grafite escuro. Foco em `chrome-ink`.
- Fixa no topo: use `ob-nav--glass` (`surface-glass` + blur 16px).
- Abaixo de `bp-sm` (640px), itens vão para um menu e a busca vira `IconButton`.

```html
<nav class="ob-nav" aria-label="Principal">
  <a class="ob-nav-brand" href="#">Observa<span>.</span>Brasil</a>
  <ul>
    <li><a href="#" aria-current="page">Economia</a></li>
    <li><a href="#">Política</a></li>
    <li><a href="#" class="is-hover">Explicadores</a></li>
    <li><a href="#">Dados</a></li>
  </ul>
  <button class="ob-nav-search">Buscar um tema<span class="ob-iconbtn ob-iconbtn--inverse" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg></span></button>
</nav>
```

## Quote

Citação destacada de uma pessoa entrevistada ou de documento oficial.

- `quote` (`serif` itálico 24/34), aspa grande em `warm` como única marca de cor.
- Atribuição obrigatória: nome em `ink` 600 + quem é, em `ink-muted`. Documento: título e data.
- Uma por seção, no máximo. Não use para frases do próprio texto (isso é repetição, não citação).
- Citações de autoridades seguem a mesma forma, sem foto e sem cor de partido.

```html
<blockquote class="ob-quote">
  <p>O preço do feijão pesa mais no orçamento do que qualquer índice consegue mostrar.</p>
  <footer><strong>Maria Aparecida</strong>, auxiliar de cozinha em Salvador (BA)</footer>
</blockquote>
```

## SearchField

Campo de busca em pílula (`radius-pill`), 48px de altura, ícone de lupa à esquerda.

- Fundo `surface`, borda `border-strong` (4,4:1); hover: borda `ink`; foco: anel `focus`.
- Placeholder em `ink-muted` com um exemplo real; ele não substitui o rótulo (`ob-field-label`), que pode ficar visualmente oculto (`ob-sr`) só na barra de navegação.
- Ajuda abaixo em `caption` `ink-muted`.
- Consumidor fornece: `id`/`for` ligando rótulo e campo, `type="search"`, ação de envio por Enter.

```html
<label class="ob-field-label" for="q">Buscar um tema</label>
<div class="ob-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="q" type="search" placeholder="Ex.: inflação, reforma tributária, Bolsa Família"></div>
<p class="ob-field-help">Busque por tema, indicador ou nome de lei.</p>
```

## SourceLine

Linha de fonte que acompanha **todo** gráfico, tabela, cartão de indicador e número em destaque.

- `caption` (13/19) em `ink-muted`; rótulos em `ink` 600.
- Campos, nesta ordem: **Fonte** (instituição + pesquisa, com link), **Período**, **Unidade**, **Atualizado**. Nenhum é opcional; se não se aplica, escreva "não se aplica".
- Fica no rodapé do componente, abaixo de uma `border`.

```html
<div class="ob-source">
  <span><b>Fonte:</b> <a href="#">IBGE, PNAD Contínua</a></span>
  <span><b>Período:</b> 1º tri. 2016 – 2º tri. 2026</span>
  <span><b>Unidade:</b> % da força de trabalho</span>
  <span><b>Atualizado:</b> 15 out. 2026</span>
</div>
```

## States

Matriz de estados aplicada a todo controle interativo.

| Estado | Regra |
|---|---|
| Padrão | cores de repouso do componente |
| Hover | um passo de camada (`surface` → `surface-soft`, `inverse` → `inverse-raised`); cursor de mão; sem mudar tamanho |
| Foco | anel sólido 2px `focus` com afastamento 2px (`focus-inverse` sobre grafite); só em `:focus-visible`; nunca removido |
| Selecionado | cor **e** sinal não cromático: ✓ no chip, sublinhado na aba, `aria-current` na navegação |
| Desabilitado | `surface-sunken` + `ink-disabled`, atributo `disabled`, cursor proibido; explique o motivo por perto quando não for óbvio |
| Carregando | `aria-busy="true"`; botão mantém largura com spinner; conteúdo usa esqueleto `surface-sunken` no formato final |

Transições de 150ms em cor e sombra; com `prefers-reduced-motion`, spinner e esqueleto ficam estáticos.

```html
<div style="display:grid;grid-template-columns:120px repeat(3,auto);gap:12px 20px;align-items:center;font:600 13px/18px var(--font-sans);color:var(--ink-muted)">
  <span>Padrão</span><button class="ob-btn ob-btn--primary">Ver dados</button><button class="ob-btn ob-btn--secondary">Ver dados</button><button class="ob-chip">Economia</button>
  <span>Hover</span><button class="ob-btn ob-btn--primary is-hover">Ver dados</button><button class="ob-btn ob-btn--secondary is-hover">Ver dados</button><button class="ob-chip is-hover">Economia</button>
  <span>Foco</span><button class="ob-btn ob-btn--primary is-focus">Ver dados</button><button class="ob-btn ob-btn--secondary is-focus">Ver dados</button><button class="ob-chip is-focus">Economia</button>
  <span>Selecionado</span><span></span><span></span><button class="ob-chip is-selected">Economia</button>
  <span>Desabilitado</span><button class="ob-btn ob-btn--primary" disabled>Ver dados</button><button class="ob-btn ob-btn--secondary" disabled>Ver dados</button><button class="ob-chip" disabled>Economia</button>
  <span>Carregando</span><button class="ob-btn ob-btn--primary" aria-busy="true"><span class="ob-spinner"></span>Carregando</button><div class="ob-skeleton" style="height:44px;width:140px"></div><div class="ob-skeleton" style="height:36px;width:96px;border-radius:999px"></div>
</div>
```

## Summary

Bloco "Em resumo" logo após a abertura, com 3 a 5 pontos numerados que dão o essencial para quem lê só isso.

- `surface-soft`, `radius-md`, nível 0. Numeração em círculos `inverse`.
- Cada ponto: uma frase com um fato e, quando houver, um número com unidade.
- Título fixo "Em resumo" em `eyebrow` `ink-muted`; use `<aside>` com `aria-labelledby`.

```html
<aside class="ob-summary" aria-labelledby="sum">
  <h3 id="sum">Em resumo</h3>
  <ol>
    <li>O salário mínimo de 2027 deve ficar em torno de R$ 1.630, alta de 7,4%.</li>
    <li>Aposentadorias e o BPC acompanham o piso: 28 milhões de benefícios sobem junto.</li>
    <li>O custo extra para as contas públicas é estimado entre R$ 30 e 38 bilhões.</li>
  </ol>
</aside>
```

## Tabs

Troca entre visões do mesmo conteúdo, escolha única.

- **Segmentadas** (`ob-tabs`): trilho `surface-soft` em pílula; aba ativa vira pílula `inverse` com `inverse-ink`. Para período e unidade de um gráfico (2 a 4 opções).
- **Em linha** (`ob-tabs--line`): sublinhado `accent` de 3px na ativa. Para seções de uma página de indicador.
- Inativas em `ink-muted` (4,8:1 no trilho).
- Teclado: setas ← → movem entre abas, Tab sai do grupo; `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`.

```html
<div class="ob-stack" style="gap:24px">
  <div class="ob-tabs" role="tablist" aria-label="Período">
    <button class="ob-tab" role="tab" aria-selected="false">12 meses</button>
    <button class="ob-tab" role="tab" aria-selected="true">5 anos</button>
    <button class="ob-tab is-hover" role="tab" aria-selected="false">20 anos</button>
  </div>
  <div class="ob-tabs ob-tabs--line" role="tablist" aria-label="Seções">
    <button class="ob-tab" role="tab" aria-selected="true">Resumo</button>
    <button class="ob-tab" role="tab" aria-selected="false">Dados</button>
    <button class="ob-tab" role="tab" aria-selected="false">Metodologia</button>
  </div>
</div>
```

## Tag

Etiqueta não interativa para tipo de conteúdo, data, estado do dado. Para filtrar, use `FilterChips`.

- Seção (`ob-tag--section`): pílula contornada em maiúsculas, abre o cabeçalho de cartões e painéis ("Nossa equipe", "Exclusivo").
- Padrão: `surface-soft` + `ink`. Contorno: `border-strong`. Destaque: `accent-soft` + `accent-ink`. Quente: `warm-soft` + `warm-ink` (dado provisório). Grafite: `inverse`.
- `radius-xs`, 12px peso 600. Texto curto (até 3 palavras), caixa de frase.
- Não use etiquetas coloridas para partidos, governos ou ideologias.

```html
<div class="ob-row" style="gap:8px">
  <span class="ob-tag ob-tag--section">Nossa equipe</span>
  <span class="ob-tag">Explicador</span>
  <span class="ob-tag ob-tag--outline">Atualizado em 28 out.</span>
  <span class="ob-tag ob-tag--accent">Novo</span>
  <span class="ob-tag ob-tag--warm">Dado provisório</span>
  <span class="ob-tag ob-tag--inverse">Série histórica</span>
</div>
```

## Tooltip

Explicação curta de um termo técnico ou do valor exato de um ponto de gráfico.

- Fundo `inverse`, texto `inverse-ink`, metadados `inverse-muted`; `radius-xs`; `elevation-3`. Largura máxima 280px.
- Abre em hover **e** em foco do gatilho; fecha com Esc. Gatilho com `tabindex="0"` e `aria-describedby`.
- Nunca guarde no tooltip algo essencial para entender a análise: se a pessoa precisa saber, vai no texto ou na nota metodológica.

```html
<div class="ob-row" style="align-items:flex-start;gap:16px">
  <span style="font:400 17px/27px var(--font-sans)">Inflação medida pelo IPCA</span>
  <span class="ob-tip-trigger" tabindex="0" aria-describedby="t1">?</span>
  <div class="ob-tip" role="tooltip" id="t1"><strong>IPCA</strong>Índice oficial de inflação do país. Mede quanto subiram os preços de uma cesta de produtos e serviços.<div class="ob-tip-meta">Fonte: IBGE</div></div>
</div>
```

## UncertaintyNotice

Avisos inline. O **aviso de incerteza** é editorial; info, atenção, erro e sucesso são de sistema.

- Incerteza: `warm-soft` + ícone ? em `warm-ink` + título "Estimativa com incerteza" / "O que ainda não se sabe". Diga o intervalo e por que há dúvida.
- Info (`info`), Atenção (`warning`), Erro (`error`), Sucesso (`success`): fundo `*-soft`, ícone i ! × ✓ em círculo e título com a palavra do estado. Texto do corpo em `ink`.
- Cor de alerta só para alerta real: nunca para destacar opinião ou "notícia ruim".
- `role="note"` para avisos editoriais; `role="status"`/`role="alert"` para mudanças de sistema.

```html
<div class="ob-stack" style="gap:12px">
  <div class="ob-notice ob-notice--uncertain" role="note"><span class="ob-notice-icon" aria-hidden="true">?</span><div><strong>Estimativa com incerteza</strong>Os efeitos sobre o emprego ainda são debatidos. Os estudos citados apontam de zero a uma pequena redução.</div></div>
  <div class="ob-notice ob-notice--info" role="note"><span class="ob-notice-icon" aria-hidden="true">i</span><div><strong>Dados atualizados</strong>A série foi revisada pelo IBGE em 15 out. 2026.</div></div>
  <div class="ob-notice ob-notice--warning" role="status"><span class="ob-notice-icon" aria-hidden="true">!</span><div><strong>Dado provisório</strong>O número de setembro será revisto no próximo mês.</div></div>
</div>
```

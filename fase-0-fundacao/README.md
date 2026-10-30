# Fase 0 · Fundação

A fase 0 define as regras de todo o conteúdo do site. Aula, verbete, trilha, análise e comparação: tudo é escrito a partir destes arquivos.

| Arquivo | O que define |
| --- | --- |
| [METODO.md](METODO.md) | Escalas de evidência, tipos de afirmação, regras de neutralidade e de correção |
| [ESTILO.md](ESTILO.md) | Voz, números, datas, termos técnicos e palavras proibidas |
| [FONTES.md](FONTES.md) | Fontes oficiais por tema e como citá-las |
| [REVISAO.md](REVISAO.md) | Checklist de revisão e o papel dos revisores externos |
| [selecao-de-temas.csv](selecao-de-temas.csv) | Planilha pública de quais temas foram escolhidos e por quê |
| [moldes/](moldes/) | Um molde por tipo de página: aula, verbete, trilha, análise, comparação, ficha de indicador |

O design system fica em [../observa-brasil-design-system/](../observa-brasil-design-system/), e a proposta completa em [../PROPOSTA-DO-PROJETO.md](../PROPOSTA-DO-PROJETO.md).

## Portão para a fase 1

A fase 1 (aulas 1 a 7 e cerca de 25 verbetes) só começa quando todos os itens estiverem marcados:

- [ ] Método, estilo e moldes lidos e ajustados por quem vai escrever
- [ ] 2 revisores externos, de visões econômicas diferentes, convidados
- [ ] Os 2 revisores leram o [METODO.md](METODO.md) e aprovaram, ou as objeções deles foram resolvidas
- [x] Aula-piloto (aula 1) escrita no molde: `site/src/content/aulas/o-que-a-economia-estuda.mdx`
- [ ] Aula-piloto revisada (ajustar o molde com o que a revisão mostrar antes das aulas 2 a 7)

> 30 out. 2026: por decisão do responsável, as aulas 2 a 7 e 31 verbetes foram escritos sem esperar a revisão da piloto e publicados com status `em-revisao` (faixa de aviso, noindex). A revisão humana vale para todo o conjunto; o que ela mudar entra no molde e nas sete aulas.
- [ ] Decisões em aberto da proposta respondidas: nome, quem assina, licença

## Decisões já tomadas

- **Publicar o curso primeiro.** A comparação entre governos fica para a fase 4.
- **Conteúdo em Markdown com cabeçalho de metadados** (o bloco `---` no topo de cada molde). Esse formato vira página do site na fase 2 sem precisar ser reescrito.
- **Base técnica montada** em [../site/](../site/README.md): Astro 7, Supabase e Vercel. `npm run novo -- <tipo> <nome>` cria conteúdo a partir destes moldes, e o build recusa conteúdo aprovado sem revisor.

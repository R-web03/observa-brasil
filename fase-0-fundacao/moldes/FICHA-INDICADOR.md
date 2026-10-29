---
# O nome do arquivo vira o endereço e liga a ficha à série coletada:
# ipca-12-meses.mdx → /indicadores/ipca-12-meses, dados da série "ipca-12-meses"
# em site/src/lib/ingestao/series.ts.
nome: Nome do indicador
o_que_mede: Uma frase simples.
unidade: "%"                   # %, % do PIB, R$ milhões, índice, pessoas
instituicao: IBGE
serie: Nome e código da série (ex.: IPCA, Sidra tabela 1737)
link: https://fonte.a-preencher.invalid
frequencia: mensal             # diaria | mensal | trimestral | anual
quebras_de_serie: []           # - { data: 2020-01-01, motivo: "..." }
verbete:                       # id do verbete que explica o conceito
andam_junto: []                # ids de indicadores do mesmo tema (para o espelhamento)
status: rascunho
atualizado_em:
---

<!--
A ficha é a fonte única de um indicador. Comparações e análises apontam para ela.
Revise sempre que sair dado novo ou houver revisão da série.
-->

## O que mede

<!-- 2 ou 3 frases simples. -->

## Como ler

<!-- O que significa subir e cair. Cuidados de leitura. -->

## Limitações

<!-- Cobertura, revisões, mudanças de método, o que o indicador não capta. -->

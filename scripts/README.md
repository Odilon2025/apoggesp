# Atualização mensal dos dados da carreira

A página `/diversidade` e o **Painel da Carreira** (componente `CarreiraDashboard`)
consomem um único arquivo: `src/data/snapshot.json`.

Esse arquivo é **gerado automaticamente** a partir da planilha mensal de pessoal
da Prefeitura (formato `verificado_ativos_DD-MM-AAAA_mes-aaaa.xlsx`).

## Passo a passo

1. Baixe a planilha do mês (mantenha o `.xlsx` original, sem editar).
2. Rode o script informando o caminho:

   ```bash
   bun run snapshot caminho/para/planilha.xlsx --mes=mar/2026
   ```

   - `--mes` é opcional; aparece no rodapé do dashboard ("snapshot mar/2026").

3. Confira no terminal o resumo (total de APPGGs, órgãos, lideranças).
4. Faça commit do `src/data/snapshot.json` atualizado. **Pronto** — todos os
   gráficos e indicadores das páginas refletem os novos números.

## O que o script faz

A partir da planilha bruta:

- Filtra apenas a carreira (`GRUPO = QPGG`).
- Deduplica por `REGISTRO`, mantendo o vínculo com cargo em comissão quando houver.
- Calcula todos os agregados usados no site:
  - Distribuição por órgão, sexo, raça, referência (APPGG1–6) e geração.
  - Coortes de ingresso (2016–2018, 2021–2022, 2024, 2026).
  - Lideranças totais e por sexo/raça.
  - Pirâmide CDA-1 a CDA-6.
  - Top 6 órgãos com recorte de diversidade para a página `/diversidade`.

## Onde olhar no código

| Arquivo | Função |
|---|---|
| `scripts/gerar-snapshot.ts` | Lê o `.xlsx` e gera o JSON. |
| `src/data/snapshot.json` | Dados consolidados (versionado no Git). |
| `src/data/snapshot.ts` | Tipos TypeScript + import do JSON. |
| `src/pages/DiversidadePage.tsx` | Consome `snapshot`. |
| `src/components/CarreiraDashboard.tsx` | Consome `snapshot`. |

## Ajustes nos agregados

Se mudar a definição de uma faixa (ex.: nova coorte de concurso, novo
agrupamento por geração), edite **apenas** `scripts/gerar-snapshot.ts` e rode
o comando novamente.

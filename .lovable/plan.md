## Atualização do snapshot mensal

Estou em modo plano (read-only) e não posso executar scripts. Após sua aprovação, executarei:

1. Copiar o arquivo enviado para um caminho real:
   `code--copy user-uploads://verificado_ativos_03-03-2026_fev-2026-2.xlsx /tmp/planilha.xlsx`

2. Rodar o gerador do snapshot:
   `bun run snapshot /tmp/planilha.xlsx --mes=fev/2026`

3. Conferir o resumo no terminal (total de APPGGs, órgãos, lideranças) e validar que `src/data/snapshot.json` foi regenerado.

4. Se algum número parecer inconsistente, investigo `scripts/gerar-snapshot.ts` e ajusto.

Nenhuma outra alteração de código é necessária — `DiversidadePage` e `CarreiraDashboard` já consomem `snapshot.json` automaticamente.
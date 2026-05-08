## Revisão do site a partir do relatório

Conferi cada apontamento do PDF contra o código atual. Boa parte das críticas já está corrigida no projeto ou parece ter origem em leitura incorreta do OCR (provavelmente confundindo a pequena linha dourada decorativa abaixo dos títulos com um "ponto isolado", e omitindo acentos que existem no código). Proponho aplicar só o que é genuíno e adicionar referência de data nos dados quantitativos — uma sugestão boa do relatório.

### O que vou aplicar

1. **`src/pages/ApogespPage.tsx`** — Objetivo 4
   - "perante órgãos públicos e sociedade" → "perante órgãos públicos **e a sociedade**".

2. **`src/pages/CarreiraPage.tsx`** — Seção "Quem são os APPGGs"
   - "identificar lacunas entre **uma** diretriz e sua execução" → "identificar lacunas entre **a** diretriz e sua execução" (concordância com "sua").

3. **Referência de data nos números do snapshot** — usar `snapshot.mesReferencia` que já existe no JSON gerado.
   - `CarreiraDashboard` (estatísticas): adicionar legenda discreta "Dados de {mesReferencia}" abaixo dos números.
   - `DiversidadePage`: mesma legenda no bloco de indicadores e nas coortes.
   - `PlanosAtuacaoPage`: mesma legenda nas métricas de cabeçalho (22 órgãos, etc.).
   - `Index.tsx` (hero): legenda discreta abaixo do bloco de stats.
   - Tipografia: `text-[10px] tracking-luxury uppercase text-text-caption/60` — coerente com o design quiet luxury, sem chamar atenção.

### O que descarto (com justificativa)

- **"Pontos isolados" em Carreira, PAI, Área do Associado e Contato** — Não existem no código. O OCR provavelmente leu como ponto a linha decorativa dourada (`h-px bg-gold/60` no `PageHero` e `luxury-divider`) que aparece logo abaixo do subtítulo. É elemento visual proposital do design system; mantenho.
- **"Gestao" sem acento em Publicações** — Código já tem "Gestão" em todas as 6 ocorrências (`PublicacoesPage`, `Index`, `CarreiraPage`, `AtuacaoPage`).
- **"Juridicos" sem acento em A APOGESP** — Código já tem "Diretoria de Assuntos **Jurídicos**".
- **"não uma página em branco" sem verbo** — Código já tem "encontre, ao chegar, não uma página em branco, mas um repertório vivo" — frase completa.
- **"se equidade" em Diversidade** — Código já diz "permite acompanhar **a equidade** no acesso a posições decisórias" (reformulação melhor do que a sugerida no relatório).
- **Repetição de "utilizando" no caso PMEA** — Não existe; o trecho do PMEA usa "utilizando" uma única vez.
- **Capitalização inconsistente em Sustentabilidade** — Os três intertítulos ("Mudanças Climáticas e Resiliência Urbana", "Transição Energética e Eficiência", "Áreas Verdes e Biodiversidade") seguem o mesmo padrão (Title Case com preposições/conjunções minúsculas). Já está padronizado.
- **"Negros" vs "Mulheres" em Diversidade** — Os labels de cards seguem padrão consistente ("Mulheres na carreira", "Negros e afrodescendentes", "Mulheres em Liderança", "Negros em Liderança"). Nenhum caso real de minúscula indevida em título.

### Resumo técnico

- Edições em 2 strings (`ApogespPage`, `CarreiraPage`).
- Adicionar uma pequena legenda "Dados de {snapshot.mesReferencia}" em 4–5 locais usando o snapshot já importado.
- Sem mudanças de design, dependências ou estrutura.

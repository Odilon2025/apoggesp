// Tipos e import central do snapshot mensal.
// O JSON é gerado por `bun run snapshot <planilha.xlsx>` (ver scripts/gerar-snapshot.ts).
import data from "./snapshot.json";

export type Snapshot = {
  geradoEm: string;
  mesReferencia: string;
  total: number;
  totalOrgaos: number;
  indicadores: {
    mulheres: number;
    mulheresPct: number;
    negros: number;
    negrosPct: number;
    pcd: number;
    pcdPct: number;
    lideranca: number;
    liderancaPct: number;
  };
  lideranca: {
    total: number;
    mulheres: number;
    mulheresPct: number;
    negros: number;
    negrosPct: number;
  };
  orgaos: { sigla: string; n: number }[];
  sexo: { name: string; value: number }[];
  raca: { name: string; value: number }[];
  referencias: { ref: string; n: number }[];
  ingresso: { ano: string; n: number }[];
  geracao: { faixa: string; sub: string; n: number }[];
  comissaoGenero: { grupo: string; comBase: number; comComissao: number }[];
  comissaoRaca: { grupo: string; comBase: number; comComissao: number }[];
  piramideCda: {
    ref: string;
    fem: number;
    masc: number;
    branca: number;
    parda: number;
    preta: number;
    amarela: number;
    total: number;
  }[];
  coortes: { periodo: string; label: string; total: number; negros: number; mulheres: number }[];
  secretariasDiv: { sigla: string; total: number; mulheres: number; negros: number }[];
};

export const snapshot = data as Snapshot;

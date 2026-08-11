// Dados de lotação por órgão, derivados da folha mensal (mai/2026).
import data from "./orgaos.json";

export type Orgao = {
  sigla: string;
  nome: string;
  total: number;
  mulheres: number;
  mulheresPct: number;
  negros: number;
  negrosPct: number;
  comissao: number;
  comissaoPct: number;
  pcd: number;
  ingressoMin: number | null;
  ingressoMax: number | null;
  idadeMedia: number | null;
  refs: { ref: string; n: number }[];
};

export type OrgaosDataset = {
  mesReferencia: string;
  geradoEm: string;
  total: number;
  totalOrgaos: number;
  orgaos: Orgao[];
};

export const orgaosData = data as OrgaosDataset;

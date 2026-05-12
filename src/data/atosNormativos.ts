import data from "./atosNormativos.json";

export interface AtoNormativo {
  titulo: string;
  descricao: string;
  url: string;
}

export interface AtosNormativos {
  principal: AtoNormativo;
  alteracoes: AtoNormativo[];
  anexos: AtoNormativo[];
  correlacoes: AtoNormativo[];
}

export const atosNormativos = data as AtosNormativos;

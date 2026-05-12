import data from "./cronologia.json";

export type CronologiaItem = { year: string; text: string };

export const cronologia: CronologiaItem[] = data;

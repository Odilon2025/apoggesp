import { supabase } from "@/integrations/supabase/client";

// --- Tipos públicos ---
export type PageFields = Record<string, { value: string; tipo: "text" | "markdown" }>;

export type CMSItem<T = any> = {
  id: string;
  ordem: number;
  publicado: boolean;
  dados_publicado: T | null;
  dados_rascunho: T | null;
  tem_rascunho: boolean;
};

// --- Cache simples por sessão ---
const fieldsCache = new Map<string, PageFields>();
const listCache = new Map<string, any>();

export function clearCmsCache() {
  fieldsCache.clear();
  listCache.clear();
}

// --- Page fields (key/value) ---
export async function getPageFields(pagina: string): Promise<PageFields> {
  if (fieldsCache.has(pagina)) return fieldsCache.get(pagina)!;
  const { data, error } = await supabase
    .from("page_fields")
    .select("key,value_publicado,tipo")
    .eq("pagina", pagina)
    .not("value_publicado", "is", null);
  if (error) {
    console.warn("getPageFields error", error);
    return {};
  }
  const out: PageFields = {};
  for (const row of data ?? []) {
    out[row.key] = { value: row.value_publicado ?? "", tipo: (row.tipo as "text" | "markdown") ?? "text" };
  }
  fieldsCache.set(pagina, out);
  return out;
}

export function field(fields: PageFields | undefined, key: string, fallback: string): string {
  return fields?.[key]?.value || fallback;
}

// --- Listas estruturadas (CRUD) ---
async function fetchList<T>(table: string): Promise<T[]> {
  if (listCache.has(table)) return listCache.get(table);
  const { data, error } = await supabase
    .from(table as any)
    .select("dados_publicado,ordem")
    .eq("publicado", true)
    .eq("deletado", false)
    .not("dados_publicado", "is", null)
    .order("ordem", { ascending: true });
  if (error) {
    console.warn(`fetchList(${table}) error`, error);
    return [];
  }
  const items = (data ?? []).map((r: any) => r.dados_publicado as T);
  listCache.set(table, items);
  return items;
}

export const getCronologia = () => fetchList<{ year: string; text: string }>("cronologia_itens");
export const getAtos = () => fetchList<{ categoria: string; titulo: string; descricao: string; url: string }>("atos_normativos_itens");
export const getPlanos = () => fetchList<any>("planos_itens");
export const getPublicacoes = () => fetchList<{ titulo: string; tipo: string; ano: string; url?: string }>("publicacoes_itens");
export const getAtuacaoDestaques = () => fetchList<{ area: string; desc: string }>("atuacao_destaques");
export const getCasosAtuacao = () => fetchList<{ titulo: string; area: string; contexto: string; atuacao: string; resultados: string }>("casos_atuacao");
export const getObservatorioIndicadores = () => fetchList<{ num: string; label: string }>("observatorio_indicadores");
export const getObservatorioCategorias = () => fetchList<{ icon: string; titulo: string; descricao: string; foco: string[] }>("observatorio_categorias");

// --- Snapshot (singleton) ---
export async function getSnapshot<T = any>(): Promise<T | null> {
  const cached = listCache.get("__snapshot__");
  if (cached) return cached;
  const { data, error } = await supabase
    .from("snapshot_carreira")
    .select("dados_publicado")
    .eq("id", "current")
    .maybeSingle();
  if (error || !data?.dados_publicado) return null;
  listCache.set("__snapshot__", data.dados_publicado);
  return data.dados_publicado as T;
}

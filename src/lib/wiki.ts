import { supabase } from "@/integrations/supabase/client";

export interface WikiSecao {
  id: string;
  titulo: string;
  corpo_md: string;
}

export interface WikiReferencia {
  label: string;
  url: string;
}

export interface WikiVerbete {
  slug: string;
  titulo: string;
  categoria: string;
  resumo: string;
  tags?: string[];
  secoes: WikiSecao[];
  referencias?: WikiReferencia[];
  atualizado_em?: string;
}

export interface WikiVerbeteRow {
  id: string;
  ordem: number;
  updated_at: string;
  dados: WikiVerbete;
}

export async function getWikiVerbetes(): Promise<WikiVerbeteRow[]> {
  const { data, error } = await supabase
    .from("wiki_verbetes")
    .select("id,ordem,updated_at,dados_publicado")
    .eq("publicado", true)
    .eq("deletado", false)
    .not("dados_publicado", "is", null)
    .order("ordem", { ascending: true });
  if (error) {
    console.warn("getWikiVerbetes", error);
    return [];
  }
  return (data ?? []).map((r: any) => ({
    id: r.id,
    ordem: r.ordem,
    updated_at: r.updated_at,
    dados: r.dados_publicado as WikiVerbete,
  }));
}

export async function getWikiVerbeteBySlug(slug: string): Promise<WikiVerbeteRow | null> {
  const todos = await getWikiVerbetes();
  return todos.find((v) => v.dados?.slug === slug) ?? null;
}

/** Contagem de comentários abertos por seção para um verbete. */
export async function getComentariosAbertosPorSecao(slug: string): Promise<Record<string, number>> {
  const { data, error } = await supabase
    .from("cms_notas")
    .select("campo,status")
    .eq("escopo", "wiki_secao")
    .eq("alvo", slug)
    .eq("status", "aberta");
  if (error) return {};
  const out: Record<string, number> = {};
  for (const r of (data ?? []) as Array<{ campo: string | null }>) {
    const k = r.campo ?? "_verbete";
    out[k] = (out[k] ?? 0) + 1;
  }
  return out;
}

/** Total de comentários abertos por verbete (para o índice). */
export async function getComentariosAbertosPorVerbete(): Promise<Record<string, number>> {
  const { data, error } = await supabase
    .from("cms_notas")
    .select("alvo,status")
    .eq("escopo", "wiki_secao")
    .eq("status", "aberta");
  if (error) return {};
  const out: Record<string, number> = {};
  for (const r of (data ?? []) as Array<{ alvo: string }>) {
    out[r.alvo] = (out[r.alvo] ?? 0) + 1;
  }
  return out;
}

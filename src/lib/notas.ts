import { supabase } from "@/integrations/supabase/client";

export type NotaEscopo = "page_field" | "cms_item" | "snapshot" | "noticia" | "wiki_secao";
export type NotaStatus = "aberta" | "resolvida";

export interface CmsNota {
  id: string;
  escopo: NotaEscopo;
  alvo: string;
  alvo_label: string | null;
  campo: string | null;
  autor_email: string;
  texto: string;
  status: NotaStatus;
  resolvida_por: string | null;
  resolvida_em: string | null;
  created_at: string;
  updated_at: string;
}

export async function listNotas(escopo: NotaEscopo, alvo: string, campo?: string | null) {
  let q = supabase
    .from("cms_notas")
    .select("*")
    .eq("escopo", escopo)
    .eq("alvo", alvo)
    .order("created_at", { ascending: false });
  if (campo !== undefined) q = campo === null ? q.is("campo", null) : q.eq("campo", campo);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as CmsNota[];
}

export async function countByAlvo(escopo: NotaEscopo, alvo: string) {
  const { data, error } = await supabase
    .from("cms_notas")
    .select("status,campo")
    .eq("escopo", escopo)
    .eq("alvo", alvo);
  if (error) return { abertas: 0, total: 0, porCampo: {} as Record<string, number> };
  const rows = (data ?? []) as Array<{ status: NotaStatus; campo: string | null }>;
  const porCampo: Record<string, number> = {};
  for (const r of rows) {
    if (r.status === "aberta" && r.campo) porCampo[r.campo] = (porCampo[r.campo] ?? 0) + 1;
  }
  return {
    abertas: rows.filter((r) => r.status === "aberta").length,
    total: rows.length,
    porCampo,
  };
}

export async function addNota(input: {
  escopo: NotaEscopo;
  alvo: string;
  alvo_label?: string | null;
  campo?: string | null;
  autor_email: string;
  texto: string;
}) {
  const { error } = await supabase.from("cms_notas").insert({
    escopo: input.escopo,
    alvo: input.alvo,
    alvo_label: input.alvo_label ?? null,
    campo: input.campo ?? null,
    autor_email: input.autor_email,
    texto: input.texto,
  });
  if (error) throw error;
}

export async function resolveNota(id: string, resolvida_por: string) {
  const { error } = await supabase
    .from("cms_notas")
    .update({ status: "resolvida", resolvida_por, resolvida_em: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}

export async function reopenNota(id: string) {
  const { error } = await supabase
    .from("cms_notas")
    .update({ status: "aberta", resolvida_por: null, resolvida_em: null })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteNota(id: string) {
  const { error } = await supabase.from("cms_notas").delete().eq("id", id);
  if (error) throw error;
}

export async function listAbertas() {
  const { data, error } = await supabase
    .from("cms_notas")
    .select("*")
    .eq("status", "aberta")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as CmsNota[];
}

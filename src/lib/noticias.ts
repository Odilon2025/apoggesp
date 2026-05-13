import { supabase } from "@/integrations/supabase/client";

export interface Noticia {
  id: string;
  slug: string;
  titulo: string;
  resumo: string;
  conteudo: string;
  autor: string;
  capa_url: string | null;
  publicado_em: string;
  publicado: boolean;
  created_at: string;
  updated_at: string;
}

export async function listPublicadas(limit = 30): Promise<Noticia[]> {
  const { data, error } = await supabase
    .from("noticias")
    .select("*")
    .eq("publicado", true)
    .order("publicado_em", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data as Noticia[];
}

export async function getBySlug(slug: string): Promise<Noticia | null> {
  const { data, error } = await supabase
    .from("noticias")
    .select("*")
    .eq("slug", slug)
    .eq("publicado", true)
    .maybeSingle();
  if (error) throw error;
  return data as Noticia | null;
}

export async function listAll(): Promise<Noticia[]> {
  const { data, error } = await supabase
    .from("noticias")
    .select("*")
    .order("publicado_em", { ascending: false });
  if (error) throw error;
  return data as Noticia[];
}

export async function getById(id: string): Promise<Noticia | null> {
  const { data, error } = await supabase
    .from("noticias")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data as Noticia | null;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

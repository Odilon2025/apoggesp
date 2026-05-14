import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import { AdminGuard } from "./AdminGuard";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { clearCmsCache } from "@/lib/cms";

interface Field {
  key: string;
  pagina: string;
  ordem: number;
  tipo: "text" | "markdown";
  descricao: string | null;
  value_publicado: string | null;
  value_rascunho: string | null;
  tem_rascunho: boolean;
}

const Inner = () => {
  const { pagina = "" } = useParams();
  const decoded = decodeURIComponent(pagina);
  const { user } = useAuth();
  const [fields, setFields] = useState<Field[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [salvando, setSalvando] = useState(false);
  const [carregando, setCarregando] = useState(true);

  const carregar = async () => {
    setCarregando(true);
    const { data, error } = await supabase
      .from("page_fields")
      .select("*")
      .eq("pagina", decoded)
      .order("ordem", { ascending: true });
    if (error) toast({ title: "Erro ao carregar", description: error.message });
    setFields((data ?? []) as Field[]);
    const d: Record<string, string> = {};
    for (const f of (data ?? []) as Field[]) {
      d[f.key] = f.value_rascunho ?? f.value_publicado ?? "";
    }
    setDrafts(d);
    setCarregando(false);
  };

  useEffect(() => {
    carregar();
  }, [decoded]);

  const salvarRascunho = async () => {
    setSalvando(true);
    const updates = fields
      .filter((f) => drafts[f.key] !== (f.value_publicado ?? ""))
      .map((f) =>
        supabase
          .from("page_fields")
          .update({
            value_rascunho: drafts[f.key],
            tem_rascunho: true,
            updated_by: user?.email ?? null,
          })
          .eq("key", f.key)
      );
    // limpar rascunhos que voltaram a ser iguais ao publicado
    const limpar = fields
      .filter((f) => drafts[f.key] === (f.value_publicado ?? "") && f.tem_rascunho)
      .map((f) =>
        supabase
          .from("page_fields")
          .update({ value_rascunho: null, tem_rascunho: false })
          .eq("key", f.key)
      );
    const results = await Promise.all([...updates, ...limpar]);
    const erro = results.find((r) => r.error);
    setSalvando(false);
    if (erro?.error) {
      toast({ title: "Erro ao salvar", description: erro.error.message });
    } else {
      toast({ title: "Rascunho salvo" });
      carregar();
    }
  };

  const publicar = async () => {
    if (!confirm("Publicar todas as alterações em rascunho?")) return;
    // Salva rascunhos primeiro (caso tenha mudanças não-salvas)
    await salvarRascunho();
    const { error } = await supabase.rpc("publish_page", { _pagina: decoded });
    if (error) toast({ title: "Erro ao publicar", description: error.message });
    else {
      toast({ title: "Alterações publicadas" });
      clearCmsCache();
      carregar();
    }
  };

  const descartar = async (key: string) => {
    const { error } = await supabase.rpc("discard_field_draft", { _key: key });
    if (error) toast({ title: "Erro", description: error.message });
    else carregar();
  };

  const totalRascunhos = fields.filter((f) => f.tem_rascunho).length;

  return (
    <section className="py-16 bg-card min-h-screen">
      <div className="container max-w-3xl">
        <Link to="/admin/conteudo" className="text-xs text-text-caption hover:text-foreground">← Páginas</Link>
        <h1 className="text-3xl font-display text-foreground mt-3 mb-2">{decoded}</h1>
        <p className="text-xs font-light text-text-caption mb-8">
          Edite os campos abaixo. Salve como rascunho e publique quando estiver pronto.
        </p>

        {totalRascunhos > 0 && (
          <div className="border-l-2 border-destructive bg-section-alt p-4 mb-8 text-sm font-light text-foreground">
            {totalRascunhos} {totalRascunhos === 1 ? "campo" : "campos"} com alterações em rascunho não publicadas.
          </div>
        )}

        {carregando && <p className="text-sm font-light text-text-body">Carregando…</p>}

        <div className="space-y-8">
          {fields.map((f) => (
            <div key={f.key}>
              <div className="flex items-center justify-between mb-2 gap-3 flex-wrap">
                <label className="text-[11px] font-medium tracking-luxury uppercase text-text-caption">
                  {f.descricao || f.key}
                </label>
                {f.tem_rascunho && (
                  <button
                    onClick={() => descartar(f.key)}
                    className="text-[10px] text-destructive hover:opacity-70"
                  >
                    Descartar rascunho
                  </button>
                )}
              </div>
              {f.tipo === "markdown" ? (
                <textarea
                  value={drafts[f.key] ?? ""}
                  onChange={(e) => setDrafts({ ...drafts, [f.key]: e.target.value })}
                  rows={4}
                  className="w-full bg-transparent border border-luxury-border px-3 py-2 text-sm font-light focus:outline-none focus:border-gold"
                />
              ) : (
                <input
                  type="text"
                  value={drafts[f.key] ?? ""}
                  onChange={(e) => setDrafts({ ...drafts, [f.key]: e.target.value })}
                  className="w-full bg-transparent border border-luxury-border px-3 py-2 text-sm font-light focus:outline-none focus:border-gold"
                />
              )}
              <p className="text-[10px] text-text-caption mt-1">
                {f.tipo === "markdown" ? "Markdown" : "Texto"} · chave: <code>{f.key}</code>
                {f.tem_rascunho && <span className="ml-2 text-destructive">• rascunho ativo</span>}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex gap-3 flex-wrap">
          <button
            onClick={salvarRascunho}
            disabled={salvando}
            className="border border-luxury-border px-5 py-2 text-sm font-light hover:bg-card-hover transition-colors disabled:opacity-50"
          >
            {salvando ? "Salvando…" : "Salvar rascunho"}
          </button>
          <button
            onClick={publicar}
            disabled={salvando}
            className="bg-foreground text-background px-5 py-2 text-sm font-light hover:bg-accent transition-colors disabled:opacity-50"
          >
            Publicar alterações
          </button>
        </div>
      </div>
    </section>
  );
};

const ConteudoEditorPage = () => (
  <PageLayout>
    <AdminGuard>
      <Inner />
    </AdminGuard>
  </PageLayout>
);

export default ConteudoEditorPage;

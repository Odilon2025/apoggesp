import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/PageLayout";
import { AdminGuard } from "./AdminGuard";
import { Noticia, getById, slugify } from "@/lib/noticias";

const emptyForm = {
  titulo: "",
  slug: "",
  resumo: "",
  conteudo: "",
  autor: "",
  capa_url: "",
  publicado_em: new Date().toISOString().slice(0, 10),
  publicado: false,
};

const Inner = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const editing = Boolean(id);
  const [form, setForm] = useState({ ...emptyForm });
  const [slugTouched, setSlugTouched] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!id) return;
    getById(id).then((n) => {
      if (n) {
        setForm({
          titulo: n.titulo,
          slug: n.slug,
          resumo: n.resumo,
          conteudo: n.conteudo,
          autor: n.autor,
          capa_url: n.capa_url ?? "",
          publicado_em: n.publicado_em.slice(0, 10),
          publicado: n.publicado,
        });
        setSlugTouched(true);
      }
    });
  }, [id]);

  const update = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }));

  const onTitulo = (titulo: string) => {
    update({ titulo, ...(slugTouched ? {} : { slug: slugify(titulo) }) });
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    setErro(null);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from("noticias").upload(path, file, { upsert: false });
    if (error) {
      setErro(error.message);
    } else {
      const { data } = supabase.storage.from("noticias").getPublicUrl(path);
      update({ capa_url: data.publicUrl });
    }
    setUploading(false);
  };

  const salvar = async (publicar?: boolean) => {
    setErro(null);
    setCarregando(true);
    const payload = {
      titulo: form.titulo,
      slug: form.slug || slugify(form.titulo),
      resumo: form.resumo,
      conteudo: form.conteudo,
      autor: form.autor,
      capa_url: form.capa_url || null,
      publicado_em: new Date(form.publicado_em).toISOString(),
      publicado: publicar !== undefined ? publicar : form.publicado,
    };
    const result = editing
      ? await supabase.from("noticias").update(payload).eq("id", id!)
      : await supabase.from("noticias").insert(payload);
    setCarregando(false);
    if (result.error) setErro(result.error.message);
    else navigate("/admin/noticias");
  };

  return (
    <section className="py-16 bg-card min-h-screen">
      <div className="container max-w-5xl">
        <Link to="/admin/noticias" className="text-xs font-light text-text-caption hover:text-foreground transition-colors">
          ← Voltar
        </Link>
        <h1 className="text-3xl font-display font-normal text-foreground mt-4 mb-10">
          {editing ? "Editar notícia" : "Nova notícia"}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <Field label="Título">
              <input
                value={form.titulo}
                onChange={(e) => onTitulo(e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Slug (URL)">
              <input
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  update({ slug: slugify(e.target.value) });
                }}
                className="input"
              />
            </Field>
            <Field label="Resumo">
              <textarea
                value={form.resumo}
                onChange={(e) => update({ resumo: e.target.value })}
                rows={3}
                className="input"
              />
            </Field>
            <div className="grid grid-cols-2 gap-5">
              <Field label="Autor">
                <input value={form.autor} onChange={(e) => update({ autor: e.target.value })} className="input" />
              </Field>
              <Field label="Data de publicação">
                <input
                  type="date"
                  value={form.publicado_em}
                  onChange={(e) => update({ publicado_em: e.target.value })}
                  className="input"
                />
              </Field>
            </div>
            <Field label="Capa">
              {form.capa_url && (
                <img src={form.capa_url} alt="" className="w-full max-h-40 object-cover mb-2 border border-luxury-border" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
                className="text-xs font-light"
              />
              {uploading && <p className="text-xs font-light text-text-caption mt-1">Enviando…</p>}
              {form.capa_url && (
                <button
                  type="button"
                  onClick={() => update({ capa_url: "" })}
                  className="text-xs font-light text-destructive mt-2 hover:opacity-70"
                >
                  Remover capa
                </button>
              )}
            </Field>
            <Field label="Conteúdo (Markdown)">
              <textarea
                value={form.conteudo}
                onChange={(e) => update({ conteudo: e.target.value })}
                rows={18}
                className="input font-mono text-xs"
              />
            </Field>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-medium tracking-luxury uppercase text-text-caption block">Pré-visualização</span>
            <div className="border border-luxury-border p-6 bg-section-alt min-h-[400px]">
              {form.capa_url && <img src={form.capa_url} alt="" className="w-full max-h-48 object-cover mb-4" />}
              <span className="text-[10px] font-medium tracking-luxury uppercase text-gold block mb-3">
                {new Date(form.publicado_em).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
              </span>
              <h2 className="text-2xl font-display font-normal text-foreground leading-tight">{form.titulo || "Título"}</h2>
              <p className="text-sm font-light text-text-body mt-2">{form.resumo}</p>
              <p className="text-xs text-text-caption mt-1">Por {form.autor}</p>
              <div className="mt-6 text-sm font-light text-text-body space-y-3">
                <ReactMarkdown>{form.conteudo}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>

        {erro && <p className="text-sm font-light text-destructive mt-6">{erro}</p>}

        <div className="flex gap-4 mt-10">
          <button
            onClick={() => salvar(false)}
            disabled={carregando}
            className="border border-luxury-border px-6 py-2.5 text-sm font-light hover:bg-section-alt transition-colors disabled:opacity-50"
          >
            Salvar rascunho
          </button>
          <button
            onClick={() => salvar(true)}
            disabled={carregando}
            className="bg-foreground text-background px-6 py-2.5 text-sm font-light hover:bg-accent transition-colors disabled:opacity-50"
          >
            Salvar e publicar
          </button>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: transparent;
          border: 1px solid hsl(var(--luxury-border));
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          font-weight: 300;
          color: hsl(var(--foreground));
        }
        .input:focus { outline: none; border-color: hsl(var(--gold)); }
      `}</style>
    </section>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="text-[10px] font-medium tracking-luxury uppercase text-text-caption block mb-2">{label}</label>
    {children}
  </div>
);

const NoticiaEditorPage = () => (
  <PageLayout>
    <AdminGuard>
      <Inner />
    </AdminGuard>
  </PageLayout>
);

export default NoticiaEditorPage;

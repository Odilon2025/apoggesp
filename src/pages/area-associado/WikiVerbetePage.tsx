import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import FadeIn from "@/components/FadeIn";
import AssociadoLayout from "@/components/AssociadoLayout";
import WikiCommentsDrawer from "@/components/wiki/WikiCommentsDrawer";
import { getWikiVerbeteBySlug, getComentariosAbertosPorSecao, WikiVerbeteRow } from "@/lib/wiki";
import { MessageCircle, Link2, ArrowLeft, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const WikiVerbetePage = () => {
  const { slug = "" } = useParams();
  const [verbete, setVerbete] = useState<WikiVerbeteRow | null | undefined>(undefined);
  const [comentarios, setComentarios] = useState<Record<string, number>>({});
  const [drawer, setDrawer] = useState<{ open: boolean; secaoId: string | null; secaoTitulo: string }>({
    open: false,
    secaoId: null,
    secaoTitulo: "",
  });
  const [copiado, setCopiado] = useState<string | null>(null);

  const recarregarComentarios = () => {
    getComentariosAbertosPorSecao(slug).then(setComentarios);
  };

  useEffect(() => {
    getWikiVerbeteBySlug(slug).then(setVerbete);
    recarregarComentarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // Scroll para âncora ao montar
  useEffect(() => {
    if (!verbete) return;
    const hash = window.location.hash;
    if (hash.startsWith("#secao=")) {
      const id = hash.replace("#secao=", "");
      setTimeout(() => {
        document.getElementById(`secao-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [verbete]);

  const abrirComentarios = (secaoId: string | null, secaoTitulo: string) => {
    setDrawer({ open: true, secaoId, secaoTitulo });
  };

  const copiarLink = (secaoId: string) => {
    const url = `${window.location.origin}/area-associado/wiki/${slug}#secao=${secaoId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiado(secaoId);
      toast({ title: "Link copiado", description: "Endereço da seção copiado." });
      setTimeout(() => setCopiado(null), 2000);
    });
  };

  const totalAbertos = useMemo(
    () => Object.values(comentarios).reduce((a, b) => a + b, 0),
    [comentarios]
  );

  if (verbete === undefined) {
    return (
      <AssociadoLayout label="Wiki" titulo="Carregando…">
        <section className="py-20 bg-card min-h-[40vh]" />
      </AssociadoLayout>
    );
  }
  if (verbete === null) {
    return <Navigate to="/area-associado/wiki" replace />;
  }

  const d = verbete.dados;

  return (
    <AssociadoLayout label={d.categoria || "Wiki"} titulo={d.titulo} subtitulo={d.resumo}>
      <section className="py-16 md:py-20 bg-card">
        <div className="container max-w-6xl">
          <FadeIn>
            <Link
              to="/area-associado/wiki"
              className="inline-flex items-center gap-2 text-[11px] font-sans tracking-luxury uppercase text-text-caption hover:text-foreground transition-colors mb-12"
            >
              <ArrowLeft size={12} strokeWidth={1.5} /> Voltar ao índice
            </Link>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12">
            {/* TOC */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <h2 className="text-[10px] font-sans tracking-luxury uppercase text-text-caption mb-4">Nesta página</h2>
              <ul className="space-y-3">
                {d.secoes?.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#secao-${s.id}`}
                      className="text-xs font-light text-text-body hover:text-foreground flex items-baseline justify-between gap-2"
                    >
                      <span>{s.titulo}</span>
                      {comentarios[s.id] > 0 && (
                        <span className="text-[10px] text-gold">{comentarios[s.id]}</span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-luxury-border">
                <button
                  onClick={() => abrirComentarios(null, "Verbete inteiro")}
                  className="inline-flex items-center gap-2 text-[11px] font-sans tracking-luxury uppercase text-text-caption hover:text-foreground transition-colors"
                >
                  <MessageCircle size={12} strokeWidth={1.5} />
                  {totalAbertos > 0 ? `${totalAbertos} aberto(s)` : "Comentar verbete"}
                </button>
              </div>
            </aside>

            {/* Conteúdo */}
            <article className="min-w-0">
              <FadeIn>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="text-[10px] font-sans tracking-luxury uppercase text-gold">{d.categoria}</span>
                  {(d.tags ?? []).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] tracking-luxury uppercase text-text-caption border border-luxury-border px-2 py-0.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] text-text-caption mb-12">
                  Atualizado em {new Date(verbete.updated_at).toLocaleDateString("pt-BR")}
                </p>
              </FadeIn>

              <div className="space-y-16">
                {d.secoes?.map((s) => (
                  <FadeIn key={s.id}>
                    <section id={`secao-${s.id}`} className="scroll-mt-24">
                      <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-luxury-border group">
                        <h2 className="text-2xl font-display font-normal text-foreground">{s.titulo}</h2>
                        <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => copiarLink(s.id)}
                            title="Copiar link da seção"
                            className="p-1.5 border border-luxury-border hover:border-gold text-text-caption hover:text-foreground transition-colors"
                          >
                            {copiado === s.id ? (
                              <Check size={12} strokeWidth={1.5} />
                            ) : (
                              <Link2 size={12} strokeWidth={1.5} />
                            )}
                          </button>
                          <button
                            onClick={() => abrirComentarios(s.id, s.titulo)}
                            title="Comentários desta seção"
                            className={`inline-flex items-center gap-1.5 text-[10px] tracking-luxury uppercase px-2 py-1.5 border transition-colors ${
                              comentarios[s.id] > 0
                                ? "border-gold text-gold hover:bg-gold/5"
                                : "border-luxury-border text-text-caption hover:text-foreground"
                            }`}
                          >
                            <MessageCircle size={11} strokeWidth={1.5} />
                            {comentarios[s.id] ?? 0}
                          </button>
                        </div>
                      </div>
                      <div className="prose prose-sm prose-neutral max-w-none font-light text-text-body leading-relaxed prose-headings:font-display prose-headings:font-normal prose-headings:text-foreground prose-a:text-gold prose-a:no-underline hover:prose-a:underline">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{s.corpo_md || ""}</ReactMarkdown>
                      </div>
                    </section>
                  </FadeIn>
                ))}
              </div>

              {(d.referencias ?? []).length > 0 && (
                <FadeIn>
                  <div className="mt-20 pt-8 border-t border-luxury-border">
                    <h2 className="text-[11px] font-sans tracking-luxury uppercase text-text-caption mb-4">
                      Referências
                    </h2>
                    <ul className="space-y-2">
                      {d.referencias!.map((r, i) => (
                        <li key={i}>
                          <a
                            href={r.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-light text-text-body hover:text-gold transition-colors"
                          >
                            → {r.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              )}
            </article>
          </div>
        </div>
      </section>

      <WikiCommentsDrawer
        slug={slug}
        secaoId={drawer.secaoId}
        secaoTitulo={drawer.secaoTitulo}
        verbeteTitulo={d.titulo}
        open={drawer.open}
        onOpenChange={(open) => setDrawer((d) => ({ ...d, open }))}
        onChange={recarregarComentarios}
      />
    </AssociadoLayout>
  );
};

export default WikiVerbetePage;

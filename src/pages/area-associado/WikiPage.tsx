import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import CMSMarkdown from "@/components/CMSMarkdown";
import AssociadoLayout from "@/components/AssociadoLayout";
import { usePageFields } from "@/hooks/useCMS";
import { field } from "@/lib/cms";
import { getWikiVerbetes, getComentariosAbertosPorVerbete, WikiVerbeteRow } from "@/lib/wiki";
import { MessageCircle, Search, BookOpen } from "lucide-react";

const WikiPage = () => {
  const fields = usePageFields("associado_wiki");
  const [verbetes, setVerbetes] = useState<WikiVerbeteRow[]>([]);
  const [comentarios, setComentarios] = useState<Record<string, number>>({});
  const [busca, setBusca] = useState("");

  useEffect(() => {
    getWikiVerbetes().then(setVerbetes);
    getComentariosAbertosPorVerbete().then(setComentarios);
  }, []);

  const filtrados = useMemo(() => {
    const q = busca.trim().toLowerCase();
    if (!q) return verbetes;
    return verbetes.filter((v) => {
      const d = v.dados;
      return (
        d.titulo?.toLowerCase().includes(q) ||
        d.resumo?.toLowerCase().includes(q) ||
        d.categoria?.toLowerCase().includes(q) ||
        (d.tags ?? []).some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [verbetes, busca]);

  const porCategoria = useMemo(() => {
    const map = new Map<string, WikiVerbeteRow[]>();
    for (const v of filtrados) {
      const c = v.dados.categoria || "Outros";
      if (!map.has(c)) map.set(c, []);
      map.get(c)!.push(v);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtrados]);

  const recentes = useMemo(
    () => [...verbetes].sort((a, b) => b.updated_at.localeCompare(a.updated_at)).slice(0, 4),
    [verbetes]
  );

  return (
    <AssociadoLayout
      label={field(fields, "hero_label", "Área do Associado")}
      titulo={field(fields, "hero_titulo", "Wiki da Carreira")}
      subtitulo={field(fields, "hero_subtitulo", "")}
    >
      <section className="py-20 md:py-28 bg-card">
        <div className="container max-w-6xl">
          <FadeIn>
            <CMSMarkdown
              fields={fields}
              fieldKey="intro"
              fallback=""
              className="prose prose-sm prose-neutral max-w-2xl font-light text-text-body leading-relaxed mb-12"
            />
          </FadeIn>

          <FadeIn>
            <div className="relative max-w-xl mb-16">
              <Search size={14} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-caption" />
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar por título, tag ou categoria…"
                className="w-full bg-transparent border border-luxury-border pl-9 pr-3 py-3 text-sm font-light focus:outline-none focus:border-gold"
              />
            </div>
          </FadeIn>

          {recentes.length > 0 && !busca && (
            <FadeIn>
              <h2 className="text-[11px] font-sans tracking-luxury uppercase text-text-caption mb-6">
                Atualizados recentemente
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-luxury-border mb-20">
                {recentes.map((v) => (
                  <Link
                    key={v.id}
                    to={`/area-associado/wiki/${v.dados.slug}`}
                    className="bg-card p-6 hover:bg-card-hover transition-colors group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-sans tracking-luxury uppercase text-gold">
                        {v.dados.categoria}
                      </span>
                      {comentarios[v.dados.slug] > 0 && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-text-caption">
                          <MessageCircle size={11} strokeWidth={1.5} />
                          {comentarios[v.dados.slug]}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-display text-foreground group-hover:text-gold transition-colors mb-1">
                      {v.dados.titulo}
                    </h3>
                    {v.dados.resumo && (
                      <p className="text-sm font-light text-text-body leading-relaxed line-clamp-2">{v.dados.resumo}</p>
                    )}
                  </Link>
                ))}
              </div>
            </FadeIn>
          )}

          {porCategoria.length === 0 && (
            <p className="text-sm font-light text-text-caption">Nenhum verbete encontrado.</p>
          )}

          <div className="space-y-16">
            {porCategoria.map(([categoria, lista]) => (
              <FadeIn key={categoria}>
                <h2 className="text-[11px] font-sans tracking-luxury uppercase text-text-caption mb-6 border-b border-luxury-border pb-3">
                  {categoria}
                </h2>
                <div className="space-y-px bg-luxury-border">
                  {lista.map((v) => (
                    <Link
                      key={v.id}
                      to={`/area-associado/wiki/${v.dados.slug}`}
                      className="bg-card p-6 hover:bg-card-hover transition-colors flex items-start gap-4 group"
                    >
                      <BookOpen size={18} strokeWidth={1.25} className="text-gold mt-1 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-4">
                          <h3 className="text-base font-display text-foreground group-hover:text-gold transition-colors">
                            {v.dados.titulo}
                          </h3>
                          {comentarios[v.dados.slug] > 0 && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-text-caption shrink-0">
                              <MessageCircle size={11} strokeWidth={1.5} />
                              {comentarios[v.dados.slug]}
                            </span>
                          )}
                        </div>
                        {v.dados.resumo && (
                          <p className="text-sm font-light text-text-body leading-relaxed mt-1">{v.dados.resumo}</p>
                        )}
                        {(v.dados.tags ?? []).length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {v.dados.tags!.map((t) => (
                              <span
                                key={t}
                                className="text-[10px] tracking-luxury uppercase text-text-caption border border-luxury-border px-2 py-0.5"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </AssociadoLayout>
  );
};

export default WikiPage;

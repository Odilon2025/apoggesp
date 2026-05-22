import { useMemo, useState } from "react";
import FadeIn from "@/components/FadeIn";
import CMSMarkdown from "@/components/CMSMarkdown";
import AssociadoLayout from "@/components/AssociadoLayout";
import { usePageFields, useCMSList } from "@/hooks/useCMS";
import { field, getBibliotecaItens } from "@/lib/cms";
import { ExternalLink, Lock } from "lucide-react";

const BibliotecaPage = () => {
  const fields = usePageFields("associado_biblioteca");
  const itens = useCMSList(getBibliotecaItens, []);
  const [filtro, setFiltro] = useState<string>("Todas");

  const categorias = useMemo(() => ["Todas", ...Array.from(new Set(itens.map((i) => i.categoria)))], [itens]);
  const visiveis = filtro === "Todas" ? itens : itens.filter((i) => i.categoria === filtro);

  return (
    <AssociadoLayout
      label={field(fields, "hero_label", "Área do Associado")}
      titulo={field(fields, "hero_titulo", "Biblioteca da Carreira")}
      subtitulo={field(fields, "hero_subtitulo", "")}
    >
      <section className="py-20 md:py-28 bg-card">
        <div className="container max-w-5xl">
          <FadeIn>
            <CMSMarkdown
              fields={fields}
              fieldKey="intro"
              fallback=""
              className="prose prose-sm prose-neutral max-w-2xl font-light text-text-body leading-relaxed mb-12"
            />
          </FadeIn>

          {categorias.length > 1 && (
            <FadeIn>
              <div className="flex flex-wrap gap-x-6 gap-y-3 mb-12">
                {categorias.map((c) => (
                  <button
                    key={c}
                    onClick={() => setFiltro(c)}
                    className={`text-[11px] font-sans tracking-luxury uppercase transition-colors ${
                      filtro === c ? "text-foreground border-b border-gold pb-1" : "text-text-caption hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </FadeIn>
          )}

          <div className="space-y-px bg-luxury-border">
            {visiveis.map((it, i) => (
              <FadeIn key={i}>
                <a
                  href={it.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card p-6 md:p-8 hover:bg-card-hover transition-colors flex items-start justify-between gap-6 group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-sans tracking-luxury uppercase text-gold">{it.tipo}</span>
                      <span className="text-[10px] text-text-caption">·</span>
                      <span className="text-[10px] text-text-caption">{it.categoria}</span>
                      {it.restrito && <Lock size={11} strokeWidth={1.5} className="text-text-caption" />}
                    </div>
                    <h3 className="text-lg font-display text-foreground group-hover:text-gold transition-colors mb-1">{it.titulo}</h3>
                    {it.descricao && <p className="text-sm font-light text-text-body leading-relaxed">{it.descricao}</p>}
                  </div>
                  <ExternalLink size={16} strokeWidth={1.5} className="text-text-caption mt-1 shrink-0" />
                </a>
              </FadeIn>
            ))}
            {visiveis.length === 0 && (
              <p className="bg-card p-8 text-sm font-light text-text-caption">Nenhum item disponível.</p>
            )}
          </div>
        </div>
      </section>
    </AssociadoLayout>
  );
};

export default BibliotecaPage;

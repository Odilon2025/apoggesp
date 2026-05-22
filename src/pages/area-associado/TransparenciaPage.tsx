import { useMemo } from "react";
import FadeIn from "@/components/FadeIn";
import CMSMarkdown from "@/components/CMSMarkdown";
import AssociadoLayout from "@/components/AssociadoLayout";
import { usePageFields, useCMSList } from "@/hooks/useCMS";
import { field, getTransparenciaItens } from "@/lib/cms";
import { ExternalLink } from "lucide-react";

const TransparenciaPage = () => {
  const fields = usePageFields("associado_transparencia");
  const itens = useCMSList(getTransparenciaItens, []);

  const grupos = useMemo(() => {
    const map = new Map<string, typeof itens>();
    for (const it of itens) {
      const k = it.categoria || "Outros";
      if (!map.has(k)) map.set(k, [] as any);
      map.get(k)!.push(it);
    }
    return Array.from(map.entries());
  }, [itens]);

  return (
    <AssociadoLayout
      label={field(fields, "hero_label", "Área do Associado")}
      titulo={field(fields, "hero_titulo", "Transparência APOGESP")}
      subtitulo={field(fields, "hero_subtitulo", "")}
    >
      <section className="py-20 md:py-28 bg-card">
        <div className="container max-w-5xl">
          <FadeIn>
            <CMSMarkdown
              fields={fields}
              fieldKey="intro"
              fallback=""
              className="prose prose-sm prose-neutral max-w-2xl font-light text-text-body leading-relaxed mb-16"
            />
          </FadeIn>

          {grupos.map(([categoria, lista]) => (
            <FadeIn key={categoria}>
              <h2 className="text-[11px] font-sans tracking-luxury uppercase text-text-caption mb-6">{categoria}</h2>
              <div className="space-y-px bg-luxury-border mb-12">
                {lista.map((it, i) => (
                  <a
                    key={i}
                    href={it.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-card p-6 hover:bg-card-hover transition-colors flex items-start justify-between gap-4 group"
                  >
                    <div className="flex-1">
                      <h3 className="text-base font-display text-foreground group-hover:text-gold transition-colors mb-1">{it.titulo}</h3>
                      {it.descricao && <p className="text-sm font-light text-text-body leading-relaxed">{it.descricao}</p>}
                      {it.periodo && <p className="text-[10px] text-text-caption uppercase tracking-luxury mt-2">{it.periodo}</p>}
                    </div>
                    <ExternalLink size={16} strokeWidth={1.5} className="text-text-caption mt-1 shrink-0" />
                  </a>
                ))}
              </div>
            </FadeIn>
          ))}

          {grupos.length === 0 && (
            <p className="text-sm font-light text-text-caption">Nenhum documento publicado.</p>
          )}
        </div>
      </section>
    </AssociadoLayout>
  );
};

export default TransparenciaPage;

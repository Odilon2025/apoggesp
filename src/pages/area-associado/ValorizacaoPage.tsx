import FadeIn from "@/components/FadeIn";
import CMSMarkdown from "@/components/CMSMarkdown";
import AssociadoLayout from "@/components/AssociadoLayout";
import { usePageFields, useCMSList } from "@/hooks/useCMS";
import { field, getValorizacaoAcoes } from "@/lib/cms";
import ReactMarkdown from "react-markdown";

const statusBadge: Record<string, string> = {
  "Em curso": "text-gold border-gold/40",
  "Conquista": "text-foreground border-foreground/40",
  "Em análise": "text-text-caption border-luxury-border",
};

const ValorizacaoPage = () => {
  const fields = usePageFields("associado_valorizacao");
  const acoes = useCMSList(getValorizacaoAcoes, []);

  return (
    <AssociadoLayout
      label={field(fields, "hero_label", "Área do Associado")}
      titulo={field(fields, "hero_titulo", "Valorização e Advocacy")}
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

          <div className="space-y-px bg-luxury-border">
            {acoes.map((a, i) => (
              <FadeIn key={i}>
                <article className="bg-card p-8 md:p-10">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-[10px] font-sans tracking-luxury uppercase text-text-caption">{a.eixo}</span>
                    <span className={`text-[10px] font-sans tracking-luxury uppercase px-2 py-0.5 border ${statusBadge[a.status] ?? "text-text-caption border-luxury-border"}`}>
                      {a.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-display text-foreground mb-4">{a.titulo}</h3>
                  <div className="prose prose-sm prose-neutral max-w-3xl font-light text-text-body leading-relaxed">
                    <ReactMarkdown>{a.descricao}</ReactMarkdown>
                  </div>
                  {a.proxima_etapa && (
                    <p className="mt-4 text-xs font-light text-text-caption">
                      <span className="uppercase tracking-luxury text-[10px] mr-2">Próxima etapa:</span>
                      {a.proxima_etapa}
                    </p>
                  )}
                </article>
              </FadeIn>
            ))}
            {acoes.length === 0 && (
              <p className="bg-card p-8 text-sm font-light text-text-caption">Nenhuma ação cadastrada.</p>
            )}
          </div>
        </div>
      </section>
    </AssociadoLayout>
  );
};

export default ValorizacaoPage;

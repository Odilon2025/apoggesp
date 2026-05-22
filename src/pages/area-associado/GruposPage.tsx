import FadeIn from "@/components/FadeIn";
import CMSMarkdown from "@/components/CMSMarkdown";
import AssociadoLayout from "@/components/AssociadoLayout";
import { usePageFields, useCMSList } from "@/hooks/useCMS";
import { field, getGruposTrabalho } from "@/lib/cms";
import ReactMarkdown from "react-markdown";

const GruposPage = () => {
  const fields = usePageFields("associado_grupos");
  const grupos = useCMSList(getGruposTrabalho, []);
  const ativos = grupos.filter((g) => g.ativo !== false);
  const inativos = grupos.filter((g) => g.ativo === false);

  return (
    <AssociadoLayout
      label={field(fields, "hero_label", "Área do Associado")}
      titulo={field(fields, "hero_titulo", "Grupos de Trabalho")}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-luxury-border">
            {ativos.map((g, i) => (
              <FadeIn key={i}>
                <article className="bg-card p-8 h-full flex flex-col">
                  <span className="text-[10px] font-sans tracking-luxury uppercase text-gold mb-2">{g.tema}</span>
                  <h3 className="text-xl font-display text-foreground mb-4">{g.nome}</h3>
                  <div className="prose prose-sm prose-neutral font-light text-text-body leading-relaxed flex-1">
                    <ReactMarkdown>{g.descricao}</ReactMarkdown>
                  </div>
                  <dl className="mt-6 pt-6 border-t border-luxury-border space-y-2 text-xs font-light">
                    {g.coordenacao && (
                      <div className="flex gap-2"><dt className="uppercase tracking-luxury text-[10px] text-text-caption">Coordenação:</dt><dd className="text-text-body">{g.coordenacao}</dd></div>
                    )}
                    {g.frequencia && (
                      <div className="flex gap-2"><dt className="uppercase tracking-luxury text-[10px] text-text-caption">Encontros:</dt><dd className="text-text-body">{g.frequencia}</dd></div>
                    )}
                  </dl>
                  {g.como_participar && (
                    <div className="mt-4 text-xs font-light text-text-body">
                      <p className="uppercase tracking-luxury text-[10px] text-text-caption mb-1">Como participar</p>
                      <div className="prose prose-xs prose-neutral max-w-none">
                        <ReactMarkdown>{g.como_participar}</ReactMarkdown>
                      </div>
                    </div>
                  )}
                </article>
              </FadeIn>
            ))}
          </div>

          {inativos.length > 0 && (
            <FadeIn>
              <h2 className="text-[11px] font-sans tracking-luxury uppercase text-text-caption mt-16 mb-6">Encerrados</h2>
              <ul className="space-y-2">
                {inativos.map((g, i) => (
                  <li key={i} className="text-sm font-light text-text-caption">
                    <span className="text-foreground">{g.nome}</span> — {g.tema}
                  </li>
                ))}
              </ul>
            </FadeIn>
          )}

          {grupos.length === 0 && (
            <p className="text-sm font-light text-text-caption">Nenhum grupo cadastrado.</p>
          )}
        </div>
      </section>
    </AssociadoLayout>
  );
};

export default GruposPage;

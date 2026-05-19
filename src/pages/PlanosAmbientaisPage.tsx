import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";
import CMSMarkdown from "@/components/CMSMarkdown";
import { usePageFields } from "@/hooks/useCMS";
import { field } from "@/lib/cms";
import { Building2, ChevronDown, ChevronUp, Target, Leaf } from "lucide-react";
import { planos as planosFallback } from "@/data/planos";
import { useCMSList } from "@/hooks/useCMS";
import { getPlanos } from "@/lib/cms";

const PlanosAmbientaisPage = () => {
  const f = usePageFields("planos-ambientais");
  const [expandido, setExpandido] = useState<string | null>(null);

  const toggle = (sigla: string) => {
    setExpandido(expandido === sigla ? null : sigla);
  };

  return (
    <PageLayout>
      <PageHero
        label={field(f, "planos-ambientais.hero.label", "Sustentabilidade")}
        title={field(f, "planos-ambientais.hero.titulo", "Planos de Atuação com Características Ambientais")}
        subtitle={field(f, "planos-ambientais.hero.subtitulo", "Recorte dos Planos de Atuação Institucional dos órgãos cuja agenda inclui projetos com dimensão ambiental — clima, infraestrutura sustentável, habitação, saneamento e agricultura urbana.")}
      />

      {/* Números */}
      <section className="py-16 md:py-20 border-b border-luxury-border">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-3 gap-8 text-center">
            <FadeIn>
              <div>
                <span className="text-3xl md:text-4xl font-display text-foreground">{planosAmbientais.length}</span>
                <p className="text-xs font-light text-text-caption mt-1 tracking-wide uppercase">Órgãos com PAI ambiental</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div>
                <span className="text-3xl md:text-4xl font-display text-foreground">{totalProjetos}</span>
                <p className="text-xs font-light text-text-caption mt-1 tracking-wide uppercase">Projetos</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div>
                <span className="text-3xl md:text-4xl font-display text-foreground">{totalAppggs}</span>
                <p className="text-xs font-light text-text-caption mt-1 tracking-wide uppercase">APPGGs Demandados</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Planos */}
      <section className="py-20 md:py-28">
        <div className="container max-w-4xl">
          <SectionTitle label={field(f, "planos-ambientais.detalhamento.label", "Detalhamento")} title={field(f, "planos-ambientais.detalhamento.titulo", "Planos por Órgão")} />

          <div className="space-y-4">
            {planosAmbientais.map((plano, i) => (
              <FadeIn key={plano.sigla} delay={i * 0.05}>
                <div className="border border-luxury-border rounded-sm overflow-hidden">
                  <button
                    onClick={() => toggle(plano.sigla)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-section-alt/50 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-[hsl(145,45%,32%)/0.1] flex items-center justify-center">
                        <Leaf size={16} className="text-[hsl(145,55%,32%)]" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-medium tracking-wider uppercase text-[hsl(145,55%,32%)]">{plano.sigla}</span>
                          <span className="text-[11px] text-text-caption">·</span>
                          <span className="text-[11px] text-text-caption">{plano.appggsNecessarios} APPGG{plano.appggsNecessarios > 1 ? "s" : ""}</span>
                          <span className="text-[11px] text-text-caption">·</span>
                          <span className="text-[11px] text-text-caption">{plano.projetos.length} projeto{plano.projetos.length > 1 ? "s" : ""}</span>
                        </div>
                        <h3 className="text-sm font-display font-normal text-foreground mt-0.5 truncate">{plano.orgao}</h3>
                      </div>
                    </div>
                    {expandido === plano.sigla ? (
                      <ChevronUp size={16} className="text-text-caption flex-shrink-0" />
                    ) : (
                      <ChevronDown size={16} className="text-text-caption flex-shrink-0" />
                    )}
                  </button>

                  {expandido === plano.sigla && (
                    <div className="px-6 pb-6 border-t border-luxury-border/50">
                      <p className="text-sm font-light text-text-body leading-relaxed mt-5 mb-6">{plano.descricao}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {plano.destaques.map((d) => (
                          <span key={d} className="text-[11px] px-2.5 py-1 rounded-sm bg-[hsl(145,45%,32%)/0.08] text-[hsl(145,55%,32%)] tracking-wide">
                            {d}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-0 border-t border-luxury-border/50">
                        {plano.projetos.map((projeto, j) => (
                          <div key={j} className="py-4 border-b border-luxury-border/30 last:border-b-0">
                            <div className="flex items-start gap-3">
                              <Target size={12} className="text-[hsl(145,55%,32%)] mt-1 flex-shrink-0" />
                              <div>
                                <h4 className="text-sm font-medium text-foreground">{projeto.nome}</h4>
                                <p className="text-xs font-light text-text-caption mt-1 leading-relaxed">{projeto.descricao}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-section-alt">
        <div className="container max-w-3xl text-center">
          <FadeIn>
            <p className="text-xs font-medium tracking-luxury uppercase text-[hsl(145,55%,32%)] mb-4">
              <Building2 size={14} className="inline mr-1.5 -mt-0.5" />
              Agenda ambiental
            </p>
            <h2 className="text-2xl md:text-3xl font-display font-normal text-foreground mb-4">
              {planosAmbientais.length} órgãos com agenda ambiental formalizada
            </h2>
            <p className="text-sm font-light text-text-body leading-relaxed max-w-xl mx-auto">
              Os Planos de Atuação Institucional dos órgãos com características ambientais reúnem
              {" "}{totalProjetos} projetos voltados a clima, energia, habitação sustentável,
              infraestrutura urbana e agricultura urbana — todos demandando trabalho técnico
              colaborativo dos APPGGs.
            </p>
          </FadeIn>
        </div>
      </section>
    </PageLayout>
  );
};

export default PlanosAmbientaisPage;

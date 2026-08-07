import { useMemo } from "react";
import { ExternalLink } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import SectionTitle from "@/components/SectionTitle";
import SEO from "@/components/SEO";
import { useCMSList } from "@/hooks/useCMS";
import { getLinksUteis } from "@/lib/cms";
import { linksUteisFallback } from "@/data/linksUteis";

interface LinkUtil {
  categoria: string;
  titulo: string;
  descricao: string;
  url: string;
}

const LinksUteisPage = () => {
  const links = useCMSList<LinkUtil>(getLinksUteis, linksUteisFallback);

  const categorias = useMemo(() => {
    const map = new Map<string, LinkUtil[]>();
    for (const link of links) {
      const grupo = map.get(link.categoria) ?? [];
      grupo.push(link);
      map.set(link.categoria, grupo);
    }
    return Array.from(map.entries());
  }, [links]);

  return (
    <PageLayout>
      <SEO
        title="Links Úteis | APOGESP"
        description="Links úteis para APPGGs, gestores públicos e pesquisadores: Prefeitura de São Paulo, Câmara Municipal, Tribunal de Contas, Diário Oficial, bancas de concurso e legislação."
        path="/links-uteis"
      />

      <PageHero
        label="Recursos"
        title="Links úteis"
        subtitle="Sites, sistemas e legislação de referência para quem acompanha a carreira APPGG e a gestão pública municipal."
      />

      <section className="py-20 md:py-28 bg-card">
        <div className="container max-w-4xl">
          {categorias.map(([categoria, itens], idx) => (
            <FadeIn key={categoria} delay={idx * 0.05}>
              <div className="mb-16 last:mb-0">
                <SectionTitle title={categoria} className="mb-8" />
                <div className="grid grid-cols-1 gap-px bg-luxury-border">
                  {itens.map((link, i) => (
                    <a
                      key={`${categoria}-${i}`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block bg-card p-6 md:p-8 hover:bg-card-hover transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-base md:text-lg font-display text-foreground group-hover:text-gold transition-colors mb-2">
                            {link.titulo}
                          </h3>
                          <p className="text-sm font-light text-text-body leading-relaxed">
                            {link.descricao}
                          </p>
                        </div>
                        <ExternalLink
                          size={18}
                          strokeWidth={1.5}
                          className="shrink-0 mt-1 text-text-caption group-hover:text-gold transition-colors"
                        />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </PageLayout>
  );
};

export default LinksUteisPage;

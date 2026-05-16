import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";
import CMSMarkdown from "@/components/CMSMarkdown";
import { usePageFields } from "@/hooks/useCMS";
import { field } from "@/lib/cms";
import { FileText, Download } from "lucide-react";

interface Publicacao {
  titulo: string;
  ano: string;
  tipo: string;
  resumo: string;
  autores?: string;
  url?: string;
}

const tipos = ["Todos", "Caderno", "Artigo", "Nota Técnica", "Proposta de Aprimoramento", "Documento Histórico"];

const CADERNO_URL = "https://prefeitura.sp.gov.br/web/gestao/assessoria_de_carreiras_transversais";

const publicacoesBase: Publicacao[] = [
  {
    titulo: "Relatório APPGGs",
    ano: "2026",
    tipo: "Documento Histórico",
    resumo: "Relatório institucional sobre a carreira de Analistas de Políticas Públicas e Gestão Governamental do município de São Paulo.",
    url: "https://drive.google.com/file/d/1NvgU8Lc1MPwEPTU-z5ZV6KOeXJ98EEfG/view?usp=sharing",
  },
  {
    titulo: "Caderno Gestão Pública em Rede — 1ª Edição",
    ano: "2025",
    tipo: "Caderno",
    resumo: "A primeira publicação coletiva dos APPGGs reúne nove artigos escritos por quem esteve na linha de frente. Organizado pela ACT/SEGES para celebrar uma década de carreira, o Caderno não é um catálogo de realizações — é um exercício de reflexão crítica sobre o que foi construído, o que funcionou e o que ainda precisa ser feito.",
    url: "https://prefeitura.sp.gov.br/web/gestao/assessoria_de_carreiras_transversais",
  },
];

const publicacoes: Publicacao[] = publicacoesBase.map((p) => ({ ...p, url: p.url ?? CADERNO_URL }));

const PublicacoesPage = () => {
  const [tipoFiltro, setTipoFiltro] = useState("Todos");
  const [anoFiltro, setAnoFiltro] = useState("Todos");

  const anos = ["Todos", ...Array.from(new Set(publicacoes.map((p) => p.ano))).sort().reverse()];

  const filtradas = publicacoes.filter((p) => {
    if (tipoFiltro !== "Todos" && p.tipo !== tipoFiltro) return false;
    if (anoFiltro !== "Todos" && p.ano !== anoFiltro) return false;
    return true;
  });

  return (
    <PageLayout>
      <PageHero
        label="Biblioteca"
        title="Publicações"
        subtitle="O que a carreira de APPGG pensa, documenta e publica. Artigos, notas técnicas e propostas."
      />

      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          {/* Destaque principal */}
          <FadeIn>
            <div className="border border-luxury-border p-8 md:p-12 mb-16">
              <span className="text-[10px] font-medium tracking-luxury uppercase text-gold block mb-4">Destaque</span>
              <h3 className="text-xl md:text-2xl font-display font-normal text-foreground">Caderno Gestão Pública em Rede — 1ª Edição</h3>
              <p className="text-sm font-light text-text-body mt-3 leading-relaxed max-w-3xl">
                Nove artigos. Nove histórias de quem esteve dentro da máquina pública, tentando fazê-la funcionar melhor. A primeira publicação coletiva dos APPGGs celebra uma década de carreira com o que ela faz de melhor: análise rigorosa, experiência de campo e compromisso com o registro. Organizado pela Assessoria de Carreiras Transversais (ACT) da Secretaria Municipal de Gestão.
              </p>
              <div className="flex items-center justify-between gap-4 mt-6 flex-wrap">
                <span className="text-[11px] font-light text-text-caption">Dezembro 2025 · Prefeitura de São Paulo</span>
                <a
                  href="https://prefeitura.sp.gov.br/web/gestao/assessoria_de_carreiras_transversais"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-light text-accent hover:text-foreground transition-colors duration-300"
                >
                  <Download size={14} strokeWidth={1.5} />
                  Baixar PDF
                </a>
              </div>
            </div>
          </FadeIn>

          <SectionTitle label="Acervo" title="Documentos Institucionais" />

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-6 mb-12">
            <div>
              <label className="text-[10px] font-medium tracking-luxury uppercase text-text-caption mb-2 block">Tipo</label>
              <select
                value={tipoFiltro}
                onChange={(e) => setTipoFiltro(e.target.value)}
                className="text-sm font-light border border-luxury-border px-4 py-2.5 bg-card text-foreground focus:outline-none focus:border-gold transition-colors duration-300 min-w-[220px]"
              >
                {tipos.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-medium tracking-luxury uppercase text-text-caption mb-2 block">Ano</label>
              <select
                value={anoFiltro}
                onChange={(e) => setAnoFiltro(e.target.value)}
                className="text-sm font-light border border-luxury-border px-4 py-2.5 bg-card text-foreground focus:outline-none focus:border-gold transition-colors duration-300"
              >
                {anos.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>

          {/* List */}
          <div className="border-t border-luxury-border">
            {filtradas.map((pub, i) => (
              <FadeIn key={pub.titulo} delay={i * 0.04}>
                <article className="py-8 border-b border-luxury-border group hover:bg-card-hover transition-colors duration-300 -mx-4 px-4">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-start gap-4 flex-1">
                      <FileText size={16} strokeWidth={1.5} className="text-gold mt-1 shrink-0" />
                      <div>
                        <h3 className="text-base font-display font-normal text-foreground group-hover:text-gold transition-colors duration-300">{pub.titulo}</h3>
                        <div className="flex items-center gap-3 mt-2 flex-wrap">
                          <span className="text-[10px] font-medium tracking-luxury uppercase text-text-caption">{pub.tipo}</span>
                          <span className="text-luxury-border">·</span>
                          <span className="text-[11px] font-light text-text-caption">{pub.ano}</span>
                          {pub.autores && (
                            <>
                              <span className="text-luxury-border">·</span>
                              <span className="text-[11px] font-light text-text-caption">{pub.autores}</span>
                            </>
                          )}
                        </div>
                        <p className="text-sm font-light text-text-body mt-3 leading-relaxed max-w-2xl">{pub.resumo}</p>
                      </div>
                    </div>
                    {pub.url ? (
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-flex items-center gap-2 border border-luxury-border px-4 py-2.5 text-[11px] font-medium tracking-luxury uppercase text-foreground hover:border-gold hover:text-gold transition-colors duration-300"
                        title="Baixar PDF"
                      >
                        <Download size={14} strokeWidth={1.5} />
                        Baixar PDF
                      </a>
                    ) : (
                      <button className="shrink-0 inline-flex items-center gap-2 border border-luxury-border px-4 py-2.5 text-[11px] font-medium tracking-luxury uppercase text-text-caption" title="Indisponível" disabled>
                        <Download size={14} strokeWidth={1.5} />
                        Baixar PDF
                      </button>
                    )}
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>

          {filtradas.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-sm font-light text-text-caption">Nenhuma publicação encontrada.</p>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default PublicacoesPage;

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";
import { FileText, Download } from "lucide-react";

interface Publicacao {
  titulo: string;
  ano: string;
  tipo: string;
  resumo: string;
}

const tipos = ["Todos", "Relatório Institucional", "Nota Técnica", "Proposta de Aprimoramento", "Documento Histórico", "Apresentação Institucional"];

const publicacoes: Publicacao[] = [
  {
    titulo: "Relatório Institucional APOGESP 2023",
    ano: "2023",
    tipo: "Relatório Institucional",
    resumo: "Panorama completo da atuação da APOGESP e dos APPGGs, incluindo dados sobre distribuição, áreas de atuação e realizações.",
  },
  {
    titulo: "Nota Técnica: Proposta de Aprimoramento da Carreira",
    ano: "2023",
    tipo: "Nota Técnica",
    resumo: "Análise das condições atuais e propostas em temas como remuneração, progressão funcional e desenvolvimento profissional.",
  },
  {
    titulo: "APPGGs em Números: Perfil e Distribuição",
    ano: "2022",
    tipo: "Relatório Institucional",
    resumo: "Levantamento quantitativo e qualitativo dos integrantes, incluindo formação, tempo de serviço e perfil demográfico.",
  },
  {
    titulo: "Memória Institucional: 15 Anos da Carreira",
    ano: "2022",
    tipo: "Documento Histórico",
    resumo: "Registro dos principais marcos desde a criação em 2007, com depoimentos, documentos e análise da evolução institucional.",
  },
  {
    titulo: "Proposta de Política de Desenvolvimento de Pessoas",
    ano: "2021",
    tipo: "Proposta de Aprimoramento",
    resumo: "Diretrizes para capacitação, formação continuada e desenvolvimento de competências dos integrantes da carreira.",
  },
  {
    titulo: "Apresentação Institucional da APOGESP",
    ano: "2023",
    tipo: "Apresentação Institucional",
    resumo: "Material de apresentação para interlocução com órgãos públicos, entidades parceiras e imprensa.",
  },
];

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
        subtitle="Relatórios, notas técnicas, propostas e documentos de referência institucional."
      />

      <section className="py-24 md:py-32 bg-card">
        <div className="container">
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
              <FadeIn key={pub.titulo} delay={i * 0.06}>
                <article className="py-8 border-b border-luxury-border group hover:bg-card-hover transition-colors duration-300 -mx-4 px-4">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-start gap-4 flex-1">
                      <FileText size={16} strokeWidth={1.5} className="text-gold mt-1 shrink-0" />
                      <div>
                        <h3 className="text-base font-display font-normal text-foreground group-hover:text-gold transition-colors duration-300">{pub.titulo}</h3>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-[10px] font-medium tracking-luxury uppercase text-text-caption">{pub.tipo}</span>
                          <span className="text-luxury-border">·</span>
                          <span className="text-[11px] font-light text-text-caption">{pub.ano}</span>
                        </div>
                        <p className="text-sm font-light text-text-body mt-3 leading-relaxed max-w-2xl">{pub.resumo}</p>
                      </div>
                    </div>
                    <button className="shrink-0 p-3 text-luxury-border hover:text-gold transition-colors duration-300" title="Download">
                      <Download size={16} strokeWidth={1.5} />
                    </button>
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

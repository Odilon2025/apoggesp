import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
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
    resumo: "Panorama completo da atuação da APOGESP e dos APPGGs ao longo de 2023, incluindo dados sobre distribuição dos profissionais, áreas de atuação e principais realizações da associação.",
  },
  {
    titulo: "Nota Técnica: Proposta de Aprimoramento da Carreira de APPGG",
    ano: "2023",
    tipo: "Nota Técnica",
    resumo: "Análise das condições atuais da carreira e propostas de aprimoramento em temas como remuneração, progressão funcional, lotação e desenvolvimento profissional.",
  },
  {
    titulo: "APPGGs em Números: Perfil e Distribuição na Administração Municipal",
    ano: "2022",
    tipo: "Relatório Institucional",
    resumo: "Levantamento quantitativo e qualitativo dos integrantes da carreira, incluindo formação acadêmica, tempo de serviço, secretarias de lotação e perfil demográfico.",
  },
  {
    titulo: "Memória Institucional: 15 Anos da Carreira de APPGG",
    ano: "2022",
    tipo: "Documento Histórico",
    resumo: "Registro histórico dos principais marcos da carreira desde sua criação em 2007, incluindo depoimentos, documentos e análise da evolução institucional.",
  },
  {
    titulo: "Proposta de Política de Desenvolvimento de Pessoas para APPGGs",
    ano: "2021",
    tipo: "Proposta de Aprimoramento",
    resumo: "Documento propositivo com diretrizes para capacitação, formação continuada e desenvolvimento de competências dos integrantes da carreira.",
  },
  {
    titulo: "Apresentação Institucional da APOGESP",
    ano: "2023",
    tipo: "Apresentação Institucional",
    resumo: "Material de apresentação da associação para interlocução com órgãos públicos, entidades parceiras e imprensa.",
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
        title="Publicações"
        subtitle="Biblioteca institucional da APOGESP: relatórios, notas técnicas, propostas e documentos de referência."
      />

      <section className="py-16 bg-card">
        <div className="container">
          <SectionTitle title="Acervo Documental" />

          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Tipo</label>
              <select
                value={tipoFiltro}
                onChange={(e) => setTipoFiltro(e.target.value)}
                className="text-sm border border-border rounded px-3 py-1.5 bg-card text-foreground"
              >
                {tipos.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Ano</label>
              <select
                value={anoFiltro}
                onChange={(e) => setAnoFiltro(e.target.value)}
                className="text-sm border border-border rounded px-3 py-1.5 bg-card text-foreground"
              >
                {anos.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Lista */}
          <div className="space-y-4">
            {filtradas.map((pub) => (
              <article key={pub.titulo} className="p-5 border border-border rounded bg-card hover:border-accent/30 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <FileText size={20} className="text-accent mt-0.5 shrink-0" />
                    <div>
                      <h3 className="text-base font-semibold text-foreground font-serif">{pub.titulo}</h3>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded">{pub.tipo}</span>
                        <span className="text-xs text-muted-foreground">{pub.ano}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{pub.resumo}</p>
                    </div>
                  </div>
                  <button className="shrink-0 p-2 text-muted-foreground hover:text-accent transition-colors" title="Download">
                    <Download size={18} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filtradas.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">Nenhuma publicação encontrada com os filtros selecionados.</p>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default PublicacoesPage;

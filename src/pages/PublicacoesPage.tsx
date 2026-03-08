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
  autores?: string;
}

const tipos = ["Todos", "Caderno", "Artigo", "Nota Técnica", "Proposta de Aprimoramento", "Documento Histórico"];

const publicacoes: Publicacao[] = [
  {
    titulo: "Caderno Gestão Pública em Rede — 1ª Edição",
    ano: "2025",
    tipo: "Caderno",
    resumo: "Publicação comemorativa dos 10 anos da carreira de APPGG, com 9 artigos organizados em três eixos: capacidades transversais, gestão pública como prática histórica e problemas complexos. Produzido pela Assessoria de Carreiras Transversais (ACT) da SEGES.",
  },
  {
    titulo: "O Potencial das Ciências Comportamentais para a Melhoria dos Serviços Públicos",
    ano: "2025",
    tipo: "Artigo",
    resumo: "Analisa o uso de ciências comportamentais e design centrado no usuário em políticas municipais, com casos do Lab11 em alimentação escolar, absenteísmo, COVID-19, SP156, MEI Nota Fácil e Simplifica AI.",
    autores: "Brenda Machado, Bruno Martinelli Fonseca",
  },
  {
    titulo: "O Sistema SMAE: Um Patrimônio Feito Sob Medida",
    ano: "2025",
    tipo: "Artigo",
    resumo: "Estudo de caso sobre o desenvolvimento e implementação do Sistema de Monitoramento e Acompanhamento Estratégico na Prefeitura, com metodologia ágil, software livre e parceria FGV. Cinco módulos e 500+ usuários.",
  },
  {
    titulo: "Arquivos, Memória e Educação: Gestão Documental na Rede Municipal de Ensino",
    ano: "2025",
    tipo: "Artigo",
    resumo: "Relata a construção da política e da governança de gestão documental na Rede Municipal de Ensino de São Paulo.",
  },
  {
    titulo: "Nova Gestão Pública e Gestão da Mudança: O Arquivo Histórico Municipal (2021–2024)",
    ano: "2025",
    tipo: "Artigo",
    resumo: "Estudo sobre a modernização do Arquivo Histórico Municipal de São Paulo, evidenciando os limites da NPM à cultura organizacional e os desafios de gestão da mudança durante a pandemia.",
  },
  {
    titulo: "Um Lugar para o Planejar: Assessoria de Planejamento na SMS de São Paulo",
    ano: "2025",
    tipo: "Artigo",
    resumo: "Registra a importância do planejamento na área da saúde e como este foi sendo institucionalizado ao longo dos anos na Secretaria Municipal da Saúde.",
  },
  {
    titulo: "O Programa de Residência em Gestão Pública da Prefeitura de São Paulo",
    ano: "2025",
    tipo: "Artigo",
    resumo: "Apresenta o programa que traz profissionais com vínculo flexível e tempo determinado para contribuir com inovações, observar o funcionamento do setor público e trazer visões renovadas.",
  },
  {
    titulo: "Problemas Complexos e Intersetorialidade: A Política da Primeira Infância",
    ano: "2025",
    tipo: "Artigo",
    resumo: "Relata como APPGGs estabeleceram conexões entre diferentes atores institucionais, rompendo silos setoriais na política da primeira infância no município.",
  },
  {
    titulo: "Atuação Multinível no I Plano Municipal de Educação Ambiental",
    ano: "2025",
    tipo: "Artigo",
    resumo: "Analisa como a teoria de múltiplos fluxos de John Kingdon explica a criação do I Plano Municipal de Educação Ambiental e a participação de APPGGs em sua construção.",
  },
  {
    titulo: "O APPGG como Articulador Intersetorial: Recuperação de Fachadas em São Paulo",
    ano: "2025",
    tipo: "Artigo",
    resumo: "Lições aprendidas na reformulação da política de incentivo à recuperação de fachadas, analisando o papel de burocracia de médio escalão e articulação intersetorial.",
  },
  {
    titulo: "Nota Técnica: Proposta de Aprimoramento da Carreira de APPGG",
    ano: "2023",
    tipo: "Nota Técnica",
    resumo: "Análise das condições da carreira e propostas em temas como remuneração, progressão funcional, lotação e desenvolvimento profissional.",
  },
  {
    titulo: "Proposta de Política de Desenvolvimento de Pessoas para APPGGs",
    ano: "2021",
    tipo: "Proposta de Aprimoramento",
    resumo: "Diretrizes para capacitação, formação continuada e desenvolvimento de competências dos integrantes da carreira.",
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
        subtitle="Acervo documental da carreira de APPGG: cadernos, artigos, notas técnicas e propostas institucionais."
      />

      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          {/* Destaque principal */}
          <FadeIn>
            <div className="border border-luxury-border p-8 md:p-12 mb-16">
              <span className="text-[10px] font-medium tracking-luxury uppercase text-gold block mb-4">Destaque</span>
              <h3 className="text-xl md:text-2xl font-display font-normal text-foreground">Caderno Gestão Pública em Rede — 1ª Edição</h3>
              <p className="text-sm font-light text-text-body mt-3 leading-relaxed max-w-3xl">
                Publicação comemorativa dos 10 anos da carreira, com 9 artigos que registram contribuições dos APPGGs em inovação, planejamento, intersetorialidade e gestão institucional. Organizado pela Assessoria de Carreiras Transversais (ACT) da Secretaria Municipal de Gestão.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <span className="text-[11px] font-light text-text-caption">Dezembro 2025 · Prefeitura de São Paulo</span>
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

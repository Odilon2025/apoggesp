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
    resumo: "A primeira publicação coletiva dos APPGGs reúne nove artigos escritos por quem esteve na linha de frente. Organizado pela ACT/SEGES para celebrar uma década de carreira, o Caderno não é um catálogo de realizações — é um exercício de reflexão crítica sobre o que foi construído, o que funcionou e o que ainda precisa ser feito.",
  },
  {
    titulo: "O Potencial das Ciências Comportamentais para a Melhoria dos Serviços Públicos",
    ano: "2025",
    tipo: "Artigo",
    resumo: "Como nudges, design centrado no usuário e experimentos controlados transformaram serviços públicos em São Paulo — da alimentação escolar ao aplicativo de notas fiscais para microempreendedores. Um mapa prático de como a ciência comportamental entra na máquina pública.",
    autores: "Brenda Machado, Bruno Martinelli Fonseca",
  },
  {
    titulo: "O Sistema SMAE: Um Patrimônio Feito Sob Medida",
    ano: "2025",
    tipo: "Artigo",
    resumo: "A história de como um grupo de APPGGs construiu, junto com a FGV, o sistema que deu à Prefeitura de São Paulo a capacidade de enxergar suas próprias metas. Cinco módulos, 500 usuários e um decreto que o tornou permanente.",
  },
  {
    titulo: "Arquivos, Memória e Educação: Gestão Documental na Rede Municipal de Ensino",
    ano: "2025",
    tipo: "Artigo",
    resumo: "A maior rede de ensino municipal do país precisava de uma política documental. Este artigo conta como ela foi construída — integrando arquivos, memória institucional e educação em um sistema de governança que funciona escola a escola.",
  },
  {
    titulo: "Nova Gestão Pública e Gestão da Mudança: O Arquivo Histórico Municipal (2021–2024)",
    ano: "2025",
    tipo: "Artigo",
    resumo: "Um relato honesto sobre os limites da modernização quando ela encontra a cultura organizacional. O caso do Arquivo Histórico Municipal mostra que gestão da mudança durante uma pandemia exige mais do que manuais — exige escuta.",
  },
  {
    titulo: "Um Lugar para o Planejar: Assessoria de Planejamento na SMS de São Paulo",
    ano: "2025",
    tipo: "Artigo",
    resumo: "Como o planejamento foi sendo institucionalizado na Secretaria Municipal da Saúde — e por que ter um lugar dedicado a planejar é, paradoxalmente, uma das inovações mais difíceis de implementar na gestão pública.",
  },
  {
    titulo: "O Programa de Residência em Gestão Pública da Prefeitura de São Paulo",
    ano: "2025",
    tipo: "Artigo",
    resumo: "Um programa que abre a Prefeitura para profissionais de fora — e que, ao fazer isso, renova perspectivas internas. Este artigo apresenta o desenho, os aprendizados e as tensões de um mecanismo que tenta tornar a gestão pública permeável sem perder estabilidade.",
  },
  {
    titulo: "Problemas Complexos e Intersetorialidade: A Política da Primeira Infância",
    ano: "2025",
    tipo: "Artigo",
    resumo: "Quando o problema não cabe em uma secretaria, quem costura a resposta? Este artigo examina como APPGGs atuaram como articuladores na política da primeira infância — rompendo silos e construindo linguagem comum entre áreas que historicamente não conversavam.",
  },
  {
    titulo: "Atuação Multinível no I Plano Municipal de Educação Ambiental",
    ano: "2025",
    tipo: "Artigo",
    resumo: "Usando a teoria de múltiplos fluxos de John Kingdon, este artigo analisa como a janela de oportunidade para o primeiro plano de educação ambiental de São Paulo se abriu — e como APPGGs ajudaram a atravessá-la.",
  },
  {
    titulo: "O APPGG como Articulador Intersetorial: Recuperação de Fachadas em São Paulo",
    ano: "2025",
    tipo: "Artigo",
    resumo: "Lições aprendidas na reformulação de uma política aparentemente simples — recuperar fachadas — que se revelou um caso de estudo sobre articulação intersetorial, burocracia de médio escalão e os caminhos tortuosos entre a intenção e o resultado.",
  },
  {
    titulo: "Nota Técnica: Proposta de Aprimoramento da Carreira de APPGG",
    ano: "2023",
    tipo: "Nota Técnica",
    resumo: "Diagnóstico das condições da carreira e propostas concretas em remuneração, progressão funcional, critérios de lotação e desenvolvimento profissional. Um documento que traduz reivindicações em argumentos técnicos.",
  },
  {
    titulo: "Proposta de Política de Desenvolvimento de Pessoas para APPGGs",
    ano: "2021",
    tipo: "Proposta de Aprimoramento",
    resumo: "Diretrizes para capacitação continuada e desenvolvimento de competências — porque uma carreira transversal precisa de formação que acompanhe a amplitude de seus desafios.",
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
        subtitle="O que a carreira de APPGG pensa, documenta e publica. Artigos, notas técnicas e propostas — escritos por quem faz gestão pública, não por quem teoriza sobre ela."
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

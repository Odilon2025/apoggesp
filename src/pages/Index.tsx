import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";
import { ArrowRight, FileText } from "lucide-react";

const timelineItems = [
  { year: "2015", text: "Criação da carreira de APPGG pela Lei Municipal nº 16.193" },
  { year: "2016", text: "Ingresso dos primeiros Analistas na Prefeitura de São Paulo" },
  { year: "2017", text: "Atuação no Programa de Metas 2017–2020 e estruturação institucional" },
  { year: "2018", text: "Criação do Lab11 — Laboratório de Inovação Pública na SEGES" },
  { year: "2021", text: "Portaria SEGES nº 13/2021 prioriza alocação de APPGGs em projetos estratégicos" },
  { year: "2022", text: "Desenvolvimento do SMAE em parceria com a FGV" },
  { year: "2024", text: "SMAE institucionalizado pelo Decreto nº 63.336/2024 com 500+ usuários" },
  { year: "2025", text: "Publicação do Caderno Gestão Pública em Rede — 10 anos da carreira" },
];

const atuacaoDestaques = [
  { area: "Inovação", desc: "Ciências comportamentais aplicadas à alimentação escolar, redução de absenteísmo e prevenção durante a COVID-19 pelo Lab11." },
  { area: "Planejamento", desc: "Desenvolvimento do SMAE — sistema de monitoramento estratégico com 5 módulos e 500+ usuários ativos na Prefeitura." },
  { area: "Primeira Infância", desc: "Articulação intersetorial para a política da primeira infância, rompendo silos entre secretarias." },
];

const publicacoesRecentes = [
  { titulo: "Caderno Gestão Pública em Rede — 1ª Edição", tipo: "Publicação", ano: "2025" },
  { titulo: "O Potencial das Ciências Comportamentais para Serviços Públicos", tipo: "Artigo", ano: "2025" },
  { titulo: "O Sistema SMAE: Um Patrimônio Feito Sob Medida", tipo: "Artigo", ano: "2025" },
];

const stats = [
  { num: "100+", label: "analistas em exercício" },
  { num: "500+", label: "usuários do SMAE" },
  { num: "10", label: "anos de carreira" },
];

const Index = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative grain overflow-hidden" style={{ background: "var(--hero-gradient)" }}>
        <div className="container relative z-10 py-28 md:py-40 lg:py-48">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
            <div className="lg:col-span-8">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-[10px] font-sans font-medium tracking-luxury uppercase text-primary-foreground/35 block mb-8"
              >
                Associação dos APPGGs — São Paulo
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-normal text-primary-foreground leading-[1.05] text-balance"
              >
                Políticas Públicas,{" "}
                <em className="italic text-gold-muted">Gestão</em>{" "}
                Governamental
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="mt-8 text-base md:text-lg text-primary-foreground/50 font-light max-w-lg leading-relaxed"
              >
                Dez anos fortalecendo a administração municipal de São Paulo por meio de análise técnica, articulação intersetorial e compromisso com o interesse público.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
                className="mt-10 flex flex-wrap items-center gap-6"
              >
                <Link
                  to="/carreira"
                  className="group inline-flex items-center gap-2 text-sm font-light text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300"
                >
                  <span>Conheça a carreira</span>
                  <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <span className="text-primary-foreground/15">|</span>
                <Link
                  to="/publicacoes"
                  className="group inline-flex items-center gap-2 text-sm font-light text-primary-foreground/50 hover:text-primary-foreground transition-colors duration-300"
                >
                  <span>Publicações</span>
                  <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            </div>

            {/* Stats column */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="space-y-8 lg:border-l lg:border-primary-foreground/10 lg:pl-10"
              >
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                  >
                    <span className="text-3xl md:text-4xl font-display font-normal text-gold-muted">{stat.num}</span>
                    <span className="block text-[11px] font-light text-primary-foreground/40 mt-1 tracking-wide">{stat.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Citação editorial */}
      <section className="py-20 md:py-24 bg-card">
        <div className="container">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <blockquote className="text-lg md:text-xl font-display font-normal text-foreground leading-relaxed italic">
                "Em uma cidade da dimensão e diversidade de São Paulo, a gestão pública é, inevitavelmente, uma obra em rede. Os APPGGs se somam como agentes que ajudam a integrar políticas, territórios e pessoas."
              </blockquote>
              <div className="luxury-divider mt-6 mb-4" />
              <cite className="text-[11px] font-light text-text-caption not-italic tracking-wide">
                Marcela Arruda — Secretária Municipal de Gestão
              </cite>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Destaques - Three pillars */}
      <section className="py-24 md:py-32 bg-section-alt">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-luxury-border">
            {[
              { title: "Capacidades Transversais", desc: "Atuação integrada em todos os órgãos da Prefeitura, fortalecendo a gestão pública com profundidade técnica e sensibilidade para temas estratégicos." },
              { title: "Valor Público", desc: "Competências a serviço de projetos e políticas que geram valor para os paulistanos — da formulação à implementação de soluções concretas." },
              { title: "Gestão em Rede", desc: "Articulação intersetorial, conexão entre diferentes atores e construção de instituições e políticas duradouras baseadas em evidências." },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="bg-card p-10 md:p-12 h-full">
                  <span className="text-[10px] font-medium tracking-luxury uppercase text-gold block mb-6">0{i + 1}</span>
                  <h3 className="text-xl font-display font-normal text-foreground mb-4">{item.title}</h3>
                  <p className="text-sm font-light text-text-body leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Atuação */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <SectionTitle
                label="Impacto"
                title="Atuação em Políticas Públicas"
                subtitle="Contribuições documentadas dos APPGGs para a gestão municipal."
              />
              <Link
                to="/atuacao"
                className="group inline-flex items-center gap-2 text-sm font-light text-accent hover:text-foreground transition-colors duration-300 mt-2"
              >
                <span>Ver todos os casos</span>
                <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
            <div className="lg:col-span-8 space-y-px">
              {atuacaoDestaques.map((item, i) => (
                <FadeIn key={item.area} delay={i * 0.1}>
                  <div className="p-8 bg-section-alt border-b border-luxury-border group hover:bg-card-hover transition-colors duration-300">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <span className="text-[10px] font-medium tracking-luxury uppercase text-gold">{item.area}</span>
                        <p className="mt-3 text-sm font-light text-text-body leading-relaxed">{item.desc}</p>
                      </div>
                      <ArrowRight size={14} strokeWidth={1.5} className="text-luxury-border group-hover:text-gold transition-colors duration-300 mt-1 shrink-0" />
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Publicações */}
      <section className="py-24 md:py-32 bg-section-alt">
        <div className="container">
          <SectionTitle label="Biblioteca" title="Publicações Recentes" />
          <div className="mt-4 space-y-0 border-t border-luxury-border">
            {publicacoesRecentes.map((pub, i) => (
              <FadeIn key={pub.titulo} delay={i * 0.08}>
                <Link
                  to="/publicacoes"
                  className="flex items-center justify-between py-6 border-b border-luxury-border group"
                >
                  <div className="flex items-start gap-4">
                    <FileText size={16} strokeWidth={1.5} className="text-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-light text-foreground group-hover:text-gold transition-colors duration-300">{pub.titulo}</p>
                      <p className="text-[11px] font-light text-text-caption mt-1">{pub.tipo} · {pub.ano}</p>
                    </div>
                  </div>
                  <ArrowRight size={14} strokeWidth={1.5} className="text-luxury-border group-hover:text-gold transition-all duration-300 group-hover:translate-x-1 shrink-0" />
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <SectionTitle label="História" title="Marcos da Carreira" />
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-0">
                {timelineItems.map((item, i) => (
                  <FadeIn key={item.year} delay={i * 0.06}>
                    <div className="py-5 border-b border-luxury-border">
                      <span className="text-xs font-display text-gold">{item.year}</span>
                      <p className="text-sm font-light text-text-body mt-1.5 leading-relaxed">{item.text}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prefácio CTA */}
      <section className="py-24 md:py-32 bg-section-alt">
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <FadeIn>
              <span className="text-[10px] font-medium tracking-luxury uppercase text-text-caption block mb-6">Prefácio</span>
              <h2 className="text-2xl md:text-3xl font-display font-normal text-foreground leading-tight text-balance italic">
                "A carreira não atua como uma coisa só, mas por meio de servidores que se engajam em políticas e projetos com objetivos de interesse público."
              </h2>
              <div className="luxury-divider mt-6 mb-4" />
              <p className="text-[11px] font-light text-text-caption tracking-wide">
                Cibele Franzese — Professora da FGV EAESP
              </p>
              <Link
                to="/apogesp"
                className="group inline-flex items-center gap-2 text-sm font-light text-accent hover:text-foreground transition-colors duration-300 mt-8"
              >
                <span>Sobre a APOGESP</span>
                <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";
import { ArrowRight, FileText } from "lucide-react";

const timelineItems = [
  { year: "2007", text: "Criação da carreira pela Lei Municipal nº 14.591" },
  { year: "2008", text: "Primeiro concurso público para a carreira" },
  { year: "2012", text: "Fundação da APOGESP" },
  { year: "2015", text: "Consolidação em secretarias estratégicas" },
  { year: "2019", text: "Primeiro relatório institucional da APOGESP" },
  { year: "2023", text: "Ampliação em inovação e governo digital" },
];

const atuacaoDestaques = [
  { area: "Saúde", desc: "Reestruturação da rede de atenção básica com foco em territorialização e indicadores de desempenho." },
  { area: "Educação", desc: "Formulação de políticas de avaliação e monitoramento da qualidade do ensino municipal." },
  { area: "Gestão", desc: "Implantação de sistemas de governança e transformação digital na administração municipal." },
];

const publicacoesRecentes = [
  { titulo: "Relatório Institucional 2023", tipo: "Relatório", ano: "2023" },
  { titulo: "Nota Técnica: Aprimoramento da Carreira", tipo: "Nota Técnica", ano: "2023" },
  { titulo: "APPGGs em Números: Perfil e Distribuição", tipo: "Relatório", ano: "2022" },
];

const stats = [
  { num: "~200", label: "profissionais ativos" },
  { num: "20+", label: "órgãos de atuação" },
  { num: "16", label: "anos de carreira" },
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
                Fortalecendo a administração municipal de São Paulo por meio de análise técnica e excelência institucional.
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

      {/* Destaques - Three pillars */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-luxury-border">
            {[
              { title: "Carreira Estratégica", desc: "Profissionais de nível superior dedicados à análise e formulação de políticas públicas na administração municipal." },
              { title: "Atuação Transversal", desc: "Presença em mais de 20 órgãos, contribuindo em saúde, educação, gestão, planejamento e inovação." },
              { title: "Produção Técnica", desc: "Relatórios, notas técnicas e propostas que subsidiam decisões estratégicas de governo." },
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
      <section className="py-24 md:py-32 bg-section-alt">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <SectionTitle
                label="Impacto"
                title="Atuação em Políticas Públicas"
                subtitle="Contribuições concretas dos APPGGs para a gestão municipal."
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
                  <div className="p-8 bg-card border-b border-luxury-border group hover:bg-card-hover transition-colors duration-300">
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
      <section className="py-24 md:py-32 bg-card">
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
      <section className="py-24 md:py-32 bg-section-alt">
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

      {/* APOGESP CTA */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <FadeIn>
              <span className="text-[10px] font-medium tracking-luxury uppercase text-text-caption block mb-6">Institucional</span>
              <h2 className="text-2xl md:text-3xl font-display font-normal text-foreground leading-tight text-balance">
                Uma associação a serviço da gestão pública
              </h2>
              <div className="luxury-divider mt-6" />
              <p className="mt-6 text-sm font-light text-text-body leading-relaxed">
                A APOGESP atua na valorização da carreira, na produção de conhecimento e na articulação institucional com governo e sociedade civil desde 2012.
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

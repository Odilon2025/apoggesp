import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";
import { ArrowRight, FileText, TrendingUp, Users } from "lucide-react";

const timelineItems = [
  { year: "2015", text: "A Lei Municipal nº 16.193 cria a carreira de APPGG — uma aposta na profissionalização da gestão pública paulistana" },
  { year: "2016", text: "Os primeiros analistas tomam posse e começam a ocupar secretarias por toda a cidade" },
  { year: "2017", text: "A carreira assume papel central no Programa de Metas 2017–2020, traduzindo compromissos em entregas mensuráveis" },
  { year: "2018", text: "Nasce o Lab11 — o laboratório que levou ciências comportamentais para dentro da máquina pública" },
  { year: "2021", text: "A Portaria SEGES nº 13 reconhece formalmente o que já era prática: APPGGs lideram projetos estratégicos" },
  { year: "2022", text: "Começa o desenvolvimento do SMAE, o sistema que daria à Prefeitura olhos sobre suas próprias metas" },
  { year: "2024", text: "O Decreto nº 63.336 institucionaliza o SMAE — 500 servidores já o utilizam diariamente" },
  { year: "2025", text: "O Caderno Gestão Pública em Rede registra, pela primeira vez, uma década de contribuições em nove artigos" },
];

const atuacaoDestaques = [
  { area: "Inovação", desc: "No Lab11, APPGGs provaram que nudges bem desenhados podem fazer crianças comerem melhor na escola, cidadãos usarem máscara no transporte público e microempreendedores emitirem notas fiscais sem erro." },
  { area: "Planejamento", desc: "O SMAE não é apenas um software — é a memória institucional da Prefeitura. Cinco módulos, 500 usuários e um decreto que o tornou patrimônio público permanente." },
  { area: "Primeira Infância", desc: "Quando a política de primeira infância exigiu que saúde, educação e assistência social falassem a mesma língua, foram APPGGs que construíram as pontes entre as secretarias." },
];

const publicacoesRecentes = [
  { titulo: "Caderno Gestão Pública em Rede — 1ª Edição", tipo: "Publicação", ano: "2025" },
  { titulo: "O Potencial das Ciências Comportamentais para Serviços Públicos", tipo: "Artigo", ano: "2025" },
  { titulo: "O Sistema SMAE: Um Patrimônio Feito Sob Medida", tipo: "Artigo", ano: "2025" },
];

const stats = [
  { num: "169", label: "analistas em exercício" },
  { num: "22", label: "órgãos e entidades" },
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
                Uma década construindo capacidade institucional na maior cidade da América Latina. Onde outros veem burocracia, nós vemos a engenharia silenciosa que faz uma metrópole de 12 milhões funcionar.
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
                "Em uma cidade de 12 milhões de habitantes, a gestão pública é, inevitavelmente, uma obra em rede. Os APPGGs se somam como agentes que ajudam a integrar políticas, territórios e pessoas."
              </blockquote>
              <div className="luxury-divider mt-6 mb-4" />
              <cite className="text-[11px] font-light text-text-caption not-italic tracking-wide">
                APOGESP
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
              { title: "Capacidades Transversais", desc: "Presentes em praticamente todos os órgãos da Prefeitura, os APPGGs não pertencem a uma secretaria — pertencem à cidade. Essa transversalidade é, ao mesmo tempo, seu maior desafio e sua maior força." },
              { title: "Valor Público", desc: "Cada projeto documentado neste portal representa horas de análise, articulação e implementação a serviço de uma pergunta simples: como gerar mais valor para os paulistanos com os recursos disponíveis?" },
              { title: "Gestão em Rede", desc: "Políticas públicas não respeitam organogramas. Os APPGGs aprenderam a construir pontes entre secretarias, entre níveis de governo e entre o planejado e o executado." },
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
                title="Onde a Teoria Encontra a Rua"
                subtitle="Três exemplos de como o trabalho técnico dos APPGGs se traduz em mudanças concretas na vida da cidade."
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
              <SectionTitle label="Cronologia" title="Uma Carreira que se Construiu Fazendo" />
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
              <span className="text-[10px] font-medium tracking-luxury uppercase text-text-caption block mb-6">Mensagem da Presidente</span>
              <h2 className="text-2xl md:text-3xl font-display font-normal text-foreground leading-tight text-balance italic">
                "Fortalecer a carreira de APPGG é fortalecer a capacidade do município de entregar políticas públicas de qualidade para quem mais precisa."
              </h2>
              <div className="luxury-divider mt-6 mb-4" />
              <p className="text-[11px] font-light text-text-caption tracking-wide">
                Maria Camila Florêncio — Presidente da APOGESP
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

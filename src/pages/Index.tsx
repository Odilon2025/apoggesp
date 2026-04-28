import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";
import { ArrowRight, FileText, TrendingUp, Users, LineChart } from "lucide-react";

const timelineItems = [
  { year: "2015", text: "A Lei Municipal nº 16.193 cria a carreira de APPGG — uma aposta na profissionalização da gestão pública paulistana" },
  { year: "2016", text: "Os primeiros analistas tomam posse e começam a ocupar secretarias por toda a cidade" },
          { year: "2017", text: "A carreira passa a colaborar com o Programa de Metas 2017–2020, apoiando a tradução de compromissos em entregas mensuráveis" },
  { year: "2018", text: "Em parceria com a SMIT, nasce o Lab11 — laboratório que aproxima as ciências comportamentais da gestão municipal" },
  { year: "2021", text: "A Portaria SEGES nº 13 reconhece a participação relevante dos APPGGs em projetos estratégicos prioritários" },
  { year: "2022", text: "Em colaboração com a FGV e sob coordenação da SEPLAN, começa o desenvolvimento do SMAE" },
  { year: "2024", text: "O Decreto nº 63.336 institucionaliza o SMAE — 500 servidores já o utilizam diariamente" },
  { year: "2025", text: "O Caderno Gestão Pública em Rede registra, pela primeira vez, uma década de colaboração em nove artigos" },
];

const atuacaoDestaques = [
  { area: "Inovação", desc: "No Lab11, APPGGs colaboraram com equipes técnicas e parceiros para mostrar que nudges bem desenhados podem apoiar políticas de alimentação escolar, saúde pública no transporte e formalização de microempreendedores." },
  { area: "Planejamento", desc: "O SMAE — desenvolvido em parceria com a FGV e sob diretrizes da administração superior — tornou-se memória institucional da Prefeitura, com cinco módulos, 500 usuários e decreto que o consolidou como patrimônio público permanente." },
  { area: "Primeira Infância", desc: "Quando a política de primeira infância exigiu integração entre saúde, educação e assistência social, APPGGs participaram da articulação entre secretarias, em colaboração com as lideranças de cada pasta." },
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
                Uma década colaborando com a construção de capacidade institucional na maior cidade da América Latina — sempre em parceria com outras carreiras e dentro das prioridades definidas pela administração superior.
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

      {/* Campanhas — Impacto curto */}
      <section className="py-20 md:py-24 bg-card">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-luxury-border">
            <FadeIn>
              <Link to="/campanha-salarial" className="block bg-card p-10 md:p-12 h-full group hover:bg-card-hover transition-colors duration-300">
                <TrendingUp size={20} strokeWidth={1.5} className="text-gold mb-5" />
                <span className="text-[10px] font-medium tracking-luxury uppercase text-destructive block mb-3">Campanha 2026</span>
                <h3 className="text-xl md:text-2xl font-display font-normal text-foreground mb-3 leading-tight">Campanha Salarial</h3>
                <p className="text-sm font-light text-text-body leading-relaxed mb-6">
                  O APPGG inicia com R$ 13.208. O EPPGG federal começa com R$ 20.000 em 2026. Mesma missão, 34% de defasagem. É hora de corrigir.
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-light text-accent group-hover:text-foreground transition-colors duration-300">
                  Conheça os números <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Link to="/campanha-nomeacao" className="block bg-card p-10 md:p-12 h-full group hover:bg-card-hover transition-colors duration-300">
                <Users size={20} strokeWidth={1.5} className="text-gold mb-5" />
                <span className="text-[10px] font-medium tracking-luxury uppercase text-destructive block mb-3">Nomeação Já</span>
                <h3 className="text-xl md:text-2xl font-display font-normal text-foreground mb-3 leading-tight">53 APPGGs Aguardam Nomeação</h3>
                <p className="text-sm font-light text-text-body leading-relaxed mb-6">
                  242 candidatos por vaga. 144 classificados. 80 nomeados. Restam 53 aprovados prontos — e 102 cargos vagos esperando por eles.
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-light text-accent group-hover:text-foreground transition-colors duration-300">
                  Entenda a urgência <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Destaques - Three pillars */}
      <section className="py-24 md:py-32 bg-section-alt">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-luxury-border">
            {[
              { title: "Capacidades Transversais", desc: "Presentes em praticamente todos os órgãos da Prefeitura, os APPGGs colaboram com diferentes secretarias e carreiras, sempre a serviço das prioridades fixadas pela administração superior." },
              { title: "Valor Público", desc: "Cada projeto documentado neste portal envolve análise, articulação e participação relevante em iniciativas conduzidas em conjunto com gestores, técnicos de outras carreiras e parceiros institucionais." },
              { title: "Gestão em Rede", desc: "Políticas públicas não respeitam organogramas. Os APPGGs colaboram com a construção de pontes entre secretarias, entre níveis de governo e entre o planejado e o executado, dentro dos Planos de Atuação Institucional." },
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
                label="Colaboração"
                title="Onde a Teoria Encontra a Rua"
                subtitle="Três exemplos de como a contribuição técnica dos APPGGs apoia entregas conduzidas em conjunto com outras carreiras e com as lideranças da administração."
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

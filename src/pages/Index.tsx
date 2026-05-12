import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";
import { ArrowRight, FileText, TrendingUp, Users, LineChart } from "lucide-react";
import { snapshot } from "@/data/snapshot";

const timelineItems = [
  { year: "2015", text: "A Lei Municipal nº 16.193 cria a carreira de APPGG — a primeira carreira transversal de nível superior da administração direta paulistana." },
  { year: "2016–17", text: "Os primeiros concursados tomam posse e começam a ocupar dezenas de secretarias da administração municipal." },
  { year: "2021", text: "A Portaria SEGES nº 13 formaliza a alocação prioritária dos APPGGs em projetos estratégicos, Programa de Metas e planejamento orçamentário." },
  { year: "2023", text: "Realização do segundo concurso público da carreira, ampliando o quadro após quase uma década do primeiro certame." },
  { year: "2024", text: "Primeira leva de posse do segundo concurso: 50 novos APPGGs ingressam na administração municipal em julho." },
  { year: "2026", text: "Segunda posse do segundo concurso: 30 novos APPGGs reforçam o quadro da carreira." },
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
  { num: String(snapshot.total), label: "analistas em exercício" },
  { num: String(snapshot.totalOrgaos), label: "órgãos e entidades" },
  { num: "11", label: "anos de carreira" },
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
                Uma década contribuindo para a capacidade institucional da maior cidade da América Latina.
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
                <p className="text-[9px] font-light tracking-luxury uppercase text-primary-foreground/30 pt-2">
                  Dados de {snapshot.mesReferencia}
                </p>
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

      {/* Observatório das Evasões */}
      <section className="py-20 md:py-24 bg-section-alt">
        <div className="container">
          <FadeIn>
            <Link
              to="/observatorio-evasoes"
              className="block bg-card p-10 md:p-14 group hover:bg-card-hover transition-colors duration-300 border-l-2 border-gold"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-8">
                  <LineChart size={22} strokeWidth={1.5} className="text-gold mb-5" />
                  <span className="text-[10px] font-medium tracking-luxury uppercase text-gold block mb-3">
                    Pesquisa institucional
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-normal text-foreground mb-4 leading-tight">
                    Observatório das Evasões
                  </h3>
                  <p className="text-sm md:text-base font-light text-text-body leading-relaxed max-w-2xl">
                    Quem deixa a carreira de APPGG, por quais caminhos e com quais implicações? Um esforço de memória institucional sobre exonerações, licenças para tratar de interesses particulares, cedências e aposentadorias.
                  </p>
                </div>
                <div className="lg:col-span-4 lg:text-right">
                  <span className="inline-flex items-center gap-2 text-sm font-light text-accent group-hover:text-foreground transition-colors duration-300">
                    Conheça o Observatório
                    <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </Link>
          </FadeIn>
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

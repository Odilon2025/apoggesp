import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";
import NoticiaCard from "@/components/NoticiaCard";
import { ArrowRight, FileText, TrendingUp, Users, LineChart, Scale, ExternalLink } from "lucide-react";
import { snapshot as snapshotFallback } from "@/data/snapshot";
import { cronologia as cronologiaFallback } from "@/data/cronologia";
import { atosNormativos as atosFallback } from "@/data/atosNormativos";
import { Noticia, listPublicadas } from "@/lib/noticias";
import {
  getAtos,
  getAtuacaoDestaques,
  getCronologia,
  getSnapshot,
  field,
} from "@/lib/cms";
import { usePageFields, useCMSList } from "@/hooks/useCMS";
import SEO from "@/components/SEO";

const atuacaoFallback = [
  { area: "Inovação", desc: "No Lab11, APPGGs colaboraram com equipes técnicas e parceiros para mostrar que nudges bem desenhados podem apoiar políticas de alimentação escolar, saúde pública no transporte e formalização de microempreendedores." },
  { area: "Planejamento", desc: "O SMAE — desenvolvido em parceria com a FGV e sob diretrizes da administração superior — tornou-se memória institucional da Prefeitura, com cinco módulos, 500 usuários e decreto que o consolidou como patrimônio público permanente." },
  { area: "Primeira Infância", desc: "Quando a política de primeira infância exigiu integração entre saúde, educação e assistência social, APPGGs participaram da articulação entre secretarias, em colaboração com as lideranças de cada pasta." },
];

// Reorganiza atos vindos do CMS no formato { principal, alteracoes, anexos, correlacoes }
function agruparAtos(items: { categoria: string; titulo: string; descricao: string; url: string }[]) {
  if (!items || items.length === 0) return atosFallback;
  const principal = items.find((i) => i.categoria === "principal") ?? atosFallback.principal;
  const alteracoes = items.filter((i) => i.categoria === "alteracao");
  const anexos = items.filter((i) => i.categoria === "anexo");
  const correlacoes = items.filter((i) => i.categoria === "correlacao");
  return {
    principal,
    alteracoes: alteracoes.length ? alteracoes : atosFallback.alteracoes,
    anexos: anexos.length ? anexos : atosFallback.anexos,
    correlacoes: correlacoes.length ? correlacoes : atosFallback.correlacoes,
  };
}

const Index = () => {
  const fields = usePageFields("Home");
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [snap, setSnap] = useState(snapshotFallback);
  const cronologiaItems = useCMSList(getCronologia, cronologiaFallback);
  const atosItems = useCMSList(getAtos, []);
  const atuacaoDestaques = useCMSList(getAtuacaoDestaques, atuacaoFallback);

  useEffect(() => {
    listPublicadas(3).then(setNoticias).catch(() => setNoticias([]));
    getSnapshot<typeof snapshotFallback>().then((s) => s && setSnap(s));
  }, []);

  const atos = agruparAtos(atosItems);
  const atosResumo = [atos.principal, ...atos.alteracoes].slice(0, 4);


  const stats = [
    { num: String(snap.total), label: "analistas em exercício" },
    { num: String(snap.totalOrgaos), label: "órgãos e entidades" },
    { num: "11", label: "anos de carreira" },
  ];

  return (
    <PageLayout>
      <SEO title="APOGESP \u2014 Carreira APPGG da Prefeitura de S\u00e3o Paulo" description="Portal institucional da APOGESP: dados, atua\u00e7\u00e3o t\u00e9cnica, publica\u00e7\u00f5es e campanhas dos Analistas de Pol\u00edticas P\u00fablicas e Gest\u00e3o Governamental do Munic\u00edpio de S\u00e3o Paulo." path="/" />
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
                {field(fields, "home.hero.eyebrow", "Associação dos APPGGs — São Paulo")}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-normal text-primary-foreground leading-[1.05] text-balance"
              >
                {field(fields, "home.hero.titulo_pre", "Políticas Públicas,")}{" "}
                <em className="italic text-gold-muted">{field(fields, "home.hero.titulo_italico", "Gestão")}</em>{" "}
                {field(fields, "home.hero.titulo_pos", "Governamental")}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="mt-8 text-base md:text-lg text-primary-foreground/50 font-light max-w-lg leading-relaxed"
              >
                {field(fields, "home.hero.subtitulo", "Uma década contribuindo para a capacidade institucional da maior cidade da América Latina.")}
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
                  <span>{field(fields, "home.hero.cta1_label", "Conheça a carreira")}</span>
                  <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <span className="text-primary-foreground/15">|</span>
                <Link
                  to="/publicacoes"
                  className="group inline-flex items-center gap-2 text-sm font-light text-primary-foreground/50 hover:text-primary-foreground transition-colors duration-300"
                >
                  <span>{field(fields, "home.hero.cta2_label", "Publicações")}</span>
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
                  {field(fields, "home.stats.legenda", "Dados de")} {snap.mesReferencia}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Notícias */}
      {noticias.length > 0 && (
        <section className="py-20 md:py-24 bg-card">
          <div className="container">
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <SectionTitle
                label={field(fields, "home.noticias.label", "Comunicados")}
                title={field(fields, "home.noticias.titulo", "Notícias")}
              />
              <Link
                to="/noticias"
                className="group inline-flex items-center gap-2 text-sm font-light text-accent hover:text-foreground transition-colors duration-300"
              >
                <span>Ver todas</span>
                <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10">
              {noticias.map((n, i) => (
                <FadeIn key={n.id} delay={i * 0.06}>
                  <NoticiaCard noticia={n} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Campanhas — Impacto curto */}
      <section className="py-20 md:py-24 bg-card">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-luxury-border">
            <FadeIn>
              <Link to="/campanha-salarial" className="block bg-card p-10 md:p-12 h-full group hover:bg-card-hover transition-colors duration-300">
                <TrendingUp size={20} strokeWidth={1.5} className="text-gold mb-5" />
                <span className="text-[10px] font-medium tracking-luxury uppercase text-destructive block mb-3">
                  {field(fields, "home.campanhas.salarial.eyebrow", "Campanha 2026")}
                </span>
                <h3 className="text-xl md:text-2xl font-display font-normal text-foreground mb-3 leading-tight">
                  {field(fields, "home.campanhas.salarial.titulo", "Campanha Salarial")}
                </h3>
                <p className="text-sm font-light text-text-body leading-relaxed mb-6">
                  {field(fields, "home.campanhas.salarial.texto", "O APPGG inicia com R$ 13.208. O EPPGG federal começa com R$ 20.000 em 2026. Mesma missão, 34% de defasagem. É hora de corrigir.")}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-light text-accent group-hover:text-foreground transition-colors duration-300">
                  Conheça os números <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Link to="/campanha-nomeacao" className="block bg-card p-10 md:p-12 h-full group hover:bg-card-hover transition-colors duration-300">
                <Users size={20} strokeWidth={1.5} className="text-gold mb-5" />
                <span className="text-[10px] font-medium tracking-luxury uppercase text-gold block mb-3">
                  {field(fields, "home.campanhas.nomeacao.eyebrow", "Reconhecimento Institucional")}
                </span>
                <h3 className="text-xl md:text-2xl font-display font-normal text-foreground mb-3 leading-tight">
                  {field(fields, "home.campanhas.nomeacao.titulo", "53 novos APPGGs nomeados")}
                </h3>
                <p className="text-sm font-light text-text-body leading-relaxed mb-6">
                  {field(fields, "home.campanhas.nomeacao.texto", "A nomeação dos aprovados remanescentes fortalece a capacidade técnica da Prefeitura e conclui uma etapa importante de recomposição da carreira.")}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-light text-accent group-hover:text-foreground transition-colors duration-300">
                  Leia o posicionamento <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
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
                    {field(fields, "home.observatorio.eyebrow", "Pesquisa institucional")}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-normal text-foreground mb-4 leading-tight">
                    {field(fields, "home.observatorio.titulo", "Observatório das Evasões")}
                  </h3>
                  <p className="text-sm md:text-base font-light text-text-body leading-relaxed max-w-2xl">
                    {field(fields, "home.observatorio.texto", "Quem deixa a carreira de APPGG, por quais caminhos e com quais implicações? Um esforço de memória institucional sobre exonerações, licenças para tratar de interesses particulares, cedências e aposentadorias.")}
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

      {/* Conheça a atuação dos APPGGs */}
      <section className="py-20 md:py-24 bg-card">
        <div className="container">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-8">
                <SectionTitle
                  label={field(fields, "home.atuacao.label", "Atuação técnica")}
                  title={field(fields, "home.atuacao.titulo", "Conheça a atuação dos APPGGs")}
                />
                <p className="mt-6 text-sm md:text-base font-light text-text-body leading-relaxed max-w-2xl">
                  {field(fields, "home.atuacao.texto", "Conheça contribuições de APPGGs em políticas, projetos e capacidades institucionais construídos em conjunto com órgãos, carreiras e equipes da Prefeitura de São Paulo.")}
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <Link
                  to="/atuacao"
                  className="group inline-flex items-center gap-2 text-sm font-light text-accent hover:text-foreground transition-colors duration-300"
                >
                  <span>Ver casos de atuação</span>
                  <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Atos Normativos — resumo */}
      <section className="py-24 md:py-32 bg-section-alt">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <SectionTitle
                label={field(fields, "home.atos.label", "Marco Legal")}
                title={field(fields, "home.atos.titulo", "Atos Normativos da Carreira")}
              />
            </div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                {atosResumo.map((item, i) => (
                  <FadeIn key={item.url + i} delay={i * 0.05}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3 py-5 border-b border-luxury-border"
                    >
                      <Scale size={16} strokeWidth={1.5} className="text-gold mt-1 shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-light text-foreground group-hover:text-accent transition-colors duration-300 leading-snug">
                          {item.titulo}
                        </p>
                        <p className="text-xs font-light text-text-body mt-1 leading-relaxed">
                          {item.descricao}
                        </p>
                      </div>
                      <ExternalLink
                        size={12}
                        strokeWidth={1.5}
                        className="text-text-caption mt-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </a>
                  </FadeIn>
                ))}
              </div>
              <FadeIn>
                <Link
                  to="/carreira#marco-legal"
                  className="group inline-flex items-center gap-2 mt-8 text-sm font-light text-accent hover:text-foreground transition-colors duration-300"
                >
                  <FileText size={14} strokeWidth={1.5} />
                  <span>Consultar marco legal completo</span>
                  <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>



      {/* Timeline */}
      <section className="py-24 md:py-32 bg-section-alt">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <SectionTitle
                label={field(fields, "home.cronologia.label", "Cronologia")}
                title={field(fields, "home.cronologia.titulo", "Uma Carreira que se Construiu Fazendo")}
              />
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-0">
                {cronologiaItems.map((item, i) => (
                  <FadeIn key={item.year + i} delay={i * 0.06}>
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
      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <FadeIn>
              <span className="text-[10px] font-medium tracking-luxury uppercase text-text-caption block mb-6">
                {field(fields, "home.presidente.label", "Mensagem da Presidente")}
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-normal text-foreground leading-tight text-balance italic">
                "{field(fields, "home.presidente.frase", "Fortalecer a carreira de APPGG é fortalecer a capacidade do município de entregar políticas públicas de qualidade para quem mais precisa.")}"
              </h2>
              <div className="luxury-divider mt-6 mb-4" />
              <p className="text-[11px] font-light text-text-caption tracking-wide">
                {field(fields, "home.presidente.assinatura", "Maria Camila Florêncio — Presidente da APOGESP")}
              </p>
              <Link
                to="/apogesp"
                className="group inline-flex items-center gap-2 text-sm font-light text-accent hover:text-foreground transition-colors duration-300 mt-8"
              >
                <span>{field(fields, "home.presidente.cta", "Sobre a APOGESP")}</span>
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

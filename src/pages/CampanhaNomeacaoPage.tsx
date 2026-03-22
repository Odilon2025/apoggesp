import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";
import { ArrowRight, Users, Clock, Building2, ShieldCheck, GraduationCap, TrendingUp, Target, BarChart3 } from "lucide-react";

const porQueNomear = [
  {
    icon: Building2,
    titulo: "102 Cargos Vagos",
    desc: "Dos 300 cargos criados por lei, 102 estão vagos — 34% do quadro. Os 100 cargos criados em 2023 sequer começaram a ser preenchidos. A estrutura existe; falta apenas a decisão de ocupá-la.",
  },
  {
    icon: Users,
    titulo: "53 Profissionais Prontos",
    desc: "Dos 144 classificados, 80 já foram nomeados e estão em exercício. Restam 53 aprovados aguardando — profissionais que já provaram competência no concurso mais disputado da carreira.",
  },
  {
    icon: Clock,
    titulo: "Prazo que se Esgota",
    desc: "A validade do concurso tem prazo. Cada mês sem nomeação é um mês a menos de possibilidade. Deixar expirar a lista significaria desperdiçar todo o investimento público em um processo que atraiu 7.760 candidatos.",
  },
  {
    icon: ShieldCheck,
    titulo: "Programa de Metas 2025–2028",
    desc: "São 126 metas prioritárias distribuídas em 4 eixos. Coordenação intersetorial, monitoramento de indicadores e entregas mensuráveis demandam exatamente o perfil dos APPGGs aprovados.",
  },
];

const perfilAprovados = [
  {
    icon: GraduationCap,
    titulo: "Formação de Excelência",
    desc: "75% formados em universidades de referência — USP, UNICAMP, FGV, PUC-SP. Um em cada cinco tem mestrado ou doutorado.",
  },
  {
    icon: BarChart3,
    titulo: "Fluência Digital e Analítica",
    desc: "Quase metade domina ferramentas de estatística e dados. Mais de um terço trabalha com Business Intelligence e geoprocessamento. São profissionais prontos para a gestão baseada em evidências.",
  },
  {
    icon: TrendingUp,
    titulo: "Experiência que Combina Setores",
    desc: "Em média, 7,5 anos de experiência profissional, combinando passagens pelo setor público e privado. Mais da metade já ocupou posições de liderança.",
  },
  {
    icon: Target,
    titulo: "Visão Internacional",
    desc: "Quase dois terços com inglês avançado ou fluente. Profissionais com repertório para conectar São Paulo às melhores práticas globais de gestão pública.",
  },
];

const timelineConcurso = [
  { etapa: "Publicação do edital — 32 vagas", status: "Concluído" },
  { etapa: "7.760 inscritos — 242 candidatos por vaga", status: "Concluído" },
  { etapa: "Provas objetivas e discursivas", status: "Concluído" },
  { etapa: "Homologação — 144 classificados", status: "Concluído" },
  { etapa: "1ª nomeação — 50 aprovados (jul/2024)", status: "Concluído" },
  { etapa: "2ª nomeação — 30 aprovados (jan/2026)", status: "Concluído" },
  { etapa: "Nomeação dos 53 remanescentes", status: "Pendente" },
  { etapa: "Posse e exercício", status: "Pendente" },
];

const CampanhaNomeacaoPage = () => {
  return (
    <PageLayout>
      <PageHero
        label="Nomeação Já"
        title="53 Aprovados. Zero Razões Para Esperar."
        subtitle="Um concurso com 242 candidatos por vaga selecionou os melhores. 80 já servem a cidade. Faltam 53 — e 102 cargos vagos esperando por eles."
      />

      {/* Narrativa */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          <div className="max-w-3xl">
            <FadeIn>
              <p className="text-base md:text-lg font-light text-text-body leading-relaxed mb-6">
                Em 2023, a Lei nº 17.913 ampliou o quadro de APPGGs para <strong className="text-foreground">300 cargos</strong> — um reconhecimento de que São Paulo precisa de mais analistas de gestão. Hoje, <strong className="text-foreground">102 desses cargos estão vagos</strong>. Um terço da capacidade projetada simplesmente não existe.
              </p>
              <p className="text-base md:text-lg font-light text-text-body leading-relaxed mb-6">
                Enquanto isso, 53 profissionais aprovados no concurso mais competitivo da história da carreira — <strong className="text-foreground">242 candidatos por vaga</strong> — aguardam nomeação. São pessoas com formação em universidades de referência, experiência combinada nos setores público e privado, e domínio de ferramentas analíticas que a administração precisa.
              </p>
              <p className="text-base md:text-lg font-light text-text-body leading-relaxed">
                O custo da nomeação é marginal frente ao orçamento municipal. Não nomear é aceitar que secretarias continuem operando abaixo da capacidade, que projetos estratégicos percam qualidade técnica e que a prefeitura perca competitividade na atração de talentos frente ao governo federal e ao setor privado.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Por que nomear */}
      <section className="py-24 md:py-32 bg-section-alt">
        <div className="container">
          <SectionTitle label="O Cenário" title="Por Que Nomear Agora" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-luxury-border mt-2">
            {porQueNomear.map((item, i) => (
              <FadeIn key={item.titulo} delay={i * 0.1}>
                <div className="bg-card p-10 h-full">
                  <item.icon size={20} strokeWidth={1.5} className="text-gold mb-4" />
                  <h3 className="text-base font-display font-normal text-foreground mb-3">{item.titulo}</h3>
                  <p className="text-sm font-light text-text-body leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Números */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          <SectionTitle label="Em Números" title="O Quadro Atual" center />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-luxury-border max-w-4xl mx-auto mt-2">
            {[
              { num: "300", label: "cargos criados por lei" },
              { num: "102", label: "cargos vagos hoje" },
              { num: "53", label: "aprovados aguardando" },
              { num: "242:1", label: "candidatos por vaga" },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div className="bg-card p-8 md:p-10 text-center">
                  <span className="text-2xl md:text-4xl font-display text-gold">{stat.num}</span>
                  <span className="block text-xs font-light text-text-caption mt-2">{stat.label}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Perfil dos aprovados */}
      <section className="py-24 md:py-32 bg-section-alt">
        <div className="container">
          <SectionTitle
            label="Capital Humano"
            title="Quem São os 53 Aprovados"
            subtitle="Profissionais selecionados no concurso mais competitivo da carreira, com formação multidisciplinar e experiência comprovada."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-luxury-border mt-2">
            {perfilAprovados.map((item, i) => (
              <FadeIn key={item.titulo} delay={i * 0.1}>
                <div className="bg-card p-10 h-full">
                  <item.icon size={20} strokeWidth={1.5} className="text-gold mb-4" />
                  <h3 className="text-base font-display font-normal text-foreground mb-3">{item.titulo}</h3>
                  <p className="text-sm font-light text-text-body leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline do concurso */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <SectionTitle
                label="Processo"
                title="Etapas do Concurso"
                subtitle="Todas as fases foram cumpridas. Resta apenas o ato administrativo da nomeação."
              />
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-0">
                {timelineConcurso.map((item, i) => (
                  <FadeIn key={item.etapa} delay={i * 0.08}>
                    <div className="flex items-center gap-6 py-5 border-b border-luxury-border">
                      <span className={`text-[10px] font-medium tracking-luxury uppercase px-3 py-1 rounded-sm whitespace-nowrap ${
                        item.status === "Concluído"
                          ? "bg-gold/10 text-gold"
                          : "bg-destructive/10 text-destructive"
                      }`}>
                        {item.status}
                      </span>
                      <span className="text-sm font-light text-foreground">{item.etapa}</span>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impacto orçamentário */}
      <section className="py-24 md:py-32 bg-section-alt">
        <div className="container">
          <div className="max-w-3xl">
            <FadeIn>
              <SectionTitle
                label="Viabilidade"
                title="O Custo da Nomeação é Marginal"
              />
              <p className="text-base md:text-lg font-light text-text-body leading-relaxed mt-6 mb-8">
                Frente a um orçamento municipal de <strong className="text-foreground">R$ 135 bilhões</strong> e uma despesa de pessoal de <strong className="text-foreground">R$ 44 bilhões</strong>, o investimento na nomeação dos 53 aprovados representa uma fração ínfima — com retorno imediato em capacidade de gestão, qualidade técnica e entrega de resultados para a população.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Citação CTA */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-display font-normal text-foreground leading-tight text-balance italic">
                "Cada APPGG não nomeado é uma política pública que será coordenada com menos rigor, monitorada com menos precisão e avaliada com menos profundidade."
              </h2>
              <div className="luxury-divider mt-6 mb-4" />
              <p className="text-[11px] font-light text-text-caption tracking-wide">Maria Camila Florêncio — Presidente da APOGESP</p>
              <Link
                to="/contato"
                className="group inline-flex items-center gap-2 text-sm font-light text-accent hover:text-foreground transition-colors duration-300 mt-8"
              >
                <span>Apoie a nomeação</span>
                <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CampanhaNomeacaoPage;

import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import SectionTitle from "@/components/SectionTitle";
import { ArrowRight, BookOpen, Users, Building2, FileText } from "lucide-react";

const timelineItems = [
  { year: "2007", text: "Criação da carreira de APPGG na Prefeitura de São Paulo pela Lei nº 14.591" },
  { year: "2008", text: "Primeiro concurso público para a carreira" },
  { year: "2012", text: "Fundação da APOGESP" },
  { year: "2015", text: "Consolidação dos APPGGs em secretarias estratégicas" },
  { year: "2019", text: "Publicação do primeiro relatório institucional da APOGESP" },
  { year: "2023", text: "Ampliação da atuação em políticas de inovação e governo digital" },
];

const atuacaoDestaques = [
  { area: "Saúde", desc: "Reestruturação da rede de atenção básica com foco em territorialização e indicadores de desempenho." },
  { area: "Educação", desc: "Formulação de políticas de avaliação e monitoramento da qualidade do ensino municipal." },
  { area: "Gestão e Inovação", desc: "Implantação de sistemas de governança e transformação digital em secretarias da Prefeitura." },
];

const publicacoesRecentes = [
  { titulo: "Relatório Institucional 2023", tipo: "Relatório", ano: "2023" },
  { titulo: "Nota Técnica: Aprimoramento da Carreira de APPGG", tipo: "Nota Técnica", ano: "2023" },
  { titulo: "APPGGs em Números: Perfil e Distribuição", tipo: "Relatório", ano: "2022" },
];

const Index = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-20 md:py-28" style={{ background: "var(--hero-gradient)" }}>
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground leading-tight">
              Analistas de Políticas Públicas e Gestão Governamental
            </h1>
            <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 leading-relaxed max-w-2xl">
              Fortalecendo a gestão pública municipal por meio de análise técnica, formulação de políticas e inovação institucional na Prefeitura de São Paulo.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/carreira"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-foreground text-primary text-sm font-medium rounded hover:bg-primary-foreground/90 transition-colors"
              >
                Conheça a carreira <ArrowRight size={16} />
              </Link>
              <Link
                to="/publicacoes"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-primary-foreground/30 text-primary-foreground text-sm font-medium rounded hover:bg-primary-foreground/10 transition-colors"
              >
                Publicações
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Destaques */}
      <section className="py-16 bg-card">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Users, title: "Carreira Estratégica", desc: "Profissionais de nível superior dedicados à análise e formulação de políticas públicas no município." },
              { icon: Building2, title: "Atuação Transversal", desc: "Presença em mais de 20 órgãos da administração municipal, atuando em áreas como saúde, educação, gestão e planejamento." },
              { icon: BookOpen, title: "Produção Técnica", desc: "Relatórios, notas técnicas e propostas de aprimoramento que subsidiam decisões de gestão." },
            ].map((item) => (
              <div key={item.title} className="p-6 border border-border rounded bg-card">
                <item.icon size={24} className="text-accent mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Atuação */}
      <section className="py-16 bg-section-alt">
        <div className="container">
          <SectionTitle title="Atuação em Políticas Públicas" subtitle="Exemplos de contribuição dos APPGGs para a gestão municipal." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {atuacaoDestaques.map((item) => (
              <div key={item.area} className="p-6 border border-border rounded bg-card">
                <span className="text-xs font-medium text-accent uppercase tracking-wide">{item.area}</span>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link to="/atuacao" className="text-sm font-medium text-accent hover:underline inline-flex items-center gap-1">
              Ver todos os casos <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Publicações */}
      <section className="py-16 bg-card">
        <div className="container">
          <SectionTitle title="Publicações Recentes" />
          <div className="space-y-4">
            {publicacoesRecentes.map((pub) => (
              <Link
                to="/publicacoes"
                key={pub.titulo}
                className="flex items-center justify-between p-4 border border-border rounded hover:bg-secondary/50 transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <FileText size={18} className="text-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">{pub.titulo}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{pub.tipo} · {pub.ano}</p>
                  </div>
                </div>
                <ArrowRight size={14} className="text-muted-foreground group-hover:text-accent transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Linha do Tempo */}
      <section className="py-16 bg-section-alt">
        <div className="container">
          <SectionTitle title="Marcos da Carreira" />
          <div className="space-y-0">
            {timelineItems.map((item, i) => (
              <div key={item.year} className="flex gap-4 group">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-accent shrink-0 mt-1.5" />
                  {i < timelineItems.length - 1 && <div className="w-px flex-1 bg-border" />}
                </div>
                <div className="pb-6">
                  <span className="text-sm font-semibold text-accent">{item.year}</span>
                  <p className="text-sm text-muted-foreground mt-0.5">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APOGESP */}
      <section className="py-16 bg-card">
        <div className="container">
          <div className="max-w-2xl">
            <SectionTitle title="Sobre a APOGESP" />
            <p className="text-muted-foreground leading-relaxed">
              A APOGESP é a entidade representativa dos Analistas de Políticas Públicas e Gestão Governamental do Município de São Paulo. Fundada em 2012, atua na valorização da carreira, na produção de conhecimento sobre gestão pública e na interlocução com órgãos governamentais e sociedade civil.
            </p>
            <Link to="/apogesp" className="mt-4 text-sm font-medium text-accent hover:underline inline-flex items-center gap-1">
              Conheça a APOGESP <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;

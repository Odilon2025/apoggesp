import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";
import { ArrowRight } from "lucide-react";

interface CasoAtuacao {
  titulo: string;
  area: string;
  contexto: string;
  atuacao: string;
  resultados: string;
}

const areas = ["Todas", "Inovação e Ciências Comportamentais", "Planejamento e Monitoramento", "Políticas Intersetoriais", "Gestão Institucional", "Educação Ambiental", "Gestão Documental"];

const casos: CasoAtuacao[] = [
  {
    titulo: "Ciências Comportamentais para Alimentação Escolar",
    area: "Inovação e Ciências Comportamentais",
    contexto: "Nas escolas municipais, estudantes do 6º ao 9º ano desperdiçavam alimentos e rejeitavam pratos menos conhecidos. O problema não era a comida — era como ela era apresentada, percebida e descartada.",
    atuacao: "O Lab11, em parceria com a CODAE/SME, redesenhou a experiência da refeição. Lixeiras foram reposicionadas para tornar o desperdício visível. Painéis com linguagem de redes sociais tornaram pratos desconhecidos familiares. Contagem digital substituiu estimativas manuais. Em oito escolas, observação direta, entrevistas e mensuração validaram cada intervenção.",
    resultados: "Mais crianças passaram a comer regularmente na escola. A aceitação de alimentos antes rejeitados aumentou. O desperdício caiu — não por decreto, mas por design.",
  },
  {
    titulo: "SMAE — O Sistema que Deu Olhos à Prefeitura",
    area: "Planejamento e Monitoramento",
    contexto: "Durante anos, o monitoramento do Programa de Metas dependeu de planilhas, e-mails e memória individual. O conhecimento estava nas pessoas, não nas instituições. Erros manuais eram frequentes. A Prefeitura planejava no escuro.",
    atuacao: "APPGGs lideraram o desenvolvimento do SMAE em parceria com a FGV, usando metodologia ágil e software livre (licença AGPL v3). A decisão por código aberto não foi ideológica — foi estratégica: garantiu soberania sobre os dados e possibilidade de compartilhamento com outros entes públicos.",
    resultados: "Cinco módulos operacionais — Programa de Metas, Planos Setoriais, Gestão de Projetos, Monitoramento de Obras e Transferências Voluntárias. Mais de 500 usuários ativos. E um decreto municipal que transformou o sistema em patrimônio público permanente.",
  },
  {
    titulo: "Primeira Infância — Quando Silos Precisam Cair",
    area: "Políticas Intersetoriais",
    contexto: "Uma criança de dois anos não sabe se seu problema é de saúde, educação ou assistência social. Mas a Prefeitura organizava suas respostas como se a criança soubesse. A política da primeira infância exigia integração — e a estrutura administrativa, por natureza, resiste a ela.",
    atuacao: "APPGGs assumiram o papel de articuladores intersetoriais: construíram pontes entre secretarias que historicamente operavam em paralelo, facilitaram diálogos que não aconteceriam espontaneamente e ajudaram a traduzir a linguagem de cada área para as demais.",
    resultados: "Uma política integrada que articula saúde, educação, assistência social e outras áreas — com a carreira funcionando como o tecido conectivo que mantém a rede coesa.",
  },
  {
    titulo: "SP156 — Redesenhando a Porta de Entrada Digital da Cidade",
    area: "Inovação e Ciências Comportamentais",
    contexto: "O portal SP156 era a principal interface entre o cidadão e os serviços municipais. Mas era também complexo, visualmente poluído e escrito em linguagem burocrática. Muitos desistiam antes de concluir o que precisavam.",
    atuacao: "O Lab11 conduziu uma reformulação radical: testes de usabilidade com 320 cidadãos, reorganização da taxonomia por card sorting, prototipagem iterativa em três ciclos. Cada decisão de design foi validada com quem realmente usaria o portal.",
    resultados: "A taxa de desistência caiu 30%. A navegação ficou 41% mais rápida. Na categoria trânsito e transporte, as visualizações aumentaram 200%. O portal passou a funcionar para quem ele deveria sempre ter funcionado: o cidadão.",
  },
  {
    titulo: "Residência em Gestão Pública",
    area: "Gestão Institucional",
    contexto: "A administração pública precisa de renovação constante — não apenas de quadros, mas de perspectivas. Ao mesmo tempo, profissionais de fora raramente têm oportunidade de entender como a máquina pública realmente funciona.",
    atuacao: "APPGGs estruturaram um programa que resolve os dois problemas simultaneamente: profissionais com vínculo flexível e tempo determinado entram na Prefeitura para observar, aprender e contribuir — trazendo olhares novos para problemas antigos.",
    resultados: "Um mecanismo institucional de renovação que beneficia tanto a administração quanto os residentes — e que demonstra que a gestão pública pode ser, ao mesmo tempo, estável e permeável.",
  },
  {
    titulo: "I Plano Municipal de Educação Ambiental",
    area: "Educação Ambiental",
    contexto: "São Paulo nunca havia tido um plano municipal de educação ambiental. Construí-lo exigia alinhar secretarias com agendas diferentes, níveis de governo com tempos distintos e atores com prioridades por vezes conflitantes.",
    atuacao: "APPGGs participaram do alinhamento estratégico entre secretarias e entre níveis de governo, utilizando o ferramental da teoria de múltiplos fluxos para identificar a janela de oportunidade e viabilizar a construção do plano.",
    resultados: "Aprovação do I Plano Municipal de Educação Ambiental — um marco que só foi possível porque alguém soube conectar agendas, traduzir urgências e coordenar atores que, sozinhos, não teriam chegado ao mesmo resultado.",
  },
  {
    titulo: "Modernização do Arquivo Histórico Municipal",
    area: "Gestão Institucional",
    contexto: "O Arquivo Histórico Municipal de São Paulo guardava a memória da cidade, mas sua gestão precisava de atualização. A pandemia de COVID-19 tornou o desafio mais complexo: como modernizar uma instituição quando a equipe está dispersa, insegura e resistente à mudança?",
    atuacao: "APPGGs conduziram o projeto de reestruturação aplicando princípios da Nova Gestão Pública ao contexto real — com todas as suas contradições. Enfrentaram cultura organizacional arraigada, desconfiança legítima e limitações impostas pelo cenário pandêmico.",
    resultados: "Avanços concretos na modernização, mas, sobretudo, lições valiosas sobre os limites da reforma quando ela não dialoga com a cultura da organização. Um caso honesto sobre o que funciona — e o que não funciona — em gestão da mudança.",
  },
  {
    titulo: "Gestão Documental na Rede Municipal de Ensino",
    area: "Gestão Documental",
    contexto: "A maior rede de ensino municipal do país não tinha uma política estruturada de gestão documental. Arquivos se perdiam, memórias institucionais desapareciam e cada escola tratava seus documentos de forma diferente.",
    atuacao: "APPGGs desenvolveram uma política institucional que integra arquivos, memória e educação — com governança clara para que a gestão documental nas unidades de ensino deixasse de ser improviso e passasse a ser método.",
    resultados: "Diretrizes e estrutura de governança estabelecidas para toda a rede municipal de ensino. A memória institucional da educação paulistana passou a ter um sistema para ser preservada.",
  },
  {
    titulo: "MEI Nota Fácil — Simplificando o Complexo",
    area: "Inovação e Ciências Comportamentais",
    contexto: "Emitir uma nota fiscal eletrônica deveria ser simples. Para os Microempreendedores Individuais de São Paulo — 33% com baixa escolaridade — o sistema existente tinha 15% de taxa de erro. O digital que deveria facilitar estava, na prática, excluindo.",
    atuacao: "O Lab11 fez o que a boa gestão pública exige: ouviu antes de desenhar. Pesquisa com usuários, mapeamento de jornada, prototipagem e testes de usabilidade resultaram em uma interface minimalista, com linguagem acessível e fluxo intuitivo.",
    resultados: "12.514 dispositivos ativos. 5.773 notas emitidas no período inicial. Nota 4,8 na Play Store, com 80% das avaliações em 5 estrelas. Inclusão digital não como slogan, mas como resultado mensurável.",
  },
  {
    titulo: "COVID-19 nos Terminais de Ônibus",
    area: "Inovação e Ciências Comportamentais",
    contexto: "Durante a pandemia, terminais de ônibus eram pontos críticos de transmissão. Milhares de pessoas circulavam diariamente, e campanhas tradicionais de comunicação não mudavam comportamentos reais — uso de máscara, distanciamento, higienização.",
    atuacao: "O Lab11 desenvolveu campanhas baseadas em ciências comportamentais e usou análise observacional por câmeras de segurança para mapear padrões reais de comportamento — não o que as pessoas diziam fazer, mas o que de fato faziam.",
    resultados: "Identificação precisa de pontos críticos e comportamentos de risco, gerando subsídios concretos para mudanças operacionais e campanhas futuras da SPTrans. Evidência no lugar de intuição.",
  },
];

const AtuacaoPage = () => {
  const [areaFiltro, setAreaFiltro] = useState("Todas");
  const casosFiltrados = areaFiltro === "Todas" ? casos : casos.filter((c) => c.area === areaFiltro);

  return (
    <PageLayout>
      <PageHero
        label="Impacto"
        title="Atuação dos APPGGs"
        subtitle="Dez casos que mostram o que acontece quando rigor técnico encontra compromisso público. Todos documentados no Caderno Gestão Pública em Rede (2025)."
      />

      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          <SectionTitle label="Casos Documentados" title="Onde a Carreira Fez Diferença" subtitle="Cada caso abaixo é baseado em artigos publicados por APPGGs no Caderno Gestão Pública em Rede — 1ª edição (2025). Não são promessas: são registros." />

          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-12">
            {areas.map((area) => (
              <button
                key={area}
                onClick={() => setAreaFiltro(area)}
                className={`px-4 py-2 text-[11px] font-light tracking-wide border transition-all duration-300 ${
                  areaFiltro === area
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-text-caption border-luxury-border hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {area}
              </button>
            ))}
          </div>

          <div className="space-y-px">
            {casosFiltrados.map((caso, i) => (
              <FadeIn key={caso.titulo} delay={i * 0.06}>
                <article className="group bg-card border-b border-luxury-border hover:bg-card-hover transition-colors duration-300">
                  <div className="p-8 md:p-10">
                    <div className="flex items-start justify-between gap-6 mb-6">
                      <div>
                        <span className="text-[10px] font-medium tracking-luxury uppercase text-gold">{caso.area}</span>
                        <h3 className="text-lg md:text-xl font-display font-normal text-foreground mt-2">{caso.titulo}</h3>
                      </div>
                      <ArrowRight size={14} strokeWidth={1.5} className="text-luxury-border group-hover:text-gold transition-colors duration-300 mt-2 shrink-0" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { label: "Contexto", text: caso.contexto },
                        { label: "Atuação dos APPGGs", text: caso.atuacao },
                        { label: "Resultados", text: caso.resultados },
                      ].map((col) => (
                        <div key={col.label}>
                          <span className="text-[10px] font-medium tracking-luxury uppercase text-text-caption block mb-2">{col.label}</span>
                          <p className="text-sm font-light text-text-body leading-relaxed">{col.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>

          {casosFiltrados.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-sm font-light text-text-caption">Nenhum caso encontrado para esta área.</p>
            </div>
          )}
        </div>
      </section>

      {/* Eixos */}
      <section className="py-24 md:py-32 bg-section-alt">
        <div className="container max-w-3xl">
          <SectionTitle label="Organização" title="Os Três Eixos do Caderno" />
          <FadeIn>
            <div className="space-y-0 border-t border-luxury-border">
              {[
                { num: "I", title: "Capacidades Transversais Emergentes no Estado", desc: "Ciências comportamentais, o sistema SMAE e a gestão documental na rede de ensino — três histórias sobre como construir ferramentas que a Prefeitura não sabia que precisava." },
                { num: "II", title: "Gestão Pública como Prática Social Histórica", desc: "O Arquivo Histórico, a Assessoria de Planejamento da Saúde e a Residência em Gestão Pública — três reflexões sobre o que significa gerir o público ao longo do tempo." },
                { num: "III", title: "Problemas Complexos, Políticas e a Atuação dos APPGGs", desc: "Primeira infância, educação ambiental e recuperação de fachadas — três casos em que a solução exigia cruzar fronteiras que o organograma não cruzaria sozinho." },
              ].map((eixo) => (
                <div key={eixo.num} className="py-6 border-b border-luxury-border">
                  <div className="flex items-start gap-4">
                    <span className="text-xs font-display text-gold mt-0.5">Eixo {eixo.num}</span>
                    <div>
                      <h3 className="text-base font-display font-normal text-foreground">{eixo.title}</h3>
                      <p className="text-sm font-light text-text-body mt-1 leading-relaxed">{eixo.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </PageLayout>
  );
};

export default AtuacaoPage;

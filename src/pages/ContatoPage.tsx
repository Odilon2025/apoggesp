import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";
import { Mail, ArrowRight } from "lucide-react";

const ContatoPage = () => {

  return (
    <PageLayout>
      <PageHero
        label="Fale Conosco"
        title="Contato"
        subtitle="Se você é servidor, pesquisador, gestor ou cidadão interessado em gestão pública municipal, este é o canal."
      />

      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Info */}
            <div className="lg:col-span-4">
              <SectionTitle label="Informações" title="Como nos encontrar" />
              <FadeIn>
                <div className="space-y-8 mt-4">
                  <div className="flex items-start gap-3">
                    <Mail size={14} strokeWidth={1.5} className="text-gold mt-1 shrink-0" />
                    <div>
                      <span className="text-[10px] font-medium tracking-luxury uppercase text-text-caption block mb-1">E-mail</span>
                      <span className="text-sm font-light text-foreground">contato@apogesp.org.br</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ArrowRight size={14} strokeWidth={1.5} className="text-gold mt-1 shrink-0" />
                    <div>
                      <span className="text-[10px] font-medium tracking-luxury uppercase text-text-caption block mb-1">Localização</span>
                      <span className="text-sm font-light text-foreground">São Paulo — SP, Brasil</span>
                    </div>
                  </div>
                  <p className="text-sm font-light text-text-body leading-relaxed mt-4">
                    A APOGESP recebe mensagens de associados, gestores públicos, pesquisadores, jornalistas e de qualquer cidadão interessado na carreira de APPGG e na gestão pública municipal de São Paulo. Respondemos em até cinco dias úteis.
                  </p>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ContatoPage;

import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { Lock } from "lucide-react";

const AreaAssociadoPage = () => (
  <PageLayout>
    <PageHero
      label="Associados"
      title="Área do Associado"
      subtitle="Um espaço que está sendo construído — com o mesmo cuidado que dedicamos a tudo que fazemos."
    />

    <section className="py-24 md:py-32 bg-card">
      <div className="container max-w-xl text-center">
        <FadeIn>
          <div className="p-16 border border-luxury-border">
            <Lock size={24} strokeWidth={1.5} className="text-gold mx-auto mb-6" />
            <h2 className="text-xl font-display font-normal text-foreground mb-2">Em breve</h2>
            <div className="luxury-divider my-6" />
            <p className="text-sm font-light text-text-body leading-relaxed">
              Estamos preparando um espaço exclusivo para os associados da APOGESP. Aqui, você encontrará comunicados internos, documentos de interesse da carreira e informações que não circulam em outro lugar. Porque quem constrói a gestão pública de São Paulo merece um canal à altura.
            </p>
            <p className="text-[11px] font-light text-text-caption mt-6">
              contato@apogesp.org.br
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  </PageLayout>
);

export default AreaAssociadoPage;

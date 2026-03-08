import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { Lock } from "lucide-react";

const AreaAssociadoPage = () => (
  <PageLayout>
    <PageHero
      title="Área do Associado"
      subtitle="Espaço reservado para comunicações e documentos de interesse dos associados da APOGESP."
    />

    <section className="py-16 bg-card">
      <div className="container max-w-2xl text-center">
        <div className="p-10 border border-border rounded bg-section-alt">
          <Lock size={32} className="text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-3 font-serif">Em breve</h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            Esta área será futuramente destinada aos associados da APOGESP, com acesso a comunicados internos, documentos exclusivos e informações de interesse da carreira.
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            Para mais informações, entre em contato pelo e-mail contato@apogesp.org.br.
          </p>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default AreaAssociadoPage;

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import { Mail, Send } from "lucide-react";

const ContatoPage = () => {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <PageLayout>
      <PageHero
        title="Contato"
        subtitle="Canal institucional de comunicação da APOGESP."
      />

      <section className="py-16 bg-card">
        <div className="container max-w-2xl">
          <div className="flex items-start gap-3 p-5 border border-border rounded mb-10 bg-section-alt">
            <Mail size={20} className="text-accent mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">E-mail institucional</p>
              <p className="text-sm text-muted-foreground">contato@apogesp.org.br</p>
            </div>
          </div>

          <SectionTitle title="Envie uma mensagem" />

          {enviado ? (
            <div className="p-6 border border-accent/30 rounded bg-accent/5 text-center">
              <p className="text-sm text-foreground font-medium">Mensagem enviada com sucesso.</p>
              <p className="text-xs text-muted-foreground mt-1">Retornaremos em breve pelo e-mail informado.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Nome</label>
                <input
                  type="text"
                  required
                  className="w-full text-sm border border-border rounded px-3 py-2 bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">E-mail</label>
                <input
                  type="email"
                  required
                  className="w-full text-sm border border-border rounded px-3 py-2 bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Assunto</label>
                <input
                  type="text"
                  required
                  className="w-full text-sm border border-border rounded px-3 py-2 bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Mensagem</label>
                <textarea
                  required
                  rows={5}
                  className="w-full text-sm border border-border rounded px-3 py-2 bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-accent resize-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded hover:bg-primary/90 transition-colors"
              >
                <Send size={14} /> Enviar mensagem
              </button>
            </form>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default ContatoPage;

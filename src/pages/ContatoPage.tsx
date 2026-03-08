import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";
import { Mail, Send, ArrowRight } from "lucide-react";

const ContatoPage = () => {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <PageLayout>
      <PageHero
        label="Fale Conosco"
        title="Contato"
        subtitle="Canal institucional de comunicação da APOGESP."
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
                </div>
              </FadeIn>
            </div>

            {/* Form */}
            <div className="lg:col-span-8">
              <FadeIn>
                {enviado ? (
                  <div className="p-12 border border-gold/20 text-center">
                    <div className="luxury-divider mb-6" />
                    <p className="text-base font-display font-normal text-foreground">Mensagem enviada</p>
                    <p className="text-sm font-light text-text-caption mt-2">Retornaremos em breve pelo e-mail informado.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] font-medium tracking-luxury uppercase text-text-caption mb-2 block">Nome</label>
                        <input
                          type="text"
                          required
                          className="w-full text-sm font-light border border-luxury-border px-4 py-3 bg-card text-foreground focus:outline-none focus:border-gold transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-medium tracking-luxury uppercase text-text-caption mb-2 block">E-mail</label>
                        <input
                          type="email"
                          required
                          className="w-full text-sm font-light border border-luxury-border px-4 py-3 bg-card text-foreground focus:outline-none focus:border-gold transition-colors duration-300"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-medium tracking-luxury uppercase text-text-caption mb-2 block">Assunto</label>
                      <input
                        type="text"
                        required
                        className="w-full text-sm font-light border border-luxury-border px-4 py-3 bg-card text-foreground focus:outline-none focus:border-gold transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-medium tracking-luxury uppercase text-text-caption mb-2 block">Mensagem</label>
                      <textarea
                        required
                        rows={6}
                        className="w-full text-sm font-light border border-luxury-border px-4 py-3 bg-card text-foreground focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="group inline-flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground text-sm font-light tracking-wide hover:bg-primary/90 transition-colors duration-300"
                    >
                      <span>Enviar</span>
                      <Send size={13} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                    </button>
                  </form>
                )}
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ContatoPage;

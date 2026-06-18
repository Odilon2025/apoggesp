import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { Lock, Mail, LogOut, CheckCircle2 } from "lucide-react";
import { useState, FormEvent } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import PainelAssociadoPage from "./area-associado/PainelPage";
import SEO from "@/components/SEO";

const emailSchema = z.string().trim().email("E-mail inválido").max(255);

const AreaAssociadoPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <PageLayout>
      <SEO title="\u00c1rea do Associado | APOGESP" description="Espa\u00e7o dos associados APOGESP: biblioteca, wiki, grupos de trabalho e portal de transpar\u00eancia." path="/area-associado" />
        <PageHero label="Associados" title="Área do Associado" subtitle="Carregando…" />
      </PageLayout>
    );
  }

  if (user) return <PainelAssociadoPage />;

  return (
    <PageLayout>
      <PageHero
        label="Associados"
        title="Área do Associado"
        subtitle="Acesso restrito aos associados da APOGESP. Informe seu e-mail cadastrado para receber um link de acesso."
      />

      <section className="py-24 md:py-32 bg-card">
        <div className="container max-w-xl">
          <FadeIn>
            <MagicLinkForm />
          </FadeIn>
        </div>
      </section>
    </PageLayout>
  );
};


const MagicLinkForm = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    setSubmitting(true);
    // Mensagem genérica independente do resultado para não revelar quem é associado.
    await supabase.auth.signInWithOtp({
      email: parsed.data,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${window.location.origin}/area-associado`,
      },
    });
    setSubmitting(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="p-12 md:p-16 border border-luxury-border text-center">
        <CheckCircle2 size={24} strokeWidth={1.5} className="text-gold mx-auto mb-6" />
        <h2 className="text-xl font-display font-normal text-foreground mb-2">Verifique seu e-mail</h2>
        <div className="luxury-divider my-6" />
        <p className="text-sm font-light text-text-body leading-relaxed">
          Se este e-mail estiver cadastrado na lista de associados, você receberá em instantes um link para entrar.
          O link expira em alguns minutos.
        </p>
      </div>
    );
  }

  return (
    <div className="p-12 md:p-16 border border-luxury-border">
      <Lock size={24} strokeWidth={1.5} className="text-gold mx-auto mb-6" />
      <h2 className="text-xl font-display font-normal text-foreground mb-2 text-center">Acesso de associado</h2>
      <div className="luxury-divider my-6" />
      <p className="text-sm font-light text-text-body leading-relaxed text-center mb-8">
        Sem senha. Enviaremos um link único para o seu e-mail cadastrado.
      </p>

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-[11px] font-sans tracking-luxury uppercase text-text-caption mb-2">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className="w-full bg-transparent border-b border-luxury-border focus:border-gold outline-none py-2 text-sm font-light text-foreground placeholder:text-text-caption/50 transition-colors"
          />
          {error && <p className="text-[11px] font-light text-destructive mt-2">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full inline-flex items-center justify-center gap-2 border border-foreground py-3 text-[11px] font-sans tracking-luxury uppercase text-foreground hover:bg-foreground hover:text-background transition-colors duration-300 disabled:opacity-50"
        >
          <Mail size={14} strokeWidth={1.5} />
          {submitting ? "Enviando…" : "Receber link de acesso"}
        </button>
      </form>

      <p className="text-[11px] font-light text-text-caption text-center mt-8">
        Dúvidas? apogesp@gmail.com
      </p>
    </div>
  );
};

const SignedInPanel = ({ email, onSignOut }: { email: string; onSignOut: () => void }) => (
  <div className="p-12 md:p-16 border border-luxury-border">
    <CheckCircle2 size={24} strokeWidth={1.5} className="text-gold mx-auto mb-6" />
    <h2 className="text-xl font-display font-normal text-foreground mb-2 text-center">Você está conectado</h2>
    <div className="luxury-divider my-6" />
    <p className="text-sm font-light text-text-body leading-relaxed text-center">
      Sessão ativa como <span className="text-foreground">{email}</span>.
    </p>
    <p className="text-sm font-light text-text-body leading-relaxed text-center mt-4">
      Os comunicados internos, documentos da carreira e materiais exclusivos serão disponibilizados aqui em breve.
    </p>

    <button
      onClick={onSignOut}
      className="mt-10 w-full inline-flex items-center justify-center gap-2 border border-luxury-border py-3 text-[11px] font-sans tracking-luxury uppercase text-text-caption hover:text-foreground hover:border-foreground transition-colors duration-300"
    >
      <LogOut size={14} strokeWidth={1.5} />
      Sair
    </button>
  </div>
);

export default AreaAssociadoPage;

import { useEffect, useState, FormEvent } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Lock, Mail, CheckCircle2 } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const emailSchema = z.string().trim().email("E-mail inválido").max(255);

function sanitizeNext(raw: string | null): string {
  if (!raw) return "/area-associado";
  // must be a same-origin relative path
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/area-associado";
  return raw;
}

const LoginPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const next = sanitizeNext(params.get("next"));

  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) navigate(next, { replace: true });
  }, [loading, user, next, navigate]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const redirectTo = `${window.location.origin}${next}`;
    await supabase.auth.signInWithOtp({
      email: parsed.data,
      options: { shouldCreateUser: true, emailRedirectTo: redirectTo },
    });
    setSubmitting(false);
    setSent(true);
  };

  return (
    <PageLayout>
      <PageHero
        label="Acesso"
        title="Entrar"
        subtitle="Área restrita da APOGESP. Enviaremos um link único de acesso para o seu e-mail cadastrado."
      />
      <section className="py-24 md:py-32 bg-card">
        <div className="container max-w-xl">
          {sent ? (
            <div className="p-12 md:p-16 border border-luxury-border text-center">
              <CheckCircle2 size={24} strokeWidth={1.5} className="text-gold mx-auto mb-6" />
              <h2 className="text-xl font-display font-normal text-foreground mb-2">Verifique seu e-mail</h2>
              <div className="luxury-divider my-6" />
              <p className="text-sm font-light text-text-body leading-relaxed">
                Se este e-mail estiver autorizado, você receberá em instantes um link para entrar.
                Ao clicar, você retornará automaticamente para a página que solicitou o acesso.
              </p>
            </div>
          ) : (
            <div className="p-12 md:p-16 border border-luxury-border">
              <Lock size={24} strokeWidth={1.5} className="text-gold mx-auto mb-6" />
              <h2 className="text-xl font-display font-normal text-foreground mb-2 text-center">Acesso APOGESP</h2>
              <div className="luxury-divider my-6" />
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
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default LoginPage;

import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import PageLayout from "@/components/PageLayout";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [resetEnviado, setResetEnviado] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    setCarregando(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setCarregando(false);
    if (error) setErro(error.message);
  };

  const handleSignup = async () => {
    setErro(null);
    setCarregando(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/admin/noticias` },
    });
    setCarregando(false);
    if (error) setErro(error.message);
    else setErro("Conta criada. Você já pode entrar.");
  };

  const handleReset = async () => {
    if (!email) return setErro("Informe seu e-mail acima primeiro.");
    setErro(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) setErro(error.message);
    else setResetEnviado(true);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-20 bg-section-alt">
      <form onSubmit={handleLogin} className="w-full max-w-sm bg-card p-10 border border-luxury-border space-y-5">
        <h1 className="text-2xl font-display font-normal text-foreground">Painel de Notícias</h1>
        <p className="text-xs font-light text-text-caption">Acesso restrito a editores autorizados.</p>
        <div>
          <label className="text-[10px] font-medium tracking-luxury uppercase text-text-caption block mb-2">E-mail</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border border-luxury-border px-3 py-2 text-sm font-light focus:outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="text-[10px] font-medium tracking-luxury uppercase text-text-caption block mb-2">Senha</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border border-luxury-border px-3 py-2 text-sm font-light focus:outline-none focus:border-gold"
          />
        </div>
        {erro && <p className="text-xs font-light text-destructive">{erro}</p>}
        {resetEnviado && <p className="text-xs font-light text-accent">E-mail de redefinição enviado.</p>}
        <button
          type="submit"
          disabled={carregando}
          className="w-full bg-foreground text-background py-2.5 text-sm font-light hover:bg-accent transition-colors duration-300 disabled:opacity-50"
        >
          {carregando ? "Entrando…" : "Entrar"}
        </button>
        <div className="flex justify-between text-xs font-light text-text-caption pt-2">
          <button type="button" onClick={handleSignup} className="hover:text-foreground transition-colors">
            Criar conta
          </button>
          <button type="button" onClick={handleReset} className="hover:text-foreground transition-colors">
            Esqueci a senha
          </button>
        </div>
      </form>
    </div>
  );
};

interface AdminGuardProps {
  children: React.ReactNode;
}

export const AdminGuard = ({ children }: AdminGuardProps) => {
  const { user, loading, signOut } = useAuth();
  const [autorizado, setAutorizado] = useState<boolean | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .rpc("is_editor", { _email: user.email ?? "" })
      .then(({ data }) => setAutorizado(Boolean(data)));
  }, [user]);

  if (loading) return null;
  if (!user) return <PageLayout><AdminLogin /></PageLayout>;
  if (autorizado === null) return null;

  if (!autorizado) {
    return (
      <PageLayout>
        <div className="container py-32 text-center max-w-md mx-auto">
          <h1 className="text-2xl font-display font-normal text-foreground mb-4">Acesso restrito</h1>
          <p className="text-sm font-light text-text-body">
            O e-mail <strong>{user.email}</strong> não está autorizado a acessar o painel de notícias.
          </p>
          <button onClick={signOut} className="mt-8 text-sm text-accent hover:text-foreground transition-colors">
            Sair
          </button>
        </div>
      </PageLayout>
    );
  }

  return <>{children}</>;
};

export default AdminLogin;

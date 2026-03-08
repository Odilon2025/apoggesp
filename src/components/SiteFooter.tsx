import { Link } from "react-router-dom";

const SiteFooter = () => (
  <footer className="border-t border-border bg-primary text-primary-foreground">
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-3">APOGESP</h3>
          <p className="text-sm opacity-80 leading-relaxed">
            Associação dos Analistas de Políticas Públicas e Gestão Governamental do Município de São Paulo.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3 uppercase tracking-wide opacity-70">Navegação</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/carreira" className="hover:opacity-100 transition-opacity">A Carreira</Link></li>
            <li><Link to="/atuacao" className="hover:opacity-100 transition-opacity">Atuação dos APPGGs</Link></li>
            <li><Link to="/publicacoes" className="hover:opacity-100 transition-opacity">Publicações</Link></li>
            <li><Link to="/apogesp" className="hover:opacity-100 transition-opacity">A APOGESP</Link></li>
            <li><Link to="/contato" className="hover:opacity-100 transition-opacity">Contato</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3 uppercase tracking-wide opacity-70">Contato</h4>
          <p className="text-sm opacity-80">contato@apogesp.org.br</p>
          <p className="text-sm opacity-80 mt-1">São Paulo — SP</p>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-primary-foreground/20 text-center text-xs opacity-60">
        © {new Date().getFullYear()} APOGESP. Todos os direitos reservados.
      </div>
    </div>
  </footer>
);

export default SiteFooter;

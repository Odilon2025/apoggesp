import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import CarreiraPage from "./pages/CarreiraPage";
import AtuacaoPage from "./pages/AtuacaoPage";
import PublicacoesPage from "./pages/PublicacoesPage";
import ApogespPage from "./pages/ApogespPage";
import ContatoPage from "./pages/ContatoPage";
import AreaAssociadoPage from "./pages/AreaAssociadoPage";
import BibliotecaPage from "./pages/area-associado/BibliotecaPage";
import WikiPage from "./pages/area-associado/WikiPage";
import WikiVerbetePage from "./pages/area-associado/WikiVerbetePage";
import ValorizacaoPage from "./pages/area-associado/ValorizacaoPage";
import GruposPage from "./pages/area-associado/GruposPage";
import TransparenciaPage from "./pages/area-associado/TransparenciaPage";
import VotacoesPage from "./pages/area-associado/VotacoesPage";
import DiversidadePage from "./pages/DiversidadePage";
import SustentabilidadePage from "./pages/SustentabilidadePage";
import CampanhaSalarialPage from "./pages/CampanhaSalarialPage";
import CampanhaNomeacaoPage from "./pages/CampanhaNomeacaoPage";
import PlanosAtuacaoPage from "./pages/PlanosAtuacaoPage";
import PlanosAmbientaisPage from "./pages/PlanosAmbientaisPage";
import ObservatorioEvasoesPage from "./pages/ObservatorioEvasoesPage";
import LinksUteisPage from "./pages/LinksUteisPage";
import OrgaosLotacoesPage from "./pages/OrgaosLotacoesPage";
import NoticiasPage from "./pages/NoticiasPage";
import NoticiaDetalhePage from "./pages/NoticiaDetalhePage";
import NoticiasAdminPage from "./pages/admin/NoticiasAdminPage";
import NoticiaEditorPage from "./pages/admin/NoticiaEditorPage";
import AdminHubPage from "./pages/admin/AdminHubPage";
import ConteudoListPage from "./pages/admin/ConteudoListPage";
import ConteudoEditorPage from "./pages/admin/ConteudoEditorPage";
import DadosCRUDPage from "./pages/admin/DadosCRUDPage";
import SnapshotEditorPage from "./pages/admin/SnapshotEditorPage";
import RevisoesPendentesPage from "./pages/admin/RevisoesPendentesPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import LoginPage from "./pages/LoginPage";
import OAuthConsentPage from "./pages/OAuthConsentPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/carreira" element={<CarreiraPage />} />
          <Route path="/atuacao" element={<AtuacaoPage />} />
          <Route path="/publicacoes" element={<PublicacoesPage />} />
          <Route path="/apogesp" element={<ApogespPage />} />
          <Route path="/contato" element={<ContatoPage />} />
          <Route path="/diversidade" element={<DiversidadePage />} />
          <Route path="/sustentabilidade" element={<SustentabilidadePage />} />
          <Route path="/area-associado" element={<AreaAssociadoPage />} />
          <Route path="/area-associado/biblioteca" element={<BibliotecaPage />} />
          <Route path="/area-associado/wiki" element={<WikiPage />} />
          <Route path="/area-associado/wiki/:slug" element={<WikiVerbetePage />} />
          <Route path="/area-associado/valorizacao" element={<ValorizacaoPage />} />
          <Route path="/area-associado/grupos" element={<GruposPage />} />
          <Route path="/area-associado/transparencia" element={<TransparenciaPage />} />
          <Route path="/campanha-salarial" element={<CampanhaSalarialPage />} />
          <Route path="/campanha-nomeacao" element={<CampanhaNomeacaoPage />} />
          <Route path="/planos-atuacao" element={<PlanosAtuacaoPage />} />
          <Route path="/planos-ambientais" element={<PlanosAmbientaisPage />} />
            <Route path="/observatorio-evasoes" element={<ObservatorioEvasoesPage />} />
            <Route path="/links-uteis" element={<LinksUteisPage />} />
            <Route path="/orgaos-lotacoes" element={<OrgaosLotacoesPage />} />

            <Route path="/noticias" element={<NoticiasPage />} />
          <Route path="/noticias/:slug" element={<NoticiaDetalhePage />} />
          <Route path="/admin" element={<AdminHubPage />} />
          <Route path="/admin/noticias" element={<NoticiasAdminPage />} />
          <Route path="/admin/noticias/nova" element={<NoticiaEditorPage />} />
          <Route path="/admin/noticias/:id" element={<NoticiaEditorPage />} />
          <Route path="/admin/conteudo" element={<ConteudoListPage />} />
          <Route path="/admin/conteudo/:pagina" element={<ConteudoEditorPage />} />
          <Route path="/admin/dados/snapshot_carreira" element={<SnapshotEditorPage />} />
          <Route path="/admin/dados/:tabela" element={<DadosCRUDPage />} />
          <Route path="/admin/revisoes" element={<RevisoesPendentesPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/.lovable/oauth/consent" element={<OAuthConsentPage />} />
          <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

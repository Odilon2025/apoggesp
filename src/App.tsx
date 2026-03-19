import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CarreiraPage from "./pages/CarreiraPage";
import AtuacaoPage from "./pages/AtuacaoPage";
import PublicacoesPage from "./pages/PublicacoesPage";
import ApogespPage from "./pages/ApogespPage";
import ContatoPage from "./pages/ContatoPage";
import AreaAssociadoPage from "./pages/AreaAssociadoPage";
import DiversidadePage from "./pages/DiversidadePage";
import CampanhaSalarialPage from "./pages/CampanhaSalarialPage";
import CampanhaNomeacaoPage from "./pages/CampanhaNomeacaoPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/carreira" element={<CarreiraPage />} />
          <Route path="/atuacao" element={<AtuacaoPage />} />
          <Route path="/publicacoes" element={<PublicacoesPage />} />
          <Route path="/apogesp" element={<ApogespPage />} />
          <Route path="/contato" element={<ContatoPage />} />
          <Route path="/diversidade" element={<DiversidadePage />} />
          <Route path="/area-associado" element={<AreaAssociadoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listNoticias from "./tools/list-noticias";
import getNoticia from "./tools/get-noticia";
import getSnapshotCarreira from "./tools/get-snapshot-carreira";
import listPublicacoes from "./tools/list-publicacoes";
import listWikiVerbetes from "./tools/list-wiki-verbetes";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "apogesp-mcp",
  title: "APOGESP",
  version: "0.1.0",
  instructions:
    "Ferramentas oficiais da APOGESP (Associação dos Analistas de Políticas Públicas e Gestão Governamental de São Paulo). " +
    "Use list_noticias e get_noticia para acessar notícias públicas, get_snapshot_carreira para dados da carreira APPGG, " +
    "list_publicacoes para publicações institucionais, e list_wiki_verbetes (requer login de associado) para a Wiki da Carreira.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listNoticias, getNoticia, getSnapshotCarreira, listPublicacoes, listWikiVerbetes],
});

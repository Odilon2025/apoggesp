import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

function supabaseForUser(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "list_wiki_verbetes",
  title: "Wiki da Carreira — verbetes",
  description: "Lista os verbetes publicados da Wiki da Carreira (Área do Associado). Requer que o usuário esteja autenticado como associado.",
  inputSchema: {
    slug: z.string().optional().describe("Se informado, retorna apenas o verbete com este slug (incluindo conteúdo)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ slug }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Autenticação necessária. Faça login como associado APOGESP." }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("wiki_verbetes")
      .select("dados_publicado,ordem")
      .eq("publicado", true)
      .eq("deletado", false)
      .not("dados_publicado", "is", null)
      .order("ordem", { ascending: true });
    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    let items = (data ?? []).map((r: any) => r.dados_publicado);
    if (slug) items = items.filter((v: any) => v?.slug === slug);
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { verbetes: items },
    };
  },
});

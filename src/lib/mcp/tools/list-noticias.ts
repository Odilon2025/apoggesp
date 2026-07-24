import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

export default defineTool({
  name: "list_noticias",
  title: "Listar notícias APOGESP",
  description: "Lista as notícias publicadas no site da APOGESP, ordenadas da mais recente para a mais antiga.",
  inputSchema: {
    limit: z.number().int().min(1).max(50).optional().describe("Número máximo de notícias (padrão 10)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit }) => {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!);
    const { data, error } = await supabase
      .from("noticias")
      .select("slug,titulo,resumo,autor,publicado_em")
      .eq("publicado", true)
      .order("publicado_em", { ascending: false })
      .limit(limit ?? 10);
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { noticias: data ?? [] },
    };
  },
});

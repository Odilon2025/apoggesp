import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

export default defineTool({
  name: "get_noticia",
  title: "Ler notícia por slug",
  description: "Retorna o conteúdo completo de uma notícia publicada da APOGESP pelo slug.",
  inputSchema: {
    slug: z.string().min(1).describe("Slug da notícia (parte final da URL)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ slug }) => {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!);
    const { data, error } = await supabase
      .from("noticias")
      .select("slug,titulo,resumo,conteudo,autor,publicado_em")
      .eq("slug", slug)
      .eq("publicado", true)
      .maybeSingle();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    if (!data) return { content: [{ type: "text", text: "Notícia não encontrada." }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { noticia: data },
    };
  },
});

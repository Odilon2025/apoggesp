export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      associado_avisos: {
        Row: {
          created_at: string
          dados_publicado: Json | null
          dados_rascunho: Json | null
          deletado: boolean
          id: string
          ordem: number
          publicado: boolean
          tem_rascunho: boolean
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          dados_publicado?: Json | null
          dados_rascunho?: Json | null
          deletado?: boolean
          id?: string
          ordem?: number
          publicado?: boolean
          tem_rascunho?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          dados_publicado?: Json | null
          dados_rascunho?: Json | null
          deletado?: boolean
          id?: string
          ordem?: number
          publicado?: boolean
          tem_rascunho?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      associate_whitelist: {
        Row: {
          added_at: string
          email: string
          note: string | null
        }
        Insert: {
          added_at?: string
          email: string
          note?: string | null
        }
        Update: {
          added_at?: string
          email?: string
          note?: string | null
        }
        Relationships: []
      }
      atos_normativos_itens: {
        Row: {
          created_at: string
          dados_publicado: Json | null
          dados_rascunho: Json | null
          deletado: boolean
          id: string
          ordem: number
          publicado: boolean
          tem_rascunho: boolean
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          dados_publicado?: Json | null
          dados_rascunho?: Json | null
          deletado?: boolean
          id?: string
          ordem?: number
          publicado?: boolean
          tem_rascunho?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          dados_publicado?: Json | null
          dados_rascunho?: Json | null
          deletado?: boolean
          id?: string
          ordem?: number
          publicado?: boolean
          tem_rascunho?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      atuacao_destaques: {
        Row: {
          created_at: string
          dados_publicado: Json | null
          dados_rascunho: Json | null
          deletado: boolean
          id: string
          ordem: number
          publicado: boolean
          tem_rascunho: boolean
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          dados_publicado?: Json | null
          dados_rascunho?: Json | null
          deletado?: boolean
          id?: string
          ordem?: number
          publicado?: boolean
          tem_rascunho?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          dados_publicado?: Json | null
          dados_rascunho?: Json | null
          deletado?: boolean
          id?: string
          ordem?: number
          publicado?: boolean
          tem_rascunho?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      biblioteca_itens: {
        Row: {
          created_at: string
          dados_publicado: Json | null
          dados_rascunho: Json | null
          deletado: boolean
          id: string
          ordem: number
          publicado: boolean
          tem_rascunho: boolean
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          dados_publicado?: Json | null
          dados_rascunho?: Json | null
          deletado?: boolean
          id?: string
          ordem?: number
          publicado?: boolean
          tem_rascunho?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          dados_publicado?: Json | null
          dados_rascunho?: Json | null
          deletado?: boolean
          id?: string
          ordem?: number
          publicado?: boolean
          tem_rascunho?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      casos_atuacao: {
        Row: {
          created_at: string
          dados_publicado: Json | null
          dados_rascunho: Json | null
          deletado: boolean
          id: string
          ordem: number
          publicado: boolean
          tem_rascunho: boolean
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          dados_publicado?: Json | null
          dados_rascunho?: Json | null
          deletado?: boolean
          id?: string
          ordem?: number
          publicado?: boolean
          tem_rascunho?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          dados_publicado?: Json | null
          dados_rascunho?: Json | null
          deletado?: boolean
          id?: string
          ordem?: number
          publicado?: boolean
          tem_rascunho?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      cms_notas: {
        Row: {
          alvo: string
          alvo_label: string | null
          autor_email: string
          campo: string | null
          created_at: string
          escopo: string
          id: string
          resolvida_em: string | null
          resolvida_por: string | null
          status: string
          texto: string
          updated_at: string
        }
        Insert: {
          alvo: string
          alvo_label?: string | null
          autor_email: string
          campo?: string | null
          created_at?: string
          escopo: string
          id?: string
          resolvida_em?: string | null
          resolvida_por?: string | null
          status?: string
          texto: string
          updated_at?: string
        }
        Update: {
          alvo?: string
          alvo_label?: string | null
          autor_email?: string
          campo?: string | null
          created_at?: string
          escopo?: string
          id?: string
          resolvida_em?: string | null
          resolvida_por?: string | null
          status?: string
          texto?: string
          updated_at?: string
        }
        Relationships: []
      }
      cronologia_itens: {
        Row: {
          created_at: string
          dados_publicado: Json | null
          dados_rascunho: Json | null
          deletado: boolean
          id: string
          ordem: number
          publicado: boolean
          tem_rascunho: boolean
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          dados_publicado?: Json | null
          dados_rascunho?: Json | null
          deletado?: boolean
          id?: string
          ordem?: number
          publicado?: boolean
          tem_rascunho?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          dados_publicado?: Json | null
          dados_rascunho?: Json | null
          deletado?: boolean
          id?: string
          ordem?: number
          publicado?: boolean
          tem_rascunho?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      grupos_trabalho: {
        Row: {
          created_at: string
          dados_publicado: Json | null
          dados_rascunho: Json | null
          deletado: boolean
          id: string
          ordem: number
          publicado: boolean
          tem_rascunho: boolean
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          dados_publicado?: Json | null
          dados_rascunho?: Json | null
          deletado?: boolean
          id?: string
          ordem?: number
          publicado?: boolean
          tem_rascunho?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          dados_publicado?: Json | null
          dados_rascunho?: Json | null
          deletado?: boolean
          id?: string
          ordem?: number
          publicado?: boolean
          tem_rascunho?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      noticias: {
        Row: {
          autor: string
          capa_url: string | null
          conteudo: string
          created_at: string
          id: string
          publicado: boolean
          publicado_em: string
          resumo: string
          slug: string
          titulo: string
          updated_at: string
        }
        Insert: {
          autor: string
          capa_url?: string | null
          conteudo: string
          created_at?: string
          id?: string
          publicado?: boolean
          publicado_em?: string
          resumo: string
          slug: string
          titulo: string
          updated_at?: string
        }
        Update: {
          autor?: string
          capa_url?: string | null
          conteudo?: string
          created_at?: string
          id?: string
          publicado?: boolean
          publicado_em?: string
          resumo?: string
          slug?: string
          titulo?: string
          updated_at?: string
        }
        Relationships: []
      }
      noticias_editores: {
        Row: {
          added_at: string
          email: string
          nome: string | null
        }
        Insert: {
          added_at?: string
          email: string
          nome?: string | null
        }
        Update: {
          added_at?: string
          email?: string
          nome?: string | null
        }
        Relationships: []
      }
      observatorio_categorias: {
        Row: {
          created_at: string
          dados_publicado: Json | null
          dados_rascunho: Json | null
          deletado: boolean
          id: string
          ordem: number
          publicado: boolean
          tem_rascunho: boolean
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          dados_publicado?: Json | null
          dados_rascunho?: Json | null
          deletado?: boolean
          id?: string
          ordem?: number
          publicado?: boolean
          tem_rascunho?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          dados_publicado?: Json | null
          dados_rascunho?: Json | null
          deletado?: boolean
          id?: string
          ordem?: number
          publicado?: boolean
          tem_rascunho?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      observatorio_indicadores: {
        Row: {
          created_at: string
          dados_publicado: Json | null
          dados_rascunho: Json | null
          deletado: boolean
          id: string
          ordem: number
          publicado: boolean
          tem_rascunho: boolean
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          dados_publicado?: Json | null
          dados_rascunho?: Json | null
          deletado?: boolean
          id?: string
          ordem?: number
          publicado?: boolean
          tem_rascunho?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          dados_publicado?: Json | null
          dados_rascunho?: Json | null
          deletado?: boolean
          id?: string
          ordem?: number
          publicado?: boolean
          tem_rascunho?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      page_fields: {
        Row: {
          descricao: string | null
          key: string
          ordem: number
          pagina: string
          tem_rascunho: boolean
          tipo: string
          updated_at: string
          updated_by: string | null
          value_publicado: string | null
          value_rascunho: string | null
        }
        Insert: {
          descricao?: string | null
          key: string
          ordem?: number
          pagina: string
          tem_rascunho?: boolean
          tipo?: string
          updated_at?: string
          updated_by?: string | null
          value_publicado?: string | null
          value_rascunho?: string | null
        }
        Update: {
          descricao?: string | null
          key?: string
          ordem?: number
          pagina?: string
          tem_rascunho?: boolean
          tipo?: string
          updated_at?: string
          updated_by?: string | null
          value_publicado?: string | null
          value_rascunho?: string | null
        }
        Relationships: []
      }
      planos_itens: {
        Row: {
          created_at: string
          dados_publicado: Json | null
          dados_rascunho: Json | null
          deletado: boolean
          id: string
          ordem: number
          publicado: boolean
          tem_rascunho: boolean
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          dados_publicado?: Json | null
          dados_rascunho?: Json | null
          deletado?: boolean
          id?: string
          ordem?: number
          publicado?: boolean
          tem_rascunho?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          dados_publicado?: Json | null
          dados_rascunho?: Json | null
          deletado?: boolean
          id?: string
          ordem?: number
          publicado?: boolean
          tem_rascunho?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      publicacoes_itens: {
        Row: {
          created_at: string
          dados_publicado: Json | null
          dados_rascunho: Json | null
          deletado: boolean
          id: string
          ordem: number
          publicado: boolean
          tem_rascunho: boolean
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          dados_publicado?: Json | null
          dados_rascunho?: Json | null
          deletado?: boolean
          id?: string
          ordem?: number
          publicado?: boolean
          tem_rascunho?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          dados_publicado?: Json | null
          dados_rascunho?: Json | null
          deletado?: boolean
          id?: string
          ordem?: number
          publicado?: boolean
          tem_rascunho?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      snapshot_carreira: {
        Row: {
          dados_publicado: Json | null
          dados_rascunho: Json | null
          id: string
          tem_rascunho: boolean
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          dados_publicado?: Json | null
          dados_rascunho?: Json | null
          id?: string
          tem_rascunho?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          dados_publicado?: Json | null
          dados_rascunho?: Json | null
          id?: string
          tem_rascunho?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      transparencia_itens: {
        Row: {
          created_at: string
          dados_publicado: Json | null
          dados_rascunho: Json | null
          deletado: boolean
          id: string
          ordem: number
          publicado: boolean
          tem_rascunho: boolean
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          dados_publicado?: Json | null
          dados_rascunho?: Json | null
          deletado?: boolean
          id?: string
          ordem?: number
          publicado?: boolean
          tem_rascunho?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          dados_publicado?: Json | null
          dados_rascunho?: Json | null
          deletado?: boolean
          id?: string
          ordem?: number
          publicado?: boolean
          tem_rascunho?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      valorizacao_acoes: {
        Row: {
          created_at: string
          dados_publicado: Json | null
          dados_rascunho: Json | null
          deletado: boolean
          id: string
          ordem: number
          publicado: boolean
          tem_rascunho: boolean
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          dados_publicado?: Json | null
          dados_rascunho?: Json | null
          deletado?: boolean
          id?: string
          ordem?: number
          publicado?: boolean
          tem_rascunho?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          dados_publicado?: Json | null
          dados_rascunho?: Json | null
          deletado?: boolean
          id?: string
          ordem?: number
          publicado?: boolean
          tem_rascunho?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      wiki_verbetes: {
        Row: {
          created_at: string
          dados_publicado: Json | null
          dados_rascunho: Json | null
          deletado: boolean
          id: string
          ordem: number
          publicado: boolean
          tem_rascunho: boolean
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          dados_publicado?: Json | null
          dados_rascunho?: Json | null
          deletado?: boolean
          id?: string
          ordem?: number
          publicado?: boolean
          tem_rascunho?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          dados_publicado?: Json | null
          dados_rascunho?: Json | null
          deletado?: boolean
          id?: string
          ordem?: number
          publicado?: boolean
          tem_rascunho?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      discard_field_draft: { Args: { _key: string }; Returns: undefined }
      is_editor: { Args: { _email: string }; Returns: boolean }
      publish_cms_all: { Args: { _table: string }; Returns: undefined }
      publish_cms_item: {
        Args: { _id: string; _table: string }
        Returns: undefined
      }
      publish_field: { Args: { _key: string }; Returns: undefined }
      publish_page: { Args: { _pagina: string }; Returns: undefined }
      publish_snapshot: { Args: never; Returns: undefined }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

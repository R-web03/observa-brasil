// Tipos do banco, escritos à mão a partir de supabase/migrations/.
// Depois de criar o projeto no Supabase, gere a versão oficial com:
//   npx supabase gen types typescript --project-id <id> > src/lib/database.types.ts

export type Database = {
  public: {
    Tables: {
      observacoes: {
        Row: {
          serie_id: string;
          data: string;
          valor: number;
          preliminar: boolean;
          coletado_em: string;
        };
        Insert: {
          serie_id: string;
          data: string;
          valor: number;
          preliminar?: boolean;
          coletado_em?: string;
        };
        Update: Partial<Database['public']['Tables']['observacoes']['Insert']>;
        Relationships: [];
      };
      ingestoes: {
        Row: {
          id: number;
          serie_id: string;
          iniciada_em: string;
          terminada_em: string | null;
          status: 'rodando' | 'ok' | 'erro';
          linhas: number;
          erro: string | null;
        };
        Insert: {
          serie_id: string;
          iniciada_em?: string;
          terminada_em?: string | null;
          status?: 'rodando' | 'ok' | 'erro';
          linhas?: number;
          erro?: string | null;
        };
        Update: Partial<Database['public']['Tables']['ingestoes']['Insert']>;
        Relationships: [];
      };
      pedidos_correcao: {
        Row: {
          id: string;
          pagina: string;
          trecho: string | null;
          descricao: string;
          fonte_sugerida: string | null;
          email: string | null;
          status: 'novo' | 'em-analise' | 'aceito' | 'recusado' | 'duplicado';
          resposta: string | null;
          respondido_em: string | null;
          ip_hash: string;
          criado_em: string;
        };
        Insert: {
          pagina: string;
          trecho?: string | null;
          descricao: string;
          fonte_sugerida?: string | null;
          email?: string | null;
          ip_hash: string;
        };
        Update: Partial<Database['public']['Tables']['pedidos_correcao']['Row']>;
        Relationships: [];
      };
    };
    Views: {
      ultimas_observacoes: {
        Row: {
          serie_id: string;
          data: string;
          valor: number;
          preliminar: boolean;
          coletado_em: string;
        };
        Relationships: [];
      };
    };
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

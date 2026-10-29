// Cliente do Supabase para uso no servidor (build e rotas de API).
// A chave service_role nunca vai para o navegador: este módulo só é
// importado por código de servidor, e as variáveis vêm de astro:env/server.
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } from 'astro:env/server';
import type { Database } from './database.types';

let cliente: SupabaseClient<Database> | null = null;

/** Devolve o cliente, ou null quando o banco ainda não foi configurado. */
export function supabaseServidor(): SupabaseClient<Database> | null {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return null;
  cliente ??= createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cliente;
}

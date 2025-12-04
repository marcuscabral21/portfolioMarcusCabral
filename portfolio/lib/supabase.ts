// lib/supabase.ts - VERSÃO CORRIGIDA
import { createClient } from '@supabase/supabase-js'

// Verificar se as variáveis existem
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(`
    ❌ Variáveis de ambiente do Supabase não configuradas!
    
    Adicione no seu .env.local:
    NEXT_PUBLIC_SUPABASE_URL=sua_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
    
    Obtenha as chaves em: Supabase Dashboard > Settings > API
  `)
}

// Criar cliente APENAS com anon key
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
})

// Opcional: para server-side (API routes, Server Actions)
export const getSupabaseServerClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  
  return createClient(supabaseUrl, supabaseServiceKey)
}
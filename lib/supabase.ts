import { createClient } from '@supabase/supabase-js';

export type Post = {
  id: string;
  created_at: string;
  author_name: string;
  author_avatar: string | null;
  content: string;
  tag: string | null;
  likes: number;
  sentiment: 'Positiv' | 'Negativ' | 'Neutral' | 'Kaotisk' | null;
  is_anonymous: boolean;
};

export type InsertPost = Omit<Post, 'id' | 'created_at' | 'likes'>;

export function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(supabaseUrl, supabaseKey);
}

export async function checkSupabaseConnection(): Promise<{ ok: boolean; latencyMs: number }> {
  const start = Date.now();
  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from('posts').select('id', { count: 'exact', head: true });
    const latencyMs = Date.now() - start;
    
    if (error) throw error;
    
    return { ok: true, latencyMs };
  } catch {
    return { ok: false, latencyMs: Date.now() - start };
  }
}

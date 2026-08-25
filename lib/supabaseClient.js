import { createClient } from '@supabase/supabase-js';

// This connects the app to Supabase so the project is wired up correctly.
// It is not queried anywhere yet in Week 0 — that comes in a later phase
// once the Explore page and its data table are built.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

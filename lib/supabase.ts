import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || "";

function isValidUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

// Server-side client with service role key — only use in API routes / server code.
// Never import this into client components.
//
// If real Supabase credentials haven't been set yet (e.g. during local setup
// or a build with placeholder env vars), fall back to a harmless dummy URL so
// the client can be constructed without crashing module evaluation. Any
// actual call against it will fail at request time with a clear error
// instead of breaking the build.
export const supabaseAdmin = createClient(
  isValidUrl(supabaseUrl) ? supabaseUrl : "https://placeholder.supabase.co",
  supabaseServiceKey || "placeholder-service-key",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

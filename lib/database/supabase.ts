import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabasePublicEnv } from "@/lib/database/env";

let publicClient: SupabaseClient | undefined;

export function getSupabasePublicClient(): SupabaseClient {
  if (publicClient) {
    return publicClient;
  }

  const { url, publishableKey } = getSupabasePublicEnv();

  publicClient = createClient(url, publishableKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  return publicClient;
}

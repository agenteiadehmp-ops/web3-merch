import { getSupabasePublicClient } from "@/lib/database/supabase";

export interface SupportedCollectionContract {
  contract_address: string;
  external_collection_id: string | null;
  token_standard: string | null;
  chain_key: string;
  chain_name: string;
  chain_family: string;
  chain_id: number | null;
  network_reference: string | null;
}

export interface SupportedCollection {
  collection_id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  merchandising_rules: Record<string, unknown>;
  contracts: SupportedCollectionContract[];
}

export async function getSupportedCollections(): Promise<SupportedCollection[]> {
  const supabase = getSupabasePublicClient();
  const { data, error } = await supabase.rpc("get_supported_collections");

  if (error) {
    throw new Error(`Unable to load supported collections: ${error.message}`);
  }

  return (data ?? []) as SupportedCollection[];
}

export type StoreStatus = "active" | "inactive";

export type ChainFamily = "evm" | "solana" | "bitcoin" | "other";

export type CollectionStatus =
  | "draft"
  | "under_review"
  | "active"
  | "inactive";

export type LicenseStatus =
  | "unknown"
  | "under_review"
  | "approved"
  | "restricted"
  | "disabled";

export type ContractVerificationStatus =
  | "unverified"
  | "verified"
  | "rejected";

export interface StoreRecord {
  id: string;
  name: string;
  slug: string;
  status: StoreStatus;
  created_at: string;
  updated_at: string;
}

export interface ChainRecord {
  id: string;
  key: string;
  name: string;
  family: ChainFamily;
  chain_id: number | null;
  network_reference: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CollectionRecord {
  id: string;
  store_id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  status: CollectionStatus;
  merchandising_enabled: boolean;
  license_status: LicenseStatus;
  license_source: string | null;
  license_notes: string | null;
  merchandising_rules: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CollectionContractRecord {
  id: string;
  collection_id: string;
  chain_id: string;
  contract_address: string;
  external_collection_id: string | null;
  token_standard: string | null;
  verification_status: ContractVerificationStatus;
  verification_source: string | null;
  verified_at: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

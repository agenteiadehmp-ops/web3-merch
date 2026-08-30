begin;

create table public.stores (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  status text not null default 'active'
    check (status in ('active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.chains (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  name text not null,
  family text not null
    check (family in ('evm', 'solana', 'bitcoin', 'other')),
  chain_id bigint,
  network_reference text,
  active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (family <> 'evm' or chain_id is not null)
);

create unique index chains_evm_chain_id_unique
  on public.chains (chain_id)
  where family = 'evm' and chain_id is not null;

create table public.collections (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  name text not null,
  slug text not null,
  logo_url text,
  status text not null default 'draft'
    check (status in ('draft', 'under_review', 'active', 'inactive')),
  merchandising_enabled boolean not null default false,
  license_status text not null default 'unknown'
    check (license_status in ('unknown', 'under_review', 'approved', 'restricted', 'disabled')),
  license_source text,
  license_notes text,
  merchandising_rules jsonb not null default '{}'::jsonb
    check (jsonb_typeof(merchandising_rules) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (store_id, slug),
  check (
    merchandising_enabled = false
    or (status = 'active' and license_status = 'approved')
  )
);

create index collections_store_id_idx
  on public.collections (store_id);

create table public.collection_contracts (
  id uuid primary key default gen_random_uuid(),
  collection_id uuid not null references public.collections(id) on delete cascade,
  chain_id uuid not null references public.chains(id) on delete restrict,
  contract_address text not null,
  external_collection_id text,
  token_standard text,
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'verified', 'rejected')),
  verification_source text,
  verified_at timestamptz,
  active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (collection_id, chain_id, contract_address),
  check (active = false or verification_status = 'verified')
);

create index collection_contracts_collection_id_idx
  on public.collection_contracts (collection_id);

create index collection_contracts_chain_id_idx
  on public.collection_contracts (chain_id);

comment on table public.stores is
  'Tenant/store boundary. The MVP uses one store, while preserving a path to creator storefronts later.';

comment on table public.chains is
  'Blockchain registry. EVM networks use numeric chain_id; other families may use network_reference.';

comment on table public.collections is
  'Merch-enabled NFT collection registry. A collection cannot be enabled unless its license is approved and its status is active.';

comment on table public.collection_contracts is
  'Verified on-chain identifiers for collections. Contracts remain inactive until independently verified.';

alter table public.stores enable row level security;
alter table public.chains enable row level security;
alter table public.collections enable row level security;
alter table public.collection_contracts enable row level security;

revoke all on table public.stores from anon, authenticated;
revoke all on table public.chains from anon, authenticated;
revoke all on table public.collections from anon, authenticated;
revoke all on table public.collection_contracts from anon, authenticated;

grant all on table public.stores to service_role;
grant all on table public.chains to service_role;
grant all on table public.collections to service_role;
grant all on table public.collection_contracts to service_role;

commit;

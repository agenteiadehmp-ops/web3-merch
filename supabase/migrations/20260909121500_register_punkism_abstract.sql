begin;

-- Technical registration only.
-- Merchandising remains blocked until commercial-use rights are explicitly verified.

insert into public.chains (
  key,
  name,
  family,
  chain_id,
  network_reference,
  active
)
values (
  'abstract-mainnet',
  'Abstract',
  'evm',
  2741,
  'eip155:2741',
  true
)
on conflict (key) do update
set
  name = excluded.name,
  family = excluded.family,
  chain_id = excluded.chain_id,
  network_reference = excluded.network_reference,
  active = excluded.active,
  updated_at = now();

update public.collections
set
  status = 'under_review',
  license_status = 'unknown',
  merchandising_enabled = false,
  license_notes = 'Commercial merchandising rights not yet verified. Technical NFT detection only.',
  updated_at = now()
where slug = 'punkism';

with punkism as (
  select id
  from public.collections
  where slug = 'punkism'
),
abstract as (
  select id
  from public.chains
  where key = 'abstract-mainnet'
)
insert into public.collection_contracts (
  collection_id,
  chain_id,
  contract_address,
  token_standard,
  verification_status,
  verification_source,
  verified_at,
  active
)
select
  punkism.id,
  abstract.id,
  '0x267db21df5e870f0506ec95d0b094195d85963b8',
  'ERC-721',
  'verified',
  'Abstract docs (chain 2741) + Abscan/OpenSea contract cross-check, verified 2026-09-09',
  now(),
  true
from punkism
cross join abstract
on conflict (collection_id, chain_id, contract_address) do update
set
  token_standard = excluded.token_standard,
  verification_status = excluded.verification_status,
  verification_source = excluded.verification_source,
  verified_at = excluded.verified_at,
  active = excluded.active,
  updated_at = now();

commit;

-- Bootstrap data only.
-- Contract addresses, chains, token standards and commercial-use approvals are
-- intentionally NOT guessed here. They will be added after source verification.

insert into public.stores (name, slug, status)
values ('Web3 Merch', 'web3-merch', 'active')
on conflict (slug) do nothing;

with target_store as (
  select id
  from public.stores
  where slug = 'web3-merch'
)
insert into public.collections (
  store_id,
  name,
  slug,
  status,
  merchandising_enabled,
  license_status
)
select
  target_store.id,
  collection.name,
  collection.slug,
  'under_review',
  false,
  'unknown'
from target_store
cross join (
  values
    ('Punkism', 'punkism'),
    ('Polygon Ape: The Evolution', 'polygon-ape-the-evolution'),
    ('Doodrillas', 'doodrillas'),
    ('BackPunks', 'backpunks')
) as collection(name, slug)
on conflict (store_id, slug) do nothing;

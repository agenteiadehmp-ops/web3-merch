begin;

create or replace function public.get_detectable_collections()
returns table (
  collection_id uuid,
  name text,
  slug text,
  logo_url text,
  status text,
  license_status text,
  merchandising_enabled boolean,
  contracts jsonb
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    c.id as collection_id,
    c.name,
    c.slug,
    c.logo_url,
    c.status,
    c.license_status,
    c.merchandising_enabled,
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'contract_address', cc.contract_address,
          'external_collection_id', cc.external_collection_id,
          'token_standard', cc.token_standard,
          'chain_key', ch.key,
          'chain_name', ch.name,
          'chain_family', ch.family,
          'chain_id', ch.chain_id,
          'network_reference', ch.network_reference
        )
        order by ch.key, cc.contract_address
      ) filter (where cc.id is not null and ch.id is not null),
      '[]'::jsonb
    ) as contracts
  from public.collections c
  join public.collection_contracts cc
    on cc.collection_id = c.id
   and cc.active = true
   and cc.verification_status = 'verified'
  join public.chains ch
    on ch.id = cc.chain_id
   and ch.active = true
  where c.status in ('under_review', 'active')
  group by
    c.id,
    c.name,
    c.slug,
    c.logo_url,
    c.status,
    c.license_status,
    c.merchandising_enabled
  order by c.name;
$$;

revoke all on function public.get_detectable_collections() from public;
grant execute on function public.get_detectable_collections() to anon, authenticated;

comment on function public.get_detectable_collections() is
  'Returns technically verified active collection contracts for NFT discovery. Merchandising approval remains a separate gate.';

commit;

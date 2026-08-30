begin;

create or replace function public.get_supported_collections()
returns table (
  collection_id uuid,
  name text,
  slug text,
  logo_url text,
  merchandising_rules jsonb,
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
    c.merchandising_rules,
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
  where c.status = 'active'
    and c.license_status = 'approved'
    and c.merchandising_enabled = true
  group by
    c.id,
    c.name,
    c.slug,
    c.logo_url,
    c.merchandising_rules
  order by c.name;
$$;

revoke all on function public.get_supported_collections() from public;
grant execute on function public.get_supported_collections() to anon, authenticated;

comment on function public.get_supported_collections() is
  'Returns only merchandising-approved collections with verified active contracts. Safe public registry surface for the MVP.';

commit;

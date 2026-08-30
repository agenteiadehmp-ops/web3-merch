# Supabase data layer

The MVP currently uses Supabase/Postgres for the supported collection registry.

## Schema

- `stores`
- `chains`
- `collections`
- `collection_contracts`

The four pilot collections are seeded in `seed.sql`, but no blockchain, contract
address, token standard, or commercial-use permission is guessed.

## Public read surface

The tables themselves remain locked down with RLS and revoked direct grants.

The application uses only:

```sql
public.get_supported_collections()
```

This RPC returns a collection only when all of these are true:

- collection status is `active`
- license status is `approved`
- merchandising is enabled
- at least one contract is verified and active
- the referenced chain is active

The function is executable by `anon` and `authenticated`, but does not grant
those roles direct table access.

## Environment variables

The browser-safe connection needs:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```

Do not commit real environment values. Put them in `.env.local` locally and in
the deployment provider's environment settings later.

A service-role/secret key is not needed for the current public registry read and
must never be exposed to browser code.

## Applying schema

For the first remote project bootstrap, use the Supabase SQL Editor and execute,
in order:

1. `migrations/20260830155000_create_collection_registry.sql`
2. `migrations/20260830161500_create_supported_collections_rpc.sql`
3. `seed.sql`

Afterwards, running this should return zero rows until a collection is explicitly
approved and a verified contract/chain is activated:

```sql
select * from public.get_supported_collections();
```

That empty result is expected and is the safe default.

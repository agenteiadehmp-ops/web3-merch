# Supabase data layer

Task 2 introduces only the minimum registry needed before wallet/NFT discovery:

- `stores`
- `chains`
- `collections`
- `collection_contracts`

The initial four pilot collections are seeded in `seed.sql`, but no blockchain,
contract address, token standard, or commercial-use permission is guessed.

## Security posture

All four tables:

- have Row Level Security enabled;
- revoke direct access from `anon` and `authenticated`;
- are intended to be accessed server-side until explicit public read policies are designed.

A future Supabase service-role/secret key must never be exposed through
`NEXT_PUBLIC_*` variables.

## Local workflow

Once Supabase CLI is introduced and available:

```bash
supabase start
supabase db reset
```

Schema changes should be added as new migration files rather than edited directly
on a remote database.

## Activation rule

A collection cannot have `merchandising_enabled = true` unless both are true:

- `status = 'active'`
- `license_status = 'approved'`

A collection contract cannot have `active = true` until
`verification_status = 'verified'`.

These constraints deliberately make "unknown" safe by default.

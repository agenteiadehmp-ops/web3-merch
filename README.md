# Web3 Merch — MVP

Physical merchandising for NFT holders.

> Wallet → NFT → Physical Product → Digital Identity

The first validation target is:

**real wallet → real NFT → real payment → real premium T-shirt → real customer**

## Current status

Foundation in place:

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- ESLint
- mobile-first dark landing page
- GitHub Actions validation
- Supabase/Postgres collection registry schema
- four pilot collections seeded in a non-sellable state
- browser-safe Supabase client boundary
- restricted RPC for supported-collection reads

Not included yet:

- remote schema applied to the Supabase project
- wallet connection
- NFT indexer
- blockchain ownership reads
- Stripe
- print-on-demand provider integration

## Requirements

- Node.js 22+
- npm

## Local setup

```bash
npm install
npm run dev
```

Create a local `.env.local` with:

```text
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

Never commit `.env.local`.

## Validation

```bash
npm run verify
```

This runs typecheck, lint, and the Next.js production build.

## Collection registry

The supported-collection architecture lives in Postgres rather than collection-specific application logic.

Current tables:

```text
stores
chains
collections
collection_contracts
```

The application does not read those tables directly with the publishable key.
Instead it uses the restricted `get_supported_collections()` RPC.

See `supabase/README.md`.

## Security baseline

- Never request or store seed phrases/private keys.
- Never commit secret `.env` files.
- Never expose a Supabase service-role/secret key in browser code.
- Collection merchandising stays disabled until commercial-use rights are approved.
- Collection contracts stay inactive until verified.
- Public Supabase access is limited to an explicit read-only RPC surface.
- Payment fulfillment will eventually be driven by verified Stripe webhooks.

## Continuous integration

GitHub Actions runs on every push and pull request to `main`:

```bash
npm install --no-audit --no-fund
npm run verify
```

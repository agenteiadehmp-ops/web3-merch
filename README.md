# Web3 Merch — MVP

Physical merchandising for NFT holders.

> Wallet → NFT → Physical Product → Digital Identity

This repository starts deliberately small. The first validation target is one real flow:

**real wallet → real NFT → real payment → real premium T-shirt → real customer**

## Current status

Completed foundation:

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- ESLint
- mobile-first dark landing page
- GitHub Actions validation
- initial Supabase/Postgres collection registry schema
- four pilot collections seeded in a safe, non-sellable state

Not included yet:

- live Supabase project connection
- wallet connection
- NFT indexer
- blockchain reads
- Stripe
- print-on-demand provider integration

## Requirements

- Node.js 20.9+
- npm

## Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

Before closing a development task, run:

```bash
npm run verify
```

This runs typecheck, lint, and Next.js build.

## Collection registry

The supported-collection architecture lives in Postgres rather than collection-specific application logic.

Current tables:

```text
stores
chains
collections
collection_contracts
```

The bootstrap seed includes Punkism, Polygon Ape: The Evolution, Doodrillas and BackPunks, but intentionally leaves their networks/contracts/licensing unverified.

See `supabase/README.md` for the security and activation rules.

## Architecture boundaries

The MVP stays in one Next.js application. External systems are introduced behind small boundaries when needed, rather than in advance.

Future feature areas already have directories for wallet, collections, NFTs, product building, checkout, and orders.

## Security baseline

- Never request or store seed phrases/private keys.
- Never commit secret `.env` files.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` in the browser.
- Public browser configuration and server secrets must remain separated.
- Wallet data and prices must be validated server-side when those features are introduced.
- Payment fulfillment must eventually be driven by verified Stripe webhooks.
- Collection merchandising stays disabled until commercial-use rights are approved.
- Collection contracts stay inactive until verified.

## Continuous integration

GitHub Actions runs on every push and pull request to `main` and executes:

```bash
npm install --no-audit --no-fund
npm run verify
```

The first environment that generates `package-lock.json` should commit it; CI can then switch from `npm install` to `npm ci`.

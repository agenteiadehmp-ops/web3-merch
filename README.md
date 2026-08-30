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
- GitHub Actions validation
- Supabase/Postgres supported-collection registry
- Reown AppKit + Wagmi + Viem wallet connection
- disconnect state and connected address/chain UI

Not included yet:

- NFT discovery/indexer
- verified collection contract mappings
- ownership verification
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

Create `.env.local`:

```text
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
NEXT_PUBLIC_REOWN_PROJECT_ID=...
```

The Reown project ID and Supabase publishable key are public client identifiers,
not privileged secrets. Server-only secrets must never use `NEXT_PUBLIC_`.

## Wallet architecture

The wallet layer uses:

- Reown AppKit
- Wagmi 2.x
- Viem
- TanStack Query

Current wallet-capability networks are Ethereum mainnet, Polygon and Base. These
are connectivity options only. They do **not** assert that any pilot collection
lives on those chains.

Current scope:

- connect wallet
- disconnect wallet
- display wallet address
- display connected chain

Not yet implemented:

- message signing
- NFT reads
- ownership verification
- blockchain transactions
- crypto payments

## Validation

```bash
npm run verify
```

This runs typecheck, lint, and the Next.js production build.

## Security baseline

- Never request or store seed phrases/private keys.
- Connecting a wallet does not grant access to funds.
- No transaction is requested in the current flow.
- Never commit server secrets.
- Collection merchandising stays disabled until commercial-use rights are approved.
- Collection contracts stay inactive until verified.
- Public Supabase access is limited to an explicit read-only RPC surface.

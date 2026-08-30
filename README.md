# Web3 Merch — MVP

Physical merchandising for NFT holders.

> Wallet → NFT → Physical Product → Digital Identity

This repository starts deliberately small. The first validation target is one real flow:

**real wallet → real NFT → real payment → real premium T-shirt → real customer**

## Current status

Task 1 establishes the application shell and visual home page only.

Included:

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- ESLint
- mobile-first dark landing page
- feature-oriented repository structure
- `.env.example` with no secrets

Not included yet:

- wallet connection
- Supabase
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
npm run build
npm run typecheck
npm run lint
```

## Architecture boundaries

The MVP stays in one Next.js application. External systems are introduced behind small boundaries when needed, rather than in advance.

Future feature areas already have directories for wallet, collections, NFTs, product building, checkout, and orders. Empty directories contain `.gitkeep` files only to preserve the intended structure.

## Security baseline

- Never request or store seed phrases/private keys.
- Never commit `.env*` secret files.
- Public browser configuration and server secrets must remain separated.
- Wallet data and prices must be validated server-side when those features are introduced.
- Payment fulfillment must eventually be driven by verified Stripe webhooks.

## Continuous integration

GitHub Actions is configured in `.github/workflows/ci.yml` to run on every push and pull request to `main`.

The CI job installs dependencies and runs:

```bash
npm run typecheck
npm run lint
npm run build
```

You can run the same checks locally with:

```bash
npm run verify
```

> The repository does not include a lockfile yet because the initial sandbox could not reach the npm registry. The first environment with npm access should run `npm install`, verify the project, and commit the generated `package-lock.json` so subsequent CI runs can switch from `npm install` to `npm ci`.

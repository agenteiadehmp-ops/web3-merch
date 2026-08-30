/**
 * Build-only stub for optional connector dependencies pulled into Wagmi/Reown.
 *
 * The MVP does not use Coinbase x402 payment helpers. Next.js Turbopack still
 * discovers those optional imports through the connector barrel, so we alias
 * them here instead of installing unrelated payment packages.
 */
export {};

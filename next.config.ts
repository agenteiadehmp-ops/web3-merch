import type { NextConfig } from "next";

const emptyOptionalModule = "./lib/web3/empty-optional-module.ts";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: {
    resolveAlias: {
      "@x402/core/client": emptyOptionalModule,
      "@x402/evm": emptyOptionalModule,
      "@x402/evm/exact/client": emptyOptionalModule,
      "@x402/evm/upto/client": emptyOptionalModule,
      "@x402/svm/exact/client": emptyOptionalModule,
    },
  },
};

export default nextConfig;

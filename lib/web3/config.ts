import { cookieStorage, createStorage } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { base, mainnet, polygon } from "@reown/appkit/networks";

export const reownProjectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID;

if (!reownProjectId) {
  throw new Error(
    "NEXT_PUBLIC_REOWN_PROJECT_ID is not configured. Add the public Reown project ID to the environment.",
  );
}

/**
 * Wallet-capability networks for the MVP shell.
 *
 * These do NOT claim that any supported collection lives on these chains.
 * Collection-to-chain mappings are activated separately only after verification.
 */
export const walletNetworks = [mainnet, polygon, base];

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId: reownProjectId,
  networks: walletNetworks,
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;

import { base, mainnet, polygon } from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { cookieStorage, createStorage } from "wagmi";

const configuredProjectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID;

if (!configuredProjectId) {
  throw new Error(
    "NEXT_PUBLIC_REOWN_PROJECT_ID is not configured. Add the public Reown project ID to the environment.",
  );
}

export const reownProjectId: string = configuredProjectId;

/**
 * Wallet-capability networks for the MVP shell.
 *
 * These do NOT claim that any supported collection lives on these chains.
 * Collection-to-chain mappings are activated separately only after verification.
 */
export const walletNetworks: [
  typeof mainnet,
  typeof polygon,
  typeof base,
] = [mainnet, polygon, base];

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId: reownProjectId,
  networks: walletNetworks,
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;

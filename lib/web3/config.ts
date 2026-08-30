import { base, mainnet, polygon, type AppKitNetwork } from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

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
export const walletNetworks = [mainnet, polygon, base] as [
  AppKitNetwork,
  ...AppKitNetwork[],
];

export const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  projectId: reownProjectId,
  networks: walletNetworks,
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;

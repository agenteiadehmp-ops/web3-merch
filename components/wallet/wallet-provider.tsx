"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { type ReactNode, useState } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";
import {
  reownProjectId,
  wagmiAdapter,
  walletNetworks,
} from "@/lib/web3/config";

const appUrl =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

const metadata = {
  name: "Web3 Merch",
  description: "Turn an NFT you own into premium physical merch.",
  url: appUrl,
  icons: [`${appUrl}/web3-merch-icon.svg`],
};

createAppKit({
  adapters: [wagmiAdapter],
  projectId: reownProjectId,
  networks: walletNetworks,
  defaultNetwork: walletNetworks[0],
  metadata,
  features: {
    analytics: false,
    email: false,
    socials: [],
  },
});

interface WalletProviderProps {
  children: ReactNode;
  cookies: string | null;
}

export function WalletProvider({
  children,
  cookies,
}: WalletProviderProps) {
  const [queryClient] = useState(() => new QueryClient());

  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies,
  );

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

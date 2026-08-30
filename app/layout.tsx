import type { Metadata } from "next";
import { headers } from "next/headers";
import { WalletProvider } from "@/components/wallet/wallet-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web3 Merch — Turn your NFT into something real",
  description:
    "A physical merchandising experience for NFT holders. Connect your wallet, choose your NFT, and turn it into premium apparel.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerStore = await headers();
  const cookies = headerStore.get("cookie");

  return (
    <html lang="en">
      <body>
        <WalletProvider cookies={cookies}>{children}</WalletProvider>
      </body>
    </html>
  );
}

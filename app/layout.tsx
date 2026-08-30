import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web3 Merch — Turn your NFT into something real",
  description:
    "A physical merchandising experience for NFT holders. Connect your wallet, choose your NFT, and turn it into premium apparel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

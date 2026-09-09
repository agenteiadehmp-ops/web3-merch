"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

interface PunkismNft {
  tokenId: string;
  name: string;
  imageUrl: string | null;
}

interface PunkismResponse {
  collection: {
    name: string;
    chain: string;
    contractAddress: string;
    merchandisingEnabled: boolean;
    licenseStatus: string;
  };
  owner: string;
  nfts: PunkismNft[];
  count: number;
  error?: string;
}

export function PunkismOwnedNfts() {
  const { address, isConnected } = useAccount();
  const [data, setData] = useState<PunkismResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isConnected || !address) {
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(`/api/nfts/punkism?owner=${encodeURIComponent(address)}`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then(async (response) => {
        const payload = (await response.json()) as PunkismResponse;
        if (!response.ok) {
          throw new Error(payload.error ?? "Unable to discover Punkism NFTs.");
        }
        return payload;
      })
      .then((payload) => {
        setData(payload);
        setLoading(false);
      })
      .catch((requestError: unknown) => {
        if (requestError instanceof DOMException && requestError.name === "AbortError") {
          return;
        }
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to discover Punkism NFTs.",
        );
        setLoading(false);
      });

    return () => controller.abort();
  }, [address, isConnected]);

  if (!isConnected || !address) {
    return (
      <div className="border border-white/10 bg-[#0d0d0d] p-6 sm:p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#ff6a2a]">
          Punkism discovery
        </p>
        <h2 className="mt-3 text-2xl font-black uppercase tracking-[-0.03em]">
          Connect your wallet to scan Abstract.
        </h2>
      </div>
    );
  }

  return (
    <div className="border border-white/10 bg-[#0d0d0d] p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#ff6a2a]">
            Punkism discovery / Abstract
          </p>
          <h2 className="mt-3 text-2xl font-black uppercase tracking-[-0.03em] sm:text-3xl">
            NFTs found in your wallet
          </h2>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
          {loading ? "Scanning…" : `${data?.count ?? 0} found`}
        </span>
      </div>

      {loading ? (
        <div className="mt-6 border border-white/10 p-5 font-mono text-xs uppercase tracking-[0.18em] text-white/45">
          Querying verified Punkism contract…
        </div>
      ) : null}

      {error ? (
        <div className="mt-6 border border-[#ff4d00]/35 bg-[#ff4d00]/10 p-5 text-sm text-white/70">
          {error}
        </div>
      ) : null}

      {!loading && !error && data && data.nfts.length === 0 ? (
        <div className="mt-6 border border-white/10 p-5 text-sm text-white/55">
          No Punkism NFTs were found for this wallet.
        </div>
      ) : null}

      {!loading && !error && data && data.nfts.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.nfts.map((nft) => (
            <article
              key={nft.tokenId}
              className="overflow-hidden border border-white/10 bg-[#080808]"
            >
              <div className="aspect-square bg-[#151515]">
                {nft.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={nft.imageUrl}
                    alt={nft.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="grid h-full place-items-center font-mono text-xs uppercase tracking-[0.2em] text-white/25">
                    No image
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between gap-3 p-4">
                <div>
                  <p className="font-semibold">{nft.name}</p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">
                    Token #{nft.tokenId}
                  </p>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">
                  Owned
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {data ? (
        <p className="mt-5 text-xs leading-5 text-white/35">
          Ownership discovery is enabled for this verified contract. Physical
          merchandising remains disabled until commercial-use rights are approved.
        </p>
      ) : null}
    </div>
  );
}

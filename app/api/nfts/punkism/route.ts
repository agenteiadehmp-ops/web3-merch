import { NextRequest, NextResponse } from "next/server";
import { isAddress } from "viem";
import { getDetectableCollections } from "@/features/collections/repository";

interface AlchemyOwnedNft {
  tokenId: string;
  name?: string;
  image?: {
    thumbnailUrl?: string;
    cachedUrl?: string;
    pngUrl?: string;
    originalUrl?: string;
  };
  raw?: {
    metadata?: {
      image?: string;
      name?: string;
    };
  };
}

function normaliseImageUrl(value: string | undefined): string | null {
  if (!value) return null;
  if (value.startsWith("ipfs://")) {
    return `https://ipfs.io/ipfs/${value.slice("ipfs://".length)}`;
  }
  return value;
}

export async function GET(request: NextRequest) {
  const owner = request.nextUrl.searchParams.get("owner");

  if (!owner || !isAddress(owner)) {
    return NextResponse.json(
      { error: "A valid EVM owner address is required." },
      { status: 400 },
    );
  }

  const apiKey = process.env.ALCHEMY_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "NFT discovery is not configured yet." },
      { status: 503 },
    );
  }

  try {
    const collections = await getDetectableCollections();
    const punkism = collections.find((collection) => collection.slug === "punkism");
    const abstractContract = punkism?.contracts.find(
      (contract) => contract.chain_key === "abstract-mainnet",
    );

    if (!punkism || !abstractContract) {
      return NextResponse.json(
        { error: "Punkism is not registered as a detectable collection." },
        { status: 503 },
      );
    }

    const url = new URL(
      `https://abstract-mainnet.g.alchemy.com/nft/v3/${apiKey}/getNFTsForOwner`,
    );
    url.searchParams.set("owner", owner);
    url.searchParams.append("contractAddresses[]", abstractContract.contract_address);
    url.searchParams.set("withMetadata", "true");
    url.searchParams.set("pageSize", "100");

    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      const details = await response.text();
      console.error("Alchemy NFT API error", response.status, details);
      return NextResponse.json(
        { error: "Unable to query Punkism ownership right now." },
        { status: 502 },
      );
    }

    const payload = (await response.json()) as { ownedNfts?: AlchemyOwnedNft[] };
    const nfts = (payload.ownedNfts ?? []).map((nft) => ({
      tokenId: nft.tokenId,
      name: nft.name ?? nft.raw?.metadata?.name ?? `Punkism #${nft.tokenId}`,
      imageUrl: normaliseImageUrl(
        nft.image?.thumbnailUrl ??
          nft.image?.cachedUrl ??
          nft.image?.pngUrl ??
          nft.image?.originalUrl ??
          nft.raw?.metadata?.image,
      ),
    }));

    return NextResponse.json({
      collection: {
        name: punkism.name,
        slug: punkism.slug,
        chain: abstractContract.chain_name,
        contractAddress: abstractContract.contract_address,
        merchandisingEnabled: punkism.merchandising_enabled,
        licenseStatus: punkism.license_status,
      },
      owner,
      nfts,
      count: nfts.length,
    });
  } catch (error) {
    console.error("Punkism discovery error", error);
    return NextResponse.json(
      { error: "Unable to load Punkism discovery configuration." },
      { status: 500 },
    );
  }
}

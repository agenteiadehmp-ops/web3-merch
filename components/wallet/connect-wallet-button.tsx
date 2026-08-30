"use client";

import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";

function shortAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M5 12h13M14 7l5 5-5 5" />
    </svg>
  );
}

export function ConnectWalletButton() {
  const { open } = useAppKit();
  const { address, chain, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (!isConnected || !address) {
    return (
      <button
        type="button"
        onClick={() => open()}
        className="group inline-flex min-h-14 items-center justify-center gap-3 bg-[#f7f4eb] px-6 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white"
      >
        Connect wallet
        <ArrowIcon />
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <button
        type="button"
        onClick={() => open()}
        className="inline-flex min-h-14 items-center justify-between gap-5 border border-[#ff4d00]/45 bg-[#ff4d00]/10 px-5 text-left transition hover:bg-[#ff4d00]/15"
        aria-label="Open connected wallet"
      >
        <span>
          <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#ff6a2a]">
            Connected
          </span>
          <span className="mt-1 block text-sm font-bold">
            {shortAddress(address)}
          </span>
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">
          {chain?.name ?? "EVM"}
        </span>
      </button>

      <button
        type="button"
        onClick={() => disconnect()}
        className="min-h-14 border border-white/10 px-4 font-mono text-[9px] uppercase tracking-[0.18em] text-white/50 transition hover:border-white/25 hover:text-white"
      >
        Disconnect
      </button>
    </div>
  );
}

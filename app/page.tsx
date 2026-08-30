import { ConnectWalletButton } from "@/components/wallet/connect-wallet-button";

const supportedCollections = [
  "Punkism",
  "Polygon Ape: The Evolution",
  "Doodrillas",
  "BackPunks",
];

function ProductPlaceholder() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[430px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#111111] shadow-2xl shadow-black/40">
      <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-white/10 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
        <span>Physical preview</span>
        <span>01 / Tee</span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pt-12">
        <div className="relative h-[72%] w-[74%]">
          <div className="absolute left-1/2 top-[10%] h-[82%] w-[56%] -translate-x-1/2 rounded-t-[2.2rem] rounded-b-[1.1rem] bg-[#e8e6df] shadow-[0_22px_70px_rgba(0,0,0,0.35)]" />
          <div className="absolute left-[7%] top-[13%] h-[28%] w-[32%] -rotate-[19deg] rounded-[1.2rem] bg-[#e8e6df]" />
          <div className="absolute right-[7%] top-[13%] h-[28%] w-[32%] rotate-[19deg] rounded-[1.2rem] bg-[#e8e6df]" />
          <div className="absolute left-1/2 top-[8.5%] h-[9%] w-[19%] -translate-x-1/2 rounded-b-full border-b-[10px] border-[#111111] bg-[#111111]" />

          <div className="absolute left-1/2 top-[31%] grid aspect-square w-[34%] -translate-x-1/2 place-items-center overflow-hidden border border-black/15 bg-black text-center">
            <div className="absolute inset-0 opacity-70 [background:linear-gradient(135deg,#ff4d00_0%,#ff4d00_31%,#f7f4eb_31%,#f7f4eb_50%,#111_50%,#111_72%,#ff4d00_72%)]" />
            <span className="relative font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-white sm:text-[10px]">
              Your NFT
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between border-t border-white/10 bg-black/30 px-5 py-4 backdrop-blur">
        <div>
          <p className="text-sm font-semibold">Premium T-Shirt</p>
          <p className="mt-1 text-xs text-white/45">
            Front print · MVP product
          </p>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
          Preview
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080808] text-[#f7f4eb] selection:bg-[#ff4d00] selection:text-white">
      <div className="pointer-events-none fixed inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:42px_42px]" />

      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
        <a
          href="#top"
          className="group flex items-center gap-3"
          aria-label="Web3 Merch home"
        >
          <span className="grid h-9 w-9 place-items-center bg-[#ff4d00] font-black text-black transition-transform group-hover:rotate-3">
            W3
          </span>
          <span className="text-sm font-bold uppercase tracking-[0.16em]">
            Web3 Merch
          </span>
        </a>

        <span className="rounded-full border border-white/10 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/45 sm:text-[10px]">
          MVP / 001
        </span>
      </header>

      <section
        id="top"
        className="relative z-10 mx-auto grid w-full max-w-7xl gap-14 px-5 pb-20 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-[1.04fr_.96fr] lg:items-center lg:gap-20 lg:px-10 lg:pb-28 lg:pt-20"
      >
        <div>
          <p className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#ff6a2a] sm:text-xs">
            <span className="h-px w-8 bg-[#ff4d00]" />
            NFT ownership meets physical culture
          </p>

          <h1 className="max-w-3xl text-[clamp(3.6rem,15vw,8.8rem)] font-black uppercase leading-[0.78] tracking-[-0.075em]">
            Turn your NFT
            <span className="mt-3 block text-[#ff4d00]">
              into something real.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-7 text-white/58 sm:text-lg">
            Connect your wallet. Choose an NFT you own. Create premium physical
            merch built around your digital identity.
          </p>

          <div className="mt-9">
            <ConnectWalletButton />
            <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-white/30">
              No seed phrase · No fund access · No transaction required
            </p>
          </div>

          <div className="mt-14 grid max-w-xl grid-cols-3 border-y border-white/10 py-5">
            {[
              ["01", "Connect"],
              ["02", "Choose"],
              ["03", "Wear"],
            ].map(([number, label]) => (
              <div
                key={number}
                className="border-r border-white/10 px-3 first:pl-0 last:border-r-0"
              >
                <span className="font-mono text-[9px] tracking-[0.2em] text-[#ff6a2a]">
                  {number}
                </span>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] sm:text-sm">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <ProductPlaceholder />
      </section>

      <section className="relative z-10 border-y border-white/10 bg-[#0d0d0d]">
        <div className="mx-auto w-full max-w-7xl px-5 py-7 sm:px-8 lg:px-10">
          <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.24em] text-white/35">
            Initial supported collections
          </p>
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {supportedCollections.map((collection, index) => (
              <div
                key={collection}
                className="min-h-24 bg-[#0d0d0d] p-4"
              >
                <span className="font-mono text-[9px] text-white/28">
                  0{index + 1}
                </span>
                <p className="mt-5 text-sm font-semibold leading-5">
                  {collection}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 max-w-3xl text-xs leading-5 text-white/35">
            Collection contracts, chains, and commercial-use permissions will
            be verified before any NFT integration is activated.
          </p>
        </div>
      </section>

      <footer className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 py-8 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <span>Wallet → NFT → Physical product → Digital identity</span>
        <span>Build · Test · Validate · Automate · Scale</span>
      </footer>
    </main>
  );
}

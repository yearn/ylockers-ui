import Image from "next/image";
import Button from "../components/Button";
import Header, { headerItems } from "../components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-r from-dark-black to-dark-blue text-white">
      <div className="w-full shadow-lg z-10"></div>
      <Image className="absolute left-[24%] w-[76%]" src="/prisma.svg" width={200} height={200} alt="" />
      <Header items={headerItems} selected="About"/>
      <section className="xl:w-[1200px] px-8 xl:p-0 z-10">
        <div className="w-full">
          <div className="relative mx-auto mb-0 flex w-full flex-col bg-neutral-0">
            <div className="relative mx-auto mt-6 pb-40">
              <section className="grid-cols-12 gap-0 md:grid md:pt-12">
                <div className="col-span-12 md:col-span-8 md:mb-0 md:pr-20">
                  <div className="mb-10 flex flex-col justify-center">
                    <h1 className="mt-6 block font-black text-5xl">
                        Prisma 
                      {" has been unleashed "}
                      <br/>
                      {"Now let's get it "}
                      <span className="bg-clip-text bg-gradient-text text-transparent" style={{color: 'transparent'}}>
                        unlocked
                      </span>
                    </h1>
                  </div>
                  <div className="mb-8 border-white-200 py-2 text-white-700 md:border-l-4 border-blue md:pl-6">
                    <div>
                      <h3 className="text-xl font-bold">
                        Why would I claim my PRISMA as yPRISMA?
                      </h3>
                      <div className="mt-2 flex flex-col space-y-2 text-white font-thin">
                        <p>Good question anon. The Prisma airdrop comes as a locked position that cannot be transferred until the lock (of up to 1 year) expires.</p>
                        <p>{`By claiming your airdrop using this page, you'll lock your full Prisma airdrop to Yearn in exchange for yPrisma which is (and will always be) transferrable and liquid.`}</p>
                        <p>yPrisma holders also receieve their share of Prisma protocol rewards. Noice.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <div className="flex flex-col col-span-3 mt-6 rounded-lg bg-darker-blue">
                <div className="mb-4 border-b p-4 md:p-6"><b className="text-2xl">
                  yPrisma deployment addresses
                </b></div>
                <dl className="flex flex-col gap-2 p-4 md:p-6 ">
                  <div className="flex flex-col justify-between md:flex-row">
                    <dt className="text-white">Prisma Token</dt>
                    <a className="cursor-pointer text-xs hover:underline md:text-base" href="https://etherscan.io/address/0xdA47862a83dac0c112BA89c6abC2159b95afd71C">
                      <dd className="font-mono">0xdA47862a83dac0c112BA89c6abC2159b95afd71C</dd>
                    </a>
                  </div>
                   <div className="flex flex-col justify-between md:flex-row">
                    <dt className="text-white">yPrisma Token</dt>
                    <a className="cursor-pointer text-xs hover:underline md:text-base" href="https://etherscan.io/address/0xe3668873D944E4A949DA05fc8bDE419eFF543882">
                      <dd className="font-mono">0xe3668873D944E4A949DA05fc8bDE419eFF543882</dd>
                    </a>
                  </div>
                  <div className="flex flex-col justify-between opacity-40 md:flex-row">
                    <dt className="text-white">Legacy yPrisma Token</dt>
                    <a className="cursor-pointer text-xs hover:underline md:text-base" href="https://etherscan.io/address/0xfd37356c1a62288b32Fa58188c77Ab0D694a0f4E">
                      <dd className="font-mono">0xfd37356c1a62288b32Fa58188c77Ab0D694a0f4E</dd>
                    </a>
                  </div>
                  <div className="flex flex-col justify-between md:flex-row">
                    <dt className="text-white">yPrisma Staking Contract</dt>
                    <a className="cursor-pointer text-xs hover:underline md:text-base" href="https://etherscan.io/address/0x774a55C3Eeb79929fD445Ae97191228Ab39c4d0f">
                      <dd className="font-mono">0x774a55C3Eeb79929fD445Ae97191228Ab39c4d0f</dd>
                    </a>
                  </div>
                  <div className="flex flex-col justify-between md:flex-row">
                    <dt className="text-white">yCRV Staking Contract</dt>
                    <a className="cursor-pointer text-xs hover:underline md:text-base" href="https://etherscan.io/address/0x84c94d739e075b3C7431bdb1A005F0412DF828a5">
                      <dd className="font-mono">0x84c94d739e075b3C7431bdb1A005F0412DF828a5</dd>
                    </a>
                  </div>
                  <div className="flex flex-col justify-between md:flex-row">
                    <dt className="text-white">yPrismaLP Staking Contract</dt>
                    <a className="cursor-pointer text-xs hover:underline md:text-base" href="https://etherscan.io/address/0x6806D62AAdF2Ee97cd4BCE46BF5fCD89766EF246">
                      <dd className="font-mono">0x6806D62AAdF2Ee97cd4BCE46BF5fCD89766EF246</dd>
                    </a>
                  </div>
                  <div className="flex flex-col justify-between md:flex-row">
                    <dt className="text-white">dYFI Staking Contract</dt>
                    <a className="cursor-pointer text-xs hover:underline md:text-base" href="https://etherscan.io/address/0x93283184650f4d3B4253ABd00978176732118428">
                      <dd className="font-mono">0x93283184650f4d3B4253ABd00978176732118428</dd>
                    </a>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

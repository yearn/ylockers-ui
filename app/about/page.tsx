import Header, { headerItems } from "../components/Header";
import Link from "next/link";
import Background from "../components/Background";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-r from-dark-black to-dark-blue text-white">
      <div className="w-full shadow-lg z-10"></div>
      <Background />
      <Header items={headerItems} selected="About"/>
      <section className="xl:w-[1200px] px-8 xl:p-0 z-10">
        <div className="w-full">
          <div className="relative mx-auto mb-0 flex w-full flex-col bg-neutral-0">
            <div className="relative mx-auto mt-6 pb-40">
              <section className="grid-cols-12 gap-0 md:grid md:pt-12">
                <div className="col-span-12 md:col-span-8 md:mb-0 md:pr-20">
                  <div className="mb-10 flex flex-col justify-center">
                    <h1 className="mt-28 md:mt-6 block font-black text-5xl">
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
                      <h2 className="text-3xl font-bold mb-6 mt-2">
                      How does it work?
                      </h2>
                      <h3 className="text-xl font-bold">
                        Stake
                      </h3>
                      <div className="mt-2 flex flex-col space-y-2 text-white font-thin white">
                        <p>
                          {`Each week, Yearn's vePRISMA position earns revenue from protocol fees and bribes. This is converted to mkUSD stablecoin and distributed to yPRISMA stakers at the start of the week.`}
                        </p>
                        <p>
                          {`To begin earning your share, all you need to do is stake your yPRISMA tokens in the staking contract. You're free to unstake them at any time with no lock-ups or penalties.`}
                        </p>
                      </div>
                      <h3 className="text-xl font-bold mt-6">
                        Boost
                      </h3>
                      <div className="mt-2 flex flex-col space-y-2 text-white font-thin">
                        <p>
                          {`The longer you stake, the greater your boost! Yearn's yPRISMA staking contract incentivizes long-term users by boosting their yield (up to a maximum of 2.5x).`}
                        </p>
                        <p>
                          {`You'll reach max boost and achieve the maximum staking APR less than four weeks after depositing your yPRISMA.`}
                        </p>
                      </div>
                      <h3 className="text-xl font-bold mt-6">
                        Weight
                      </h3>
                      <div className="mt-2 flex flex-col space-y-2 text-white font-thin">
                        <p>
                          {`To calculate your boost, the staking contract maintains a weight for every deposit (which is a function of the amount of yPRISMA you have staked and the duration since it was staked).`}
                        </p>
                        <p>
                          {`For example, stake 100 yPRISMA and your initial weight will be 50 yPRISMA. At 00:00:00 UTC the following Thursday, your weight will increase to 100, then 150, then 200, and finally 250 (on the fourth Thursday following your deposit).`}
                        </p>
                      </div>
                      <h3 className="text-xl font-bold mt-2">
                        Rewards
                      </h3>
                      <div className="mt-2 flex flex-col space-y-2 text-white font-thin">
                        <p>
                          {`Each week, Yearn claims its share of protocol fees and vote-maximized bribes. These are swapped for yield-bearing mkUSD yVault tokens (yvmkUSD-A) and deposited directly into the reward distributor contract.`}
                        </p>
                        <p>
                          {`Your rewards accrue week over week and are never lost if unclaimed. In fact, they begin earning you additional mkUSD yield from the moment we receive them! When claimed, yvmkUSD-A vault tokens will be received directly to your wallet.`}
                        </p>
                      </div>
                      <h3 className="text-xl font-bold mt-6">
                        And for the yPRISMA maxis…
                      </h3>
                      <div className="mt-2 flex flex-col space-y-2 text-white font-thin">
                        <p>
                          {`Not interested in staking, weights, and manual claims? Just want more yPRISMA and the highest APYs? Then our yPRISMA auto-compounding vault is for you!`}
                        </p>
                        <p>
                          {`Once a week, the vault claims its boosted share of mkUSD from the yPRISMA staker contract, swaps it for more yPRISMA, and deposits it back into the staker. On top of that, the vault is whitelisted - allowing it to earn max boost immediately on all reinvested yPRISMA.`}
                        </p>
                        <p>
                          {`For more information on yPRISMA and the yLockers ecosystem, read our `}<Link className="underline" href="https://docs.yearn.fi/getting-started/products/ylockers/overview">docs</Link>.
                        </p>
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
                    <dt className="text-white">Yearn Boosted Staker</dt>
                    <a className="cursor-pointer text-xs hover:underline md:text-base" href="https://etherscan.io/address/0xF4C6e0E006F164535508787873d86b84fe901975">
                      <dd className="font-mono">0xF4C6e0E006F164535508787873d86b84fe901975</dd>
                    </a>
                  </div>
                  <div className="flex flex-col justify-between md:flex-row">
                    <dt className="text-white">Rewards Distributor</dt>
                    <a className="cursor-pointer text-xs hover:underline md:text-base" href="https://etherscan.io/address/0x2667BA23c782a8DDc31174Ef472a676eb5C709b3">
                      <dd className="font-mono">0x2667BA23c782a8DDc31174Ef472a676eb5C709b3</dd>
                    </a>
                  </div>
                  <div className="flex flex-col justify-between md:flex-row">
                    <dt className="text-white">Boosted Staker Utilities</dt>
                    <a className="cursor-pointer text-xs hover:underline md:text-base" href="https://etherscan.io/address/0xC4B4CeAF8bF4f2dAD1502457d53D084f20291fAE ">
                      <dd className="font-mono">0xC4B4CeAF8bF4f2dAD1502457d53D084f20291fAE </dd>
                    </a>
                  </div>
                  <div className="flex flex-col justify-between md:flex-row">
                    <dt className="text-white">yvyPRISMA</dt>
                    <a className="cursor-pointer text-xs hover:underline md:text-base" href="https://etherscan.io/address/0x10537D7bD661C9c34F547b38EC662D6FD482Ae95">
                      <dd className="font-mono">0x10537D7bD661C9c34F547b38EC662D6FD482Ae95</dd>
                    </a>
                  </div>
                  <div className="flex flex-col justify-between md:flex-row">
                    <dt className="text-white">yvmkUSD-A</dt>
                    <a className="cursor-pointer text-xs hover:underline md:text-base" href="https://etherscan.io/address/0x04AeBe2e4301CdF5E9c57B01eBdfe4Ac4B48DD13">
                      <dd className="font-mono">0x04AeBe2e4301CdF5E9c57B01eBdfe4Ac4B48DD13</dd>
                    </a>
                  </div>
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
                  <div className="flex flex-col justify-between opacity-40 md:flex-row">
                    <dt className="text-white">Legacy yPrisma Staking Contract</dt>
                    <a className="cursor-pointer text-xs hover:underline md:text-base" href="https://etherscan.io/address/0xE3EE395C9067dD15C492Ca950B101a7d6c85b5Fc">
                      <dd className="font-mono">0xE3EE395C9067dD15C492Ca950B101a7d6c85b5Fc</dd>
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

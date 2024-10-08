import Header, {headerItems} from '../../components/Header';
import Link from 'next/link';
import Background from '../../components/Background';
import {hasLegacyStaker, LEGACY_STAKER} from '@/components/LegacyStaker/useBalance';
import Ticker from '--lib/components/Ticker';
import {
	BASE_TOKEN,
	BASE_TOKEN_NAME,
	BOOSTED_STAKER,
	BOOSTED_STAKER_UTILITIES,
	LOCKER_TOKEN_NAME,
	LOCKER_TOKEN_VAULT,
	LOCKER_TOKEN_VAULT_NAME,
	REWARDS_DISTRIBUTOR,
	STABLE_TOKEN_NAME,
	STABLE_TOKEN_VAULT,
	STABLE_TOKEN_VAULT_NAME,
	YDAEMON,
	ENV
} from '@/constants';

export default function Home() {
	return (
		<main className="flex flex-col items-center min-h-screen text-white">
			<Background />
			<Header
				items={headerItems}
				selected="About"
			/>
			<Ticker
				yDaemon={YDAEMON}
				env={ENV}
			/>
			<section className="xl:w-[1200px] px-8 xl:p-0 z-10">
				<div className="w-full">
					<div className="relative mx-auto mb-0 flex w-full flex-col bg-neutral-0">
						<div className="relative mx-auto mt-6 pb-40">
							<section className="grid-cols-12 gap-0 md:grid md:pt-12">
								<div className="col-span-12 md:col-span-8 md:mb-0 md:pr-20">
									<div className="mb-10 flex flex-col justify-center">
										<h1 className="mt-28 md:mt-6 block font-black text-5xl">
											{BASE_TOKEN_NAME} has been unleashed
											<br />
											Now let&apos;s get it
											<span
												className="bg-clip-text bg-gradient-text text-transparent"
												style={{color: 'transparent'}}>
												unlocked
											</span>
										</h1>
									</div>
									<div className="mb-8 border-white-200 py-2 text-white-700 md:border-l-4 border-primary md:pl-6">
										<div>
											<h2 className="text-3xl font-bold mb-6 mt-2">How does it work?</h2>
											<h3 className="text-xl font-bold">Stake</h3>
											<div className="mt-2 flex flex-col space-y-2 text-white font-thin white">
												<p>
													Each week, Yearn&apos;s ve{BASE_TOKEN_NAME} position earns revenue
													from protocol fees and optimized vote incentives. This is converted
													to {STABLE_TOKEN_NAME} stablecoin and distributed to{' '}
													{LOCKER_TOKEN_NAME} stakers at the start of the week.
												</p>
												<p>
													To begin earning your share, all you need to do is stake your{' '}
													{LOCKER_TOKEN_NAME} tokens in the staking contract. You&apos;re free
													to unstake them at any time with no lock-ups or penalties.
												</p>
											</div>
											<h3 className="text-xl font-bold mt-6">Boost</h3>
											<div className="mt-2 flex flex-col space-y-2 text-white font-thin">
												<p>
													The longer you stake, the greater your boost! Yearn&apos;s{' '}
													{LOCKER_TOKEN_NAME} staking contract incentivizes long-term users by
													boosting their yield (up to a maximum of 2.5x).
												</p>
												<p>
													You&apos;ll reach max boost and achieve the maximum staking APR less
													than four weeks after depositing your {LOCKER_TOKEN_NAME}.
												</p>
											</div>
											<h3 className="text-xl font-bold mt-6">Weight</h3>
											<div className="mt-2 flex flex-col space-y-2 text-white font-thin">
												<p>
													To calculate your boost, the staking contract maintains a weight for
													every deposit (which is a function of the amount of{' '}
													{LOCKER_TOKEN_NAME} you have staked and the duration since it was
													staked).
												</p>
												<p>
													For example, stake 100 {LOCKER_TOKEN_NAME} and your initial weight
													will be 50 {LOCKER_TOKEN_NAME}. At 00:00:00 UTC the following
													Thursday, your weight will increase to 100, then 150, then 200, and
													finally 250 (on the fourth Thursday following your deposit).
												</p>
											</div>
											<h3 className="text-xl font-bold mt-2">Rewards</h3>
											<div className="mt-2 flex flex-col space-y-2 text-white font-thin">
												<p>
													Each week, Yearn claims its share of protocol fees and optimized
													vote incentives. These are swapped for yield-bearing{' '}
													{STABLE_TOKEN_NAME} yVault tokens ({STABLE_TOKEN_VAULT_NAME}) and
													deposited directly into the reward distributor contract.
												</p>
												<p>
													Your rewards accrue week over week and are never lost if unclaimed.
													In fact, they begin earning you additional {STABLE_TOKEN_NAME} yield
													from the moment we receive them! When claimed,{' '}
													{STABLE_TOKEN_VAULT_NAME} vault tokens will be received directly to
													your wallet.
												</p>
											</div>
											<h3 className="text-xl font-bold mt-6">
												And for the {LOCKER_TOKEN_NAME} maxis…
											</h3>
											<div className="mt-2 flex flex-col space-y-2 text-white font-thin">
												<p>
													Not interested in staking, weights, and manual claims? Just want
													more {LOCKER_TOKEN_NAME} and the highest APYs? Then our{' '}
													{LOCKER_TOKEN_NAME} auto-compounding vault is for you!
												</p>
												<p>
													Once a week, the vault claims its boosted share of{' '}
													{STABLE_TOKEN_NAME} from the {LOCKER_TOKEN_NAME} staker contract,
													swaps it for more ${LOCKER_TOKEN_NAME}, and deposits it back into
													the staker. On top of that, the vault is whitelisted - allowing it
													to earn max boost immediately on all reinvested {LOCKER_TOKEN_NAME}.
												</p>
												<p>
													For more information on {LOCKER_TOKEN_NAME} and the yLockers
													ecosystem, read our{' '}
													<Link
														className="underline"
														href="https://docs.yearn.fi/getting-started/products/ylockers/overview">
														docs
													</Link>
													.
												</p>
											</div>
										</div>
									</div>
								</div>
							</section>
							<div className="flex flex-col col-span-3 mt-6 rounded-lg bg-deeper-primary">
								<div className="mb-4 border-b p-4 md:p-6">
									<b className="text-2xl">{LOCKER_TOKEN_NAME} Deployment addresses</b>
								</div>
								<dl className="flex flex-col gap-2 p-4 md:p-6 ">
									<div className="flex flex-col justify-between md:flex-row">
										<dt className="text-white">Yearn Boosted Staker</dt>
										<a
											className="cursor-pointer text-xs hover:underline md:text-base"
											href={`https://etherscan.io/address/${BOOSTED_STAKER}`}>
											<dd className="font-mono">{BOOSTED_STAKER}</dd>
										</a>
									</div>
									<div className="flex flex-col justify-between md:flex-row">
										<dt className="text-white">Rewards Distributor</dt>
										<a
											className="cursor-pointer text-xs hover:underline md:text-base"
											href={`https://etherscan.io/address/${REWARDS_DISTRIBUTOR}`}>
											<dd className="font-mono">{REWARDS_DISTRIBUTOR}</dd>
										</a>
									</div>
									<div className="flex flex-col justify-between md:flex-row">
										<dt className="text-white">Boosted Staker Utilities</dt>
										<a
											className="cursor-pointer text-xs hover:underline md:text-base"
											href={`https://etherscan.io/address/${BOOSTED_STAKER_UTILITIES}`}>
											<dd className="font-mono">{BOOSTED_STAKER_UTILITIES} </dd>
										</a>
									</div>
									<div className="flex flex-col justify-between md:flex-row">
										<dt className="text-white">{LOCKER_TOKEN_VAULT_NAME}</dt>
										<a
											className="cursor-pointer text-xs hover:underline md:text-base"
											href={`https://etherscan.io/address/${LOCKER_TOKEN_VAULT}`}>
											<dd className="font-mono">{LOCKER_TOKEN_VAULT}</dd>
										</a>
									</div>
									<div className="flex flex-col justify-between md:flex-row">
										<dt className="text-white">{STABLE_TOKEN_VAULT_NAME}</dt>
										<a
											className="cursor-pointer text-xs hover:underline md:text-base"
											href={`https://etherscan.io/address/${STABLE_TOKEN_VAULT}`}>
											<dd className="font-mono">{STABLE_TOKEN_VAULT}</dd>
										</a>
									</div>
									<div className="flex flex-col justify-between md:flex-row">
										<dt className="text-white">{BASE_TOKEN_NAME} Token</dt>
										<a
											className="cursor-pointer text-xs hover:underline md:text-base"
											href={`https://etherscan.io/address/${BASE_TOKEN}`}>
											<dd className="font-mono">{BASE_TOKEN}</dd>
										</a>
									</div>
									<div className="flex flex-col justify-between md:flex-row">
										<dt className="text-white">{LOCKER_TOKEN_NAME} Token</dt>
										<a
											className="cursor-pointer text-xs hover:underline md:text-base"
											href={`https://etherscan.io/address/${LOCKER_TOKEN_VAULT}`}>
											<dd className="font-mono">{LOCKER_TOKEN_VAULT}</dd>
										</a>
									</div>
									{hasLegacyStaker && (
										<div className="flex flex-col justify-between opacity-40 md:flex-row">
											<dt className="text-white">Legacy Staking Contract</dt>
											<a
												className="cursor-pointer text-xs hover:underline md:text-base"
												href={`https://etherscan.io/address/${LEGACY_STAKER}`}>
												<dd className="font-mono">{LEGACY_STAKER}</dd>
											</a>
										</div>
									)}
								</dl>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}

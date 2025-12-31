'use client';

import Header, {headerItems} from '../../components/Header';
import Link from 'next/link';
import Background from '../../components/Background';
import Ticker from '--lib/components/Ticker';
import {
	BASE_TOKEN,
	BASE_TOKEN_NAME,
	BOOSTED_STAKER,
	BOOSTED_STAKER_UTILITIES,
	LOCKER_TOKEN,
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
import {useState} from 'react';

function CopyIcon({address}: {address: string}) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		await navigator.clipboard.writeText(address);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};

	return (
		<button
			onClick={handleCopy}
			className="ml-2 text-neutral-400 hover:text-white transition-colors"
			title={copied ? 'Copied!' : 'Copy address'}>
			{copied ? (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round">
					<polyline points="20 6 9 17 4 12" />
				</svg>
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round">
					<rect
						x="9"
						y="9"
						width="13"
						height="13"
						rx="2"
						ry="2"
					/>
					<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
				</svg>
			)}
		</button>
	);
}

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
											Now let&apos;s get it unlocked
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
										<div className="flex items-center">
											<a
												className="cursor-pointer text-xs hover:underline md:text-base"
												href={`https://etherscan.io/address/${BOOSTED_STAKER}`}>
												<dd className="font-mono">{BOOSTED_STAKER}</dd>
											</a>
											<CopyIcon address={BOOSTED_STAKER} />
										</div>
									</div>
									<div className="flex flex-col justify-between md:flex-row">
										<dt className="text-white">Rewards Distributor</dt>
										<div className="flex items-center">
											<a
												className="cursor-pointer text-xs hover:underline md:text-base"
												href={`https://etherscan.io/address/${REWARDS_DISTRIBUTOR}`}>
												<dd className="font-mono">{REWARDS_DISTRIBUTOR}</dd>
											</a>
											<CopyIcon address={REWARDS_DISTRIBUTOR} />
										</div>
									</div>
									<div className="flex flex-col justify-between md:flex-row">
										<dt className="text-white">Boosted Staker Utilities</dt>
										<div className="flex items-center">
											<a
												className="cursor-pointer text-xs hover:underline md:text-base"
												href={`https://etherscan.io/address/${BOOSTED_STAKER_UTILITIES}`}>
												<dd className="font-mono">{BOOSTED_STAKER_UTILITIES}</dd>
											</a>
											<CopyIcon address={BOOSTED_STAKER_UTILITIES} />
										</div>
									</div>
									<div className="flex flex-col justify-between md:flex-row">
										<dt className="text-white">{LOCKER_TOKEN_VAULT_NAME}</dt>
										<div className="flex items-center">
											<a
												className="cursor-pointer text-xs hover:underline md:text-base"
												href={`https://etherscan.io/address/${LOCKER_TOKEN_VAULT}`}>
												<dd className="font-mono">{LOCKER_TOKEN_VAULT}</dd>
											</a>
											<CopyIcon address={LOCKER_TOKEN_VAULT} />
										</div>
									</div>
									<div className="flex flex-col justify-between md:flex-row">
										<dt className="text-white">{STABLE_TOKEN_VAULT_NAME}</dt>
										<div className="flex items-center">
											<a
												className="cursor-pointer text-xs hover:underline md:text-base"
												href={`https://etherscan.io/address/${STABLE_TOKEN_VAULT}`}>
												<dd className="font-mono">{STABLE_TOKEN_VAULT}</dd>
											</a>
											<CopyIcon address={STABLE_TOKEN_VAULT} />
										</div>
									</div>
									<div className="flex flex-col justify-between md:flex-row">
										<dt className="text-white">{BASE_TOKEN_NAME} Token</dt>
										<div className="flex items-center">
											<a
												className="cursor-pointer text-xs hover:underline md:text-base"
												href={`https://etherscan.io/address/${BASE_TOKEN}`}>
												<dd className="font-mono">{BASE_TOKEN}</dd>
											</a>
											<CopyIcon address={BASE_TOKEN} />
										</div>
									</div>
									<div className="flex flex-col justify-between md:flex-row">
										<dt className="text-white">{LOCKER_TOKEN_NAME} Token</dt>
										<div className="flex items-center">
											<a
												className="cursor-pointer text-xs hover:underline md:text-base"
												href={`https://etherscan.io/address/${LOCKER_TOKEN}`}>
												<dd className="font-mono">{LOCKER_TOKEN}</dd>
											</a>
											<CopyIcon address={LOCKER_TOKEN} />
										</div>
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

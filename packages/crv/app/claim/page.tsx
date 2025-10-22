'use client';
import {fAddress} from '--lib/tools/format';
import {useMerkleDrops} from '@/hooks/useMerkleDrop';
import {useAccountModal, useConnectModal} from '@rainbow-me/rainbowkit';
import {formatUnits} from 'viem';
import {useAccount} from 'wagmi';
import Background from '../../components/Background';
import Header, {headerItems} from '../../components/Header';
import {ClaimButton} from '../../components/Claim/ClaimButton';
import {exactToSimple} from '@/utils';
import Tokens from '--lib/components/Tokens';

export default function Claim() {
	const account = useAccount();
	const {openConnectModal} = useConnectModal();
	const {openAccountModal} = useAccountModal();
	const airdrops = useMerkleDrops(account.address);

	const drops = airdrops.data || [];

	const isEligible = (drop: (typeof drops)[number]) => {
		return drop.amount > 0n && !drop.hasClaimed && drop.info.expiresAt > Date.now();
	};

	const getDropStatus = (expiresAt: number) => {
		return expiresAt > Date.now() ? 'Active' : 'Expired';
	};

	return (
		<main className="relative flex flex-col items-center min-h-screen text-white">
			<Background />
			<div className="max-w-[1200px] w-full z-10">
				<Header
					items={headerItems}
					selected="Claim"
					launchText={account.address ? `${fAddress(account.address)}` : 'Connect Wallet'}
					onClickLaunch={account.address ? openAccountModal : openConnectModal}
				/>
				<section className="mt-32 md:mt-[5vh] sm:mx-4 lg:mx-0 w-full">
					<div className="relative mb-0 flex w-full flex-col">
						<div className="relative mt-6 pb-40 w-full">
							<h1 className="text-3xl font-bold mb-8">Available Drops</h1>
							{drops.length === 0 ? (
								<div className="bg-neutral-900 rounded-lg p-8 text-center">
									<p className="text-neutral-400">No claims found for user</p>
								</div>
							) : (
								<div className="space-y-4">
									{drops.map(drop => (
										<div
											key={drop.dropId}
											className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
											<div className="flex justify-between items-center">
												<div className="flex-1">
													<div className="flex items-center gap-4 mb-2">
														<h3 className="text-xl font-semibold">
															{drop.info.description}
														</h3>
														{!drop.hasClaimed && (
															<span
																className={`px-3 py-1 rounded-full text-sm font-medium ${
																	getDropStatus(drop.info.expiresAt) === 'Active'
																		? 'bg-green-900 text-green-400'
																		: 'bg-neutral-800 text-neutral-400'
																}`}>
																{getDropStatus(drop.info.expiresAt)}
															</span>
														)}
													</div>
													{!drop.hasClaimed && (
														<>
															<p className="text-neutral-400">
																Claimable:{' '}
																<Tokens
																	className={'text-[15px]'}
																	amount={drop.amount}
																	decimals={drop.info.token.decimals}
																	suffix={` ${drop.info.token.symbol}`}
																/>
															</p>
															<p className="text-sm text-neutral-500 mt-1">
																Expires:{' '}
																{new Date(drop.info.expiresAt).toLocaleDateString()}
															</p>
														</>
													)}
												</div>

												<div className="flex items-center gap-2">
													{account.address ? (
														isEligible(drop) ? (
															<ClaimButton
																text={`Claim $${drop.info.token.symbol}`}
																dropId={Number(drop.dropId)}
																amount={drop.amount}
																proof={drop.proof}
																index={drop.index}
																onSuccess={() => airdrops.refetch()}
															/>
														) : (
															<div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800 text-neutral-500">
																{drop.hasClaimed ? (
																	<>
																		<svg
																			className="w-5 h-5"
																			fill="none"
																			stroke="currentColor"
																			viewBox="0 0 24 24">
																			<path
																				strokeLinecap="round"
																				strokeLinejoin="round"
																				strokeWidth={2}
																				d="M5 13l4 4L19 7"
																			/>
																		</svg>
																		<span className="font-medium">Claimed</span>
																	</>
																) : drop.info.expiresAt < Date.now() ? (
																	<>
																		<svg
																			className="w-5 h-5"
																			fill="none"
																			stroke="currentColor"
																			viewBox="0 0 24 24">
																			<path
																				strokeLinecap="round"
																				strokeLinejoin="round"
																				strokeWidth={2}
																				d="M6 18L18 6M6 6l12 12"
																			/>
																		</svg>
																		<span className="font-medium">Expired</span>
																	</>
																) : (
																	<>
																		<svg
																			className="w-5 h-5"
																			fill="none"
																			stroke="currentColor"
																			viewBox="0 0 24 24">
																			<path
																				strokeLinecap="round"
																				strokeLinejoin="round"
																				strokeWidth={2}
																				d="M6 18L18 6M6 6l12 12"
																			/>
																		</svg>
																		<span className="font-medium">
																			No Allocation
																		</span>
																	</>
																)}
															</div>
														)
													) : null}
												</div>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</section>
			</div>
		</main>
	);
}

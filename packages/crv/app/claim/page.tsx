'use client';
import Background from '../../components/Background';
import Header, {headerItems} from '../../components/Header';
import {fAddress} from '--lib/tools/format';
import {useConnectModal, useAccountModal} from '@rainbow-me/rainbowkit';
import {useAccount} from 'wagmi';
import {useMerkleDrop} from '@/hooks/useMerkleDrop';

export default function Claim() {
	const account = useAccount();
	const {openConnectModal} = useConnectModal();
	const {openAccountModal} = useAccountModal();
	const airdrop = useMerkleDrop(account.address);
	return (
		<main className="relative flex flex-col items-center min-h-screen text-white">
			<Background />
			<Header
				items={headerItems}
				selected="Claim"
				launchText={account.address ? `${fAddress(account.address)}` : 'Connect Wallet'}
				onClickLaunch={account.address ? openAccountModal : openConnectModal}
			/>
			<section className="xl:w-[1200px] px-8 xl:p-0 z-10">
				<div className="w-full">
					<div className="relative mx-auto mb-0 flex w-full flex-col bg-neutral-0">
						<div className="relative mx-auto mt-6 pb-40">
							<section className="grid-cols-12 gap-0 md:grid md:pt-12 bg-red-500">
								{!!airdrop ? (
									<p>
										{airdrop?.amount}
										{JSON.stringify(airdrop?.proof)}
									</p>
								) : (
									<p className="w-full bg-blue-500">No airdrop found for user</p>
								)}
							</section>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}

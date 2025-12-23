'use client';

import Header, {headerItems} from '@/components/Header';
import Background from '@/components/Background';
import {MigrateNft} from '@/components/MigrateNft';
import {useConnectModal, useAccountModal} from '--lib/hooks/rainbowkit';
import {useAccount} from 'wagmi';
import {fAddress} from '--lib/tools/format';
import Ticker from '--lib/components/Ticker';
import {YDAEMON, ENV} from '@/constants';
import {useMigrateNft} from '@/components/MigrateNft/hooks';
import {useMemo} from 'react';
import {formatUnits} from 'viem';

export default function MigratePage() {
	const {openConnectModal} = useConnectModal();
	const {openAccountModal} = useAccountModal();
	const {address} = useAccount();
	const {data: migrateNftData} = useMigrateNft(address);

	const formattedAmount = useMemo(() => {
		const num = parseFloat(formatUnits(migrateNftData?.lockedAmount ?? 0n, 18));
		return num.toLocaleString(undefined, {maximumFractionDigits: 4});
	}, [migrateNftData?.lockedAmount]);

	return (
		<main className="flex flex-col items-center min-h-screen text-white">
			<Background className="opacity-20" />
			<div className="max-w-[1200px] w-full z-10">
				<Header
					items={headerItems}
					selected="Migrate"
					launchText={address ? `${fAddress(address)}` : 'Connect Wallet'}
					onClickLaunch={address ? openAccountModal : openConnectModal}
				/>
				<Ticker
					yDaemon={YDAEMON}
					env={ENV}
				/>
				<section className="mt-32 md:mt-[5vh] mx-4 lg:mx-0">
					<div className="bg-deeper-primary rounded-lg">
						<div className="p-8">
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-4xl font-semibold text-white">Migrate veYB to yYB</h2>
								<div className="px-4 py-1 bg-black/20 rounded-full text-mg">
									<span className="text-neutral-400">Locked: </span>
									<span className="text-white font-medium">{formattedAmount} YB</span>
								</div>
							</div>
							<p className="text-neutral-400 text-md leading-relaxed max-w-[64ch]">
								In order to make any veYB position transferrable, you must first clear existing gauge
								weight and max lock your YB. Once complete, you may migrate to yYB 1:1.
							</p>
						</div>
						<div className="border-t-2 border-input-bg">
							<div className="p-4 md:p-8">
								<MigrateNft />
							</div>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
}

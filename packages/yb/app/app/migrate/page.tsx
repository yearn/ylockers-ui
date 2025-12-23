'use client';

import Header, {headerItems} from '@/components/Header';
import Background from '@/components/Background';
import {MigrateNft} from '@/components/MigrateNft';
import {useConnectModal, useAccountModal} from '--lib/hooks/rainbowkit';
import {useAccount} from 'wagmi';
import {fAddress} from '--lib/tools/format';
import Ticker from '--lib/components/Ticker';
import {YDAEMON, ENV} from '@/constants';

export default function MigratePage() {
	const {openConnectModal} = useConnectModal();
	const {openAccountModal} = useAccountModal();
	const account = useAccount();

	return (
		<main className="flex flex-col items-center min-h-screen text-white">
			<Background className="opacity-20" />
			<div className="max-w-[1200px] w-full z-10">
				<Header
					items={headerItems}
					selected="Migrate"
					launchText={account.address ? `${fAddress(account.address)}` : 'Connect Wallet'}
					onClickLaunch={account.address ? openAccountModal : openConnectModal}
				/>
				<Ticker
					yDaemon={YDAEMON}
					env={ENV}
				/>
				<section className="mt-32 md:mt-[5vh] mx-4 lg:mx-0">
					<div className="bg-deeper-primary rounded-lg">
						<h1 className="text-5xl p-8 font-[700]">Migrate veYB to yYB</h1>
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

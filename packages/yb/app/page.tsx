'use client';

import Button from '--lib/components/Button';
import Header, {headerItems} from '../components/Header';
import Link from 'next/link';
import {fPercent} from '--lib/tools/format';
import Background from '../components/Background';
import Ticker from '--lib/components/Ticker';
import {useVaultApy} from '--lib/hooks/useVaultApy';
import {BASE_TOKEN_NAME, ENV, LOCKER_TOKEN_NAME, STABLE_TOKEN_NAME, YDAEMON} from '@/constants';
import Image from 'next/image';

export default function Home() {
	const vaultApy = useVaultApy(YDAEMON, ENV);

	return (
		<main className="flex flex-col items-center min-h-screen text-white">
			<Background />
			<Header
				items={headerItems}
				selected="Home"
			/>
			<Ticker
				yDaemon={YDAEMON}
				env={ENV}
			/>
			<section className="px-8 xl:px-0 xl:w-[1200px] mt-[15vh] md:mt-[27vh] z-10">
				<div className="w-full px-12 md:px-0">
					<h1 className="text-6xl font-bold flex flex-col space-y-4">
						<span className="flex flex-wrap">Put your</span>
						<span className="flex flex-wrap items-center">
							<Image
								className="mr-[10px] mt-5-[4px]"
								alt="yyb logo"
								src="/yyb-logo.svg"
								width={80}
								height={80}
							/>{' '}
							{LOCKER_TOKEN_NAME} to work
						</span>
					</h1>
					<p className="my-8 xl:w-[670px] font-thin sm:whitespace-nowrap">
						Each week, Yearn&apos;s ve{BASE_TOKEN_NAME} position earns revenue from protocol fees and
						optimized vote incentives.
						<br />
						This is converted to {STABLE_TOKEN_NAME} stablecoin and distributed to {LOCKER_TOKEN_NAME}{' '}
						stakers.
					</p>
					<div className="flex flex-wrap items-center space-x-4 flex-col md:flex-row space-y-8 md:space-y-0">
						<Link href="/app/stake">
							<Button>Launch App</Button>
						</Link>
						<h2 className="text-4xl font-bold text-bright-primary font-mono">
							APY{' '}
							{Number.isFinite(vaultApy) && vaultApy > 0 ? (
								fPercent(vaultApy)
							) : (
								<span title="APY will show when migration period ends after first week.">—%</span>
							)}
						</h2>
					</div>
				</div>
			</section>
		</main>
	);
}

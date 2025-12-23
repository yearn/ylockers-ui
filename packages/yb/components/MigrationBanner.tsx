'use client';

import {useMigrateNft} from '@/components/MigrateNft/hooks';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useAccount} from 'wagmi';

const STORAGE_KEY = 'migration-banner-dismissed';

export default function MigrationBanner() {
	const {address} = useAccount();
	const {data: migrateNftData} = useMigrateNft(address);
	const [isDismissed, setIsDismissed] = useState(true);
	const [isTempDismissed, setIsTempDismissed] = useState(false);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const dismissed = localStorage.getItem(STORAGE_KEY);
			setIsDismissed(dismissed === 'true');
		}
	}, []);

	const handlePermanentDismiss = () => {
		if (typeof window !== 'undefined') {
			localStorage.setItem(STORAGE_KEY, 'true');
			setIsDismissed(true);
		}
	};

	const handleTempDismiss = () => {
		setIsTempDismissed(true);
	};

	const hasVeYBPosition =
		migrateNftData?.lockedAmount && migrateNftData.lockedAmount > 0n && migrateNftData.isUserLocked;

	if (!hasVeYBPosition || isDismissed || isTempDismissed) {
		return null;
	}

	return (
		<div className="mx-4 lg:mx-0 mt-4">
			<div className="relative px-4 py-4 bg-bright-primary/10 border border-bright-primary/30 rounded-xl flex flex-col lg:flex-row lg:items-center gap-3">
				<div className="flex items-center gap-3">
					<div className="w-5 h-5 shrink-0 text-bright-primary">
						<svg
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<p className="text-white font-medium pr-4">You have a veYB position that can be migrated to yYB</p>
				</div>
				<div className="flex items-center gap-2 lg:ml-auto lg:pr-4">
					<button
						onClick={handlePermanentDismiss}
						className="text-neutral-400 border border-white/20 rounded-[8px] px-4 py-2.5 text-sm hover:text-neutral-300 transition-colors">
						Permanently dismiss
					</button>
					<Link
						href="/app/migrate"
						className="px-4 py-2.5 bg-bright-primary text-white font-bold text-sm rounded-lg hover:bg-bright-primary/90 transition-colors">
						Migrate now!
					</Link>
				</div>
				<button
					onClick={handleTempDismiss}
					className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-neutral-800 border border-neutral-600 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
					aria-label="Dismiss banner">
					<svg
						className="w-3 h-3"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}

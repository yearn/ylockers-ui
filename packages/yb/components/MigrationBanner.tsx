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

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const dismissed = localStorage.getItem(STORAGE_KEY);
			setIsDismissed(dismissed === 'true');
		}
	}, []);

	const handleDismiss = () => {
		if (typeof window !== 'undefined') {
			localStorage.setItem(STORAGE_KEY, 'true');
			setIsDismissed(true);
		}
	};

	const hasVeYBPosition =
		migrateNftData?.lockedAmount && migrateNftData.lockedAmount > 0n && migrateNftData.isUserLocked;

	if (!hasVeYBPosition || isDismissed) {
		return null;
	}

	return (
		<div className="mx-4 lg:mx-0 mt-4">
			<div className="p-4 bg-bright-primary/10 border border-bright-primary/30 rounded-xl flex items-start gap-3">
				<div className="w-5 h-5 shrink-0 mt-0.5 text-bright-primary">
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
				<div className="flex-1">
					<p className="text-white font-medium">You have a veYB position that can be migrated to yYB</p>
					<Link
						href="/app/migrate"
						className="text-bright-primary text-sm mt-1 inline-block hover:underline">
						Go to migration page
					</Link>
				</div>
				<button
					onClick={handleDismiss}
					className="w-5 h-5 shrink-0 text-neutral-400 hover:text-white transition-colors"
					aria-label="Dismiss banner">
					<svg
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

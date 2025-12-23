import {useAccount, UseSimulateContractReturnType, useSwitchChain, UseWriteContractReturnType} from 'wagmi';
import {useMigrateNft} from './hooks';
import Button from '--lib/components/Button';
import {useClearVotes} from './hooks/useClearVotes';
import {useCallback, useEffect, useMemo, useRef} from 'react';
import {useConnectModal} from '--lib/hooks/rainbowkit';
import {useToggleInfiniteLock} from './hooks/useToggleInfiniteLock';
import {useSafeTransferFrom} from './hooks/useSafeTransferFrom';
import {useMigrationRecord} from './hooks/useMigrationRecord';
import {formatUnits} from 'viem';
import {cn} from '--lib/tools/tailwind';

type StepStatus = 'completed' | 'active' | 'pending' | 'blocked';

function StepIndicator({step, status}: {step: number; status: StepStatus}) {
	return (
		<div
			className={cn(
				'flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shrink-0 transition-colors',
				status === 'completed' && 'bg-green-500 text-white',
				status === 'active' && 'bg-bright-primary text-white',
				status === 'pending' && 'bg-neutral-600 text-neutral-400',
				status === 'blocked' && 'bg-charge-red/20 text-charge-red'
			)}>
			{status === 'completed' ? (
				<svg
					className="w-4 h-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={3}
						d="M5 13l4 4L19 7"
					/>
				</svg>
			) : (
				step
			)}
		</div>
	);
}

function StepCard({
	step,
	status,
	title,
	description,
	disabled,
	onClick
}: {
	step: number;
	status: StepStatus;
	title: string;
	description?: string;
	disabled: boolean;
	onClick: () => void;
}) {
	return (
		<div
			className={cn(
				'flex-1 p-4 rounded-xl border transition-all flex flex-col',
				status === 'active' && 'bg-input-bg border-bright-primary',
				status === 'completed' && 'bg-black/20 border-green-500/30',
				status === 'pending' && 'bg-black/20 border-neutral-800',
				status === 'blocked' && 'bg-charge-red/5 border-charge-red/30'
			)}>
			<div className="flex items-start gap-3 mb-3 flex-1">
				<StepIndicator
					step={step}
					status={status}
				/>
				<div className="flex-1 min-w-0">
					<h3 className={cn('font-semibold', status === 'active' ? 'text-white' : 'text-neutral-500')}>
						{title}
					</h3>
					{description && (
						<p
							className={cn(
								'text-sm mt-1',
								status === 'active' ? 'text-neutral-300' : 'text-neutral-600'
							)}>
							{description}
						</p>
					)}
				</div>
			</div>
			<Button
				disabled={disabled}
				onClick={onClick}
				className={cn(
					'w-full py-2 mt-auto',
					status !== 'active' && '!bg-black/20 !text-neutral-600 border-transparent'
				)}>
				{status === 'completed' ? 'Done' : title}
			</Button>
		</div>
	);
}

export const MigrateNft = () => {
	const {address, isConnected, chainId} = useAccount();
	const {openConnectModal} = useConnectModal();
	const {switchChain} = useSwitchChain();
	const {data: migrateNftData} = useMigrateNft(address);

	const {lockedAmount, isUserLocked, votedGauges, isVotePowerCleared, voteClearTime, isPermanentLock} =
		migrateNftData ?? {
			lockedAmount: 0n,
			votedGauges: [],
			isVotePowerCleared: false,
			isPermanentLock: false,
			voteClearTime: 0n
		};

	const isLoading = !migrateNftData;

	// Track migration completion
	const prevLockedAmount = useRef<bigint | null>(null);
	const {record: migrationComplete, saveMigration} = useMigrationRecord(address);

	// Detect when lockedAmount goes from > 0 to 0 (migration completed)
	useEffect(() => {
		if (!address) return;

		const prevAmount = prevLockedAmount.current;
		if (prevAmount !== null && prevAmount > 0n && lockedAmount === 0n) {
			const num = parseFloat(formatUnits(prevAmount, 18));
			const amountStr = num.toLocaleString(undefined, {maximumFractionDigits: 4});
			saveMigration(amountStr);
		}

		prevLockedAmount.current = lockedAmount;
	}, [address, lockedAmount, saveMigration]);

	const formattedAmount = useMemo(() => {
		const num = parseFloat(formatUnits(lockedAmount ?? 0n, 18));
		return num.toLocaleString(undefined, {maximumFractionDigits: 4});
	}, [lockedAmount]);

	const isVotePowerClearable = voteClearTime === 0n;
	const isClearVotesEnabled = isVotePowerClearable && !isVotePowerCleared;
	const isMaxLockEnabled = !isPermanentLock && lockedAmount > 0n && !isClearVotesEnabled;
	const isSafeTransferFromEnabled = !isClearVotesEnabled && !isMaxLockEnabled && isVotePowerClearable;

	const step1Status: StepStatus = useMemo(() => {
		if (isVotePowerCleared) return 'completed';
		if (voteClearTime > 0n) return 'blocked';
		return 'active';
	}, [isVotePowerCleared, voteClearTime]);

	const step2Status: StepStatus = useMemo(() => {
		if (isPermanentLock) return 'completed';
		if (!isVotePowerCleared) return 'pending';
		return 'active';
	}, [isPermanentLock, isVotePowerCleared]);

	const step3Status: StepStatus = useMemo(() => {
		if (!isVotePowerCleared) return 'pending';
		if (!isPermanentLock) return 'pending';
		return 'active';
	}, [isVotePowerCleared, isPermanentLock]);

	const clearVotes = useClearVotes({votedGauges, enabled: isClearVotesEnabled});
	const maxLock = useToggleInfiniteLock({enabled: isMaxLockEnabled});
	const safeTransferFrom = useSafeTransferFrom({
		tokenId: migrateNftData?.tokenId,
		enabled: isSafeTransferFromEnabled
	});

	const handleTransaction = useCallback(
		(simulation: UseSimulateContractReturnType<any>, write: UseWriteContractReturnType) => {
			if (!isConnected) {
				openConnectModal?.();
			} else if (chainId !== 1) {
				switchChain?.({chainId: 1});
			} else if (simulation.isSuccess) {
				write.writeContract(simulation.data?.request);
			}
		},
		[isConnected, chainId, openConnectModal, switchChain]
	);

	// Show success state if migration completed
	if (migrationComplete && !isUserLocked) {
		return (
			<div className="w-full max-w-[1200px]">
				<div className="p-8 bg-input-bg rounded-xl border border-green-500/30 text-center">
					<div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
						<svg
							className="w-8 h-8 text-green-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
					<h2 className="text-green-200 text-xl font-semibold mb-2">Migration Complete</h2>
					<p className="text-md text-white/40">Successfully migrated {migrationComplete.amount} YB to yYB</p>
				</div>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="w-full max-w-[1200px]">
				<div className="p-8 bg-input-bg rounded-xl border border-neutral-700 flex items-center justify-center">
					<svg
						className="animate-spin h-6 w-6 text-neutral-400"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24">
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						/>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full max-w-[1200px]">
			{!isUserLocked ? (
				<div className="p-8 bg-input-bg rounded-xl border border-neutral-700 text-center">
					<p className="text-neutral-400">No veYB position found for this wallet.</p>
				</div>
			) : (
				<div className="flex flex-col gap-6">
					<div className="p-6 bg-input-bg rounded-xl border border-neutral-700">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-lg font-semibold text-white">Migrate veYB to yYB</h2>
							<div className="px-3 py-1 bg-deeper-primary rounded-full text-sm">
								<span className="text-neutral-400">Locked: </span>
								<span className="text-white font-medium">{formattedAmount} YB</span>
							</div>
						</div>
						<p className="text-neutral-400 text-sm leading-relaxed">
							Migrate your locked YB position to yYB tokens. Complete all three steps below to finish the
							migration.
						</p>
					</div>

					{voteClearTime > 0n && (
						<div className="p-4 bg-charge-red/10 border border-charge-red/30 rounded-xl flex items-start gap-3">
							<div className="w-5 h-5 shrink-0 mt-0.5 text-charge-red">
								<svg
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
									/>
								</svg>
							</div>
							<div>
								<p className="text-charge-red font-medium">Votes cannot be cleared yet</p>
								<p className="text-neutral-400 text-sm mt-1">
									You voted recently. You can clear your votes on{' '}
									<span className="text-white">
										{new Date(Number(voteClearTime) * 1000).toLocaleDateString(undefined, {
											weekday: 'long',
											year: 'numeric',
											month: 'long',
											day: 'numeric'
										})}
									</span>
								</p>
							</div>
						</div>
					)}

					<div className="flex flex-col lg:flex-row gap-2">
						<StepCard
							step={1}
							status={step1Status}
							title="Clear Votes"
							description="Remove gauge weight allocations"
							disabled={clearVotes.disabled}
							onClick={() =>
								handleTransaction(
									clearVotes.simulation as UseSimulateContractReturnType<any>,
									clearVotes.write
								)
							}
						/>
						<StepCard
							step={2}
							status={step2Status}
							title="Max Lock"
							description="Lock your YB for maximum duration"
							disabled={maxLock.disabled}
							onClick={() =>
								handleTransaction(
									maxLock.simulation as UseSimulateContractReturnType<any>,
									maxLock.write
								)
							}
						/>
						<StepCard
							step={3}
							status={step3Status}
							title="Migrate"
							description={`Transfer ${formattedAmount} YB to yYB`}
							disabled={safeTransferFrom.disabled}
							onClick={() =>
								handleTransaction(
									safeTransferFrom.simulation as UseSimulateContractReturnType<any>,
									safeTransferFrom.write
								)
							}
						/>
					</div>

					<div className="p-4 bg-deeper-primary rounded-xl border border-neutral-700">
						<p className="text-neutral-400 text-sm leading-relaxed">
							<span className="text-neutral-300 font-medium">Note:</span> Migrating locked YB to yYB is
							irreversible. You may stake and unstake yYB tokens, but not convert them back to locked YB.
							Secondary markets will soon be available to exchange yYB for YB at market rates.
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

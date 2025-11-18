import {useAccount, UseSimulateContractReturnType, useSwitchChain, UseWriteContractReturnType} from 'wagmi';
import {useMigrateNft} from './hooks';
import Button from '--lib/components/Button';
import {useClearVotes} from './hooks/useClearVotes';
import {useCallback} from 'react';
import {useConnectModal} from '--lib/hooks/rainbowkit';
import {useToggleInfiniteLock} from './hooks/useToggleInfiniteLock';
import {useSafeTransferFrom} from './hooks/useSafeTransferFrom';

export const MigrateNft = () => {
	const {address, isConnected, chainId} = useAccount();
	const {openConnectModal} = useConnectModal();
	const {switchChain} = useSwitchChain();
	const {data: migrateNftData} = useMigrateNft(address);

	const {lockedAmount, isUserLocked, votedGauges, isVotePowerCleared, isPermanentLock} = migrateNftData ?? {
		lockedAmount: 0n,
		votedGauges: [],
		isVotePowerCleared: false,
		isPermanentLock: false
	};

	const isClearVotesEnabled = !isVotePowerCleared;
	const isMaxLockEnabled = !isPermanentLock && lockedAmount > 0n;
	const isSafeTransferFromEnabled = !isClearVotesEnabled && !isMaxLockEnabled;

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

	if (!isUserLocked) {
		return <p>No locks found.</p>;
	}

	return (
		<div className="w-full max-w-[1200px] border-2 border-[#38bdb8] rounded-lg p-8 bg-deeper-primary">
			<p className="text-white mb-6">
				You have {lockedAmount} YB locked. Migrate them to veYB and stake them in the gauge to receive maximum
				protocol APR, platform fees, as well as full voting power on YieldBasis.
			</p>

			<div className="mb-6">
				<p className="text-white font-semibold mb-3">
					Migrating your veYB position requires a few prerequisites:
				</p>
				<ul className="list-disc list-inside text-white space-y-2 ml-2">
					<li>You must not have any weight allocated to a YieldBasis gauge</li>
					<li>
						If you have allocated weight to a gauge, you must clear it (<i>i.e.</i> set it to 0). You can
						clear it 10 days after your last allocation
					</li>
					<li>You must max lock your position</li>
				</ul>
			</div>

			<p className="text-gray-400 text-sm mb-6 leading-relaxed">
				Important: Migrating locked YB to yYB is irreversible. You may stake and unstake yYB tokens, but not
				convert them back to locked YB. Secondary markets, will soon be available to allow the exchange of yYB
				for YB at varying market rates.
			</p>

			<div className="flex flex-col md:flex-row gap-4">
				<Button
					disabled={clearVotes.disabled}
					onClick={() =>
						handleTransaction(clearVotes.simulation as UseSimulateContractReturnType<any>, clearVotes.write)
					}
					className="bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-700 disabled:text-neutral-400 relative">
					<span className="absolute -top-3 -left-3 bg-white text-black w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">
						1
					</span>
					Clear votes
				</Button>

				<Button
					disabled={maxLock.disabled}
					onClick={() =>
						handleTransaction(maxLock.simulation as UseSimulateContractReturnType<any>, maxLock.write)
					}
					className="bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-700 disabled:text-neutral-400 relative">
					<span className="absolute -top-3 -left-3 bg-white text-black w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">
						2
					</span>
					Max Lock your YB
				</Button>

				<Button
					disabled={safeTransferFrom.disabled}
					onClick={() =>
						handleTransaction(
							safeTransferFrom.simulation as UseSimulateContractReturnType<any>,
							safeTransferFrom.write
						)
					}
					className="bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-700 disabled:text-neutral-400 relative">
					<span className="absolute -top-3 -left-3 bg-white text-black w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">
						3
					</span>
					Migrate {lockedAmount} YB
				</Button>
			</div>
		</div>
	);
};

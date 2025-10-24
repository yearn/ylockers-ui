import {
	useAccount,
	useSimulateContract,
	UseSimulateContractParameters,
	useWaitForTransactionReceipt,
	useWriteContract
} from 'wagmi';
import {useMemo} from 'react';
import YLockerDropsAbi from '--lib/abis/YLockerDrops';
import {Y_LOCKER_DROPS} from '@/constants';

interface UseClaimParams {
	dropId: number;
	account: `0x${string}`;
	recipient: `0x${string}`;
	amount: bigint;
	proof: string[];
	index: number;
	enabled?: boolean;
}

export function useClaim({dropId, account, recipient, amount, proof, index, enabled = true}: UseClaimParams) {
	const {isConnected} = useAccount();

	const simulationEnabled = useMemo(
		() => isConnected && enabled && proof.length > 0 && amount > 0n,
		[isConnected, enabled, proof.length, amount]
	);

	const parameters = useMemo<UseSimulateContractParameters>(
		() => ({
			abi: YLockerDropsAbi,
			address: Y_LOCKER_DROPS,
			functionName: 'claim',
			args: [BigInt(dropId), account, recipient, amount, proof as `0x${string}`[], BigInt(index)],
			chainId: 1,
			query: {enabled: simulationEnabled}
		}),
		[dropId, account, recipient, amount, proof, index, simulationEnabled]
	);

	const simulation = useSimulateContract(parameters);
	const write = useWriteContract();
	const confirmation = useWaitForTransactionReceipt({hash: write.data});

	return {simulation, write, confirmation};
}

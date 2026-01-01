import {VE_YB} from '@/constants';
import {useMemo} from 'react';
import {ContractFunctionParameters} from 'viem';
import {useAccount, useSimulateContract, useWaitForTransactionReceipt, useWriteContract} from 'wagmi';
import veYBAbi from '../abis/veYB';

interface UseParams {
	enabled?: boolean;
}

// max lockoor
export function useToggleInfiniteLock({enabled = true}: UseParams) {
	const {address} = useAccount();

	const disabled = useMemo(() => {
		if (!address || !enabled) return true;
		return false;
	}, [address, enabled]);

	const simulationEnabled = useMemo(() => address && enabled, [address, enabled]);

	const parameters = useMemo<ContractFunctionParameters<typeof veYBAbi, 'nonpayable', 'infinite_lock_toggle'>>(
		() => ({
			abi: veYBAbi,
			address: VE_YB as `0x${string}`,
			functionName: 'infinite_lock_toggle',
			chainId: 1,
			query: {enabled: simulationEnabled}
		}),
		[simulationEnabled]
	);

	const simulation = useSimulateContract(parameters);
	const write = useWriteContract();
	const confirmation = useWaitForTransactionReceipt({hash: write.data});

	return {simulation, write, confirmation, disabled};
}

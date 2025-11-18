import {LOCKER_TOKEN, VE_YB} from '@/constants';
import {useMemo} from 'react';
import {ContractFunctionParameters} from 'viem';
import {useAccount, useSimulateContract, useWaitForTransactionReceipt, useWriteContract} from 'wagmi';
import veYBAbi from '../abis/veYB';

interface UseParams {
	tokenId?: bigint;
	enabled?: boolean;
}

export function useSafeTransferFrom({tokenId, enabled = true}: UseParams) {
	const {address} = useAccount();

	const disabled = useMemo(() => {
		if (!address || !enabled || !tokenId) return true;
		return false;
	}, [address, enabled, tokenId]);

	const simulationEnabled = useMemo(() => address && enabled && tokenId, [address, enabled, tokenId]);

	const parameters = useMemo<ContractFunctionParameters<typeof veYBAbi, 'nonpayable', 'safeTransferFrom'>>(
		() => ({
			abi: veYBAbi,
			address: VE_YB as `0x${string}`,
			functionName: 'safeTransferFrom',
			args: [address as `0x${string}`, LOCKER_TOKEN as `0x${string}`, tokenId as bigint],
			chainId: 1,
			query: {enabled: simulationEnabled}
		}),
		[address, tokenId, simulationEnabled]
	);

	const simulation = useSimulateContract(parameters);
	const write = useWriteContract();
	const confirmation = useWaitForTransactionReceipt({hash: write.data});

	return {simulation, write, confirmation, disabled};
}

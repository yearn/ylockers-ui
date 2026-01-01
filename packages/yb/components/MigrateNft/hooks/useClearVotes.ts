import {GAUGE_CONTROLLER} from '@/constants';
import {useMemo} from 'react';
import {ContractFunctionParameters} from 'viem';
import {useAccount, useSimulateContract, useWaitForTransactionReceipt, useWriteContract} from 'wagmi';
import gaugeControllerAbi from '../abis/gaugeController';

interface UseParams {
	votedGauges: readonly `0x${string}`[];
	enabled?: boolean;
}

export function useClearVotes({votedGauges, enabled = true}: UseParams) {
	const {address} = useAccount();

	const disabled = useMemo(() => {
		if (!address || !enabled) return true;
		if (votedGauges.length === 0) return true;
		return false;
	}, [address, enabled, votedGauges.length]);

	const simulationEnabled = useMemo(
		() => address && enabled && votedGauges.length > 0,
		[address, enabled, votedGauges.length]
	);

	const parameters = useMemo<
		ContractFunctionParameters<typeof gaugeControllerAbi, 'nonpayable', 'vote_for_gauge_weights'>
	>(
		() => ({
			abi: gaugeControllerAbi,
			address: GAUGE_CONTROLLER as `0x${string}`,
			functionName: 'vote_for_gauge_weights',
			args: [votedGauges, Array(votedGauges.length).fill(0n)],
			chainId: 1,
			query: {enabled: simulationEnabled}
		}),
		[votedGauges, simulationEnabled]
	);

	const simulation = useSimulateContract(parameters);
	const write = useWriteContract();
	const confirmation = useWaitForTransactionReceipt({hash: write.data});

	return {simulation, write, confirmation, disabled};
}

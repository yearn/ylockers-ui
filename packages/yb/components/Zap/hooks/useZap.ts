import {
	useAccount,
	useSimulateContract,
	UseSimulateContractParameters,
	useWaitForTransactionReceipt,
	useWriteContract
} from 'wagmi';
import {useParameters} from '../Parameters';
import {useMemo} from 'react';
import zapAbi from '../abis/zap';
import {parseUnits, zeroAddress} from 'viem';
import {useMinOut} from './useMinOut';
import {ZAP} from '@/constants';

export function useZap({needsApproval}: {needsApproval: boolean}) {
	const {isConnected, address} = useAccount();
	const {inputAmount, inputToken, outputToken} = useParameters();
	const {minOut} = useMinOut();

	const amount = useMemo(() => parseUnits(inputAmount ?? '0', 18), [inputAmount]);

	const enabled = useMemo(
		() =>
			isConnected &&
			!!address &&
			inputToken !== undefined &&
			outputToken !== undefined &&
			!needsApproval &&
			amount > 0 &&
			minOut !== undefined,
		[isConnected, inputToken, outputToken, minOut, needsApproval, amount]
	);

	const parameters = useMemo<UseSimulateContractParameters>(
		() => ({
			abi: zapAbi,
			address: ZAP,
			functionName: 'zap',
			args: [
				inputToken?.address ?? zeroAddress,
				outputToken?.address ?? zeroAddress,
				amount,
				minOut ?? 1n,
				address
			],
			chainId: 1,
			query: {enabled}
		}),
		[inputToken, outputToken, amount, minOut, enabled]
	);

	const simulation = useSimulateContract(parameters);
	const write = useWriteContract();
	const confirmation = useWaitForTransactionReceipt({hash: write.data});

	return {simulation, write, confirmation};
}

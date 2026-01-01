import {
	useAccount,
	useReadContract,
	useSimulateContract,
	UseSimulateContractParameters,
	useWaitForTransactionReceipt,
	useWriteContract
} from 'wagmi';
import {useParameters} from '../Parameters';
import {erc20Abi, maxUint256, zeroAddress} from 'viem';
import {useMemo} from 'react';
import {ZAP} from '@/constants';

export function useApproveErc20() {
	const {isConnected, address} = useAccount();
	const {inputToken, inputIsYbs} = useParameters();

	const allowance = useReadContract({
		abi: erc20Abi,
		address: inputToken?.address ?? zeroAddress,
		functionName: 'allowance',
		args: [address ?? zeroAddress, ZAP],
		chainId: 1,
		query: {
			enabled: isConnected && inputToken !== undefined && !inputIsYbs
		}
	});

	const parameters = useMemo<UseSimulateContractParameters>(
		() => ({
			abi: erc20Abi,
			address: inputToken?.address ?? zeroAddress,
			functionName: 'approve',
			args: [ZAP, maxUint256],
			chainId: 1,
			query: {
				enabled:
					isConnected &&
					inputToken !== undefined &&
					!inputIsYbs &&
					allowance.isFetched &&
					allowance.data! === 0n
			}
		}),
		[isConnected, inputToken, inputIsYbs, allowance]
	);

	const simulation = useSimulateContract(parameters);
	const write = useWriteContract();
	const confirmation = useWaitForTransactionReceipt({hash: write.data});

	return {allowance, simulation, write, confirmation};
}

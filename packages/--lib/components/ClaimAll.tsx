import {useCallback, useEffect, useMemo, useState} from 'react';
import Button from './Button';
import {
	useAccount,
	useConfig,
	useReadContract,
	useSimulateContract,
	useSwitchChain,
	useWaitForTransactionReceipt,
	useWriteContract
} from 'wagmi';
import useData from '../hooks/useData';
import {useConnectModal} from '../hooks/rainbowkit';
import abis from '../abis';
import {zeroAddress} from 'viem';
import A from './A';
import {TfiReceipt} from 'react-icons/tfi';
import {motion, AnimatePresence} from 'framer-motion';
import {springs} from '../tools/motion';
import {TEnv} from '../tools/envType';

function GreatSuccess({hash}: {hash: `0x${string}`}) {
	const config = useConfig();
	return (
		<A
			href={`${config.getClient().chain.blockExplorers?.default.url}/tx/${hash}`}
			target="_blank"
			rel="noreferrer">
			<div className="flex items-center gap-2">
				<TfiReceipt />
				<div>Rewards claimed!</div>
			</div>
		</A>
	);
}

export default function ClaimAll({yDaemon, className, env}: {yDaemon: string; className?: string; env: TEnv}) {
	const {openConnectModal} = useConnectModal();
	const {isConnected, chainId, address} = useAccount();
	const {switchChain} = useSwitchChain();
	const {data, refetch} = useData(yDaemon, env);
	const hasClaims = useMemo(() => data.rewards.claimable > 0n, [data]);
	const disabled = useMemo(() => isConnected && chainId === 1 && !hasClaims, [isConnected, chainId, hasClaims]);
	const [success, setSuccess] = useState(false);

	const label = useMemo(() => {
		if (!isConnected) return 'Connect Wallet';
		if (chainId !== 1) return 'Switch Chain';
		return 'Claim All';
	}, [isConnected, chainId]);

	const range = useReadContract({
		address: env.rewardsDistributor,
		abi: abis.SingleTokenRewardDistributor,
		functionName: 'getSuggestedClaimRange',
		args: [address ?? zeroAddress],
		query: {enabled: isConnected},
		chainId: 1
	});

	const simulation = useSimulateContract({
		address: env.rewardsDistributor,
		abi: abis.SingleTokenRewardDistributor,
		functionName: 'claimWithRange',
		args: [range.data?.[0] ?? 0n, range.data?.[1] ?? 0n],
		query: {enabled: isConnected && range.isSuccess && hasClaims},
		chainId: 1
	});

	const write = useWriteContract();

	const receipt = useWaitForTransactionReceipt({hash: write.data});

	const error = useMemo(
		() => range.error || simulation.error || write.error || receipt.error,
		[range, simulation, write, receipt]
	);

	const isError = useMemo(
		() =>
			(range.isError || simulation.isError || write.isError || receipt.isError) &&
			!error?.toString().includes('User denied transaction signature'),
		[range, simulation, write, receipt, error]
	);

	useEffect(() => {
		if (isError) console.error(error);
	}, [isError, error]);

	const subtextKey = useMemo(() => {
		if (isError) return 'error';
		if (receipt.isLoading) return 'confirming';
		if (receipt.isSuccess) return 'success';
		return 'default';
	}, [isError, receipt]);

	const subtext = useMemo(() => {
		if (isError) return <div>Claim error! Please contact support</div>;
		if (receipt.isLoading) return <div>Confirming...</div>;
		if (receipt.isSuccess) return <GreatSuccess hash={write.data!} />;
		return <div></div>;
	}, [isError, write, receipt]);

	const theme = useMemo(() => {
		if (!isConnected) return 'transparent';
		if (receipt?.isLoading) return 'onit';
		return 'default';
	}, [isConnected, receipt]);

	useEffect(() => {
		if (receipt.isSuccess && !success) {
			refetch();
			setSuccess(true);
		}
	}, [receipt, refetch, success, setSuccess]);

	const onClick = useCallback(() => {
		if (receipt?.isLoading) {
			return;
		} else if (!isConnected) {
			openConnectModal?.();
		} else if (chainId !== 1) {
			switchChain?.({chainId: 1});
		} else {
			write.writeContract(simulation.data!.request);
		}
	}, [isConnected, chainId, openConnectModal, switchChain, write, receipt, simulation]);

	return (
		<div className={`flex flex-col gap-2 ${className}`}>
			<div>
				<Button
					onClick={onClick}
					theme={theme}
					disabled={disabled}>
					{label}
				</Button>
			</div>
			<div className={`pl-3 font-thin text-xs ${isError ? 'text-charge-yellow' : ''}`}>
				<AnimatePresence initial={false}>
					<motion.div
						key={subtextKey}
						transition={springs.rollin}
						initial={{x: 40, opacity: 0}}
						animate={{x: 0, opacity: 1}}
						exit={{x: -40, opacity: 0}}>
						{subtext}
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}

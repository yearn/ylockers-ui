'use client';

import Button from '--lib/components/Button';
import {useClaim} from '@/hooks/useClaim';
import {useConnectModal} from '@rainbow-me/rainbowkit';
import {useCallback, useEffect, useMemo} from 'react';
import {useAccount, useSwitchChain} from 'wagmi';

interface ClaimButtonProps {
	tokenSymbol?: string;
	dropId: number;
	amount: bigint;
	proof: string[];
	index: number;
	disabled?: boolean;
	onSuccess?: () => void;
}

export function ClaimButton({
	dropId,
	amount,
	proof,
	index,
	disabled: externalDisabled,
	onSuccess,
	tokenSymbol
}: ClaimButtonProps) {
	const {openConnectModal} = useConnectModal();
	const {address, isConnected, chainId} = useAccount();
	const {switchChain} = useSwitchChain();

	const claim = useClaim({
		dropId,
		account: address!,
		recipient: address!,
		amount,
		proof,
		index,
		enabled: !!address && !externalDisabled
	});

	const isLoading = claim.simulation.isFetching || claim.write.isPending || claim.confirmation.isLoading;

	const disabled = useMemo(() => {
		if (!isConnected) return false;
		if (externalDisabled) return true;
		if (isLoading) return true;
		if (!claim.simulation.isSuccess) return true;
		return false;
	}, [isConnected, externalDisabled, isLoading, claim.simulation.isSuccess]);

	const label = useMemo(() => {
		if (!isConnected) return 'Connect';
		if (isConnected && chainId !== 1) return 'Switch to Mainnet';
		if (claim.confirmation.isLoading) return 'Claiming...';
		if (claim.write.isPending) return 'Confirm...';
		if (externalDisabled) return 'Not Eligible';
		return 'Claim';
	}, [isConnected, chainId, claim.confirmation.isLoading, claim.write.isPending, externalDisabled]);

	const onClick = useCallback(() => {
		if (!isConnected) {
			openConnectModal?.();
		} else if (chainId !== 1) {
			switchChain?.({chainId: 1});
		} else if (claim.simulation.isSuccess) {
			claim.write.writeContract(claim.simulation.data?.request);
		}
	}, [isConnected, chainId, openConnectModal, switchChain, claim.simulation, claim.write]);

	useEffect(() => {
		if (claim.confirmation.isSuccess && onSuccess) {
			onSuccess();
		}
	}, [claim.confirmation.isSuccess, onSuccess]);

	return (
		<Button
			disabled={disabled}
			onClick={onClick}
			className="bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-700 disabled:text-neutral-400">
			{label} {tokenSymbol ? `$${tokenSymbol}` : ''}
		</Button>
	);
}

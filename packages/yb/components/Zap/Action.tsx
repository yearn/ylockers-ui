'use client';

import Button from '--lib/components/Button';
import useDebounce from '--lib/hooks/useDebounce';
import {useConnectModal} from '@rainbow-me/rainbowkit';
import {ReactNode, useCallback, useEffect, useMemo} from 'react';
import {useAccount} from 'wagmi';
import {useContracts} from './Contracts';
import {useParameters} from './Parameters';
import useBalances from './hooks/useBalances';
import {useInsufficientFunds} from './hooks/useInsufficientFunds';
import {TOKENS} from './tokens';

export function ActionDisplay({
	onClick,
	disabled,
	className,
	theme,
	children
}: {
	onClick?: () => void;
	disabled?: boolean;
	className?: string;
	theme?: 'default' | 'transparent' | 'onit';
	children?: ReactNode;
}) {
	return (
		<Button
			disabled={disabled}
			onClick={onClick}
			className={className}
			theme={theme}>
			{children ?? '...'}
		</Button>
	);
}

export function Action({className}: {className?: string}) {
	const {openConnectModal} = useConnectModal();
	const {isConnected} = useAccount();

	const {inputToken, inputAmount, setInputAmount, outputAmount, setOutputAmount, theme, setTheme, onZap} =
		useParameters();

	const {
		inputAmountExpanded,
		inputIsYbs,
		outputIsYbs,
		approveErc20,
		approveYbsAsInput,
		approveYbsAsOutput,
		needsErc20Approval,
		needsYbsApproval,
		needsApproval,
		zap,
		isVerifying,
		isConfirming
	} = useContracts();

	const {refetch: refetchBalances} = useBalances({tokens: TOKENS});
	const insufficientBalance = useInsufficientFunds();

	const disabled = useMemo(() => {
		if (!isConnected) return false;
		if (isVerifying || isConfirming) return true;
		if (!inputAmount || !outputAmount) return true;
		if (insufficientBalance) return true;
		if (inputIsYbs && needsYbsApproval && !approveYbsAsInput.simulation.isSuccess) return true;
		if (needsErc20Approval && !approveErc20.simulation.isSuccess) return true;
		if (outputIsYbs && needsYbsApproval && !approveYbsAsOutput.simulation.isSuccess) return true;
		if (!(needsApproval || zap.simulation.isSuccess)) return true;
		return false;
	}, [
		isConnected,
		isVerifying,
		isConfirming,
		inputAmount,
		outputAmount,
		insufficientBalance,
		inputIsYbs,
		outputIsYbs,
		approveErc20,
		approveYbsAsInput,
		approveYbsAsOutput,
		needsErc20Approval,
		needsYbsApproval,
		needsApproval,
		zap
	]);

	const _label = useMemo(() => {
		if (!isConnected) return 'Connect';
		if (insufficientBalance) return 'Insufficient funds';
		if (!inputAmount || !outputAmount) return 'Enter zap amount';
		if (isConfirming) return 'Confirming...';
		if (needsErc20Approval) return `Approve ${inputToken?.symbol ?? 'token'}`;
		if (needsYbsApproval) return 'Enable YBS Zap';
		return 'Zap!';
	}, [
		isConnected,
		isConfirming,
		inputToken,
		inputAmount,
		outputAmount,
		insufficientBalance,
		needsErc20Approval,
		needsYbsApproval
	]);

	const label = useDebounce(_label, 68);

	const reset = useCallback(
		(resetAmounts: boolean) => {
			approveErc20.write.reset();
			approveYbsAsInput.write.reset();
			approveYbsAsOutput.write.reset();
			zap.write.reset();

			approveErc20.allowance.refetch();
			approveYbsAsInput.approvedCaller.refetch();
			approveYbsAsOutput.approvedCaller.refetch();

			refetchBalances();

			if (resetAmounts) {
				setInputAmount(undefined);
				setOutputAmount(undefined);
			}
		},
		[approveErc20, approveYbsAsInput, approveYbsAsOutput, zap, refetchBalances, setInputAmount, setOutputAmount]
	);

	const approve = useCallback(() => {
		if (inputIsYbs && approveYbsAsInput.approvedCaller.data !== 3) {
			approveYbsAsInput.write.writeContract(approveYbsAsInput.simulation.data!.request);
		} else if (!inputIsYbs && (approveErc20.allowance.data ?? 0n) < inputAmountExpanded) {
			approveErc20.write.writeContract(approveErc20.simulation.data!.request);
		} else if (outputIsYbs && approveYbsAsOutput.approvedCaller.data !== 3) {
			approveYbsAsOutput.write.writeContract(approveYbsAsOutput.simulation.data!.request);
		}
	}, [inputIsYbs, outputIsYbs, inputAmountExpanded, approveErc20, approveYbsAsInput, approveYbsAsOutput]);

	useEffect(() => {
		if (isVerifying || isConfirming) {
			setTheme('onit');
		} else {
			setTheme(undefined);
		}
	}, [setTheme, isVerifying, isConfirming]);

	useEffect(() => {
		if (
			approveErc20.confirmation.isSuccess ||
			approveYbsAsInput.confirmation.isSuccess ||
			approveYbsAsOutput.confirmation.isSuccess ||
			zap.confirmation.isSuccess
		) {
			reset(zap.confirmation.isSuccess);
			if (zap.confirmation.isSuccess) onZap();
		}
	}, [reset, approveErc20, approveYbsAsInput, approveYbsAsOutput, zap, onZap]);

	const onClick = useCallback(() => {
		if (!isConnected) {
			openConnectModal?.();
		} else if (needsApproval) {
			approve();
		} else {
			zap.write.writeContract(zap.simulation.data!.request);
		}
	}, [isConnected, openConnectModal, needsApproval, approve, zap]);

	return (
		<ActionDisplay
			onClick={onClick}
			disabled={disabled}
			className={className}
			theme={theme}>
			{label}
		</ActionDisplay>
	);
}

import {useMemo} from 'react';
import {useParameters} from '../Parameters';
import {TOKENS} from '../tokens';
import useBalances from './useBalances';
import {parseUnits} from 'viem';

export function useInsufficientFunds() {
	const {inputAmount, inputToken} = useParameters();
	const {getBalance} = useBalances({tokens: TOKENS});
	const inputBalance = useMemo(() => getBalance(inputToken), [getBalance, inputToken]);
	const insufficientFunds = useMemo(() => {
		if (inputToken === undefined || (inputAmount?.length ?? 0) === 0) return false;
		const inputExpansion = parseUnits(inputAmount!, inputToken.decimals);
		return inputExpansion > inputBalance.amount;
	}, [inputAmount, inputToken, inputBalance]);
	return insufficientFunds;
}

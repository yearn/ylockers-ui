import {useMemo} from 'react';
import useSWR from 'swr';
import {usePeg} from './usePeg';
import {TEnv} from '../tools/envType';

function useLockerTokenPriceBasedOnPeg(env: TEnv, baseTokenPrice: number | undefined) {
	const peg = usePeg({exitPool: env.exitPool});
	const result = useMemo(() => {
		if (baseTokenPrice === undefined) return undefined;
		return baseTokenPrice * peg;
	}, [baseTokenPrice, peg]);
	return result;
}

export default function usePrices(yDaemon: string, env: TEnv, tokens: `0x${string}`[]) {
	const _tokens = useMemo(() => {
		const result: `0x${string}`[] = [...tokens];
		if (tokens.includes(env.lockerToken) && !tokens.includes(env.baseToken)) {
			result.push(env.baseToken);
		}
		return result;
	}, [env.baseToken, env.lockerToken, tokens]);

	const request = `${yDaemon}/1/prices/some/${_tokens.join(',')}?humanized=true`;
	const fallbackData = _tokens.reduce((acc: {[key: `0x${string}`]: number}, token) => {
		acc[token] = 0;
		return acc;
	}, {});

	const {data, isLoading, isValidating, error, mutate} = useSWR(
		request,
		async () => {
			const response = await fetch(request);
			return response.json();
		},
		{
			fallbackData,
			refreshInterval: 30_000
		}
	);

	const lockerTokenPrice = useLockerTokenPriceBasedOnPeg(env, data[env.baseToken]);

	const _data = useMemo(() => {
		return {...data, [env.lockerToken]: lockerTokenPrice ?? 0};
	}, [data, env.lockerToken, lockerTokenPrice]);

	return {
		data: _data as {[key: `0x${string}`]: number},
		isLoading,
		isValidating,
		error,
		mutate
	};
}

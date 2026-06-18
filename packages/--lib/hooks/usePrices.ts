import {useMemo} from 'react';
import useSWR from 'swr';
import {usePeg} from './usePeg';
import type {TEnv} from '../tools/envType';

type TPriceMap = {[key: `0x${string}`]: number};

function useLockerTokenPriceBasedOnPeg(env: TEnv, baseTokenPrice: number | undefined): number | undefined {
	const peg = usePeg({exitPool: env.exitPool});
	const result = useMemo(() => {
		if (baseTokenPrice === undefined) return undefined;
		return baseTokenPrice * peg;
	}, [baseTokenPrice, peg]);
	return result;
}

function getPricesRequest(tokens: `0x${string}`[]): string {
	const searchParams = new URLSearchParams();
	for (const token of tokens) {
		searchParams.append('addresses', token);
	}
	return `/api/prices/1?${searchParams.toString()}`;
}

function getFallbackData(tokens: `0x${string}`[]): TPriceMap {
	return tokens.reduce((acc: TPriceMap, token) => {
		acc[token] = 0;
		return acc;
	}, {});
}

async function fetchPrices(request: string, fallbackData: TPriceMap): Promise<TPriceMap> {
	try {
		const response = await fetch(request);
		if (!response.ok) {
			return fallbackData;
		}
		return {...fallbackData, ...(await response.json())};
	} catch {
		return fallbackData;
	}
}

export default function usePrices(env: TEnv, tokens: `0x${string}`[]) {
	const _tokens = useMemo(() => {
		const result: `0x${string}`[] = [...tokens];
		if (tokens.includes(env.lockerToken) && !tokens.includes(env.baseToken)) {
			result.push(env.baseToken);
		}
		return result;
	}, [env.baseToken, env.lockerToken, tokens]);

	const request = useMemo(() => getPricesRequest(_tokens), [_tokens]);
	const fallbackData = useMemo(() => getFallbackData(_tokens), [_tokens]);

	const {data, isLoading, isValidating, error, mutate} = useSWR(
		request,
		async () => fetchPrices(request, fallbackData),
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

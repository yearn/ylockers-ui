import { useSuspenseQuery } from "@tanstack/react-query";
import type { Token } from "../tokens";
import { PRICE_PROXIES, TOKENS_MAP } from "../tokens";

type TPriceMap = { [key: `0x${string}`]: number };

function getPriceTokens(tokens: Token[]): Token[] {
	const result = new Map<`0x${string}`, Token>();
	for (const token of tokens) {
		result.set(token.address, token);

		const proxySymbol = PRICE_PROXIES[token.symbol];
		const proxyToken = proxySymbol ? TOKENS_MAP[proxySymbol] : undefined;
		if (proxyToken) {
			result.set(proxyToken.address, proxyToken);
		}
	}
	return [...result.values()];
}

function getPricesRequest(tokens: Token[]): string {
	const [firstToken] = tokens;
	const chainId = firstToken?.chainId ?? 1;
	const searchParams = new URLSearchParams();
	for (const token of tokens) {
		searchParams.append("addresses", token.address);
	}
	return `/api/prices/${chainId}?${searchParams.toString()}`;
}

function getFallbackData(tokens: Token[]): TPriceMap {
	return tokens.reduce((acc: TPriceMap, token) => {
		acc[token.address] = 0;
		return acc;
	}, {});
}

async function fetchPrices(
	request: string,
	fallbackData: TPriceMap,
): Promise<TPriceMap> {
	try {
		const response = await fetch(request);
		if (!response.ok) {
			return fallbackData;
		}
		console.log("response", await response.json());
		console.log("fallbackData", fallbackData);
		return { ...fallbackData, ...(await response.json()) };
	} catch {
		return fallbackData;
	}
}

export default function usePrices({ tokens }: { tokens: Token[] }) {
	const priceTokens = getPriceTokens(tokens);
	console.log("priceTokens", priceTokens);
	const request = getPricesRequest(priceTokens);
	const fallbackData = getFallbackData(priceTokens);
	return useSuspenseQuery({
		queryKey: ["usePrices", request],
		queryFn: async () => fetchPrices(request, fallbackData),
	});
}

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAddress } from "viem";

const CACHE_CONTROL =
	"public, max-age=15, s-maxage=30, stale-while-revalidate=60";
const DEFAULT_ENSO_API_BASE_URL = "https://api.enso.build/api/v1";

type TPriceMap = { [key: `0x${string}`]: number };

type TRouteContext = {
	params: {
		chainId: string;
	};
};

type TUnknownRecord = { [key: string]: unknown };

function createJsonResponse(
	body: TPriceMap | { error: string },
	status = 200,
): NextResponse {
	const response = NextResponse.json(body, { status });
	response.headers.set("Cache-Control", CACHE_CONTROL);
	return response;
}

function parseChainId(value: string): number | undefined {
	const chainId = Number(value);
	if (!Number.isSafeInteger(chainId) || chainId <= 0) {
		return undefined;
	}
	return chainId;
}

function parseAddresses(
	searchParams: URLSearchParams,
): `0x${string}`[] | undefined {
	const rawAddresses = searchParams.getAll("addresses");
	if (rawAddresses.length === 0) {
		return undefined;
	}

	const addresses = new Set<`0x${string}`>();
	for (const rawAddress of rawAddresses) {
		try {
			addresses.add(getAddress(rawAddress));
		} catch {
			return undefined;
		}
	}

	return [...addresses].sort((a, b) =>
		a.toLowerCase().localeCompare(b.toLowerCase()),
	);
}

function getEnsoUrl(chainId: number, addresses: `0x${string}`[]): string {
	const baseUrl = (
		process.env.ENSO_API_BASE_URL ?? DEFAULT_ENSO_API_BASE_URL
	).replace(/\/$/, "");
	const url = new URL(`${baseUrl}/prices/${chainId}`);
	for (const address of addresses) {
		url.searchParams.append("addresses", address);
	}
	return url.toString();
}

function getEnsoHeaders(): HeadersInit {
	const apiKey = process.env.ENSO_API_KEY?.trim();
	if (!apiKey) {
		return {};
	}
	return { Authorization: `Bearer ${apiKey}` };
}

function isRecord(value: unknown): value is TUnknownRecord {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeEnsoPrices(
	value: unknown,
	addresses: `0x${string}`[],
): TPriceMap | undefined {
	if (!Array.isArray(value)) {
		return undefined;
	}

	const requestedAddresses = new Set(addresses);
	const prices: TPriceMap = {};
	for (const address of addresses) {
		prices[address] = 0;
	}

	for (const item of value) {
		if (!isRecord(item) || typeof item.address !== "string") {
			continue;
		}

		let address: `0x${string}`;
		try {
			address = getAddress(item.address);
		} catch {
			continue;
		}

		if (!requestedAddresses.has(address)) {
			continue;
		}

		const price =
			typeof item.price === "number" ? item.price : Number(item.price);
		if (Number.isFinite(price)) {
			prices[address] = price;
		}
	}

	return prices;
}

async function fetchEnsoPrices(
	chainId: number,
	addresses: `0x${string}`[],
): Promise<TPriceMap | undefined> {
	const response = await fetch(getEnsoUrl(chainId, addresses), {
		headers: getEnsoHeaders(),
	});
	if (!response.ok) {
		return undefined;
	}

	return normalizeEnsoPrices(await response.json(), addresses);
}

export async function getEnsoPriceRoute(
	request: NextRequest,
	{ params }: TRouteContext,
): Promise<NextResponse> {
	const chainId = parseChainId(params.chainId);
	if (chainId === undefined) {
		return createJsonResponse({ error: "Invalid chainId" }, 400);
	}

	const addresses = parseAddresses(request.nextUrl.searchParams);
	if (addresses === undefined) {
		return createJsonResponse({ error: "Invalid addresses" }, 400);
	}

	try {
		const prices = await fetchEnsoPrices(chainId, addresses);
		if (prices === undefined) {
			return createJsonResponse({ error: "Failed to fetch Enso prices" }, 502);
		}
		return createJsonResponse(prices);
	} catch {
		return createJsonResponse({ error: "Failed to fetch Enso prices" }, 502);
	}
}

export const GET = getEnsoPriceRoute;

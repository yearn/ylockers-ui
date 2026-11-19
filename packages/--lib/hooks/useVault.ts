import useSWR from 'swr';

export const KONG_REST_API = 'https://kong.yearn.fi/api/rest';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function getForwardApr(vault: any): number {
	const performance = vault?.performance;
	return performance?.estimated?.apr ?? performance?.oracle?.netAPR ?? performance?.historical?.net ?? 0;
}

export default function useVault(_yDaemon: string, vault?: `0x${string}`) {
	const request = vault ? `${KONG_REST_API}/snapshot/1/${vault}` : null;

	const {data, isLoading, isValidating, error, mutate} = useSWR(
		request,
		async () => {
			if (!request) return null;
			const response = await fetch(request);
			return response.json();
		},
		{
			fallbackData: vault ? {[vault]: 0} : undefined,
			refreshInterval: 30_000
		}
	);

	return {
		data: data as any,
		isLoading,
		isValidating,
		error,
		mutate
	};
}

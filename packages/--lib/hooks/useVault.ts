import useSWR from 'swr';

export default function useVault(ydaemon: string, vault?: `0x${string}`) {
	const request = vault ? `${ydaemon}/1/vault/${vault}` : null;

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

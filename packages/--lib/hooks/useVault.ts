import useSWR from 'swr';

export default function useVault(ydaemon: string, vault: `0x${string}`) {
	const request = `${ydaemon}/1/vault/${vault}`;

	const {data, isLoading, isValidating, error, mutate} = useSWR(
		request,
		async () => {
			const response = await fetch(request);
			return response.json();
		},
		{
			fallbackData: {[vault]: 0},
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

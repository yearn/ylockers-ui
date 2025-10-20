import {Config} from '--lib/context/Providers';
import {Merkle} from '@/utils/Merkle';
import {useQuery} from '@tanstack/react-query';

export const useMerkleDrops = (_acc?: `0x${string}`) => {
	const merkle = new Merkle(Config);

	return useQuery({
		queryKey: ['useMerkleDrop'],
		queryFn: () => merkle.getUserAirdrops('0xEfb8B98A4BBd793317a863f1Ec9B92641aB1CBbb'),
		// staleTime: 60 * 1000, // 1 minute
		// enabled: isChainSupported(chainId), // Only run query if chain is supported
		select: data => {
			return Object.values(data);
		}
	});
};

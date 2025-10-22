import {Config} from '--lib/context/Providers';
import {Merkle} from '@/utils/Merkle';
import {useQuery} from '@tanstack/react-query';

export const useMerkleDrops = (account?: `0x${string}`) => {
	const merkle = new Merkle(Config);
	return useQuery({
		queryKey: ['useMerkleDrop', account],
		queryFn: () => merkle.getUserAirdrops(account),
		enabled: !!account
	});
};

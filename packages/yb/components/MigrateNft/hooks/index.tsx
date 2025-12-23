import {Config} from '--lib/context/Providers';
import {useQuery} from '@tanstack/react-query';
import {MigrateNft} from '../utils/MigrateNft';

export const useMigrateNft = (account?: `0x${string}`) => {
	const migrator = new MigrateNft(Config);
	const cacheTime = 30 * 1000; // 30s
	return useQuery({
		queryKey: ['useMigrateNft', account],
		queryFn: () => migrator.migrateNft(account),
		enabled: !!account,
		gcTime: cacheTime,
		staleTime: cacheTime
	});
};

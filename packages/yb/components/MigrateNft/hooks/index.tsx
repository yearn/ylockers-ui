import {Config} from '--lib/context/Providers';
import {useQuery} from '@tanstack/react-query';
import {MigrateNft} from '../utils/MigrateNft';

export const useMigrateNft = (account?: `0x${string}`) => {
	const migrator = new MigrateNft(Config);
	return useQuery({
		queryKey: ['useMigrateNft', account],
		queryFn: () => migrator.migrateNft(account),
		enabled: !!account,
		// TODO: - adjust
		gcTime: 0,
		staleTime: 0
	});
};

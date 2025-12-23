import {NFT_HELPER} from '@/constants';
import {Config} from 'wagmi';
import {readContract} from 'wagmi/actions';
import nftHelperAbi from '../abis/nftHelper';

export class MigrateNft {
	private wagmiConfig: Config;

	constructor(wagmiConfig: Config) {
		this.wagmiConfig = wagmiConfig;
	}

	public async migrateNft(user?: `0x${string}`): Promise<{
		isUserLocked: boolean;
		isVotePowerCleared: boolean;
		isPermanentLock: boolean;
		lockedAmount: bigint;
		voteClearTime: bigint;
		votedGauges: readonly `0x${string}`[];
		tokenId: bigint;
	}> {
		const nftInfo = await this.getNftTransferInfoFor(user);
		if (!nftInfo) {
			throw new Error('Failed to fetch NFT info');
		}
		const isUserLocked = nftInfo.lockedAmount > 0n;
		return {
			...nftInfo,
			isUserLocked
		};
	}

	private async getNftTransferInfoFor(user?: `0x${string}`): Promise<
		| {
				tokenId: bigint;
				lockedAmount: bigint;
				isVotePowerCleared: boolean;
				isPermanentLock: boolean;
				voteClearTime: bigint;
				votedGauges: readonly `0x${string}`[];
		  }
		| undefined
	> {
		try {
			if (!user) throw new Error('User is required');
			const transferInfo = await readContract(this.wagmiConfig, {
				abi: nftHelperAbi,
				address: NFT_HELPER,
				functionName: 'getNftTransferInfo',
				args: [user]
			});
			const [tokenId, lockedAmount, isVotePowerCleared, isPermanentLock, voteClearTime, votedGauges] =
				transferInfo;
			return {
				tokenId,
				lockedAmount,
				isVotePowerCleared,
				isPermanentLock,
				voteClearTime,
				votedGauges
			};
		} catch (e) {
			console.error(`Failed to fetch user info for ${user}:`, e);
			return undefined;
		}
	}
}

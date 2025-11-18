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
		lockedAmount: bigint;
		isUserLocked: boolean;
		votedGauges: readonly `0x${string}`[];
		isVotePowerCleared: boolean;
		isPermanentLock: boolean;
		tokenId: bigint;
	}> {
		const nftInfo = await this.getNftTransferInfoFor(user);
		if (!nftInfo) {
			throw new Error('Failed to fetch NFT info');
		}
		const {tokenId, lockedAmount, isVotePowerCleared, isPermanentLock, votedGauges} = nftInfo;
		return {
			votedGauges,
			isVotePowerCleared,
			isPermanentLock,
			lockedAmount,
			isUserLocked: lockedAmount > 0n,
			tokenId
		};
	}

	private async getNftTransferInfoFor(user?: `0x${string}`): Promise<
		| {
				tokenId: bigint;
				lockedAmount: bigint;
				isVotePowerCleared: boolean;
				isPermanentLock: boolean;
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
			const [tokenId, lockedAmount, isVotePowerCleared, isPermanentLock, votedGauges] = transferInfo;
			return {
				tokenId,
				lockedAmount,
				isVotePowerCleared,
				isPermanentLock,
				votedGauges
			};
		} catch (e) {
			console.error(`Failed to fetch user info for ${user}:`, e);
			return undefined;
		}
	}
}

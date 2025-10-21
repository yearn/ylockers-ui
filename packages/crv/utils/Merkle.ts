import {Config} from 'wagmi';

interface Claim {
	index: number;
	amount: bigint;
	proof: string[];
}

export class Merkle {
	private wagmiConfig: Config;

	constructor(wagmiConfig: Config) {
		this.wagmiConfig = wagmiConfig;
	}

	public async getMerkleProofs(acc: `0x${string}`): Promise<
		{
			epoch: `0x${string}`;
			claims: Record<`0x${string}`, Claim>;
		}[]
	> {
		// Fetch drop count
		// try {
		// 	const dropCount = await readContract(this.wagmiConfig, {
		// 		address: ENV.yLockerDrops,
		// 		abi: YLockerDrops,
		// 		functionName: 'dropCount'
		// 	});
		// 	console.log('dropCount', dropCount);
		// } catch (e) {
		// 	console.error(e);
		// 	return [];
		// }

		const dropCount = 2;

		// Fetch available claims for user
		const claimStatuses = await this.fetchClaimStatuses(acc, dropCount);
		const unclaimedIds = Object.keys(claimStatuses).filter(id => !claimStatuses[id]);

		// Fetch drop info for available claims
		// const contracts = unclaimedIds.map(epoch => ({
		// 	address: ENV.yLockerDrops,
		// 	abi: YLockerDrops,
		// 	args: [epoch],
		// 	functionName: 'drops' as ContractFunctionName<typeof YLockerDrops, 'view'>
		// }));

		// Available merkle roots to claim
		// const hashesResponse = await readContracts(this.wagmiConfig, {
		// 	contracts: contracts as any
		// });

		const hashesResponse = [
			'0x8e56b36683fcd93fd5cdec440e1f18ed4cafb48e86bc7bd31f7c540c38c447b6',
			'0x8e56b36683fcd93fd5cdec440e1f18ed4cafb48e86bc7bd31f7c540c38c447b7'
		];

		// TODO: - change to fetch merkle roots in order rather than importing here.
		// const _hashes = hashesResponse.map(res => (res as any)?.result[5]) as `0x${string}`[];
		// const url = `https://ipfs.io/ipfs/${getIpfsHashFromBytes32(_hashes[0])}`;

		const claims = await Promise.all(
			hashesResponse.map(hash => fetch(`http://localhost:3000/proofs/${hash}.json`).then(res => res.json()))
		);

		return unclaimedIds.map((id, i) => ({epoch: id as `0x${string}`, claims: claims[i] as any}));
	}

	public async getUserAirdrops(account: `0x${string}`) {
		const drops = {} as Record<
			`0x${string}`,
			{amount: bigint; proof: string[]; hasClaimed: boolean; tokenSymbol: string; expiresAt: number}
		>;
		const dropData = await this.getMerkleProofs(account);

		// Mock data for multiple drops with different statuses
		const mockDropMetadata = [
			{tokenSymbol: 'CRV', expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000}, // Expires in 7 days
			{tokenSymbol: 'YCRV', expiresAt: Date.now() + 24 * 60 * 60 * 1000} // Expired yesterday
		];

		dropData?.forEach((drop, index) => {
			const amount = this.getUserAmount(drop.claims, account);
			if (!amount) return {amount: 0n, proof: []};
			const proof = this.getUserProof(account, drop.claims);
			const metadata = mockDropMetadata[index % mockDropMetadata.length];
			drops[drop.epoch] = {
				amount,
				proof,
				hasClaimed: false,
				tokenSymbol: metadata.tokenSymbol,
				expiresAt: metadata.expiresAt
			};
		});

		return drops;
	}

	private async fetchClaimStatuses(acc: `0x${string}`, dropCount: number): Promise<Record<string, boolean>> {
		const drops = Array.from({length: Number(dropCount)}, (_, i) => i);
		const claimedDrops: Record<string, boolean> = {};
		// try {
		// const hasClaimed = await readContracts(this.wagmiConfig, {
		// 	contracts: drops.map(dropId => ({
		// 		address: ENV.yLockerDrops,
		// 		abi: YLockerDrops,
		// 		args: [acc, dropId],
		// 		functionName: 'hasClaimed' as ContractFunctionName<typeof YLockerDrops, 'view'>
		// 	}))
		// });
		// 	hasClaimed.forEach((r, i) => {
		// 		claimedDrops[drops[i].toString()] = (r.result || false) as boolean;
		// 	});
		// 	return claimedDrops;
		// } catch (e) {
		// 	console.error(e);
		// 	return {};
		// }
		return {'0': false, '1': false};
	}

	private getUserProof(account: `0x${string}`, drop: Record<`0x${string}`, Claim>) {
		return drop[account].proof;
	}

	private getUserAmount(data: Record<`0x${string}`, Claim>, _account: `0x${string}`): bigint {
		return (
			Object.entries(data).find(([account]) => account?.toLowerCase() === _account?.toLowerCase())?.[1]?.amount ??
			0n
		);
	}
}

import {zeroAddress} from 'viem';
import {Config} from 'wagmi';
import {readContract, readContracts} from 'wagmi/actions';

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
		// const dropCount = await readContract(this.wagmiConfig, {
		// 	address: zeroAddress, // TODO: - change
		// 	abi: [], // TODO: - change
		// 	functionName: 'dropCount'
		// })?.then(res => res as any as number);
		const dropCount = 1;

		// Fetch available claims for user
		const claimStatuses = await this.fetchClaimStatuses(acc, dropCount);
		const unclaimedIds = Object.keys(claimStatuses).filter(id => !claimStatuses[id]);

		// Fetch drop info for available claims
		// const contracts = unclaimedIds
		// 	.map((epoch, i) => {
		// 		return {
		// 			address: zeroAddress, // TODO: - change
		// 			abi: [], // TODO: - change
		// 			args: [epoch],
		// 			functionName: 'drops'
		// 		};
		// 	})
		// 	.filter(c => !!c);

		// Available merkle roots to claim
		// const hashesResponse = await readContracts(this.wagmiConfig, {
		// 	contracts: contracts as any
		// });

		const hashesResponse = ['0x8e56b36683fcd93fd5cdec440e1f18ed4cafb48e86bc7bd31f7c540c38c447b6'];

		// TODO: - change to fetch merkle roots in order rather than importing here.
		// const _hashes = hashesResponse.map(res => (res as any)?.result[5]) as `0x${string}`[];
		// const url = `https://ipfs.io/ipfs/${getIpfsHashFromBytes32(_hashes[0])}`;

		const claims = await Promise.all(
			hashesResponse.map(hash => fetch(`http://localhost:3000/proofs/${hash}.json`).then(res => res.json()))
		);

		return unclaimedIds.map((id, i) => ({epoch: id as `0x${string}`, claims: claims[i] as any}));
	}

	public async getUserAirdrops(account: `0x${string}`) {
		const drops = {} as Record<`0x${string}`, {amount: bigint; proof: string[]; hasClaimed: boolean}>;
		const dropData = await this.getMerkleProofs(account);

		dropData?.forEach(drop => {
			const amount = this.getUserAmount(drop.claims, account);
			if (!amount) return {amount: 0n, proof: []};
			const proof = this.getUserProof(account, drop.claims);
			drops[drop.epoch] = {amount, proof, hasClaimed: false};
		});

		return drops;
	}

	private async fetchClaimStatuses(acc: `0x${string}`, dropCount: number): Promise<Record<string, boolean>> {
		const drops = Array.from({length: Number(dropCount)}, (_, i) => i);
		const claimedDrops: Record<string, boolean> = {};
		// try {
		// 	const hasClaimed = await readContracts(this.wagmiConfig, {
		// 		contracts: drops.map(dropId => ({
		// 			address: zeroAddress, // TODO: - change
		// 			abi: [], // TODO: - change
		// 			args: [acc, dropId],
		// 			functionName: 'hasClaimed'
		// 		}))
		// 	});
		// 	hasClaimed.forEach((r, i) => {
		// 		claimedDrops[drops[i].toString()] = (r.result || false) as boolean;
		// 	});
		// 	return claimedDrops;
		// } catch (e) {
		// 	console.error(e);
		// 	return {};
		// }
		return {'0': false};
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

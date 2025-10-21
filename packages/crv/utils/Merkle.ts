import YLockerDrops from '--lib/abis/YLockerDrops';
import {ENV} from '@/constants';
import {ContractFunctionName, erc20Abi} from 'viem';
import {Config} from 'wagmi';
import {readContract, readContracts} from 'wagmi/actions';
import {exactToSimple} from '.';
import _ from './chain';

interface Claim {
	index: number;
	amount: bigint;
	proof: string[];
}

interface Drop {
	token: `0x${string}`;
	startsAt: number;
	expiresAt: number;
	totalAmount: bigint;
	claimedAmount: bigint;
	merkleRoot: `0x${string}`;
	description: string;
}

export class Merkle {
	private wagmiConfig: Config;

	constructor(wagmiConfig: Config) {
		this.wagmiConfig = wagmiConfig;
	}

	public async getMerkleProofs(acc: `0x${string}`): Promise<
		{
			root: `0x${string}`;
			claims: Record<`0x${string}`, Claim>;
			info: Drop;
		}[]
	> {
		// Fetch drop count
		const dropCount = await (async () => {
			try {
				const dropCount = await readContract(this.wagmiConfig, {
					address: ENV.yLockerDrops,
					abi: YLockerDrops,
					functionName: 'dropCount'
				});
				return exactToSimple(dropCount, 0);
			} catch (e) {
				console.error(e);
				return 0;
			}
		})();

		// Fetch available claims for user
		const claimStatuses = await this.fetchClaimStatuses(acc, dropCount);
		const unclaimedIds = Object.keys(claimStatuses).filter(id => !claimStatuses[id]);

		const dropsResponse = await (async () => {
			try {
				// Fetch drop info for available claims
				const contracts = unclaimedIds.map(epoch => ({
					address: ENV.yLockerDrops,
					abi: YLockerDrops,
					args: [epoch],
					functionName: 'drops' as ContractFunctionName<typeof YLockerDrops, 'view'>
				}));

				// Available merkle roots to claim
				const dropsResponse = (await readContracts(this.wagmiConfig, {
					contracts
				}).then(res => res.map(r => r.result))) as [
					`0x${string}`, // token
					number, // startsAt
					number, // expiresAt
					bigint, // totalAmount
					bigint, // claimedAmount
					`0x${string}`, // merkleRoot
					string // description
				][];

				return dropsResponse.map(res => {
					const [token, startsAt, expiresAt, totalAmount, claimedAmount, merkleRoot, description] = res;
					return {token, startsAt, expiresAt, totalAmount, claimedAmount, merkleRoot, description};
				});
			} catch (e) {
				console.error(e);
				return [];
			}
		})();

		// claims w/ proofs fetched from github/self ... tbc
		const claims = await Promise.all(
			dropsResponse.map(res =>
				fetch(`http://localhost:3000/proofs/${res.merkleRoot}.json`).then(res => res.json())
			)
		);

		return dropsResponse.map((drop, i) => ({
			root: drop.merkleRoot,
			claims: claims[i] as any,
			info: drop
		}));
	}

	public async getUserAirdrops(account: `0x${string}`): Promise<
		{
			amount: bigint;
			proof: string[];
			info: Omit<Drop, 'token'> & {token: {symbol: string; decimals: number; name: string}};
			hasClaimed: boolean;
		}[]
	> {
		const drops = await this.getMerkleProofs(account);
		const userDrops = await Promise.all(
			drops.map(async drop => {
				const amount = this.getUserAmount(drop.claims, account);
				const proof = this.getUserProof(account, drop.claims);
				const tokenDetails = await this.getTokenDetails([drop.info.token]);
				return {
					amount,
					proof,
					hasClaimed: false,
					info: {
						...drop.info,
						startsAt: drop.info.startsAt * 1000,
						expiresAt: drop.info.expiresAt * 1000,
						token: tokenDetails?.[drop.info.token]
					}
				};
			})
		);
		return userDrops;
	}

	private async getTokenDetails(
		addresses: `0x${string}`[]
	): Promise<Record<`0x${string}`, {symbol: string; decimals: number; name: string}>> {
		const readContractsWantContracts = addresses
			.map(address => [
				{address, abi: erc20Abi, functionName: 'symbol'},
				{address, abi: erc20Abi, functionName: 'decimals'},
				{address, abi: erc20Abi, functionName: 'name'}
			])
			.flat();

		const readContractsWantResult = await readContracts(this.wagmiConfig, {
			contracts: readContractsWantContracts
		}).then(res => res.map(r => r.result));

		// symbol, decimals, name
		const results = _.chunk(readContractsWantResult, 3);

		const wantTokens = _.chain(results || [])
			.map(([symbol, decimals, name], i) => [
				addresses[i as number],
				{
					address: addresses[i as number],
					symbol: symbol as string,
					decimals: decimals as number,
					name: name as string
				}
			])
			.fromPairs()
			.value();

		return wantTokens;
	}

	private async fetchClaimStatuses(acc: `0x${string}`, dropCount: number): Promise<Record<string, boolean>> {
		const drops = Array.from({length: Number(dropCount)}, (_, i) => i);
		const claimedDrops: Record<string, boolean> = {};
		try {
			const hasClaimed = await readContracts(this.wagmiConfig, {
				contracts: drops.map(dropId => ({
					address: ENV.yLockerDrops,
					abi: YLockerDrops,
					args: [acc, dropId],
					functionName: 'hasClaimed' as ContractFunctionName<typeof YLockerDrops, 'view'>
				}))
			});
			hasClaimed.forEach((r, i) => {
				claimedDrops[drops[i].toString()] = (r.result || false) as boolean;
			});
			return claimedDrops;
		} catch (e) {
			console.error(e);
			return {};
		}
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

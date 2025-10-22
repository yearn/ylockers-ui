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

	public async getUserAirdrops(account?: `0x${string}`): Promise<
		{
			dropId: string;
			amount: bigint;
			proof: string[];
			index: number;
			info: Omit<Drop, 'token'> & {token: {symbol: string; decimals: number; name: string}};
			hasClaimed: boolean;
		}[]
	> {
		if (!account) return [];
		const drops = await this.getMerkleProofs(account);
		const userDrops = await Promise.all(
			drops.map(async drop => {
				const {amount, proof, index} = drop.claims[account];
				const tokenDetails = await this.getTokenDetails([drop.info.token]);
				return {
					amount,
					proof,
					index,
					dropId: drop.info.dropId,
					hasClaimed: drop.info.hasClaimed,
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

	private async getMerkleProofs(acc: `0x${string}`): Promise<
		{
			root: `0x${string}`;
			claims: Record<`0x${string}`, Claim>;
			info: Drop & {dropId: string; hasClaimed: boolean};
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
		const dropIds = Object.keys(claimStatuses);

		const dropsResponse = await (async () => {
			try {
				// Fetch drop info for available claims
				const contracts = dropIds.map(epoch => ({
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
					number, // ------ startsAt
					number, // ------ expiresAt
					bigint, // ------ totalAmount
					bigint, // ------ claimedAmount
					`0x${string}`, // merkleRoot
					string // ------- description
				][];

				return dropsResponse.map((res, index) => {
					const [token, startsAt, expiresAt, totalAmount, claimedAmount, merkleRoot, description] = res;
					const dropId = dropIds[index];
					return {
						token,
						startsAt,
						expiresAt,
						totalAmount,
						claimedAmount,
						merkleRoot,
						description,
						dropId,
						hasClaimed: claimStatuses[dropId]
					};
				});
			} catch (e) {
				console.error(e);
				return [];
			}
		})();

		// claims w/ proofs fetched from github/self ... tbc
		const merkles = await Promise.all(
			dropsResponse.map(
				res =>
					fetch(`./proofs/${res.merkleRoot}.json`).then(res => res.json()) as Promise<
						Record<'claims', Record<`0x${string}`, Claim>>
					>
			)
		);

		return dropsResponse.map((drop, i) => ({
			root: drop.merkleRoot,
			claims: merkles[i].claims,
			info: drop
		}));
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
}

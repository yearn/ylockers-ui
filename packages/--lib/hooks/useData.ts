import {z} from 'zod';
import {useSuspenseQuery} from '@tanstack/react-query';
import {erc20Abi, parseUnits, zeroAddress} from 'viem';
import {useAccount, useConfig} from 'wagmi';
import {readContractsQueryOptions} from 'wagmi/query';
import {EvmAddress, HexStringSchema} from '../tools/types';
import abis from '../abis';
import usePrices from '../hooks/usePrices';
import {priced} from '../tools/bmath';
import {useCallback, useMemo} from 'react';
import {TEnv} from '../tools/envType';

const BalanceSchema = z.object({
	address: HexStringSchema.default(zeroAddress),
	amount: z.bigint().default(0n)
});

export const TokenSchema = z.object({
	address: HexStringSchema.default(zeroAddress),
	symbol: z.string().default(''),
	decimals: z.number().default(0),
	balance: z.bigint().default(0n),
	allowances: BalanceSchema.array().default([])
});

export const DataSchema = z.object({
	account: HexStringSchema.default(zeroAddress),
	asset: TokenSchema.default({}),
	locker: TokenSchema.default({}),

	staker: z
		.object({
			address: HexStringSchema.default(zeroAddress),
			symbol: z.string().default(''),
			decimals: z.number().default(0),
			balance: z.bigint().default(0n),
			totalSupply: z.bigint().default(0n),
			averageApr: z.number().default(0),
			accountApr: z.number().default(0)
		})
		.default({}),

	rewards: z
		.object({
			address: HexStringSchema.default(zeroAddress),
			decimals: z.number().default(0),
			claimable: z.bigint().default(0n),
			claimableUsd: z.number().default(0),
			vaultBalance: z.bigint().default(0n),
			vaultBalanceUsd: z.number().default(0)
		})
		.default({}),

	strategy: z
		.object({
			address: HexStringSchema.default(zeroAddress),
			symbol: z.string().default(''),
			decimals: z.number({coerce: true}).default(0),
			balance: z.bigint().default(0n),
			allowances: BalanceSchema.array().default([]),
			totalAssets: z.bigint().default(0n),
			pricePerShare: z.bigint().default(0n)
		})
		.default({}),

	utilities: z
		.object({
			globalAverageApr: z.bigint({coerce: true}).default(0n),
			globalProjectedApr: z.bigint({coerce: true}).default(0n),
			globalAverageBoostMultiplier: z.bigint({coerce: true}).default(0n),
			globalMinMaxActiveApr: z
				.object({
					min: z.bigint({coerce: true}).default(0n),
					max: z.bigint({coerce: true}).default(0n)
				})
				.default({}),
			globalMinMaxProjectedApr: z
				.object({
					min: z.bigint({coerce: true}).default(0n),
					max: z.bigint({coerce: true}).default(0n)
				})
				.default({}),
			userActiveApr: z.bigint({coerce: true}).default(0n),
			userProjectedApr: z.bigint({coerce: true}).default(0n),
			weeklyRewardAmount: z.bigint({coerce: true}).default(0n),
			userProjectedBoostMultiplier: z.bigint({coerce: true}).default(0n),
			userActiveBoostMultiplier: z.bigint({coerce: true}).default(0n),
			vaultAPR: z.bigint({coerce: true}).default(0n)
		})
		.default({})
});

type MarkedUpMulticall = {
	index: number;
	key: string;
	address: EvmAddress;
	abi: any;
	functionName: string;
	optional?: boolean;
};

export default function useData(yDaemon: string, env: TEnv) {
	const account = useAccount();

	const {
		data: prices,
		mutate: refetchPrices,
		isLoading: pricesIsLoading,
		error: pricesError
	} = usePrices(yDaemon, env, [env.baseToken, env.lockerToken, env.stableTokenVault, env.stableToken]);

	const config = useConfig();
	const multicallAddress =
		config.chains[0].contracts?.multicall3?.address || '0xcA11bde05977b3631167028862bE2a173976CA11';

	const contracts = useMemo<MarkedUpMulticall[]>(
		() => [
			{index: 0, key: 'asset.symbol', address: env.baseToken, abi: erc20Abi, functionName: 'symbol'},
			{index: 1, key: 'asset.decimals', address: env.baseToken, abi: erc20Abi, functionName: 'decimals'},
			{
				index: 2,
				key: 'asset.balance',
				address: env.baseToken,
				abi: erc20Abi,
				functionName: 'balanceOf',
				args: [account.address ?? zeroAddress]
			},
			{
				index: 3,
				key: 'asset.allowance.vault',
				address: env.baseToken,
				abi: erc20Abi,
				functionName: 'allowance',
				args: [account.address ?? zeroAddress, env.lockerToken]
			},

			{index: 4, key: 'locker.symbol', address: env.lockerToken, abi: erc20Abi, functionName: 'symbol'},
			{index: 5, key: 'locker.decimals', address: env.lockerToken, abi: erc20Abi, functionName: 'decimals'},
			{
				index: 6,
				key: 'locker.balance',
				address: env.lockerToken,
				abi: erc20Abi,
				functionName: 'balanceOf',
				args: [account.address ?? zeroAddress]
			},
			{
				index: 7,
				key: 'locker.allowance.ybs',
				address: env.lockerToken,
				abi: erc20Abi,
				functionName: 'allowance',
				args: [account.address ?? zeroAddress, env.boostedStaker]
			},
			{
				index: 8,
				key: 'locker.allowance.vault',
				address: env.lockerToken,
				abi: erc20Abi,
				functionName: 'allowance',
				args: [account.address ?? zeroAddress, env.lockerTokenVault]
			},

			{
				index: 9,
				key: 'staker.decimals',
				address: env.boostedStaker,
				abi: abis.YearnBoostedStaker,
				functionName: 'decimals'
			},
			{
				index: 10,
				key: 'staker.balance',
				address: env.boostedStaker,
				abi: abis.YearnBoostedStaker,
				functionName: 'balanceOf',
				args: [account.address ?? zeroAddress]
			},
			{
				index: 11,
				key: 'staker.totalSupply',
				address: env.boostedStaker,
				abi: abis.YearnBoostedStaker,
				functionName: 'totalSupply'
			},

			{
				index: 12,
				key: 'rewards.decimals',
				address: env.stableTokenVault,
				abi: erc20Abi,
				functionName: 'decimals'
			},
			{
				index: 13,
				key: 'rewards.claimable',
				address: env.rewardsDistributor,
				abi: abis.SingleTokenRewardDistributor,
				functionName: 'getClaimable',
				args: [account.address ?? zeroAddress]
			},

			{index: 14, key: 'vault.symbol', address: env.lockerTokenVault, abi: erc20Abi, functionName: 'symbol'},
			{index: 15, key: 'vault.decimals', address: env.lockerTokenVault, abi: erc20Abi, functionName: 'decimals'},
			{
				index: 16,
				key: 'vault.balance',
				address: env.lockerTokenVault,
				abi: erc20Abi,
				functionName: 'balanceOf',
				args: [account.address ?? zeroAddress]
			},

			{
				index: 17,
				key: 'utilities.getUserActiveBoostMultiplier',
				address: env.boostedStakerUtilities,
				abi: abis.Utilities,
				functionName: 'getUserActiveBoostMultiplier',
				args: [account.address ?? zeroAddress]
			},
			{
				index: 18,
				key: 'utilities.globalAverageBoostMultiplier',
				address: env.boostedStakerUtilities,
				abi: abis.Utilities,
				functionName: 'getGlobalActiveBoostMultiplier'
			},
			{
				index: 19,
				key: 'utilities.globalAverageApr',
				address: env.boostedStakerUtilities,
				abi: abis.Utilities,
				functionName: 'getGlobalActiveApr',
				args: [
					parseUnits((prices?.[env.lockerToken] ?? 0).toString(), 18).toString(),
					parseUnits((prices?.[env.stableTokenVault] ?? 0).toString(), 18).toString()
				]
			},

			{
				index: 20,
				key: 'utilities.getGlobalMinMaxActiveApr',
				address: env.boostedStakerUtilities,
				abi: abis.Utilities,
				functionName: 'getGlobalMinMaxActiveApr',
				args: [
					parseUnits((prices?.[env.lockerToken] ?? 0).toString(), 18).toString(),
					parseUnits((prices?.[env.stableTokenVault] ?? 0).toString(), 18).toString()
				]
			},

			{
				index: 21,
				key: 'utilities.getGlobalMinMaxProjectedApr',
				address: env.boostedStakerUtilities,
				abi: abis.Utilities,
				functionName: 'getGlobalMinMaxProjectedApr',
				args: [
					parseUnits((prices?.[env.lockerToken] ?? 0).toString(), 18).toString(),
					parseUnits((prices?.[env.stableTokenVault] ?? 0).toString(), 18).toString()
				]
			},

			{
				index: 22,
				key: 'utilities.getUserActiveApr',
				address: env.boostedStakerUtilities,
				abi: abis.Utilities,
				functionName: 'getUserActiveApr',
				args: [
					account.address || zeroAddress,
					parseUnits((prices?.[env.lockerToken] ?? 0).toString(), 18).toString(),
					parseUnits((prices?.[env.stableTokenVault] ?? 0).toString(), 18).toString()
				]
			},

			{
				index: 23,
				key: 'utilities.activeRewardAmount',
				address: env.boostedStakerUtilities,
				abi: abis.Utilities,
				functionName: 'activeRewardAmount'
			},
			{
				index: 24,
				key: 'utilities.getUserProjectedBoostMultiplier',
				address: env.boostedStakerUtilities,
				abi: abis.Utilities,
				functionName: 'getUserProjectedBoostMultiplier',
				args: [account.address ?? zeroAddress]
			},

			{
				index: 25,
				key: 'vault.totalAssets',
				address: env.lockerTokenVault,
				abi: abis.VaultV3,
				functionName: 'totalAssets'
			},
			{
				index: 26,
				key: 'stableVault.balance',
				address: env.stableTokenVault,
				abi: erc20Abi,
				functionName: 'balanceOf',
				args: [account.address || zeroAddress]
			},
			{
				index: 27,
				key: 'vault.pps',
				address: env.lockerTokenVault,
				abi: abis.VaultV3,
				functionName: 'pricePerShare'
			},

			{
				index: 28,
				key: 'utilities.getGlobalProjectedApr',
				address: env.boostedStakerUtilities,
				abi: abis.Utilities,
				functionName: 'getGlobalProjectedApr',
				args: [
					parseUnits((prices?.[env.lockerToken] ?? 0).toString(), 18).toString(),
					parseUnits((prices?.[env.stableTokenVault] ?? 0).toString(), 18).toString()
				]
			},

			{
				index: 29,
				key: 'utilities.getUserActiveAprWithFee',
				address: env.boostedStakerUtilities,
				abi: abis.Utilities,
				functionName: 'getUserActiveAprWithFee',
				args: [
					env.lockerTokenVaultStrategy,
					parseUnits((prices?.[env.lockerToken] ?? 0).toString(), 18).toString(),
					parseUnits((prices?.[env.stableTokenVault] ?? 0).toString(), 18).toString()
				],
				optional: true
			},

			{
				index: 30,
				key: 'utilities.getUserProjectedApr',
				address: env.boostedStakerUtilities,
				abi: abis.Utilities,
				functionName: 'getUserProjectedApr',
				args: [
					account.address || zeroAddress,
					parseUnits((prices?.[env.lockerToken] ?? 0).toString(), 18).toString(),
					parseUnits((prices?.[env.stableTokenVault] ?? 0).toString(), 18).toString()
				]
			}
		],
		[
			account.address,
			env.baseToken,
			env.boostedStaker,
			env.boostedStakerUtilities,
			env.lockerToken,
			env.lockerTokenVault,
			env.lockerTokenVaultStrategy,
			env.rewardsDistributor,
			env.stableTokenVault,
			prices
		]
	);

	const multicall = useSuspenseQuery(readContractsQueryOptions(config, {contracts, multicallAddress}));

	const get = useCallback(
		<T = any>(key: string): T => {
			const result = contracts.find(c => c.key === key);
			if (result === undefined) throw new Error(`Key not found, ${key}`);
			return multicall.data?.[result.index]?.result as T;
		},
		[contracts, multicall]
	);

	const refetch = useCallback(() => {
		refetchPrices();
		multicall.refetch();
	}, [refetchPrices, multicall]);

	const isLoading = multicall.isLoading || pricesIsLoading;
	const isSuccess = multicall.isSuccess && !pricesError;
	const isMulticallError = contracts.some(c => multicall.data?.[c.index]?.error && !c.optional);
	const isError = isMulticallError || pricesError;
	const fallback = {
		...multicall,
		prices,
		pricesError,
		refetch,
		isLoading,
		isSuccess,
		isError,
		data: DataSchema.parse({})
	};

	if (isLoading) {
		return fallback;
	}

	if (isMulticallError) {
		console.error('multicall', multicall);
		return fallback;
	}

	if (pricesError) {
		console.error(pricesError);
		return fallback;
	}

	return {
		...multicall,
		prices,
		pricesError,
		refetch,
		isLoading,
		isSuccess,
		isError,
		data: DataSchema.parse({
			account: account.address || zeroAddress,

			asset: {
				address: env.baseToken,
				symbol: get<string>('asset.symbol'),
				decimals: get<number>('asset.decimals'),
				balance: get<bigint>('asset.balance'),
				allowances: [{address: env.lockerToken, amount: get<bigint>('asset.allowance.vault')}]
			},

			locker: {
				address: env.lockerToken,
				symbol: get<string>('locker.symbol'),
				decimals: get<number>('locker.decimals'),
				balance: get<bigint>('locker.balance'),
				allowances: [
					{address: env.boostedStaker, amount: get<bigint>('locker.allowance.ybs')},
					{address: env.lockerTokenVault, amount: get<bigint>('locker.allowance.vault')}
				]
			},

			staker: {
				address: env.boostedStaker,
				symbol: `Staked ${env.lockerTokenName}`,
				decimals: get<number>('staker.decimals'),
				balance: get<bigint>('staker.balance'),
				totalSupply: get<bigint>('staker.totalSupply')
			},

			rewards: {
				address: env.rewardsDistributor,
				decimals: get<number>('rewards.decimals'),
				claimable: get<bigint>('rewards.claimable'),
				claimableUsd: priced(
					get<bigint>('rewards.claimable'),
					get<number>('rewards.decimals'),
					prices[env.stableTokenVault]
				),
				vaultBalance: get<bigint>('stableVault.balance'),
				vaultBalanceUsd: priced(
					get<bigint>('stableVault.balance'),
					get<number>('rewards.decimals'),
					prices[env.stableTokenVault]
				)
			},

			strategy: {
				address: env.lockerTokenVault,
				symbol: get<string>('vault.symbol'),
				decimals: get<number>('vault.decimals'),
				balance: get<bigint>('vault.balance'),
				allowances: [],
				totalAssets: get<bigint>('vault.totalAssets'),
				pricePerShare: get<bigint>('vault.pps')
			},

			utilities: {
				globalAverageApr: get<bigint>('utilities.globalAverageApr'),
				globalProjectedApr: get<bigint>('utilities.getGlobalProjectedApr'),
				globalAverageBoostMultiplier: get<bigint>('utilities.globalAverageBoostMultiplier'),
				globalMinMaxActiveApr: {
					min: get<bigint[]>('utilities.getGlobalMinMaxActiveApr')[0],
					max: get<bigint[]>('utilities.getGlobalMinMaxActiveApr')[1]
				},
				globalMinMaxProjectedApr: {
					min: get<bigint[]>('utilities.getGlobalMinMaxProjectedApr')[0],
					max: get<bigint[]>('utilities.getGlobalMinMaxProjectedApr')[1]
				},
				userActiveApr: get<bigint>('utilities.getUserActiveApr'),
				userProjectedApr: get<bigint>('utilities.getUserProjectedApr'),
				weeklyRewardAmount: get<bigint>('utilities.activeRewardAmount'),
				userProjectedBoostMultiplier: get<bigint>('utilities.getUserProjectedBoostMultiplier'),
				userActiveBoostMultiplier: get<bigint>('utilities.getUserActiveBoostMultiplier'),
				vaultAPR: get<bigint>('utilities.getUserActiveAprWithFee')
			}
		})
	};
}

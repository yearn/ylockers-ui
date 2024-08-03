import { z } from 'zod'
import env from '../tools/env'
import { useSuspenseQuery } from '@tanstack/react-query'
import { erc20Abi, parseUnits, zeroAddress } from 'viem'
import { useAccount, useConfig } from 'wagmi'
import { readContractsQueryOptions } from 'wagmi/query'
import { EvmAddress, HexStringSchema } from '../tools/types'
import abis from '../abis'
import usePrices from '../hooks/usePrices'
import { priced } from '../tools/bmath'
import { useCallback, useMemo } from 'react'

const BalanceSchema = z.object({
  address: HexStringSchema.default(zeroAddress),
  amount: z.bigint().default(0n)
})

export const TokenSchema = z.object({
  address: HexStringSchema.default(zeroAddress),
  symbol: z.string().default(''),
  decimals: z.number().default(0),
  balance: z.bigint().default(0n),
  allowances: BalanceSchema.array().default([])
})

export const DataSchema = z.object({
  account: HexStringSchema.default(zeroAddress),
  asset: TokenSchema.default({}),
  locker: TokenSchema.default({}),

  staker: z.object({
    address: HexStringSchema.default(zeroAddress),
    symbol: z.string().default(''),
    decimals: z.number().default(0),
    balance: z.bigint().default(0n),
    totalSupply: z.bigint().default(0n),
    averageApr: z.number().default(0),
    accountApr: z.number().default(0)
  }).default({}),

  rewards: z.object({
    address: HexStringSchema.default(zeroAddress),
    decimals: z.number().default(0),
    claimable: z.bigint().default(0n),
    claimableUsd: z.number().default(0),
    vaultBalance: z.bigint().default(0n),
    vaultBalanceUsd: z.number().default(0)
  }).default({}),

  strategy: z.object({
    address: HexStringSchema.default(zeroAddress),
    symbol: z.string().default(''),
    decimals: z.number({ coerce: true }).default(0),
    balance: z.bigint().default(0n),
    allowances: BalanceSchema.array().default([]),
    totalAssets: z.bigint().default(0n),
    pricePerShare: z.bigint().default(0n)
  }).default({}),

  utilities: z.object({
    globalAverageApr: z.bigint({ coerce: true }).default(0n),
    globalProjectedApr: z.bigint({ coerce: true }).default(0n),
    globalAverageBoostMultiplier: z.bigint({ coerce: true }).default(0n),
    globalMinMaxActiveApr: z.object({
      min: z.bigint({ coerce: true }).default(0n),
      max: z.bigint({ coerce: true }).default(0n)
    }).default({}),
    globalMinMaxProjectedApr: z.object({
      min: z.bigint({ coerce: true }).default(0n),
      max: z.bigint({ coerce: true }).default(0n)
    }).default({}),
    userActiveApr: z.bigint({ coerce: true }).default(0n),
    userProjectedApr: z.bigint({ coerce: true }).default(0n),
    weeklyRewardAmount: z.bigint({ coerce: true }).default(0n),
    userProjectedBoostMultiplier: z.bigint({ coerce: true }).default(0n),
    userActiveBoostMultiplier: z.bigint({ coerce: true }).default(0n),
    oldStakerBalance: z.bigint({ coerce: true }).default(0n),
    vaultAPR: z.bigint({ coerce: true }).default(0n)
  }).default({})
})

type MarkedUpMulticall = {
  index: number
  key: string
  address: EvmAddress
  abi: any
  functionName: string
  optional?: boolean
}

export default function useData() {
  const account = useAccount()

  const { data: prices, mutate: refetchPrices, isLoading: pricesIsLoading, error: pricesError } = usePrices([
    env.PRISMA, env.YPRISMA, env.YVMKUSD, env.MKUSD
  ])

  const config = useConfig()
  const multicallAddress = config.chains[0].contracts?.multicall3?.address || '0xcA11bde05977b3631167028862bE2a173976CA11'

  const contracts = useMemo<MarkedUpMulticall[]>(() => [
    { index: 0, key: 'asset.symbol', address: env.PRISMA, abi: erc20Abi, functionName: 'symbol' },
    { index: 1, key: 'asset.decimals', address: env.PRISMA, abi: erc20Abi, functionName: 'decimals' },
    { 
      index: 2, key: 'asset.balance', address: env.PRISMA, abi: erc20Abi, 
      functionName: 'balanceOf', args: [account.address ?? zeroAddress] 
    },
    { index: 3, key: 'asset.allowance.vault', address: env.PRISMA, abi: erc20Abi, 
      functionName: 'allowance', args: [account.address ?? zeroAddress, env.YPRISMA] 
    },

    { index: 4, key: 'locker.symbol', address: env.YPRISMA, abi: erc20Abi, functionName: 'symbol' },
    { index: 5, key: 'locker.decimals', address: env.YPRISMA, abi: erc20Abi, functionName: 'decimals' },
    { 
      index: 6, key: 'locker.balance', address: env.YPRISMA, abi: erc20Abi, 
      functionName: 'balanceOf', args: [account.address ?? zeroAddress] 
    },
    { 
      index: 7, key: 'locker.allowance.ybs', address: env.YPRISMA, abi: erc20Abi, 
      functionName: 'allowance', args: [account.address ?? zeroAddress, env.YPRISMA_BOOSTED_STAKER] 
    },
    { 
      index: 8, key: 'locker.allowance.vault', address: env.YPRISMA, abi: erc20Abi, 
      functionName: 'allowance', args: [account.address ?? zeroAddress, env.YPRISMA_STRATEGY] 
    },

    { index: 9, key: 'staker.decimals', address: env.YPRISMA_BOOSTED_STAKER, abi: abis.YearnBoostedStaker, functionName: 'decimals' },
    {
      index: 10, key: 'staker.balance', address: env.YPRISMA_BOOSTED_STAKER, abi: abis.YearnBoostedStaker, 
      functionName: 'balanceOf', args: [account.address ?? zeroAddress] 
    },
    { index: 11, key: 'staker.totalSupply', address: env.YPRISMA_BOOSTED_STAKER, abi: abis.YearnBoostedStaker, functionName: 'totalSupply' },

    { index: 12, key: 'rewards.decimals', address: env.YVMKUSD, abi: erc20Abi, functionName: 'decimals' },
    {
      index: 13, key: 'rewards.claimable', address: env.YPRISMA_REWARDS_DISTRIBUTOR, abi: abis.SingleTokenRewardDistributor, 
      functionName: 'getClaimable', args: [account.address ?? zeroAddress]
    },

    { index: 14, key: 'vault.symbol', address: env.YPRISMA_STRATEGY, abi: abis.Vault, functionName: 'symbol' },
    { index: 15, key: 'vault.decimals', address: env.YPRISMA_STRATEGY, abi: abis.Vault, functionName: 'decimals' },
    {
      index: 16, key: 'vault.balance', address: env.YPRISMA_STRATEGY, abi: abis.Vault, 
      functionName: 'balanceOf', args: [account.address ?? zeroAddress]
    },

    {
      index: 17, key: 'utilities.getUserActiveBoostMultiplier', address: env.YPRISMA_BOOSTED_STAKER_UTILITIES, abi: abis.Utilities,
      functionName: 'getUserActiveBoostMultiplier', args: [account.address ?? zeroAddress]
    },
    {
      index: 18, key: 'utilities.globalAverageBoostMultiplier', address: env.YPRISMA_BOOSTED_STAKER_UTILITIES, abi: abis.Utilities,
      functionName: 'getGlobalActiveBoostMultiplier'
    },
    {
      index: 19, key: 'utilities.globalAverageApr', address: env.YPRISMA_BOOSTED_STAKER_UTILITIES, abi: abis.Utilities, 
      functionName: 'getGlobalActiveApr', args: [
        parseUnits((prices?.[env.YPRISMA] ?? 0).toString(), 18).toString(),
        parseUnits((prices?.[env.YVMKUSD] ?? 0).toString(), 18).toString()
      ] 
    },

    { index: 20, key: 'utilities.getGlobalMinMaxActiveApr', address: env.YPRISMA_BOOSTED_STAKER_UTILITIES,
      abi: abis.Utilities, functionName: 'getGlobalMinMaxActiveApr', 
      args: [
        parseUnits((prices?.[env.YPRISMA] ?? 0).toString(), 18).toString(),
        parseUnits((prices?.[env.YVMKUSD] ?? 0).toString(), 18).toString()
      ]
    },

    { index: 21, key: 'utilities.getGlobalMinMaxProjectedApr', address: env.YPRISMA_BOOSTED_STAKER_UTILITIES,
      abi: abis.Utilities, functionName: 'getGlobalMinMaxProjectedApr', 
      args: [
        parseUnits((prices?.[env.YPRISMA] ?? 0).toString(), 18).toString(),
        parseUnits((prices?.[env.YVMKUSD] ?? 0).toString(), 18).toString()
      ]
    },

    { index: 22, key: 'utilities.getUserActiveApr', address: env.YPRISMA_BOOSTED_STAKER_UTILITIES, 
      abi: abis.Utilities, functionName: 'getUserActiveApr', 
      args: [
        account.address || zeroAddress, 
        parseUnits((prices?.[env.YPRISMA] ?? 0).toString(), 18).toString(),
        parseUnits((prices?.[env.YVMKUSD] ?? 0).toString(), 18).toString()
      ] 
    },

    { index: 23, key: 'utilities.activeRewardAmount', address: env.YPRISMA_BOOSTED_STAKER_UTILITIES, abi: abis.Utilities, functionName: 'activeRewardAmount' },
    {
      index: 24, key: 'utilities.getUserProjectedBoostMultiplier', address: env.YPRISMA_BOOSTED_STAKER_UTILITIES, abi: abis.Utilities, 
      functionName: 'getUserProjectedBoostMultiplier', args: [account.address ?? zeroAddress]
    },
    {
      index: 25, key: 'oldstaker.balance', address: env.YPRISMA_OLD_STAKER, abi: abis.OldStaker, 
      functionName: 'balanceOf', args: [account.address || zeroAddress]
    },

    { index: 26, key: 'vault.totalAssets', address: env.YPRISMA_STRATEGY, abi: abis.Vault, functionName: 'totalAssets' },
    { index: 27, key: 'stableVault.balance', address: env.YVMKUSD, abi: erc20Abi, functionName: 'balanceOf', args: [account.address || zeroAddress] },
    { index: 28, key: 'vault.pps', address: env.YPRISMA_STRATEGY, abi: abis.Vault, functionName: 'pricePerShare' },

    { 
      index: 29, key: 'utilities.getGlobalProjectedApr', address: env.YPRISMA_BOOSTED_STAKER_UTILITIES,
      abi: abis.Utilities, functionName: 'getGlobalProjectedApr',
      args: [
        parseUnits((prices?.[env.YPRISMA] ?? 0).toString(), 18).toString(),
        parseUnits((prices?.[env.YVMKUSD] ?? 0).toString(), 18).toString()
      ]
    },

    { 
      index: 30, key: 'utilties.getUserActiveAprWithFee', address: env.YPRISMA_BOOSTED_STAKER_UTILITIES, 
      abi: abis.Utilities, functionName: 'getUserActiveAprWithFee', 
      args: [
        env.YPRISMA_STRATEGY_STRATEGY,
        parseUnits((prices?.[env.YPRISMA] ?? 0).toString(), 18).toString(),
        parseUnits((prices?.[env.YVMKUSD] ?? 0).toString(), 18).toString()
      ],
      optional: true
    },

    { index: 31, key: 'utilities.getUserProjectedApr', address: env.YPRISMA_BOOSTED_STAKER_UTILITIES, 
      abi: abis.Utilities, functionName: 'getUserProjectedApr', 
      args: [
        account.address || zeroAddress, 
        parseUnits((prices?.[env.YPRISMA] ?? 0).toString(), 18).toString(),
        parseUnits((prices?.[env.YVMKUSD] ?? 0).toString(), 18).toString()
      ] 
    },

  ], [account])

  const multicall = useSuspenseQuery(
    readContractsQueryOptions(config, { contracts, multicallAddress })
  )

  const get = useCallback(<T = any>(key: string): T => {
    const result = contracts.find(c => c.key === key)
    if (result === undefined) throw new Error(`Key not found, ${key}`)
    return multicall.data?.[result.index]?.result as T
  }, [contracts, multicall])

  const refetch = useCallback(() => {
    refetchPrices()
    multicall.refetch()
  }, [refetchPrices, multicall])

  const isLoading = multicall.isLoading || pricesIsLoading
  const isSuccess = multicall.isSuccess && !pricesError
  const isMulticallError = contracts.some(c => multicall.data?.[c.index]?.error && !c.optional)
  const isError = isMulticallError || pricesError
  const fallback = { ...multicall, prices, pricesError, refetch, isLoading, isSuccess, isError, data: DataSchema.parse({}) }

  if (isLoading) {
    return fallback
  }

  if (isMulticallError) {
    console.error('multicall', multicall)
    return fallback
  }

  if (pricesError) {
    console.error(pricesError)
    return fallback
  }

  return { ...multicall, prices, pricesError, refetch, isLoading, isSuccess, isError, data: DataSchema.parse({
    account: account.address || zeroAddress,

    asset: {
      address: env.PRISMA,
      symbol: get<string>('asset.symbol'),
      decimals: get<number>('asset.decimals'),
      balance: get<bigint>('asset.balance'),
      allowances: [
        { address: env.YPRISMA, amount: get<bigint>('asset.allowance.vault') }
      ]
    },

    locker: {
      address: env.YPRISMA,
      symbol: get<string>('locker.symbol'),
      decimals: get<number>('locker.decimals'),
      balance: get<bigint>('locker.balance'),
      allowances: [
        { address: env.YPRISMA_BOOSTED_STAKER, amount: get<bigint>('locker.allowance.ybs') },
        { address: env.YPRISMA_STRATEGY, amount: get<bigint>('locker.allowance.vault') }
      ]
    },

    staker: {
      address: env.YPRISMA_BOOSTED_STAKER,
      symbol: `Staked ${env.LOCKER_NAME}`,
      decimals: get<number>('staker.decimals'),
      balance: get<bigint>('staker.balance'),
      totalSupply: get<bigint>('staker.totalSupply')
    },

    rewards: {
      address: env.YPRISMA_REWARDS_DISTRIBUTOR,
      decimals: get<number>('rewards.decimals'),
      claimable: get<bigint>('rewards.claimable'),
      claimableUsd: priced(
        get<bigint>('rewards.claimable'),
        get<number>('rewards.decimals'),
        prices[env.YVMKUSD]
      ),
      vaultBalance: get<bigint>('stableVault.balance'),
      vaultBalanceUsd: priced(
        get<bigint>('stableVault.balance'),
        get<number>('rewards.decimals'),
        prices[env.YVMKUSD]
      )
    },

    strategy: {
      address: env.YPRISMA_STRATEGY,
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
      oldStakerBalance: get<bigint>('oldstaker.balance'),
      vaultAPR: get<bigint>('utilties.getUserActiveAprWithFee')
    },
  })}
}

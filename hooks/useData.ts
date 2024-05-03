import { z } from 'zod'
import env from '@/lib/env'
import { useSuspenseQuery } from '@tanstack/react-query'
import { erc20Abi, zeroAddress } from 'viem'
import { useAccount, useConfig } from 'wagmi'
import { readContractsQueryOptions } from 'wagmi/query'
import { zhexstringSchema } from '@/lib/types'
import abis from '@/app/abis'
import usePrices from './usePrices'
import bmath, { priced } from '@/lib/bmath'
import { useCallback } from 'react'

const BalanceSchema = z.object({
  address: zhexstringSchema.default(zeroAddress),
  amount: z.bigint().default(0n)
})

export const TokenSchema = z.object({
  address: zhexstringSchema.default(zeroAddress),
  symbol: z.string().default(''),
  decimals: z.number().default(0),
  balance: z.bigint().default(0n),
  allowances: BalanceSchema.array().default([])
})

export const DataSchema = z.object({
  account: zhexstringSchema.default(zeroAddress),
  asset: TokenSchema.default({}),
  locker: TokenSchema.default({}),

  staker: z.object({
    address: zhexstringSchema.default(zeroAddress),
    symbol: z.string().default(''),
    decimals: z.number().default(0),
    balance: z.bigint().default(0n),
    totalSupply: z.bigint().default(0n),
    averageApr: z.number().default(0),
    accountApr: z.number().default(0)
  }).default({}),

  rewards: z.object({
    address: zhexstringSchema.default(zeroAddress),
    decimals: z.number().default(0),
    claimable: z.bigint().default(0n),
    claimableUsd: z.number().default(0)
  }).default({}),

  strategy: TokenSchema.default({}),

  utilities: z.object({
    globalAverageApr: z.bigint({ coerce: true }).default(0n),
    globalAverageBoostMultiplier: z.bigint({ coerce: true }).default(0n),
    globalMinMaxApr: z.object({
      min: z.bigint({ coerce: true }).default(0n),
      max: z.bigint({ coerce: true }).default(0n)
    }).default({}),
    userApr: z.bigint({ coerce: true }).default(0n),
    // userAprAt: z.bigint({ coerce: true }).default(0n),
    weeklyRewardAmount: z.bigint({ coerce: true }).default(0n),
    // weeklyRewardAmountAt: z.bigint({ coerce: true }).default(0n),
    // week: z.bigint({ coerce: true }).default(0n)
  }).default({})
})

export default function useData() {
  const account = useAccount()

  const { data: prices, mutate: refetchPrices, isLoading: pricesIsLoading, error: pricesError } = usePrices([
    env.PRISMA, env.YPRISMA, env.YVMKUSD
  ])

  console.log(prices)

  const config = useConfig()
  const multicallAddress = config.chains[0].contracts?.multicall3?.address || '0xcA11bde05977b3631167028862bE2a173976CA11'

  const multicall = useSuspenseQuery(
    readContractsQueryOptions(config, { contracts: [
      { address: env.PRISMA, abi: erc20Abi, functionName: 'symbol' },
      { address: env.PRISMA, abi: erc20Abi, functionName: 'decimals' },
      { address: env.PRISMA, abi: erc20Abi, functionName: 'balanceOf', args: [account.address || zeroAddress] },
      { address: env.PRISMA, abi: erc20Abi, functionName: 'allowance', args: [account.address || zeroAddress, env.YPRISMA] },

      { address: env.YPRISMA, abi: erc20Abi, functionName: 'symbol' },
      { address: env.YPRISMA, abi: erc20Abi, functionName: 'decimals' },
      { address: env.YPRISMA, abi: erc20Abi, functionName: 'balanceOf', args: [account.address || zeroAddress] },
      { address: env.YPRISMA, abi: erc20Abi, functionName: 'allowance', args: [account.address || zeroAddress, env.YPRISMA_BOOSTED_STAKER] },
      { address: env.YPRISMA, abi: erc20Abi, functionName: 'allowance', args: [account.address || zeroAddress, env.YPRISMA_STRATEGY] },

      { address: env.YPRISMA_BOOSTED_STAKER, abi: abis.YearnBoostedStaker, functionName: 'decimals' },
      { address: env.YPRISMA_BOOSTED_STAKER, abi: abis.YearnBoostedStaker, functionName: 'balanceOf', args: [account.address || zeroAddress] },
      { address: env.YPRISMA_BOOSTED_STAKER, abi: abis.YearnBoostedStaker, functionName: 'totalSupply' },

      { address: env.YVMKUSD, abi: erc20Abi, functionName: 'decimals' },
      { address: env.YPRISMA_REWARDS_DISTRIBUTOR, abi: abis.SingleTokenRewardDistributor, functionName: 'getClaimable', args: [account.address || zeroAddress] },

      { address: env.YPRISMA_STRATEGY, abi: abis.Strategy, functionName: 'symbol' },
      { address: env.YPRISMA_STRATEGY, abi: abis.Strategy, functionName: 'decimals' },
      { address: env.YPRISMA_STRATEGY, abi: abis.Strategy, functionName: 'balanceOf', args: [account.address || zeroAddress] },

      { address: env.YPRISMA_BOOSTED_STAKER_UTILITIES, abi: abis.Utilities, functionName: 'getUserBoostMultiplier', args: [account.address || zeroAddress] },
      { address: env.YPRISMA_BOOSTED_STAKER_UTILITIES, abi: abis.Utilities, functionName: 'getGlobalAverageBoostMultiplier' },
      { address: env.YPRISMA_BOOSTED_STAKER_UTILITIES, abi: abis.Utilities, functionName: 'getGlobalAverageApr', args: [bmath.mul(prices[env.YPRISMA], 10**18), bmath.mul(prices[env.MKUSD], 10**18)] },
      { address: env.YPRISMA_BOOSTED_STAKER_UTILITIES, abi: abis.Utilities, functionName: 'getGlobalMinMaxApr', args: [bmath.mul(prices[env.YPRISMA], 10**18), bmath.mul(prices[env.MKUSD], 10**18)] },
      { address: env.YPRISMA_BOOSTED_STAKER_UTILITIES, abi: abis.Utilities, functionName: 'getUserApr', args: [account.address || zeroAddress, bmath.mul(prices[env.YPRISMA], 10**18), bmath.mul(prices[env.MKUSD], 10**18)] },
      // { address: env.YPRISMA_BOOSTED_STAKER_UTILITIES, abi: abis.Utilities, functionName: 'getUserAprAt', args: [account.address || zeroAddress, 0, bmath.mul(prices[env.YPRISMA], 10**18), bmath.mul(prices[env.MKUSD], 10**18)] },
      { address: env.YPRISMA_BOOSTED_STAKER_UTILITIES, abi: abis.Utilities, functionName: 'weeklyRewardAmount' },
      // { address: env.YPRISMA_BOOSTED_STAKER_UTILITIES, abi: abis.Utilities, functionName: 'weeklyRewardAmountAt', args: [0] },
      // { address: env.YPRISMA_BOOSTED_STAKER_UTILITIES, abi: abis.Utilities, functionName: 'getWeek' },

    ], multicallAddress })
  )

  const refetch = useCallback(() => {
    refetchPrices()
    multicall.refetch()
  }, [refetchPrices, multicall])

  const isLoading = multicall.isLoading || pricesIsLoading
  const isSuccess = multicall.isSuccess && !pricesError
  const isError = multicall.data?.some(d => d.error) || pricesError
  const fallback = { ...multicall, prices, pricesError, refetch, isLoading, isSuccess, isError, data: DataSchema.parse({}) }

  if (isLoading) {
    return fallback
  }

  if (isError) {
    if (multicall.data?.some(d => d.error)) console.error(multicall.data?.find(d => d.error)?.error)
    if (pricesError) console.error(pricesError)
    return fallback
  }
  console.log(multicall.data)
  return { ...multicall, prices, pricesError, refetch, isLoading, isSuccess, isError, data: DataSchema.parse({
    account: account.address || zeroAddress,

    asset: {
      address: env.PRISMA,
      symbol: multicall.data?.[0]?.result,
      decimals: multicall.data?.[1]?.result,
      balance: multicall.data?.[2]?.result,
      allowances: [
        { address: env.YPRISMA, amount: multicall.data?.[3]?.result }
      ]
    },

    locker: {
      address: env.YPRISMA,
      symbol: multicall.data?.[4]?.result,
      decimals: multicall.data?.[5]?.result,
      balance: multicall.data?.[6]?.result,
      allowances: [
        { address: env.YPRISMA_BOOSTED_STAKER, amount: multicall.data?.[7]?.result },
        { address: env.YPRISMA_STRATEGY, amount: multicall.data?.[8]?.result }
      ]
    },

    staker: {
      address: env.YPRISMA_BOOSTED_STAKER,
      symbol: 'Staked yPRISMA',
      decimals: multicall.data?.[9]?.result,
      balance: multicall.data?.[10]?.result,
      totalSupply: multicall.data?.[11]?.result
    },

    rewards: {
      address: env.YPRISMA_REWARDS_DISTRIBUTOR,
      decimals: multicall.data?.[12]?.result,
      claimable: multicall.data?.[13]?.result,
      claimableUsd: priced(
        multicall.data?.[13]?.result!,
        multicall.data?.[12]?.result!,
        prices[env.YVMKUSD]
      )
    },

    strategy: {
      address: env.YPRISMA_STRATEGY,
      symbol: multicall.data?.[14]?.result,
      decimals: multicall.data?.[15]?.result,
      balance: multicall.data?.[16]?.result,
      allowances: []
    },

    utilities: {
      globalAverageApr: multicall.data?.[18]?.result,
      globalAverageBoostMultiplier: multicall.data?.[19]?.result,
      globalMinMaxApr: {
        min: (multicall.data?.[20]?.result as any[])[0],
        max: (multicall.data?.[20]?.result as any[])[1]
      },
      userApr: multicall.data?.[21]?.result,
      // userAprAt: multicall.data?.[21]?.result,
      weeklyRewardAmount: multicall.data?.[22]?.result,
      // weeklyRewardAmountAt: multicall.data?.[23]?.result,
      // week: multicall.data?.[24]?.result
    },
  })}
}

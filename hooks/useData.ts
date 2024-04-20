import { z } from 'zod'
import env from '@/lib/env'
import { useSuspenseQuery } from '@tanstack/react-query'
import { erc20Abi, zeroAddress } from 'viem'
import { useAccount, useConfig } from 'wagmi'
import { readContractsQueryOptions } from 'wagmi/query'
import { zhexstringSchema } from '@/lib/types'
import abis from '@/app/abis'
import usePrices from './usePrices'
import { priced } from '@/lib/bmath'
import { useCallback } from 'react'

export const TokenSchema = z.object({
  address: zhexstringSchema.default(zeroAddress),
  symbol: z.string().default(''),
  decimals: z.number().default(0),
  balance: z.bigint().default(0n),
  allowance: z.bigint().default(0n)
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
  }).default({})
})

export default function useData() {
  const account = useAccount()

  const { data: prices, mutate: refetchPrices, isLoading: pricesIsLoading, error: pricesError } = usePrices([
    env.PRISMA, env.YPRISMA, env.YVMKUSD
  ])

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

      { address: env.YPRISMA_BOOSTED_STAKER, abi: abis.YearnBoostedStaker, functionName: 'decimals' },
      { address: env.YPRISMA_BOOSTED_STAKER, abi: abis.YearnBoostedStaker, functionName: 'balanceOf', args: [account.address || zeroAddress] },
      { address: env.YPRISMA_BOOSTED_STAKER, abi: abis.YearnBoostedStaker, functionName: 'totalSupply' },

      { address: env.YVMKUSD, abi: erc20Abi, functionName: 'decimals' },
      { address: env.YPRISMA_REWARDS_DISTRIBUTOR, abi: abis.SingleTokenRewardDistributor, functionName: 'claimable', args: [account.address || zeroAddress] },
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

  return { ...multicall, prices, pricesError, refetch, isLoading, isSuccess, isError, data: DataSchema.parse({
    account: account.address || zeroAddress,

    asset: {
      address: env.PRISMA,
      symbol: multicall.data?.[0]?.result,
      decimals: multicall.data?.[1]?.result,
      balance: multicall.data?.[2]?.result,
      allowance: multicall.data?.[3]?.result
    },

    locker: {
      address: env.YPRISMA,
      symbol: multicall.data?.[4]?.result,
      decimals: multicall.data?.[5]?.result,
      balance: multicall.data?.[6]?.result,
      allowance: multicall.data?.[7]?.result
    },

    staker: {
      address: env.YPRISMA_BOOSTED_STAKER,
      symbol: 'Staked yPRISMA',
      decimals: multicall.data?.[8]?.result,
      balance: multicall.data?.[9]?.result,
      totalSupply: multicall.data?.[10]?.result
    },

    rewards: {
      address: env.YPRISMA_REWARDS_DISTRIBUTOR,
      decimals: multicall.data?.[11]?.result,
      claimable: multicall.data?.[12]?.result,
      claimableUsd: priced(
        multicall.data?.[12]?.result!,
        multicall.data?.[11]?.result!,
        prices[env.YVMKUSD]
      )
    }
  })}
}

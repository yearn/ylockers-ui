'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { PRICE_PROXIES, Token, TOKENS_MAP } from '../tokens'
import { readContractsQueryOptions } from 'wagmi/query'
import { useAccount, useConfig } from 'wagmi'
import { erc20Abi, zeroAddress } from 'viem'
import usePrices from './usePrices'
import { useCallback, useMemo } from 'react'

export type Balance = Token & {
  amount: bigint
  price: number
}

export default function useBalances({
  tokens
}: {
  tokens: Token[]
}) {
  const { isConnected, address } = useAccount()
  const config = useConfig()

  const contracts = useMemo(() => tokens.map(token => ({
    abi: erc20Abi, address: token.address, functionName: 'balanceOf', args: [address ?? zeroAddress]
  })), [tokens, address])

  const balances = useSuspenseQuery(
    readContractsQueryOptions(config, { contracts })
  )

  const prices = usePrices({ tokens })

  const getPrice = useCallback((token: Token) => {
    if (!prices.isFetched) return 0
    const symbol = PRICE_PROXIES[token.symbol] ?? token.symbol
    return prices.data[TOKENS_MAP[symbol].address] as number
  }, [[prices]])

  const result = useMemo(() => {
    if (!(isConnected && balances.isFetched && prices.isFetched)) return []
    return tokens.map((token, index) => ({
      ...token,
      amount: (balances.data[index].result ?? 0n) as bigint,
      price: getPrice(token)
    })) as Balance[]
  }, [tokens, isConnected, balances, prices, getPrice])

  const refetch = useCallback(async () => {
    await Promise.all([balances.refetch(), prices.refetch()])
  }, [balances, prices])

  const getBalance = useCallback((token?: Token) => {
    if (!token) return { address: zeroAddress, amount: BigInt(0), price: 0, decimals: 0, symbol: '', icon: '' }
    const balance = result?.find(balance => balance.address === token.address)
    return balance ?? {...token, amount: BigInt(0), price: 0}
  }, [result])

  return { refetch, getBalance }
}

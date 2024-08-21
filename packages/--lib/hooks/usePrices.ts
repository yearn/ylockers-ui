import { useMemo } from 'react'
import env from '../tools/env'
import useSWR from 'swr'
import { usePeg } from './usePeg'

function useLockerTokenPriceBasedOnPeg(baseTokenPrice: number | undefined) {
  const peg = usePeg()
  const result = useMemo(() => {
    if (baseTokenPrice === undefined) return undefined
    return baseTokenPrice * peg
  }, [baseTokenPrice, peg])
  return result
}

export default function usePrices(tokens: `0x${string}`[]) {
  const _tokens = useMemo(() => {
    const result: `0x${string}`[] = [...tokens]
    if (tokens.includes(env.LOCKER_TOKEN) && !tokens.includes(env.BASE_TOKEN)) {
      result.push(env.BASE_TOKEN)
    }
    return result
  }, [tokens])

  const request = `${env.YDAEMON}/1/prices/some/${_tokens.join(',')}?humanized=true`

  const fallbackData = _tokens.reduce((acc: { [key: `0x${string}`]: number }, token) => {
    acc[token] = 0
    return acc
  }, {})

  const { data, isLoading, isValidating, error, mutate } = useSWR(request, async () => {
    const response = await fetch(request)
    return response.json()
  }, {
    fallbackData,
    refreshInterval: 30_000
  })

  const lockerTokenPrice = useLockerTokenPriceBasedOnPeg(data[env.BASE_TOKEN])

  const _data = useMemo(() => {
    return { ...data, [env.LOCKER_TOKEN]: lockerTokenPrice ?? 0 }
  }, [data, lockerTokenPrice])

  return {
    data: _data as { [key: `0x${string}`]: number },
    isLoading,
    isValidating,
    error,
    mutate
  }
}

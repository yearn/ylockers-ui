import env from '../tools/env'
import { useMemo } from 'react'
import { useReadContract } from 'wagmi'
import { parseAbiItem } from 'viem'
import bmath from '../tools/bmath'

export function usePeg() {
  const read = useReadContract({
    address: env.EXIT_POOL,
    abi: [parseAbiItem('function get_dy(int128, int128, uint256) view returns (uint256)')],
    functionName: 'get_dy',
    args: [1n, 0n, 100n * (10n ** 18n)]
  })

  const result = useMemo(() => {
    if (!read.isSuccess) return 0
    return bmath.div(read.data, 100n * (10n ** 18n))
  }, [read])

  return result
}

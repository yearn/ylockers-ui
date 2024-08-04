'use client'

import { fNumber, fUSD } from '../tools/format'
import env from '../tools/env'
import usePrices from '../hooks/usePrices'
import { useMemo } from 'react'
import { useReadContract } from 'wagmi'
import { parseAbiItem } from 'viem'
import bmath from '../tools/bmath'

function Price({
  name,
  price,
  className
}: {
  name: string,
  price: string,
  className?: string
}) {
  return <div className={`
    flex items-center gap-3
    ${className}
  `}>
    <div className="font-thin">{name}</div>
    <div className="font-mono opacity-90">{price}</div>
  </div>
}

function usePeg() {
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

export default function Ticker() {
  const { data: prices } = usePrices([env.YPRISMA, env.PRISMA])
  const peg = usePeg()

  const pegDisplay = useMemo(() => {
    if (peg === 0) return '-.--:1'
    return `${fNumber(peg)}:1`
  }, [peg])

  return <div className={`
    absolute z-[100] top-[82px] sm:top-0 left-0 w-full sm:h-[70px]
    px-5 sm:px-0
    flex items-center justify-end sm:justify-center
    pointer-events-none
    `}>
    <div className={`
      flex flex-col items-end justify-end gap-3 text-sm
      sm:flex-row sm:items-center sm:justify-center sm:gap-8 sm:text-base`}>
      <Price name={env.LOCKER_NAME} price={fUSD(prices[env.YPRISMA] ?? 0)} />
      <Price name={env.ASSET_NAME} price={fUSD(prices[env.PRISMA] ?? 0)} />
      <Price name="PEG" price={pegDisplay} />
    </div>
  </div>
}

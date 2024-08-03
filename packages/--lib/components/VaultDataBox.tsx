import useData from '../hooks/useData'
import usePrices from '../hooks/usePrices'
import bmath from '../tools/bmath'
import env from '../tools/env'
import { fPercent, fUSD } from '../tools/format'
import { useMemo } from 'react'
import Tokens from './Tokens'
import { useVaultApy } from '../hooks/useVaultApy'

export default function VaultDataBox({
  className
}: {
  className?: string
}) {
  const { data: prices } = usePrices([env.YPRISMA])
  const { data } = useData()
  const vaultApy = useVaultApy()
  const balanceUsd = useMemo(() => bmath.priced(data.strategy.balance, data.strategy.decimals, prices[env.YPRISMA]), [data, prices])
  const vaultTotalAssetsUsd = useMemo(() => bmath.priced(data.strategy.totalAssets, data.strategy.decimals, prices[env.YPRISMA]), [data, prices])

  return <div className={className}>
    <span className="text-light-blue font-bold pb-2">ESTIMATED AUTO-COMPOUND APY</span>
    <span className="text-light-blue text-6xl font-bold font-mono mb-[26px]">
      {(vaultApy > 0) ? fPercent(vaultApy) : <span title="APR will show when migration period ends after first week.">🌈✨%</span>}</span>
    <div className="border-t-2 border-darker-blue/60 my-4 flex flex-col space-y-2">
      <span className="font-semibold py-4 text-lg">YOUR DEPOSITS</span>
      <div className="flex justify-between">
        <span className="font-thin opacity-70">{env.LOCKER_NAME} Deposited</span>
        <Tokens className="font-bold" amount={data.strategy.balance} decimals={data.strategy.decimals} />
      </div>
      <div className="flex justify-between">
        <span className="font-thin opacity-70 mb-4">USD Value</span>
        <span className="font-bold font-mono">{fUSD(balanceUsd)}</span>
      </div>
      <div className="font-semibold py-4 text-lg border-t-2 border-darker-blue/60">TOTAL DEPOSITS</div>
      <div className="flex justify-between">
        <span className="font-thin opacity-70">{env.LOCKER_NAME} Deposited</span>
        <Tokens className="font-bold" amount={data.strategy.totalAssets} decimals={data.strategy.decimals} />
      </div>
      <div className="flex justify-between">
        <span className="font-thin opacity-70">USD Value</span>
        <span className="font-bold font-mono">{fUSD(vaultTotalAssetsUsd, { full: false })}</span>
      </div>
    </div>
  </div>
}

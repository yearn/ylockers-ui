'use client'

import useData from '../hooks/useData'
import InputExecute from './InputExecute'
import env from '../tools/env'
import abis from '../abis'

export default function Stake({ className }: { className?: string }) {
  const { data } = useData()
  return <InputExecute className={className}
    task={{
      verb: 'stake',
      token: data.locker,
      needsApproval: true,
      parameters: {
        address: env.BOOSTED_STAKER,
        abi: abis.YearnBoostedStaker,
        functionName: 'stake',
        args: (amount: bigint) => [amount]
      }
    }} />
}

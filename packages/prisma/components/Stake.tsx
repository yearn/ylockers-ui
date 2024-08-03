'use client'

import useData from '--lib/hooks/useData'
import InputExecute from './InputExecute'
import env from '--lib/tools/env'
import abis from '../app/abis'

export default function Stake({ className }: { className?: string }) {
  const { data } = useData()
  return <InputExecute className={className}
    task={{
      verb: 'stake',
      token: data.locker,
      needsApproval: true,
      parameters: {
        address: env.YPRISMA_BOOSTED_STAKER,
        abi: abis.YearnBoostedStaker,
        functionName: 'stake',
        args: (amount: bigint) => [amount]
      }
    }} />
}

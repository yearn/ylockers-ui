'use client'

import useData, { TokenSchema } from '../hooks/useData'
import InputExecute from '--lib/components/InputExecute'
import env from '../tools/env'
import abis from '../abis'

export default function Unstake({ className }: { className?: string }) {
  const { data } = useData()
  return <InputExecute className={className}
    task={{
      verb: 'unstake',
      token: TokenSchema.parse(data.staker),
      needsApproval: false,
      parameters: {
        address: env.BOOSTED_STAKER,
        abi: abis.YearnBoostedStaker,
        functionName: 'unstake',
        args: (amount: bigint) => [amount, data.account]
      }
    }} />
}

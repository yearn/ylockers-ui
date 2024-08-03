'use client'

import useData from '--lib/hooks/useData'
import InputExecute from './InputExecute'
import env from '--lib/tools/env'
import abis from '../app/abis'

export default function Withdraw({ className }: { className?: string }) {
  const { data } = useData()
  return <InputExecute className={className}
    task={{
      verb: 'withdraw',
      token: data.strategy,
      needsApproval: false,
      parameters: {
        address: env.YPRISMA_STRATEGY,
        abi: abis.Strategy,
        functionName: 'redeem',
        args: (amount: bigint) => [amount, data.account, data.account]
      }
    }} />
}

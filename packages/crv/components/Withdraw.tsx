'use client'

import useData from '@/hooks/useData'
import InputExecute from './InputExecute'
import env from '@/lib/env'
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
        functionName: 'withdraw',
        args: (amount: bigint) => [amount]
      }
    }} />
}

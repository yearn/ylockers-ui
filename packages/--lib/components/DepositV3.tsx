'use client'

import useData from '../hooks/useData'
import InputExecute from './InputExecute'
import env from '../tools/env'
import abis from '../abis'

export default function DepositV3({ className }: { className?: string }) {
  const { data } = useData()
  return <InputExecute className={className}
    task={{
      verb: 'deposit',
      token: data.locker,
      needsApproval: true,
      parameters: {
        address: env.YPRISMA_STRATEGY,
        abi: abis.VaultV3,
        functionName: 'deposit',
        args: (amount: bigint) => [amount, data.account]
      }
    }} />
}

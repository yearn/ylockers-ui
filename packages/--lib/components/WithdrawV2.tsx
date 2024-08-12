'use client'

import useData from '../hooks/useData'
import InputExecute from './InputExecute'
import env from '../tools/env'
import abis from '../abis'

export default function WithdrawV2({ className }: { className?: string }) {
  const { data } = useData()
  return <InputExecute className={className}
    task={{
      verb: 'withdraw',
      token: data.strategy,
      needsApproval: false,
      parameters: {
        address: env.LOCKER_TOKEN_VAULT,
        abi: abis.VaultV2,
        functionName: 'withdraw',
        args: (amount: bigint) => [amount]
      }
    }} />
}

'use client'

import useData from '../hooks/useData'
import InputExecute from './InputExecute'
import abis from '../abis'
import { TEnv } from '@/tools/envType'

export default function WithdrawV2({ yDaemon, env, className }: {
  yDaemon: string,
  env: TEnv,
  className?: string
}) {
  const { data } = useData(yDaemon, env)
  return <InputExecute className={className}
    task={{
      verb: 'withdraw',
      token: data.strategy,
      needsApproval: false,
      parameters: {
        address: env.lockerTokenVault,
        abi: abis.VaultV2,
        functionName: 'withdraw',
        args: (amount: bigint) => [amount]
      }
    }} />
}

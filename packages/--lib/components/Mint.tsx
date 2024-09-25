'use client'

import useData from '../hooks/useData'
import InputExecute from '../components/InputExecute'
import abis from '../abis'
import { TEnv } from '@/tools/envType'

export default function Mint({ yDaemon, env, className }: {
  yDaemon: string,
  env: TEnv,
  className?: string
}) {
  const { data } = useData(yDaemon, env)
  return <InputExecute className={className}
    task={{
      verb: 'mint',
      token: data.asset,
      needsApproval: true,
      parameters: {
        address: env.lockerToken,
        abi: abis.yPrisma,
        functionName: 'mint',
        args: (amount: bigint) => [amount, data.account]
      }
    }} />
}

'use client'

import useData from '../hooks/useData'
import InputExecute from './InputExecute'
import abis from '../abis'
import { TEnv } from '../tools/envType'

export default function Stake({ yDaemon, env, className }: {
  yDaemon: string,
  env: TEnv,
  className?: string
}) {
  const { data } = useData(yDaemon, env)
  return <InputExecute
    className={className}
    yDaemon={yDaemon}
    env={env}
    task={{
      verb: 'stake',
      token: data.locker,
      needsApproval: true,
      parameters: {
        address: env.boostedStaker,
        abi: abis.YearnBoostedStaker,
        functionName: 'stake',
        args: (amount: bigint) => [amount]
      }
    }} />
}

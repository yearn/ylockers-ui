'use client'

import useData from '../hooks/useData'
import InputExecute from '../components/InputExecute'
import env from '../tools/env'
import abis from '../abis'

export default function Mint({ className }: { className?: string }) {
  const { data } = useData()
  return <InputExecute className={className}
    task={{
      verb: 'mint',
      token: data.asset,
      needsApproval: true,
      parameters: {
        address: env.LOCKER_TOKEN,
        abi: abis.yPrisma,
        functionName: 'mint',
        args: (amount: bigint) => [amount, data.account]
      }
    }} />
}

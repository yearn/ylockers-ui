'use client'

import useData from '@/hooks/useData'
import InputExecute from '../components/InputExecute'
import env from '@/lib/env'
import abis from '../abis'

export default function Stake({ className }: { className?: string }) {
  const { data } = useData()
  return <InputExecute className={className} task={{
    verb: 'stake',
    token: data.locker,
    parameters: {
      address: env.YPRISMA_BOOSTED_STAKER,
      abi: abis.YearnBoostedStaker,
      functionName: 'deposit'
    }
  }} />
}

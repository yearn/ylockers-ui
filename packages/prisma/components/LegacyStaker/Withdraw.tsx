'use client'

import { JustExecute } from '--lib/components/InputExecute'
import { ENV, YDAEMON } from '@/constants'
import abi from './abi'
import { hasLegacyStaker, LEGACY_STAKER, useBalance } from './useBalance'

export default function Withdraw({ className }: { className?: string }) {
  const balance = useBalance()
  if (!hasLegacyStaker) return <></>
  return <JustExecute
    className={className}
    yDaemon={YDAEMON}
    env={ENV}
    task={{
      verb: 'withdraw',
      token: { 
        balance, 
        symbol: 'Old Staked yPrisma', 
        decimals: 18, 
        allowances: [], 
        address: LEGACY_STAKER 
      },
      needsApproval: false,
      parameters: {
        address: LEGACY_STAKER,
        abi, functionName: 'exit',
        args: () => [],
      }
    }} />
}

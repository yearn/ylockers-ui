'use client'

import useData from '--lib/hooks/useData'
import { JustExecute } from '--lib/components/InputExecute'
import env from '--lib/tools/env'
import abi from './OldStaker'

export default function WithdrawAllFromOldStaker({ className }: { className?: string }) {
  const { data } = useData()
  return <JustExecute className={className}
    task={{
      verb: 'withdraw',
      token: { balance: data.utilities.oldStakerBalance, symbol: 'Old Staked yPrisma', decimals: 18, allowances: [], address: '0xE3EE395C9067dD15C492Ca950B101a7d6c85b5Fc' },
      needsApproval: false,
      parameters: {
        address: env.YPRISMA_OLD_STAKER,
        abi, functionName: 'exit',
        args: () => [],
      }
    }} />
}

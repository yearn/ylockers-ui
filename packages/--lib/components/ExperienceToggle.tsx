import env from '../tools/env'
import { useTab } from '../hooks/useTab'
import Link from 'next/link'
import { useVaultApy } from '../hooks/useVaultApy'
import { fPercent } from '../tools/format'
import useData from '../hooks/useData'
import { useMemo } from 'react'
import { formatUnits } from 'viem'

export default function ExperienceToggle() {
  const tab = useTab()
  const leftActive = (tab === 'stake' || tab === 'unstake' || tab === 'claim' || tab === 'get' || tab === 'learn_more_stake')
  const rightActive = !leftActive

  const { data } = useData()
  const stakerApr = useMemo(() => {
    const result = data.utilities.globalMinMaxActiveApr.max
    if (result === 0n) return <span title="APY will show when migration period ends after first week.">🌈✨%</span>
    return <span className="font-mono">{fPercent(parseFloat(formatUnits(result, 18)))}</span>
  }, [data])

  const _vaultApy = useVaultApy()
  const vaultApy = useMemo(() => {
    if (_vaultApy === 0) return <span title="APR will show when migration period ends after first week.">🌈✨%</span>
    return <span className="font-mono">{fPercent(_vaultApy)}</span>
  }, [_vaultApy])

  return <div className="w-full flex flex-wrap justify-center items-center mb-12 md:mb-8 space-y-4 md:space-x-8 md:space-y-0 flex-col md:flex-row">
    <Link href="/app/stake">
      <div className={`${(leftActive) ? 'bg-bright-primary' : 'bg-tab-inactive'} rounded-full w-[328px] px-2 py-2`}>
        <div className="flex justify-between items-center text-lg pl-4">
          EARN {env.STABLE_TOKEN_NAME}
          <div className={`rounded-full ${leftActive ? 'bg-light-primary' : 'bg-tab-inactive-inner'} p-1 px-4`}>
            {stakerApr}
          </div>
        </div>
      </div>
    </Link>
    <Link href="/app/deposit">
      <div className={`${(rightActive) ? 'bg-bright-primary' : 'bg-tab-inactive'} rounded-full w-[328px] px-2 py-2`}>
        <div className="flex justify-between items-center text-lg pl-4">
          EARN {env.LOCKER_TOKEN_NAME}
          <div className={`rounded-full ${rightActive ? 'bg-light-primary' : 'bg-tab-inactive-inner'} p-1 px-4`}>
            {vaultApy}
          </div>
        </div>
      </div>
    </Link>
  </div>
}

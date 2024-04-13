import Button from '@/app/components/Button'
import Indeterminate from './Indeterminate'
import { useProvider } from './provider'
import { formatUnits } from 'viem'
import { useEffect, useMemo } from 'react'

export default function Approve() {
  const { stepForward, token, amount, approve } = useProvider()

  const message = useMemo(() => {
    return `1 - Approve ${formatUnits(amount, token.decimals)} ${token.symbol}`
  }, [token, amount])

  useEffect(() => {
    if (approve.isError) {
      console.error('approve.error')
      console.error(approve.error)
    }

    if (approve.simulation.isError) {
      console.error('approve.simulation.error')
      console.error(approve.simulation.error)
    }
  }, [approve])

  const ring = useMemo(() => {
    if (approve.simulation.status === 'pending') {
      return 'border-light-blue'
    }

    if (approve.status === 'pending') {
      return 'border-green-400'
    }

    if (approve.isError || approve.simulation.isError) {
      return 'border-charge-red'
    }

    return 'border-transparent'
  }, [approve])

  const ringPulse = useMemo(() => {
    return approve.simulation.status === 'pending' || approve.status === 'pending'
  }, [approve])

  return <div onClick={stepForward} className="w-full flex flex-col gap-2">
    <div className="w-full flex items-center gap-2">
      <Indeterminate sweep={{ from: 100, to: 50 }} ring={ring} ringPulse={ringPulse}>
        {message}
      </Indeterminate>
      <Button disabled={approve.disabled} className="">Approve</Button>
    </div>
    <div className="flex items-center gap-1 text-xs">
      {approve.simulation.status === 'pending' && <div className="text-light-blue">Simulating transaction...</div>}
      {approve.status === 'pending' && <div className="text-green-400">+1</div>}
      {approve.simulation.isError && <div className="text-charge-red">Simulation fail! Please contact support</div>}
      {approve.isError && <div className="text-charge-red">Approval fail! Please contact support</div>}
    </div>
  </div>
}

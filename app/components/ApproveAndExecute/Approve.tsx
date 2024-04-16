import Button from '@/app/components/Button'
import Indeterminate from './Indeterminate'
import { useProvider } from './provider'
import { formatUnits } from 'viem'
import { useEffect, useMemo } from 'react'
import { fTokens } from '@/lib/format'

export default function Approve() {
  const { stepForward, token, amount, approve } = useProvider()

  useEffect(() => {
    if (approve.isError) console.error(approve.error)
    if (approve.simulation.isError) console.error(approve.simulation.error)
  }, [approve])

  const isError = useMemo(() => 
    approve.simulation.isError 
    || approve.isError 
    || approve.receipt.isError, [approve])

  const isPending = useMemo(() => 
    !isError && (approve.simulation.isPending 
    || approve.isPending 
    || approve.receipt.isPending
  ), [approve, isError])

  const isConfirming = useMemo(() =>
    approve.isSuccess && approve.receipt.isPending, 
  [approve])

  const isRunning = useMemo(() => 
    !isError && (approve.isPending || isConfirming), 
  [isError, isConfirming, approve])

  const color = useMemo(() => {
    if (isPending) return 'light-blue'
    if (isError) return 'charge-red'
    return 'transparent'
  }, [isPending, isError])

  const message = useMemo(() => {
    return `Approve ${formatUnits(amount, token.decimals)} ${token.symbol}`
  }, [amount, token])

  useEffect(() => {
    if (approve.isSuccess && approve.receipt.isSuccess) {
      stepForward()
    }
  }, [approve, stepForward])

  const submessage = useMemo(() => {
    if (approve.isError) {
      if (approve.error?.includes('User denied transaction signature')) {
        return <div className="text-charge-red">Approval denied</div>
      }
      return <div className="text-charge-red">Approval fail! Please contact support</div>
    } else if (approve.simulation.isError) {
      return <div className="text-charge-red">Simulation fail! Please contact support</div>
    } else if (approve.receipt.isError) {
      return <div className="text-charge-red">Transaction fail! Please contact support</div>
    } else if (isConfirming) {
      return <div className="text-light-blue">Confirming...</div>
    }
    return <div className="flex items-center text-xs">
      {`You have ${fTokens(token.balance, token.decimals)} ${token.symbol}`}
    </div>
  }, [approve, token, isConfirming])

  return <div className="w-full flex flex-col gap-2">
    <div className="w-full flex items-center gap-2">
      <Indeterminate 
        sweepRange={{ from: 100, to: 25 }}
        run={isRunning}
        color={color}
        pulse={isPending}>
        {message}
      </Indeterminate>
      <Button onClick={approve.write} disabled={approve.disabled}>Approve</Button>
    </div>
    <div className="flex items-center gap-1 text-xs">
      {submessage}
    </div>
  </div>
}

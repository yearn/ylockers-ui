import Button from '@/app/components/Button'
import Indeterminate from './Indeterminate'
import { useProvider } from './provider'
import { formatUnits } from 'viem'
import { useEffect, useMemo } from 'react'
import { fTokens } from '@/lib/format'

export default function Approve() {
  const { stepForward, token, amount, execute } = useProvider()

  useEffect(() => {
    if (execute.isError) console.error(execute.error)
    if (execute.simulation.isError) console.error(execute.simulation.error)
  }, [execute])

  const isError = useMemo(() => 
    execute.simulation.isError 
    || execute.isError 
    || execute.receipt.isError, [execute])

  const isPending = useMemo(() => 
    !isError && (execute.simulation.isPending 
    || execute.isPending 
    || execute.receipt.isPending
  ), [execute, isError])

  const isConfirming = useMemo(() =>
    execute.isSuccess && execute.receipt.isPending, 
  [execute])

  const isRunning = useMemo(() => 
    !isError && (execute.isPending || isConfirming), 
  [isError, isConfirming, execute])

  const color = useMemo(() => {
    if (isPending) return 'light-blue'
    if (isError) return 'charge-red'
    return 'transparent'
  }, [isPending, isError])

  const message = useMemo(() => {
    return `Stake ${formatUnits(amount, token.decimals)} ${token.symbol}`
  }, [amount, token])

  useEffect(() => {
    if (execute.isSuccess && execute.receipt.isSuccess) {
      stepForward()
    }
  }, [execute, stepForward])

  const submessage = useMemo(() => {
    if (execute.isError) {
      if (execute.error?.includes('User denied transaction signature')) {
        return <div className="text-charge-red">Approval denied</div>
      }
      return <div className="text-charge-red">Approval fail! Please contact support</div>
    } else if (execute.simulation.isError) {
      return <div className="text-charge-red">Simulation fail! Please contact support</div>
    } else if (execute.receipt.isError) {
      return <div className="text-charge-red">Transaction fail! Please contact support</div>
    } else if (isConfirming) {
      return <div className="text-light-blue">Confirming...</div>
    }
    return <div className="flex items-center text-xs">
      {`You have ${fTokens(token.balance, token.decimals)} ${token.symbol}`}
    </div>
  }, [execute, token])

  return <div className="w-full flex flex-col gap-2">
    <div className="w-full flex items-center gap-2">
      <Indeterminate 
        sweepRange={{ from: 100, to: 25 }}
        run={isRunning}
        color={color}
        pulse={isPending}>
        {message}
      </Indeterminate>
      <Button onClick={execute.write} disabled={execute.disabled}>Stake</Button>
    </div>
    <div className="flex items-center gap-1 text-xs">
      {submessage}
    </div>
  </div>
}

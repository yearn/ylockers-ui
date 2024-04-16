import Button from '@/app/components/Button'
import { useCallback } from 'react'
import { InputTokenAmount } from '@/app/components/InputTokenAmount'
import { useProvider } from './provider'
import { fTokens } from '@/lib/format'

export default function Input() {
  const { stepForward, token, amount, setAmount } = useProvider()

  const onClick = useCallback(() => {
    stepForward()
  }, [stepForward])

  return <div className="w-full flex flex-col gap-2">
    <div className="flex items-center gap-2">
      <InputTokenAmount
        amount={amount} 
        decimals={token.decimals} 
        max={token.balance} 
        onChange={value => setAmount(value)} 
        onMaxClick={() => setAmount(token.balance)} />
      <Button onClick={onClick} disabled={amount === 0n}>Stake</Button>
    </div>
    <div className="flex items-center text-xs">
      {`You have ${fTokens(token.balance, token.decimals)} ${token.symbol}`}
    </div>
  </div>
}

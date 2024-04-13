import Button from '@/app/components/Button'
import Tokens from '@/app/components/Tokens'
import { useCallback, useState } from 'react'
import { InputTokenAmount } from '@/app/components/InputTokenAmount'
import { useProvider } from './provider'

export default function Input() {
  const { stepForward, token, setAmount } = useProvider()
  const [_amount, _setAmount] = useState(0n)

  const onClick = useCallback(() => {
    setAmount(_amount)
    stepForward()
  }, [stepForward, _amount, setAmount])

  return <div className="w-full flex flex-col gap-2">
    <div className="flex items-center gap-2">
      <InputTokenAmount
        amount={_amount} 
        decimals={token.decimals} 
        maxAmount={token.balance} 
        onChange={value => _setAmount(value)} 
        onMaxClick={() => _setAmount(token.balance)} />
      <Button onClick={onClick} disabled={_amount === 0n}>Deposit</Button>
    </div>
    <div className="flex items-center gap-1 text-xs">
      <div>You have</div>
      <Tokens amount={token.balance} decimals={token.decimals} accuracy={2} />
      <div>{token.symbol}</div>
    </div>
  </div>
}

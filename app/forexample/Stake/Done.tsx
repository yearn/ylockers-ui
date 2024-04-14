import { useProvider } from './provider'
import Button from '@/app/components/Button'
import { fTokens } from '@/lib/format'

export default function Action() {
  const { reset, amount, token } = useProvider()
  return <div className="w-full flex flex-col gap-2">
    <div className="flex items-center justify-between gap-2">
      <div>🥳 {`You staked ${fTokens(amount, token.decimals)} ${token.symbol}`}!</div>
      <Button onClick={reset}>OK</Button>
    </div>
    <div className="flex items-center text-xs">
      {`You have ${fTokens(token.balance, token.decimals)} ${token.symbol}`}
    </div>
  </div>
}

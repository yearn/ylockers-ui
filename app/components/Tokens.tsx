import { fNumber } from '@/lib/format'
import { formatUnits } from 'viem'

export default function Tokens({
  amount,
  decimals,
  humanize,
  accuracy,
  padStart,
  className
}: {
  amount: bigint
  decimals: number
  humanize?: boolean
  accuracy?: number 
  padStart?: number
  className?: string 
}) {
  const formatted = (() => {
    const units = formatUnits(amount, decimals)
    if (humanize) return fNumber(Number(units), { fixed: 0 })
    const separator = Intl.NumberFormat().format(1.1).charAt(1)
    const [ whole, fraction ] = units.split(separator)
    return `${whole.padStart(padStart || 0, '0')}.${(fraction || '0'.repeat(accuracy || 2)).slice(0, accuracy || 2)}`
  })()

  return <span className={`font-mono ${className}`}>
    {formatted}
  </span>
}

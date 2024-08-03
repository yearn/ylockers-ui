import { formatUnits } from 'viem'

export default function Tokens({
  amount,
  decimals,
  accuracy,
  suffix,
  className
}: {
  amount: bigint
  decimals: number
  accuracy?: number
  suffix?: string
  className?: string 
}) {
  const formatted = (() => {
    const n = Number(formatUnits(amount, decimals))
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: accuracy || 2,
      maximumFractionDigits: accuracy || 2
    })
    return formatter.format(n)
  })()

  return <span className={`font-mono ${className}`}>
    {formatted}{suffix ? ` ${suffix}` : ''}
  </span>
}

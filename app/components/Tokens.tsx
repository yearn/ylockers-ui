import { fNumber } from '@/lib/format'
import React, { forwardRef, HtmlHTMLAttributes } from 'react'
import { formatUnits } from 'viem'

type TokensProps = HtmlHTMLAttributes<HTMLDivElement> & {
  amount: bigint
  decimals: number
  humanize?: boolean
  accuracy?: number 
  padStart?: number
  className?: string
}

const Tokens = forwardRef<HTMLSpanElement, TokensProps>(
  ({ amount, decimals, humanize, accuracy, padStart, className, ...props }, ref
) => {  
  const formatted = (() => {
    const units = formatUnits(amount, decimals)
    if (humanize) return fNumber(Number(units), { fixed: 0 })
    const separator = Intl.NumberFormat().format(1.1).charAt(1)
    const [ whole, fraction ] = units.split(separator)
    return `${whole.padStart(padStart || 0, '0')}.${(fraction || '0'.repeat(accuracy || 2)).slice(0, accuracy || 2)}`
  })()

  return <span ref={ref} {...props} className={`font-mono ${className}`}>
    {formatted}
  </span>
})

Tokens.displayName = 'Tokens'

export default Tokens

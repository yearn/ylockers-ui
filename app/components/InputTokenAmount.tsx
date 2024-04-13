import { useCallback, useMemo, type ReactElement } from 'react'
import { formatUnits } from 'viem'
import Input from './Input'
import Button from './Button'

type Props = {
  decimals: number
	amount: bigint
  minAmount?: bigint
	maxAmount?: bigint
	placeholder?: string
	disabled?: boolean
	onChange?: (amount: bigint) => void
	onMaxClick?: () => void
}

export function InputTokenAmount({
  decimals,
	amount,
  minAmount,
	maxAmount,
	placeholder,
	disabled,
	onChange,
	onMaxClick
}: Props): ReactElement {

  const inputClassName = useMemo(() => {
    return `font-mono
    ${maxAmount && !disabled ? 'pr-16' : ''}
    ${disabled ? 'disabled-text' : ''}`
  }, [maxAmount, disabled])

  const maxButtonClassName = useMemo(() => {
    return `absolute right-2 h-6 px-2 
    flex items-center text-xs
    ${!!onMaxClick && !!maxAmount && !disabled && maxAmount !== 0n ? '' : 'hidden pointer-events-none'}`
  }, [onMaxClick, maxAmount, disabled])

  const humanize = useCallback((amount: bigint) => {
    return Number(formatUnits(amount, decimals))
  }, [decimals])

  const dehumanize = useCallback((input: string) => {
    return BigInt(Number(input) * 10 ** decimals)
  }, [decimals])

	return <div className="relative flex w-full items-center justify-center">
    <Input type="number"
      className={inputClassName}
      autoComplete="off"
      value={humanize(amount)}
      onChange={onChange ? (e): void => onChange(dehumanize(e.target.value)) : undefined}
      min={minAmount ? humanize(minAmount) : 0}
      max={maxAmount ? humanize(maxAmount) : undefined}
      step={1}
      placeholder={disabled ? '' : placeholder ?? '0'}
      disabled={disabled}
    />
    <Button onClick={onMaxClick ? (): void => onMaxClick() : undefined}
      className={maxButtonClassName}>
      {'Max'}
    </Button>
  </div>
}
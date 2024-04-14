import { useCallback, useMemo, type ReactElement } from 'react'
import { formatUnits } from 'viem'
import Input from './Input'
import Button from './Button'

type Props = {
  decimals: number
	amount: bigint
  min?: bigint
	max?: bigint
	placeholder?: string
	disabled?: boolean
	onChange?: (amount: bigint) => void
	onMaxClick?: () => void
}

export function InputTokenAmount({
  decimals,
	amount,
  min,
	max,
	placeholder,
	disabled,
	onChange,
	onMaxClick
}: Props): ReactElement {

  const inputClassName = useMemo(() => {
    return `font-mono
    ${max && !disabled ? 'pr-16' : ''}
    ${disabled ? 'disabled-text' : ''}`
  }, [max, disabled])

  const maxButtonClassName = useMemo(() => {
    return `absolute right-2 h-6 px-2 
    flex items-center text-xs
    ${!!onMaxClick && !!max && !disabled && max !== 0n ? '' : 'hidden pointer-events-none'}`
  }, [onMaxClick, max, disabled])

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
      min={min ? humanize(min) : 0}
      max={max ? humanize(max) : 0}
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
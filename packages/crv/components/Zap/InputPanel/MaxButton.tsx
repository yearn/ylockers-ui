'use client'

import Button from '--lib/components/Button'
import useBalances from '../hooks/useBalances'
import { Token, TOKENS } from '../tokens'
import { useCallback, useMemo } from 'react'
import { formatUnits } from 'viem'

export function MaxButtonDisplay({ onClick, disabled }: { onClick?: () => void, disabled?: boolean }) {
  return <Button onClick={onClick} disabled={disabled} className="px-2 py-1 text-xs text-neutral-200 rounded-full">MAX</Button>
}

export function MaxButton({ token, setAmount, disabled }: { token: Token, setAmount: (amount: string) => void, disabled: boolean }) {
  const { getBalance } = useBalances({ tokens: TOKENS })
  const balance = useMemo(() => getBalance(token), [getBalance, token])
  const onClick = useCallback(() => {
    setAmount(formatUnits(balance.amount, token.decimals))
  }, [setAmount, balance, token])
  return <MaxButtonDisplay onClick={onClick} disabled={disabled}></MaxButtonDisplay>
}

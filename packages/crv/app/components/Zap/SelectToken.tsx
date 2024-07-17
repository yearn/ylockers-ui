'use client'

import Image from 'next/image'
import Button from '../Button'
import { ScrollArea } from '../shadcn/scroll-area'
import { INPUTS, OUTPUTS, Token, TOKEN_ROUTES, TOKENS } from './tokens'
import useBalances from './hooks/useBalances'
import { useCallback, useMemo } from 'react'
import { fTokens, fUSD } from '@/lib/format'
import { priced } from '@/lib/bmath'
import { useParameters } from './Parameters'
import ImageOrBg from './ImageOrBg'

function Balance({ 
  token 
}: {
  token: Token
}) {
  const { getBalance } = useBalances({ tokens: TOKENS })
  const balance = useMemo(() => getBalance(token), [getBalance, token])

  const dust = 100n
  if (balance.amount < dust) return <></>

  return <div className="flex flex-col items-end gap-0 text-sm text-neutral-400">
    <div>{fTokens(balance.amount, balance.decimals)}</div>
    <div>{balance.price ? fUSD(priced(balance.amount, balance.decimals, balance.price)) : 'price na'}</div>
  </div>
}

export default function SelectToken({
  mode,
  onClose
}: {
  mode: 'in' | 'out',
  onClose: () => void
}) {
  const { 
    inputToken, setInputToken, setInputAmount,
    outputToken, setOutputToken, setOutputAmount,
  } = useParameters()

  const { getBalance } = useBalances({ tokens: TOKENS })

  const computeInputTokens = useCallback(() => {
    const result: Token[] = []
    for (const token of INPUTS) {
      if (!token.legacy) result.push(token)
      else if (getBalance(token).amount > 0n) result.push(token)
    }
    return result
  }, [getBalance])

  const computeOutputTokens = useCallback((_inputToken: Token) => {
    const outputSymbols = TOKEN_ROUTES[_inputToken.symbol] ?? OUTPUTS.map(t => t.symbol)
    return OUTPUTS.filter(t => outputSymbols.includes(t.symbol))
  }, [])

  const tokens = useMemo(() => {
    if (mode === 'in') return computeInputTokens()
    else return computeOutputTokens(inputToken)
  }, [mode, computeInputTokens, inputToken, computeOutputTokens])

  const onSelect = useCallback((token: Token) => {
    if (mode === 'in' && token !== inputToken) {
      setInputToken(token)
      setInputAmount(undefined)
      setOutputAmount(undefined)

      const outputTokens = computeOutputTokens(token)
      if (!outputTokens.find(t => t === outputToken)) {
        setOutputToken(outputTokens[0])

      } else if (token === outputToken) {
        setOutputToken(OUTPUTS.find(t => t !== token)!)

      }

    } else if (mode === 'out' && token !== outputToken) {
      setOutputToken(token)
      setOutputAmount(undefined)
      if (token === inputToken) {
        setInputAmount(undefined)
        setInputToken(INPUTS.find(t => t !== token)!)
      }

    }

    onClose()

  }, [
    mode, onClose, 
    inputToken, setInputToken, setInputAmount,
    outputToken, setOutputToken, setOutputAmount,
    computeOutputTokens
  ])

  return <div className="px-4 py-6 flex flex-col gap-3 bg-input-bg rounded-primary">
    <div className="flex items-center justify-between">
      <div className="text-sm text-neutral-400">Select an {mode === 'in' ? 'input' : 'output'} token</div>
      <div className="text-sm">
        <Button onClick={onClose} className="px-2 py-1 text-xs text-neutral-200 rounded-full">Close</Button>
      </div>
    </div>
    <ScrollArea className="w-full max-h-[16rem] overflow-auto">
      {tokens.map(token => <div key={token.symbol} 
        onClick={() => onSelect(token)}
        className={`
        pl-4 pr-12 py-4
        flex items-center justify-between
        border border-transparent
        hover:bg-darker-blue 
        rounded-primary cursor-pointer`}>
        <div className="flex items-center gap-4">
          <div className="size-[32px]">
            <ImageOrBg
              bgClassName="bg-darker-blue-bg rounded-full"
              src={token.icon}
              alt={token.symbol}
              width={32}
              height={32} />
          </div>
          <div>{token.symbol}</div>
        </div>
        <Balance token={token} />
      </div>)}
    </ScrollArea>
  </div>
}

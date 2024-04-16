import A from '@/app/components/A'
import { useProvider } from './provider'
import Button from '@/app/components/Button'
import { fAddress, fTokens } from '@/lib/format'
import { TfiReceipt } from 'react-icons/tfi'
import { useConfig } from 'wagmi'
import nlp from 'compromise'
import { useMemo } from 'react'
import { zeroHash } from 'viem'

export default function Action() {
  const config = useConfig()
  const { reset, amount, token, execute, verb } = useProvider()

  const pastTense = useMemo(() => {
    const doc = nlp(verb)
    doc.verbs().toPastTense()
    return doc.text()
  }, [verb])

  return <div className="w-full flex flex-col gap-2">
    <div className="flex items-center justify-between gap-2">
      <div>{`You ${pastTense} ${fTokens(amount, token.decimals)} ${token.symbol}`}!</div>
      <Button onClick={reset}>OK</Button>
    </div>
    <div className="pl-3 font-thin text-xs">
      <A href={`${config.getClient().chain.blockExplorers?.default.url}/tx/${execute.hash!}`} 
        target='_blank' rel="noreferrer">
        <div className="flex items-center gap-2">
          <TfiReceipt />
          <div>{fAddress((execute.hash ?? zeroHash))}</div>
        </div>
      </A>
    </div>
  </div>
}

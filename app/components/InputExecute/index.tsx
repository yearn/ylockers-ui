'use client'

import useData from '@/hooks/useData'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAccount, useConfig } from 'wagmi'
import { InputTokenAmount } from '../InputTokenAmount'
import Provider, { Task, useProvider } from './provider'
import Button from '../Button'
import { AnimatePresence } from 'framer-motion'
import { springs } from '@/lib/motion'
import { motion } from 'framer-motion'
import { TfiReceipt } from 'react-icons/tfi'
import A from '../A'
import { fTokens } from '@/lib/format'
import nlp from 'compromise'

function GreatSuccess({ hash, message }: { hash: `0x${string}`, message: string }) {
  const config = useConfig()
  return <A href={`${config.getClient().chain.blockExplorers?.default.url}/tx/${hash}`} 
    target='_blank' rel="noreferrer">
    <div className="flex items-center gap-2">
      <TfiReceipt />
      <div>{message}</div>
    </div>
  </A>
}

function Provided({ className }: { className?: string }) {
  const { openConnectModal } = useConnectModal()
  const account = useAccount()
  const { data } = useData()
  const { task, token, amount, setAmount, needsApproval, approve, execute, isError, error, reset } = useProvider()
  const hasBalance = useMemo(() => data.locker.balance > 0n, [data])

  const disabled = useMemo(() => 
    account.isConnected 
    && (!hasBalance || amount === 0n)
  , [hasBalance, amount])

  const verbPastTense = useMemo(() => {
    const doc = nlp(task.verb)
    doc.verbs().toPastTense()
    return doc.text()
  }, [task])  

  const label = useMemo(() => {
    if (!account.isConnected) return 'Connect'
    if (needsApproval) return 'Approve'
    return task.verb
  }, [account, needsApproval, task])

  const subtextKey = useMemo(() => {
    if (isError) return 'error'
    if (approve.receipt.isLoading) 'confirming'
    if (execute.receipt.isLoading) 'confirming'
    if (execute.receipt.isSuccess) 'success'
    return 'default'
  }, [isError, approve, execute])

  const subtext = useMemo(() => {
    if (isError) return <div>🛑 Error! Please contact support</div>
    if (approve.receipt.isLoading) return <div>Confirming...</div>
    if (execute.receipt.isLoading) return <div>Confirming...</div>
    if (execute.receipt.isSuccess) return <GreatSuccess hash={execute.hash!} message={`You ${verbPastTense} ${fTokens(amount, token.decimals)} ${token.symbol}!`} />
    return <div>{`You have ${fTokens(token.balance, token.decimals)} ${token.symbol}`}</div>
  }, [isError, approve, execute, amount])

  useEffect(() => {
    if (isError) console.error(error)
  }, [isError, error])

  const theme = useMemo(() => {
    if (!account.isConnected) return 'transparent'
    if (approve.receipt.isLoading) return 'onit'
    if (execute.receipt.isLoading) return 'onit'
    return 'default'
  }, [account, approve, execute])

  const onClick = useCallback(() => {
    if (approve.receipt.isLoading || execute.receipt.isLoading) {
      return
    } else if (!account.isConnected) {
      openConnectModal?.()
    } else if (needsApproval) {
      approve.write()
    } else {
      execute.write()
    }
  }, [approve, execute, openConnectModal, needsApproval])

  return <div className={`flex flex-col gap-2 ${className}`}>
    <div className="flex gap-2">
      <InputTokenAmount
        amount={amount}
        decimals={token.decimals}
        max={token.balance}
        onChange={value => setAmount(value)}
        onMaxClick={() => setAmount(token.balance)} />
      <Button
        onClick={onClick}
        theme={theme}
        disabled={disabled}
        className="shrink-0 capitalize overflow-hidden"
        style={{ width: '152px', paddingLeft: 0, paddingRight: 0 }}>
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div key={label}
            transition={springs.rollin}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }} >
            {label}
          </motion.div>
        </AnimatePresence>          
        </Button>
    </div>
    <div className={`pl-3 font-thin text-xs ${isError ? 'text-charge-yellow' : 'opacity-70'}`}>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div key={subtextKey}
          transition={springs.rollin}
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -40, opacity: 0 }} >
          {subtext}
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
}

export default function InputExecute({ task, className }: { task: Task, className?: string }) {
  return <Provider task={task}><Provided className={className} /></Provider>
}

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

  const {
    task, token, amount, setAmount, 
    needsApproval, approve, execute, amountExecuted, 
    isApproved, isError, error, reset 
  } = useProvider()

  const hasBalance = useMemo(() => task.token.balance > 0n, [task])

  const disabled = useMemo(() => 
    account.isConnected 
    && (!hasBalance || amount === 0n)
  , [account, hasBalance, amount])

  const verbPastTense = useMemo(() => {
    const doc = nlp(task.verb)
    doc.verbs().toPastTense()
    return doc.text()
  }, [task])  

  const label = useMemo(() => {
    if (!account.isConnected) return 'Connect'
    if (needsApproval && !approve.receipt.isLoading) return 'Approve'
    if (approve.receipt.isLoading || execute.receipt.isLoading) return 'Confirming'
    return task.verb
  }, [account, needsApproval, approve, execute, task])

  const subtext = useMemo(() => {
    if (isError) { return {
      key: 'error',
      text: <div>🛑 Error! Please contact support</div>
    }}
    if (approve.receipt.isLoading) { return {
      key: 'approve-confirming',
      text: <div>Confirming approval...</div>
    }}
    if (execute.receipt.isLoading) { return {
      key: 'execute-confirming',
      text: <div>{`Confirming ${task.verb}...`}</div>
    }}
    if ((!needsApproval || isApproved) && execute.receipt.isSuccess) { return {
      key: 'success',
      text: <GreatSuccess hash={execute.hash!} message={`You ${verbPastTense} ${fTokens(amountExecuted, token.decimals)} ${token.symbol}!`} />
    }}
    return {
      key: 'default',
      text: <div>{`You have ${fTokens(token.balance, token.decimals)} ${token.symbol}`}</div>
    }
  }, [needsApproval, isApproved, isError, approve, execute, task, verbPastTense, amountExecuted, token])

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
  }, [account, approve, execute, openConnectModal, needsApproval])

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
        <motion.div key={subtext.key}
          transition={springs.rollin}
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -40, opacity: 0 }} >
          {subtext.text}
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
}

export default function InputExecute({ task, className }: { task: Task, className?: string }) {
  return <Provider task={task}><Provided className={className} /></Provider>
}

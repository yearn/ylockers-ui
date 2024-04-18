import { z } from 'zod'
import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react'
import { UseSimulateContractParameters, useSimulateContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { erc20Abi, zeroAddress } from 'viem'
import { zhexstringSchema } from '@/lib/types'
import { Task } from '.'
import useData, { TokenSchema } from '@/hooks/useData'

export const steps = [
  'Input', 'Approve', 'Execute', 'Done'
] as const

export const StepSchema = z.enum(steps)
export type Step = z.infer<typeof StepSchema>

const setStepSchema = z.function()
.args(StepSchema.or(z.function().args(StepSchema).returns(StepSchema)))
.returns(z.void())

const setAmountSchema = z.function()
.args(z.bigint().or(z.function().args(z.bigint()).returns(z.bigint())))
.returns(z.void())

const contractSimulationStatuses = [
  'error', 'pending', 'success'
] as const
export const ContractSimulationStatusSchema = z.enum(contractSimulationStatuses)

const contractStatuses = [
  'error', 'pending', 'success', 'idle'
] as const
export const ContractStatusSchema = z.enum(contractStatuses)

const contractReceiptStatuses = [
  'error', 'pending', 'success'
] as const
export const ContractReceiptStatusSchema = z.enum(contractReceiptStatuses)

const ContractClientSchema = z.object({
  status: ContractStatusSchema.default('idle'),
  write: z.function().default(() => {}),
  hash: zhexstringSchema.optional(),
  disabled: z.boolean().default(true),
  isIdle: z.boolean().default(true),
  isPending: z.boolean().default(false),
  isSuccess: z.boolean().default(false),
  isError: z.boolean().default(false),
  error: z.string().nullish(),
  simulation: z.object({
    status: ContractSimulationStatusSchema.default('pending'),
    disabled: z.boolean().default(true),
    isPending: z.boolean().default(true),
    isSuccess: z.boolean().default(false),
    isError: z.boolean().default(false),
    error: z.string().nullish(),
  }).default({}),
  receipt: z.object({
    status: ContractReceiptStatusSchema.default('pending'),
    isPending: z.boolean().default(true),
    isSuccess: z.boolean().default(false),
    isError: z.boolean().default(false),
    error: z.string().nullish(),
  }).default({})
})

const ContextSchema = z.object({
  step: StepSchema.default(StepSchema.Enum.Input),
  setStep: setStepSchema.default(() => {}),
  stepForward: z.function().default(() => {}),
  veryFirstStep: z.boolean().default(true),
  firstStep: z.boolean().default(true),
  lastStep: z.boolean().default(false),
  token: TokenSchema.default(TokenSchema.parse({})),
  amount: z.bigint().default(0n),
  setAmount: setAmountSchema.default(() => {}),
  approve: ContractClientSchema.default({}),
  execute: ContractClientSchema.default({}),
  title: z.string().default(''),
  verb: z.string().default(''),
  reset: z.function().default(() => {})
})

type Context = z.infer<typeof ContextSchema>

export const context = createContext<Context>(ContextSchema.parse({ 
  setStep: () => {},
  stepForward: () => {},
  setAmount: () => {},
  approve: { write: () => {} },
  execute: { write: () => {} },
  reset: () => {}
}))

export const useProvider = () => useContext(context)

export default function Provider({ task, children }: { task: Task, children: ReactNode }) {
	const [step, setStep] = useState<Step>(StepSchema.Enum.Input)
  const [veryFirstStep, setVeryFirstStep] = useState(true)
  const firstStep = useMemo(() => steps.indexOf(step) === 0, [step])
  const lastStep = useMemo(() => steps.indexOf(step) === steps.length - 1, [step])
  const { data, refetch, isSuccess } = useData()
  const [amount, setAmount] = useState(0n)

  const token = useMemo(() => {
    if (task.asset === data.asset.address) return data.asset
    if (task.asset === data.locker.address) return data.locker
    return TokenSchema.parse({})
  }, [task, data])

  const stepForward = useCallback(() => {
    setStep(step => {
      const current = steps.indexOf(step)
      const next = (current + 1) % steps.length
      if (steps[next] === 'Approve' && token.allowance >= amount) {
        return steps[next + 1]
      }
      return steps[next]
    })
    setVeryFirstStep(false)
  }, [setStep, token, amount, setVeryFirstStep])

  const simulateApprove = useSimulateContract({
    address: isSuccess ? token.address : zeroAddress,
    abi: erc20Abi,
    functionName: 'approve',
    args: [task.parameters.address!, amount],
    query: { enabled: amount > 0n }
  })

  const _approve = useWriteContract()
  const _approveReceipt = useWaitForTransactionReceipt({ hash: _approve.data })
  const approve = useMemo(() => ({
    write: () => _approve.writeContract(simulateApprove.data!.request),
    hash: _approve.data,
    disabled: !Boolean(simulateApprove.data?.request),
    status: _approve.status,
    isIdle: _approve.isIdle,
    isPending: _approve.isPending,
    isSuccess: _approve.isSuccess,
    isError: _approve.isError,
    error: _approve.error?.toString(),
    simulation: {
      status: simulateApprove.status,
      disabled: amount < 1n,
      isPending: simulateApprove.isPending,
      isSuccess: simulateApprove.isSuccess,
      isError: simulateApprove.isError,
      error: simulateApprove.error?.toString()
    },
    receipt: {
      status: _approveReceipt.status,
      isPending: _approveReceipt.isPending,
      isSuccess: _approveReceipt.isSuccess,
      isError: _approveReceipt.isError,
      error: _approveReceipt.error?.toString()
    }
  }), [_approve, _approveReceipt, simulateApprove, amount])

  const executeContractParameters = useMemo<UseSimulateContractParameters>(() => 
    ({
      ...task.parameters, 
      args: [amount],
      query: { enabled: amount > 0n && token.allowance >= amount }
    }), 
  [amount, task, token])
  
  const simulateExecute = useSimulateContract(executeContractParameters)

  const _execute = useWriteContract()
  const _executeReceipt = useWaitForTransactionReceipt({ hash: _execute.data })
  const execute = useMemo(() => ({
    write: () => _execute.writeContract(simulateExecute.data!.request),
    hash: _execute.data,
    disabled: !Boolean(simulateExecute.data?.request),
    status: _execute.status,
    isIdle: _execute.isIdle,
    isPending: _execute.isPending,
    isSuccess: _execute.isSuccess,
    isError: _execute.isError,
    error: _execute.error?.toString(),
    simulation: {
      status: simulateExecute.status,
      disabled: !(amount > 0n && token.allowance >= amount),
      isPending: simulateExecute.isPending,
      isSuccess: simulateExecute.isSuccess,
      isError: simulateExecute.isError,
      error: simulateExecute.error?.toString()
    },
    receipt: {
      status: _executeReceipt.status,
      isPending: _executeReceipt.isPending,
      isSuccess: _executeReceipt.isSuccess,
      isError: _executeReceipt.isError,
      error: _executeReceipt.error?.toString()
    }
  }), [_execute, _executeReceipt, simulateExecute, amount, token])

  const reset = useCallback(() => {
    setStep(steps[0])
    setAmount(0n)
    _approve.reset()
    _execute.reset()
    refetch()
  }, [setStep, setAmount, _approve, _execute, refetch])

  return <context.Provider value={{ 
    step, 
    setStep, 
    stepForward,
    veryFirstStep,
    firstStep,
    lastStep,
    token,
    amount,
    setAmount,
    approve,
    execute,
    title: task.title,
    verb: task.verb,
    reset
    }}>
		{children}
	</context.Provider>
}

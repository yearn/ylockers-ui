import { z } from 'zod'
import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react'
import { useAccount, useConfig, useSimulateContract, useWriteContract } from 'wagmi'
import env from '@/lib/env'
import { erc20Abi, zeroAddress } from 'viem'
import { useSuspenseQuery } from '@tanstack/react-query'
import { readContractsQueryOptions } from 'wagmi/query'
import { zhexstringSchema } from '@/lib/types'

const tokenSchema = z.object({
  address: zhexstringSchema.default(zeroAddress),
  symbol: z.string().default(''),
  name: z.string().default(''),
  decimals: z.number().default(0),
  balance: z.bigint().default(0n),
  allowance: z.bigint().default(0n)
})

function useToken(address: `0x${string}`) {
  const account = useAccount()

  const multicall = useSuspenseQuery(
    readContractsQueryOptions(useConfig(), { contracts: [
      { address, abi: erc20Abi, functionName: 'symbol' },
      { address, abi: erc20Abi, functionName: 'name' },
      { address, abi: erc20Abi, functionName: 'decimals' },
      { address, abi: erc20Abi, functionName: 'balanceOf', args: [account.address!] },
      { address, abi: erc20Abi, functionName: 'allowance', args: [account.address!, env.YPRISMA_BOOSTED_STAKER]},
      { address: env.PRISMA, abi: erc20Abi, functionName: 'balanceOf', args: [account.address!] },
      { address: env.YPRISMA_BOOSTED_STAKER, abi: erc20Abi, functionName: 'balanceOf', args: [account.address!] }
    ]})
  )

  if (multicall.error) {
    console.warn(multicall.error)
    return { address, ...multicall, data: tokenSchema.parse({})}
  }

  return { address, ...multicall, data: tokenSchema.parse({
    symbol: multicall.data?.[0]?.result,
    name: multicall.data?.[1]?.result,
    decimals: multicall.data?.[2]?.result,
    balance: multicall.data?.[3]?.result,
    allowance: multicall.data?.[4]?.result
  })}
}

export const steps = [
  'Input', 'Approve', 'Confirm', 'Done'
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

const ContractInterfaceSchema = z.object({
  status: ContractStatusSchema.default('idle'),
  write: z.function().default(() => {}),
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
  }).default({})
})

const ContextSchema = z.object({
  step: StepSchema.default(StepSchema.Enum.Input),
  setStep: setStepSchema.default(() => {}),
  stepForward: z.function().default(() => {}),
  token: tokenSchema.default(tokenSchema.parse({})),
  amount: z.bigint().default(0n),
  setAmount: setAmountSchema.default(() => {}),
  approve: ContractInterfaceSchema.default({}),
})

type Context = z.infer<typeof ContextSchema>

export const context = createContext<Context>(ContextSchema.parse({ 
  setStep: () => {},
  stepForward: () => {},
  setAmount: () => {},
  approve: { write: () => {} }
}))

export const useProvider = () => useContext(context)

export default function Provider({children}: {children: ReactNode}) {
	const [step, setStep] = useState<Step>(StepSchema.Enum.Input)
  const { data: token } = useToken(env.YPRISMA)
  const [amount, setAmount] = useState(0n)

  const stepForward = useCallback(() => {
    setStep(step => {
      const current = steps.indexOf(step)
      const next = (current + 1) % steps.length
      return steps[next]
    })
  }, [setStep])

  const simulateApprove = useSimulateContract({
    address: token.address,
    abi: erc20Abi,
    functionName: 'approve',
    args: [env.YPRISMA_BOOSTED_STAKER, amount],
    query: { enabled: amount > 0n }
  })

  const _approve = useWriteContract()
  const approve = useMemo(() => ({
    write: () => _approve.writeContract(simulateApprove.data!.request),
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
    }
  }), [amount, _approve, simulateApprove])

  return <context.Provider value={{ 
    step, 
    setStep, 
    stepForward,
    token,
    amount,
    setAmount,
    approve
    }}>
		{children}
	</context.Provider>
}

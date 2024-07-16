import { createContext, ReactNode, useContext, useMemo } from 'react'
import { erc20Abi } from 'viem'
import { useApproveErc20 } from './hooks/useApproveErc20'
import { useApproveYbsAsInput, useApproveYbsAsOutput } from './hooks/useApproveYbs'
import { useZap } from './hooks/useZap'
import { UseReadContractReturnType, UseSimulateContractReturnType, UseWaitForTransactionReceiptReturnType, UseWriteContractReturnType } from 'wagmi'
import ybsAbi from './abis/ybs'
import { useParameters } from './Parameters'
import { useInputAmountEffect } from './hooks/useInputAmountEffect'

interface Context {
  inputAmountExpanded: bigint
  inputIsYbs: boolean
  outputIsYbs: boolean

  approveErc20: {
    allowance: UseReadContractReturnType<typeof erc20Abi, 'allowance'>
    simulation: UseSimulateContractReturnType
    write: UseWriteContractReturnType
    confirmation: UseWaitForTransactionReceiptReturnType
  }

  approveYbsAsInput: {
    approvedCaller: UseReadContractReturnType<typeof ybsAbi, 'approvedCaller'>
    simulation: UseSimulateContractReturnType
    write: UseWriteContractReturnType
    confirmation: UseWaitForTransactionReceiptReturnType
  }

  approveYbsAsOutput: {
    approvedCaller: UseReadContractReturnType<typeof ybsAbi, 'approvedCaller'>
    simulation: UseSimulateContractReturnType
    write: UseWriteContractReturnType
    confirmation: UseWaitForTransactionReceiptReturnType
  }

  needsErc20Approval: boolean
  needsYbsApproval: boolean
  needsApproval: boolean

  zap: {
    simulation: UseSimulateContractReturnType
    write: UseWriteContractReturnType
    confirmation: UseWaitForTransactionReceiptReturnType
  }

  isVerifying: boolean
  isConfirming: boolean
}

export const context = createContext<Context>({
  inputAmountExpanded: 0n,
  inputIsYbs: false,
  outputIsYbs: false,
  approveErc20: {} as any,
  approveYbsAsInput: {} as any,
  approveYbsAsOutput: {} as any,
  needsErc20Approval: false,
  needsYbsApproval: false,
  needsApproval: false,
  zap: {} as any,
  isVerifying: false,
  isConfirming: false
})

export const useContracts = () => useContext(context)

export default function Contracts({ children }: { children: ReactNode }) {
  useInputAmountEffect()

  const { 
    inputAmountExpanded, inputIsYbs, outputIsYbs
  } = useParameters()

  const approveErc20 = useApproveErc20()
  const approveYbsAsInput = useApproveYbsAsInput()
  const approveYbsAsOutput = useApproveYbsAsOutput()

  const needsErc20Approval = useMemo(() => {
    if (!inputIsYbs && ((approveErc20.allowance.data ?? 0n) < inputAmountExpanded)) return true
    return false
  }, [
    inputAmountExpanded, inputIsYbs, approveErc20
  ])

  const needsYbsApproval = useMemo(() => {
    if (inputIsYbs && approveYbsAsInput.approvedCaller.data !== 3) return true
    if (outputIsYbs && approveYbsAsOutput.approvedCaller.data !== 3) return true
    return false
  }, [
    inputIsYbs, outputIsYbs,
    approveYbsAsInput, approveYbsAsOutput
  ])

  const needsApproval = useMemo(() => needsErc20Approval || needsYbsApproval, [needsErc20Approval, needsYbsApproval])

  const zap = useZap({ needsApproval })

  const isVerifying = useMemo(() => {
    return approveErc20.write.isPending 
    || approveYbsAsInput.write.isPending 
    || approveYbsAsOutput.write.isPending
    || zap.write.isPending
  }, [approveErc20, approveYbsAsInput, approveYbsAsOutput, zap])

  const isConfirming = useMemo(() => {
    return approveErc20.confirmation.isFetching
    || approveYbsAsInput.confirmation.isFetching
    || approveYbsAsOutput.confirmation.isFetching
    || zap.confirmation.isFetching
  }, [approveErc20, approveYbsAsInput, approveYbsAsOutput, zap])

  return <context.Provider value={{
    inputAmountExpanded,
    inputIsYbs, outputIsYbs,
    approveErc20, 
    approveYbsAsInput, 
    approveYbsAsOutput,
    needsErc20Approval, needsYbsApproval, needsApproval, 
    zap, isVerifying, isConfirming
  }}>
    {children}
  </context.Provider>
}

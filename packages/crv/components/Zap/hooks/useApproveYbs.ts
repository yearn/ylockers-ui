import { useAccount, useReadContract, useSimulateContract, UseSimulateContractParameters, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { useParameters } from '../Parameters'
import { zeroAddress } from 'viem'
import ybsAbi from '../abis/ybs'
import { useMemo } from 'react'
import env from '@/lib/env'

export function useApproveYbsAsInput() {
  const { isConnected, address } = useAccount()
  const { inputToken, inputIsYbs } = useParameters()

  const approvedCaller = useReadContract({
    abi: ybsAbi, address: inputToken?.address ?? zeroAddress, functionName: 'approvedCaller', 
    args: [address ?? zeroAddress, env.ZAP],
    query: {
      enabled: isConnected && inputToken !== undefined && inputIsYbs
    }
  })

  const parameters = useMemo<UseSimulateContractParameters>(() => ({
    abi: ybsAbi, address: inputToken?.address ?? zeroAddress, functionName: 'setApprovedCaller',
    args: [env.ZAP, 3],
    query: { 
      enabled: isConnected && inputToken !== undefined && inputIsYbs 
    }
  }), [isConnected, inputToken, inputIsYbs])

  const simulation = useSimulateContract(parameters)
  const write = useWriteContract()
  const confirmation = useWaitForTransactionReceipt({ hash: write.data })

  return { approvedCaller, simulation, write, confirmation }
}

export function useApproveYbsAsOutput() {
  const { isConnected, address } = useAccount()
  const { outputToken, outputIsYbs } = useParameters()

  const approvedCaller = useReadContract({
    abi: ybsAbi, address: outputToken?.address ?? zeroAddress, functionName: 'approvedCaller', 
    args: [address ?? zeroAddress, env.ZAP],
    query: {
      enabled: isConnected && outputToken !== undefined && outputIsYbs
    }
  })

  const parameters = useMemo<UseSimulateContractParameters>(() => ({
    abi: ybsAbi, address: outputToken?.address ?? zeroAddress, functionName: 'setApprovedCaller',
    args: [env.ZAP, 3],
    query: { 
      enabled: isConnected && outputToken !== undefined && outputIsYbs
    }
  }), [isConnected, outputToken, outputIsYbs])

  const simulation = useSimulateContract(parameters)
  const write = useWriteContract()
  const confirmation = useWaitForTransactionReceipt({ hash: write.data })

  return { approvedCaller, simulation, write, confirmation }
}

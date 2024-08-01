import { useAccount, useSimulateContract, UseSimulateContractParameters, useWaitForTransactionReceipt } from 'wagmi'
import { useParameters } from '../Parameters'
import { useEffect, useMemo } from 'react'
import { useWriteContract } from './useWriteContract'
import zapAbi from '../abis/zap'
import { parseUnits, zeroAddress } from 'viem'
import { useMinOut } from './useMinOut'
import env from '@/lib/env'

export function useZap({ needsApproval }: { needsApproval: boolean }) {
  const { isConnected } = useAccount()
  const { inputAmount, inputToken, outputToken } = useParameters()
  const { minOut } = useMinOut()

  const amount = useMemo(() => parseUnits((inputAmount ?? '0'), 18), [inputAmount])

  const enabled = useMemo(
    () => isConnected
      && inputToken !== undefined
      && outputToken !== undefined
      && !needsApproval && amount > 0 && minOut !== undefined,
    [isConnected, inputAmount, inputToken, outputToken, minOut, needsApproval]
  )

  const parameters = useMemo<UseSimulateContractParameters>(() => ({
    abi: zapAbi, address: env.ZAP, functionName: 'zap',
    args: [
      inputToken?.address ?? zeroAddress,
      outputToken?.address ?? zeroAddress,
      amount,
      minOut ?? 1n
    ],
    query: { enabled }
  }), [isConnected, inputAmount, inputToken, outputToken, minOut, needsApproval])

  const simulation = useSimulateContract(parameters)
  const { write } = useWriteContract()
  const confirmation = useWaitForTransactionReceipt({ hash: write.data })

  return { simulation, write, confirmation }
}

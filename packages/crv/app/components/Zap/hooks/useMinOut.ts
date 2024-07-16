import { useMemo } from 'react'
import { useParameters } from '../Parameters'
import { useAccount, useReadContract } from 'wagmi'
import zapAbi from '../abis/zap'
import { parseUnits } from 'viem'
import { compareEvmAddresses, ONE_TO_ONES, TOKENS_MAP } from '../tokens'
import bmath from '@/lib/bmath'
import { DEFAULT_SLIPPAGE, ZAP } from '../constants'

export function useMinOut() {
  const { isConnected } = useAccount()
  const { inputToken, inputAmountExpanded, outputToken } = useParameters()

  const expectedOut = useReadContract({
    abi: zapAbi, address: ZAP, functionName: 'calc_expected_out', 
    args: [
      inputToken.address, 
      outputToken.address, 
      inputAmountExpanded
    ],
    query: {
      enabled: isConnected && inputAmountExpanded > 0,
      refetchInterval: 10_000
    }
  })

  const minOut = useMemo(() => {
    if (expectedOut.isError) {
      console.info('expectedOut.isError')
      console.error(expectedOut.error?.message)
      return undefined
    }

    if (expectedOut.failureCount > 0) {
      console.info('expectedOut.failureCount > 0')
      console.error(expectedOut.failureReason)
      return undefined
    }

    if (expectedOut.data === undefined) return undefined

    const isOneToOne = ONE_TO_ONES.includes(inputToken.address) && ONE_TO_ONES.includes(outputToken.address)
    if (isOneToOne) return expectedOut.data

    if (compareEvmAddresses(outputToken.address, TOKENS_MAP['YBS'].address )) {
      return bmath.mul((1 - DEFAULT_SLIPPAGE), expectedOut.data!) - 1n
    }

    return bmath.mul((1 - DEFAULT_SLIPPAGE), expectedOut.data!)
  }, [expectedOut, inputToken, outputToken])

  return { expectedOut, minOut }
}

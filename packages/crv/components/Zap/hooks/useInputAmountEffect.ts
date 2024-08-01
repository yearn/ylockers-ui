import { useEffect } from 'react'
import { useParameters } from '../Parameters'
import { useMinOut } from './useMinOut'
import { formatUnits } from 'viem'

export function useInputAmountEffect() {
  const { expectedOut, minOut } = useMinOut()
  const { inputAmount, outputToken, setOutputAmount } = useParameters()

  useEffect(() => {
    if (expectedOut.isFetching) return
    if (minOut === undefined || (inputAmount?.length ?? 0) === 0 || outputToken === undefined) {
      setOutputAmount(undefined)
    } else {
      setOutputAmount(formatUnits(minOut, outputToken.decimals))
    }
  }, [expectedOut, minOut, setOutputAmount, inputAmount, outputToken])
}

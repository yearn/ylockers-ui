import { EvmAddressSchema, compareEvmAddresses } from '--lib/tools/types'
import { zeroAddress } from 'viem'
import { useAccount, useReadContract } from 'wagmi'
import abi from './abi'

export const LEGACY_STAKER = EvmAddressSchema.parse(process.env.NEXT_PUBLIC_LEGACY_STAKER ?? zeroAddress)
export const hasLegacyStaker = !compareEvmAddresses(LEGACY_STAKER, zeroAddress)

export function useBalance() {
  const { isConnected, address } = useAccount()
  const { data } = useReadContract({
    address: LEGACY_STAKER, abi,
    functionName: 'balanceOf', args: [address || zeroAddress],
    query: { enabled: hasLegacyStaker && isConnected }
  })
  return (data ?? 0n) as bigint
}

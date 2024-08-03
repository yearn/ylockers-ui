import { EvmAddressSchema, compareEvmAddresses } from '--lib/tools/types'
import { zeroAddress } from 'viem'
import { useAccount, useReadContract } from 'wagmi'
import abi from './abi'

export const LEGACY_STAKER_ADDRESS = EvmAddressSchema.parse(process.env.NEXT_PUBLIC_YPRISMA_OLD_STAKER ?? zeroAddress)
export const hasLegacyStaker = !compareEvmAddresses(LEGACY_STAKER_ADDRESS, zeroAddress)

export function useBalance() {
  const { isConnected, address } = useAccount()
  const { data } = useReadContract({
    address: LEGACY_STAKER_ADDRESS, abi,
    functionName: 'balanceOf', args: [address || zeroAddress],
    query: { enabled: hasLegacyStaker && isConnected }
  })
  return (data ?? 0n) as bigint
}

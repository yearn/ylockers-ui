import { getAddress } from 'viem'
import { z } from 'zod'

export const zhexstring = z.custom<`0x${string}`>((val: any) => /^0x[a-fA-F0-9]*$/.test(val))
export const HexStringSchema = zhexstring.transform(s => s)
export type HexString = z.infer<typeof HexStringSchema>

export const zevmaddressstring = z.custom<`0x${string}`>((val: any) => /^0x[a-fA-F0-9]{40}$/.test(val))
export const EvmAddressSchema = zevmaddressstring.transform(s => getAddress(s))
export type EvmAddress = z.infer<typeof EvmAddressSchema>

export function compareEvmAddresses(a?: string, b?: string) {
  if (!a || !b) return false

  try {
    return EvmAddressSchema.parse(getAddress(a)) === EvmAddressSchema.parse(getAddress(b))
  } catch {
    return false
  }
}

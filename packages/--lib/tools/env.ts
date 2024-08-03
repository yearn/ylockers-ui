import { z } from 'zod'
import { EvmAddressSchema, HexStringSchema } from './types'
import { zeroAddress } from 'viem'

class DotEnvError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DotEnvError'
  }
}

const EnvSchema = z.object({
  LOCKER_NAME: z.string(),
  STABLE_NAME: z.string(),
  PRISMA: EvmAddressSchema,
  YPRISMA: EvmAddressSchema,
  YPRISMA_BOOSTED_STAKER: EvmAddressSchema,
  YPRISMA_BOOSTED_STAKER_UTILITIES: EvmAddressSchema,
  YPRISMA_REWARDS_DISTRIBUTOR: EvmAddressSchema,
  YPRISMA_STRATEGY: EvmAddressSchema,
  YPRISMA_STRATEGY_STRATEGY: EvmAddressSchema,
  YVMKUSD: EvmAddressSchema,
  MKUSD: EvmAddressSchema,
  YDAEMON: z.string(),
  ZAP: EvmAddressSchema,
  USE_UTILITY_VAULT_APR: z.boolean(),
  DEV: z.boolean()
})

const result = EnvSchema.safeParse({
  LOCKER_NAME: process.env.NEXT_PUBLIC_LOCKER_NAME,
  STABLE_NAME: process.env.NEXT_PUBLIC_STABLE_NAME,
  PRISMA: process.env.NEXT_PUBLIC_PRISMA,
  YPRISMA: process.env.NEXT_PUBLIC_YPRISMA,
  YPRISMA_BOOSTED_STAKER: process.env.NEXT_PUBLIC_YPRISMA_BOOSTED_STAKER,
  YPRISMA_BOOSTED_STAKER_UTILITIES: process.env.NEXT_PUBLIC_YPRISMA_BOOSTED_STAKER_UTILITIES,
  YPRISMA_REWARDS_DISTRIBUTOR: process.env.NEXT_PUBLIC_YPRISMA_REWARDS_DISTRIBUTOR,
  YPRISMA_STRATEGY: process.env.NEXT_PUBLIC_YPRISMA_STRATEGY,
  YPRISMA_STRATEGY_STRATEGY: process.env.NEXT_PUBLIC_YPRISMA_STRATEGY_STRATEGY,
  YVMKUSD: process.env.NEXT_PUBLIC_YVMKUSD,
  MKUSD: process.env.NEXT_PUBLIC_MKUSD,
  YDAEMON: process.env.NEXT_PUBLIC_YDAEMON,
  ZAP: process.env.NEXT_PUBLIC_ZAP ?? zeroAddress,
  USE_UTILITY_VAULT_APR: process.env.NEXT_PUBLIC_USE_UTILITY_VAULT_APR === 'true',
  DEV: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
})

if (!result.success) {
  const messages = result.error.errors.map(e => `${e.path} ${e.message}`).join('\n')
  throw new DotEnvError(`\n------------\n\n${messages}\n\n------------\n`)
}

const env = result.data
export default env

import { z } from 'zod'
import { EvmAddressSchema } from './types'
import { zeroAddress } from 'viem'

class DotEnvError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DotEnvError'
  }
}

const EnvSchema = z.object({
  BASE_TOKEN_NAME: z.string(),
  LOCKER_TOKEN_NAME: z.string(),
  LOCKER_TOKEN_VAULT_NAME: z.string(),
  STABLE_TOKEN_NAME: z.string(),
  STABLE_TOKEN_VAULT_NAME: z.string(),

  BASE_TOKEN: EvmAddressSchema,
  LOCKER_TOKEN: EvmAddressSchema,
  LOCKER_TOKEN_VAULT: EvmAddressSchema,
  LOCKER_TOKEN_VAULT_STRATEGY: EvmAddressSchema,
  STABLE_TOKEN: EvmAddressSchema,
  STABLE_TOKEN_VAULT: EvmAddressSchema,

  BOOSTED_STAKER: EvmAddressSchema,
  BOOSTED_STAKER_UTILITIES: EvmAddressSchema,
  REWARDS_DISTRIBUTOR: EvmAddressSchema,

  ZAP: EvmAddressSchema,
  EXIT_POOL: EvmAddressSchema,
  USE_UTILITY_VAULT_APR: z.boolean(),

  YDAEMON: z.string(),
  SMOL_ASSETS_URL: z.string(),

  DEV: z.boolean()
})

const result = EnvSchema.safeParse({
  BASE_TOKEN_NAME: process.env.NEXT_PUBLIC_BASE_TOKEN_NAME,
  LOCKER_TOKEN_NAME: process.env.NEXT_PUBLIC_LOCKER_TOKEN_NAME,
  LOCKER_TOKEN_VAULT_NAME: process.env.NEXT_PUBLIC_LOCKER_TOKEN_VAULT_NAME,
  STABLE_TOKEN_NAME: process.env.NEXT_PUBLIC_STABLE_TOKEN_NAME,
  STABLE_TOKEN_VAULT_NAME: process.env.NEXT_PUBLIC_STABLE_TOKEN_VAULT_NAME,

  BASE_TOKEN: process.env.NEXT_PUBLIC_BASE_TOKEN,
  LOCKER_TOKEN: process.env.NEXT_PUBLIC_LOCKER_TOKEN,
  STABLE_TOKEN: process.env.NEXT_PUBLIC_STABLE_TOKEN,
  STABLE_TOKEN_VAULT: process.env.NEXT_PUBLIC_STABLE_TOKEN_VAULT,

  BOOSTED_STAKER: process.env.NEXT_PUBLIC_BOOSTED_STAKER,
  BOOSTED_STAKER_UTILITIES: process.env.NEXT_PUBLIC_BOOSTED_STAKER_UTILITIES,
  REWARDS_DISTRIBUTOR: process.env.NEXT_PUBLIC_REWARDS_DISTRIBUTOR,

  LOCKER_TOKEN_VAULT: process.env.NEXT_PUBLIC_LOCKER_TOKEN_VAULT,
  LOCKER_TOKEN_VAULT_STRATEGY: process.env.NEXT_PUBLIC_LOCKER_TOKEN_VAULT_STRATEGY,

  ZAP: (process.env.NEXT_PUBLIC_ZAP?.length ?? 0) > 0 ? process.env.NEXT_PUBLIC_ZAP : zeroAddress,
  EXIT_POOL: process.env.NEXT_PUBLIC_EXIT_POOL,
  USE_UTILITY_VAULT_APR: process.env.NEXT_PUBLIC_USE_UTILITY_VAULT_APR === 'true',

  YDAEMON: process.env.NEXT_PUBLIC_YDAEMON,
  SMOL_ASSETS_URL: process.env.NEXT_PUBLIC_SMOL_ASSETS_URL,

  DEV: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
})

if (!result.success) {
  const messages = result.error.errors.map(e => `${e.path} ${e.message}`).join('\n')
  throw new DotEnvError(`\n------------\n\n${messages}\n\n------------\n`)
}

const env = result.data
export default env

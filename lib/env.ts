import { z } from 'zod'
import { zhexstringSchema } from './types'

class DotEnvError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DotEnvError'
  }
}

const EnvSchema = z.object({
  BASE_TOKEN: zhexstringSchema,
  YTOKEN: zhexstringSchema,
  BOOSTED_STAKER: zhexstringSchema,
  BOOSTED_STAKER_UTILITIES: zhexstringSchema,
  OLD_STAKER: zhexstringSchema,
  REWARDS_DISTRIBUTOR: zhexstringSchema,
  YTOKEN_VAULT: zhexstringSchema,
  STABLE_TOKEN_VAULT: zhexstringSchema,
  STABLE_TOKEN: zhexstringSchema,
  YDAEMON: z.string(),
  DEV: z.boolean()
})

const result = EnvSchema.safeParse({
  BASE_TOKEN: process.env.NEXT_PUBLIC_BASE_TOKEN,
  YTOKEN: process.env.NEXT_PUBLIC_YTOKEN,
  BOOSTED_STAKER: process.env.NEXT_PUBLIC_BOOSTED_STAKER,
  BOOSTED_STAKER_UTILITIES: process.env.NEXT_PUBLIC_BOOSTED_STAKER_UTILITIES,
  OLD_STAKER: process.env.NEXT_PUBLIC_OLD_STAKER,
  REWARDS_DISTRIBUTOR: process.env.NEXT_PUBLIC_REWARDS_DISTRIBUTOR,
  YTOKEN_VAULT: process.env.NEXT_PUBLIC_YTOKEN_VAULT,
  STABLE_TOKEN_VAULT: process.env.NEXT_PUBLIC_STABLE_TOKEN_VAULT,
  STABLE_TOKEN: process.env.NEXT_PUBLIC_STABLE_TOKEN,
  YDAEMON: process.env.NEXT_PUBLIC_YDAEMON,
  DEV: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
})

if (!result.success) {
  const messages = result.error.errors.map(e => `${e.path} ${e.message}`).join('\n')
  throw new DotEnvError(`\n------------\n\n${messages}\n\n------------\n`)
}

const env = result.data
export default env

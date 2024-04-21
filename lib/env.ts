import { zhexstringSchema } from './types'

function address(envar: string | undefined) {
  return zhexstringSchema.parse(envar)
}

const env = {
  address,
  PRISMA: address(process.env.NEXT_PUBLIC_PRISMA),
  YPRISMA: address(process.env.NEXT_PUBLIC_YPRISMA),
  YPRISMA_BOOSTED_STAKER: address(process.env.NEXT_PUBLIC_YPRISMA_BOOSTED_STAKER),
  YPRISMA_REWARDS_DISTRIBUTOR: address(process.env.NEXT_PUBLIC_YPRISMA_REWARDS_DISTRIBUTOR),
  YPRISMA_STRATEGY: address(process.env.NEXT_PUBLIC_YPRISMA_STRATEGY),
  YVMKUSD: address(process.env.NEXT_PUBLIC_YVMKUSD),
  YDAEMON: process.env.NEXT_PUBLIC_YDAEMON!,
  DEV: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
}

export default env

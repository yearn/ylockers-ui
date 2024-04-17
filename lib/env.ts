import { zhexstringSchema } from './types'

function address(envar: string | undefined) {
  return zhexstringSchema.parse(envar)
}

const env = {
  address,
  PRISMA: address('0xdA47862a83dac0c112BA89c6abC2159b95afd71C'),
  YPRISMA: address('0xe3668873D944E4A949DA05fc8bDE419eFF543882'),
  YPRISMA_BOOSTED_STAKER: address('0x4c04377f90Eb1E42D845AB21De874803B8773669'),
  DEV: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
}

export default env

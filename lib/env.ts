import { zhexstringSchema } from './types'

function address(envar: string | undefined) {
  return zhexstringSchema.parse(envar)
}

const env = {
  address
}

export default env

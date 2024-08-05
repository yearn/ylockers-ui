import { useMemo } from 'react'
import env from '../tools/env'
import bmath from '../tools/bmath'
import useData from './useData'
import useVault from './useVault'

export function useVaultApy() {
  const { data } = useData()
  const { data: vault } = useVault(env.LOCKER_TOKEN_VAULT)

  const result = useMemo(() => {
    if (env.USE_UTILITY_VAULT_APR) {
      return bmath.toApy(data.utilities.vaultAPR)
    } else {
      const apr = parseFloat(vault?.apr?.forwardAPR.netAPR ?? 0)
      return (1 + (apr / 52)) ** 52 - 1
    }
  }, [data, vault])

  return result
}

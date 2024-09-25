import { useMemo } from 'react'
import bmath from '../tools/bmath'
import useData from './useData'
import useVault from './useVault'
import { TEnv } from '@/tools/envType'

export function useVaultApy(yDaemon: string, env: TEnv) {
  const { data } = useData(yDaemon, env)
  const { data: vault } = useVault(yDaemon, env.lockerTokenVault)

  const result = useMemo(() => {
    if (env.useUtilityVaultApr) {
      return bmath.toApy(data.utilities.vaultAPR)
    } else {
      const apr = parseFloat(vault?.apr?.forwardAPR.netAPR ?? 0)
      return (1 + (apr / 52)) ** 52 - 1
    }
  }, [data.utilities.vaultAPR, env.useUtilityVaultApr, vault?.apr?.forwardAPR.netAPR])

  return result
}

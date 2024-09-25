import { EvmAddress } from './types'

export type TEnv = {
	exitPool: EvmAddress
    baseToken: EvmAddress
    lockerToken: EvmAddress
    baseTokenName: string
    lockerTokenName: string
	stableTokenName: string
    stableTokenVault: EvmAddress
    stableToken: EvmAddress
    lockerTokenVault: EvmAddress
    lockerTokenVaultStrategy: EvmAddress
    boostedStaker: EvmAddress
    rewardsDistributor: EvmAddress
    boostedStakerUtilities: EvmAddress
    useUtilityVaultApr: boolean
}
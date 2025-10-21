import {EvmAddress} from './types';

export type TEnv = {
	exitPool: EvmAddress;
	baseToken: EvmAddress;
	lockerToken: EvmAddress;
	stableTokenVault: EvmAddress;
	stableToken: EvmAddress;
	lockerTokenVault: EvmAddress;
	lockerTokenVaultStrategy: EvmAddress;
	boostedStaker: EvmAddress;
	rewardsDistributor: EvmAddress;
	boostedStakerUtilities: EvmAddress;
	yLockerDrops: EvmAddress;
	baseTokenName: string;
	lockerTokenName: string;
	stableTokenName: string;
	stableTokenVaultName: string;
	useUtilityVaultApr: boolean;
};

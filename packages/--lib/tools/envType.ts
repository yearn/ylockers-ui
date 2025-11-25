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
	baseTokenName: string;
	lockerTokenName: string;
	stableTokenName: string;
	stableTokenVaultName: string;
	useUtilityVaultApr: boolean;
};

export type TCrvEnv = TEnv & {
	yLockerDrops: EvmAddress;
};

export type TYbEnv = TEnv;

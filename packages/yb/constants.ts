import {TEnv} from '--lib/tools/envType';

export const LOCKER_TOKEN_NAME = 'yYB';
export const BASE_TOKEN_NAME = 'YB';
export const STABLE_TOKEN_NAME = 'mkUSD';
export const STABLE_TOKEN_VAULT_NAME = 'ymkUSD-A';
export const LOCKER_TOKEN_VAULT_NAME = 'yvyYB';
export const BOOSTED_STAKER = '0xF4C6e0E006F164535508787873d86b84fe901975';
export const REWARDS_DISTRIBUTOR = '0x2667BA23c782a8DDc31174Ef472a676eb5C709b3';
export const BOOSTED_STAKER_UTILITIES = '0xC4B4CeAF8bF4f2dAD1502457d53D084f20291fAE';
export const LOCKER_TOKEN_VAULT = '0x11AaE8beE9b1Da827C641540D20e4e664677e06F';
export const STABLE_TOKEN_VAULT = '0x04AeBe2e4301CdF5E9c57B01eBdfe4Ac4B48DD13';
export const LOCKER_TOKEN = '0xe3668873D944E4A949DA05fc8bDE419eFF543882';
export const STABLE_TOKEN = '0x4591dbff62656e7859afe5e45f6f47d3669fbb28';
export const EXIT_POOL = '0x69833361991ed76f9e8dbbcdf9ea1520febfb4a7';
export const BASE_TOKEN = '0xdA47862a83dac0c112BA89c6abC2159b95afd71C';
export const SMOL_ASSETS_URL = 'https://assets.smold.app/api';
export const YDAEMON = 'https://ydaemon.yearn.fi';

export const ENV: TEnv = {
	exitPool: EXIT_POOL,
	baseToken: BASE_TOKEN,
	lockerToken: LOCKER_TOKEN,
	stableTokenVault: STABLE_TOKEN_VAULT,
	stableToken: STABLE_TOKEN,
	lockerTokenVault: LOCKER_TOKEN_VAULT,
	lockerTokenVaultStrategy: LOCKER_TOKEN_VAULT,
	boostedStaker: BOOSTED_STAKER,
	rewardsDistributor: REWARDS_DISTRIBUTOR,
	boostedStakerUtilities: BOOSTED_STAKER_UTILITIES,
	baseTokenName: BASE_TOKEN_NAME,
	lockerTokenName: LOCKER_TOKEN_NAME,
	stableTokenName: STABLE_TOKEN_NAME,
	stableTokenVaultName: STABLE_TOKEN_VAULT_NAME,
	useUtilityVaultApr: false
};

import {TEnv} from '--lib/tools/envType';
import {zeroAddress} from 'viem';

export const LOCKER_TOKEN_NAME = 'yYB';
export const BASE_TOKEN_NAME = 'YB';
export const STABLE_TOKEN_NAME = 'yvcrvUSD-2';
export const STABLE_TOKEN_VAULT_NAME = 'yvcrvUSD-2';
export const LOCKER_TOKEN_VAULT_NAME = 'yvyYB';

export const BASE_TOKEN = '0x01791F726B4103694969820be083196cC7c045fF'; // yb
export const LOCKER_TOKEN = '0x22222222aEA0076fCA927a3f44dc0B4FdF9479D6'; // yyb
export const BOOSTED_STAKER = '0x5D2eA33449A60a70E8FCdc5251FDd86a030fAD91'; // ybs
export const REWARDS_DISTRIBUTOR = '0x1d02F6A86Ed5650f93E40FCD62fa5727c32ad746'; // yearn boosted rewards
export const BOOSTED_STAKER_UTILITIES = '0xb70E1CBFf4DFf345b3Aa832CC1C03cA26766AD55'; // utilities
export const YVY_YB = '0xA785dbbb48f6C42bE29DeA00Eb1347b341D681a5'; // yvy yb
export const LP_YYB = '0xe0287cA62fE23f4FFAB827d5448d68aFe6DD9Fd7'; // lp yyb
export const ZAP = '0x1863e6086f3E6d5A57ed696C101349Be30A4598E'; // zap
export const NFT_HELPER = '0x99999990aAA1B07506Cb4eA501B46Ba03D526E95'; // nft helper
export const VE_YB = '0x8235c179E9e84688FBd8B12295EfC26834dAC211'; // ve yb
export const GAUGE_CONTROLLER = '0x1Be14811A3a06F6aF4fA64310a636e1Df04c1c21'; // gauge controller

// TODO: Add the actual addresses
export const LOCKER_TOKEN_VAULT = '0x11AaE8beE9b1Da827C641540D20e4e664677e06F';
export const STABLE_TOKEN_VAULT = '0x04AeBe2e4301CdF5E9c57B01eBdfe4Ac4B48DD13';
export const STABLE_TOKEN = zeroAddress;
export const EXIT_POOL = zeroAddress;

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

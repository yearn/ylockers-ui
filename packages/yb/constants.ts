import {TYbEnv} from '--lib/tools/envType';

const shouldUseTestnet = process.env.NEXT_PUBLIC_USE_TESTNET === 'true';

export const LOCKER_TOKEN_NAME = 'yYB';
export const BASE_TOKEN_NAME = 'YB';
export const STABLE_TOKEN_NAME = 'crvUSD';
export const STABLE_TOKEN_VAULT_NAME = 'yvcrvUSD-2';
export const LOCKER_TOKEN_VAULT_NAME = 'yvyYB';

export const BASE_TOKEN = '0x01791F726B4103694969820be083196cC7c045fF'; // yb
export const LOCKER_TOKEN = '0x22222222aEA0076fCA927a3f44dc0B4FdF9479D6'; // yyb
export const BOOSTED_STAKER = '0x5D2eA33449A60a70E8FCdc5251FDd86a030fAD91'; // ybs
export const REWARDS_DISTRIBUTOR = '0x1d02F6A86Ed5650f93E40FCD62fa5727c32ad746'; // yearn boosted rewards
export const BOOSTED_STAKER_UTILITIES = '0xb70E1CBFf4DFf345b3Aa832CC1C03cA26766AD55'; // utilities
export const YVY_YB = '0x1F6f16945e395593d8050d6Cc33e4328a515B648'; // yvy yb
export const LP_YYB = '0xe0287cA62fE23f4FFAB827d5448d68aFe6DD9Fd7'; // lp yyb
export const ZAP = '0x1863e6086f3E6d5A57ed696C101349Be30A4598E'; // zap
export const NFT_HELPER = '0x99999990aAA1B07506Cb4eA501B46Ba03D526E95'; // nft helper
export const VE_YB = '0x8235c179E9e84688FBd8B12295EfC26834dAC211'; // ve yb
export const GAUGE_CONTROLLER = '0x1Be14811A3a06F6aF4fA64310a636e1Df04c1c21'; // gauge controller
export const STABLE_TOKEN_VAULT = '0xBF319dDC2Edc1Eb6FDf9910E39b37Be221C8805F'; // crvUSD-2 vault
export const EXIT_POOL = '0x5Ee9606e5611Fd6CE14BD2BC12db70BD53dC9daA'; // curve pool
export const LOCKER_MIGRATION = '0x0000000C90799449af8eE0B240Da639144a36C6A'; // yyb locker for migration
export const LOCKER_TOKEN_VAULT = YVY_YB;
export const LOCKER_TOKEN_VAULT_STRATEGY = '0x206CeFd7820d907f9d2c1332349001F7294bf802'; // strategy
export const STABLE_TOKEN = STABLE_TOKEN_VAULT;
export const ORACLE_REGISTRY = '0x1981AD9F44F2EA9aDd2dC4AD7D075c102C70aF92'; // oracle registry

export const SMOL_ASSETS_URL = 'https://assets.smold.app/api';
export const YDAEMON = 'https://ydaemon.yearn.fi';

const MainnetEnv: TYbEnv = {
	oracleRegistry: ORACLE_REGISTRY,
	exitPool: EXIT_POOL,
	baseToken: BASE_TOKEN,
	lockerToken: LOCKER_TOKEN,
	lockerTokenVault: LOCKER_TOKEN_VAULT,
	lockerTokenVaultStrategy: LOCKER_TOKEN_VAULT_STRATEGY,
	lockerMigration: LOCKER_MIGRATION,
	boostedStaker: BOOSTED_STAKER,
	rewardsDistributor: REWARDS_DISTRIBUTOR,
	boostedStakerUtilities: BOOSTED_STAKER_UTILITIES,
	baseTokenName: BASE_TOKEN_NAME,
	lockerTokenName: LOCKER_TOKEN_NAME,
	stableToken: STABLE_TOKEN,
	stableTokenName: STABLE_TOKEN_NAME,
	stableTokenVault: STABLE_TOKEN_VAULT,
	stableTokenVaultName: STABLE_TOKEN_VAULT_NAME,
	useUtilityVaultApr: true
};

const TestnetEnv: TYbEnv = {
	...MainnetEnv,
	lockerTokenVault: '0xA785dbbb48f6C42bE29DeA00Eb1347b341D681a5'
};

export const ENV: TYbEnv = shouldUseTestnet ? TestnetEnv : MainnetEnv;

import { TEnv } from '--lib/tools/envType'

export const LOCKER_TOKEN_NAME = 'yCRV'
export const LOCKER_TOKEN = '0xFCc5c47bE19d06BF83eB04298b026F81069ff65b'
export const STABLE_TOKEN_NAME = 'crvUSD'
export const STABLE_TOKEN = '0xf939E0A03FB07F59A73314E73794Be0E57ac1b4E'
export const STABLE_TOKEN_VAULT = '0xBF319dDC2Edc1Eb6FDf9910E39b37Be221C8805F'
export const BASE_TOKEN = '0xD533a949740bb3306d119CC777fa900bA034cd52'
export const BASE_TOKEN_NAME = 'CRV'
export const STABLE_TOKEN_VAULT_NAME = 'yvcrvUSD'
export const EXIT_POOL = '0x99f5acc8ec2da2bc0771c32814eff52b712de1e5'
export const ZAP = '0x78ada385b15D89a9B845D2Cac0698663F0c69e3C'
export const REWARDS_DISTRIBUTOR = '0xB226c52EB411326CdB54824a88aBaFDAAfF16D3d'
export const LOCKER_TOKEN_VAULT = '0x27B5739e22ad9033bcBf192059122d163b60349D'
export const BOOSTED_STAKER = '0xE9A115b77A1057C918F997c32663FdcE24FB873f'
export const BOOSTED_STAKER_UTILITIES = '0x499099832153c7D3Cd88F9B8B5d6cA59FaC505c3'
export const SMOL_ASSETS_URL = 'https://assets.smold.app/api'
export const YDAEMON = 'https://ydaemon.yearn.fi'

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
  useUtilityVaultApr: true
}
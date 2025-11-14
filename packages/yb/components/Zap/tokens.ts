import {getAddress} from 'viem';
import {z} from 'zod';
import {SMOL_ASSETS_URL} from '../../constants';

export const zevmaddressstring = z.custom<`0x${string}`>((val: string) => /^0x[a-fA-F0-9]{40}$/.test(val));
export const EvmAddressSchema = zevmaddressstring.transform(s => getAddress(s));
export type EvmAddress = z.infer<typeof EvmAddressSchema>;

export function compareEvmAddresses(a?: string, b?: string) {
	if (!a || !b) return false;

	try {
		return EvmAddressSchema.parse(getAddress(a)) === EvmAddressSchema.parse(getAddress(b));
	} catch {
		return false;
	}
}

export const TokenSchema = z.object({
	chainId: z.number(),
	address: EvmAddressSchema,
	symbol: z.string(),
	decimals: z.number(),
	icon: z.string(),
	legacy: z.boolean()
});

export type Token = z.infer<typeof TokenSchema>;

// YB, yYB, st-yYB, lp-yYB, or ybs-yYB
export const TOKENS_MAP: Record<'YB' | 'yYB' | 'yvyYB' | 'lp-yYB' | 'YBS', Token> = {
	YB: {
		// TODO: - adjust
		chainId: 1,
		address: '0xD533a949740bb3306d119CC777fa900bA034cd52',
		symbol: 'YB',
		decimals: 18,
		icon: `${SMOL_ASSETS_URL}/token/1/0xD533a949740bb3306d119CC777fa900bA034cd52/logo-128.png`,
		legacy: false
	},
	yYB: {
		// TODO: - adjust
		chainId: 1,
		address: '0xFCc5c47bE19d06BF83eB04298b026F81069ff65b',
		symbol: 'yYB',
		decimals: 18,
		icon: `${SMOL_ASSETS_URL}/token/1/0xFCc5c47bE19d06BF83eB04298b026F81069ff65b/logo-128.png`,
		legacy: false
	},
	yvyYB: {
		// st-yyb
		// TODO: - adjust
		chainId: 1,
		address: '0xD533a949740bb3306d119CC777fa900bA034cd52',
		symbol: 'yvyYB',
		decimals: 18,
		icon: `${SMOL_ASSETS_URL}/token/1/0xD533a949740bb3306d119CC777fa900bA034cd52/logo-128.png`,
		legacy: false
	},
	'lp-yYB': {
		// TODO: - adjust
		chainId: 1,
		address: '0xD533a949740bb3306d119CC777fa900bA034cd52',
		symbol: 'lp-yYB',
		decimals: 18,
		icon: `${SMOL_ASSETS_URL}/token/1/0xD533a949740bb3306d119CC777fa900bA034cd52/logo-128.png`,
		legacy: false
	},
	YBS: {
		// ybs-yYB
		// TODO: - adjust
		chainId: 1,
		address: '0xD533a949740bb3306d119CC777fa900bA034cd52',
		symbol: 'YBS',
		decimals: 18,
		icon: `${SMOL_ASSETS_URL}/token/1/0xD533a949740bb3306d119CC777fa900bA034cd52/logo-128.png`,
		legacy: false
	}
} as const;

export const TOKENS = Object.values(TOKENS_MAP);

export const INPUTS = [
	TOKENS_MAP['YB'],
	TOKENS_MAP['yYB'],
	TOKENS_MAP['lp-yYB'],
	TOKENS_MAP['yvyYB'],
	TOKENS_MAP['YBS']
];

export const OUTPUTS = [TOKENS_MAP['yvyYB'], TOKENS_MAP['lp-yYB'], TOKENS_MAP['YB'], TOKENS_MAP['YBS']];

export const NO_DEX_NO_SLIPPAGE = [TOKENS_MAP['yYB'].address];

export const PRICE_PROXIES: {[key: string]: string} = {
	'yveCRV-DAO': 'yYB',
	YBS: 'yYB'
};

export const TOKEN_ROUTES: {[key: string]: string[] | undefined} = {
	'yCRV-f v1': ['lp-yCRVv2']
};

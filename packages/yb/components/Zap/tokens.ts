import {getAddress} from 'viem';
import {z} from 'zod';
import {BASE_TOKEN, BOOSTED_STAKER, LOCKER_TOKEN, LP_YYB, SMOL_ASSETS_URL, YVY_YB} from '../../constants';

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
		address: BASE_TOKEN,
		symbol: 'YB',
		decimals: 18,
		icon: '/token/yb.png',
		legacy: false
	},
	yYB: {
		// TODO: - adjust
		chainId: 1,
		address: LOCKER_TOKEN,
		symbol: 'yYB',
		decimals: 18,
		icon: '/token/yyb.png',
		legacy: false
	},
	yvyYB: {
		// st-yyb
		// TODO: - adjust
		chainId: 1,
		address: YVY_YB,
		symbol: 'yvyYB',
		decimals: 18,
		icon: '/token/yvy-yb.png',
		legacy: false
	},
	'lp-yYB': {
		// TODO: - adjust
		chainId: 1,
		address: LP_YYB,
		symbol: 'lp-yYB',
		decimals: 18,
		icon: '/token/lp-yyb.png',
		legacy: false
	},
	YBS: {
		// ybs-yYB
		// TODO: - adjust
		chainId: 1,
		address: BOOSTED_STAKER,
		symbol: 'YBS',
		decimals: 18,
		icon: '/token/ybs-yyb.png',
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

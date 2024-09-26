import {createContext, ReactNode, useCallback, useContext, useMemo, useState} from 'react';
import {compareEvmAddresses, INPUTS, OUTPUTS, Token, TOKENS_MAP} from './tokens';
import {parseUnits} from 'viem';

type Setter<T> = (value: T | ((prev: T) => T)) => void;
type SetToken = Setter<Token | undefined>;
type SetString = Setter<string | undefined>;
type Theme = 'default' | 'transparent' | 'onit';

interface Context {
	inputToken?: Token;
	setInputToken: SetToken;
	inputAmount?: string;
	setInputAmount: SetString;
	inputAmountExpanded: bigint;
	inputIsYbs: boolean;
	outputToken?: Token;
	setOutputToken: SetToken;
	outputAmount?: string;
	setOutputAmount: SetString;
	outputIsYbs: boolean;
	theme?: Theme;
	setTheme: Setter<Theme | undefined>;
	reverse: () => void;
	onZap: () => void;
}

export const context = createContext<Context>({
	inputToken: INPUTS[0],
	setInputToken: () => {},
	inputAmount: undefined,
	setInputAmount: () => {},
	inputAmountExpanded: 0n,
	inputIsYbs: false,
	outputToken: OUTPUTS[0],
	setOutputToken: () => {},
	outputAmount: undefined,
	setOutputAmount: () => {},
	outputIsYbs: false,
	theme: undefined,
	setTheme: () => {},
	reverse: () => {},
	onZap: () => {}
});

export const useParameters = () => useContext(context);

export default function Parameters({
	onZap,
	children
}: {
	onZap?: (inputToken: Token, inputAmount: string, outputToken: Token, outputAmount: string) => void;
	children: ReactNode;
}) {
	const [inputToken, setInputToken] = useState<Token | undefined>(INPUTS[0]);
	const [inputAmount, setInputAmount] = useState<string | undefined>();
	const [outputToken, setOutputToken] = useState<Token | undefined>(OUTPUTS[0]);
	const [outputAmount, setOutputAmount] = useState<string | undefined>();
	const [theme, setTheme] = useState<'default' | 'transparent' | 'onit' | undefined>(undefined);

	const inputAmountExpanded = useMemo(
		() => (inputToken ? parseUnits(inputAmount ?? '0', inputToken.decimals) : 0n),
		[inputAmount, inputToken]
	);
	const inputIsYbs = useMemo(() => compareEvmAddresses(inputToken?.address, TOKENS_MAP['YBS'].address), [inputToken]);
	const outputIsYbs = useMemo(
		() => compareEvmAddresses(outputToken?.address, TOKENS_MAP['YBS'].address),
		[outputToken]
	);

	const reverse = useCallback(() => {
		const inputInOutputs = OUTPUTS.some(t => compareEvmAddresses(t.address, inputToken?.address));
		const outputInInputs = INPUTS.some(t => compareEvmAddresses(t.address, outputToken?.address));
		setInputToken(outputInInputs ? outputToken : undefined);
		setOutputToken(inputInOutputs ? inputToken : undefined);
		setInputAmount(outputAmount);
	}, [inputToken, outputToken, outputAmount]);

	const _onZap = useCallback(() => {
		if (!(inputToken && outputToken)) return;
		onZap?.(inputToken, inputAmount ?? '0', outputToken, outputAmount ?? '0');
	}, [onZap, inputToken, inputAmount, outputToken, outputAmount]);

	return (
		<context.Provider
			value={{
				inputToken,
				setInputToken,
				inputAmount,
				setInputAmount,
				inputAmountExpanded,
				inputIsYbs,
				outputToken,
				setOutputToken,
				outputIsYbs,
				outputAmount,
				setOutputAmount,
				theme,
				setTheme,
				reverse,
				onZap: _onZap
			}}>
			{children}
		</context.Provider>
	);
}

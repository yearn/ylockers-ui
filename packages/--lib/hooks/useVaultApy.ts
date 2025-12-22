import {useMemo} from 'react';
import bmath from '../tools/bmath';
import useData from './useData';
import useVault from './useVault';
import {TEnv} from '../tools/envType';
import {useReadContract} from 'wagmi';
import {formatUnits} from 'viem';
import abis from '../abis';

// yyb vault apr logic
const useStrategyOracleApr = (env: TEnv & {strategyOracle?: `0x${string}`}) => {
	const isYb = env.baseTokenName === 'YB' && !!env?.strategyOracle;
	return useReadContract({
		address: env?.strategyOracle ? env.strategyOracle : undefined,
		abi: abis.StrategyOracle,
		functionName: 'aprAfterDebtChange',
		args: [env.lockerTokenVaultStrategy, 0n],
		query: {
			enabled: isYb,
			select: data => parseFloat(formatUnits(data, 18))
		}
	});
};

export function useVaultApy(yDaemon: string, env: TEnv & {strategyOracle?: `0x${string}`}) {
	const {data} = useData(yDaemon, env);
	const hasStrategyOracle = !!env?.strategyOracle;
	const {data: vault} = useVault(yDaemon, hasStrategyOracle ? undefined : env.lockerTokenVault);
	const {data: strategyOracleApr} = useStrategyOracleApr(env);

	const result = useMemo(() => {
		if (hasStrategyOracle && strategyOracleApr !== undefined) {
			return (1 + strategyOracleApr / 52) ** 52 - 1;
		} else if (env.useUtilityVaultApr) {
			return bmath.toApy(data.utilities.vaultAPR);
		} else {
			const apr = parseFloat(vault?.apr?.forwardAPR.netAPR ?? 0);
			return (1 + apr / 52) ** 52 - 1;
		}
	}, [data.utilities.vaultAPR, env.useUtilityVaultApr, vault?.apr?.forwardAPR.netAPR, strategyOracleApr, hasStrategyOracle]);

	return result;
}

import {useMemo} from 'react';
import {formatUnits, zeroAddress} from 'viem';
import {useReadContract} from 'wagmi';
import abis from '../abis';
import bmath from '../tools/bmath';
import {TYbEnv} from '../tools/envType';
import useData from './useData';
import useVault from './useVault';

const useStrategyOracleApr = (env: TYbEnv) => {
	const {data: strategyOracle} = useReadContract({
		address: env?.oracleRegistry ? env.oracleRegistry : undefined,
		abi: abis.OracleRegistry,
		functionName: 'oracles',
		args: [env.lockerTokenVaultStrategy],
		query: {
			enabled: !!env?.oracleRegistry
		}
	});
	return useReadContract({
		address: strategyOracle ? strategyOracle : undefined,
		abi: abis.StrategyOracle,
		functionName: 'aprAfterDebtChange',
		args: [env.lockerTokenVaultStrategy, 0n],
		query: {
			enabled: strategyOracle !== zeroAddress,
			select: data => parseFloat(formatUnits(data, 18))
		}
	});
};

export function useVaultApy(yDaemon: string, env: TYbEnv) {
	const {data} = useData(yDaemon, env);
	const hasOracleRegistry = !!env?.oracleRegistry;
	const {data: vault} = useVault(yDaemon, hasOracleRegistry ? undefined : env.lockerTokenVault);
	const {data: strategyOracleApr} = useStrategyOracleApr(env);

	const result = useMemo(() => {
		if (env.useUtilityVaultApr) {
			if (!!strategyOracleApr) return (1 + strategyOracleApr / 52) ** 52 - 1;
			return bmath.toApy(data.utilities.vaultAPR);
		} else {
			const apr = parseFloat(vault?.apr?.forwardAPR.netAPR ?? 0);
			return (1 + apr / 52) ** 52 - 1;
		}
	}, [data.utilities.vaultAPR, env.useUtilityVaultApr, vault?.apr?.forwardAPR.netAPR, strategyOracleApr]);

	return result;
}

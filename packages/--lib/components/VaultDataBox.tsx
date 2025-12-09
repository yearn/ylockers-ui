import useData from '../hooks/useData';
import usePrices from '../hooks/usePrices';
import bmath from '../tools/bmath';
import {fPercent, fUSD} from '../tools/format';
import {useMemo} from 'react';
import Tokens from './Tokens';
import {useVaultApy} from '../hooks/useVaultApy';
import {TEnv} from '../tools/envType';

export default function VaultDataBox({yDaemon, env, className}: {yDaemon: string; env: TEnv; className?: string}) {
	const {data: prices} = usePrices(yDaemon, env, [env.lockerToken]);
	const {data} = useData(yDaemon, env);
	const vaultApy = useVaultApy(yDaemon, env);
	const isYb = env.baseTokenName === 'YB';
	const emojiPercentage = isYb ? '💎✨%' : '🌈✨%';
	const balanceInAssets = useMemo(
		() =>
			BigInt(
				bmath.div(data.strategy.balance * data.strategy.pricePerShare, 10n ** BigInt(data.strategy.decimals))
			),
		[data]
	);
	const balanceInAssetsHumanized = useMemo(
		() => bmath.div(balanceInAssets, 10n ** BigInt(data.strategy.decimals)),
		[balanceInAssets, data]
	);
	const balanceInAssetsUsd = useMemo(
		() => balanceInAssetsHumanized * prices[env.lockerToken],
		[balanceInAssetsHumanized, env.lockerToken, prices]
	);
	const vaultTotalAssetsUsd = useMemo(
		() => bmath.priced(data.strategy.totalAssets, data.strategy.decimals, prices[env.lockerToken]),
		[data.strategy.decimals, data.strategy.totalAssets, env.lockerToken, prices]
	);

	return (
		<div className={className}>
			<span className="text-bright-primary font-bold pb-2">ESTIMATED AUTO-COMPOUND APY</span>
			<span className="text-bright-primary text-6xl font-bold font-mono mb-[26px]">
				{vaultApy > 0 ? (
					fPercent(vaultApy)
				) : (
					<span title="APR will show when migration period ends after first week.">{emojiPercentage}</span>
				)}
			</span>
			<div className="border-t-2 border-deeper-primary/60 my-4 flex flex-col space-y-2">
				<span className="font-semibold py-4 text-lg">YOUR DEPOSITS</span>
				<div className="flex justify-between">
					<span className="font-thin opacity-70">{env.lockerTokenName} Deposited</span>
					<Tokens
						className="font-bold"
						amount={balanceInAssets}
						decimals={data.strategy.decimals}
					/>
				</div>
				<div className="flex justify-between">
					<span className="font-thin opacity-70 mb-4">USD Value</span>
					<span className="font-bold font-mono">{fUSD(balanceInAssetsUsd)}</span>
				</div>
				<div className="font-semibold py-4 text-lg border-t-2 border-deeper-primary/60">TOTAL DEPOSITS</div>
				<div className="flex justify-between">
					<span className="font-thin opacity-70">{env.lockerTokenName} Deposited</span>
					<Tokens
						className="font-bold"
						amount={data.strategy.totalAssets}
						decimals={data.strategy.decimals}
					/>
				</div>
				<div className="flex justify-between">
					<span className="font-thin opacity-70">USD Value</span>
					<span className="font-bold font-mono">{fUSD(vaultTotalAssetsUsd, {full: false})}</span>
				</div>
			</div>
		</div>
	);
}

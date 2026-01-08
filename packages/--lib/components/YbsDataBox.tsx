import {formatUnits} from 'viem';
import {fPercent} from '../tools/format';
import bmath from '../tools/bmath';
import Tokens from './Tokens';
import useData from '../hooks/useData';
import {useMemo} from 'react';
import {MdInfo, MdArrowRightAlt} from 'react-icons/md';
import {HoverCard, HoverCardContent, HoverCardTrigger} from '../components/shadcn/hover-card';
import {TEnv} from '../tools/envType';

const formatAprRangeValue = (value: bigint) => {
	const apr = parseFloat(formatUnits(value, 18));
	if (!Number.isFinite(apr)) return fPercent(0, 0);
	const integerDigits = Math.max(1, `${Math.floor(Math.abs(apr * 100))}`.length);
	const decimals = Math.min(2, Math.max(0, 4 - integerDigits));
	return fPercent(apr, decimals);
};

export default function YbsDataBox({yDaemon, env, className}: {yDaemon: string; env: TEnv; className?: string}) {
	const {data} = useData(yDaemon, env);
	const isYb = env.baseTokenName === 'YB';
	const emojiPercentage = isYb ? '💎✨%' : '🌈✨%';

	const ybsGlobalAverageApr = useMemo(() => {
		const result = data.utilities.globalAverageApr;
		if (result === 0n)
			return <span title="APR will show when migration period ends after first week.">{emojiPercentage}</span>;
		return <span className="font-mono">{fPercent(parseFloat(formatUnits(result, 18)))}</span>;
	}, [data]);

	const ybsUserActiveApr = useMemo(() => {
		return <span className="font-mono">{fPercent(parseFloat(formatUnits(data.utilities.userActiveApr, 18)))}</span>;
	}, [data]);

	const ybsUserProjectedApr = useMemo(() => {
		return (
			<span className="font-mono">{fPercent(parseFloat(formatUnits(data.utilities.userProjectedApr, 18)))}</span>
		);
	}, [data]);

	const activeApr = useMemo(() => {
		const result = data.utilities.globalMinMaxActiveApr;

		const min =
			result.min === 0n ? (
				<span title="APR will show when migration period ends after first week.">{emojiPercentage}</span>
			) : (
				formatAprRangeValue(result.min)
			);

		const max =
			result.max === 0n ? (
				<span title="APR will show when migration period ends after first week.">{emojiPercentage}</span>
			) : (
				formatAprRangeValue(result.max)
			);

		return {min, max};
	}, [data]);

	const projectedApr = useMemo(() => {
		const result = data.utilities.globalMinMaxProjectedApr;

		const min =
			result.min === 0n ? (
				<span title="APR will show when migration period ends after first week.">{emojiPercentage}</span>
			) : (
				formatAprRangeValue(result.min)
			);

		const max =
			result.max === 0n ? (
				<span title="APR will show when migration period ends after first week.">{emojiPercentage}</span>
			) : (
				formatAprRangeValue(result.max)
			);

		return {min, max};
	}, [data]);

	return (
		<div className={className}>
			<div className="flex items-center justify-between pb-2 text-bright-primary font-bold">
				<span>ACTIVE APR</span>
				<span>
					<HoverCard>
						<HoverCardTrigger>
							<div className="p-0">
								<MdInfo size={20} />
							</div>
						</HoverCardTrigger>
						<HoverCardContent>
							<div className="flex flex-col gap-2">
								<p>
									Displayed APR ranges represent expected values for users with minimum (1x) through
									maximum (2.5x) staking boost.
								</p>
								<div>
									<span className="text-white">Active APR:</span> based on rewards distributed in
									current week.
								</div>
								<div>
									<span className="text-white">Projected APR:</span> based on rewards to be
									distributed in upcoming week.
								</div>
							</div>
						</HoverCardContent>
					</HoverCard>
				</span>
			</div>
			<span className="flex items-center justify-between gap-3 whitespace-nowrap mb-[26px] text-bright-primary text-4xl font-bold">
				<span className="font-mono">{activeApr.min}</span>
				<MdArrowRightAlt />
				<span className="font-mono">{activeApr.max}</span>
			</span>

			{(!isYb ||
				data.utilities.globalMinMaxProjectedApr.min !== 0n ||
				data.utilities.globalMinMaxProjectedApr.max !== 0n) && (
				<div className="flex items-end justify-between gap-2">
					<span className="text-bright-primary">Projected APR</span>
					<span className="flex items-center gap-2 whitespace-nowrap text-bright-primary">
						<span className="font-mono">{projectedApr.min}</span>
						<MdArrowRightAlt />
						<span className="font-mono">{projectedApr.max}</span>
					</span>
				</div>
			)}

			<div className="my-4 flex flex-col space-y-2">
				<div className="border-t-2 border-deeper-primary/60 flex justify-between items-center py-4">
					<span className="font-semibold text-lg">YOUR POSITION</span>
					<span className="font-bold font-mono px-2 py-1 bg-disabled-bg rounded-lg text-boost-primary">
						{Number(formatUnits(data.utilities.userActiveBoostMultiplier, 18)) > 0
							? Number(formatUnits(data.utilities.userActiveBoostMultiplier, 18)).toFixed(2)
							: formatUnits(data.utilities.userActiveBoostMultiplier, 18)}
						x BOOST
					</span>
				</div>
				<div className="flex justify-between w-full">
					<span className="font-thin opacity-70	w">{env.lockerTokenName} Staked</span>
					<Tokens
						className="font-bold"
						amount={data.staker.balance}
						decimals={data.staker.decimals}
					/>
				</div>
				<div className="flex justify-between">
					<span className="font-thin opacity-70	">Your APR</span>
					<span className="font-bold font-mono">{ybsUserActiveApr}</span>
				</div>
				<div className="flex justify-between">
					<span className="font-thin opacity-70	">Claimable {env.stableTokenVaultName}</span>
					<Tokens
						className="font-bold"
						amount={data.rewards.claimable}
						decimals={data.rewards.decimals}
					/>
				</div>

				<div className="flex justify-between">
					<span className="font-thin opacity-70	">Projected boost</span>
					<span className="font-mono">
						{Number(formatUnits(data.utilities.userProjectedBoostMultiplier, 18)) > 0
							? Number(formatUnits(data.utilities.userProjectedBoostMultiplier, 18)).toFixed(6)
							: formatUnits(data.utilities.userProjectedBoostMultiplier, 18)}
						x
					</span>
				</div>
				{(!isYb || data.utilities.userProjectedApr !== 0n) && (
					<div className="flex justify-between">
						<span className="font-thin opacity-70	">Projected APR</span>
						<span className="font-bold font-mono">{ybsUserProjectedApr}</span>
					</div>
				)}
			</div>
			<div className="border-t-2 border-deeper-primary/60 flex flex-col space-y-2">
				<span className="font-semibold py-4 text-lg">YEARN BOOSTED STAKER</span>
				<div className="flex justify-between">
					<span className="font-thin opacity-70	">{env.lockerTokenName} Staked</span>
					<Tokens
						className="font-bold"
						amount={data.staker.totalSupply}
						decimals={data.staker.decimals}
					/>
				</div>
				<div className="flex justify-between">
					<span className="font-thin opacity-70	">Rewards this week ({env.stableTokenName})</span>
					<Tokens
						className="font-bold"
						amount={bmath.mulWad(data.utilities.weeklyRewardAmount, data.rewards.vaultPricePerShare)}
						decimals={18}
					/>
				</div>
				<div className="flex justify-between">
					<span className="font-thin opacity-70">Average APR</span>
					<span className="font-bold">{ybsGlobalAverageApr}</span>
				</div>
			</div>
		</div>
	);
}

import { formatUnits } from 'viem'
import { fPercent } from '../tools/format'
import Tokens from './Tokens'
import useData from '../hooks/useData'
import { useMemo } from 'react'
import env from '../tools/env'
import { MdInfo, MdArrowRightAlt } from 'react-icons/md'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../components/shadcn/hover-card"


export default function YbsDataBox({
  className
}: {
  className?: string
}) {
  const { data } = useData()

  const ybsGlobalAverageApr = useMemo(() => {
    const result = data.utilities.globalAverageApr
    if (result === 0n) return <span title="APR will show when migration period ends after first week.">🌈✨%</span>
    return <span className="font-mono">{fPercent(parseFloat(formatUnits(result, 18)))}</span>
  }, [data])

  const ybsUserActiveApr = useMemo(() => {
    return <span className="font-mono">{fPercent(parseFloat(formatUnits(data.utilities.userActiveApr, 18)))}</span>    
  }, [data])

  const ybsUserProjectedApr = useMemo(() => {
    return <span className="font-mono">{fPercent(parseFloat(formatUnits(data.utilities.userProjectedApr, 18)))}</span>    
  }, [data])

  const activeApr = useMemo(() => {
    const result = data.utilities.globalMinMaxActiveApr

    const min = result.min === 0n 
    ? <span title="APR will show when migration period ends after first week.">🌈✨%</span> 
    : fPercent(parseFloat(formatUnits(result.min, 18)))

    const max = result.max === 0n
    ? <span title="APR will show when migration period ends after first week.">🌈✨%</span>
    : fPercent(parseFloat(formatUnits(result.max, 18)))

    return { min, max }
  }, [data])

  const projectedApr = useMemo(() => {
    const result = data.utilities.globalMinMaxProjectedApr

    const min = result.min === 0n
    ? <span title="APR will show when migration period ends after first week.">🌈✨%</span> 
    : fPercent(parseFloat(formatUnits(result.min, 18)))

    const max = result.max === 0n
    ? <span title="APR will show when migration period ends after first week.">🌈✨%</span>
    : fPercent(parseFloat(formatUnits(result.max, 18)))

    return { min, max }
  }, [data])

  return <div className={className}>
    <div className="flex items-center justify-between pb-2 text-light-blue font-bold">
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
              <div>
                <span className="text-white">Active APR</span> - The min through max active apr copy here
              </div>
              <div>
                <span className="text-white">Projected APR</span> - The min through max projected apr copy here
              </div>
              <div>
                <span className="text-white">And so on</span> - The and so on copy here
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </span>
    </div>
    <span className="flex items-center justify-between gap-3 whitespace-nowrap mb-[26px] text-light-blue text-4xl font-bold">
      <span className="font-mono">{activeApr.min}</span>
      <MdArrowRightAlt />
      <span className="font-mono">{activeApr.max}</span>
    </span>

    <div className="flex items-end justify-between gap-2">
      <span className="text-light-blue">Projected APR</span>
      <span className="flex items-center gap-2 whitespace-nowrap text-light-blue">
        <span className="font-mono">{projectedApr.min}</span>
        <MdArrowRightAlt />
        <span className="font-mono">{projectedApr.max}</span>
      </span>
    </div>

    <div className="my-4 flex flex-col space-y-2">
      <div className="border-t-2 border-soft-blue flex justify-between items-center py-4">
        <span className="font-semibold text-lg">YOUR POSITION</span>
        <span className="font-bold font-mono px-2 py-1 bg-disabled-bg rounded-lg text-boost-blue">
          {formatUnits(data.utilities.userActiveBoostMultiplier, 18)}x BOOST
        </span>
      </div>
      <div className="flex justify-between w-full">
        <span className="font-thin opacity-70	w">{env.LOCKER_NAME} Staked</span>
        <Tokens className="font-bold" amount={data.staker.balance} decimals={data.staker.decimals} />
      </div>
      <div className="flex justify-between">
        <span className="font-thin opacity-70	">Your APR</span>
        <span className="font-bold font-mono">{ybsUserActiveApr}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-thin opacity-70	">Claimable Rewards</span>
        <Tokens className="font-bold" amount={data.rewards.claimable} decimals={data.rewards.decimals} suffix={env.STABLE_NAME} />
      </div>

      <div className="flex justify-between">
        <span className="font-thin opacity-70	">Projected boost</span>
        <span className="font-mono">{formatUnits(data.utilities.userProjectedBoostMultiplier, 18)}x</span>
      </div>
      <div className="flex justify-between">
        <span className="font-thin opacity-70	">Projected APR</span>
        <span className="font-bold font-mono">{ybsUserProjectedApr}</span>
      </div>

    </div>
    <div className="border-t-2 border-soft-blue flex flex-col space-y-2">
      <span className="font-semibold py-4 text-lg">YEARN BOOSTED STAKER</span>
      <div className="flex justify-between">
        <span className="font-thin opacity-70	">{env.LOCKER_NAME} Staked</span>
        <Tokens className="font-bold" amount={data.staker.totalSupply} decimals={data.staker.decimals} />
      </div>
      <div className="flex justify-between">
        <span className="font-thin opacity-70	">Rewards this week</span>
        <Tokens className="font-bold" amount={data.utilities.weeklyRewardAmount} decimals={18} suffix={env.STABLE_NAME} />
      </div>
      <div className="flex justify-between">
        <span className="font-thin opacity-70">Average APR</span>
        <span className="font-bold">{ybsGlobalAverageApr}</span>
      </div>
    </div>
  </div>
}

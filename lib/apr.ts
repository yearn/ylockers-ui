import { useContractRead } from 'wagmi';
import { erc20Abi } from 'viem';
import env from "@/lib/env";
import abis from "@/app/abis";
import bmath from "@/lib/bmath";

export function useAverageApr(totalSupply: bigint, yPrismaPrice: number, yvmkUsdPrice: number) {
  const { data: currentWeek } = useContractRead({
    address: env.YPRISMA_REWARDS_DISTRIBUTOR,
    abi: abis.SingleTokenRewardDistributor,
    functionName: 'getWeek',
  });

  const lastWeek = currentWeek && currentWeek > 0 ? currentWeek - 1 : 0;

  const { data: lastWeekAmount } = useContractRead({
    address: env.YPRISMA_REWARDS_DISTRIBUTOR,
    abi: abis.SingleTokenRewardDistributor,
    functionName: 'weeklyRewardAmount',
    args: [lastWeek],
  });

  if (!lastWeekAmount) return 0;

  const averageRewards = bmath.div(lastWeekAmount, totalSupply);
  const averageRewardsUsd = bmath.mul(averageRewards, yvmkUsdPrice);
  const capitalValue = bmath.mul(yPrismaPrice, bmath.div(totalSupply, 1e18));

  return bmath.mul(bmath.div(averageRewardsUsd, capitalValue), 52);
}

export function useAccountApr(account: string, balance: bigint, totalSupply: bigint, yPrismaPrice: number, yvmkUsdPrice: number) {
  const { data: currentWeek } = useContractRead({
    address: env.YPRISMA_REWARDS_DISTRIBUTOR,
    abi: abis.SingleTokenRewardDistributor,
    functionName: 'getWeek',
  });

  const lastWeek = currentWeek && currentWeek > 0 ? currentWeek - 1 : 0;

  const { data: lastWeekAmount } = useContractRead({
    address: env.YPRISMA_REWARDS_DISTRIBUTOR,
    abi: abis.SingleTokenRewardDistributor,
    functionName: 'weeklyRewardAmount',
    args: [lastWeek],
  });

  const { data: ybsDecimals } = useContractRead({
    address: env.YPRISMA_BOOSTED_STAKER,
    abi: abis.YearnBoostedStaker,
    functionName: 'decimals',
  });

  const { data: userShare } = useContractRead({
    address: env.YPRISMA_BOOSTED_STAKER,
    abi: abis.YearnBoostedStaker,
    functionName: 'getAccountWeightRatioAt',
    args: [account, lastWeek],
  });

  if (!lastWeekAmount || !ybsDecimals || !userShare) return 0;

  const userRewards = bmath.div(bmath.mul(lastWeekAmount, bmath.div(userShare, 10n ** ybsDecimals)), 1e18);
  const userRewardsUsd = bmath.mul(userRewards, yvmkUsdPrice);
  const capitalValue = bmath.mul(yPrismaPrice, bmath.div(balance, 1e18));

  return bmath.mul(bmath.div(userRewardsUsd, capitalValue), 52);
}
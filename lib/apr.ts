import { useContractReads } from 'wagmi';
import { erc20Abi } from 'viem';
import env from "@/lib/env";
import abis from "@/app/abis";
import bmath from "@/lib/bmath";

export function useAverageApr(totalSupply: bigint, yPrismaPrice: number, yvmkUsdPrice: number) {
  const { data: weekData } = useContractReads({
    contracts: [
      {
        address: env.YPRISMA_REWARDS_DISTRIBUTOR,
        abi: abis.SingleTokenRewardDistributor,
        functionName: 'getWeek',
      },
    ],
    enabled: !!env.YPRISMA_REWARDS_DISTRIBUTOR,
  });

  const currentWeek = weekData?.[0] ?? 0;
  const lastWeek = currentWeek > 0 ? currentWeek - 1 : 0;

  const { data: rewardData } = useContractReads({
    contracts: [
      {
        address: env.YPRISMA_REWARDS_DISTRIBUTOR,
        abi: abis.SingleTokenRewardDistributor,
        functionName: 'weeklyRewardAmount',
        args: [lastWeek],
      },
    ],
    enabled: !!env.YPRISMA_REWARDS_DISTRIBUTOR && !!lastWeek,
  });

  const lastWeekAmount = rewardData?.[0] ?? 0n;

  const averageRewards = bmath.div(lastWeekAmount, totalSupply);
  const averageRewardsUsd = bmath.mul(averageRewards, yvmkUsdPrice);
  const capitalValue = bmath.mul(yPrismaPrice, bmath.div(totalSupply, 1e18));

  return bmath.mul(bmath.div(averageRewardsUsd, capitalValue), 52);
}

export function useAccountApr(account: string, balance: bigint, totalSupply: bigint, yPrismaPrice: number, yvmkUsdPrice: number) {
  const { data: weekData } = useContractReads({
    contracts: [
      {
        address: env.YPRISMA_REWARDS_DISTRIBUTOR,
        abi: abis.SingleTokenRewardDistributor,
        functionName: 'getWeek',
      },
    ],
    enabled: !!env.YPRISMA_REWARDS_DISTRIBUTOR,
  });

  const currentWeek = weekData?.[0] ?? 0;
  const lastWeek = currentWeek > 0 ? currentWeek - 1 : 0;

  const { data: rewardData } = useContractReads({
    contracts: [
      {
        address: env.YPRISMA_REWARDS_DISTRIBUTOR,
        abi: abis.SingleTokenRewardDistributor,
        functionName: 'weeklyRewardAmount',
        args: [lastWeek],
      },
      {
        address: env.YPRISMA_BOOSTED_STAKER,
        abi: abis.YearnBoostedStaker,
        functionName: 'decimals',
      },
      {
        address: env.YPRISMA_BOOSTED_STAKER,
        abi: abis.YearnBoostedStaker,
        functionName: 'getAccountWeightRatioAt',
        args: [account, lastWeek],
      },
    ],
    enabled: !!env.YPRISMA_REWARDS_DISTRIBUTOR && !!env.YPRISMA_BOOSTED_STAKER && !!lastWeek,
  });

  const lastWeekAmount = rewardData?.[0] ?? 0n;
  const ybsDecimals = rewardData?.[1] ?? 0n;
  const userShare = rewardData?.[2] ?? 0n;

  const userRewards = bmath.div(bmath.mul(lastWeekAmount, bmath.div(userShare, 10n ** ybsDecimals)), 1e18);
  const userRewardsUsd = bmath.mul(userRewards, yvmkUsdPrice);
  const capitalValue = bmath.mul(yPrismaPrice, bmath.div(balance, 1e18));

  return bmath.mul(bmath.div(userRewardsUsd, capitalValue), 52);
}
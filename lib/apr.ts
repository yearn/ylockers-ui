import { useContractReads } from 'wagmi';
import { erc20Abi } from 'viem';
import env from "@/lib/env";
import abis from "@/app/abis";
import bmath from "@/lib/bmath";

export function computeAverageApr(totalSupply: bigint, yPrismaPrice: number, yvmkUsdPrice: number) {
  const { data } = useContractReads({
    contracts: [
      {
        address: env.YPRISMA_REWARDS_DISTRIBUTOR,
        abi: abis.SingleTokenRewardDistributor,
        functionName: 'getWeek',
      },
    ],
  });

  const lastWeek = data?.[0]?.result ? data[0].result - 1 : 0;

  const { data: rewardData } = useContractReads({
    contracts: [
      {
        address: env.YPRISMA_REWARDS_DISTRIBUTOR,
        abi: abis.SingleTokenRewardDistributor,
        functionName: 'weeklyRewardAmount',
        args: [lastWeek],
      },
    ],
  });

  const lastWeekAmount = rewardData?.[0]?.result ?? 0n;
  const averageRewards = bmath.div(lastWeekAmount, totalSupply);
  const averageRewardsUsd = averageRewards * yvmkUsdPrice;
  const capitalValue = yPrismaPrice * bmath.div(totalSupply, 1e18);

  return (averageRewardsUsd / capitalValue) * 52;
}

export function computeAccountApr(account: string, balance: bigint, totalSupply: bigint, yPrismaPrice: number, yvmkUsdPrice: number) {
  const { data } = useContractReads({
    contracts: [
      {
        address: env.YPRISMA_REWARDS_DISTRIBUTOR,
        abi: abis.SingleTokenRewardDistributor,
        functionName: 'getWeek',
      },
    ],
  });

  const lastWeek = data?.[0]?.result ? data[0].result - 1 : 0;

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
  });

  const lastWeekAmount = rewardData?.[0]?.result ?? 0n;
  const ybsDecimals = rewardData?.[1]?.result ?? 0n;
  const userShare = bmath.div(rewardData?.[2]?.result ?? 0n, 10n ** ybsDecimals);
  const userRewards = bmath.div(lastWeekAmount * userShare, 1e18);

  const userRewardsUsd = userRewards * yvmkUsdPrice;
  const capitalValue = yPrismaPrice * bmath.div(balance, 1e18);

  return (userRewardsUsd / capitalValue) * 52;
}
import { useContractReads } from 'wagmi';
import { erc20Abi } from 'viem';
import env from "@/lib/env";
import abis from "@/app/abis";
import bmath from "@/lib/bmath";

export function useAverageApr(totalSupply: bigint, yPrismaPrice: number, yvmkUsdPrice: number) {
  const { data } = useContractReads({
    contracts: [
      {
        address: env.YPRISMA_REWARDS_DISTRIBUTOR,
        abi: abis.SingleTokenRewardDistributor,
        functionName: 'getWeek',
      },
      {
        address: env.YPRISMA_REWARDS_DISTRIBUTOR,
        abi: abis.SingleTokenRewardDistributor,
        functionName: 'weeklyRewardAmount',
        args: [data?.[0]?.result ? data[0].result - 1 : 0],
      },
    ],
  });

  const lastWeekAmount = data?.[1]?.result ?? 0n;
  const averageRewards = bmath.div(lastWeekAmount, totalSupply);
  const averageRewardsUsd = bmath.mul(averageRewards, yvmkUsdPrice);
  const capitalValue = bmath.mul(yPrismaPrice, bmath.div(totalSupply, 1e18));

  return bmath.mul(bmath.div(averageRewardsUsd, capitalValue), 52);
}

export function useAccountApr(account: string, balance: bigint, totalSupply: bigint, yPrismaPrice: number, yvmkUsdPrice: number) {
  const { data } = useContractReads({
    contracts: [
      {
        address: env.YPRISMA_REWARDS_DISTRIBUTOR,
        abi: abis.SingleTokenRewardDistributor,
        functionName: 'getWeek',
      },
      {
        address: env.YPRISMA_REWARDS_DISTRIBUTOR,
        abi: abis.SingleTokenRewardDistributor,
        functionName: 'weeklyRewardAmount',
        args: [data?.[0]?.result ? data[0].result - 1 : 0],
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
        args: [account, data?.[0]?.result ? data[0].result - 1 : 0],
      },
    ],
  });

  const lastWeekAmount = data?.[1]?.result ?? 0n;
  const ybsDecimals = data?.[2]?.result ?? 0n;
  const userShare = bmath.div(data?.[3]?.result ?? 0n, 10n ** ybsDecimals);
  const userRewards = bmath.div(bmath.mul(lastWeekAmount, userShare), 1e18);

  const userRewardsUsd = bmath.mul(userRewards, yvmkUsdPrice);
  const capitalValue = bmath.mul(yPrismaPrice, bmath.div(balance, 1e18));

  return bmath.mul(bmath.div(userRewardsUsd, capitalValue), 52);
}
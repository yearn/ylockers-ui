import { Contract } from "viem";
import env from "@/lib/env";
import abis from "@/app/abis";

export function computeAverageApr(totalSupply: bigint, yPrismaPrice: number, yvmkUsdPrice: number) {
  const rewardsDistributor = new Contract(env.YPRISMA_REWARDS_DISTRIBUTOR, abis.SingleTokenRewardDistributor);
  const lastWeek = rewardsDistributor.getWeek() - 1;
  const lastWeekAmount = rewardsDistributor.weeklyRewardAmount(lastWeek);

  const averageRewards = lastWeekAmount / totalSupply;
  const averageRewardsUsd = averageRewards * yvmkUsdPrice;
  const capitalValue = yPrismaPrice * (Number(totalSupply) / 1e18);

  return (averageRewardsUsd / capitalValue) * 52;
}

export function computeAccountApr(account: string, balance: bigint, totalSupply: bigint, yPrismaPrice: number, yvmkUsdPrice: number) {
  const rewardsDistributor = new Contract(env.YPRISMA_REWARDS_DISTRIBUTOR, abis.SingleTokenRewardDistributor);
  const lastWeek = rewardsDistributor.getWeek() - 1;
  const lastWeekAmount = rewardsDistributor.weeklyRewardAmount(lastWeek);

  const ybs = new Contract(env.YPRISMA_BOOSTED_STAKER, abis.YearnBoostedStaker);
  const userShare = ybs.getAccountWeightRatioAt(account, lastWeek) / 10 ** ybs.decimals();
  const userRewards = lastWeekAmount * userShare;

  const userRewardsUsd = userRewards * yvmkUsdPrice;
  const capitalValue = yPrismaPrice * (Number(balance) / 1e18);

  return (userRewardsUsd / capitalValue) * 52;
}
const abi = [{"type":"constructor","inputs":[{"name":"_staker","type":"address","internalType":"contract IYearnBoostedStaker"},{"name":"_rewardToekn","type":"address","internalType":"contract IERC20"},{"name":"_owner","type":"address","internalType":"address"}],"stateMutability":"nonpayable"},{"type":"function","name":"START_TIME","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"START_WEEK","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"accountClaimWeek","inputs":[{"name":"account","type":"address","internalType":"address"}],"outputs":[{"name":"week","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"accountInfo","inputs":[{"name":"account","type":"address","internalType":"address"}],"outputs":[{"name":"recipient","type":"address","internalType":"address"},{"name":"lastClaimWeek","type":"uint64","internalType":"uint64"}],"stateMutability":"view"},{"type":"function","name":"approvedClaimer","inputs":[{"name":"account","type":"address","internalType":"address"},{"name":"claimer","type":"address","internalType":"address"}],"outputs":[{"name":"approved","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"claim","inputs":[],"outputs":[{"name":"amountClaimed","type":"uint256","internalType":"uint256"}],"stateMutability":"nonpayable"},{"type":"function","name":"claimFor","inputs":[{"name":"_account","type":"address","internalType":"address"}],"outputs":[{"name":"amountClaimed","type":"uint256","internalType":"uint256"}],"stateMutability":"nonpayable"},{"type":"function","name":"claimWithRange","inputs":[{"name":"_claimStartWeek","type":"uint256","internalType":"uint256"},{"name":"_claimEndWeek","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"amountClaimed","type":"uint256","internalType":"uint256"}],"stateMutability":"nonpayable"},{"type":"function","name":"claimWithRangeFor","inputs":[{"name":"_account","type":"address","internalType":"address"},{"name":"_claimStartWeek","type":"uint256","internalType":"uint256"},{"name":"_claimEndWeek","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"amountClaimed","type":"uint256","internalType":"uint256"}],"stateMutability":"nonpayable"},{"type":"function","name":"computeWeightRatio","inputs":[{"name":"_account","type":"address","internalType":"address"}],"outputs":[{"name":"rewardShare","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"computeWeightRatioAt","inputs":[{"name":"_account","type":"address","internalType":"address"},{"name":"_week","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"rewardShare","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"configureRecipient","inputs":[{"name":"_recipient","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"depositReward","inputs":[{"name":"_amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"depositRewardFrom","inputs":[{"name":"_target","type":"address","internalType":"address"},{"name":"_amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"getClaimableAt","inputs":[{"name":"_account","type":"address","internalType":"address"},{"name":"_week","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"rewardAmount","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getSuggestedClaimRange","inputs":[{"name":"_account","type":"address","internalType":"address"}],"outputs":[{"name":"claimStartWeek","type":"uint256","internalType":"uint256"},{"name":"claimEndWeek","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getTotalClaimableByRange","inputs":[{"name":"_account","type":"address","internalType":"address"},{"name":"_claimStartWeek","type":"uint256","internalType":"uint256"},{"name":"_claimEndWeek","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"claimable","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getWeek","inputs":[],"outputs":[{"name":"week","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"rewardToken","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract IERC20"}],"stateMutability":"view"},{"type":"function","name":"setOwner","inputs":[{"name":"_owner","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setWeightedDepositIndex","inputs":[{"name":"_idx","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"staker","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract IYearnBoostedStaker"}],"stateMutability":"view"},{"type":"function","name":"weeklyRewardAmount","inputs":[{"name":"week","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"amount","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"weightedDepositIndex","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"event","name":"AccountConfigured","inputs":[{"name":"account","type":"address","indexed":true,"internalType":"address"},{"name":"recipient","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"OwnerSet","inputs":[{"name":"owner","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"RewardDeposited","inputs":[{"name":"week","type":"uint256","indexed":true,"internalType":"uint256"},{"name":"depositor","type":"address","indexed":true,"internalType":"address"},{"name":"rewardAmount","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"RewardsClaimed","inputs":[{"name":"account","type":"address","indexed":true,"internalType":"address"},{"name":"week","type":"uint256","indexed":true,"internalType":"uint256"},{"name":"rewardAmount","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"WeightedDepositIndexSet","inputs":[{"name":"idx","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false}] as const
export default abi

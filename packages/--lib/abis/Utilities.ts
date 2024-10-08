const abi = [
	{
		inputs: [
			{internalType: 'contract IYearnBoostedStaker', name: '_ybs', type: 'address'},
			{internalType: 'contract IRewardDistributor', name: '_rewardsDistributor', type: 'address'}
		],
		stateMutability: 'nonpayable',
		type: 'constructor'
	},
	{
		inputs: [],
		name: 'FEE',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'MAX_STAKE_GROWTH_WEEKS',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'REWARDS_DISTRIBUTOR',
		outputs: [{internalType: 'contract IRewardDistributor', name: '', type: 'address'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'TOKEN',
		outputs: [{internalType: 'contract IERC20', name: '', type: 'address'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'YBS',
		outputs: [{internalType: 'contract IYearnBoostedStaker', name: '', type: 'address'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'activeRewardAmount',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{internalType: 'address', name: '_account', type: 'address'},
			{internalType: 'uint256', name: '_week', type: 'uint256'}
		],
		name: 'adjustedAccountWeightAt',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{internalType: 'uint256', name: '_week', type: 'uint256'}],
		name: 'adjustedGlobalWeightAt',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{internalType: 'address', name: '_account', type: 'address'},
			{internalType: 'uint256', name: '_week', type: 'uint256'}
		],
		name: 'getAccountStakeAmountAt',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{internalType: 'uint256', name: '_stakeTokenPrice', type: 'uint256'},
			{internalType: 'uint256', name: '_rewardTokenPrice', type: 'uint256'}
		],
		name: 'getGlobalActiveApr',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getGlobalActiveBoostMultiplier',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{internalType: 'uint256', name: '_stakeTokenPrice', type: 'uint256'},
			{internalType: 'uint256', name: '_rewardTokenPrice', type: 'uint256'}
		],
		name: 'getGlobalMinMaxActiveApr',
		outputs: [
			{internalType: 'uint256', name: 'min', type: 'uint256'},
			{internalType: 'uint256', name: 'max', type: 'uint256'}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{internalType: 'uint256', name: '_stakeTokenPrice', type: 'uint256'},
			{internalType: 'uint256', name: '_rewardTokenPrice', type: 'uint256'}
		],
		name: 'getGlobalMinMaxProjectedApr',
		outputs: [
			{internalType: 'uint256', name: 'min', type: 'uint256'},
			{internalType: 'uint256', name: 'max', type: 'uint256'}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{internalType: 'uint256', name: '_stakeTokenPrice', type: 'uint256'},
			{internalType: 'uint256', name: '_rewardTokenPrice', type: 'uint256'}
		],
		name: 'getGlobalProjectedApr',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getGlobalProjectedBoostMultiplier',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{internalType: 'uint256', name: '_week', type: 'uint256'}],
		name: 'getGlobalStakeAmountAt',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{internalType: 'address', name: '_account', type: 'address'},
			{internalType: 'uint256', name: '_stakeTokenPrice', type: 'uint256'},
			{internalType: 'uint256', name: '_rewardTokenPrice', type: 'uint256'}
		],
		name: 'getUserActiveApr',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{internalType: 'address', name: '_account', type: 'address'},
			{internalType: 'uint256', name: '_stakeTokenPrice', type: 'uint256'},
			{internalType: 'uint256', name: '_rewardTokenPrice', type: 'uint256'}
		],
		name: 'getUserActiveAprWithFee',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{internalType: 'address', name: '_user', type: 'address'}],
		name: 'getUserActiveBoostMultiplier',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{internalType: 'address', name: '_account', type: 'address'},
			{internalType: 'uint256', name: '_stakeTokenPrice', type: 'uint256'},
			{internalType: 'uint256', name: '_rewardTokenPrice', type: 'uint256'}
		],
		name: 'getUserProjectedApr',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{internalType: 'address', name: '_account', type: 'address'},
			{internalType: 'uint256', name: '_stakeTokenPrice', type: 'uint256'},
			{internalType: 'uint256', name: '_rewardTokenPrice', type: 'uint256'}
		],
		name: 'getUserProjectedAprWithFee',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{internalType: 'address', name: '_user', type: 'address'}],
		name: 'getUserProjectedBoostMultiplier',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getWeek',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'maxBoost',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'minBoost',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'pure',
		type: 'function'
	},
	{
		inputs: [],
		name: 'projectedRewardAmount',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{internalType: 'uint256', name: 'amount', type: 'uint256'},
			{internalType: 'uint256', name: 'currentDecimals', type: 'uint256'}
		],
		name: 'scaleDecimals',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'pure',
		type: 'function'
	},
	{
		inputs: [{internalType: 'uint256', name: '_week', type: 'uint256'}],
		name: 'weeklyRewardAmountAt',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	}
];

export default abi;

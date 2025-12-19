const abi = [
	{
		inputs: [
			{internalType: 'address', name: '_vault', type: 'address'},
			{internalType: 'address', name: '_poolCrvusdYb', type: 'address'},
			{internalType: 'address', name: '_poolYbYyb', type: 'address'},
			{internalType: 'address', name: '_rewardToken', type: 'address'},
			{internalType: 'address', name: '_funder', type: 'address'},
			{internalType: 'uint256', name: '_fundAmount', type: 'uint256'}
		],
		stateMutability: 'nonpayable',
		type: 'constructor'
	},
	{
		anonymous: false,
		inputs: [
			{indexed: true, internalType: 'address', name: 'previousGovernance', type: 'address'},
			{indexed: true, internalType: 'address', name: 'newGovernance', type: 'address'}
		],
		name: 'GovernanceTransferred',
		type: 'event'
	},
	{
		inputs: [],
		name: 'POOL_CRVUSD_YB',
		outputs: [{internalType: 'address', name: '', type: 'address'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'POOL_YB_YYB',
		outputs: [{internalType: 'address', name: '', type: 'address'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'REWARD_TOKEN',
		outputs: [{internalType: 'address', name: '', type: 'address'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'VAULT',
		outputs: [{internalType: 'address', name: '', type: 'address'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'YBS_UTILS',
		outputs: [{internalType: 'contract IYBSUtilities', name: '', type: 'address'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'YYB',
		outputs: [{internalType: 'address', name: '', type: 'address'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		name: 'amountPerEpoch',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{internalType: 'address', name: '_strategy', type: 'address'},
			{internalType: 'int256', name: '_delta', type: 'int256'}
		],
		name: 'aprAfterDebtChange',
		outputs: [{internalType: 'uint256', name: 'apr', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		name: 'epochAutoFunded',
		outputs: [{internalType: 'bool', name: '', type: 'bool'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'fundAmount',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'funder',
		outputs: [{internalType: 'address', name: '', type: 'address'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getEpoch',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getRewardTokenPrice',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getStakeTokenPrice',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'governance',
		outputs: [{internalType: 'address', name: '', type: 'address'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'name',
		outputs: [{internalType: 'string', name: '', type: 'string'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{internalType: 'uint256', name: '_amount', type: 'uint256'}],
		name: 'notifyRewards',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{inputs: [], name: 'notifyRewardsFromFunder', outputs: [], stateMutability: 'nonpayable', type: 'function'},
	{
		inputs: [
			{internalType: 'address', name: '_funder', type: 'address'},
			{internalType: 'uint256', name: '_fundAmount', type: 'uint256'}
		],
		name: 'setFundingParams',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'strategy',
		outputs: [{internalType: 'address', name: '', type: 'address'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{internalType: 'address', name: '_newGovernance', type: 'address'}],
		name: 'transferGovernance',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	}
] as const;
export default abi;

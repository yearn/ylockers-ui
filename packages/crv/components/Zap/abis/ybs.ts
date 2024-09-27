const ybsAbi = [
	{
		type: 'constructor',
		inputs: [
			{name: '_token', type: 'address', internalType: 'address'},
			{name: '_max_stake_growth_weeks', type: 'uint256', internalType: 'uint256'},
			{name: '_start_time', type: 'uint256', internalType: 'uint256'},
			{name: '_owner', type: 'address', internalType: 'address'}
		],
		stateMutability: 'nonpayable'
	},
	{
		type: 'function',
		name: 'MAX_STAKE_GROWTH_WEEKS',
		inputs: [],
		outputs: [{name: '', type: 'uint256', internalType: 'uint256'}],
		stateMutability: 'view'
	},
	{
		type: 'function',
		name: 'MAX_WEEK_BIT',
		inputs: [],
		outputs: [{name: '', type: 'uint8', internalType: 'uint8'}],
		stateMutability: 'view'
	},
	{
		type: 'function',
		name: 'START_TIME',
		inputs: [],
		outputs: [{name: '', type: 'uint256', internalType: 'uint256'}],
		stateMutability: 'view'
	},
	{type: 'function', name: 'acceptOwnership', inputs: [], outputs: [], stateMutability: 'nonpayable'},
	{
		type: 'function',
		name: 'accountData',
		inputs: [{name: 'account', type: 'address', internalType: 'address'}],
		outputs: [
			{name: 'realizedStake', type: 'uint112', internalType: 'uint112'},
			{name: 'pendingStake', type: 'uint112', internalType: 'uint112'},
			{name: 'lastUpdateWeek', type: 'uint16', internalType: 'uint16'},
			{name: 'updateWeeksBitmap', type: 'uint8', internalType: 'uint8'}
		],
		stateMutability: 'view'
	},
	{
		type: 'function',
		name: 'accountWeeklyToRealize',
		inputs: [
			{name: 'account', type: 'address', internalType: 'address'},
			{name: 'week', type: 'uint256', internalType: 'uint256'}
		],
		outputs: [{name: 'amount', type: 'uint256', internalType: 'uint256'}],
		stateMutability: 'view'
	},
	{
		type: 'function',
		name: 'approvedCaller',
		inputs: [
			{name: 'account', type: 'address', internalType: 'address'},
			{name: 'caller', type: 'address', internalType: 'address'}
		],
		outputs: [{name: 'approvalStatus', type: 'uint8', internalType: 'enum YearnBoostedStaker.ApprovalStatus'}],
		stateMutability: 'view'
	},
	{
		type: 'function',
		name: 'approvedWeightedStaker',
		inputs: [{name: 'staker', type: 'address', internalType: 'address'}],
		outputs: [{name: 'approved', type: 'bool', internalType: 'bool'}],
		stateMutability: 'view'
	},
	{
		type: 'function',
		name: 'balanceOf',
		inputs: [{name: '_account', type: 'address', internalType: 'address'}],
		outputs: [{name: '', type: 'uint256', internalType: 'uint256'}],
		stateMutability: 'view'
	},
	{
		type: 'function',
		name: 'checkpointAccount',
		inputs: [{name: '_account', type: 'address', internalType: 'address'}],
		outputs: [
			{
				name: 'acctData',
				type: 'tuple',
				internalType: 'struct YearnBoostedStaker.AccountData',
				components: [
					{name: 'realizedStake', type: 'uint112', internalType: 'uint112'},
					{name: 'pendingStake', type: 'uint112', internalType: 'uint112'},
					{name: 'lastUpdateWeek', type: 'uint16', internalType: 'uint16'},
					{name: 'updateWeeksBitmap', type: 'uint8', internalType: 'uint8'}
				]
			},
			{name: 'weight', type: 'uint256', internalType: 'uint256'}
		],
		stateMutability: 'nonpayable'
	},
	{
		type: 'function',
		name: 'checkpointAccountWithLimit',
		inputs: [
			{name: '_account', type: 'address', internalType: 'address'},
			{name: '_week', type: 'uint256', internalType: 'uint256'}
		],
		outputs: [
			{
				name: 'acctData',
				type: 'tuple',
				internalType: 'struct YearnBoostedStaker.AccountData',
				components: [
					{name: 'realizedStake', type: 'uint112', internalType: 'uint112'},
					{name: 'pendingStake', type: 'uint112', internalType: 'uint112'},
					{name: 'lastUpdateWeek', type: 'uint16', internalType: 'uint16'},
					{name: 'updateWeeksBitmap', type: 'uint8', internalType: 'uint8'}
				]
			},
			{name: 'weight', type: 'uint256', internalType: 'uint256'}
		],
		stateMutability: 'nonpayable'
	},
	{
		type: 'function',
		name: 'checkpointGlobal',
		inputs: [],
		outputs: [{name: '', type: 'uint256', internalType: 'uint256'}],
		stateMutability: 'nonpayable'
	},
	{
		type: 'function',
		name: 'decimals',
		inputs: [],
		outputs: [{name: '', type: 'uint8', internalType: 'uint8'}],
		stateMutability: 'view'
	},
	{
		type: 'function',
		name: 'getAccountWeight',
		inputs: [{name: 'account', type: 'address', internalType: 'address'}],
		outputs: [{name: '', type: 'uint256', internalType: 'uint256'}],
		stateMutability: 'view'
	},
	{
		type: 'function',
		name: 'getAccountWeightAt',
		inputs: [
			{name: '_account', type: 'address', internalType: 'address'},
			{name: '_week', type: 'uint256', internalType: 'uint256'}
		],
		outputs: [{name: '', type: 'uint256', internalType: 'uint256'}],
		stateMutability: 'view'
	},
	{
		type: 'function',
		name: 'getAccountWeightRatio',
		inputs: [{name: '_account', type: 'address', internalType: 'address'}],
		outputs: [{name: '', type: 'uint256', internalType: 'uint256'}],
		stateMutability: 'view'
	},
	{
		type: 'function',
		name: 'getAccountWeightRatioAt',
		inputs: [
			{name: '_account', type: 'address', internalType: 'address'},
			{name: '_week', type: 'uint256', internalType: 'uint256'}
		],
		outputs: [{name: '', type: 'uint256', internalType: 'uint256'}],
		stateMutability: 'view'
	},
	{
		type: 'function',
		name: 'getGlobalWeight',
		inputs: [],
		outputs: [{name: '', type: 'uint256', internalType: 'uint256'}],
		stateMutability: 'view'
	},
	{
		type: 'function',
		name: 'getGlobalWeightAt',
		inputs: [{name: 'week', type: 'uint256', internalType: 'uint256'}],
		outputs: [{name: '', type: 'uint256', internalType: 'uint256'}],
		stateMutability: 'view'
	},
	{
		type: 'function',
		name: 'getWeek',
		inputs: [],
		outputs: [{name: 'week', type: 'uint256', internalType: 'uint256'}],
		stateMutability: 'view'
	},
	{
		type: 'function',
		name: 'globalGrowthRate',
		inputs: [],
		outputs: [{name: '', type: 'uint112', internalType: 'uint112'}],
		stateMutability: 'view'
	},
	{
		type: 'function',
		name: 'globalLastUpdateWeek',
		inputs: [],
		outputs: [{name: '', type: 'uint16', internalType: 'uint16'}],
		stateMutability: 'view'
	},
	{
		type: 'function',
		name: 'globalWeeklyToRealize',
		inputs: [{name: 'week', type: 'uint256', internalType: 'uint256'}],
		outputs: [{name: 'weightToRealize', type: 'uint256', internalType: 'uint256'}],
		stateMutability: 'view'
	},
	{
		type: 'function',
		name: 'owner',
		inputs: [],
		outputs: [{name: '', type: 'address', internalType: 'address'}],
		stateMutability: 'view'
	},
	{
		type: 'function',
		name: 'pendingOwner',
		inputs: [],
		outputs: [{name: '', type: 'address', internalType: 'address'}],
		stateMutability: 'view'
	},
	{
		type: 'function',
		name: 'setApprovedCaller',
		inputs: [
			{name: '_caller', type: 'address', internalType: 'address'},
			{name: '_status', type: 'uint8', internalType: 'enum YearnBoostedStaker.ApprovalStatus'}
		],
		outputs: [],
		stateMutability: 'nonpayable'
	},
	{
		type: 'function',
		name: 'setWeightedStaker',
		inputs: [
			{name: '_staker', type: 'address', internalType: 'address'},
			{name: '_approved', type: 'bool', internalType: 'bool'}
		],
		outputs: [],
		stateMutability: 'nonpayable'
	},
	{
		type: 'function',
		name: 'stake',
		inputs: [{name: '_amount', type: 'uint256', internalType: 'uint256'}],
		outputs: [{name: '', type: 'uint256', internalType: 'uint256'}],
		stateMutability: 'nonpayable'
	},
	{
		type: 'function',
		name: 'stakeAsWeighted',
		inputs: [
			{name: '_account', type: 'address', internalType: 'address'},
			{name: '_amount', type: 'uint256', internalType: 'uint256'},
			{name: '_idx', type: 'uint256', internalType: 'uint256'}
		],
		outputs: [{name: '', type: 'uint256', internalType: 'uint256'}],
		stateMutability: 'nonpayable'
	},
	{
		type: 'function',
		name: 'stakeFor',
		inputs: [
			{name: '_account', type: 'address', internalType: 'address'},
			{name: '_amount', type: 'uint256', internalType: 'uint256'}
		],
		outputs: [{name: '', type: 'uint256', internalType: 'uint256'}],
		stateMutability: 'nonpayable'
	},
	{
		type: 'function',
		name: 'stakeToken',
		inputs: [],
		outputs: [{name: '', type: 'address', internalType: 'contract ERC20'}],
		stateMutability: 'view'
	},
	{
		type: 'function',
		name: 'sweep',
		inputs: [{name: '_token', type: 'address', internalType: 'address'}],
		outputs: [],
		stateMutability: 'nonpayable'
	},
	{
		type: 'function',
		name: 'totalSupply',
		inputs: [],
		outputs: [{name: '', type: 'uint256', internalType: 'uint256'}],
		stateMutability: 'view'
	},
	{
		type: 'function',
		name: 'transferOwnership',
		inputs: [{name: '_pendingOwner', type: 'address', internalType: 'address'}],
		outputs: [],
		stateMutability: 'nonpayable'
	},
	{
		type: 'function',
		name: 'unstake',
		inputs: [
			{name: '_amount', type: 'uint256', internalType: 'uint256'},
			{name: '_receiver', type: 'address', internalType: 'address'}
		],
		outputs: [{name: '', type: 'uint256', internalType: 'uint256'}],
		stateMutability: 'nonpayable'
	},
	{
		type: 'function',
		name: 'unstakeFor',
		inputs: [
			{name: '_account', type: 'address', internalType: 'address'},
			{name: '_amount', type: 'uint256', internalType: 'uint256'},
			{name: '_receiver', type: 'address', internalType: 'address'}
		],
		outputs: [{name: '', type: 'uint256', internalType: 'uint256'}],
		stateMutability: 'nonpayable'
	},
	{
		type: 'event',
		name: 'ApprovedCallerSet',
		inputs: [
			{name: 'account', type: 'address', indexed: true, internalType: 'address'},
			{name: 'caller', type: 'address', indexed: true, internalType: 'address'},
			{name: 'status', type: 'uint8', indexed: false, internalType: 'enum YearnBoostedStaker.ApprovalStatus'}
		],
		anonymous: false
	},
	{
		type: 'event',
		name: 'OwnershipTransferred',
		inputs: [{name: 'newOwner', type: 'address', indexed: true, internalType: 'address'}],
		anonymous: false
	},
	{
		type: 'event',
		name: 'Staked',
		inputs: [
			{name: 'account', type: 'address', indexed: true, internalType: 'address'},
			{name: 'week', type: 'uint256', indexed: true, internalType: 'uint256'},
			{name: 'amount', type: 'uint256', indexed: false, internalType: 'uint256'},
			{name: 'newUserWeight', type: 'uint256', indexed: false, internalType: 'uint256'},
			{name: 'weightAdded', type: 'uint256', indexed: false, internalType: 'uint256'}
		],
		anonymous: false
	},
	{
		type: 'event',
		name: 'Unstaked',
		inputs: [
			{name: 'account', type: 'address', indexed: true, internalType: 'address'},
			{name: 'week', type: 'uint256', indexed: true, internalType: 'uint256'},
			{name: 'amount', type: 'uint256', indexed: false, internalType: 'uint256'},
			{name: 'newUserWeight', type: 'uint256', indexed: false, internalType: 'uint256'},
			{name: 'weightRemoved', type: 'uint256', indexed: false, internalType: 'uint256'}
		],
		anonymous: false
	},
	{
		type: 'event',
		name: 'WeightedStakerSet',
		inputs: [
			{name: 'staker', type: 'address', indexed: true, internalType: 'address'},
			{name: 'approved', type: 'bool', indexed: false, internalType: 'bool'}
		],
		anonymous: false
	}
] as const;

export default ybsAbi;

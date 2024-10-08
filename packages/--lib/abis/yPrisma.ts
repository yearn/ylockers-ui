const abi = [
	{
		name: 'Transfer',
		inputs: [
			{name: 'sender', type: 'address', indexed: true},
			{name: 'receiver', type: 'address', indexed: true},
			{name: 'value', type: 'uint256', indexed: false}
		],
		anonymous: false,
		type: 'event'
	},
	{
		name: 'Approval',
		inputs: [
			{name: 'owner', type: 'address', indexed: true},
			{name: 'spender', type: 'address', indexed: true},
			{name: 'value', type: 'uint256', indexed: false}
		],
		anonymous: false,
		type: 'event'
	},
	{
		name: 'DelegateMint',
		inputs: [
			{name: 'minter', type: 'address', indexed: true},
			{name: 'recipient', type: 'address', indexed: true},
			{name: 'amount', type: 'uint256', indexed: false}
		],
		anonymous: false,
		type: 'event'
	},
	{
		name: 'ApproveMinter',
		inputs: [
			{name: 'minter', type: 'address', indexed: true},
			{name: 'approved', type: 'bool', indexed: true}
		],
		anonymous: false,
		type: 'event'
	},
	{
		name: 'UpdateOperator',
		inputs: [{name: 'operator', type: 'address', indexed: true}],
		anonymous: false,
		type: 'event'
	},
	{
		stateMutability: 'nonpayable',
		type: 'constructor',
		inputs: [
			{name: '_name', type: 'string'},
			{name: '_symbol', type: 'string'},
			{name: '_prisma', type: 'address'},
			{name: '_ylocker', type: 'address'},
			{name: '_operator', type: 'address'}
		],
		outputs: []
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'transfer',
		inputs: [
			{name: '_to', type: 'address'},
			{name: '_value', type: 'uint256'}
		],
		outputs: [{name: '', type: 'bool'}]
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'transferFrom',
		inputs: [
			{name: '_from', type: 'address'},
			{name: '_to', type: 'address'},
			{name: '_value', type: 'uint256'}
		],
		outputs: [{name: '', type: 'bool'}]
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'approve',
		inputs: [
			{name: '_spender', type: 'address'},
			{name: '_value', type: 'uint256'}
		],
		outputs: [{name: '', type: 'bool'}]
	},
	{stateMutability: 'nonpayable', type: 'function', name: 'mint', inputs: [], outputs: [{name: '', type: 'uint256'}]},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'mint',
		inputs: [{name: '_amount', type: 'uint256'}],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'mint',
		inputs: [
			{name: '_amount', type: 'uint256'},
			{name: '_recipient', type: 'address'}
		],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'delegate_mint',
		inputs: [
			{name: '_recipient', type: 'address'},
			{name: '_amount', type: 'uint256'}
		],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'approve_minter',
		inputs: [
			{name: '_minter', type: 'address'},
			{name: '_approved', type: 'bool'}
		],
		outputs: []
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'set_operator',
		inputs: [{name: '_proposed_operator', type: 'address'}],
		outputs: []
	},
	{stateMutability: 'nonpayable', type: 'function', name: 'accept_operator', inputs: [], outputs: []},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'sweep',
		inputs: [{name: '_token', type: 'address'}],
		outputs: []
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'sweep',
		inputs: [
			{name: '_token', type: 'address'},
			{name: '_amount', type: 'uint256'}
		],
		outputs: []
	},
	{stateMutability: 'view', type: 'function', name: 'ylocker', inputs: [], outputs: [{name: '', type: 'address'}]},
	{stateMutability: 'view', type: 'function', name: 'prisma', inputs: [], outputs: [{name: '', type: 'address'}]},
	{stateMutability: 'view', type: 'function', name: 'name', inputs: [], outputs: [{name: '', type: 'string'}]},
	{stateMutability: 'view', type: 'function', name: 'symbol', inputs: [], outputs: [{name: '', type: 'string'}]},
	{stateMutability: 'view', type: 'function', name: 'decimals', inputs: [], outputs: [{name: '', type: 'uint8'}]},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'balanceOf',
		inputs: [{name: 'arg0', type: 'address'}],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'allowance',
		inputs: [
			{name: 'arg0', type: 'address'},
			{name: 'arg1', type: 'address'}
		],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'totalSupply',
		inputs: [],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'approved_minters',
		inputs: [{name: 'arg0', type: 'address'}],
		outputs: [{name: '', type: 'bool'}]
	},
	{stateMutability: 'view', type: 'function', name: 'operator', inputs: [], outputs: [{name: '', type: 'address'}]},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'proposed_operator',
		inputs: [],
		outputs: [{name: '', type: 'address'}]
	}
] as const;
export default abi;

const abi = [
	{
		type: 'constructor',
		name: '',
		stateMutability: '',
		constant: false,
		inputs: [
			{type: 'address', name: '_locker', simpleType: 'address'},
			{type: 'address', name: '_token', simpleType: 'address'},
			{type: 'string', name: '_name', simpleType: 'string'},
			{type: 'string', name: '_symbol', simpleType: 'string'}
		],
		id: 'c68ee65b-a582-4ce6-adac-4515ba0b7fbd'
	},
	{
		type: 'function',
		name: 'symbol',
		stateMutability: 'view',
		constant: false,
		outputs: [{type: 'string', name: '', simpleType: 'string'}],
		id: '0x95d89b41'
	},
	{
		type: 'function',
		name: 'balanceOf',
		stateMutability: 'view',
		constant: false,
		inputs: [{type: 'address', name: 'account', simpleType: 'address'}],
		outputs: [{type: 'uint256', name: '', simpleType: 'uint'}],
		id: '0x70a08231'
	},
	{
		type: 'function',
		name: 'locker',
		stateMutability: 'view',
		constant: false,
		outputs: [{type: 'address', name: '', simpleType: 'address'}],
		id: '0xd7b96d4e'
	},
	{
		type: 'function',
		name: 'lock',
		stateMutability: 'nonpayable',
		constant: false,
		inputs: [
			{type: 'uint256', name: 'amount', simpleType: 'uint'},
			{type: 'address', name: 'to', simpleType: 'address'}
		],
		id: '0x66dfbfb4'
	},
	{
		type: 'function',
		name: 'totalSupply',
		stateMutability: 'view',
		constant: false,
		outputs: [{type: 'uint256', name: '', simpleType: 'uint'}],
		id: '0x18160ddd'
	},
	{
		type: 'function',
		name: 'name',
		stateMutability: 'view',
		constant: false,
		outputs: [{type: 'string', name: '', simpleType: 'string'}],
		id: '0x06fdde03'
	},
	{
		type: 'function',
		name: 'operator',
		stateMutability: 'view',
		constant: false,
		outputs: [{type: 'address', name: '', simpleType: 'address'}],
		id: '0x570ca735'
	},
	{
		type: 'function',
		name: 'approve',
		stateMutability: 'nonpayable',
		constant: false,
		inputs: [
			{type: 'address', name: 'spender', simpleType: 'address'},
			{type: 'uint256', name: 'value', simpleType: 'uint'}
		],
		outputs: [{type: 'bool', name: '', simpleType: 'bool'}],
		id: '0x095ea7b3'
	},
	{
		type: 'function',
		name: 'decimals',
		stateMutability: 'view',
		constant: false,
		outputs: [{type: 'uint8', name: '', simpleType: 'uint'}],
		id: '0x313ce567'
	},
	{
		type: 'function',
		name: 'token',
		stateMutability: 'view',
		constant: false,
		outputs: [{type: 'address', name: '', simpleType: 'address'}],
		id: '0xfc0c546a'
	},
	{
		type: 'function',
		name: 'mint',
		stateMutability: 'nonpayable',
		constant: false,
		inputs: [
			{type: 'address', name: 'to', simpleType: 'address'},
			{type: 'uint256', name: 'amount', simpleType: 'uint'}
		],
		id: '0x40c10f19'
	},
	{
		type: 'function',
		name: 'allowance',
		stateMutability: 'view',
		constant: false,
		inputs: [
			{type: 'address', name: 'owner', simpleType: 'address'},
			{type: 'address', name: 'spender', simpleType: 'address'}
		],
		outputs: [{type: 'uint256', name: '', simpleType: 'uint'}],
		id: '0xdd62ed3e'
	},
	{
		type: 'function',
		name: 'transferFrom',
		stateMutability: 'nonpayable',
		constant: false,
		inputs: [
			{type: 'address', name: 'from', simpleType: 'address'},
			{type: 'address', name: 'to', simpleType: 'address'},
			{type: 'uint256', name: 'value', simpleType: 'uint'}
		],
		outputs: [{type: 'bool', name: '', simpleType: 'bool'}],
		id: '0x23b872dd'
	},
	{
		type: 'function',
		name: 'sweep',
		stateMutability: 'nonpayable',
		constant: false,
		inputs: [
			{type: 'address', name: '_token', simpleType: 'address'},
			{type: 'address', name: 'to', simpleType: 'address'},
			{type: 'uint256', name: 'amount', simpleType: 'uint'}
		],
		id: '0x62c06767'
	},
	{
		type: 'function',
		name: 'transfer',
		stateMutability: 'nonpayable',
		constant: false,
		inputs: [
			{type: 'address', name: 'to', simpleType: 'address'},
			{type: 'uint256', name: 'value', simpleType: 'uint'}
		],
		outputs: [{type: 'bool', name: '', simpleType: 'bool'}],
		id: '0xa9059cbb'
	},
	{
		type: 'event',
		name: 'Approval',
		stateMutability: '',
		constant: false,
		inputs: [
			{type: 'address', name: 'owner', simpleType: 'address'},
			{type: 'address', name: 'spender', simpleType: 'address'},
			{type: 'uint256', name: 'value', simpleType: 'uint'}
		],
		id: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
	},
	{
		type: 'event',
		name: 'Swept',
		stateMutability: '',
		constant: false,
		inputs: [
			{type: 'address', name: 'token', simpleType: 'address'},
			{type: 'address', name: 'to', simpleType: 'address'},
			{type: 'uint256', name: 'amount', simpleType: 'uint'}
		],
		id: '0x7b09c29f9106defeccc9ac3b823f3aad0b470d120e5df7aed033b5c43a4bf718'
	},
	{
		type: 'event',
		name: 'Transfer',
		stateMutability: '',
		constant: false,
		inputs: [
			{type: 'address', name: 'from', simpleType: 'address'},
			{type: 'address', name: 'to', simpleType: 'address'},
			{type: 'uint256', name: 'value', simpleType: 'uint'}
		],
		id: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
	}
] as const;
export default abi;

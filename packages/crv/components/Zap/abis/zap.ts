const zapAbi = [
	{
		anonymous: false,
		inputs: [{indexed: true, name: 'sweep_recipient', type: 'address'}],
		name: 'UpdateSweepRecipient',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [{indexed: false, name: 'mint_buffer', type: 'uint256'}],
		name: 'UpdateMintBuffer',
		type: 'event'
	},
	{inputs: [], outputs: [], stateMutability: 'nonpayable', type: 'constructor', name: 'constructor'},
	{
		inputs: [
			{name: '_input_token', type: 'address'},
			{name: '_output_token', type: 'address'}
		],
		name: 'zap',
		outputs: [{name: '', type: 'uint256'}],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{name: '_input_token', type: 'address'},
			{name: '_output_token', type: 'address'},
			{name: '_amount_in', type: 'uint256'}
		],
		name: 'zap',
		outputs: [{name: '', type: 'uint256'}],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{name: '_input_token', type: 'address'},
			{name: '_output_token', type: 'address'},
			{name: '_amount_in', type: 'uint256'},
			{name: '_min_out', type: 'uint256'}
		],
		name: 'zap',
		outputs: [{name: '', type: 'uint256'}],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{name: '_input_token', type: 'address'},
			{name: '_output_token', type: 'address'},
			{name: '_amount_in', type: 'uint256'},
			{name: '_min_out', type: 'uint256'},
			{name: '_recipient', type: 'address'}
		],
		name: 'zap',
		outputs: [{name: '', type: 'uint256'}],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{name: '_input_token', type: 'address'},
			{name: '_output_token', type: 'address'},
			{name: '_amount_in', type: 'uint256'}
		],
		name: 'relative_price',
		outputs: [{name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{name: '_input_token', type: 'address'},
			{name: '_output_token', type: 'address'},
			{name: '_amount_in', type: 'uint256'}
		],
		name: 'calc_expected_out',
		outputs: [{name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{name: '_token', type: 'address'}],
		name: 'sweep',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{name: '_token', type: 'address'},
			{name: '_amount', type: 'uint256'}
		],
		name: 'sweep',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{name: '_new_buffer', type: 'uint256'}],
		name: 'set_mint_buffer',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{name: '_proposed_sweep_recipient', type: 'address'}],
		name: 'set_sweep_recipient',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{name: 'arg0', type: 'uint256'}],
		name: 'LEGACY_TOKENS',
		outputs: [{name: '', type: 'address'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{name: 'arg0', type: 'uint256'}],
		name: 'OUTPUT_TOKENS',
		outputs: [{name: '', type: 'address'}],
		stateMutability: 'view',
		type: 'function'
	},
	{inputs: [], name: 'name', outputs: [{name: '', type: 'string'}], stateMutability: 'view', type: 'function'},
	{
		inputs: [],
		name: 'sweep_recipient',
		outputs: [{name: '', type: 'address'}],
		stateMutability: 'view',
		type: 'function'
	},
	{inputs: [], name: 'mint_buffer', outputs: [{name: '', type: 'uint256'}], stateMutability: 'view', type: 'function'}
] as const;

export default zapAbi;

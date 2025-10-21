const abi = [
	{
		inputs: [{internalType: 'address', name: '_owner', type: 'address'}],
		stateMutability: 'nonpayable',
		type: 'constructor'
	},
	{inputs: [{internalType: 'address', name: 'target', type: 'address'}], name: 'AddressEmptyCode', type: 'error'},
	{
		inputs: [{internalType: 'address', name: 'account', type: 'address'}],
		name: 'AddressInsufficientBalance',
		type: 'error'
	},
	{inputs: [], name: 'FailedInnerCall', type: 'error'},
	{inputs: [{internalType: 'address', name: 'owner', type: 'address'}], name: 'OwnableInvalidOwner', type: 'error'},
	{
		inputs: [{internalType: 'address', name: 'account', type: 'address'}],
		name: 'OwnableUnauthorizedAccount',
		type: 'error'
	},
	{
		inputs: [{internalType: 'address', name: 'token', type: 'address'}],
		name: 'SafeERC20FailedOperation',
		type: 'error'
	},
	{
		anonymous: false,
		inputs: [
			{indexed: true, internalType: 'uint256', name: 'dropId', type: 'uint256'},
			{indexed: true, internalType: 'address', name: 'account', type: 'address'},
			{indexed: true, internalType: 'address', name: 'recipient', type: 'address'},
			{indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256'}
		],
		name: 'Claimed',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{indexed: true, internalType: 'address', name: 'account', type: 'address'},
			{indexed: true, internalType: 'address', name: 'delegate', type: 'address'}
		],
		name: 'DelegateSet',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{indexed: true, internalType: 'uint256', name: 'dropId', type: 'uint256'},
			{indexed: true, internalType: 'address', name: 'token', type: 'address'},
			{indexed: false, internalType: 'uint256', name: 'startsAt', type: 'uint256'},
			{indexed: false, internalType: 'uint256', name: 'expiresAt', type: 'uint256'},
			{indexed: false, internalType: 'uint256', name: 'totalAmount', type: 'uint256'}
		],
		name: 'DropCreated',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{indexed: true, internalType: 'uint256', name: 'dropId', type: 'uint256'},
			{indexed: false, internalType: 'string', name: 'description', type: 'string'}
		],
		name: 'DropDescriptionSet',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{indexed: true, internalType: 'uint256', name: 'dropId', type: 'uint256'},
			{indexed: true, internalType: 'address', name: 'token', type: 'address'},
			{indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256'}
		],
		name: 'ExpiredTokensRecovered',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{indexed: true, internalType: 'uint256', name: 'dropId', type: 'uint256'},
			{indexed: false, internalType: 'bytes32', name: 'merkleRoot', type: 'bytes32'}
		],
		name: 'MerkleRootSet',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{indexed: true, internalType: 'address', name: 'previousOwner', type: 'address'},
			{indexed: true, internalType: 'address', name: 'newOwner', type: 'address'}
		],
		name: 'OwnershipTransferred',
		type: 'event'
	},
	{
		inputs: [],
		name: 'MAX_DESCRIPTION_BYTES',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{internalType: 'uint256', name: '_dropId', type: 'uint256'},
			{internalType: 'address', name: '_account', type: 'address'},
			{internalType: 'address', name: '_recipient', type: 'address'},
			{internalType: 'uint256', name: '_amount', type: 'uint256'},
			{internalType: 'bytes32[]', name: '_proof', type: 'bytes32[]'},
			{internalType: 'uint256', name: '_index', type: 'uint256'}
		],
		name: 'claim',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{internalType: 'string', name: '_description', type: 'string'},
			{internalType: 'address', name: '_token', type: 'address'},
			{internalType: 'uint256', name: '_startTime', type: 'uint256'},
			{internalType: 'uint256', name: '_duration', type: 'uint256'},
			{internalType: 'uint256', name: '_totalAmount', type: 'uint256'},
			{internalType: 'bytes32', name: '_merkleRoot', type: 'bytes32'}
		],
		name: 'createDrop',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{internalType: 'address', name: 'account', type: 'address'}],
		name: 'delegates',
		outputs: [{internalType: 'address', name: 'delegate', type: 'address'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'dropCount',
		outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{internalType: 'uint256', name: 'id', type: 'uint256'}],
		name: 'drops',
		outputs: [
			{internalType: 'address', name: 'token', type: 'address'},
			{internalType: 'uint40', name: 'startsAt', type: 'uint40'},
			{internalType: 'uint40', name: 'expiresAt', type: 'uint40'},
			{internalType: 'uint256', name: 'totalAmount', type: 'uint256'},
			{internalType: 'uint256', name: 'claimedAmount', type: 'uint256'},
			{internalType: 'bytes32', name: 'merkleRoot', type: 'bytes32'},
			{internalType: 'string', name: 'description', type: 'string'}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{internalType: 'address', name: 'account', type: 'address'},
			{internalType: 'uint256', name: 'dropId', type: 'uint256'}
		],
		name: 'hasClaimed',
		outputs: [{internalType: 'bool', name: 'hasClaimed', type: 'bool'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'owner',
		outputs: [{internalType: 'address', name: '', type: 'address'}],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{internalType: 'uint256', name: '_dropId', type: 'uint256'}],
		name: 'recoverExpiredTokens',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function'},
	{
		inputs: [
			{internalType: 'address', name: '_account', type: 'address'},
			{internalType: 'address', name: '_delegate', type: 'address'}
		],
		name: 'setDelegate',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{internalType: 'uint256', name: '_dropId', type: 'uint256'},
			{internalType: 'string', name: '_description', type: 'string'}
		],
		name: 'setDropDescription',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{internalType: 'uint256', name: '_dropId', type: 'uint256'},
			{internalType: 'bytes32', name: '_root', type: 'bytes32'}
		],
		name: 'setMerkleRoot',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{internalType: 'address', name: 'newOwner', type: 'address'}],
		name: 'transferOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	}
] as const;
export default abi;

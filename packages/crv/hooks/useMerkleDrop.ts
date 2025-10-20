import MerkleTree from 'merkletreejs';
import {encodePacked, keccak256} from 'viem';

// Import from JSON
const airdrop: Record<string, string> = {
	zeroAddress: '100000133700000000000000'
};

const mapped = Object.entries(airdrop)
	.map(([account, balance]) => [account, BigInt(balance)])
	.reduce((prev, [account, balance]) => {
		prev[account as `0x${string}`] = balance as bigint;
		return prev;
	}, {} as Record<`0x${string}`, bigint>);

const hashFn = (data: `0x${string}`) => keccak256(data).slice(2);

export const useMerkleDrop = (
	acc?: `0x${string}`
):
	| {
			amount: bigint;
			proof: `0x${string}`[];
	  }
	| undefined => {
	if (!acc) return undefined;
	const amount = getUserAmounts(mapped, acc);
	if (!amount) return undefined;
	const proof = getUserProof([acc, amount]);
	return {amount, proof};
};

const getUserProof = (node: [`0x${string}`, bigint]) => {
	const tree = createTree(mapped);
	return getProof(tree, node);
};

const getUserAmounts = (data: Record<string, bigint>, acc: `0x${string}`): bigint | undefined => {
	return Object.entries(data).find(([account]) => acc?.toLowerCase() === account?.toLowerCase())?.[1];
};

const createTree = (data: Record<string, bigint>) => {
	const elements = Object.entries(data).map(([account, balance]) =>
		keccak256(encodePacked(['address', 'uint256'], [account as `0x${string}`, balance]))
	);
	return new MerkleTree(elements, hashFn, {sort: true});
};

const getProof = (tree: MerkleTree, node: [`0x${string}`, bigint]) => {
	const [account, amount] = node;
	const element = keccak256(encodePacked(['address', 'uint256'], [account, amount]));
	return tree.getHexProof(element) as `0x${string}`[];
};

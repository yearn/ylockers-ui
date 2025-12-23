'use client';

import {getDefaultConfig, RainbowKitProvider} from '@rainbow-me/rainbowkit';
import {
	coinbaseWallet,
	injectedWallet,
	metaMaskWallet,
	rainbowWallet,
	safeWallet,
	walletConnectWallet
} from '@rainbow-me/rainbowkit/wallets';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ModalProvider} from 'react-modal-hook';
import {fallback, http, WagmiProvider} from 'wagmi';
import {mainnet} from 'wagmi/chains';
import {VaultProvider} from './VaultContext';

const useTestnet = process.env.NEXT_PUBLIC_USE_TESTNET === 'true';
const testnetId = parseInt(process.env.NEXT_PUBLIC_TESTNET_ID ?? '0');
const testnetRpc = process.env.NEXT_PUBLIC_TESTNET_RPC ?? '';
const testnet = Object.assign({}, mainnet, {
	id: testnetId,
	rpcUrls: {
		default: {
			http: [testnetRpc]
		}
	}
});

const chain = useTestnet ? testnet : mainnet;
const rpc = useTestnet ? testnetRpc : process.env.NEXT_PUBLIC_RPC_1;

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5000,
			gcTime: 10000,
			refetchOnWindowFocus: false,
			retry: 1
		}
	}
});

export const Config = getDefaultConfig({
	appName: process.env.NEXT_PUBLIC_RAINBOWKIT_APPNAME ?? 'NEXT_PUBLIC_RAINBOWKIT_APPNAME',
	projectId: process.env.NEXT_PUBLIC_RAINBOWKIT_PROJECTID ?? 'NEXT_PUBLIC_RAINBOWKIT_PROJECTID',
	chains: [chain],
	transports: {
		[chain.id]: fallback([
			http(rpc, {batch: true, timeout: 10000}),
			http(undefined, {batch: true}) // Public fallback
		])
	},
	wallets: [
		{
			groupName: 'Popular',
			wallets: [injectedWallet, metaMaskWallet, walletConnectWallet, rainbowWallet, coinbaseWallet, safeWallet]
		}
	],
	ssr: true
});

export default function Providers({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<WagmiProvider config={Config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider>
					<VaultProvider>
						<ModalProvider>{children}</ModalProvider>
					</VaultProvider>
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}

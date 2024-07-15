'use client'

import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { injectedWallet, frameWallet, metaMaskWallet, walletConnectWallet, rainbowWallet, coinbaseWallet, safeWallet } from '@rainbow-me/rainbowkit/wallets';
import { http, WagmiProvider } from 'wagmi';
import {
  mainnet,
  localhost
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { VaultProvider } from './VaultContext';


const queryClient = new QueryClient();

const useTestnet = Boolean(process.env.NEXT_PUBLIC_USE_TESTNET ?? false)
const testnetId = parseInt(process.env.NEXT_PUBLIC_TESTNET_ID ?? '0')
const testnetRpc = process.env.NEXT_PUBLIC_TESTNET_RPC ?? ''
const testnet = Object.assign({}, mainnet, {
  'id': testnetId,
  'rpcUrls': {
    'default': {
      'http': [testnetRpc]
    }
  }
})

const chain = useTestnet ? testnet : mainnet
const rpc = useTestnet ? testnetRpc : process.env.NEXT_PUBLIC_RPC_1

const config = getDefaultConfig({
  appName: 'yPrisma',
  projectId: '84801a4fb569adb34f184f543b6d1762',
  chains: [chain],
  transports: { [chain.id]: http(rpc) },
  wallets: [{
    groupName: 'Popular',
    wallets: [
      injectedWallet,
      frameWallet,
      metaMaskWallet,
      walletConnectWallet,
      rainbowWallet,
      coinbaseWallet,
      safeWallet
    ]
  }],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export default function Provider ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <VaultProvider>
            {children}
          </VaultProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

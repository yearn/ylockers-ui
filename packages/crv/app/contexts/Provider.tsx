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
import env from '@/lib/env';
import { VaultProvider } from './VaultContext';


const queryClient = new QueryClient();

// const chain = mainnet
const chain = Object.assign({}, mainnet, {
  "id": 6969,
  "rpcUrls": {
    "default": {
      "http": [
        "https://virtual.mainnet.rpc.tenderly.co/e96d48c7-b7df-4ee3-8c02-da4fb68f9fcf"
      ]
    }
  }
})

const config = getDefaultConfig({
  appName: 'yPrisma',
  projectId: '84801a4fb569adb34f184f543b6d1762',
  chains: [chain],
  transports: { [chain.id]: http(process.env.NEXT_PUBLIC_RPC_1) },
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

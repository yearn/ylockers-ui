// contexts/VaultContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import useSWR from 'swr';

interface VaultContextType {
  vaultData: any[];
  isLoading: boolean;
  error: any;
}

const VaultContext = createContext<VaultContextType | undefined>(undefined);

export function VaultProvider({ children }: { children: ReactNode }) {
  const { data: vaultData, error, isValidating } = useSWR(
    'https://ydaemon.yearn.finance/1/vaults/all',
    async (url) => {
      const response = await fetch(url);
      return response.json();
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 300000, // Refresh every 5 minutes
    }
  );

  return (
    <VaultContext.Provider value={{ vaultData, isLoading: isValidating, error }}>
      {children}
    </VaultContext.Provider>
  );
}

export function useVaultContext() {
  const context = useContext(VaultContext);
  if (context === undefined) {
    throw new Error('useVault must be used within a VaultProvider');
  }
  return context;
}
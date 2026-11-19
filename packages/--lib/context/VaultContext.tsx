import React, {createContext, useContext, ReactNode} from 'react';
import useSWR from 'swr';
import {KONG_REST_API} from '../hooks/useVault';

interface VaultContextType {
	vaultData: any[];
	isLoading: boolean;
	error: any;
}

const VaultContext = createContext<VaultContextType | undefined>(undefined);

export function VaultProvider({children}: {children: ReactNode}) {
	const url = `${KONG_REST_API}/list/vaults/1?origin=yearn`;
	const {
		data: vaultData,
		error,
		isValidating
	} = useSWR(
		url,
		async url => {
			const response = await fetch(url);
			return response.json();
		},
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			refreshInterval: 5 * 60 * 1000
		}
	);

	return (
		<VaultContext.Provider value={{vaultData, isLoading: isValidating, error}}>{children}</VaultContext.Provider>
	);
}

export function useVaultContext() {
	const context = useContext(VaultContext);
	if (context === undefined) {
		throw new Error('useVaultContext must be used within a VaultProvider.');
	}
	return context;
}

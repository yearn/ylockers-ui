import {useCallback, useMemo, useState} from 'react';
import {useVaultContext} from '../context/VaultContext';
import {getForwardApr} from '../hooks/useVault';
import {useAccount, useReadContracts} from 'wagmi';
import {erc20Abi, erc4626Abi, formatUnits} from 'viem';
import InputBox from './InputBox';
import ImageOrFallback from './ImageOrFallback';

const SMOL_ASSETS_URL = process.env.NEXT_PUBLIC_SMOL_ASSETS_URL ?? 'https://assets.smold.app/api';

export default function Vaults({title, filter}: {title: string; filter: (vault: any) => boolean}) {
	const {address} = useAccount();
	const {vaultData} = useVaultContext();
	const [searchTerm, setSearchTerm] = useState('');
	const [sortColumn, setSortColumn] = useState('estApr');
	const [sortDirection, setSortDirection] = useState('desc');

	const handleSort = (column: string) => {
		if (column === sortColumn) {
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
		} else {
			setSortColumn(column);
			setSortDirection('asc');
		}
	};

	const filteredVaultData = useMemo(() => {
		if (!vaultData) return [];
		/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
		return vaultData.filter((vault: any) => filter(vault));
	}, [vaultData, filter]);

	const contracts = filteredVaultData.flatMap(vault => [
		{
			address: vault.address,
			abi: erc20Abi,
			functionName: 'balanceOf',
			args: [address],
			chainId: 1
		},
		{
			address: vault.asset.address,
			abi: erc20Abi,
			functionName: 'balanceOf',
			args: [address],
			chainId: 1
		},
		{
			address: vault.address,
			abi: erc4626Abi,
			functionName: 'totalAssets',
			chainId: 1
		}
	]);

	const multicall = useReadContracts({contracts});

	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	const getTotalAssets = useCallback(
		(vault: any) => {
			const index = filteredVaultData.indexOf(vault);
			const totalAssets = multicall.data?.[index * 3 + 2]?.result;
			return totalAssets === undefined ? undefined : Number(formatUnits(BigInt(totalAssets), vault.asset.decimals));
		},
		[multicall, filteredVaultData]
	);

	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	const getPrice = useCallback(
		(vault: any) => {
			const totalAssets = getTotalAssets(vault);
			return totalAssets ? (vault.tvl ?? 0) / totalAssets : 0;
		},
		[getTotalAssets]
	);

	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	const getHoldings = useCallback(
		(vault: any) => {
			const index = filteredVaultData.indexOf(vault);
			if (multicall.data && multicall.data[index * 3]) {
				const vaultBalance = BigInt(multicall.data[index * 3].result ?? 0n);
				return {
					balance: vaultBalance ? Number(formatUnits(vaultBalance, vault.decimals)) : 0,
					usdValue: vaultBalance ? Number(formatUnits(vaultBalance, vault.decimals)) * getPrice(vault) : 0
				};
			}
			return null;
		},
		[multicall, filteredVaultData, getPrice]
	);

	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	const getAvailable = useCallback(
		(vault: any) => {
			const index = filteredVaultData.indexOf(vault);
			if (multicall.data && multicall.data[index * 3 + 1]) {
				const tokenBalance = BigInt(multicall.data[index * 3 + 1].result ?? 0n);
				return {
					balance: Number(formatUnits(tokenBalance, vault.asset.decimals)),
					usdValue: Number(formatUnits(tokenBalance, vault.asset.decimals)) * getPrice(vault)
				};
			}
			return null;
		},
		[multicall, filteredVaultData, getPrice]
	);

	const sortedData = useMemo(() => {
		/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
		return [...filteredVaultData].sort((a: any, b: any) => {
			if (sortColumn === 'token') {
				const nameA = a.name.toLowerCase();
				const nameB = b.name.toLowerCase();
				if (nameA < nameB) return sortDirection === 'asc' ? -1 : 1;
				if (nameA > nameB) return sortDirection === 'asc' ? 1 : -1;
			} else if (sortColumn === 'estApr') {
				const aprA = getForwardApr(a);
				const aprB = getForwardApr(b);
				if (aprA < aprB) return sortDirection === 'asc' ? -1 : 1;
				if (aprA > aprB) return sortDirection === 'asc' ? 1 : -1;
			} else if (sortColumn === 'histApr') {
				const aprA = a.performance?.historical?.net ?? 0;
				const aprB = b.performance?.historical?.net ?? 0;
				if (aprA < aprB) return sortDirection === 'asc' ? -1 : 1;
				if (aprA > aprB) return sortDirection === 'asc' ? 1 : -1;
			} else if (sortColumn === 'available') {
				const availableA = getAvailable(a)?.usdValue || 0;
				const availableB = getAvailable(b)?.usdValue || 0;
				if (availableA < availableB) return sortDirection === 'asc' ? -1 : 1;
				if (availableA > availableB) return sortDirection === 'asc' ? 1 : -1;
			} else if (sortColumn === 'holdings') {
				const holdingsA = getHoldings(a)?.usdValue || 0;
				const holdingsB = getHoldings(b)?.usdValue || 0;
				if (holdingsA < holdingsB) return sortDirection === 'asc' ? -1 : 1;
				if (holdingsA > holdingsB) return sortDirection === 'asc' ? 1 : -1;
			} else if (sortColumn === 'deposits') {
				const depositsA = a.tvl ?? 0;
				const depositsB = b.tvl ?? 0;
				if (depositsA < depositsB) return sortDirection === 'asc' ? -1 : 1;
				if (depositsA > depositsB) return sortDirection === 'asc' ? 1 : -1;
			}
			return 0;
		});
	}, [filteredVaultData, sortColumn, sortDirection, getHoldings, getAvailable]);

	const filteredData = useMemo(() => {
		/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
		return sortedData.filter(
			(vault: any) =>
				vault?.asset?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				vault?.asset?.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				vault?.asset?.symbol?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				vault?.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				vault?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				vault?.symbol?.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [sortedData, searchTerm]);

	return (
		<div className="w-full rounded-lg overflow-hidden bg-deeper-primary text-white mb-8">
			<div className="flex flex-col md:flex-row items-center justify-between w-full">
				<h1 className="text-4xl md:text-5xl p-6 pt-8 md:p-8 font-[700] pb-0">{title}</h1>
				<div className="p-4 md:p-8 w-full md:w-2/3">
					<InputBox
						subtitle=""
						title="Search"
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						noButton
						inputType="text"
						placeholder="Vault or strategy name..."
					/>
				</div>
			</div>
			<div className="pb-2">
				<table className="w-full text-left">
					<thead>
						<tr className="">
							<th
								className="text-sm font-thin py-2 hover:underline cursor-pointer pl-4 md:pl-8"
								onClick={() => handleSort('token')}>
								Token {sortColumn === 'token' && (sortDirection === 'asc' ? '▲' : '▼')}
							</th>
							<th
								className="text-sm font-thin hover:underline py-2 cursor-pointer"
								onClick={() => handleSort('estApr')}>
								Est. APR {sortColumn === 'estApr' && (sortDirection === 'asc' ? '▲' : '▼')}
							</th>
							<th
								className="text-sm font-thin hover:underline py-2 cursor-pointer hidden md:table-cell"
								onClick={() => handleSort('histApr')}>
								Hist. APR {sortColumn === 'histApr' && (sortDirection === 'asc' ? '▲' : '▼')}
							</th>
							<th
								className="text-sm font-thin hover:underline py-2 cursor-pointer hidden md:table-cell"
								onClick={() => handleSort('available')}>
								Available {sortColumn === 'available' && (sortDirection === 'asc' ? '▲' : '▼')}
							</th>
							<th
								className="text-sm font-thin hover:underline py-2 cursor-pointer hidden md:table-cell"
								onClick={() => handleSort('holdings')}>
								Holdings {sortColumn === 'holdings' && (sortDirection === 'asc' ? '▲' : '▼')}
							</th>
							<th
								className="text-sm font-thin hover:underline py-2 cursor-pointer pr-8 hidden md:table-cell"
								onClick={() => handleSort('deposits')}>
								Deposits {sortColumn === 'deposits' && (sortDirection === 'asc' ? '▲' : '▼')}
							</th>
						</tr>
					</thead>
					<tbody>
						{filteredData.map(item => {
							const holdings = getHoldings(item);
							const available = getAvailable(item);
							const totalAssets = getTotalAssets(item);
							const forwardApr = getForwardApr(item);
							return (
								<tr
									onClick={() =>
										window.open(
											`https://yearn.fi/${item.v3 ? 'v3/1' : 'vaults/1'}/${item.address}`,
											'_blank'
										)
									}
									key={item.address}
									className="hover:bg-primary">
									<td className="text-sm md:text-base py-2 cursor-pointer px-4 md:pl-8 flex items-center space-x-2">
										<ImageOrFallback
											alt={item.name}
											src={`${SMOL_ASSETS_URL}/token/1/${item.asset.address}/logo-128.png`}
											width={40}
											height={40}
											fallback="/placeholder.png"
										/>
										<span>{item.name}</span>
									</td>
									<td className="text-base font-mono py-2 cursor-pointer pr-4 md:pr-0">
										{forwardApr * 100 > 500
											? '>500%'
											: `${(forwardApr * 100).toLocaleString(undefined, {
													minimumFractionDigits: 2,
													maximumFractionDigits: 2
											  })}%`}
									</td>
									<td className="text-base font-mono py-2 cursor-pointer hidden md:table-cell">
										{((item.performance?.historical?.net ?? 0) * 100).toLocaleString(undefined, {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2
										})}
										%
									</td>
									<td className="text-base font-mono py-2 cursor-pointer hidden md:table-cell">
										{available ? (
											<>
												{available.balance.toLocaleString(undefined, {
													minimumFractionDigits: 2,
													maximumFractionDigits: 2
												})}
											</>
										) : (
											'-'
										)}
									</td>
									<td className="text-base font-mono py-2 cursor-pointer hidden md:table-cell">
										{holdings ? (
											<>
												{holdings.balance.toLocaleString(undefined, {
													minimumFractionDigits: 2,
													maximumFractionDigits: 2
												})}
											</>
										) : (
											'-'
										)}
									</td>
									<td className="text-base font-mono py-2 cursor-pointer pr-8 hidden md:table-cell">
										{totalAssets ? (
											<>
												{totalAssets.toLocaleString(undefined, {
													minimumFractionDigits: 2,
													maximumFractionDigits: 2
												})}
												<p className="text-sm opacity-40">
													$
													{(item.tvl ?? 0).toLocaleString(undefined, {
														minimumFractionDigits: 2,
														maximumFractionDigits: 2
													})}
												</p>
											</>
										) : (
											'-'
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				{!(vaultData?.length > 0) && <span className="p-4 md:p-8">Loading...</span>}
			</div>
		</div>
	);
}

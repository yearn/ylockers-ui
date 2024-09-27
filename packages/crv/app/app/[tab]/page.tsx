'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header, {headerItems} from '../../../components/Header';
import {useConnectModal, useAccountModal} from '@rainbow-me/rainbowkit';
import {useAccount, useReadContract} from 'wagmi';
import {fAddress, fUSD} from '--lib/tools/format';
import useData from '--lib/hooks/useData';
import Tokens from '--lib/components/Tokens';
import ExperienceToggle from '--lib/components/ExperienceToggle';

import ClaimAll from '--lib/components/ClaimAll';
import Stake from '--lib/components/Stake';
import Unstake from '--lib/components/Unstake';
import Deposit from '--lib/components/DepositV2';
import Withdraw from '--lib/components/WithdrawV2';

import {PiVaultLight} from 'react-icons/pi';
import Background from '../../../components/Background';
import A from '--lib/components/A';
import Zap from '@/components/Zap';
import YbsDataBox from '--lib/components/YbsDataBox';
import VaultDataBox from '--lib/components/VaultDataBox';
import Vaults from '--lib/components/Vaults';
import Ticker from '--lib/components/Ticker';
import {useTab} from '--lib/hooks/useTab';
import {ENV, LOCKER_TOKEN_NAME, STABLE_TOKEN_VAULT, STABLE_TOKEN_VAULT_NAME, YDAEMON} from '@/constants';

import {useState, useEffect} from 'react';
import {erc20Abi} from 'viem';

/************************************************************************************************
 ** VEYFIStatus Component
 **
 ** This component displays information about staking crvUSD in the veYFI gauge.
 ** It fetches the current APR for the crvUSD vault and displays a message encouraging users
 ** to stake their crvUSD tokens for potentially higher yields.
 **
 ** Key features:
 ** 1. Fetches vault data from Yearn's API to get current APR
 ** 2. Reads user's crvUSD balance using wagmi's useReadContract hook
 ** 3. Displays a call-to-action message if the user has a non-zero crvUSD balance
 ** 4. Provides a link to the veYFI staking page
 **
 ** The component is conditionally rendered based on the user's crvUSD balance.
 ************************************************************************************************/
function VEYFIStatus() {
	const account = useAccount();
	const [apr, setApr] = useState<number>(0);

	useEffect(() => {
		async function fetchVaultData() {
			try {
				const response = await fetch(
					'https://ydaemon.yearn.finance/1/vaults/0xBF319dDC2Edc1Eb6FDf9910E39b37Be221C8805F'
				);
				const data = await response.json();
				const stakingApr = data.staking?.rewards[0]?.apr;
				if (stakingApr) {
					setApr(stakingApr * 100); // Convert to percentage
				}
			} catch (error) {
				console.error('Error fetching vault data:', error);
			}
		}

		fetchVaultData();
	}, []);

	const {data: crvUSDBalance} = useReadContract({
		address: '0xBF319dDC2Edc1Eb6FDf9910E39b37Be221C8805F',
		abi: erc20Abi,
		functionName: 'balanceOf',
		args: [account.address as `0x${string}`]
	});

	if (crvUSDBalance === undefined || crvUSDBalance === 0n) {
		return null;
	}

	return (
		<div className="mt-8">
			<div className="w-full rounded-lg overflow-hidden bg-primary text-white mb-8 p-6">
				<div className="flex flex-col md:flex-row items-center justify-between w-full pb-2">
					<h2 className="text-2xl font-[700]">{`Yield is good, but more yield is good-er!`}</h2>
				</div>
				<div className="flex flex-col md:flex-row items-center justify-between w-full">
					<p>
						{`You can stake your ${STABLE_TOKEN_VAULT_NAME} into the veYFI gauge which boosts your APY from `}
						<strong>{`${(apr / 10).toFixed(2)}% to ${apr.toFixed(2)}%`}</strong>
						{` depending on the veYFI you have locked. Simply deposit and stake to start earning.`}
					</p>
				</div>
				<div className="mt-4">
					<A
						href="https://veyfi.yearn.fi/?search=crvUSD&tab=gauges"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-block px-6 py-3 bg-boost-primary text-white font-bold rounded-lg hover:bg-boost-primary/80 transition-colors">
						Deposit in Gauge
					</A>
				</div>
			</div>
		</div>
	);
}

export default function Home() {
	const {openConnectModal} = useConnectModal();
	const {openAccountModal} = useAccountModal();

	const tab = useTab();
	const account = useAccount();

	const leftActive =
		tab === 'stake' || tab === 'unstake' || tab === 'claim' || tab === 'get' || tab === 'learn_more_stake';

	return (
		<main className="flex flex-col items-center min-h-screen text-white">
			<Background className="opacity-20" />
			<div className="max-w-[1200px] w-full z-10">
				<Header
					items={headerItems}
					selected="Earn"
					launchText={account.address ? `${fAddress(account.address)}` : 'Connect Wallet'}
					onClickLaunch={account.address ? openAccountModal : openConnectModal}
				/>
				<Ticker
					yDaemon={YDAEMON}
					env={ENV}
				/>
				<section className="mt-32 md:mt-[5vh] sm:mx-4 lg:mx-0">
					<ExperienceToggle
						yDaemon={YDAEMON}
						env={ENV}
					/>

					<div className="flex flex-col lg:flex-row justify-center ">
						<div className="flex-1 bg-deeper-primary lg:rounded-bl-lg lg:rounded-tl-lg">
							<TabContent leftActive={leftActive} />
						</div>

						{leftActive ? (
							<YbsDataBox
								yDaemon={YDAEMON}
								env={ENV}
								className="lg:w-[408px] bg-primary flex flex-col gap-2 p-10 lg:rounded-br-lg lg:rounded-tr-lg"
							/>
						) : (
							<VaultDataBox
								yDaemon={YDAEMON}
								env={ENV}
								className="lg:w-[408px] bg-primary flex flex-col gap-2 p-10 lg:rounded-br-lg lg:rounded-tr-lg"
							/>
						)}
					</div>

					<VEYFIStatus />

					<div className="mt-8">
						<Vaults
							title="Curve vaults"
							filter={(vault: {
								category: string;
								endorsed: boolean;
								details: {isRetired: boolean; isHidden: boolean};
							}) => {
								return (
									vault.category === 'Curve' &&
									vault.endorsed &&
									!vault.details.isRetired &&
									!vault.details.isHidden
								);
							}}
						/>
					</div>
				</section>
			</div>
		</main>
	);
}

function TabContent(props: {leftActive: boolean}) {
	const tab = useTab();
	const {data, refetch} = useData(YDAEMON, ENV);

	return (
		<div className="flex flex-col">
			<h1 className="text-5xl p-8 font-[700]">
				{tab === 'stake' && `Stake ${LOCKER_TOKEN_NAME}`}
				{tab === 'unstake' && `Stake ${LOCKER_TOKEN_NAME}`}
				{tab === 'claim' && `Stake ${LOCKER_TOKEN_NAME}`}
				{tab === 'get' && `Stake ${LOCKER_TOKEN_NAME}`}
				{tab === 'learn_more_stake' && `Stake ${LOCKER_TOKEN_NAME}`}
				{tab === 'deposit' && `Auto-Compound ${LOCKER_TOKEN_NAME}`}
				{tab === 'withdraw' && `Auto-Compound ${LOCKER_TOKEN_NAME}`}
				{tab === 'get2' && `Auto-Compound ${LOCKER_TOKEN_NAME}`}
				{tab === 'learn_more_deposit' && `Auto-Compound ${LOCKER_TOKEN_NAME}`}
			</h1>
			{props.leftActive ? (
				<Header
					items={[
						{text: 'Stake', link: '/app/stake'},
						{text: 'Unstake', link: '/app/unstake'},
						{text: 'Claim Rewards', link: '/app/claim', notification: data.rewards.claimable > 0},
						{text: 'Get yCRV', link: '/app/get'},
						{text: 'Learn More', link: '/app/learn_more_stake'}
					]}
					launchApp={false}
					selected={
						tab === 'get'
							? 'Get yCRV'
							: tab === 'stake'
							? 'Stake'
							: tab === 'learn_more_stake'
							? 'Learn More'
							: tab === 'unstake'
							? 'Unstake'
							: tab === 'claim'
							? 'Claim Rewards'
							: ''
					}
					className="pl-4 mb-2 md:mb-0 md:pl-8"
					onClickLaunch={() => {}}
				/>
			) : (
				<Header
					items={[
						{text: 'Deposit', link: '/app/deposit'},
						{text: 'Withdraw', link: '/app/withdraw'},
						{text: 'Get yCRV', link: '/app/get2'},
						{text: 'Learn More', link: '/app/learn_more_deposit'}
					]}
					launchApp={false}
					selected={
						tab === 'deposit'
							? 'Deposit'
							: tab === 'learn_more_deposit'
							? 'Learn More'
							: tab === 'withdraw'
							? 'Withdraw'
							: tab === 'get2'
							? 'Get yCRV'
							: ''
					}
					className="pl-4 mb-2 md:mb-0 md:pl-8"
					onClickLaunch={() => {}}
				/>
			)}
			<div className="border-t-2 border-input-bg">
				{tab === 'stake' && (
					<div className="flex flex-col md:flex-row space-y-6 md:space-y-0 w-full pt-0">
						<div className="flex flex-col p-4 md:p-8 w-full md:w-1/2">
							<span className="font-thin pb-1 text-md">Stake yCRV</span>
							<Stake
								yDaemon={YDAEMON}
								env={ENV}
							/>
						</div>
						<div className="flex flex-col space-y-6 w-full md:w-1/2 p-4 md:p-8 pt-0">
							<span className="font-semibold">STAKE yCRV - EARN STABLES</span>
							<span className="font-thin opacity-70">
								{
									"Stake your yCRV and start earning a share of Yearn's veCRV stablecoin revenue today. You'll reach max boost and hit the maximum staking APR after just 4 weeks."
								}
							</span>
							<Image
								alt="charge multiplier"
								className=""
								src="/charge.png"
								width={370}
								height={136}
							/>
						</div>
					</div>
				)}
				{tab === 'unstake' && (
					<div className="flex flex-col md:flex-row space-y-6 md:space-y-0 w-full pt-0">
						<div className="flex flex-col p-4 md:p-8 w-full md:w-1/2">
							<span className="font-thin pb-1 text-md">Unstake yCRV</span>
							<Unstake
								yDaemon={YDAEMON}
								env={ENV}
							/>
						</div>
						<div className="flex flex-col space-y-6 w-full md:w-1/2 p-4 md:p-8 pt-0">
							<span className="font-semibold">UNSTAKE yCRV</span>
							<span className="font-thin opacity-70">
								{
									"Unstake your yCRV. You're free to unstake at any time with no lock-ups or penalties. Unstaked yCRV doesn't earn any yield. Withdrawals pull from the least boosted position."
								}
							</span>
							<Image
								alt="charge multiplier"
								className=""
								src="/charge.png"
								width={370}
								height={136}
							/>
						</div>
					</div>
				)}
				{tab === 'claim' && (
					<div className="flex flex-col md:flex-row space-y-6 md:space-y-0 w-full pt-0">
						<div className="flex flex-col space-y-4 p-4 md:p-8 w-full md:w-1/2">
							<span className="font-semibold">YOUR REWARD</span>
							<span className="font-semibold font-mono text-5xl">{fUSD(data.rewards.claimableUsd)}</span>
							<span className="flex items-end gap-1">
								<span className="font-mono opacity-50">
									<Tokens
										amount={data.rewards.claimable}
										decimals={data.rewards.decimals}
									/>
								</span>
								<span className="font-thin opacity-70">{STABLE_TOKEN_VAULT_NAME}</span>
							</span>
							<div>
								<ClaimAll
									yDaemon={YDAEMON}
									env={ENV}
								/>
							</div>
						</div>
						<div className="flex flex-col space-y-4 w-full md:w-1/2 p-4 md:p-8 pt-0">
							<span className="font-semibold">DESCRIPTION</span>
							<p className="font-thin opacity-70">
								{
									'Claim your crvUSD rewards. We already deposited your crvUSD into our auto-compounding crvUSD vault ('
								}
								<A
									target="_blank"
									rel="noreferrer"
									className="underline"
									href={`https://yearn.fi/v3/1/${STABLE_TOKEN_VAULT}`}>
									{STABLE_TOKEN_VAULT_NAME}
								</A>
								{').'}
							</p>
							<p className="font-thin opacity-70">
								{
									'That means your yield has been earning you additional yield from the moment we received it. Once claimed, your crvUSD vault holdings will appear below.'
								}
							</p>
							<div>
								<div className="font-thin opacity-70">{`Your ${STABLE_TOKEN_VAULT_NAME} balance`}</div>
								<A
									className="flex items-center gap-2 font-mono"
									href={`https://yearn.fi/v3/1/${STABLE_TOKEN_VAULT}`}
									target="_blank"
									rel="noreferrer">
									<PiVaultLight />
									<Tokens
										amount={data.rewards.vaultBalance}
										decimals={data.rewards.decimals}
									/>
									({fUSD(data.rewards.vaultBalanceUsd)})
								</A>
							</div>
						</div>
					</div>
				)}
				{(tab === 'get' || tab === 'get2') && (
					<div className="flex flex-col">
						<div className="flex flex-col gap-4 p-4 md:p-8 w-full md:w-2/3">
							<span className="text-xl font-bold">Supercharge your yield with yCRV</span>
							<p className="font-thin opacity-70">
								Zap any token within the yCRV ecosystem for any other, including staked positions. Maybe
								you want to zap for a higher yield. Maybe you just like zapping.
							</p>
						</div>
						<div className="w-full px-4 md:px-0 flex justify-center">
							<Zap onZap={() => refetch()} />
						</div>
					</div>
				)}
				{tab === 'learn_more_stake' && (
					<div className="flex flex-row space-y-6 w-full pt-0">
						<div className="flex flex-col space-y-4 p-4 md:p-8 w-full md:w-2/3">
							<span className="font-semibold">HOW IT WORKS</span>
							<p className="font-thin opacity-70">
								{
									"The longer you stake, the greater your boost! Yearn's yCRV staking contract incentivizes long-term users by boosting their yield (up to a maximum of 2.5x). You'll reach max boost and achieve the maximum staking APR less than four weeks after depositing your yCRV."
								}
							</p>
							<p className="font-thin opacity-70">
								{'For more information on yCRV and the yLockers ecosystem, read our'}{' '}
								<Link
									className="underline"
									href="https://docs.yearn.fi/getting-started/products/ylockers/overview">
									docs
								</Link>
								.
							</p>
						</div>
					</div>
				)}
				{tab === 'deposit' && (
					<div className="flex">
						<div className="flex flex-col p-4 md:p-8 w-full md:w-2/3">
							<span className="font-thin pb-1 text-md">Deposit</span>
							<Deposit
								yDaemon={YDAEMON}
								env={ENV}
							/>
							<span className="mt-4 font-thin opacity-70">
								{
									"Deposit your yCRV into Yearn's auto-compounding vault and start earning the maximum APY immediately. The vault will handle staking, claiming and swapping rewards, and reinvesting your yCRV for you."
								}
							</span>
						</div>
					</div>
				)}
				{tab === 'withdraw' && (
					<div className="flex">
						<div className="flex flex-col p-4 md:p-8 w-full md:w-2/3">
							<span className="font-thin pb-1 text-md">Withdraw</span>
							<Withdraw
								yDaemon={YDAEMON}
								env={ENV}
							/>
							<span className="mt-4 font-thin opacity-70">
								{
									"Withdraw your yCRV from Yearn's auto-compounding vault. Please note that this will unstake your yCRV (and unstaked yCRV doesn’t earn any yield)."
								}
							</span>
						</div>
					</div>
				)}
				{tab === 'learn_more_deposit' && (
					<div className="flex flex-row space-y-6 w-full pt-0">
						<div className="flex flex-col space-y-4 p-4 md:p-8 w-full md:w-2/3">
							<span className="font-semibold">HOW IT WORKS</span>
							<p className="font-thin opacity-70">
								{
									'Once a week, the vault claims its boosted share of crvUSD from the yCRV staker contract, swaps it for more yCRV, and deposits it back into the staker. On top of that, the vault is whitelisted - allowing it to earn max boost immediately on all reinvested yCRV.'
								}
							</p>
							<p className="font-thin opacity-70">
								{'For more information on yCRV and the yLockers ecosystem, read our'}{' '}
								<Link
									className="underline"
									href="https://docs.yearn.fi/getting-started/products/ylockers/overview">
									docs
								</Link>
								.
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

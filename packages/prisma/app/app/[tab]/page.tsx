'use client'

import Image from 'next/image'
import Link from 'next/link'
import Header, { headerItems } from '../../../components/Header'
import { Suspense } from 'react'
import { useConnectModal, useAccountModal } from '--lib/hooks/rainbowkit'
import { useAccount } from 'wagmi'
import { fAddress, fUSD } from '--lib/tools/format'
import useData from '--lib/hooks/useData'
import Tokens from '--lib/components/Tokens'
import ExperienceToggle from '--lib/components/ExperienceToggle'

import ClaimAll from '--lib/components/ClaimAll'
import Stake from '--lib/components/Stake'
import Unstake from '--lib/components/Unstake'
import Mint from '--lib/components/Mint'
import Deposit from '--lib/components/DepositV3'
import Withdraw from '--lib/components/WithdrawV3'

import { PiVaultLight } from 'react-icons/pi'
import env from '--lib/tools/env'
import Background from '../../../components/Background'
import A from '--lib/components/A'
import YbsDataBox from '--lib/components/YbsDataBox'
import VaultDataBox from '--lib/components/VaultDataBox'
import { useTab } from '--lib/hooks/useTab'
import Vaults from '--lib/components/Vaults'
import LegacyStakerBanner from '@/components/LegacyStaker/Banner'
import Ticker from '--lib/components/Ticker'

export default function Home() {
  const { openConnectModal  } = useConnectModal()
  const { openAccountModal } = useAccountModal()

  const tab = useTab()
  const account = useAccount()

  const leftActive = (tab === 'stake' || tab === 'unstake' || tab === 'claim' || tab === 'get' || tab === 'learn_more_stake')

  return (
    <main className="flex flex-col items-center min-h-screen text-white">
      <LegacyStakerBanner />
      <Background className="opacity-20" />
      <div className="max-w-[1200px] w-full z-10">
        <Header items={headerItems} selected="Earn" launchText={account.address ? `${fAddress(account.address)}` : 'Connect Wallet'} onClickLaunch={account.address ? openAccountModal : openConnectModal} />
        <Ticker />
        <section className="mt-32 md:mt-[5vh] mx-4 lg:mx-0">
          <ExperienceToggle />

          <div className="flex flex-col lg:flex-row justify-center ">
            <div className="flex-1 bg-deeper-primary lg:rounded-bl-lg lg:rounded-tl-lg">
              <Suspense fallback={<div>Loading...</div>}>
                <TabContent leftActive={leftActive} />
              </Suspense>
            </div>

            {leftActive 
              ? <YbsDataBox className="lg:w-[408px] bg-primary flex flex-col gap-2 p-10 lg:rounded-br-lg lg:rounded-tr-lg" /> 
              : <VaultDataBox className="lg:w-[408px] bg-primary flex flex-col gap-2 p-10 lg:rounded-br-lg lg:rounded-tr-lg" />
            }

          </div>
          <div className="mt-8">
            <Vaults title="Prisma vaults" 
              filter={(vault: { strategies: { name: string }[] }) => {
                return vault.strategies.some(strategy => strategy.name.toLowerCase().includes('prisma'))
              }} />
          </div>
        </section>
      </div>
    </main>
  )
}

function TabContent(props: { leftActive: boolean }) {
  const tab = useTab()
  const { data } = useData()

  return (
    <div className="flex flex-col">
      <h1 className="text-5xl p-8 font-[700]">
        {tab === 'stake' && `Stake ${env.LOCKER_TOKEN_NAME}`}
        {tab === 'unstake' && `Stake ${env.LOCKER_TOKEN_NAME}`}
        {tab === 'claim' && `Stake ${env.LOCKER_TOKEN_NAME}`}
        {tab === 'get' && `Stake ${env.LOCKER_TOKEN_NAME}`}
        {tab === 'learn_more_stake' && `Stake ${env.LOCKER_TOKEN_NAME}`}
        {tab === 'deposit' && `Auto-Compound ${env.LOCKER_TOKEN_NAME}`}
        {tab === 'withdraw' && `Auto-Compound ${env.LOCKER_TOKEN_NAME}`}
        {tab === 'learn_more_deposit' && `Auto-Compound ${env.LOCKER_TOKEN_NAME}`}
        
      </h1>
      {props.leftActive ? (
        <Header
          items={[
            { text: 'Stake', link: '/app/stake' },
            { text: 'Unstake', link: '/app/unstake' },
            { text: 'Claim Rewards', link: '/app/claim', notification: data.rewards.claimable > 0 },
            { text: `Get ${env.LOCKER_TOKEN_NAME}`, link: '/app/get' },
            { text: 'Learn More', link: '/app/learn_more_stake' }
          ]}
          launchApp={false}
          selected={tab === 'get' ? `Get ${env.LOCKER_TOKEN_NAME}` : tab === 'stake' ? 'Stake' : tab === 'learn_more_stake' ? 'Learn More' : tab === 'unstake' ? 'Unstake' : tab === 'claim' ? 'Claim Rewards' : ''}
          className="pl-4 mb-2 md:mb-0 md:pl-8"
          onClickLaunch={() => {}} />
      ) : (
        <Header
          items={[
            { text: 'Deposit', link: '/app/deposit' },
            { text: 'Withdraw', link: '/app/withdraw' },
            { text: 'Learn More', link: '/app/learn_more_deposit' },
          ]}
          launchApp={false}
          selected={tab === 'deposit' ? 'Deposit' : tab === 'learn_more_deposit' ? 'Learn More' : tab === 'withdraw' ? 'Withdraw' : ''}
          className="pl-4 mb-2 md:mb-0 md:pl-8"
          onClickLaunch={() => {}} />
      )}
      <div className="border-t-2 border-input-bg">
        {tab === 'stake' && (
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 w-full pt-0"> 
            <div className="flex flex-col p-4 md:p-8 w-full md:w-1/2">
              <span className="font-thin pb-1 text-md">Stake {env.LOCKER_TOKEN_NAME}</span>
              <Stake />
            </div>
            <div className="flex flex-col space-y-6 w-full md:w-1/2 p-4 md:p-8 pt-0">
              <span className="font-semibold">STAKE {env.LOCKER_TOKEN_NAME} - EARN STABLES</span>
              <span className="font-thin opacity-70">
                Stake your {env.LOCKER_TOKEN_NAME} and start earning a share of Yearn&apos;s ve{env.BASE_TOKEN_NAME} stablecoin revenue today. You&apos;ll reach max boost and hit the maximum staking APR after just 4 weeks.
              </span>
              <Image alt="charge multiplier" className="" src="/charge.png" width={370} height={136} />
            </div>
          </div>
        )}
        {tab === 'unstake' && (
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 w-full pt-0">
            <div className="flex flex-col p-4 md:p-8 w-full md:w-1/2">
              <span className="font-thin pb-1 text-md">Unstake {env.LOCKER_TOKEN_NAME}</span>
              <Unstake />
            </div>
            <div className="flex flex-col space-y-6 w-full md:w-1/2 p-4 md:p-8 pt-0">
              <span className="font-semibold">UNSTAKE {env.LOCKER_TOKEN_NAME}</span>
              <span className="font-thin opacity-70">
                Unstake your {env.LOCKER_TOKEN_NAME}. You&apos;re free to unstake at any time with no lock-ups or penalties. Unstaked {env.LOCKER_TOKEN_NAME} doesn&apos;t earn any yield. Withdrawals pull from the least boosted position.
              </span>
              <Image alt="charge multiplier" className="" src="/charge.png" width={370} height={136} />
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
                  <Tokens amount={data.rewards.claimable} decimals={data.rewards.decimals} />
                </span>
                <span className="font-thin opacity-70">{env.STABLE_TOKEN_VAULT_NAME}</span>
              </span>
              <div>
                <ClaimAll />
              </div>
            </div>
            <div className="flex flex-col space-y-4 w-full md:w-1/2 p-4 md:p-8 pt-0">
              <span className="font-semibold">DESCRIPTION</span>
              <p className="font-thin opacity-70">
                Claim your {env.STABLE_TOKEN_NAME} rewards. We already deposited your {env.STABLE_TOKEN_NAME} into our auto-compounding {env.STABLE_TOKEN_NAME} vault (
                <A target="_blank" rel="noreferrer" className="underline" href={`https://yearn.fi/v3/1/${env.STABLE_TOKEN_VAULT}`}>{env.STABLE_TOKEN_VAULT_NAME}</A>
                ).
              </p>
              <p className="font-thin opacity-70">
                That means your yield has been earning you additional yield from the moment we received it. Once claimed, your {env.STABLE_TOKEN_NAME} vault holdings will appear below.
              </p>
              <div>
                <div className="font-thin opacity-70">Your {env.STABLE_TOKEN_VAULT_NAME} balance</div>
                <A className="flex items-center gap-2 font-mono" href={`https://yearn.fi/v3/1/${env.STABLE_TOKEN_VAULT}`} target="_blank" rel="noreferrer">
                  <PiVaultLight />
                  <Tokens amount={data.rewards.vaultBalance} decimals={data.rewards.decimals} />
                  ({fUSD(data.rewards.vaultBalanceUsd)})
                </A>
              </div>
            </div>
          </div>
        )}
        {tab === 'get' && (
          <div className="flex">
            <div className="flex flex-col p-4 md:p-8 w-full md:w-2/3">
              <span className="font-thin pb-1 text-md">Mint {env.LOCKER_TOKEN_NAME} from {env.BASE_TOKEN_NAME}</span>
              <Mint />
              <div className="mt-4 flex flex-col space-y-4">
                <p className="font-thin opacity-70">
                  Convert your {env.BASE_TOKEN_NAME} to {env.LOCKER_TOKEN_NAME} using the {env.LOCKER_TOKEN_NAME} contract. This mints {env.LOCKER_TOKEN_NAME} in a 1:1 ratio. ⚠️ Depending on peg it may be more efficient to use a DEX and swap instead of minting.
                </p>
                <p className="font-thin opacity-70">
                  <b>⚠️ Important: </b>
                  yLocker tokens (such as {env.LOCKER_TOKEN_NAME}) can never be redeemed for the underlying locked tokens ({env.BASE_TOKEN_NAME}). However, because they are liquid, they can be traded on decentralized exchanges, and bought and sold at the current market rate.
                </p>
              </div>
            </div>
          </div>
        )}
        {tab === 'learn_more_stake' && (
          <div className="flex flex-row space-y-6 w-full pt-0"> 
            <div className="flex flex-col space-y-4 p-4 md:p-8 w-full md:w-2/3">
              <span className="font-semibold">HOW IT WORKS</span>
              <p className="font-thin opacity-70">
                The longer you stake, the greater your boost! Yearn&apos;s {env.LOCKER_TOKEN_NAME} staking contract incentivizes long-term users by boosting their yield (up to a maximum of 2.5x). You&apos;ll reach max boost and achieve the maximum staking APR less than four weeks after depositing your {env.LOCKER_TOKEN_NAME}.
              </p>
              <p className="font-thin opacity-70">
                For more information on {env.LOCKER_TOKEN_NAME} and the yLockers ecosystem, read our <Link className="underline" href="https://docs.yearn.fi/getting-started/products/ylockers/overview">docs</Link>.
              </p>
            </div>
          </div>
        )}
        {tab === 'deposit' && (
          <div className="flex">
            <div className="flex flex-col p-4 md:p-8 w-full md:w-2/3">
              <span className="font-thin pb-1 text-md">Deposit</span>
              <Deposit />
              <span className="mt-4 font-thin opacity-70">
                Deposit your {env.LOCKER_TOKEN_NAME} into Yearn&apos;s auto-compounding vault and start earning the maximum APY immediately. The vault will handle staking, claiming and swapping rewards, and reinvesting your {env.LOCKER_TOKEN_NAME} for you.
              </span>
            </div>
          </div>
        )}
        {tab === 'withdraw' && (
          <div className="flex">
            <div className="flex flex-col p-4 md:p-8 w-full md:w-2/3">
              <span className="font-thin pb-1 text-md">Withdraw</span>
              <Withdraw />
              <span className="mt-4 font-thin opacity-70">
                Withdraw your {env.LOCKER_TOKEN_NAME} from Yearn&apos;s auto-compounding vault. Please note that this will unstake your {env.LOCKER_TOKEN_NAME} (and unstaked {env.LOCKER_TOKEN_NAME} doesn&apos;t earn any yield).
              </span>
            </div>
          </div>
        )}
        {tab === 'learn_more_deposit' && (
          <div className="flex flex-row space-y-6 w-full pt-0"> 
            <div className="flex flex-col space-y-4 p-4 md:p-8 w-full md:w-2/3">
              <span className="font-semibold">HOW IT WORKS</span>
              <p className="font-thin opacity-70">
                Once a week, the vault claims its boosted share of {env.STABLE_TOKEN_NAME} from the {env.LOCKER_TOKEN_NAME} staker contract, swaps it for more {env.LOCKER_TOKEN_NAME}, and deposits it back into the staker. On top of that, the vault is whitelisted - allowing it to earn max boost immediately on all reinvested {env.LOCKER_TOKEN_NAME}.
              </p>
              <p className="font-thin opacity-70">
              For more information on {env.LOCKER_TOKEN_NAME} and the yLockers ecosystem, read our <Link className="underline" href="https://docs.yearn.fi/getting-started/products/ylockers/overview">docs</Link>.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "../components/Button";
import Input from "../components/Input";
import Header, { headerItems } from "../components/Header";
import { useSearchParams } from 'next/navigation';
import { Suspense, use, useEffect } from 'react';
import {   useConnectModal,
  useAccountModal,
  useChainModal, } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'



export default function Home() {
  const { openConnectModal  } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();

  const account = useAccount()

  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-r from-dark-black to-dark-blue text-white">
      <div className="w-full shadow-lg z-10"></div>
      <Image className="absolute left-[24%] w-[76%] opacity-20" src="/prisma.svg" width={200} height={200} alt="" />
      <div className="max-w-[1200px] w-full z-10">
        <Header items={headerItems} launchText={account.address ? `${account.address.substring(0, 6)}...${account.address.substring(38)}` : "Connect Wallet"} onClickLaunch={account.address ? openAccountModal : openConnectModal} />
        <section className="mt-[5vh] mx-4 lg:mx-0">
          <div className="flex justify-center mb-8 space-x-8">
            <Link href="/app?tab=stake"><div className={`bg-light-blue rounded-full w-[328px] px-2 py-2`}>
              <div className="flex justify-between items-center text-lg pl-4">EARN mkUSD <div className={`rounded-full bg-lighter-blue p-1 px-4`}>137.91%</div></div>
            </div></Link>
            <Link href="/app?tab=deposit"><div className={`bg-tab-inactive rounded-full w-[328px] px-2 py-2`}>
              <div className="flex justify-between items-center text-lg pl-4">EARN mkUSD <div className={`rounded-full bg-tab-inactive-inner p-1 px-4`}>137.91%</div></div>
            </div></Link>
          </div>
          <div className="flex flex-col lg:flex-row justify-center ">
            <div className="flex-1 bg-darker-blue lg:rounded-bl-lg lg:rounded-tl-lg">
              <Suspense fallback={<div>Loading...</div>}>
                <TabContent />
              </Suspense>
            </div>

            <div className="lg:w-[408px] bg-blue flex flex-col p-10 lg:rounded-br-lg lg:rounded-tr-lg">
              <span className="text-light-blue font-bold pb-2">AVERAGE STAKING APR</span>
              <span className="text-light-blue text-6xl font-mono font-bold mb-[19px]">137.91%</span>
              <div className="border-t-2 border-b-2 border-soft-blue my-4 py-6 flex flex-col space-y-2">
                <span className="font-semibold pb-4 text-lg">YOUR POSITION</span>
                <div className="flex justify-between">
                  <span className="font-thin opacity-70	">Staked Amount</span>
                  <span className="font-bold">0,000000</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-thin opacity-70	">APR</span>
                  <span className="font-bold">137.91%</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-thin opacity-70	">Boost Multiplier</span>
                  <span className="font-bold">2x</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-thin opacity-70	">Claimable Rewards</span>
                  <span className="font-bold">0,000000</span>
                </div>
              </div>
              <div className="flex flex-col space-y-2 pt-2">
                <span className="font-semibold pb-4 text-lg">YEARN BOOSTED STAKER</span>
                <div className="flex justify-between">
                  <span className="font-thin opacity-70	">Total Staked</span>
                  <span className="font-bold">420884.69</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-thin opacity-70	">Min/Max APR </span>
                  <span className="font-bold">10% {'—>'} 75%</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-thin opacity-70	">Average Boost Multiplier</span>
                  <span className="font-bold">1.7x</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-thin opacity-70	">Total Rewards Last Week</span>
                  <span className="font-bold">$100k</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function TabContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  return (
    <div className="flex flex-col">
      <h1 className="text-5xl p-8 font-[700]">
        {tab === 'stake' && "Stake yPrisma"}
        {tab === 'unstake' && "Unstake yPrisma"}
        {tab === 'claim' && "Claim Rewards"}
        {tab === 'get' && "Get yPrisma"}
        
      </h1>
      <Header
        items={[
          { text: 'Stake', link: '/app?tab=stake' },
          { text: 'Unstake', link: '/app?tab=unstake' },
          { text: 'Claim Rewards', link: '/app?tab=claim' },
          { text: 'Get yPRISMA', link: '/app?tab=get' },
        ]}
        launchApp={false}
        selected={tab === 'get' ? 'Get yPRISMA' : tab === 'stake' ? 'Stake' : tab === 'unstake' ? 'Unstake' : tab === 'claim' ? 'Claim Rewards' : ''}
        className="pl-8"
        onClickLaunch={() => {}}
      />
      <div className="border-t-2 border-input-bg">
        {tab === 'stake' && (
          <div className="flex flex-row space-y-6 w-full pt-0"> 
            <div className="flex flex-col space-y-6 p-8 pt-0 mt-6 w-1/2">
              <Input title="Stake yPRISMA" button="Stake" subtitle="You have 0,00 PRISMA" />
            </div>
            <div className="flex flex-col space-y-6 w-1/2 p-8 pt-0 mt-6">
              <span className="font-semibold">STAKE yPRISMA - EARN STABLES</span>
              <span className="font-thin opacity-70">Draper please write copy here. Draper please write copy here. Draper please write copy here. Draper please write copy here. </span>
              <Image alt="charge multiplier" className="" src="/charge.svg" width={370} height={136} />
            </div>
          </div>
        )}
        {tab === 'unstake' && (
          <div className="flex flex-row space-y-6 w-full pt-0"> 
            <div className="flex flex-col space-y-6 p-8 pt-0 mt-6 w-1/2">
              <Input title="Unstake yPRISMA" button="Unstake" subtitle="You have 0,00 PRISMA" />
            </div>
            <div className="flex flex-col space-y-6 w-1/2 p-8 pt-0 mt-6">
              <span className="font-semibold">UNSTAKE yPRISMA</span>
              <span className="font-thin opacity-70">Draper please write copy here. Draper please write copy here. Draper please write copy here. Draper please write copy here. </span>
              <Image alt="charge multiplier" className="" src="/charge.svg" width={370} height={136} />
            </div>
          </div>
        )}
        {tab === 'claim' && (
          <div className="flex flex-row space-y-6 w-full pt-0"> 
            <div className="flex flex-col space-y-4 p-8 pt-0 mt-6 w-1/2">
            <span className="font-semibold">YOUR REWARD</span>
            <span className="font-semibold text-5xl">$420.00</span>
            <span className="font-thin opacity-70">419.00 yvmkUSD-A</span>
            <div>
              <Button>Claim All</Button>
            </div>
            </div>
            <div className="flex flex-col space-y-4 w-1/2 p-8 pt-0 mt-6">
              <span className="font-semibold">DESCRIPTION</span>
              <span className="font-thin opacity-70">Draper please write copy here. Draper please write copy here. Draper please write copy here. Draper please write copy here. </span>
            </div>
          </div>
        )}
        {tab === 'get' && (
          <div className="flex">
            <div className="flex flex-col space-y-6 p-8 pt-0 mt-6 w-2/3">
              <span className="font-semibold">1. ZAP</span>
              <Input title="Zap PRISMA to yPRISMA" button="Zap" subtitle="You have 0,00 PRISMA" />
              <span className="font-semibold">2. CLAIM</span>
              <span className="font-thin opacity-70">You can farm PRISMA in different gauges, bla bla bla</span>
              <span>
                <Button>Claim</Button>
              </span>
            </div>
          </div>
        )}
      </div>
      {tab === 'stake' && (
        <span className="font-thin opacity-60 p-8 mt-[62px]">0x3A25A0a0c83c535f33ac74263e8D99CbF431E2C3</span>
      )}
      {tab === 'unstake' && (
        <span className="font-thin opacity-60 p-8 mt-[62px]">0x3A25A0a0c83c535f33ac74263e8D99CbF431E2C3</span>
      )}
      {tab === 'claim' && (
        <span className="font-thin opacity-60 p-8 mt-[145px]">0x3A25A0a0c83c535f33ac74263e8D99CbF431E2C3</span>
      )}
      {tab === 'get' && (
        <span className="font-thin opacity-60 p-8 mt-[33px]">0x3A25A0a0c83c535f33ac74263e8D99CbF431E2C3</span>
      )}
    </div>
  );
}
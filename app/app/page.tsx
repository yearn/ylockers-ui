"use client";

import Image from "next/image";
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
      <Image className="absolute top-o left-[24%] w-[76%]" src="/prisma.svg" width={200} height={200} alt="" />
      <div className="w-[1200px] z-10">
        <Header items={headerItems} launchText={account.address ? `${account.address.substring(0, 6)}...${account.address.substring(38)}` : "Connect Wallet"} onClickLaunch={account.address ? openAccountModal : openConnectModal} />
        <section className="mt-[5vh] ">
          <div className="flex justify-center ">
            <div className="bg-blue flex flex-col p-10 rounded-bl-lg rounded-tl-lg">
              <span className="text-light-blue font-bold pb-2">AVERAGE STAKING APR</span>
              <span className="text-light-blue text-6xl font-mono font-bold">137.91%</span>
              <div className="border-t-2 border-b-2 border-soft-blue my-4 py-6 flex flex-col space-y-2">
                <span className="font-semibold pb-4 text-lg">YOUR POSITION</span>
                <div className="flex justify-between">
                  <span className="font-thin opacity-70	">Your APR</span>
                  <span className="font-bold">137.91%</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-thin opacity-70	">Available to stake, yPRISMA</span>
                  <span className="font-bold">0,000000</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-thin opacity-70	">Staked, yPRISMA</span>
                  <span className="font-bold">0,000000</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-thin opacity-70	">Earned, yvmkUSD-A</span>
                  <span className="font-bold">0,000000</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-thin opacity-70	">Deposited into Vault</span>
                  <span className="font-bold">0,000000</span>
                </div>
              </div>
              <div className="flex flex-col space-y-2 pt-2">
                <span className="font-semibold pb-4 text-lg">YEARN TOTAL GOVERNANCE POSITION</span>
                <div className="flex justify-between">
                  <span className="font-thin opacity-70	">Price</span>
                  <span className="font-bold">420.69</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-thin opacity-70	">Prisma Ratio</span>
                  <span className="font-bold">69.420</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-thin opacity-70	">TVL</span>
                  <span className="font-bold">42 m</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-thin opacity-70	">vePRISMA</span>
                  <span className="font-bold">100%</span>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-darker-blue rounded-br-lg rounded-tr-lg">
              <Suspense fallback={<div>Loading...</div>}>
                <TabContent />
              </Suspense>
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
      <Header
        items={[
          { text: 'Stake', link: '/app?tab=stake' },
          { text: 'Unstake', link: '/app?tab=unstake' },
          { text: 'Claim Rewards', link: '/app?tab=claim' },
          { text: 'Get yPRISMA', link: '/app?tab=get' },
        ]}
        launchApp={false}
        selected={tab === 'get' ? 'Get yPRISMA' : tab === 'stake' ? 'Stake' : tab === 'unstake' ? 'Unstake' : tab === 'claim' ? 'Claim Rewards' : ''}
        className="pl-4"
        onClickLaunch={() => {}}
      />
      <div className="border-t-2 border-input-bg">
        {tab === 'stake' && (
          <div className="flex">
            <div className="flex flex-col space-y-6 border-r-2 border-input-bg w-1/2 p-6 pt-0 mt-6 h-[500px]">
              <span className="font-semibold">STAKE yPRISMA - EARN STABLES</span>
              <span className="font-thin opacity-70">Draper please write copy here. Draper please write copy here. Draper please write copy here. Draper please write copy here. </span>
              <Image alt="charge multiplier" className="" src="/charge.svg" width={370} height={136} />
              <Input title="Stake yPRISMA" button="Stake" subtitle="You have 0,00 PRISMA" />
            </div>
            <div className="flex flex-col space-y-6 w-1/2 p-6 pt-0 mt-6">
              <span className="font-semibold">AUTO COMPOUND YOUR yPRISMA</span>
              <span className="font-thin opacity-70">Draper please write copy here. Draper please write copy here. Draper please write copy here. Draper please write copy here. </span>
              <Input title="Deposit" button="Approve" subtitle="You have 0,00 PRISMA" />
            </div>
          </div>
        )}
        {tab === 'unstake' && (
          <div className="flex">
          <div className="flex flex-col space-y-6 border-r-2 border-input-bg w-1/2 p-6 pt-0 mt-6 h-[500px]">
            <span className="font-semibold">UNSTAKE yPRISMA - STOP EARN STABLES</span>
            <span className="font-thin opacity-70">Draper please write copy here. Draper please write copy here. Draper please write copy here. Draper please write copy here. </span>
            <Image alt="charge multiplier" className="" src="/charge.svg" width={370} height={136} />
            <Input title="Unstake yPRISMA" button="Stake" subtitle="You have 0,00 PRISMA" />
          </div>
          <div className="flex flex-col space-y-6 w-1/2 p-6 pt-0 mt-6">
            <span className="font-semibold">WITHDRAW FORM VAULT</span>
            <span className="font-thin opacity-70">Draper please write copy here. Draper please write copy here. Draper please write copy here. Draper please write copy here. </span>
            <Input title="Withdraw" button="Approve" subtitle="You have 0,00 PRISMA" />
          </div>
        </div>
        )}
        {tab === 'claim' && (
          <div className="flex">
            <div className="flex flex-col space-y-6 p-6 pt-0 mt-6 w-2/3">
              <span className="font-semibold">Pick your rewards</span>
              <Input title="Available Rewards" button="Claim" subtitle="" />
            </div>
          </div>
        )}
        {tab === 'get' && (
          <div className="flex">
            <div className="flex flex-col space-y-6 p-6 pt-0 mt-6 w-2/3">
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
    </div>
  );
}
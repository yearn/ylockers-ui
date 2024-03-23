"use client";

import Image from "next/image";
import Button from "../components/Button";
import Header from "../components/Header";
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-r from-dark-black to-dark-blue text-white">
      <Image className="absolute top-o left-[24%] w-[76%]" src="/prisma.svg" width={200} height={200} alt="" />
      <Header items={[
        { text: 'Earn', link: '/' },
        { text: 'About', link: '/about' },
        { text: 'Expired farms', link: '/expired-farms' },
      ]} launchText="Connect Wallet"/>
      <section className="mt-[5vh] z-10">
        <div className="w-full h-[624px] flex justify-center">
          <div className="w-[408px] bg-blue flex flex-col p-10 rounded-bl-lg rounded-tl-lg">
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
          <div className="w-[792px] bg-darker-blue">
            <Suspense fallback={<div>Loading...</div>}>
              <TabContent />
            </Suspense>
          </div>
        </div>
      </section>
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
          { text: 'Get yPRISMA', link: '/app?tab=get' },
          { text: 'Stake', link: '/app?tab=stake' },
          { text: 'Unstake', link: '/app?tab=unstake' },
          { text: 'Claim Rewards', link: '/app?tab=claim' },
        ]}
        launchApp={false}
        selected={tab === 'get' ? 'Get yPRISMA' : tab === 'stake' ? 'Stake' : tab === 'unstake' ? 'Unstake' : tab === 'claim' ? 'Claim Rewards' : ''}
        className="pl-4"
      />
      <div className="px-6">
        {tab === 'get' && (
          <div className="flex flex-col">
            <span className="font-semibold pb-4 text-lg">1. ZAP</span>
            <span className="font-thin pb-1">Zap PRISMA to yPRISMA</span>
            <div className="flex">
              <input type="number" className="w-full p-2 bg-input-bg rounded-lg w-[356px] mr-2" placeholder="100" />
              <Button>Zap</Button>
            </div>
            <span className="font-thin opacity-70 text-xs pl-3 pt-1">You have 0,00 PRISMA</span>
            <span className="font-semibold pt-8 pb-4 text-lg">2. CLAIM</span>
            <span className="font-thin opacity-70">You can farm PRISMA in different gauges, bla bla bla</span>
            <span className="pt-4">
              <Button>Claim</Button>
            </span>
          </div>
        )}
        {tab === 'stake' && (
          <>
          </>
        )}
        {tab === 'unstake' && (
          <>
          </>
        )}
        {tab === 'claim' && (
          <>
          </>
        )}
      </div>
    </div>
  );
}
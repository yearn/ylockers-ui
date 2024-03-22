"use client";

import Image from "next/image";
import Button from "../components/Button";
import Header from "../components/Header";
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

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
            <span className="border-t-2 border-b-2 border-soft-blue my-4 py-4 font-bold">YOUR POSITION</span>
            <span className="font-bold">YEARN TOTAL GOVERNANCE POSITION</span>
          </div>
          <div className="w-[792px] bg-darker-blue rounded-br-lg rounded-tr-lg">
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
          </div>
        </div>
      </section>
    </main>
  );
}
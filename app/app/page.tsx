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
          <div className="w-[408px] bg-blue">
           
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
  );
}
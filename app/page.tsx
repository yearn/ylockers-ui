'use client'

import Image from "next/image";
import Button from "./components/Button";
import Header from "./components/Header";
import Link from "next/link";
import useData from "@/hooks/useData";
import { fPercent } from "@/lib/format";
import bmath from "@/lib/bmath";

export default function Home() {
  const { data } = useData()

  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-r from-dark-black to-dark-blue text-white">
      <div className="w-full shadow-lg z-10"></div>
      <Image className="absolute left-[24%] w-[76%]" src="/prisma.svg" width={200} height={200} alt="" />
      <Header items={[
        { text: 'Earn', link: '/' },
        { text: 'About', link: '/about' },
        { text: 'Expired farms', link: '/expired' },
      ]} selected="Earn"/>
      <section className="px-8 xl:px-0 xl:w-[1200px] mt-[27vh] z-10">
        <div className="w-full">
          <h1 className="text-6xl font-bold">Put your<br />yPRISMA to work</h1>
          <p className="my-8 xl:w-[670px] font-thin">
            {`Each week, Yearn's vePRISMA position earns revenue from protocol fees and vote-maximized bribes.`}<br />
            {`This is converted to mkUSD stablecoin and distributed to yPRISMA stakers.`}
          </p>
          <div className="flex flex-wrap items-center space-x-4">
            <Link href="/app?tab=stake">
              <Button>Launch App</Button>
            </Link>
            <h2 className="text-4xl font-bold text-light-blue font-mono">APR {data.utilities && data.utilities.globalAverageApr.toString() !== '0' ? fPercent(bmath.div(data.utilities.globalAverageApr, 10n**18n)) : '--.--%'}</h2>
          </div>
        </div>
      </section>
    </main>
  );
}

'use client'

import Button from '--lib/components/Button'
import Header, { headerItems } from '../components/Header'
import Link from 'next/link'
import useData from '--lib/hooks/useData'
import { fPercent } from '--lib/tools/format'
import bmath from '--lib/tools/bmath'
import Background from '../components/Background'
import Ticker from '--lib/components/Ticker'

export default function Home() {
  const { data } = useData()

  return (
    <main className="flex flex-col items-center min-h-screen text-white">
      <Background />
      <Header items={headerItems} selected="Home" />
      <Ticker />
      <section className="px-8 xl:px-0 xl:w-[1200px] mt-[15vh] md:mt-[27vh] z-10">
        <div className="w-full px-12 md:px-0">
          <h1 className="text-6xl font-bold">Put your<br />yPRISMA to work</h1>
          <p className="my-8 xl:w-[670px] font-thin sm:whitespace-nowrap">
            {'Each week, Yearn\'s vePRISMA position earns revenue from protocol fees and optimized vote incentives.'}<br />
            {'This is converted to mkUSD stablecoin and distributed to yPRISMA stakers.'}
          </p>
          <div className="flex flex-wrap items-center space-x-4 flex-col md:flex-row space-y-8 md:space-y-0">
            <Link href="/app/stake">
              <Button>Launch App</Button>
            </Link>
            <h2 className="text-4xl font-bold text-bright-primary font-mono">APR {data.utilities && data.utilities.globalAverageApr.toString() !== '0' ? fPercent(bmath.div(data.utilities.globalAverageApr, 10n**18n)) : <span title="APR will show when migration period ends after first week.">🌈✨%</span>}</h2>
          </div>
        </div>
      </section>
    </main>
  )
}

"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import Header, { headerItems } from "../components/Header";
import { useSearchParams } from 'next/navigation';
import { Suspense, use, useEffect } from 'react';
import {   useConnectModal,
  useAccountModal,
  useChainModal, } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'
import { useState } from 'react';
import { fAddress } from "@/lib/format";
import { zeroAddress } from "viem";
import ApproveAndExecute from "../components/ApproveAndExecute";
import env from "@/lib/env";
import abis from "../abis";



export default function Home() {
  const { openConnectModal  } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  const account = useAccount()

  const leftActive = (tab === "stake" || tab === "unstake" || tab === "claim" || tab === "get")
  const rightActive = !leftActive

  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-r from-dark-black to-dark-blue text-white">
      <div className="w-full shadow-lg z-10"></div>
      <Image className="absolute left-[24%] w-[76%] opacity-20" src="/prisma.svg" width={200} height={200} alt="" />
      <div className="max-w-[1200px] w-full z-10">
        <Header items={headerItems} launchText={account.address ? `${fAddress(account.address)}` : "Connect Wallet"} onClickLaunch={account.address ? openAccountModal : openConnectModal} />
        <section className="mt-[5vh] mx-4 lg:mx-0">
          <div className="flex justify-center mb-8 space-x-8">
            <Link href="/app?tab=stake"><div className={`${(leftActive) ? 'bg-light-blue' : 'bg-tab-inactive'} rounded-full w-[328px] px-2 py-2`}>
              <div className="flex justify-between items-center text-lg pl-4">EARN mkUSD <div className={`rounded-full ${leftActive ? 'bg-lighter-blue' : 'bg-tab-inactive-inner'} p-1 px-4`}>137.91%</div></div>
            </div></Link>
            <Link href="/app?tab=deposit"><div className={`${(rightActive) ? 'bg-light-blue' : 'bg-tab-inactive'} rounded-full w-[328px] px-2 py-2`}>
              <div className="flex justify-between items-center text-lg pl-4">EARN yPRISMA <div className={`rounded-full ${rightActive ? 'bg-lighter-blue' : 'bg-tab-inactive-inner'} p-1 px-4`}>137.91%</div></div>
            </div></Link>
          </div>
          <div className="flex flex-col lg:flex-row justify-center ">
            <div className="flex-1 bg-darker-blue lg:rounded-bl-lg lg:rounded-tl-lg">
              <Suspense fallback={<div>Loading...</div>}>
                <TabContent leftActive={leftActive} />
              </Suspense>
            </div>

            <div className="lg:w-[408px] bg-blue flex flex-col p-10 lg:rounded-br-lg lg:rounded-tr-lg">
              {leftActive ? (
                <>
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
                </>
              ) :(
                <>
                  <span className="text-light-blue font-bold pb-2">AVERAGE STAKING APR</span>
                  <span className="text-light-blue text-6xl font-mono font-bold mb-[19px]">137.91%</span>
                  <div className="border-t-2 border-soft-blue my-4 py-6 flex flex-col space-y-2">
                    <span className="font-semibold pb-4 text-lg">YOUR POSITION</span>
                    <div className="flex justify-between">
                      <span className="font-thin opacity-70	">Deposited Amount, yPRISMA</span>
                      <span className="font-bold">413123.1233</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-thin opacity-70	">Earned</span>
                      <span className="font-bold">$234.23</span>
                    </div>
                  </div>
                </>
              )}
              
            </div>
          </div>
          <h1 className="text-4xl p-8 mt-4 font-[700] w-full flex justify-center">
            Prisma Vaults
          </h1>
          <TableComponent />
        </section>
      </div>
    </main>
  );
}

function TabContent(props: { leftActive: any; }) {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  return (
    <div className="flex flex-col">
      <h1 className="text-5xl p-8 font-[700]">
        {tab === 'stake' && "Stake yPRISMA"}
        {tab === 'unstake' && "Stake yPRISMA"}
        {tab === 'claim' && "Stake yPRISMA"}
        {tab === 'get' && "Stake yPRISMA"}
        {tab === 'deposit' && "Auto-compound yPRISMA"}
        {tab === 'withdraw' && "Auto-compound yPRISMA"}
        
      </h1>
      {props.leftActive ? (
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
      ) : (
        <Header
          items={[
            { text: 'Deposit', link: '/app?tab=deposit' },
            { text: 'Withdraw', link: '/app?tab=withdraw' },
          ]}
          launchApp={false}
          selected={tab === 'deposit' ? 'Deposit' : tab === 'withdraw' ? 'Withdraw' : ''}
          className="pl-8"
          onClickLaunch={() => {}}
        />
      )}
      <div className="border-t-2 border-input-bg">
        {tab === 'stake' && (
          <div className="flex flex-row space-y-6 w-full pt-0"> 
            <div className="flex flex-col space-y-6 p-8 pt-0 mt-6 w-1/2">
              <ApproveAndExecute task={{
                title: 'Stake yPRISMA',
                verb: 'stake',
                asset: env.YPRISMA,
                parameters: {
                  address: env.YPRISMA_BOOSTED_STAKER,
                  abi: abis.YearnBoostedStaker,
                  functionName: 'deposit'
                }
              }} />
            </div>
            <div className="flex flex-col space-y-6 w-1/2 p-8 pt-0 mt-6">
              <span className="font-semibold">STAKE yPRISMA - EARN STABLES</span>
              <span className="font-thin opacity-70">
                {`Stake your yPRISMA and start earning a share of Yearn's vePRISMA stablecoin revenue today. You'll reach max boost and hit the maximum staking APR after just 4 weeks.`}
              </span>
              <Image alt="charge multiplier" className="" src="/charge.svg" width={370} height={136} />
            </div>
          </div>
        )}
        {tab === 'unstake' && (
          <div className="flex flex-row space-y-6 w-full pt-0"> 
            <div className="flex flex-col space-y-6 p-8 pt-0 mt-6 w-1/2">
              <InputBox title="Unstake yPRISMA" button="Unstake" subtitle="You have 0,00 PRISMA" />
            </div>
            <div className="flex flex-col space-y-6 w-1/2 p-8 pt-0 mt-6">
              <span className="font-semibold">UNSTAKE yPRISMA</span>
              <span className="font-thin opacity-70">
                {`Unstake your yPRISMA. You're free to unstake at any time with no lock-ups or penalties. Please note that unstaked yPRISMA doesn’t earn any yield.`}
              </span>
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
              <p className="font-thin opacity-70">
                {`Claim your mkUSD rewards. We've already deposited your mkUSD into our auto-compounding mkUSD vault (`}<Link className="underline" href="https://etherscan.io/token/0x04aebe2e4301cdf5e9c57b01ebdfe4ac4b48dd13">yvmkUSD-A</Link>{`).`}
              </p>
              <p className="font-thin opacity-70">
                {`That means your yield has been earning you additional yield from the moment we received it! Once claimed, your mkUSD vault holdings will appear below.`}
              </p>
            </div>
          </div>
        )}
        {tab === 'get' && (
          <div className="flex">
            <div className="flex flex-col space-y-6 p-8 pt-0 mt-6 w-2/3">
              <InputBox title="Mint yPRISMA from PRISMA" button="Mint" subtitle="You have 0,00 PRISMA" />
              <div className="flex flex-col">
                <p className="font-thin opacity-70">
                {`Convert your PRISMA to yPRISMA. To ensure you receive the maximum amount of yPRISMA, the zapper will either mint new yPRISMA or swap via the Curve pool.`}
                </p>
                <p className="font-thin opacity-70">
                <b>⚠️ Important: </b>{`yLocker tokens (such as yPRISMA) can never be redeemed for the underlying locked tokens (PRISMA). However, because they are liquid, they can be traded on decentralized exchanges, and bought and sold at the current market rate.`}
                </p>
              </div>
            </div>
          </div>
        )}
        {tab === 'deposit' && (
          <div className="flex">
            <div className="flex flex-col space-y-6 p-8 pt-0 mt-6 w-2/3">
              <InputBox title="Deposit" button="Deposit" subtitle="You have 0,00 yPRISMA" />
              <span className="font-thin opacity-70">
                {`Deposit your yPRISMA into Yearn's auto-compounding vault and earn start earning the maximum APY immediately. The vault will handle staking, claiming and swapping rewards, and reinvesting your yPRISMA for you.`}
              </span>
            </div>
          </div>
        )}
        {tab === 'withdraw' && (
          <div className="flex">
            <div className="flex flex-col space-y-6 p-8 pt-0 mt-6 w-2/3">
              <InputBox title="Withdraw" button="Withdraw" subtitle="You have 0,00 yv-yPRISMA" />
              <span className="font-thin opacity-70">
                {`Withdraw your yPRISMA from Yearn's auto-compounding vault. Please note that this will unstake your yPRISMA (and unstaked yPRISMA doesn’t earn any yield).`}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const TableComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [sortColumn, setSortColumn] = useState('estApr');
  const [sortDirection, setSortDirection] = useState('desc');

  const [vaultData, setVaultData] = useState([]);

  useEffect(() => {
    const fetchVaultData = async () => {
      try {
        const response = await fetch('https://ydaemon.yearn.finance/1/vaults/all');
        const data = await response.json();
        setVaultData(data);
      } catch (error) {
        console.error('Error fetching vault data:', error);
      }
    };
  
    fetchVaultData();
  }, []);

  const handleSort = (column: any) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const filteredVaultData = vaultData.filter((vault:any) =>
    vault.strategies.some((strategy:any) => strategy.name.toLowerCase().includes('prisma'))
  );

  const sortedData = [...filteredVaultData].sort((a: any, b: any) => {
    if (sortColumn === 'token') {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return sortDirection === 'asc' ? -1 : 1;
      if (nameA > nameB) return sortDirection === 'asc' ? 1 : -1;
    } else if (sortColumn === 'estApr') {
      const aprA = a.apr.forwardAPR.netAPR;
      const aprB = b.apr.forwardAPR.netAPR;
      if (aprA < aprB) return sortDirection === 'asc' ? -1 : 1;
      if (aprA > aprB) return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredData = sortedData.filter((vault:any) =>
    vault.token.display_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="w-full rounded-lg overflow-hidden bg-darker-blue text-white mb-8">
      <div className="p-8 w-1/2">
        <InputBox
          // type="text"
          subtitle=""
          title="Search"
          value={searchTerm}
          onChange={(e:any) => setSearchTerm(e.target.value)}
          noButton
          inputType="text"
          placeholder="vault or strategy name..."
        />
      </div>
      <div className="pb-4">
        <table className="w-full text-left">
          <thead>
            <tr className="">
              <th
                className="text-xs font-thin py-2 hover:underline cursor-pointer pl-8"
                onClick={() => handleSort('token')}
              >
                Token {sortColumn === 'token' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th
                className="text-xs font-thin hover:underline py-2 cursor-pointer"
                onClick={() => handleSort('estApr')}
              >
                Est. APR {sortColumn === 'estApr' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th
                className="text-xs font-thin hover:underline py-2 cursor-pointer"
                onClick={() => handleSort('histApr')}
              >
                Hist. APR {sortColumn === 'histApr' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th
                className="text-xs font-thin hover:underline py-2 cursor-pointer"
                onClick={() => handleSort('available')}
              >
                Available {sortColumn === 'available' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th
                className="text-xs font-thin hover:underline py-2 cursor-pointer"
                onClick={() => handleSort('holdings')}
              >
                Holdings {sortColumn === 'holdings' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th
                className="text-xs font-thin hover:underline py-2 cursor-pointer pr-8"
                onClick={() => handleSort('deposits')}
              >
                Deposits {sortColumn === 'deposits' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item:any, index) => (
              <tr key={index} className="hover:bg-blue">
                <td className="text-lg py-4 cursor-pointer pl-8">{item.name}</td>
                <td className="text-lg font-mono py-4 cursor-pointer">{(item.apr.forwardAPR.netAPR * 100).toFixed(2)}%</td>
                <td className="text-lg font-mono py-4 cursor-pointer">{item.histApr}</td>
                <td className="text-lg font-mono py-4 cursor-pointer">{item.available}</td>
                <td className="text-lg font-mono py-4 cursor-pointer">{item.holdings}</td>
                <td className="text-lg font-mono py-4 cursor-pointer pr-8">{item.deposits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
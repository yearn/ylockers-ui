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
import { useState } from 'react';



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
        <Header items={headerItems} launchText={account.address ? `${account.address.substring(0, 6)}...${account.address.substring(38)}` : "Connect Wallet"} onClickLaunch={account.address ? openAccountModal : openConnectModal} />
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
              <Input title="Stake yPRISMA" button="Stake" subtitle="You have 0,00 yPRISMA" />
            </div>
            <div className="flex flex-col space-y-6 w-1/2 p-8 pt-0 mt-6">
              <span className="font-semibold">STAKE yPRISMA - EARN STABLES</span>
              <span className="font-thin opacity-70">Stake yPRISMA and earn mkUSD using the new Yearn Boosted Staker formula: your reward boost grows as the weeks passes after your deposit</span>
              <Image alt="charge multiplier" className="" src="/charge.svg" width={370} height={136} />
            </div>
          </div>
        )}
        {tab === 'unstake' && (
          <div className="flex flex-row space-y-6 w-full pt-0"> 
            <div className="flex flex-col space-y-6 p-8 pt-0 mt-6 w-1/2">
              <Input title="Unstake yPRISMA" button="Unstake" subtitle="You have 0,00 yPRISMA" />
            </div>
            <div className="flex flex-col space-y-6 w-1/2 p-8 pt-0 mt-6">
              <span className="font-semibold">UNSTAKE yPRISMA</span>
              <span className="font-thin opacity-70">Unstake yPRISMA and stop receiving mkUSD boosted rewards. Remaining staked funds continue with their current boost.</span>
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
              <span className="font-thin opacity-70">Claim your boosted staking rewards as mkUSD. Claiming does not alter boost.</span>
            </div>
          </div>
        )}
        {tab === 'get' && (
          <div className="flex">
            <div className="flex flex-col space-y-6 p-8 pt-0 mt-6 w-2/3">
              <span className="font-semibold">MINT</span>
              <div className="flex flex-col">
                <span className="font-thin opacity-70">Mint yPRISMA 1:1 using PRISMA</span>
                <span className="font-thin opacity-70">Consult yPRISMA peg at <Link className="underline" target="_blank" href="https://www.prisma.lol/">prisma.lol</Link></span>
              </div>
              <Input title="Mint yPRISMA from PRISMA" button="Mint" subtitle="You have 0,00 PRISMA" />
              <span className="font-semibold">CLAIM</span>
              <span className="font-thin opacity-70">idk really what this claim is for if not rewards, is this the claim prisma rewards as yprisma??</span>
              <span>
                <Button>Claim</Button>
              </span>
            </div>
          </div>
        )}
        {tab === 'deposit' && (
          <div className="flex">
            <div className="flex flex-col space-y-6 p-8 pt-0 mt-6 w-2/3">
              <Input title="Deposit" button="Deposit" subtitle="You have 0,00 yPRISMA" />
              <span className="font-thin opacity-70">Deposit into Yearn Auto-compound Vault, to let us use the rewards to maximize your yield a</span>
              <span className="font-thin opacity-70">Deposit into Yearn Auto-compound Vault, to let us use the rewards to maximize your yield a</span>
            </div>
          </div>
        )}
        {tab === 'withdraw' && (
          <div className="flex">
            <div className="flex flex-col space-y-6 p-8 pt-0 mt-6 w-2/3">
              <Input title="Withdraw" button="Withdraw" subtitle="You have 0,00 yv-yPRISMA" />
              <span className="font-thin opacity-70">Deposit into Yearn Auto-compound Vault, to let us use the rewards to maximize your yield a</span>
              <span className="font-thin opacity-70">Deposit into Yearn Auto-compound Vault, to let us use the rewards to maximize your yield a</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const TableComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tableData, setTableData] = useState([
    {
      token: 'LP Yearn PRISMA Vault',
      estApr: '98.30%',
      histApr: '81.24%',
      available: '0.00',
      holdings: '7311.4762',
      deposits: '1.224M',
    },
    {
      token: 'LP Yearn PRISMA Vault',
      estApr: '99.30%',
      histApr: '80.24%',
      available: '4.00',
      holdings: '731.4762',
      deposits: '11.24M',
    },
    {
      token: 'LP Yearn PRISMA Vault',
      estApr: '97.30%',
      histApr: '82.24%',
      available: '1.00',
      holdings: '73.4762',
      deposits: '1.214M',
    },
  ]);

  const [sortColumn, setSortColumn] = useState('estApr');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (column: any) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedData = [...tableData].sort((a, b) => {
    if (sortColumn) {
      const valueA = a[sortColumn as keyof typeof a];
      const valueB = b[sortColumn as keyof typeof b];
      if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredData = sortedData.filter((item) =>
    item.token.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full rounded-lg overflow-hidden bg-darker-blue text-white mb-8">
      <div className="p-4">
        <Input
          // type="text"
          subtitle=""
          title="Search"
          value={searchTerm}
          onChange={(e:any) => setSearchTerm(e.target.value)}
          // className="w-1/2 px-4 py-2 rounded-lg bg-darker-blue focus:outline-none"
          noButton
        />
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="">
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSort('token')}
            >
              Token {sortColumn === 'token' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSort('estApr')}
            >
              Est. APR {sortColumn === 'estApr' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSort('histApr')}
            >
              Hist. APR {sortColumn === 'histApr' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSort('available')}
            >
              Available {sortColumn === 'available' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSort('holdings')}
            >
              Holdings {sortColumn === 'holdings' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSort('deposits')}
            >
              Deposits {sortColumn === 'deposits' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index} className="hover:bg-blue">
              <td className="px-4 py-2">{item.token}</td>
              <td className="px-4 py-2">{item.estApr}</td>
              <td className="px-4 py-2">{item.histApr}</td>
              <td className="px-4 py-2">{item.available}</td>
              <td className="px-4 py-2">{item.holdings}</td>
              <td className="px-4 py-2">{item.deposits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
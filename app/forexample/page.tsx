import ApproveAndExecute from '../components/ApproveAndExecute'
import Erc20 from './Erc20'
import env from '@/lib/env'
import abis from '../abis'
import Stake from './Stake'

export default function ForExample() {
  return <div className="w-full min-h-screen px-96 flex flex-col items-center justify-center gap-12">
    <div className="p-24 w-full flex flex-col gap-4">
      <ApproveAndExecute task={{
        title: '🥩🥩🥩 Stake 🥩🥩🥩',
        verb: 'stake',
        asset: env.YPRISMA,
        parameters: {
          address: env.YPRISMA_BOOSTED_STAKER,
          abi: abis.YearnBoostedStaker,
          functionName: 'deposit'
        }
      }} />
      <Stake />
    </div>
    {/* <Erc20 address={env.PRISMA} className="p-24 border border-charge-red text-charge-red rounded-lg" /> */}
  </div>
}

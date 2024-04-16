import ApproveAndExecute from '../components/ApproveAndExecute'
import Erc20 from './Erc20'
import env from '@/lib/env'
import abis from '../abis'

export default function ForExample() {
  return <div className="w-full min-h-screen px-96 flex flex-col items-center justify-center gap-12">
    <div className="p-24 w-full flex flex-col gap-4">
      <div className="text-2xl">{`🥩 Stake`}</div>
      <ApproveAndExecute task={{
        asset: env.YPRISMA,
        verb: 'stake',
        parameters: {
          address: env.YPRISMA_BOOSTED_STAKER,
          abi: abis.YearnBoostedStaker,
          functionName: 'deposit'
        }
      }} />
    </div>
    {/* <Erc20 address={env.PRISMA} className="p-24 border border-charge-red text-charge-red rounded-lg" /> */}
  </div>
}

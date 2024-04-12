import Deposit from './Deposit'
import Erc20 from './Erc20'
import env from '@/lib/env'

export default function ForExample() {
  return <div className="w-full min-h-screen flex flex-col items-center justify-center gap-12">
    <Deposit />
    <Erc20 className="p-4 border border-red-400 text-red-400" address={env.PRISMA} />
  </div>
}

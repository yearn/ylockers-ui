'use client'

import { z } from 'zod'
import Button from '@/app/components/Button'
import Input from '@/app/components/Input'
import Tokens from '@/app/components/Tokens'
import { useSuspenseQuery } from '@tanstack/react-query'
import { erc20Abi } from 'viem'
import { useAccount, useBalance, useConfig } from 'wagmi'
import { readContractsQueryOptions } from 'wagmi/query'
import env from '@/lib/env'
import { fAddress } from '@/lib/format'

const tokenInfoSchema = z.object({
  symbol: z.string().default(''),
  name: z.string().default(''),
  decimals: z.number().default(0),
  balance: z.bigint().default(0n),
  allowance: z.bigint().default(0n)
})

function useTokenInfo(address: `0x${string}`) {
  const account = useAccount()

  const multicall = useSuspenseQuery(
    readContractsQueryOptions(useConfig(), { contracts: [
      { address, abi: erc20Abi, functionName: 'symbol' },
      { address, abi: erc20Abi, functionName: 'name' },
      { address, abi: erc20Abi, functionName: 'decimals' },
      { address, abi: erc20Abi, functionName: 'balanceOf', args: [account.address!] },
      { address, abi: erc20Abi, functionName: 'allowance', args: [account.address!, env.YPRISMA_BOOSTED_STAKER]},
      { address: env.PRISMA, abi: erc20Abi, functionName: 'balanceOf', args: [account.address!] },
      { address: env.YPRISMA_BOOSTED_STAKER, abi: erc20Abi, functionName: 'balanceOf', args: [account.address!] }
    ]})
  )

  if (multicall.error) {
    console.warn(multicall.error)
    return { ...multicall, data: tokenInfoSchema.parse({})}
  }

  return { ...multicall, data: tokenInfoSchema.parse({
    symbol: multicall.data?.[0]?.result,
    name: multicall.data?.[1]?.result,
    decimals: multicall.data?.[2]?.result,
    balance: multicall.data?.[3]?.result,
    allowance: multicall.data?.[4]?.result
  })}
}

export default function Deposit() {
  const account = useAccount()
  const config = useConfig()
  const { data: bal } = useBalance({ address: account.address })
  const { data: tokenInfo } = useTokenInfo(env.YPRISMA)

  if (!account.address) return <div>{'🤘 Connect your wallet'}</div>

  return <div className="p-4 border flex flex-col gap-4 border-purple-600">
    <div>{`🤘 Deposit for (${account.chainId}) ${fAddress(account.address)}`}</div>
    <div className="flex items-center gap-2">
      <Input type="number" value={0.00} />
      <Button>{'Deposit'}</Button>
    </div>
    <div>
      <div className="flex items-center gap-4">
        <div>yPrisma balance</div>
        <Tokens amount={tokenInfo.balance} decimals={tokenInfo.decimals} accuracy={4} />
      </div>
    </div>
  </div>
}

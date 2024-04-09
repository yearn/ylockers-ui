'use client'

import { z } from "zod";
import { useReadContract, useReadContracts } from "wagmi";
import { erc20Abi, zeroAddress } from "viem";

function useBurned(address: `0x${string}`) {
  return useReadContract({ 
    address, abi: erc20Abi, functionName: 'balanceOf', args: [zeroAddress]
  })
}

const tokenInfoSchema = z.object({
  symbol: z.string(),
  name: z.string(),
  decimals: z.number(),
  totalSupply: z.bigint({ coerce: true })
})

function useTokenInfo(address: `0x${string}`) {
  const multicall = useReadContracts({ contracts: [
    { address, abi: erc20Abi, functionName: 'symbol' },
    { address, abi: erc20Abi, functionName: 'name' },
    { address, abi: erc20Abi, functionName: 'decimals' },
    { address, abi: erc20Abi, functionName: 'totalSupply' }
  ]})

  if (multicall.isSuccess) {
    return { ...multicall, data: tokenInfoSchema.parse({
      symbol: multicall.data?.[0]?.result,
      name: multicall.data?.[1]?.result,
      decimals: multicall.data?.[2]?.result,
      totalSupply: multicall.data?.[3]?.result
    })}

  } else {
    return { ...multicall, data: undefined }

  }
}

export default function Erc20({ address }: { address: `0x${string}` }) {
  const { data: burned } = useBurned(address)
  const { data: tokenInfo } = useTokenInfo(address)
  return <div>
    <p>info ({tokenInfo?.symbol}) {tokenInfo?.name}</p>
    <p>supply {tokenInfo?.totalSupply.toString()}</p>
    <p>burned {burned?.toString()}</p>
  </div>
}

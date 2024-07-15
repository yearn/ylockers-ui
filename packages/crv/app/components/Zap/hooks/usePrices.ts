import { useSuspenseQuery } from '@tanstack/react-query'
import { Token } from '../tokens'

export default function usePrices({
  tokens
}: {
  tokens: Token[]
}) {
  const addressList = tokens.map(token => token.address).join(',')
  const request = `${process.env.NEXT_PUBLIC_YDAEMON}/${tokens[0].chainId}/prices/some/${addressList}?humanized=true`
  return useSuspenseQuery({
    queryKey: ['usePrices', addressList], 
    queryFn: () => fetch(request).then((res) => res.json()),
  })
}

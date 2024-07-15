import { cn } from '@/lib/shadcn'
import { useMemo } from 'react'
import { BsFillLightningFill } from 'react-icons/bs'
import { useProvider } from './provider'

export default function Bolt() {
  const { theme } = useProvider()

  const bg = useMemo(() => {
    if (theme === 'onit') return 'rainbow-no-bg'
    return ''
  }, [theme])

  const fill = useMemo(() => {
    if (theme === 'onit') return 'fill-neutral-200'
    return 'fill-light-blue'
  }, [theme])

  return <div className={cn(`
    p-2 border-8 border-darker-blue
    bg-input-bg rounded-primary`, bg)}>
    <BsFillLightningFill className={fill} />
  </div>
}

import { cn } from '@/lib/shadcn'
import { useMemo } from 'react'
import { BsFillLightningFill } from 'react-icons/bs'
import { useParameters } from './Parameters'

export default function Bolt() {
  const { theme } = useParameters()

  const bg = useMemo(() => {
    if (theme === 'onit') return 'rainbow-no-bg'
    return ''
  }, [theme])

  const fill = useMemo(() => {
    if (theme === 'onit') return 'fill-neutral-200'
    return 'fill-darker-blue'
  }, [theme])

  return <div className={cn(`
    p-1 border-8 border-darker-blue
    bg-input-bg rounded-primary`, bg)}>
    <BsFillLightningFill size={24} className={fill} />
  </div>
}

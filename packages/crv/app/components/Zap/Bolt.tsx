import { cn } from '@/lib/shadcn'
import { useCallback, useMemo } from 'react'
import { BsFillLightningFill } from 'react-icons/bs'
import { useParameters } from './Parameters'

export default function Bolt() {
  const { theme, reversable, reverse } = useParameters()

  const enabled = useMemo(() => {
    return (!theme || theme === 'default') && reversable
  }, [theme, reversable])

  const cursor = useMemo(() => {
    if (enabled) return 'cursor-pointer'
    return ''
  }, [enabled])

  const bg = useMemo(() => {
    if (theme === 'onit') return 'rainbow-no-bg'
    return ''
  }, [theme])

  const fill = useMemo(() => {
    if (theme === 'onit') return 'fill-neutral-200'
    return 'fill-darker-blue'
  }, [theme])

  const divHover = useMemo(() => {
    if (enabled) return ''
    return ''
  }, [enabled])

  const iconHover = useMemo(() => {
    if (enabled) return 'group-hover:fill-lighter-blue'
    return ''
  }, [enabled])

  const onClick = useCallback(() => {
    if (enabled) reverse()
  }, [enabled, reverse])

  return <div onClick={onClick} className={cn(`group
    p-1 border-8 border-darker-blue
    bg-input-bg rounded-primary pointer-events-auto`, bg, cursor, divHover)}>
    <BsFillLightningFill size={24} className={cn(fill, iconHover)} />
  </div>
}

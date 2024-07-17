'use client'

import { cn } from '@/lib/shadcn'
import Image from 'next/image'
import { useMemo, useState } from 'react'

export default function ImageOrBg(props : {
  alt: string,
  src: string,
  width: number,
  height: number,
  className?: string,
  bgClassName: string
}) {
  const [loaded, setLoaded] = useState(false)
  const imageClassName = useMemo(() => loaded ? 'opacity-1' : 'opacity-0', [loaded])
  const bgClassNameInner = useMemo(() => loaded ? 'hidden' : 'block', [loaded])
  return <div className={cn('relative', `w-[${props.width}px]`, `h-[${props.height}px]`)}>
    <div className={cn(`absolute z-10 inset-0 w-[${props.width}px]`, `h-[${props.height}px]`, props.bgClassName, bgClassNameInner)}></div>
    <Image {...props} onLoad={() => setLoaded(true)} className={cn('absolute z-20 inset-0', props.className, imageClassName)} />
  </div>
}

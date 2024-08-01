'use client'

import { cn } from '@/lib/shadcn'
import Image, { ImageProps } from 'next/image'
import { useMemo, useState } from 'react'

interface ImageOrBgProps extends Omit<ImageProps, 'onLoad'> {
  bgClassName: string
}

export default function ImageOrBg({ bgClassName, ...imageProps }: ImageOrBgProps) {
  const [loaded, setLoaded] = useState(false)
  const imageClassName = useMemo(() => loaded ? 'opacity-1' : 'opacity-0', [loaded])
  const bgClassNameInner = useMemo(() => loaded ? 'hidden' : 'block', [loaded])

  return (
    <div className={cn('relative', `w-[${imageProps.width}px]`, `h-[${imageProps.height}px]`)}>
      <div className={cn(`absolute z-10 inset-0 w-[${imageProps.width}px]`, `h-[${imageProps.height}px]`, bgClassName, bgClassNameInner)}></div>
      <Image 
        {...imageProps} 
        onLoad={() => setLoaded(true)} 
        className={cn('absolute z-20 inset-0', imageProps.className, imageClassName)} 
      />
    </div>
  )
}

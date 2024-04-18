'use client'

import React, { forwardRef, ButtonHTMLAttributes, useMemo } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
  style?: 'default' | 'transparent' | 'onit'
  onClick?: () => void
}

const Button = forwardRef<HTMLButtonElement, Props>(({ className, style, onClick, children, ...props }, ref) => {
  const bg = useMemo(() => {
    if (style === 'transparent') return 'bg-transparent'
    if (style === 'onit') return 'bg-transparent hover:bg-lighter-blue'
    return 'bg-light-blue hover:bg-lighter-blue'
  }, [style])

  const border = useMemo(() => {
    if (style === 'transparent') return 'border-2 border-light-blue hover:border-lighter-blue'
    if (style === 'onit') return 'p-2'
    return 'border-2 border-transparent'
  }, [style])

  const animate = useMemo(() => {
    if (style === 'onit') return 'rainbow'
    return ''
  }, [style])

  return <button onClick={onClick} ref={ref} {...props} className={`
    px-12 py-2 font-bold rounded-lg
    disabled:bg-disabled-bg disabled:text-disabled-text
    ${border} ${bg} ${animate}
    ${className}`}>
    {children}
  </button>
})

Button.displayName = 'Button'

export default Button

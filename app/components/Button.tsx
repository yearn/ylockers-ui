'use client'

import React, { forwardRef, ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
  style?: 'default' | 'transparent'
  onClick?: () => void
}

const Button = forwardRef<HTMLButtonElement, Props>(({ className, style, onClick, children, ...props }, ref) => {
  return <button onClick={onClick} ref={ref} {...props} className={`
    px-12 py-2 font-bold rounded-lg

    ${style === 'transparent' 
      ? 'border-2 border-light-blue hover:border-lighter-blue' 
      : 'bg-light-blue hover:bg-lighter-blue'}

    disabled:bg-disabled-bg disabled:text-disabled-text
    ${className}`}>
    {children}
  </button>
})

Button.displayName = 'Button'

export default Button

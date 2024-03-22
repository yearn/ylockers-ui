import React, { forwardRef, ButtonHTMLAttributes, useCallback } from 'react'

type ButtonStyle = 'default' | 'transparent'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
  style?: ButtonStyle
  onClick?: () => void
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, style, onClick, children, ...props }, ref) => {
  return <button onClick={onClick} ref={ref} {...props} className={`
    px-12 py-2 font-bold rounded-lg
    ${style === 'transparent' 
      ? 'border-2 border-light-blue hover:border-lighter-blue' 
      : 'bg-light-blue hover:bg-lighter-blue'}
    ${className}`}>
    {children}
  </button>
})

Button.displayName = 'Button'

export default Button

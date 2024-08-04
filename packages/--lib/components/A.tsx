import React, { forwardRef, AnchorHTMLAttributes } from 'react'

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  className?: string
}

const A = forwardRef<HTMLAnchorElement, AnchorProps>(({ className, children, ...props }, ref) => (
  <a ref={ref}
    {...props}
    className={`
  hover:underline hover:text-bright-primary hover:decoration-bright-primary
  active:underline active:text-charge-yellow active:decoration-charge-yellow
  ${className}`}>
    {children}
  </a>
))

A.displayName = 'A'

export default A

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

export default function Indeterminate({ 
  sweepRange: sweep, run: run, color, pulse, className, children 
}: {
  sweepRange: { from: number, to: number },
  color?: string,
  run?: boolean,
  pulse?: boolean,
  className?: string,
  children: ReactNode 
}) {
  return <div className={`
    relative w-full h-[40px] 
    flex items-center 
    bg-input-bg rounded-lg
    ${className}`}>
    <motion.div 
      key={run ? 'run' : 'idle'}
      animate={{ width: `${run ? sweep.to : sweep.from}%` }}
      transition={{
        duration: 30,
        ease: 'easeOut'
      }}
      style={{ width: `${sweep.from}%` }}
      className={`absolute z-0 inset-0
      bg-${color ? color : 'dark-black'}/60
      ${run ? 'rounded-l-lg' : 'rounded-lg'}
      ${run ? 'animate-pulse' : ''}`} />
    <div className="absolute z-10 inset-0 px-4 flex items-center gap-2">
      {children}
    </div>
    <div className={`absolute z-20 inset-0 rounded-lg 
    border-2 border-${color ? color: 'transparent'}
    ${pulse ? 'animate-pulse' : ''}`} />
  </div>
}

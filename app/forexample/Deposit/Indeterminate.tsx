import { ReactNode } from 'react'
import { motion } from 'framer-motion'

export default function Indeterminate({ 
  sweep, start, ring, ringPulse, className, children 
}: { 
  sweep: { from: number, to: number },
  start?: boolean,
  ring?: string,
  ringPulse?: boolean,
  className?: string,
  children: ReactNode 
}) {
  return <div className={`
    relative w-full h-[40px] 
    flex items-center 
    bg-input-bg rounded-lg
    ${className}`}>
    <motion.div 
      key={start ? 'start' : 'idle'}
      animate={{ width: `${start ? sweep.to : sweep.from}%` }}
      transition={{
        duration: 30,
        ease: 'easeOut'
      }}
      style={{ width: `${sweep.from}%` }}
      className={`absolute z-0 inset-0
      bg-dark-black/60 rounded-l-lg animate-pulse`} />
    <div className="absolute z-10 inset-0 px-4 flex items-center gap-2">
      {children}
    </div>
    <div className={`absolute z-20 inset-0 rounded-lg 
    border-2 ${ring ? ring: 'border-transparent'}
    ${ringPulse ? 'animate-pulse' : ''}`} />
  </div>
}

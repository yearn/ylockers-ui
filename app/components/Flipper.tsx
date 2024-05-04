import { springs } from '@/lib/motion'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
import { useMemo } from 'react'

export default function Flipper({ className, children }: { className?: string, children: number | string }) {
  const chars = useMemo(() => children.toString().split(''), [children])
  return <div className={`flex items-center ${className}`}>
    <AnimatePresence initial={false} mode="popLayout">
      {chars.map((char, index) => <motion.div key={`${index}-${char}`}
        transition={springs.glitchy}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}>
          {char}
      </motion.div>)}
    </AnimatePresence>
  </div>
}

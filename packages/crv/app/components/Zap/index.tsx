'use client'

import { Suspense, useState } from 'react'
import { motion } from 'framer-motion'
import Bolt from './Bolt'
import { Action, ActionDisplay } from './Action'
import InputPanel from './InputPanel'
import SelectToken from './SelectToken'
import Parameters from './Parameters'
import { useMounted } from '../../../hooks/useMounted'
import Notification from './Notification'
import { springs } from '@/lib/motion'
import Contracts from './Contracts'
import { Token } from './tokens'

function Layout() {
  const [selectTokenMode, setSelectTokenMode] = useState<'in' | 'out' | undefined>()
  const mounted = useMounted()

  return <div className="w-full sm:w-[32rem] sm:p-4 flex flex-col gap-1">

    <div className="h-[22.5rem]">
      {selectTokenMode && <motion.div key={`select-token-${selectTokenMode}`}
        transition={springs.rollin}
        initial={ mounted ? { y: 10 } : false }
        animate={{ y: 0 }}>
        <Suspense fallback={<></>}>
          <SelectToken mode={selectTokenMode} onClose={() => setSelectTokenMode(undefined)} />
        </Suspense>
      </motion.div>}

      {!selectTokenMode && <motion.div key="io"
        transition={springs.rollin}
        initial={ mounted ? { y: 10 } : false }
        animate={{ y: 0 }}
        className={`
        relative h-[22rem] flex flex-col gap-2
        bg-transparent rounded-primary`}>
        <InputPanel mode="in" onSelectToken={() => setSelectTokenMode('in')} />
        <InputPanel mode="out" onSelectToken={() => setSelectTokenMode('out')} />
        <div className={`pt-1
          isolate absolute z-50 inset-0 
          flex items-center justify-center
          pointer-events-none`}>
          <Bolt />
        </div>
      </motion.div>}
    </div>

    <Suspense fallback={<ActionDisplay disabled={true} className="py-3 w-full" />}>
      <Action className="py-3 w-full select-none" />
    </Suspense>

    <Notification className="h-16 px-2" />
  </div>
}

export default function Zap({
  onZap
}: {
  onZap?: (inputToken: Token, inputAmount: string, outputToken: Token, outputAmount: string) => void
}) {
  return (
    <Parameters onZap={onZap}>
      <Contracts>
        <Layout />
      </Contracts>
    </Parameters>
  )
}

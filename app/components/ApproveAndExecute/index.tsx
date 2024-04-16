'use client'

import { motion } from 'framer-motion'
import { TfiClose } from 'react-icons/tfi'
import Input from './Input'
import Provider, { Step, StepSchema, useProvider } from './provider'
import Approve from './Approve'
import Execute from './Execute'
import Done from './Done'
import { springs } from '@/lib/motion'
import { UseSimulateContractParameters } from 'wagmi'

const steps: {
  [key in Step]: JSX.Element
} = {
  [StepSchema.Enum.Input]: <Input />,
  [StepSchema.Enum.Approve]: <Approve />,
  [StepSchema.Enum.Execute]: <Execute />,
  [StepSchema.Enum.Done]: <Done />
}

function Provided() {
  const { title, step, veryFirstStep, firstStep, lastStep, reset } = useProvider()
  return <div className="flex flex-col gap-2">
    <div><span className="font-thin text-md">{title}</span></div>
    <div className="relative w-full h-[64px] flex items-start">
      <motion.div key={step}
        className="w-full"
        transition={springs.rollin}
        initial={{ x: veryFirstStep ? 0: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -40, opacity: 0 }}>
        {steps[step]}
      </motion.div>
      {!(firstStep || lastStep) && <motion.div
        transition={springs.rollin}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }} 
        className="absolute -left-6 top-0 h-[40px] flex items-center justify-center">
        <button onClick={reset}>
          <TfiClose />
        </button>
      </motion.div>}
    </div>
  </div>
}

export type Task = {
  title: string
  verb: string
  asset: `0x${string}`
  parameters: UseSimulateContractParameters
}

export default function ApproveAndExecute({ task }: { task: Task }) {
  return <Provider task={task}><Provided /></Provider>
}

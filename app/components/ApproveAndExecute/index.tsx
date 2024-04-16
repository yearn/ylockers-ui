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
  [StepSchema.Enum.Input]: withSlide(<Input />, StepSchema.Enum.Input),
  [StepSchema.Enum.Approve]: withSlide(<Approve />, StepSchema.Enum.Approve),
  [StepSchema.Enum.Execute]: withSlide(<Execute />, StepSchema.Enum.Execute),
  [StepSchema.Enum.Done]: withSlide(<Done />, StepSchema.Enum.Done)
}

function withSlide(element: JSX.Element, key: any) {
  return <motion.div key={key}
    className="w-full"
    transition={springs.rollin}
    initial={{ x: 40, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -40, opacity: 0 }}>
    {element}
  </motion.div>
}

function Provided() {
  const { step, firstStep, lastStep, reset } = useProvider()
  return <div className="relative w-full h-[64px] flex items-start">
    {steps[step]}
    {!(firstStep || lastStep) && <motion.div
      transition={springs.rollin}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }} 
      className="absolute -left-8 top-0 h-[40px] flex items-center justify-center">
      <button onClick={reset}>
        <TfiClose />
      </button>
    </motion.div>}
  </div>
}

export type Task = {
  asset: `0x${string}`,
  parameters: UseSimulateContractParameters,
  verb: string
}

export default function ApproveAndExecute({ task }: { task: Task }) {
  return <Provider task={task}><Provided /></Provider>
}

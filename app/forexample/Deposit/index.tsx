'use client'

import { motion } from 'framer-motion'
import Input from './Input'
import Provider, { Step, StepSchema, useProvider } from './provider'
import Approve from './Approve'
import Confirm from './Confirm'
import Done from './Done'

const steps: {
  [key in Step]: JSX.Element
} = {
  [StepSchema.Enum.Input]: withSlide(<Input />, StepSchema.Enum.Input),
  [StepSchema.Enum.Approve]: withSlide(<Approve />, StepSchema.Enum.Approve),
  [StepSchema.Enum.Confirm]: withSlide(<Confirm />, StepSchema.Enum.Confirm),
  [StepSchema.Enum.Done]: withSlide(<Done />, StepSchema.Enum.Done)
}

// stiffness: 700,
// damping: 30

function withSlide(element: JSX.Element, key: any) {
  return <motion.div key={key}
    className="w-full"
    transition={{ type: 'spring', stiffness: 2200, damping: 32 }}
    initial={{ x: 40, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -40, opacity: 0 }}>
    {element}
  </motion.div>
}

function Provided() {
  const {step} = useProvider()
  return <div className="w-full h-[64px] flex items-start">
    {steps[step]}
  </div>
}

export default function Deposit() {
  return <Provider><Provided /></Provider>
}

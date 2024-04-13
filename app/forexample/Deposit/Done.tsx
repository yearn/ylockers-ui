import { useProvider } from './provider'
import Button from '@/app/components/Button'

export default function Action() {
  const { stepForward } = useProvider()

  return <div className="w-full flex flex-col gap-2">
    <div className="flex items-center justify-between gap-2">
      <div>🥳 Done!</div>
      <Button onClick={stepForward}>OK</Button>
    </div>
    <div className="flex items-center gap-1 text-xs">

    </div>
  </div>
}

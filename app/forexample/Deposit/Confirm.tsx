import Indeterminate from './Indeterminate'
import { useProvider } from './provider'

export default function Confirm() {
  const { stepForward } = useProvider()

  return <div onClick={stepForward} className="w-full flex flex-col gap-2">
    <Indeterminate sweep={{ from: 50, to: 20 }}>Confirm deposit..</Indeterminate>
  </div>
}

import { cn } from '../tools/tailwind'

export default function Ahoy({ className }: { className?: string }) {
  return <div className={cn(`
    my-6 p-4 inline-flex
    bg-one-950 text-three-400
    border-2 border-two-400 rounded-one
    ${className}`)}>
    🦜 Monorepo Ahoy!!
  </div>
}

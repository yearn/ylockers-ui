import Ahoy from '../components/Ahoy'

export default function Home() {
  return <main className="flex min-h-screen flex-col items-center justify-center gap-12">
    <div className="text-4xl font-bold">yLockers Monorepo - Lib</div>
    <Ahoy className="text-4xl" />
  </main>
}

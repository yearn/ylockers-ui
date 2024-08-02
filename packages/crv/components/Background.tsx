import Image from 'next/image'

export default function Background({ className }: { className?: string }) {
  return <>
    <div className="fixed w-full shadow-lg z-10"></div>
    <div className="fixed w-full h-screen bg-[linear-gradient(350deg,var(--tw-gradient-from),var(--tw-gradient-to))] from-dark-black to-dark-blue" />
    <Image className={`absolute left-[40%] w-[60%] ${className}`} src="/curve-bg.svg" width={1600} height={600} alt="" />
  </>
}

import Image from "next/image";
import Button from "./components/controls/Button";
import Header from "./components/controls/Header";

export default function Home() {
  return (
    <main className="flex flex-col items-start min-h-screen px-80 bg-gradient-to-r from-dark-black to-dark-blue text-white">
      <Image className="absolute top-o left-[24vw] w-[76vw]" src="/prisma.svg" width={200} height={200} alt="" />
      <Header />
      <section className="mt-[27vh]">
        <h1 className="text-6xl font-bold">Put your<br />yPRISMA to work</h1>
        <p className="my-8 w-[670px] font-thin">Each week, Yearn&apos;s vePRISMA position earns protocol revenue, bribes, and boosting fees.<br />This revenue is converted to mkUSD stablecoin and distributed to yPRISMA stakers at the start of the week.</p>
        <div className="flex items-center space-x-4">
          <Button>Launch App</Button>
          <h2 className="text-3xl font-bold text-light-blue font-mono">APR 137.91%</h2>
        </div>
      </section>
    </main>
  );
}

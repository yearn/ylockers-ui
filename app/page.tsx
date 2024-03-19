import Image from "next/image";

type ButtonType = "default" | "transparent"

const Button = ({ type="default", disabled=false, children }) => (
  <button className={
    "px-8 py-2 font-bold rounded-lg" + " " +
    (type === "default" ? "bg-light-blue hover:bg-lighter-blue" :
    type === "transparent" ? "border-2 border-light-blue hover:border-lighter-blue" : "")
  }>
    {children}
  </button>
);

const Header = () => (
  <header className="flex justify-between items-center w-full h-[72px]">
    <div className="space-x-4">
      <a href="#" className="p-4">Earn</a>
      <a href="#" className="p-4">About</a>
      <a href="#" className="p-4">Expired farms</a>
    </div>
    <Button type="transparent">Launch App</Button>
  </header>
)

export default function Home() {
  return (
    <main className="flex flex-col items-start min-h-screen px-48 bg-gradient-to-r from-dark-black to-dark-blue">
      <Header />
      <section className="mt-[30vh]">
        <h1 className="text-6xl font-bold">Put your<br />yPRISMA to work</h1>
        <p className="my-8">Each week, Yearn’s vePRISMA position earns protocol revenue, bribes, and boosting fees.<br />This revenue is converted to mkUSD stablecoin and distributed to yPRISMA stakers at the start of the week.</p>
        <div className="flex items-center space-x-4">
          <Button>Launch App</Button>
          <h2 className="text-3xl font-bold text-light-blue">APR 137.91%</h2>
        </div>
      </section>
    </main>
  );
}

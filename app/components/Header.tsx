import Button from "./Button";
import Link from "next/link";


const Header = () => (
  <header className="flex justify-between items-center w-[1200px] h-[72px] z-10 my-2">
    <div className="space-x-4">
      <Link href="/" className="mx-2 py-2 font-bold border-b-2" >
        Earn
      </Link>
      <Link href="/about" className="mx-2 py-2 font-light hover:border-b-2">
        About
        </Link>
      <a href="#" className="mx-2 py-2 font-light hover:border-b-2">Expired farms</a>
    </div>
    <Link href="/app">
      <Button style="transparent">Launch App</Button>
    </Link>
  </header>
)

export default Header
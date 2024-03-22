import Button from "./Button";
import Link from "next/link";


const Header = ({ items, selected="Earn", launchApp=true }) => (
  <header className={`flex justify-between items-center w-[1200px] h-[72px] z-10 my-2 ${launchApp === false ? '' : ''}`}>
    <div className="space-x-4">
      {items.map((item) => (
        <Link href={item.link} key={item.text} className={`mx-2 py-2 hover:border-b-2 ${selected === item.text ? 'border-b-2 font-bold' : 'font-light'}`}>
          {item.text}
        </Link>
      ))}
    </div>
    {launchApp && <Link href="/app">
      <Button style="transparent">Launch App</Button>
    </Link>}
  </header>
)

export default Header
import Button from "./Button";
import Link from "next/link";

type Item = { text: string, link: string }
type Items = Array<Item>
type HeaderProps = {
  items: Items,
  selected?: string,
  launchApp?: boolean,
  launchText?: string,
  className?: string
}

const Header = ({ items, selected="Earn", launchApp=true, launchText='Launch App', className='' }: HeaderProps) => (
  <header className={`flex justify-between items-center h-[72px] z-10 my-2 ${launchApp === false ? '' : 'w-[1200px]'} ${className}`}>
    <div className="space-x-4">
      {items.map((item:Item) => (
        <Link href={item.link} key={item.text} className={`mx-2 py-2 hover:border-b-2 ${selected === item.text ? 'border-b-2 font-bold' : (launchApp ? 'font-thin' : '')} ${(!launchApp && !(selected === item.text)) ? 'text-soft-blue' : ''}`}>
          {item.text}
        </Link>
      ))}
    </div>
    {launchApp && <Link href="/app?tab=stake">
      <Button style="transparent">{launchText}</Button>
    </Link>}
  </header>
)

export const headerItems = [
  { text: 'Earn', link: '/' },
  { text: 'About', link: '/about' },
  { text: 'Expired farms', link: '/expired' },
]

export default Header
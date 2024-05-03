'use client'

import Button from "./Button";
import Link from "next/link";
import { ReactNode } from "react";

type Item = { text: string, link: string }
type Items = Array<Item>
type HeaderProps = {
  items: Items,
  selected?: string,
  launchApp?: boolean,
  launchText?: string,
  className?: string,
  onClickLaunch?: () => void,
}

const Header = ({ items, selected="", launchApp=true, launchText='Launch App', className="", onClickLaunch }: HeaderProps) => (
  <header className={`flex flex-wrap justify-between items-center z-10 ${
    launchApp ? 'xl:w-[1200px] w-full px-4 xl:p-0 h-[72px]' : ''
  } ${className}`}>
    <div className="flex space-x-4">
      {items.slice(0, -1).map((item:Item, index:Number) => (
        <Link
          href={item.link}
          key={item.text}
          className={`py-2 border-b-2 border-transparent hover:border-white ${launchApp ? 'px-2' : 'py-[18px]'} ${
            selected === item.text
              ? 'border-b-2 font-bold'
              : (launchApp
                ? 'font-thin'
                : 'border-b-2 border-transparent')} ${
              (!launchApp && !(selected === item.text))
                ? 'text-soft-blue'
                : ''
          }`}>
          {item.text}
        </Link>
      ))}
    </div>
    {!launchApp && items.length > 0 && (
      <div className="ml-auto mr-8">
        <Link
          href={items[items.length - 1].link}
          className={`py-2 hover:border-b-2 py-[20px] ${
            selected === items[items.length - 1].text
              ? 'border-b-2 font-bold'
              : 'text-soft-blue'
          }`}>
          {items[items.length - 1].text}
        </Link>
      </div>
    )}
    {(launchApp && !onClickLaunch) ? <Link href="/app?tab=stake">
      <Button theme="transparent">{launchText}</Button>
    </Link> : (launchApp && onClickLaunch) && <div>
      <Button onClick={onClickLaunch} theme="transparent">{launchText}</Button>
    </div>}
  </header>
)

export const headerItems = [
  { text: 'Earn', link: '/' },
  { text: 'About', link: '/about' },
  { text: 'Expired farms', link: '/expired' },
]

export default Header
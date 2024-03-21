import Button from "./Button";

const Header = () => (
  <header className="flex justify-between items-center w-[1200px] h-[72px] z-10 my-2">
    <div className="space-x-4">
      <a href="#" className="mx-2 py-2 font-bold border-b-2">Earn</a>
      <a href="#" className="mx-2 py-2 font-light">About</a>
      <a href="#" className="mx-2 py-2 font-light">Expired farms</a>
    </div>
    <Button style="transparent">Launch App</Button>
  </header>
)

export default Header
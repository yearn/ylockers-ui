import Image from "next/image";
import Button from "../components/Button";
import Header from "../components/Header";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-r from-dark-black to-dark-blue text-white">
      <Image className="absolute top-o left-[24%] w-[76%]" src="/prisma.svg" width={200} height={200} alt="" />
      <Header items={[
        { text: 'Earn', link: '/' },
        { text: 'About', link: '/about' },
        { text: 'Expired farms', link: '/expired-farms' },
      ]} />
      <section className="mt-[5vh] z-10">
        <div className="w-full h-[624px] flex justify-center">
          <div className="w-[408px] bg-blue">
            
          </div>
          <div className="w-[792px] bg-darker-blue">
          <Header items={[
            { text: 'Earn', link: '/' },
            { text: 'About', link: '/about' },
            { text: 'Expired farms', link: '/expired-farms' },
          ]} launchApp={false}/>
          </div>

        </div>
      </section>
    </main>
  );
}

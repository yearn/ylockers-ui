import Image from "next/image";
import Button from "../components/Button";
import Header from "../components/Header";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-r from-dark-black to-dark-blue text-white">
      <Image className="absolute top-o left-[24vw] w-[76vw]" src="/prisma.svg" width={200} height={200} alt="" />
      <Header />
      <section className="mt-[5vh] z-10">
        <div className="w-full h-[624px] flex justify-center">
          <div className="w-[408px] bg-blue">
            
          </div>
          <div className="w-[792px] bg-darker-blue">

          </div>

        </div>
      </section>
    </main>
  );
}

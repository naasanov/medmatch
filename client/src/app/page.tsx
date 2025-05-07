import graphic from "@/assets/homepage-graphic.png";
import { Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex justify-center mx-40">
      <section className="flex flex-col my-28 max-w-lg">
        <header className="text-6xl font-bold text-accentDarkBlue font-sans">
          Welcome to MedMatch
        </header>
        <p className="text-xl font-semibold my-5 text-[#626980] leading-8">
        An all-in-one platform that helps premed students gain industry experience, make valuable connections, and obtain the resources they need to succeed in their career
        </p>
        <Button className="w-60 h-12 text-lg font-semibold bg-[#735AFB] hover:bg-[#ffffff] hover:text-[#735AFB] hover:outline hover:outline-[#735AFB] hover:outline-[2]">
          <Play/>
          <span>Watch a Run Through</span>
        </Button>
      </section>
      <Image
        src={graphic}
        alt=""
        width={500}
        height={500}
        className="h-3/4 w-auto"
      />
    </main>
  );
}
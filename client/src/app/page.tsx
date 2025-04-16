import graphic from "@/assets/homepage-graphic.png";
import play from "@/assets/play.svg";
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
        <p className="text-xl font-semibold my-5">
          An all-in-one platform that helps pre-med students gain industry
          experience, make valuable connections, and obtain the resources they
          need to succeed in their career
        </p>
        <Button>
          <Image
            src={play}
            alt="play button"
            width={24}
            height={24}
            className="h-4 w-auto mr-1"
          />
          <span>Watch a Run Through</span>
        </Button>
        <Button>
          <Link href="/login">Login</Link>
        </Button>
        <Button>
          <Link href="/signup">Signup</Link>
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
import Link from "next/link";
import Image from "next/image";
import pic from "@/assets/profile.svg";
import title from "@/assets/medmatch_.svg";
import { Button } from "@/components/ui/button"


function Navbar() {
  const linkStyle = "text-[#668b6d] no-underline text-lg h-full flex";

  return (
    <div className="bg-[#ffffff] shadow-md flex justify-between items-center py-2 px-4 gap-8 pl-10 pr-10">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src={title}
            alt="Home link"
            width={200}
            height={100}
          />
        </Link>
        {/* <input
          className="text-[#5f8566] no-underline py-2 px-3 mr-4 text-lg rounded-3xl border-2 border-[#A8A8A8] bg-[#ffffff]"
          placeholder="Search..."
          type="text"
        /> */}
      </div>
      <ul className="flex items-center p-0 m-0 list-none gap-4">
        {/* <li>
          <Link href="/messages" className={linkStyle}>
            Messages
          </Link>
        </li>
        <li>
          <Link href="/opportunities" className={linkStyle}>
            Opportunities
          </Link>
        </li>
        <Link href="/profile" className={`${linkStyle} mr-3`}>
          <Image
            src={pic}
            alt="profile icon"
            width={50}
            height={50}
          />
        </Link> */}
        <li>
          <Link href="/" className="text-[#0B3FC1] text-lg pr-10 font-semibold">Sign In</Link>
        </li>
        <li>
          <Button className="w-36 h-12 text-lg font-semibold bg-[#0B3FC1] hover:bg-[#ffffff] hover:text-[#0B3FC1] hover:outline hover:outline-[#0B3FC1] hover:outline-[2]">
            <span>Sign Up</span>
          </Button>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;

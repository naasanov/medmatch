import Link from "next/link";
import Image from "next/image";
import pic from "@/assets/profile.svg";
import title from "@/assets/medmatch_.svg";

function Navbar() {
  const linkStyle = "text-[#668b6d] no-underline text-lg h-full flex";

  return (
    <div className="bg-[#b1cdb6] flex justify-between items-center py-2 px-4 gap-8">
      <div className="flex items-center">
        <Link className="mr-20" href="/">
          <Image
            src={title}
            alt="Home link"
            width={150}
            height={100}
          />
        </Link>
        <input
          className="text-[#5f8566] no-underline py-2 px-3 mr-4 text-lg rounded-3xl border-2 border-[#72a07b] bg-[#b1cdb6]"
          placeholder="Search..."
          type="text"
        />
      </div>
      <ul className="flex items-center p-0 m-0 list-none gap-4">
        <li>
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
        </Link>
      </ul>
    </div>
  );
}

export default Navbar;

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  // penggunaan hooks usePathname
  const pathname = usePathname();
  const route = useRouter();
  const { status }: {data: any, status: any} = useSession();
  
  return (
    <nav className="flex bg-gray-800 py-2 px-5 justify-between">
      <div className="flex">
        <h1 className="text-white">Navbar</h1>
        <ul className="flex ml-5">
          <Link href="/">
            <li className={`mr-3 ${pathname === "/" ? "text-blue-300" : "text-white"} cursor-pointer`}>Home</li>
          </Link>
          <Link href="/about">
            <li className={`mr-3 ${pathname === "/about" ? "text-blue-300" : "text-white"} cursor-pointer`}>About</li>
          </Link>

          <Link href="/about/profile">
            <li className={`mr-3 ${pathname === "/about/profile" ? "text-blue-300" : "text-white"} cursor-pointer`}>Profile</li>
          </Link>


        </ul>
      </div>

      <div>
        {status === "authenticated" ? (
          <button
          onClick={() => signOut()}
          className="bg-white rounded-md px-3 text-sm h-7 cursor-pointer">
          Logout
        </button>
        ) : (
          <button
          onClick={() => signIn()}
          className="bg-white rounded-md px-3 text-sm h-7 cursor-pointer">
          Login
        </button>
        )}
      </div>
    </nav>
  )
}

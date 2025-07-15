import { navItems } from "@/constant";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import Logout from "./Logout";

const Navbar = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <nav className="bg-blue-50">
      <div className="container mx-auto flex justify-between items-center ">
        <Link href="/" className="flex items-center gap-2">
          <Image
            className="w-12"
            src="/images/logo.png"
            width={100}
            height={100}
            alt=""
          />
          <h1 className="font-bold">Carebotics</h1>
        </Link>
        <ul className="flex items-center gap-5 md:gap-10">
          {navItems.map((nav) => (
            <li key={nav.name}>
              <Link
                className="font-semibold transition hover:text-blue-500"
                href={nav.path}>
                {nav.name}
              </Link>
            </li>
          ))}
          {data.user ? (
            <Logout />
          ) : (
            <Link href={"/login"}>
              <Button>Login</Button>
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

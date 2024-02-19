"use client";
import Link from "next/link";
import Button from "../ui/Button";
import Route from "../ui/Route";
import { navLinks } from "@/constants";
import MobileMenu from "./MobileMenu";
import useMenuActive from "@/hooks/useMenuActive";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = ({ user }: { user: User }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={clsx(
        "py-4 w-full fixed z-10 top-0 bg-accent/50 backdrop-blur-2xl transition-all duration-300 ease-in-out ",
        isScrolling && "shadow-lg"
      )}
    >
      <div className="flex w-full max-w-[1250px] px-5 justify-center items-center mx-auto">
        <div className="flex-1 ">
          <Link
            className="text-3xl font-extrabold bg-gradient-to-t from-blue-600 to-violet-600 bg-clip-text text-transparent flex  items-center gap-2"
            href={"/"}
          >
            <Image
              className="bg-gradient-to-t from-blue-600 to-violet-600 rounded-full blend"
              width={50}
              height={50}
              src={"/logo.png"}
              alt="Logo"
            />
            Insightopia
          </Link>
        </div>

        <ul className="flex font-bold items-center text-lg  justify-center gap-16 flex-2 max-md:hidden ">
          {navLinks.map((link, index) => {
            const isActive = useMenuActive(link.route);

            return (
              <li key={index} className="hover:text-muted">
                <Route
                  route={link.route}
                  label={link.label}
                  isActive={isActive}
                />
              </li>
            );
          })}
        </ul>
        <div className="flex-1 flex justify-end pr-5">
          <ThemeSwitcher />
        </div>

        {!user && (
          <div className="flex gap-5  justify-end max-md:hidden">
            <Button
              text="Sign Up / Sign In"
              onClick={() => router.push("/access")}
              aria="Log in button"
            />
          </div>
        )}

        {user && (
          <div className="flex gap-5 items-center  justify-end max-md:hidden">
            <h1 className="font-bold text-foreground/80">{user.name}</h1>
            <Image
              src={user.image as string}
              width={50}
              height={50}
              className="rounded-full border-2 border-foreground/80 cursor-pointer"
              alt={`Image of ${user.name}`}
              onClick={() => setOpenUserMenu(!openUserMenu)}
            />
          </div>
        )}

        {openUserMenu && (
          <div className="z-10 absolute right-32 top-[70px] px-6 bg-accent/50 backdrop-blur-xl shadow-md rounded-md p-4 flex flex-col justify-center items-center">
            <Link
              href="/userposts"
              onClick={() => setOpenUserMenu(false)}
              className="hover:text-foreground font-bold text-muted"
            >
              My Posts
            </Link>

            <button
              className="hover:text-foreground font-bold text-muted"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </div>
        )}

        <div className="">
          <MobileMenu user={user} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

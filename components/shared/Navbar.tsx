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
        "py-4 w-full fixed z-10 top-0 bg-white  transition-all duration-300 ease-in-out ",
        isScrolling && "shadow-lg"
      )}
    >
      <div className="flex w-full max-w-[1250px] px-5 justify-center items-center mx-auto">
        <div className="flex-1">
          <Link href={"/"}>
            <h1 className="text-3xl font-extrabold text-accent">Insightopia</h1>
          </Link>
        </div>

        <ul className="flex items-center text-lg  justify-center gap-16 flex-2 max-md:hidden ">
          {navLinks.map((link, index) => {
            const isActive = useMenuActive(link.route);

            return (
              <li key={index} className="hover:text-secondary">
                <Route
                  route={link.route}
                  label={link.label}
                  isActive={isActive}
                />
              </li>
            );
          })}
        </ul>

        {!user && (
          <div className="flex gap-5 flex-1 justify-end max-md:hidden">
            <Button
              text="Log In"
              onClick={() => router.push("/access")}
              aria="Log in button"
            />
            <Button
              text="Sign Up"
              onClick={() => router.push("/access")}
              aria="Sign up button"
            />
          </div>
        )}

        {user && (
          <div className="flex gap-5 items-center flex-1 justify-end max-md:hidden">
            <h1 className="font-bold text-accent">{user.name}</h1>
            <Image
              src={user.image as string}
              width={50}
              height={50}
              className="rounded-full border-4 border-accent cursor-pointer"
              alt={`Image of ${user.name}`}
              onClick={() => setOpenUserMenu(!openUserMenu)}
            />
          </div>
        )}

        {openUserMenu && (
          <ul className="z-10 absolute right-12 top-[70px] w-48 bg-white shadow-md rounded-md p-4">
            <Link href="/userposts" onClick={() => setOpenUserMenu(false)}>
              <li>My Posts</li>
            </Link>

            <li className="cursor-pointer" onClick={() => signOut()}>
              Sign out
            </li>
          </ul>
        )}

        <div>
          <MobileMenu user={user} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

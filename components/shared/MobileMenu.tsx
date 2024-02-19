"use client";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import Button from "../ui/Button";
import { navLinks } from "@/constants";
import Link from "next/link";
import Route from "../ui/Route";
import useMenuActive from "@/hooks/useMenuActive";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { MenuIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const MobileMenu = ({ user }: { user: User }) => {
  const router = useRouter();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const mobileMenuHandler = () => {
    setOpenMobileMenu(!openMobileMenu);
  };
  return (
    <>
      <div className="md:hidden" onClick={mobileMenuHandler}>
        {openMobileMenu ? (
          <CgClose className="cursor-pointer z-30" size={25} />
        ) : (
          <MenuIcon className="cursor-pointer" size={25} />
        )}
      </div>

      {openMobileMenu ? (
        <div
          onClick={() => setOpenMobileMenu(false)}
          className="fixed w-full h-screen top-0 left-0 bg-black/25 z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute h-screen left-0 top-0 w-60 bg-white z-[999] px-5 border-r overflow-y-hidden flex flex-col gap-10"
          >
            <div className="border-b border-secondary py-5 text-center">
              <Link href={"/"}>
                <h1 className="text-3xl font-extrabold text-accent">
                  Insightopia
                </h1>
              </Link>
            </div>

            <ul className="flex items-center justify-center gap-5 flex-col mt-5  py-10 border-b border-secondary ">
              {navLinks.map((link, index) => {
                const isActive = useMenuActive(link.route);

                return (
                  <li key={index}>
                    <Route
                      route={link.route}
                      label={link.label}
                      isActive={isActive}
                      onClick={() => setOpenMobileMenu(false)}
                    />
                  </li>
                );
              })}
            </ul>

            {!user && (
              <div className="flex gap-5 flex-1 flex-col py-5">
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
              <div>
                <ul className="flex flex-col  gap-5 items-center">
                  <Link
                    href="/userposts"
                    onClick={() => setOpenMobileMenu(false)}
                  >
                    <li>My Post</li>
                  </Link>

                  <li onClick={() => signOut()}>Sign Out</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MobileMenu;

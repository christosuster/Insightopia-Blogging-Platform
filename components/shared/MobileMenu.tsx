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
import Image from "next/image";

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
          <CgClose className="cursor-pointer z-50" size={25} />
        ) : (
          <MenuIcon className="cursor-pointer" size={25} />
        )}
      </div>

      {openMobileMenu ? (
        <div
          onClick={() => setOpenMobileMenu(false)}
          className="fixed w-full h-screen top-0 left-0 bg-black/50  z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute h-screen left-0 top-0 w-60 bg-secondary  transition-all duration-300 ease-in-out z-[999] border-r border-border overflow-y-hidden flex flex-col gap-10 text-xl"
          >
            <div className="border-b border-primary w-full py-5 text-center">
              <Link
                className="text-4xl font-extrabold bg-gradient-to-t from-blue-600 to-violet-600 bg-clip-text text-transparent"
                href={"/"}
              >
                Insightopia
              </Link>
            </div>

            <ul className="flex items-center justify-center gap-5 flex-col font-bold text-muted">
              {navLinks.map((link, index) => {
                const isActive = useMenuActive(link.route);

                return (
                  <li key={index} className="hover:text-foreground">
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
              <div className="flex gap-5 flex-1 flex-col py-5 ">
                <button
                  className="bg-primary text-secondary p-2 w-fit mx-auto  rounded-xl font-semibold hover:text-foreground hover:bg-accent transition-all duration-200 "
                  onClick={() => {
                    router.push("/access");
                    setOpenMobileMenu(false);
                  }}
                >
                  Sign Up / Sign In
                </button>
              </div>
            )}

            {user && (
              <div className="flex flex-col gap-5 items-center border-t border-primary py-10">
                <div className="flex flex-col gap-2 mb-10 items-center justify-center ">
                  <Image
                    src={user.image as string}
                    width={50}
                    height={50}
                    className="rounded-full border-2 border-foreground/80 cursor-pointer"
                    alt={`Image of ${user.name}`}
                  />
                  <h1 className="font-bold text-foreground/80">{user.name}</h1>
                </div>
                <Link
                  href="/userposts"
                  onClick={() => setOpenMobileMenu(false)}
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
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MobileMenu;

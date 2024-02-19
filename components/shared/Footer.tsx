"use client";

import {
  FaSquareXTwitter,
  FaSquareInstagram,
  FaSquareSnapchat,
} from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import useMenuActive from "@/hooks/useMenuActive";
import { navLinks } from "@/constants";
import Route from "../ui/Route";
import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";

const Footer = () => {
  return (
    <div className="w-full py-5 bg-foreground mt-10">
      <div className="w-[95%] mx-auto max-w-[1250px]">
        <div className="w-full text-center lg:hidden flex flex-col">
          <h1 className="text-3xl text-primary font-bold mb-3 mt-5">
            Insightopia
          </h1>
          <p className="text-secondary ">
            Welcome to Insightopia, where minds converge and ideas flourish.
            We're a vibrant community dedicated to the pursuit of knowledge and
            understanding. From science and technology to arts and culture, our
            platform welcomes diverse voices to share their insights and
            perspectives. Whether you're an expert in your field or an
            undiscovered talent, Insightopia provides a space for all to
            explore, learn, and connect. Join us on this journey of discovery
            and let's illuminate the world together.
          </p>
        </div>
        <div className="lg:hidden flex flex-col my-3">
          <div className="flex gap-3 justify-center items-center">
            <Link href="https://www.facebook.com/">
              <FacebookIcon
                size={32}
                className="text-secondary hover:text-primary transition-all duration-300 ease-in-out"
              />
            </Link>
            <Link href="https://www.twitter.com/">
              <TwitterIcon
                size={32}
                className="text-secondary hover:text-primary transition-all duration-300 ease-in-out"
              />
            </Link>
            <Link href="https://www.instagram.com/">
              <InstagramIcon
                size={32}
                className="text-secondary hover:text-primary transition-all duration-300 ease-in-out"
              />
            </Link>
            <Link href="https://www.youtube.com/">
              <YoutubeIcon
                size={32}
                className="text-secondary hover:text-primary transition-all duration-300 ease-in-out"
              />
            </Link>
          </div>
        </div>

        <div className="w-full text-center mt-5 text-sm text-white">
          <h1>
            Developed by{" "}
            <a
              className="font-bold text-secondary"
              href="https://www.christosuster.me/"
            >
              Christos Uster Biswas
            </a>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;

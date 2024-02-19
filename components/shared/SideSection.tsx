"use client";

import { categories } from "@/constants/categories";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import Link from "next/link";

const SideSection = () => {
  return (
    <div className="lg:col-span-4 order-first lg:order-last col-span-12 flex flex-col gap-10">
      <div className="w-full text-center ">
        <h1 className="text-3xl text-secondary font-bold mb-3">Categories</h1>
        <div className="flex gap-3 flex-wrap justify-center items-center">
          {categories.map((category) => (
            <Link
              className="bg-secondary p-2 rounded-xl text-background font-semibold hover:bg-primary transition-all duration-300 ease-in-out"
              href={`/posts/?category=${category.link}`}
              key={category.link}
            >
              {category.type}
            </Link>
          ))}
        </div>
      </div>
      <div className="w-full text-center hidden lg:flex flex-col">
        <h1 className="text-3xl text-secondary font-bold mb-3 mt-5">About</h1>
        <p className="text-secondary">
          Welcome to Insightopia, where minds converge and ideas flourish. We're
          a vibrant community dedicated to the pursuit of knowledge and
          understanding. From science and technology to arts and culture, our
          platform welcomes diverse voices to share their insights and
          perspectives. Whether you're an expert in your field or an
          undiscovered talent, Insightopia provides a space for all to explore,
          learn, and connect. Join us on this journey of discovery and let's
          illuminate the world together.
        </p>
      </div>
      <div className="hidden lg:flex flex-col">
        <h1 className="text-3xl text-secondary font-bold mb-3 mt-5 text-center">
          Follow Us
        </h1>
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
    </div>
  );
};

export default SideSection;

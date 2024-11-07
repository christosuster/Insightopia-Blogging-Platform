"use client";

import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";

const Footer = () => {
  return (
    <div className="w-full py-5 bg-accent/50 backdrop-blur-2xl transition-all duration-300 ease-in-out0 mt-10 text-primary ">
      <div className="w-[95%] mx-auto max-w-[1250px]">
        <div className="w-full text-center lg:hidden flex flex-col">
          <h1 className="text-3xl  font-bold mb-3 mt-5">Insightopia</h1>
          <p className=" ">
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
                className=" hover:text-foreground transition-all duration-300 ease-in-out"
              />
            </Link>
            <Link href="https://www.twitter.com/">
              <TwitterIcon
                size={32}
                className=" hover:text-foreground transition-all duration-300 ease-in-out"
              />
            </Link>
            <Link href="https://www.instagram.com/">
              <InstagramIcon
                size={32}
                className=" hover:text-foreground transition-all duration-300 ease-in-out"
              />
            </Link>
            <Link href="https://www.youtube.com/">
              <YoutubeIcon
                size={32}
                className=" hover:text-foreground transition-all duration-300 ease-in-out"
              />
            </Link>
          </div>
        </div>

        <div className="w-full text-xl text-center my-5">
          <h1>
            Developed by{" "}
            <a
              className="font-bold text-muted"
              href="https://www.christosuster.dev/"
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

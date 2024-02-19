"use client";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { GoogleLoginButton } from "react-social-login-buttons";

const page = () => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      console.log("Authenticated");
      router.push("/");
    }
  }, [session?.status, router]);

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          return;
        }

        if (callback?.ok) {
          router.push("/");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="grid grid-cols-2 w-full h-full">
      <div className="mt-6 col-span-1 flex gap-2 flex-col justify-center items-center mx-auto">
        <h1 className="text-lg">Log in or Sign up with the links below</h1>
        <GoogleLoginButton
          className="w-fit"
          onClick={() => socialAction("google")}
        />
      </div>

      <div className="lg:block hidden col-span-1">
        <Image
          src="/assets/access.svg"
          height={500}
          width={500}
          alt="Sign up form image"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default page;

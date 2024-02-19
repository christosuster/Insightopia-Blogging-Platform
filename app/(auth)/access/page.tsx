"use client";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { GoogleLoginButton } from "react-social-login-buttons";
import { Loader2 } from "lucide-react";
import { CgGoogle } from "react-icons/cg";

const page = () => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    }
    if (session?.status === "unauthenticated") {
      setIsLoading(false);
    }
  }, [session?.status, router]);

  const socialAction = (action: string) => {
    signIn(action, { callbackUrl: "/" })
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
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full gap-5">
      {isLoading ? (
        <div className="col-span-1 flex justify-center items-center ">
          <Loader2 size={50} className="animate-spin text-primary" />
        </div>
      ) : (
        <div className="mt-6 col-span-1 flex gap-2 flex-col justify-center items-center mx-auto">
          <h1 className="text-xl">Sign Up / Sign In</h1>
          <GoogleLoginButton
            className="text-center"
            onClick={() => socialAction("google")}
          />
        </div>
      )}

      <div className="flex justify-center items-center col-span-1">
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

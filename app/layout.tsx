import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AuthContext from "@/context/AuthContext";
import getCurrentUser from "./actions/getCurrentUser";
import { EdgeStoreProvider } from "@/lib/edgestore";
import ThemeContext from "@/context/ThemeContext";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Insightopia | Blogging Platform",

  description:
    "Discover stories, thinking, and expertise from writers on any topic.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${roboto.className} overflow-x-hidden bg-light`}>
        <AuthContext>
          <EdgeStoreProvider>
            <ThemeContext>
              <Navbar user={user as any} />
              <div className="min-h-screen w-[95%] mx-auto max-w-[1350px] pt-32">
                {children}
              </div>
              <Footer />
            </ThemeContext>
          </EdgeStoreProvider>
        </AuthContext>
      </body>
    </html>
  );
}

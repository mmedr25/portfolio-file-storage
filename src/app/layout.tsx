import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "@/providers/convex-client-provider";
import Header from "@/components/header/header";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import {  LinkedinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/nav/navbar";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "File Storage app",
  description: "this was created by monthe eric an awesome developer",
};

export const runtime = "edge"
// the render order was reverse to easily set z-index
export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <ConvexClientProvider>
        <body className={"flex flex-col min-h-[100vh] " + inter.className}>
          <Header />
          <main className="flex flex-1 px-12 flex-col-reverse md:flex-row-reverse">
            <div className="flex-1 pt-10 relative z-1">
              {children}
            </div>
            <NavBar />
            <Toaster/>
          </main>
          <footer className="flex justify-center items-center p-4 gap-2 text-white bg-black">
            created by Monthe Eric. 
            <Link 
              href={"https://www.linkedin.com/in/eric-mandong-monthe-a20268189/"}
              target="_blank"
            >
              <Button variant={"link"} className="text-white"><LinkedinIcon/></Button>
            </Link>
          </footer>
        </body>
      </ConvexClientProvider>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "@/providers/convex-client-provider";
import Header from "@/components/header/header";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { FileArchiveIcon, LucideIcon, StarIcon, Trash2Icon } from "lucide-react";
import { ReactNode } from "react";
// import PageBase from "../providers/files-provider";
// import FilesProvider from "../providers/files-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "File Storage app",
  description: "this was created by monthe eric an awesome developer",
};

type NavLinkProps = {
  icon: LucideIcon, 
  children: ReactNode, 
  href: string
}

const NavLink = ({icon: Icon, children, href}: NavLinkProps) => {
  return (
    <li>
      <Link 
        href={href}
        className="flex whitespace-nowrap gap-2 border rounded-full py-2 px-4 transition-all active:bg-muted md:active:bg-transparent md:hover:text-blue-600 md:inline-flex md:rounded-none md:border-none md:px-0 md:py-4"
      >
        <Icon />
        {children}
      </Link>
    </li>
  )
}

const AppRoutes = [
  {
    icon: FileArchiveIcon,
    href: "/",
    label: "All files"
  },
  {
    icon: StarIcon,
    href: "/favorites",
    label: "Favorites"
  },
  {
    icon: Trash2Icon,
    href: "/trash",
    label: "Trash"
  },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ConvexClientProvider>
        <body className={inter.className}>
          <Header />
          <main className="flex px-12 flex-col md:flex-row">
            <div className="md:pt-10 md:pr-20">
              <nav>
                <ul className="flex flex-row gap-4 py-4 overflow-x-scroll no-scrollbar md:block md:gap-0 md:overflow-x-hidden">
                  {AppRoutes.map(routeData => (
                    <NavLink
                      key={routeData.href}
                      href={routeData.href} 
                      icon={routeData.icon}
                    >{routeData.label}</NavLink>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="flex-1 pt-10">
            {/* <FilesProvider> */}
              {children}
            {/* </FilesProvider> */}
              {/* <PageBase>
                {children}
                {({files}) => children ? children({files}): null}
              </PageBase> */}
            </div>
            <Toaster/>
          </main>
        </body>
      </ConvexClientProvider>
    </html>
  );
}

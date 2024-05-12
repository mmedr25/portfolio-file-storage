"use client"
import { FileArchiveIcon, StarIcon, Trash2Icon } from "lucide-react";
import { FunctionComponent } from "react";
import NavLink from "./nav-link";
import { useSelectedLayoutSegment } from "next/navigation";

interface NavBarProps {
    
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
const NavBar: FunctionComponent<NavBarProps> = () => {
    const selectedLayoutSegment = useSelectedLayoutSegment()
    
    return (
        <div className="sticky top-0 bg-background z-9999 md:pt-10 md:pr-20 md:static">
            <nav className="sticky top-10">
            <ul className="flex flex-row gap-4 py-4 overflow-x-scroll no-scrollbar md:block md:gap-0 md:overflow-x-hidden md:py-0">
                {AppRoutes.map(routeData => (
                    <NavLink
                        key={routeData.href}
                        href={routeData.href} 
                        icon={routeData.icon}
                        activeSegment={selectedLayoutSegment}
                    >{routeData.label}</NavLink>
                ))}
            </ul>
            </nav>
        </div>
    );
}
 
export default NavBar;
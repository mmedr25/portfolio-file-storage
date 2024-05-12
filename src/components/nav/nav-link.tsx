
import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { FunctionComponent, ReactNode } from "react";

type NavLinkProps = {
    icon: LucideIcon, 
    children: ReactNode, 
    href: string,
    activeSegment?: string | null
}
 

const NavLink: FunctionComponent<NavLinkProps> = ({icon: Icon, children, href, activeSegment}) => {
    return (
      <li>
        <Link 
          href={href}
          className={clsx("flex whitespace-nowrap gap-2 border rounded-full py-2 px-4 transition-all active:bg-muted md:active:bg-transparent md:hover:text-foreground/50 md:inline-flex md:rounded-none md:border-none md:px-0 md:py-4", {
            "text-blue-600 bg-muted md:bg-background": href === `/${activeSegment}` ||( href === "/" && activeSegment === null)
          })}
        >
          <Icon />
          {children}
        </Link>
      </li>
    )
}

export default NavLink;
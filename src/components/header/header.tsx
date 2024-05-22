"use client"
import { OrganizationSwitcher, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { FunctionComponent } from "react";
import SignInButton from "../buttons/button-sign-in";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

interface HeaderProps {

}

const Header: FunctionComponent<HeaderProps> = () => {
    const {isLoaded} = useUser()
    return (
        <div className="flex items-center py-4 px-6 md:px-12 border-b">
            <div className="hidden md:block">
                <Link href={"/"}>mmedr25</Link>
            </div>
            <div className="flex flex-1 justify-end items-center gap-4">
                {isLoaded ? 
                    <>
                        <SignedIn>
                            <div className="flex-1 md:flex-none flex items-center justify-between">
                                <OrganizationSwitcher/>
                                <UserButton/>
                            </div>
                        </SignedIn>
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                    </> : 
                    <>
                        <Skeleton className="h-[32.5px] w-48"/>
                        <Skeleton className="h-8 w-8 rounded-full"/>
                    </>
                }
            </div>
        </div>
    );
}
 
export default Header;
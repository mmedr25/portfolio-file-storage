import { OrganizationSwitcher, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { FunctionComponent } from "react";
import SignInButton from "../buttons/button-sign-in";

interface HeaderProps {
    
}
 
const Header: FunctionComponent<HeaderProps> = () => {
    return (
        <div className="flex items-center py-4 px-12 border-b">
            <div>mmedr25</div>
            <div className="flex flex-1 justify-end gap-4">
                <SignedIn>
                    <OrganizationSwitcher/>
                    <UserButton/>
                </SignedIn>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
            </div>
        </div>
    );
}
 
export default Header;
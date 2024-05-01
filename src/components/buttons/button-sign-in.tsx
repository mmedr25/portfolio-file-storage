import { LockKeyholeIcon } from "lucide-react";
import { ButtonHTMLAttributes, FunctionComponent } from "react";
import ButtonWithIcon from "./button-with-icon";
import { SignInButton as SignInBtn } from "@clerk/nextjs";

interface SignInButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}
 
const SignInButton: FunctionComponent<SignInButtonProps> = ({className}) => {
    return (
        <SignInBtn>
            <ButtonWithIcon 
                icon={LockKeyholeIcon}
                className={className}
            >
                Sign In
            </ButtonWithIcon>
        </SignInBtn>
    );
}
 
export default SignInButton;
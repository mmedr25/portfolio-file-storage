import { LucideIcon } from "lucide-react";
import { ButtonHTMLAttributes, FunctionComponent } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface ButtonWithIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: LucideIcon
}
 
const ButtonWithIcon: FunctionComponent<ButtonWithIconProps> = ({children, icon: Icon, className, ...rest}) => {
    return (
        <Button 
            className={cn("flex gap-2", className)}
            {...rest}
        >
            <Icon className="size-4" />
            <span>{children}</span>
        </Button>
    );
}
 
export default ButtonWithIcon;
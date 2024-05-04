import { LucideIcon } from "lucide-react";
import { ButtonHTMLAttributes, FunctionComponent, ReactElement } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface ButtonWithIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: LucideIcon | FunctionComponent
}
 
const ButtonWithIcon: FunctionComponent<ButtonWithIconProps> = ({children, icon: Icon, className, ...rest}) => {
    return (
        <Button 
            className={cn("flex gap-2", className)}
            {...rest}
        >
            {Icon && <Icon className="size-4" />}
            <span>{children}</span>
        </Button>
    );
}
 
export default ButtonWithIcon;
"use client"
import { FunctionComponent } from "react";
import { useFormState } from "react-hook-form";
import { Loader2Icon } from "lucide-react";
import ButtonWithIcon from "@/components/buttons/button-with-icon";

interface FormSubmitButtonProps {
    children: FunctionComponent<{disabled?: boolean}>
}

const LoadIconForFormButton = () => <Loader2Icon className="w-4 h-4 animate-spin"/>;

const FormSubmitButtonWrapper: FunctionComponent<FormSubmitButtonProps> = ({children}) => {
    const {isLoading, isSubmitting} = useFormState()
    const isDisabled = isLoading || isSubmitting

    if (isSubmitting) {
        return (
            <ButtonWithIcon 
                icon={LoadIconForFormButton}
                disabled={isDisabled}
            >Please Wait</ButtonWithIcon>
        )
    }

    return (
        children({disabled: isDisabled})
    );
}
 
export default FormSubmitButtonWrapper;
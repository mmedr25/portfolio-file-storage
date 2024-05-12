import ButtonWithIcon from "../../buttons/button-with-icon";
import { CloudUploadIcon } from "lucide-react";
import FormSubmitButtonWrapper from "./form-submit-button-wrapper";

export function FormButton({ children }: { children: string; }) {
    return <FormSubmitButtonWrapper>
        {({ disabled }) => (
            <ButtonWithIcon
                icon={CloudUploadIcon}
                disabled={disabled}
            >{children}</ButtonWithIcon>
        )}
    </FormSubmitButtonWrapper>;
}

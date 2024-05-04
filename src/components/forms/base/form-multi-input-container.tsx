import { FunctionComponent, ReactNode } from "react";


interface FormMultiInputContainerProps {
    children: ReactNode
}
 
const FormMultiInputContainer: FunctionComponent<FormMultiInputContainerProps> = ({children}) => {
    return (
        <div className="flex flex-col gap-4 md:flex-row">
            {children}
        </div>
    );
}
 
export default FormMultiInputContainer;
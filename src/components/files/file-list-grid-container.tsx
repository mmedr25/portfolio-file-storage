import { FunctionComponent, ReactNode } from "react";

interface FileListGridContainerProps {
    children: ReactNode,
}

const FileListGridContainer: FunctionComponent<FileListGridContainerProps> = ({children}) => (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-files md:gap-8 md:justify-center">
        {children}
    </div>
)
 
export default FileListGridContainer;
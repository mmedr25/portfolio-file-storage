import { FunctionComponent, ReactNode } from "react";

interface FileListGridContainerProps {
    children: ReactNode,
}

const FileListGridContainer: FunctionComponent<FileListGridContainerProps> = ({children}) => (
    <div className="grid grid-cols-files gap-8 justify-center">
        {children}
    </div>
)
 
export default FileListGridContainer;
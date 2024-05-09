import { FunctionComponent, ReactNode } from "react";
import { Doc } from "../../../convex/_generated/dataModel";

interface FileListContainerProps {
    children: ReactNode,
    files?: Doc<"files">
}

const FileListContainer: FunctionComponent<FileListContainerProps> = ({children, files}) => (
    
    <div className="grid grid-cols-files gap-8 justify-center">
        {children}
    </div>
)
 
export default FileListContainer;
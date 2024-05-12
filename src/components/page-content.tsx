"use client"
import { FunctionComponent, useState } from "react";
import { FileListHeader } from "./files/file-list-header";
import { FileListBrowser } from "./files/file-list-browser";
import { Doc } from "../../convex/_generated/dataModel";

interface PageContentProps {
    files?: Doc<"files">[]
    hasfiles?: boolean,
    isSearchable?: boolean,
    title: string
}
 
const PageContent: FunctionComponent<PageContentProps> = (props) => {
    const [currentTab, setCurrentTab] = useState<"grid" | "table">("grid")
    
    return (
        <div className="flex flex-col gap-4 pb-8">
            <FileListHeader title={props.title} />
            <FileListBrowser 
                files={props?.files} 
                state={{currentTab, setCurrentTab}}
            />
        </div>
    );
}
 
export default PageContent;
"use client"
import { FileListBrowser } from "@/components/files/file-list-browser";
import { FileListHeader } from "@/components/files/file-list-header";
import { useGetTrashFiles, usefiles } from "@/hooks/repo/files";
import { FunctionComponent } from "react";

interface FavoritiesPageProps {
    searchParams: {
        search: string | null
    }
}
 
const TrashPage: FunctionComponent<FavoritiesPageProps> = ({searchParams}) => {
    
    const filesData = usefiles({searchQuery: searchParams?.search, getter: useGetTrashFiles})

    return (
        <div className="flex flex-col gap-4">
            <FileListHeader title={"Trash"} />
            <FileListBrowser files={filesData?.files} />
        </div>
    );
}
 
export default TrashPage;
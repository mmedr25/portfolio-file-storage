"use client"
import { FileListBrowser } from "@/components/files/file-list-browser";
import { useAllFavorites } from "@/hooks/repo/favorites";
import { useUserOrgId } from "@/hooks/user";
// import { usefiles } from "@/providers/files-provider";
import { FunctionComponent } from "react";
import { Doc } from "../../../convex/_generated/dataModel";
import { useGetFavoriteFiles, useGetFiles, usefiles } from "@/hooks/repo/files";
import { FileListHeader } from "@/components/files/file-list-header";

interface FavoritiesPageProps {
    searchParams: {
        search: string | null
    }
}



const FavoritesPage: FunctionComponent<FavoritiesPageProps> = ({searchParams}) => {
    
    // console.log("TCL: searchParams?.searchQuery", searchParams)
    const fileData = usefiles({searchQuery: searchParams?.search, getter: useGetFavoriteFiles})

    return (
        <div className="flex flex-col gap-4">
            <FileListHeader title={"Favorites"} />
            <FileListBrowser files={fileData?.files}/>
        </div>
    );
}
 
export default FavoritesPage;
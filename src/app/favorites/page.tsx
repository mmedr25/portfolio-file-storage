"use client"
import { FunctionComponent } from "react";
import { useGetFavoriteFiles, useFiles } from "@/hooks/repo/files";
import PageContent from "@/components/page-content";

interface FavoritiesPageProps {
    searchParams: {
        search: string | null
    }
}

const FavoritesPage: FunctionComponent<FavoritiesPageProps> = ({searchParams}) => {
    
    const filesData = useFiles({searchQuery: searchParams?.search, getter: useGetFavoriteFiles})

    return <PageContent  {...{...filesData, title: "Favorites"}}/>
}
 
export default FavoritesPage;
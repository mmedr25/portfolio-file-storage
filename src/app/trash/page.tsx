"use client"
import PageContent from "@/components/page-content";
import { useGetTrashFiles, useFiles } from "@/hooks/repo/files";
import { FunctionComponent } from "react";

interface FavoritiesPageProps {
    searchParams: {
        search: string | null
    }
}

const TrashPage: FunctionComponent<FavoritiesPageProps> = ({searchParams}) => {

    const filesData = useFiles({searchQuery: searchParams?.search, getter: useGetTrashFiles})

    return <PageContent  {...{...filesData, title: "Trash"}}/>
}

export default TrashPage;
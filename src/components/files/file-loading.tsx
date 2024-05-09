import { Skeleton } from "@/components/ui/skeleton"
import FileListContainer from "./file-list-container"
import { Card } from "../ui/card"


const FileCardSkeleton = () => {
    return (
        <Card className="p-4 flex flex-col gap-2">
            <div className="flex gap-4">
                <Skeleton className="flex-1 h-8"/>
                <Skeleton className="w-8 h-8"/>
            </div>
            <div>
            <Skeleton className="h-[250px]"/>
            </div>
            <div className="flex gap-32">
                <Skeleton className="flex-1 h-8"/>
                <Skeleton className="w-8 h-8"/>
            </div>
        </Card>
    )
}

export const LoadingFiles = () => {
    return (
        <div className="flex flex-col gap-4">
            <FileListContainer>
                <FileCardSkeleton />
                <FileCardSkeleton />
                <FileCardSkeleton />
                <FileCardSkeleton />
                <FileCardSkeleton />
                <FileCardSkeleton />
            </FileListContainer>
        </div>
    )
}
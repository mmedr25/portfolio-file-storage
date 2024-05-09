import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { useUserOrgId } from "../user";

const FILES_REPOSITORY = api.repository.files

type GetFileType = ({ organizationId, searchQuery }: {organizationId?: string, searchQuery: string | null}) => ReturnType<typeof useGetFiles>
// query hook
export const useGetFiles = ({organizationId, searchQuery}: {organizationId?: string, searchQuery: string | null}) => useQuery(
    FILES_REPOSITORY.getFiles, 
    organizationId ? {organizationId, searchQuery} : "skip",
)

export const useGetFavoriteFiles = ({organizationId, searchQuery}: {organizationId?: string, searchQuery: string | null}) => useQuery(
    FILES_REPOSITORY.getAllFavoriteFiles, 
    organizationId ? {organizationId, searchQuery} : "skip",
)

export const useGetTrashFiles = ({organizationId, searchQuery}: {organizationId?: string, searchQuery: string | null}) => useQuery(
    FILES_REPOSITORY.getAllTrashFiles, 
    organizationId ? {organizationId, searchQuery} : "skip",
)



export const useGetFileLocation = () => useAction(FILES_REPOSITORY.getFileUrl)
// export const useGetFileUrl = ({fileId}: {fileId?: Id<"_storage">}) => useQuery(
//     FILES_REPOSITORY.getFileUrl,
//     fileId ? { fileId } : "skip",
// )

export const usefiles = ({searchQuery, getter}: {searchQuery: string | null, getter: GetFileType}) => {
    const organizationId = useUserOrgId();
    return getter({ organizationId, searchQuery })
}

// mutation hooks
export const useCreateFile = () => useMutation(FILES_REPOSITORY.createFile)

export const useSoftDeleteFileToogle = () => useMutation(FILES_REPOSITORY.softDeletefileToogle)

export const useUploadUrl = () => useMutation(FILES_REPOSITORY.generateUploadUrl)


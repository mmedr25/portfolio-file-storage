import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export const useCreateFile = () => useMutation(api.repository.files.createFile)

export const useGetFiles = ({organizationId}: {organizationId?: string}) => useQuery(
    api.repository.files.getFiles, 
    organizationId ? { organizationId } : "skip",
)

export const useUploadUrl = () => useMutation(api.repository.files.generateUploadUrl)
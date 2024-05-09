import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

const FAVORITES_REPOSITORY = api.repository.favorites

// queries
export const useAllFavorites = ({organizationId}: {organizationId?: string}) => useQuery(
    FAVORITES_REPOSITORY.getAllFavorites,
    organizationId ? { organizationId } : "skip",
)

export const useGetFavorite = ({organizationId, fileId}: {organizationId?: string, fileId: Id<"files">}) => useQuery(
    FAVORITES_REPOSITORY.getFavorite,
    organizationId ? { organizationId, fileId } : "skip",
)

// mutations
export const useToogleFavorites = () => useMutation(FAVORITES_REPOSITORY.toggleFavorite)
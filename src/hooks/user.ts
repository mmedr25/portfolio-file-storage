import { useOrganization, useUser } from "@clerk/nextjs"
import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"

export const useUserOrgId = () => {
    const user = useUser()
    const organization =  useOrganization()
    
	console.log("TCL: useUserOrgId -> user", user)
	console.log("TCL: useUserOrgId -> organization", organization)

    if(!user.isSignedIn || !organization.isLoaded) return undefined
    return organization.organization?.id || user.user?.id as string
}

export const useGetUserDetails = ({tokenIdentifier}: {tokenIdentifier?: string}) => {
    return useQuery(
        api.repository.users.getUserDetails,
        tokenIdentifier ? { tokenIdentifier } : "skip",
    )
}
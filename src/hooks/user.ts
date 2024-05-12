import { useOrganization, useUser } from "@clerk/nextjs"
import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"

export const useUserOrgId = () => {
    const user = useUser()
    const organization =  useOrganization()
    
    if(!user.isSignedIn || !organization.isLoaded) return undefined
    return organization.organization?.id || user.user?.id as string
}


export const useMe = () => useQuery(api.repository.users.getMe);

import { useOrganization, useUser } from "@clerk/nextjs"

export const useUserOrgId = () => {
    const user = useUser()
    const organization =  useOrganization()
    
	console.log("TCL: useUserOrgId -> user", user)
	console.log("TCL: useUserOrgId -> organization", organization)

    if(!user.isSignedIn || !organization.isLoaded) return undefined
    return organization.organization?.id || user.user?.id as string
}
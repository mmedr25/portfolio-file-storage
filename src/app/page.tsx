"use client"
import { Button } from "@/components/ui/button";
import { useCreateFile, useGetFiles } from "@/hooks/repo/files";
import { SignInButton, SignOutButton, SignedIn, SignedOut, useOrganization, useUser } from "@clerk/nextjs";

export default function Home() {
  const createFile = useCreateFile()
  const {organization} =  useOrganization()
  const user = useUser()
  const organizationId = organization?.id || user.user?.id as string
  const files = useGetFiles({organizationId})

  
  return (
    <main>
      <div>
       home
       <Button onClick={() => {
         
         console.log("TCL: Home -> organizationId", organizationId)
         if (!organizationId) return

        createFile({
          name: "haha",
          organizationId,
         })
       }}>add file</Button>
      </div>
      <div>{files?.map(file => <div key={file._id}>{file.name}</div>)}</div>
    </main>
  );
}

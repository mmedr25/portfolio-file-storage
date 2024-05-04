"use client"
import { useGetFiles } from "@/hooks/repo/files";
import { FileListComponent } from "../components/files/file-list-component";
import { FormUploadFileModal } from "../components/files/form-upload-file-modal";
import { useUserOrgId } from "@/hooks/user";


export default function Home() {
  const organizationId = useUserOrgId();
  const files = useGetFiles({organizationId});
	console.log("TCL: Home -> files", files)
  
  return (
    <div className="flex flex-col gap-4">
      {files && 
        <div className="flex justify-end">
          <FormUploadFileModal/>
        </div>
      }
      <FileListComponent
        files={files}
      />
    </div>
  );
}

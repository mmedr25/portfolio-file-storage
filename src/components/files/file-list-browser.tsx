// "use client"
import { FileCard } from "@/components/files/file-card";
import { LoadingFiles } from "./file-loading";
import { Nofiles } from "./no-files";
import FileListContainer from "./file-list-container";
import { Doc } from "../../../convex/_generated/dataModel";


export const FileListBrowser = ({files}: {files?: Array<Doc<"files">>}) => {

  if (files === undefined) return <LoadingFiles />
  
  if (!files?.length) return <Nofiles />

  return (
    <div className="h-full">
      <FileListContainer>
        {files.map((file) => (
          <FileCard
            key={file._id}
            fileDetailsId={file._id}
            fileId={file.fileId}
            name={file.name}
            createdAt={file._creationTime}
            fileUrl={"dsadsf"}
            fileLocation={file.fileLocation}
            fileExt={file.fileExt}
            shouldDelete={!!file?.shouldDelete}
          />
        ))}
      </FileListContainer> 
    </div>
  );
};



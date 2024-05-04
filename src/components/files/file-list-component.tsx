import { FileCard } from "@/components/files/file-card";
import { LoadingFiles } from "./file-loading";
import { Nofiles } from "./no-files";


export const FileListComponent = ({files}: {files: any}) => {
  // const 
  if (files === undefined) return <LoadingFiles />;
  
  if (!files?.length) return <Nofiles />

  return (
    <div className="grid grid-cols-files gap-8 justify-center">
      {files?.map((file: any) => (
        <FileCard
          key={file._id}
          name={file.name}
          createdAt={file._creationTime}
          fileUrl={"dsadsf"}
        />
      ))}
    </div>
  );
};



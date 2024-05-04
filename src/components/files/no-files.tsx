import Image from "next/image";
import { FormUploadFileModal } from "./form-upload-file-modal";

export function Nofiles() {
  return (
    <div className="flex flex-col">
      <div className="relative h-[40dvh] w-full mx-auto md:h-[60dvh]">
        <Image
          src={"/no_files.svg"}
          alt="image when there is no file"
          className="absolute inset-0"
          fill />
      </div>
      <div className="text-center">
        <p className="text-muted-foreground text-lg pb-4">No files found</p>
        <FormUploadFileModal />
      </div>
    </div>
  );
}

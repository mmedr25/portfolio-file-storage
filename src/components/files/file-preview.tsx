import Image from "next/image"
import { FileIconComponent } from "./FileIconComponent"

type FilePreviewProps = {
    fileExt: string, 
    fileUrl: string, 
    name: string
}
export const FilePreview = ({fileExt, fileUrl, name}: FilePreviewProps) => {
    if (fileExt.includes("image")) {
        return (
            <Image
                src={fileUrl}
                alt={name}
                className="object-cover"
                fill
            /> 
        )
    }

    return (
        <div className="flex justify-center items-center h-full">
            <FileIconComponent 
                fileExt={fileExt} 
                className={"w-32 h-32 text-muted"}
            />
        </div>
    )
}
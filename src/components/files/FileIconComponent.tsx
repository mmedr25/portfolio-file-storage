import { FileIcon, FileImageIcon, FileTextIcon } from "lucide-react";

export const fileIcons = [
  {
    type: "image",
    icon: FileImageIcon
  },
  {
    type: "pdf",
    icon: FileTextIcon
  }
]

export const FileIconComponent = ({ fileExt, className }: { fileExt: string, className?: string }) => {
  const existingType = fileIcons.find(value => {
    return fileExt.includes(value.type);
  });
  // default icon
  if (!existingType) return <FileIcon className={className} />;
  
  const Icon = existingType.icon
  
  return <Icon className={className} />
};

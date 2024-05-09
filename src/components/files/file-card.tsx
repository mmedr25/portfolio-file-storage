"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { ArchiveRestoreIcon, DownloadIcon, EllipsisVerticalIcon, LucideIcon, LucideProps, StarIcon, Undo2Icon, X } from "lucide-react";
import { formatDateToReadable } from "@/lib/utils";
import { FileIconComponent } from "./FileIconComponent";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ReactNode, useState } from "react";
import { useSoftDeleteFileToogle } from "@/hooks/repo/files";
import { Id } from "../../../convex/_generated/dataModel";
import { useToast } from "../ui/use-toast";
import { FilePreview } from "./file-preview";
import { useGetFavorite, useToogleFavorites } from "@/hooks/repo/favorites";
import { useUserOrgId } from "@/hooks/user";
import { Protect } from "@clerk/nextjs";
import clsx from "clsx";


const MoveFileToTrashAction = ({fileId, shouldDelete}: {fileId: Id<"files">, shouldDelete: boolean}) => {
  const [isOpened, setIsOpened] = useState(false)
  const softDeleteFile = useSoftDeleteFileToogle()
  const {toast} = useToast()

  // const buttonLabel = !shouldDelete ? "To trash" : "Restore"
  // const dialogTitle = !shouldDelete ? "Move this file to the trash?" : "Restore file?"
  // const dialogDescription = !shouldDelete ? "This file will be automatically be deleted after 30 days" : "It will be remove from the trash"
  // const toastTitle = !shouldDelete ? "File moved" : "File restored"
  // const toastDescription = !shouldDelete ? "File was successfully moved to trash" : "File restored"
  // const className = !shouldDelete ? "text-destructive" : ""
  // const icon = !shouldDelete ? X : ArchiveRestoreIcon

  let data = {
    buttonLabel: "To trash",
    dialogTitle: "Move this file to the trash?",
    dialogDescription: "This file will be automatically be deleted after 30 days",
    toastTitle: "File moved",
    toastDescription: "File was successfully moved to trash",
    className: "text-destructive",
    icon: X
  }

  if (shouldDelete) {
    data = {
      buttonLabel: "Restore",
      dialogTitle: "Restore file?",
      dialogDescription: "It will be remove from the trash",
      toastTitle: "File restored",
      toastDescription: "File was successfully restored",
      className: "",
      icon: Undo2Icon
    }
  }

  return (
    <Protect
      role="org:admin"
    >
      <AlertDialog open={isOpened} onOpenChange={setIsOpened}>
        <AlertDialogTrigger className="w-full">
          <FileActionItem
            icon={data.icon}
            className={data.className}
          >{data.buttonLabel}</FileActionItem>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{data.dialogTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {data.dialogDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={async () => {
                await softDeleteFile({
                  fileId: fileId,
                  shouldDelete: !shouldDelete
                })
                toast({
                  title: data.toastTitle,
                  description: data.toastDescription,
                })
                setIsOpened(false)
              }}
            >Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Protect> 
  )
}
// const MoveFileToTrashAction = ({fileId}: {fileId: Id<"files">}) => {
//   const [isOpened, setIsOpened] = useState(false)
//   const deletFile = useDeleteFile()
//   const {toast} = useToast()
//   return (
//     <AlertDialog open={isOpened} onOpenChange={setIsOpened}>
//       <AlertDialogTrigger className="flex-1 flex py-2 gap-1 text-destructive">
//         <X className="size-5"/>
//         <span>Delete</span>
//       </AlertDialogTrigger>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Are you sure you want to delete this file?</AlertDialogTitle>
//           <AlertDialogDescription>
//             This file will be moved to the trash
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>Cancel</AlertDialogCancel>
//           <AlertDialogAction 
//             onClick={async () => {
//               await deletFile({
//                 fileId: fileId
//               })
//               toast({
//                 title: "File deleted",
//                 description: "File was successfully remove from the app",
//               })
//               setIsOpened(false)
//             }}
//           >Continue</AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   )
// }

const ToogleFavoritesAction = ({fileId}: {fileId: Id<"files">}) => {
  const toogleFav = useToogleFavorites()
  const organizationId = useUserOrgId()
  const isfav = useGetFavorite({
    fileId,
    organizationId
  })

  // const iconprops = isfav ? {fill: "black"}: {}
  
  return (
    <div
      onClick={() => {
        toogleFav({ fileId })
        console.log("added to fav")
      }}
    >
      <FileActionItem
        icon={StarIcon}
        isfav={!!isfav}
      >Favorite</FileActionItem>
    </div>
  )
}

const FileActions = ({children}: {children: ReactNode}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"outline"} className="py-0 px-2" title="Actions">
          <EllipsisVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const FileActionItem = ({children, icon: Icon, isfav, className}: {children: ReactNode, icon: LucideIcon, isfav?: boolean, className?: string}) => {
  return (
    <div className={`flex-1 w-full flex py-2 px-1 gap-1 cursor-pointer ${className}`}>
      <Icon 
        // {...iconprops} 
        className={clsx(
          "size-5", 
          {"fill-black": isfav}
        )}
      />
      <span>{children}</span>
    </div>
  )
}

export const FileCard = ({ name, createdAt, fileExt, fileId, fileLocation, fileDetailsId, shouldDelete }: { name: string; createdAt: number; fileUrl: string; fileExt: string, fileId: Id<"_storage">, fileDetailsId: Id<"files">, fileLocation: string, shouldDelete: boolean }) => {
  
  const readableDatetime = formatDateToReadable(createdAt);
  
  return (
    <Card className="px-4 py-2 flex flex-col gap-2 transition-all hover:shadow-lg md:hover:scale-[1.01]" title={name}>
      <CardHeader className="flex flex-row items-center p-0 gap-4">
        <div className="flex flex-1 gap-1 overflow-hidden">
          <FileIconComponent fileExt={fileExt} />
          <div className="flex-1 overflow-hidden">
            <CardTitle className="truncate first-letter:uppercase">{name}</CardTitle>
          </div>
        </div>
        <div>
          <FileActions>
            <DropdownMenuLabel className="p-0 hover:bg-muted">
              <MoveFileToTrashAction fileId={fileDetailsId} shouldDelete={shouldDelete} />
            </DropdownMenuLabel>
            {!shouldDelete && 
              <DropdownMenuLabel className="flex p-0 hover:bg-muted">
                <ToogleFavoritesAction fileId={fileDetailsId}/>
              </DropdownMenuLabel>
            }
          </FileActions>
        </div>
      </CardHeader>
      <CardContent className="h-[250px] p-0 border rounded overflow-hidden relative">
        <FilePreview
          fileExt={fileExt}
          fileUrl={fileLocation}
          name={name}
        />
      </CardContent>
      <CardFooter className="flex justify-between items-center p-0">
        <div>
          <CardDescription className="text-xs">
            {`Uploaded ${readableDatetime.time} ${readableDatetime.date}`}
          </CardDescription>
        </div>
        <a href={fileLocation} target="_blank">
          <Button variant={"ghost"} className="p-2" title="Dowload">
            <DownloadIcon />
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};
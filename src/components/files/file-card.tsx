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
import {  DownloadIcon, EllipsisVerticalIcon, LucideIcon, StarIcon, Undo2Icon, X } from "lucide-react";
import { formatDateToReadable } from "@/lib/utils";
import { FileIconComponent } from "./FileIconComponent";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
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
import { useSoftDeleteFileToggle } from "@/hooks/repo/files";
import { Doc, Id } from "../../../convex/_generated/dataModel";
import { useToast } from "../ui/use-toast";
import { FilePreview } from "./file-preview";
import { useGetFavorite, useToggleFavorites } from "@/hooks/repo/favorites";
import { useMe, useUserOrgId } from "@/hooks/user";
import { Protect } from "@clerk/nextjs";
import clsx from "clsx";


const MoveFileToTrashAction = ({fileId, shouldDelete, userId}: {fileId: Id<"files">, shouldDelete?: boolean, userId: Id<"users">}) => {
  const [isOpened, setIsOpened] = useState(false);
  const softDeleteFile = useSoftDeleteFileToggle();
  const {toast} = useToast();
  const me = useMe();

  let data = {
    buttonLabel: "To trash",
    dialogTitle: "Move this file to the trash?",
    dialogDescription: "This file will be automatically be deleted later",
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
      condition={(has) => has({role: "org:admin"}) || userId === me?._id}
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


const ToggleFavoritesAction = ({fileId}: {fileId: Id<"files">}) => {
  const toggleFav = useToggleFavorites()
  const organizationId = useUserOrgId()
  const isfav = useGetFavorite({
    fileId,
    organizationId
  })

  if (!organizationId) return null

  return (
    <div
      onClick={() => toggleFav({ fileId, organizationId })}
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
        <div className="border rounded py-1 px-2" title="Actions">
          <EllipsisVerticalIcon />
        </div>
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
        className={clsx(
          "size-5", 
          {"fill-black": isfav}
        )}
      />
      <span>{children}</span>
    </div>
  )
}

export const FiLeActionList = ({shouldDelete, _id: fileDetailsId, userId}:  Doc<"files">) => {
  return (
    <FileActions>
      <DropdownMenuLabel className="p-0 hover:bg-muted">
        <MoveFileToTrashAction 
          fileId={fileDetailsId}
          shouldDelete={shouldDelete}
          userId={userId}
        />
      </DropdownMenuLabel>
      {!shouldDelete && 
        <DropdownMenuLabel className="flex p-0 hover:bg-muted">
          <ToggleFavoritesAction fileId={fileDetailsId}/>
        </DropdownMenuLabel>
      }
    </FileActions>
  )
}

export const FileCard = ({ file }:  {file: Doc<"files">} ) => {
  const {_creationTime, fileExt, name, fileLocation} = file
  const readableDatetime = formatDateToReadable(_creationTime);

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
          <FiLeActionList {...file}/>
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
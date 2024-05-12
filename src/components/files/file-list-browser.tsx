import { FiLeActionList, FileCard } from "@/components/files/file-card";
import { LoadingFiles } from "./file-loading";
import { Nofiles } from "./no-files";
import FileListGridContainer from "./file-list-grid-container";
import { Doc } from "../../../convex/_generated/dataModel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "../tables/data-table";
import { formatDateToReadable } from "@/lib/utils";
import { FilePreview } from "./file-preview";
import Link from "next/link";
import { Button } from "../ui/button";
import { Grid3X3Icon, Rows2Icon } from "lucide-react";


export const fileColumns: ColumnDef<Doc<"files">>[] = [
  {
    id: "image",
    cell: ({ row }) => {
      const {fileExt, fileLocation, name=""} = row.original
      return (
        <div className="w-[80px] h-[80px] relative rounded border overflow-hidden">
          <FilePreview
            fileExt={fileExt}
            fileUrl={fileLocation}
            name={name}
          />
        </div>
      )
    }
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "_creationTime",
    header: "Creation",
    accessorFn: (row) => {
      const readableDateTime = formatDateToReadable(row["_creationTime"])
      return readableDateTime.time + " " + readableDateTime.date
    }
  },
  {
    accessorKey: "fileLocation",
    header: "Dowload link",
    cell: ({row}) => {
      const {fileLocation} = row.original
      return (
        <Link 
          href={fileLocation} 
          target="_blank"
        >
          <Button variant={"outline"}>Download</Button>
        </Link>
      )
    }
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <FiLeActionList  {...row.original}/>
    }
  },
]


export const FileListBrowser = ({files, state}: {files?: Array<Doc<"files">>, state?: any}) => {

  if (files === undefined) return <LoadingFiles />
  
  if (!files?.length) return <Nofiles />

  return (
    <div className="h-full mt-4">
      <Tabs defaultValue="grid" value={state.currentTab} onValueChange={state.setCurrentTab}>
        <TabsList className="my-4">
          <TabsTrigger value="grid" className="flex gap-2">
            <Grid3X3Icon className="size-5"/> 
              <span>Grid</span> 
            </TabsTrigger>
          <TabsTrigger value="table" className="flex gap-2">
            <Rows2Icon className="size-5"/>
            <span>List</span> 
          </TabsTrigger>
        </TabsList>
        <TabsContent value="grid">
          <FileListGridContainer>
            {files.map((file) => (
              <FileCard
                key={file._id}
                file={file}
              />
            ))}
          </FileListGridContainer>
        </TabsContent>
        <TabsContent value="table">
        <DataTable columns={fileColumns} data={files} />
        </TabsContent>
      </Tabs>

    </div>
  );
};
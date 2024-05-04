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
import { DownloadIcon, EllipsisVerticalIcon, FileIcon } from "lucide-react";
import { formatDateToReadable } from "@/lib/utils";



export const FileCard = ({ name, createdAt }: { name: string; createdAt: number; fileUrl: string; }) => {
  const readableDatetime = formatDateToReadable(createdAt);

  return (
    <Card className="p-4 flex flex-col gap-2" title={name}>
      <CardHeader className="flex flex-row p-0">
        <div className="flex flex-1 gap-2 items-center">
          <FileIcon />
          <CardTitle className="first-letter:uppercase">{name}</CardTitle>
        </div>
        <div>
          <Button variant={"outline"} className="py-0 px-2" title="Actions">
            <EllipsisVerticalIcon />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="h-[250px] p-0 border">
        <p>Card Content</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-0">
        <div>
          <CardDescription className="text-xs">
            {`Uploaded ${readableDatetime.time} ${readableDatetime.date}`}
          </CardDescription>
        </div>
        <Button variant={"ghost"} className="p-2" title="Dowload"><DownloadIcon /></Button>
      </CardFooter>
    </Card>
  );
};

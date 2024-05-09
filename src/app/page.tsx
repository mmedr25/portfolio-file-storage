"use client"
import { useGetFiles, usefiles } from "@/hooks/repo/files";
import { FileListBrowser } from "../components/files/file-list-browser";
// import { usefiles } from "@/providers/files-provider";
import { FileListHeader } from "@/components/files/file-list-header";

interface HomeProps {
  searchParams: {
    search: string | null
  }
}

export default function Home({searchParams}: HomeProps) {
  const filesData = usefiles({searchQuery: searchParams?.search, getter: useGetFiles})

  return (
    <div className="flex flex-col gap-4">
      <FileListHeader title={"All files"} />
      <FileListBrowser files={filesData?.files}/>
    </div>
  );
}

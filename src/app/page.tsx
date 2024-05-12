"use client"
import { useGetFiles, useFiles } from "@/hooks/repo/files";
import PageContent from "@/components/page-content";

interface HomeProps {
  searchParams: {
    search: string | null
  }
}

export default function Home({searchParams}: HomeProps) {
  const filesData = useFiles({searchQuery: searchParams?.search, getter: useGetFiles})

  return <PageContent  {...{...filesData, title: "All files"}}/>
}
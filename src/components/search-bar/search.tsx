"use client"
import { SearchIcon } from "lucide-react"
import { Input } from "../ui/input"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, useCallback } from "react"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { debounce } from "@/lib/utils"


const searchBarOnchange = (e: ChangeEvent<HTMLInputElement>, router: AppRouterInstance, pathname: string, createQueryString: Function) => {
    if(!e?.target) return
    const value = e.target.value
    router.replace(pathname + '?' + createQueryString('search', value))
}

export const SearchBar = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback((name: string, value?: string) => {
        const params = new URLSearchParams(searchParams.toString())
        
        if (!value) {
            params.delete(name)
        }else{
            params.set(name, value)
        }

        return params.toString()
    }, [])
    
    
    return (
        <div className="relative ml-auto flex-1 md:grow-0">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                defaultValue={searchParams.get("search")?.toString()}
                onChange={
                    debounce(
                        (event: ChangeEvent<HTMLInputElement>) => {
                            searchBarOnchange(
                                event,
                                router,
                                pathname,
                                createQueryString
                            )
                        }
                    , 1500)
                }
            /> 
        </div>
    )
}
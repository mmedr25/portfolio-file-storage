import { FormUploadFileModal } from "./form-upload-file-modal"
import { SearchBar } from "../search-bar/search"

export const FileListHeader = ({title}: {title: string}) => {
    return (
        <div className="flex items-center flex-col gap-4 md:flex-row">
            <h1 className="text-4xl font-semibold">{title}</h1>
            <div className="flex gap-4 items-center flex-1">
                <SearchBar />
                <FormUploadFileModal/>
            </div>
        </div>
    )
}
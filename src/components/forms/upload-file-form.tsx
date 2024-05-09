"use client"
import { z } from "zod";
import { Form, clearForm } from "./base/form";
import { FormInput } from "./base/form-input";
import { FunctionComponent } from "react";
import { FormUploader } from "./base/form-uploader";
import { useCreateFile, useGetFileLocation, useUploadUrl } from "@/hooks/repo/files";
import { ReactMutation } from "convex/react";
import { DefaultFunctionArgs, FunctionReference } from "convex/server";
import { ConvexError } from "convex/values";
import { Id } from "../../../convex/_generated/dataModel";
import { UseFormReturn } from "react-hook-form";
import { FormButton } from "./base/form-button";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useGetUserDetails, useUserOrgId } from "@/hooks/user";

interface FileUploadFormProps {
    // organizationId: string
}

type Mutation<T extends DefaultFunctionArgs = any> = ReactMutation<FunctionReference<"mutation", any, T>>;

type CreateFileArgs = {
    name: string;
    fileId: Id<"_storage">;
    // userId: Id<"users">;
    organizationId: string;
    fileLocation: string;
    fileExt: string;
}
type FileUploadFormSchema = z.infer<typeof fileUploadFormSchema>

const fileUploadFormSchema = z.object({
    title: z.string().min(1),
    file: z.custom<FileList>((val) => val instanceof FileList, "Required").refine((file) => file?.length === 1, 'File is required.')
})

const defaultvalues: FileUploadFormSchema = {
    title: "",
    file: undefined!
}

interface SubmitProps {
    values: FileUploadFormSchema, 
    // generateUrl: Mutation, 
    // createFile: Mutation<CreateFileArgs>, 
    organizationId: string,
    form: UseFormReturn,
    // getStorageLocation: (fileId: Id<"_storage">) => string | null | undefined
}

// const submitHandler = async ({values, generateUrl, createFile, organizationId, form, getStorageLocation}: SubmitProps) => {
//     const postUrl = await generateUrl() as string
    
//     const file = values.file[0]
    
//     if (!file || !postUrl || !organizationId) return

//     const fileExt = file.type
//     const result = await fetch(postUrl, {
//         method: "POST",
//         headers: { "Content-Type": fileExt},
//         body: file,
//     });

//     if (!result.ok) throw new ConvexError("There was a problem during upload")
// 	// console.log("TCL: submitHandler haha -> result", result)
//     // const response = await result.json()
//     const { storageId } = await result.json();
// 	// console.log("TCL: submitHandler -> await result.json()", response)

//     const fileLocation = getStorageLocation(storageId)
// 	console.log("TCL: submitHandler -> fileLocation", fileLocation)

//     if(!fileLocation) throw Error("File was not uploaded correctly")

//     // TODO: save the id of the file
//     createFile({
//         name: values.title,
//         fileId: storageId,
//         organizationId: organizationId,
//         fileLocation: fileLocation,
//         fileExt: fileExt,
//         // fileEndpoint: "sdfsdf",
//         // userId: "sdfsdf"
//     })
//     clearForm(form)
// }

const useSubmitHandler = () => {
    const generateUrl = useUploadUrl()
    const createFile = useCreateFile()
    const getStorageLocation = useGetFileLocation()

    return async ({values, organizationId, form}: SubmitProps) => {
            const postUrl = await generateUrl() as string
            
            const file = values.file[0]
            
            if (!file || !postUrl || !organizationId) return
        
            const fileExt = file.type
            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": fileExt},
                body: file,
            });
        
            if (!result.ok) throw new ConvexError("There was a problem during upload")
        	// console.log("TCL: submitHandler haha -> result", result)
            // const response = await result.json()
            const { storageId } = await result.json();
			console.log("TCL: useSubmitHandler -> storageId", storageId)
        	// console.log("TCL: submitHandler -> await result.json()", response)
        
            const fileLocation = await getStorageLocation({fileId: storageId})
        	console.log("TCL: submitHandler -> fileLocation", fileLocation)
        
            if(!fileLocation) throw Error("File was not uploaded correctly")
                // return
            // TODO: save the id of the file
            createFile({
                name: values.title,
                fileId: storageId,
                organizationId: organizationId,
                fileLocation: fileLocation,
                fileExt: fileExt,
                // userId: "sdfsdf"
            })
            clearForm(form)
        }
}

// const useGetFileLocation = () => {
//     return (fileId: Id<"_storage">) => useGetFileUrl({fileId})
// }

const FileUploadForm: FunctionComponent<FileUploadFormProps> = () => {
    const organizationId = useUserOrgId()
    const submitHandler = useSubmitHandler()
	// console.log("TCL: organizationId", organizationId)
    // const {user} = useUser()
    // const userDetails = useGetUserDetails({tokenIdentifier: user.})
    if (!organizationId) return null;

    return (
        <Form
            defaultValues={defaultvalues}
            formSchema={fileUploadFormSchema}
            formOptions={{
                mode: "onChange"
            }}
            onSubmit={async (values, form) => {
                submitHandler({
                    values,
                    organizationId,
                    form,
                })
            }}
        >
            <FormInput
                <FileUploadFormSchema>
                name="title"
                label="Title"
            />
            <FormUploader
                <FileUploadFormSchema>
                name="file"
                label="File"
            />
            <FormButton>Upload</FormButton>
        </Form>
    );
}
 
export default FileUploadForm;
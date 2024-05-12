"use client"
import { z } from "zod";
import { Form, clearForm } from "./base/form";
import { FormInput } from "./base/form-input";
import { FunctionComponent } from "react";
import { FormUploader } from "./base/form-uploader";
import { useCreateFile, useUploadUrl } from "@/hooks/repo/files";
import { ConvexError } from "convex/values";
import { UseFormReturn } from "react-hook-form";
import { FormButton } from "./base/form-button";
import { useUserOrgId } from "@/hooks/user";
import { useToast } from "../ui/use-toast";

interface FileUploadFormProps {}

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
    organizationId: string,
    form: UseFormReturn,
}

const useSubmitHandler = () => {
    const generateUrl = useUploadUrl()
    const createFile = useCreateFile()
    const {toast} = useToast()
    const submitWithError = () => {
        toast({
            title: "Error",
            description: "The file was not uploaded"
        })
        throw new ConvexError("There was a problem during upload")
    }
    
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
    
        if (!result.ok)  return submitWithError();
            
        const { storageId } = await result.json();
    
        await createFile({
            name: values.title,
            fileId: storageId,
            organizationId: organizationId,
            fileExt: fileExt,
        })
        
        clearForm(form)

        toast({
            title: "Success",
            description: "The file was successfully uploaded"
        })
    }
}

const FileUploadForm: FunctionComponent<FileUploadFormProps> = () => {
    const organizationId = useUserOrgId()
    const submitHandler = useSubmitHandler()
    
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
"use client"
import { z } from "zod";
import { Form, clearForm } from "./base/form";
import { FormInput } from "./base/form-input";
import { FunctionComponent } from "react";
import { FormUploader } from "./base/form-uploader";
import { useCreateFile, useUploadUrl } from "@/hooks/repo/files";
import { ReactMutation } from "convex/react";
import { DefaultFunctionArgs, FunctionReference } from "convex/server";
import { ConvexError } from "convex/values";
import { Id } from "../../../convex/_generated/dataModel";
import { UseFormReturn } from "react-hook-form";
import { FormButton } from "./base/form-button";
import { useOrganization } from "@clerk/nextjs";
import { useUserOrgId } from "@/hooks/user";

interface FileUploadFormProps {
    // organizationId: string
}

type Mutation<T extends DefaultFunctionArgs = any> = ReactMutation<FunctionReference<"mutation", any, T>>;

type CreateFileArgs = {
    name: string;
    organizationId: string;
    fileId: Id<"_storage">;
}
type FileUploadFormSchema = z.infer<typeof fileUploadFormSchema>

const fileUploadFormSchema = z.object({
    title: z.string().min(1),
    // file: z.custom<FileList>((val) => val instanceof FileList, "Required")
    // file: typeof window === 'undefined' ? z.any() : z.instanceof(FileList).refine((file) => file?.length === 1, 'File is required.')
    file: z.custom<FileList>((val) => val instanceof FileList, "Required").refine((file) => file?.length === 1, 'File is required.')
})

const defaultvalues: FileUploadFormSchema = {
    title: "",
    file: undefined!
}

const submitHandler = async (values: FileUploadFormSchema, generateUrl: Mutation, createFile: Mutation<CreateFileArgs>, organizationId: string, form: UseFormReturn) => {
    const postUrl = await generateUrl() as string
    
    const file = values.file[0]
    
    if (!file || !postUrl || !organizationId) return

    const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
    });

    if (!result.ok) throw new ConvexError("There was a problem during upload")

    const { storageId } = await result.json();

    createFile({
        name: values.title,
        fileId: storageId,
        organizationId: organizationId
    })
    clearForm(form)
}

const FileUploadForm: FunctionComponent<FileUploadFormProps> = () => {
    const generateUrl = useUploadUrl()
    const createFile = useCreateFile()
    const organizationId = useUserOrgId()
    if (!organizationId) return null;
    
    return (
        <Form
            defaultValues={defaultvalues}
            formSchema={fileUploadFormSchema}
            formOptions={{
                mode: "onChange"
            }}
            onSubmit={async (values, form) => {
                submitHandler(
                    values,
                    generateUrl,
                    createFile,
                    organizationId,
                    form
                )
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
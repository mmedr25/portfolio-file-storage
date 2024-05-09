"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, UseFormReturn, useForm, UseFormProps, SubmitHandler, SubmitErrorHandler } from "react-hook-form"
import type z from "zod"
import { Form as FormProvider } from "@/components/ui/form"
import React, { FormHTMLAttributes, ReactElement } from "react"


type ReactFormHTMLAttributes<T> =  Omit<FormHTMLAttributes<T>, "children" | "onSubmit">

type FormExtras = {
  errorAfterSubmit?: true | Object,
  clearIfError?: boolean,
  clearIfSuccess?: boolean,
}

interface ReactFormProps<T extends FieldValues> extends ReactFormHTMLAttributes<HTMLFormElement>, FormExtras {
  formSchema: z.ZodType<T>,
  formOptions?: Omit<UseFormProps, "resolver" | "defaultValues">,
  defaultValues: T, // DefaultValues<T>
  children: ReactElement<T>[],
  onSubmit: (values: T, form: UseFormReturn) => void,
  onSubmitError?: SubmitErrorHandler<T>,
}

export const clearForm = function<T extends FieldValues>(form: UseFormReturn<T>) {
  form.reset()
}


export function Form <T extends FieldValues>({formOptions, children, defaultValues, formSchema, onSubmit, onSubmitError, clearIfError, clearIfSuccess, errorAfterSubmit, className, ...rest}: ReactFormProps<T>) {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
    ...formOptions
  })
  return (
    <FormProvider {...form}>
      <form 
        className={`flex flex-col gap-4 ${className}`} 
        {...rest}
        method="POST"
        onSubmit={(form as UseFormReturn<T>).handleSubmit((values) => onSubmit(values, form), onSubmitError)}
      >
        {children}
      </form>
    </FormProvider>
  )
}
"use client"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { InputHTMLAttributes, ReactNode } from "react"
import { FieldValues, Path, useFormContext } from "react-hook-form"


type InputHTMLAttributesWithoutForm<T> = Omit<InputHTMLAttributes<T>, "form" | "name" >
interface FormUploaderProps<T extends FieldValues> extends InputHTMLAttributesWithoutForm<HTMLInputElement> {
  readonly name: Path<T>,
  readonly label: string,
  description?: ReactNode,
}

export function FormUploader <T extends FieldValues>({name, label, description, required = true}: FormUploaderProps<T>) {
  const form = useFormContext<T>()
  const requiredLabel = !required ? "(optional)" : ""
  const field = form.register(name)

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => {
        return (
          <FormItem>
            <FormLabel>{`${label} ${requiredLabel}`}</FormLabel>
            <FormControl>
              <Input
                type="file"
                {...field}
              />
            </FormControl>
            {/* description could be a react node */}
            {(description && typeof description === "string") && <FormDescription>{description}</FormDescription>}
            {!!description && <div>{description}</div>}
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
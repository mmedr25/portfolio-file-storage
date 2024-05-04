"use client"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { InputHTMLAttributes, ReactNode } from "react"
import { FieldValues, Path, useFormContext } from "react-hook-form"


type InputHTMLAttributesWithoutForm<T> =  Omit<InputHTMLAttributes<T>, "form" | "name" >
interface FormInputProps<T extends FieldValues> extends InputHTMLAttributesWithoutForm<HTMLInputElement> {
  readonly name: Path<T>,
  readonly label: string,
  readonly placeholder?: string,
  description?: ReactNode,
  containerClassName?: string,
}

export function FormInput <T extends FieldValues>({name, label, placeholder, description, className, containerClassName, required = true, ...rest}: FormInputProps<T>) {
  const form = useFormContext<T>()
  const requiredLabel = !required ? "(optional)" : ""
	console.log("TCL: field", form.getValues())

  return (
    <FormField
      control={form.control}
      name={name}
      disabled={form.formState.isSubmitting}
      render={({ field }) => (
        <FormItem className={containerClassName}>
          <FormLabel>{`${label} ${requiredLabel}`}</FormLabel>
          <FormControl>
            <Input
              className={`border-muted-foreground/50 ${className}`}
              placeholder={placeholder ? placeholder : label}
              {...rest}
              {...field}
            />
          </FormControl>
          {/* description could be a react node */}
          {(description && typeof description === "string") && <FormDescription>{description}</FormDescription>}
          {!!description && <div>{description}</div>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
"use client"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { InputHTMLAttributes, ReactNode } from "react"
import { FieldValues, Path, useFormContext } from "react-hook-form"

type InputHTMLAttributesWithoutForm<T> =  Omit<InputHTMLAttributes<T>, "form" | "name">
interface FormRadioProps<T extends FieldValues> extends InputHTMLAttributesWithoutForm<HTMLInputElement> {
  readonly name: Path<T>,
  readonly label: string,
  children: string,
  containerClassName?: string,
}


export function FormRadio <T extends FieldValues>({name, label, children: description, containerClassName, required = true}: FormRadioProps<T>) {
  const form = useFormContext<T>()
  const requiredLabel = !required ? "(optional)" : ""

  return (
    <FormField
      control={form.control}
      name={name}
      disabled={form.formState.isSubmitting}
      render={({ field }) => (
        <FormItem className={`flex items-center p-4 border border-muted-foreground/50 rounded gap-4 ${containerClassName}`}>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={field.disabled}
              name={field.name}
            />
          </FormControl>
          <div>
            <FormLabel>{`${label} ${requiredLabel}`}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
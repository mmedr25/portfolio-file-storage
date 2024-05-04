import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDateToReadable = (date: number) => {
  const fileDate = new Date(date)

  return {
    time: fileDate.toLocaleTimeString(),
    date: fileDate.toLocaleDateString()
  }
}
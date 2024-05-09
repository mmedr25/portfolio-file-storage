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

export function debounce(callback: Function, timeout: number){
  let timer: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timer);

    timer = setTimeout(
      () => callback.apply(this, args), 
      timeout
    )
  }
}
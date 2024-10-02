import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines and merges CSS class names using clsx and tailwind-merge
 * @param {...(string|Object|Array)} inputs - CSS class names, objects, or arrays to be combined
 * @returns {string} A string of merged and deduplicated CSS class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

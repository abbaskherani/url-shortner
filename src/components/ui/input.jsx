import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A customizable input component with forwarded ref and styling
 * @param {Object} props - The props object
 * @param {string} [props.className] - Additional CSS classes to apply to the input
 * @param {string} [props.type] - The type of the input (e.g., 'text', 'password', etc.)
 * @param {React.Ref} ref - Forwarded ref to access the underlying input element
 * @returns {JSX.Element} A styled input element with forwarded ref and merged props
 */
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    (<input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }

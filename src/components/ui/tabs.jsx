import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

/**
 * A customizable tabs list component that wraps the TabsPrimitive.List
 * @param {Object} props - The props object
 * @param {string} [props.className] - Additional CSS class names to apply to the component
 * @param {React.Ref} ref - A forwarded ref to be applied to the underlying TabsPrimitive.List
 * @returns {React.ReactElement} A styled TabsPrimitive.List component
 */
const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props} />
))
TabsList.displayName = TabsPrimitive.List.displayName

/**
 * A custom React component that wraps the TabsPrimitive.Trigger component with additional styling and functionality.
 * @param {Object} props - The props object containing component properties.
 * @param {string} [props.className] - Additional CSS classes to apply to the component.
 * @param {React.Ref} ref - A forwarded ref to be applied to the underlying TabsPrimitive.Trigger component.
 * @returns {React.ReactElement} A styled and enhanced tabs trigger component.
 */
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props} />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

/**
 * A forwardRef component that renders the content of a tab panel.
 * @param {Object} props - The properties passed to the component.
 * @param {string} [props.className] - Additional CSS class names to apply to the component.
 * @param {React.Ref} ref - The ref to be forwarded to the underlying TabsPrimitive.Content component.
 * @returns {React.ReactElement} A React component representing the content of a tab panel.
 */
const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props} />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }

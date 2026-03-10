import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * MUNET Input Component
 * Based on PRD Section 6.2 Core Components
 *
 * Used in:
 * - Newsletter signup
 * - Contact forms
 * - Ticket purchase forms
 * - Event registration
 * - Venue inquiry forms
 */
const inputVariants = cva(
  // Base styles
  "flex w-full rounded-md bg-background font-body text-foreground transition-all duration-200 file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-input focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20",
        filled:
          "border-0 bg-muted focus-visible:bg-muted/80 focus-visible:ring-2 focus-visible:ring-accent/20",
        underline:
          "rounded-none border-0 border-b-2 border-input bg-transparent px-0 focus-visible:border-accent",
      },
      inputSize: {
        default: "h-10 px-4 py-2 text-sm",
        sm: "h-8 px-3 py-1.5 text-xs",
        lg: "h-12 px-5 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, inputSize, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

/**
 * InputGroup - Container for input with addons
 */
const InputGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative flex items-center", className)}
    {...props}
  />
))
InputGroup.displayName = "InputGroup"

/**
 * InputAddon - Prefix/suffix addon for inputs
 */
const InputAddon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    position?: "start" | "end"
  }
>(({ className, position = "start", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute flex items-center justify-center text-muted-foreground",
      {
        "left-3": position === "start",
        "right-3": position === "end",
      },
      className
    )}
    {...props}
  />
))
InputAddon.displayName = "InputAddon"

/**
 * Label - Form label component
 */
const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "font-body text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
))
Label.displayName = "Label"

/**
 * FormField - Wrapper for form field with label and error
 */
const FormField = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-2", className)}
    {...props}
  />
))
FormField.displayName = "FormField"

/**
 * FormError - Error message for form fields
 */
const FormError = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm font-medium text-destructive", className)}
    {...props}
  />
))
FormError.displayName = "FormError"

/**
 * FormDescription - Helper text for form fields
 */
const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
FormDescription.displayName = "FormDescription"

export {
  Input,
  InputGroup,
  InputAddon,
  Label,
  FormField,
  FormError,
  FormDescription,
  inputVariants,
}

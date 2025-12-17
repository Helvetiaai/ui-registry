import * as React from "react"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export interface FormFieldGroupProps extends React.ComponentProps<"div"> {
  label?: string
  id?: string
  error?: string
  description?: string
}

export function FormFieldGroup({
  label,
  id,
  error,
  description,
  children,
  className,
  ...props
}: FormFieldGroupProps) {
  return (
    <div
      data-slot="form-field-group"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    >
      {label && (
        <Label htmlFor={id} className={error ? "text-destructive" : undefined}>
          {label}
        </Label>
      )}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {children}
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

import * as React from "react"
import { cn } from "@/lib/utils"

export interface FormSectionProps extends React.ComponentProps<"div"> {
  title?: string
  description?: string
}

export function FormSection({
  title,
  description,
  children,
  className,
  ...props
}: FormSectionProps) {
  return (
    <div
      data-slot="form-section"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    >
      {(title || description) && (
        <div className="flex flex-col gap-1">
          {title && <h3 className="text-sm font-medium">{title}</h3>}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  )
}

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface Action {
  label: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link"
  onClick?: () => void
  disabled?: boolean
}

export interface ActionGroupProps extends React.ComponentProps<"div"> {
  actions: Action[]
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link"
}

export function ActionGroup({
  actions,
  variant,
  className,
  ...props
}: ActionGroupProps) {
  return (
    <div
      data-slot="action-group"
      className={cn("flex gap-2", className)}
      {...props}
    >
      {actions.map((action, index) => (
        <Button
          key={index}
          variant={action.variant || variant || "default"}
          onClick={action.onClick}
          disabled={action.disabled}
          className={actions.length === 1 ? "flex-1" : undefined}
        >
          {action.label}
        </Button>
      ))}
    </div>
  )
}

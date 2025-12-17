import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface MetadataItem {
  label: string
  value: string
}

export interface EntityAction {
  label: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link"
  onClick?: () => void
}

export interface EntityCardProps extends React.ComponentProps<"div"> {
  avatar?: string | { initials: string }
  name?: string
  role?: string
  status?: string
  metadata?: MetadataItem[]
  actions?: EntityAction[]
}

export function EntityCard({
  avatar,
  name,
  role,
  status,
  metadata,
  actions,
  className,
  ...props
}: EntityCardProps) {
  const avatarContent =
    typeof avatar === "string" ? (
      <img src={avatar} alt={name} className="h-12 w-12 rounded-full object-cover" />
    ) : avatar?.initials ? (
      <span className="text-lg font-semibold text-muted-foreground">
        {avatar.initials}
      </span>
    ) : null

  return (
    <div
      data-slot="entity-card"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    >
      <div className="flex items-center gap-4">
        {avatar && (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            {avatarContent}
          </div>
        )}
        <div className="flex flex-1 flex-col gap-1">
          {name && <p className="text-sm font-medium">{name}</p>}
          {role && <p className="text-sm text-muted-foreground">{role}</p>}
        </div>
        {status && <Badge variant="secondary">{status}</Badge>}
      </div>
      {metadata && metadata.length > 0 && (
        <div className="flex flex-col gap-2">
          {metadata.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      )}
      {actions && actions.length > 0 && (
        <div className="flex gap-2">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || "default"}
              className="flex-1"
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

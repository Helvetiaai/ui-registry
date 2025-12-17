import * as React from "react"
import { cn } from "@/lib/utils"

export interface MetadataItem {
  label: string
  value: string | React.ReactNode
}

export interface MetadataListProps extends React.ComponentProps<"div"> {
  items: MetadataItem[]
}

export function MetadataList({
  items,
  className,
  ...props
}: MetadataListProps) {
  return (
    <div
      data-slot="metadata-list"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between text-sm"
        >
          <span className="text-muted-foreground">{item.label}</span>
          <span className="font-medium">{item.value}</span>
        </div>
      ))}
    </div>
  )
}

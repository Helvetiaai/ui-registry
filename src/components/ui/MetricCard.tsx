import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface MetricCardProps extends React.ComponentProps<"div"> {
  label?: string
  value?: string | number
  delta?: string | number
  deltaLabel?: string
  unit?: string
}

export function MetricCard({
  label,
  value,
  delta,
  deltaLabel,
  unit,
  className,
  ...props
}: MetricCardProps) {
  return (
    <div
      data-slot="metric-card"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    >
      {label && <span className="text-sm text-muted-foreground">{label}</span>}
      <div className="flex items-baseline gap-2">
        {value !== undefined && (
          <span className="text-2xl font-bold">{value}</span>
        )}
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>
      {delta !== undefined && (
        <div className="flex items-center gap-2">
          <Badge variant={delta.toString().startsWith("+") ? "default" : "secondary"}>
            {delta}
          </Badge>
          {deltaLabel && (
            <span className="text-sm text-muted-foreground">{deltaLabel}</span>
          )}
        </div>
      )}
    </div>
  )
}

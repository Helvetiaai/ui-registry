import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export interface MetricCardProps {
  title?: string
  description?: string
  value?: string
  valueUnit?: string
  delta?: string
  deltaLabel?: string
  primaryAction?: {
    label: string
    onClick?: () => void
  }
  secondaryAction?: {
    label: string
    onClick?: () => void
  }
}

export function MetricCard({
  title = "Total Revenue",
  description = "Last 30 days",
  value = "$45,231",
  valueUnit = "USD",
  delta = "+12.5%",
  deltaLabel = "Compared to last month",
  primaryAction,
  secondaryAction,
}: MetricCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Badge variant="secondary">{delta}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">{value}</span>
          <span className="text-sm text-muted-foreground">{valueUnit}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          <span>{deltaLabel}</span>
        </div>
        {(primaryAction || secondaryAction) && (
          <div className="flex gap-2">
            {primaryAction && (
              <Button variant="outline" className="flex-1" onClick={primaryAction.onClick}>
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button className="flex-1" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

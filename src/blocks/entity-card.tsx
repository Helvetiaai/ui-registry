import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export interface MetadataItem {
  label: string
  value: string
}

export interface EntityAction {
  label: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link"
  onClick?: () => void
}

export interface EntityCardProps {
  name?: string
  role?: string
  status?: string
  avatar?: string | { initials: string }
  metadata?: MetadataItem[]
  actions?: EntityAction[]
}

export function EntityCard({
  name = "John Doe",
  role = "Software Engineer",
  status = "Active",
  avatar = { initials: "JD" },
  metadata = [
    { label: "Member since", value: "Jan 2024" },
    { label: "Projects", value: "12" },
  ],
  actions = [
    { label: "Edit Profile", variant: "outline" },
    { label: "View Details", variant: "default" },
  ],
}: EntityCardProps) {
  const avatarContent =
    typeof avatar === "string" ? (
      <img src={avatar} alt={name} className="h-16 w-16 rounded-full object-cover" />
    ) : (
      <span className="text-2xl font-semibold text-muted-foreground">{avatar.initials}</span>
    )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle>{name}</CardTitle>
            <CardDescription>{role}</CardDescription>
          </div>
          {status && <Badge variant="secondary">{status}</Badge>}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            {avatarContent}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">john.doe@example.com</p>
            <p className="text-sm text-muted-foreground">San Francisco, CA</p>
          </div>
        </div>
        {metadata && metadata.length > 0 && (
          <>
            <Separator />
            <div className="flex flex-col gap-2">
              {metadata.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </>
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
      </CardContent>
    </Card>
  )
}

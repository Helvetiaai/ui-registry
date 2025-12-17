import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function ProfileCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle>John Doe</CardTitle>
            <CardDescription>Software Engineer</CardDescription>
          </div>
          <Badge variant="secondary">Active</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <span className="text-2xl font-semibold text-muted-foreground">JD</span>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">john.doe@example.com</p>
            <p className="text-sm text-muted-foreground">San Francisco, CA</p>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Member since</span>
            <span className="font-medium">Jan 2024</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Projects</span>
            <span className="font-medium">12</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">Edit Profile</Button>
          <Button className="flex-1">View Details</Button>
        </div>
      </CardContent>
    </Card>
  )
}

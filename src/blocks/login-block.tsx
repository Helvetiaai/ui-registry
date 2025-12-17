import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginBlock() {
  return (
    <Card>
      <CardHeader>Login</CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" />
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="••••••••" />
        <Button className="mt-2 w-full">Sign in</Button>
      </CardContent>
    </Card>
  )
}

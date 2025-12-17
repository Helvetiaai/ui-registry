import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export interface CredentialFormBlockProps {
  title?: string
  emailLabel?: string
  emailPlaceholder?: string
  passwordLabel?: string
  passwordPlaceholder?: string
  submitLabel?: string
  onSubmit?: () => void
}

export function CredentialFormBlock({
  title = "Login",
  emailLabel = "Email",
  emailPlaceholder = "you@example.com",
  passwordLabel = "Password",
  passwordPlaceholder = "••••••••",
  submitLabel = "Sign in",
  onSubmit,
}: CredentialFormBlockProps) {
  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Label htmlFor="email">{emailLabel}</Label>
        <Input id="email" type="email" placeholder={emailPlaceholder} />
        <Label htmlFor="password">{passwordLabel}</Label>
        <Input id="password" type="password" placeholder={passwordPlaceholder} />
        <Button className="mt-2 w-full" onClick={onSubmit}>
          {submitLabel}
        </Button>
      </CardContent>
    </Card>
  )
}

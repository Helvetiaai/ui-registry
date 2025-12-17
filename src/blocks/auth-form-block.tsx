import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export interface AuthFormField {
  id: string
  label: string
  placeholder?: string
  type?: string
  required?: boolean
}

export interface SocialProvider {
  name: string
  icon?: React.ReactNode
  onClick?: () => void
}

export interface AuthFormAction {
  label: string
  onClick?: () => void
}

export interface AuthFormBlockProps {
  mode?: "login" | "signup"
  title?: string
  description?: string
  fields?: AuthFormField[]
  actions?: AuthFormAction[]
  socialProviders?: SocialProvider[]
  footerText?: string
  footerLink?: {
    text: string
    onClick?: () => void
  }
}

export function AuthFormBlock({
  mode = "login",
  title,
  description,
  fields,
  actions,
  socialProviders,
  footerText,
  footerLink,
}: AuthFormBlockProps) {
  const defaultFields: AuthFormField[] =
    mode === "login"
      ? [
          { id: "email", label: "Email", placeholder: "name@example.com", type: "email", required: true },
          { id: "password", label: "Password", placeholder: "••••••••", type: "password", required: true },
        ]
      : [
          { id: "name", label: "Name", placeholder: "John Doe", type: "text", required: true },
          { id: "email", label: "Email", placeholder: "name@example.com", type: "email", required: true },
          { id: "password", label: "Password", placeholder: "••••••••", type: "password", required: true },
        ]

  const formFields = fields || defaultFields
  const defaultTitle = mode === "login" ? "Login" : "Create an account"
  const defaultDescription =
    mode === "login"
      ? "Enter your email below to login to your account"
      : "Enter your information to create an account"

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">{title || defaultTitle}</CardTitle>
        <CardDescription>{description || defaultDescription}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {socialProviders && socialProviders.length > 0 && (
          <>
            <div className="grid grid-cols-2 gap-4">
              {socialProviders.map((provider) => (
                <Button
                  key={provider.name}
                  variant="outline"
                  className="w-full"
                  onClick={provider.onClick}
                >
                  {provider.icon}
                  {provider.name}
                </Button>
              ))}
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
          </>
        )}
        <div className="space-y-4">
          {formFields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id}>{field.label}</Label>
              <Input
                id={field.id}
                type={field.type || "text"}
                placeholder={field.placeholder}
                required={field.required}
              />
            </div>
          ))}
        </div>
        {actions && actions.length > 0 ? (
          <div className="space-y-2">
            {actions.map((action, index) => (
              <Button key={index} className="w-full" onClick={action.onClick}>
                {action.label}
              </Button>
            ))}
          </div>
        ) : (
          <Button className="w-full">
            {mode === "login" ? "Login" : "Create account"}
          </Button>
        )}
        {footerText && (
          <div className="text-center text-sm text-muted-foreground">
            {footerText}{" "}
            {footerLink && (
              <button
                onClick={footerLink.onClick}
                className="text-primary underline underline-offset-4 hover:no-underline"
              >
                {footerLink.text}
              </button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

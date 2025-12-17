import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export interface FormField {
  id: string
  label: string
  placeholder?: string
  type?: string
  rows?: number
}

export interface FormSection {
  fields: FormField[]
  separator?: boolean
}

export interface FormAction {
  label: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link"
  onClick?: () => void
}

export interface SectionedFormBlockProps {
  title?: string
  description?: string
  sections?: FormSection[]
  actions?: FormAction[]
}

export function SectionedFormBlock({
  title = "Settings",
  description = "Manage your account settings and preferences.",
  sections = [
    {
      fields: [
        { id: "name", label: "Full Name", placeholder: "John Doe", type: "text" },
        { id: "email", label: "Email", placeholder: "john@example.com", type: "email" },
        { id: "bio", label: "Bio", placeholder: "Tell us about yourself", type: "textarea", rows: 4 },
      ],
    },
    {
      separator: true,
      fields: [
        { id: "password", label: "New Password", placeholder: "••••••••", type: "password" },
        {
          id: "confirm-password",
          label: "Confirm Password",
          placeholder: "••••••••",
          type: "password",
        },
      ],
    },
  ],
  actions = [
    { label: "Cancel", variant: "outline" },
    { label: "Save Changes", variant: "default" },
  ],
}: SectionedFormBlockProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="flex flex-col gap-4">
            {section.separator && sectionIndex > 0 && <Separator />}
            {section.fields.map((field) => (
              <div key={field.id} className="flex flex-col gap-2">
                <Label htmlFor={field.id}>{field.label}</Label>
                {field.type === "textarea" ? (
                  <Textarea
                    id={field.id}
                    placeholder={field.placeholder}
                    rows={field.rows || 4}
                  />
                ) : (
                  <Input
                    id={field.id}
                    type={field.type || "text"}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
        {actions && actions.length > 0 && (
          <div className="flex justify-end gap-2">
            {actions.map((action, index) => (
              <Button key={index} variant={action.variant || "default"} onClick={action.onClick}>
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

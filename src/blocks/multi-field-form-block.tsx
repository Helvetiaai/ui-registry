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
  gridCols?: number
  rows?: number
}

export interface FormCheckbox {
  id: string
  label: string
}

export interface FormAction {
  label: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link"
  onClick?: () => void
}

export interface MultiFieldFormBlockProps {
  title?: string
  description?: string
  fields?: FormField[]
  checkbox?: FormCheckbox
  actions?: FormAction[]
}

export function MultiFieldFormBlock({
  title = "Contact Form",
  description = "Fill out the form below and we'll get back to you as soon as possible.",
  fields = [
    { id: "first-name", label: "First Name", placeholder: "John", type: "text", gridCols: 2 },
    { id: "last-name", label: "Last Name", placeholder: "Doe", type: "text", gridCols: 2 },
    { id: "email", label: "Email", placeholder: "john@example.com", type: "email" },
    { id: "phone", label: "Phone Number", placeholder: "+1 (555) 000-0000", type: "tel" },
    { id: "subject", label: "Subject", placeholder: "How can we help?", type: "text" },
    { id: "message", label: "Message", placeholder: "Enter your message here...", type: "textarea", rows: 6 },
  ],
  checkbox = { id: "terms", label: "I agree to the terms and conditions" },
  actions = [
    { label: "Cancel", variant: "outline" },
    { label: "Submit", variant: "default" },
  ],
}: MultiFieldFormBlockProps) {
  const gridFields: FormField[] = []
  const regularFields: FormField[] = []

  fields.forEach((field) => {
    if (field.gridCols === 2) {
      gridFields.push(field)
    } else {
      regularFields.push(field)
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {gridFields.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {gridFields.map((field) => (
              <div key={field.id} className="flex flex-col gap-2">
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input
                  id={field.id}
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </div>
        )}
        {regularFields.map((field) => (
          <div key={field.id} className="flex flex-col gap-2">
            <Label htmlFor={field.id}>{field.label}</Label>
            {field.type === "textarea" ? (
              <Textarea
                id={field.id}
                placeholder={field.placeholder}
                rows={field.rows || 6}
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
        {checkbox && (
          <>
            <Separator />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={checkbox.id}
                className="h-4 w-4 rounded border-input"
              />
              <Label htmlFor={checkbox.id} className="text-sm font-normal cursor-pointer">
                {checkbox.label}
              </Label>
            </div>
          </>
        )}
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

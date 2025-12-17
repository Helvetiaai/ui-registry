import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export interface FormField {
  id: string
  label: string
  placeholder?: string
  type?: string
  gridCols?: number
}

export interface FormAction {
  label: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link"
  onClick?: () => void
}

export interface FormBlockProps {
  title?: string
  description?: string
  fields?: FormField[]
  actions?: FormAction[]
}

export function FormBlock({
  title = "Payment Information",
  description = "Enter your payment details to complete the purchase.",
  fields = [
    { id: "card-number", label: "Card Number", placeholder: "1234 5678 9012 3456", type: "text" },
    { id: "expiry", label: "Expiry Date", placeholder: "MM/YY", type: "text", gridCols: 2 },
    { id: "cvv", label: "CVV", placeholder: "123", type: "text", gridCols: 2 },
    { id: "cardholder", label: "Cardholder Name", placeholder: "John Doe", type: "text" },
  ],
  actions = [{ label: "Pay Now", variant: "default" }],
}: FormBlockProps) {
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
      <CardContent className="flex flex-col gap-4">
        {regularFields.map((field) => (
          <div key={field.id} className="flex flex-col gap-2">
            <Label htmlFor={field.id}>{field.label}</Label>
            <Input
              id={field.id}
              type={field.type || "text"}
              placeholder={field.placeholder}
            />
          </div>
        ))}
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
        <Separator />
        {actions.length > 0 && (
          <div className="flex gap-2">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || "default"}
                className={actions.length === 1 ? "w-full" : "flex-1"}
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

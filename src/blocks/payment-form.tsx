import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function PaymentForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
        <CardDescription>Enter your payment details to complete the purchase.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="card-number">Card Number</Label>
          <Input id="card-number" type="text" placeholder="1234 5678 9012 3456" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="expiry">Expiry Date</Label>
            <Input id="expiry" type="text" placeholder="MM/YY" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="cvv">CVV</Label>
            <Input id="cvv" type="text" placeholder="123" />
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-2">
          <Label htmlFor="cardholder">Cardholder Name</Label>
          <Input id="cardholder" type="text" placeholder="John Doe" />
        </div>
        <Button className="w-full">Pay Now</Button>
      </CardContent>
    </Card>
  )
}

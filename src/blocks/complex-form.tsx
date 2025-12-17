import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export function ComplexForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Form</CardTitle>
        <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="first-name">First Name</Label>
            <Input id="first-name" type="text" placeholder="John" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="last-name">Last Name</Label>
            <Input id="last-name" type="text" placeholder="Doe" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="john@example.com" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
        </div>
        <Separator />
        <div className="flex flex-col gap-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" type="text" placeholder="How can we help?" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" placeholder="Enter your message here..." rows={6} />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="terms" className="h-4 w-4 rounded border-input" />
          <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
            I agree to the terms and conditions
          </Label>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Submit</Button>
        </div>
      </CardContent>
    </Card>
  )
}

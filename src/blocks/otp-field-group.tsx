"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export interface OTPFieldGroupProps {
  length?: number
  onComplete?: (value: string) => void
  autoFocus?: boolean
  disabled?: boolean
  className?: string
}

export function OTPFieldGroup({
  length = 6,
  onComplete,
  autoFocus = true,
  disabled = false,
  className,
}: OTPFieldGroupProps) {
  const [values, setValues] = React.useState<string[]>(Array(length).fill(""))
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (disabled) return

    const newValue = value.replace(/[^0-9]/g, "").slice(0, 1)
    const newValues = [...values]
    newValues[index] = newValue
    setValues(newValues)

    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    if (newValues.every((v) => v !== "") && onComplete) {
      onComplete(newValues.join(""))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, length)
    const newValues = Array(length).fill("")
    pastedData.split("").forEach((char, index) => {
      if (index < length) {
        newValues[index] = char
      }
    })
    setValues(newValues)
    if (pastedData.length === length && onComplete) {
      onComplete(pastedData)
    } else {
      const nextIndex = Math.min(pastedData.length, length - 1)
      inputRefs.current[nextIndex]?.focus()
    }
  }

  return (
    <div
      data-slot="otp-field-group"
      className={cn("flex gap-2", className)}
      onPaste={handlePaste}
    >
      {Array.from({ length }).map((_, index) => (
        <Input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={values[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          disabled={disabled}
          autoFocus={autoFocus && index === 0}
          className="h-12 w-12 text-center text-lg font-semibold"
        />
      ))}
    </div>
  )
}

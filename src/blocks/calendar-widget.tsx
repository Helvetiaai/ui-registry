"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface CalendarWidgetProps {
  selectedDate?: Date
  onSelect?: (date: Date) => void
  mode?: "single" | "range"
  disabledDates?: Date[]
  className?: string
}

export function CalendarWidget({
  selectedDate,
  onSelect,
  mode = "single",
  disabledDates = [],
  className,
}: CalendarWidgetProps) {
  const [currentMonth, setCurrentMonth] = React.useState(
    selectedDate || new Date()
  )
  const [selectedDates, setSelectedDates] = React.useState<Date[]>(
    selectedDate ? [selectedDate] : []
  )

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days: (number | null)[] = []
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }

  const isDateDisabled = (date: Date) => {
    return disabledDates.some(
      (disabledDate) =>
        disabledDate.getDate() === date.getDate() &&
        disabledDate.getMonth() === date.getMonth() &&
        disabledDate.getFullYear() === date.getFullYear()
    )
  }

  const isDateSelected = (day: number) => {
    if (!day) return false
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return selectedDates.some(
      (selectedDate) =>
        selectedDate.getDate() === date.getDate() &&
        selectedDate.getMonth() === date.getMonth() &&
        selectedDate.getFullYear() === date.getFullYear()
    )
  }

  const handleDateClick = (day: number) => {
    if (!day) return
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    if (isDateDisabled(date)) return

    if (mode === "single") {
      setSelectedDates([date])
      onSelect?.(date)
    } else {
      if (selectedDates.length === 0 || selectedDates.length === 2) {
        setSelectedDates([date])
      } else {
        setSelectedDates([selectedDates[0], date].sort((a, b) => a.getTime() - b.getTime()))
      }
    }
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const days = getDaysInMonth(currentMonth)

  return (
    <Card className={cn("w-fit", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={goToPreviousMonth}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Button>
          <CardTitle className="text-lg font-semibold">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={goToNextMonth}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div data-slot="calendar-widget" className="grid grid-cols-7 gap-1">
          {dayNames.map((day) => (
            <div
              key={day}
              className="flex h-9 items-center justify-center text-sm font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
          {days.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="h-9" />
            }
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
            const disabled = isDateDisabled(date)
            const selected = isDateSelected(day)

            return (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                disabled={disabled}
                className={cn(
                  "h-9 w-9 rounded-md text-sm transition-colors",
                  selected
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground",
                  disabled && "cursor-not-allowed opacity-50"
                )}
              >
                {day}
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

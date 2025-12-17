import * as React from "react"
import { cn } from "@/lib/utils"

export interface SectionWrapperProps extends React.ComponentProps<"div"> {
  padding?: "none" | "sm" | "md" | "lg" | "xl"
  margin?: "none" | "sm" | "md" | "lg" | "xl"
}

const paddingMap = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-12",
}

const marginMap = {
  none: "",
  sm: "m-4",
  md: "m-6",
  lg: "m-8",
  xl: "m-12",
}

export function SectionWrapper({
  padding = "md",
  margin = "none",
  children,
  className,
  ...props
}: SectionWrapperProps) {
  return (
    <div
      data-slot="section-wrapper"
      className={cn(
        paddingMap[padding],
        marginMap[margin],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

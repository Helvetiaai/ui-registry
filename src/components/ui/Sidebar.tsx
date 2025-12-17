"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SidebarProps extends React.ComponentProps<"aside"> {
  collapsible?: boolean
  defaultOpen?: boolean
}

export function Sidebar({
  collapsible = false,
  defaultOpen = true,
  children,
  className,
  ...props
}: SidebarProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  return (
    <aside
      data-slot="sidebar"
      className={cn(
        "bg-sidebar text-sidebar-foreground border-sidebar-border flex h-full flex-col border-r transition-all duration-300",
        isOpen ? "w-64" : "w-16",
        !collapsible && "w-64",
        className
      )}
      {...props}
    >
      {collapsible && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-0 top-4 z-10 -translate-x-1/2 translate-y-0 rounded-full border border-sidebar-border bg-sidebar p-1.5 text-sidebar-foreground shadow-md transition-colors hover:bg-sidebar-accent"
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
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
            className={cn("transition-transform", !isOpen && "rotate-180")}
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      )}
      <div className="flex h-full flex-col overflow-y-auto p-4">{children}</div>
    </aside>
  )
}

"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SidebarLayoutProps {
  sidebarContent?: React.ReactNode
  mainContent?: React.ReactNode
  collapsible?: boolean
  defaultOpen?: boolean
  className?: string
}

export function SidebarLayout({
  sidebarContent,
  mainContent,
  collapsible = false,
  defaultOpen = true,
  className,
}: SidebarLayoutProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  return (
    <div
      data-slot="sidebar-layout"
      className={cn(
        "flex h-screen w-full overflow-hidden",
        className
      )}
    >
      <aside
        data-slot="sidebar"
        className={cn(
          "bg-sidebar text-sidebar-foreground border-sidebar-border flex h-full flex-col border-r transition-all duration-300",
          isOpen ? "w-64" : "w-16",
          !collapsible && "w-64"
        )}
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
        <div className="flex h-full flex-col overflow-y-auto p-4">
          {sidebarContent}
        </div>
      </aside>
      <main
        data-slot="main-content"
        className="flex flex-1 flex-col overflow-y-auto bg-background"
      >
        {mainContent}
      </main>
    </div>
  )
}

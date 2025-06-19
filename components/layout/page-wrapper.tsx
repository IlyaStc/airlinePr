import type React from "react"
import { cn } from "@/lib/utils"

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  return <div className={cn("flex min-h-screen flex-col pb-16 md:pb-0", className)}>{children}</div>
}

import type React from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { ROUTES } from "@/lib/navigation"

type PageContainerProps = {
  children: React.ReactNode
  title: string
  description?: string
  backLink?: {
    href: string
    label: string
  }
  className?: string
}

export function PageContainer({
  children,
  title,
  description,
  backLink = { href: ROUTES.HOME, label: "Back to Home" },
  className = "",
}: PageContainerProps) {
  return (
    <div className={`min-h-screen bg-background ${className}`}>
      <div className="container py-8">
        {backLink && (
          <div className="mb-8 flex items-center">
            <Link href={backLink.href} className="flex items-center text-muted-foreground hover:text-foreground">
              <ChevronLeft className="mr-2 h-4 w-4" />
              {backLink.label}
            </Link>
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
          {description && <p className="mt-2 text-muted-foreground">{description}</p>}
        </div>

        {children}
      </div>
    </div>
  )
}

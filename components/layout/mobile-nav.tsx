"use client"

import Link from "next/link"
import { Home, Search, Plane, User } from "lucide-react"
import { ROUTES } from "@/lib/navigation"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"

export function MobileNav() {
  const [currentPath, setCurrentPath] = useState("")
  const { user } = useAuth()

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background md:hidden">
      <div className="grid h-16 grid-cols-5">
        <Link
          href={ROUTES.HOME}
          className={cn(
            "flex flex-col items-center justify-center gap-1 text-xs",
            currentPath === ROUTES.HOME ? "text-primary" : "text-muted-foreground",
          )}
        >
          <Home className="h-5 w-5" />
          <span>Home</span>
        </Link>

        <Link
          href={ROUTES.DESTINATIONS}
          className={cn(
            "flex flex-col items-center justify-center gap-1 text-xs",
            currentPath === ROUTES.DESTINATIONS ? "text-primary" : "text-muted-foreground",
          )}
        >
          <Search className="h-5 w-5" />
          <span>Explore</span>
        </Link>

        <Link
          href={ROUTES.BOOK}
          className={cn(
            "flex flex-col items-center justify-center gap-1 text-xs",
            currentPath === ROUTES.BOOK ? "text-primary" : "text-muted-foreground",
          )}
        >
          <Plane className="h-5 w-5" />
          <span>Book</span>
        </Link>

        <Link
          href={ROUTES.FLIGHT_STATUS}
          className={cn(
            "flex flex-col items-center justify-center gap-1 text-xs",
            currentPath === ROUTES.FLIGHT_STATUS ? "text-primary" : "text-muted-foreground",
          )}
        >
          <Plane className="h-5 w-5 rotate-90" />
          <span>Status</span>
        </Link>

        <Link
          href={user ? ROUTES.PROFILE : ROUTES.SIGN_IN}
          className={cn(
            "flex flex-col items-center justify-center gap-1 text-xs",
            currentPath === ROUTES.PROFILE || currentPath === ROUTES.SIGN_IN ? "text-primary" : "text-muted-foreground",
          )}
        >
          <User className="h-5 w-5" />
          <span>{user ? "Profile" : "Sign In"}</span>
        </Link>
      </div>
    </div>
  )
}

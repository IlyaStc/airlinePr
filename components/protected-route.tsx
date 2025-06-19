"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { useAuth } from "@/hooks/use-auth"
import { ROUTES } from "@/lib/navigation"

export const ProtectedRoute = observer(({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(ROUTES.SIGN_IN)
    }
  }, [isLoading, user, router])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
})

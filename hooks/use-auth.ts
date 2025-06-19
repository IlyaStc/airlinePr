"use client"

import { useStore } from "@/stores/root-store"
import { useRouter } from "next/navigation"
import { useCallback } from "react"


export function useAuth() {
  const { userStore } = useStore()
  const router = useRouter()

 
  const signIn = useCallback(
    (email: string, password: string) => userStore.signIn(email, password),
    [userStore],
  )
  const signUp = useCallback(
    (name: string, email: string, password: string) => userStore.signUp(name, email, password),
    [userStore],
  )
  const signOut = useCallback(() => userStore.signOut(), [userStore])

  return {
    user: userStore.user,
    isAuthenticated: userStore.isAuthenticated,
    isLoading: userStore.isLoading,
    error: userStore.error,
    signIn,
    signUp,
    signOut,
  }
}

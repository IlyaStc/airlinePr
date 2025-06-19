"use client"

import type React from "react"

import { StoreProvider } from "@/stores/root-store"

export function Providers({ children }: { children: React.ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>
}

"use client"

import { useState, useCallback } from "react"
import { useToast } from "@/components/ui/use-toast"

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: any) => void
  showSuccessToast?: boolean
  showErrorToast?: boolean
  successMessage?: string
  errorMessage?: string
}

export function useApi<T = any>() {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<any>(null)
  const { toast } = useToast()

  const execute = useCallback(
    async <R = T>(apiCall: () => Promise<R>, options?: UseApiOptions<R>): Promise<R | null> => {
      setIsLoading(true)
      setError(null)

      try {
        const result = await apiCall()
        setData(result as unknown as T)

        if (options?.showSuccessToast) {
          toast({
            title: "Success",
            description: options.successMessage || "Operation completed successfully",
            variant: "default",
          })
        }

        options?.onSuccess?.(result)
        return result
      } catch (err) {
        const errorMessage = "An unexpected error occurred"
        setError(err)

        if (options?.showErrorToast) {
          toast({
            title: "Error",
            description: options.errorMessage || errorMessage,
            variant: "destructive",
          })
        }

        options?.onError?.(err)
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [toast],
  )

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setIsLoading(false)
  }, [])

  return {
    data,
    isLoading,
    error,
    execute,
    reset,
  }
}

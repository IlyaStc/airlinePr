"use client"

import { useState, useEffect, useCallback } from "react"
import { useToast } from "@/components/ui/use-toast"

interface UseApiCallOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: any) => void
  initialData?: T
  deps?: any[]
  showSuccessToast?: boolean
  showErrorToast?: boolean
  successMessage?: string
  errorMessage?: string
  skipInitialCall?: boolean
}

export function useApiCall<T>(apiFunction: () => Promise<T>, options: UseApiCallOptions<T> = {}) {
  const [data, setData] = useState<T | undefined>(options.initialData)
  const [isLoading, setIsLoading] = useState(!options.skipInitialCall)
  const [error, setError] = useState<any>(null)
  const { toast } = useToast()

  const execute = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await apiFunction()
      setData(result)

      if (options.showSuccessToast) {
        toast({
          title: "Success",
          description: options.successMessage || "Operation completed successfully",
          variant: "default",
        })
      }

      options.onSuccess?.(result)
      return result
    } catch (err) {
      const errorMessage = "An unexpected error occurred"
      setError(err)

      if (options.showErrorToast) {
        toast({
          title: "Error",
          description: options.errorMessage || errorMessage,
          variant: "destructive",
        })
      }

      options.onError?.(err)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [apiFunction, options, toast])

  useEffect(() => {
    if (!options.skipInitialCall) {
      execute()
    }
  }, options.deps || [])

  return {
    data,
    isLoading,
    error,
    execute,
    refresh: execute,
  }
}

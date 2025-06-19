import type React from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import { isApiError } from "@/lib/api/error-handler"
import { AlertCircle, CheckCircle, XCircle } from "lucide-react"

interface ApiStatusProps {
  isLoading: boolean
  error: any
  loadingMessage?: string
  errorTitle?: string
  children?: React.ReactNode
}

export function ApiStatus({
  isLoading,
  error,
  loadingMessage = "Loading...",
  errorTitle = "Error",
  children,
}: ApiStatusProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Spinner className="mr-2" />
        <span>{loadingMessage}</span>
      </div>
    )
  }

  if (error) {
    const errorMessage = isApiError(error) ? error.message : "An unexpected error occurred"

    return (
      <Alert variant="destructive">
        <XCircle className="h-4 w-4" />
        <AlertTitle>{errorTitle}</AlertTitle>
        <AlertDescription>{errorMessage}</AlertDescription>
      </Alert>
    )
  }

  return <>{children}</>
}

export function ApiSuccess({
  children,
  title = "Success",
  message,
}: { children?: React.ReactNode; title?: string; message?: string }) {
  return (
    <Alert variant="default" className="bg-green-50 border-green-200">
      <CheckCircle className="h-4 w-4 text-green-600" />
      <AlertTitle className="text-green-800">{title}</AlertTitle>
      {message && <AlertDescription className="text-green-700">{message}</AlertDescription>}
      {children}
    </Alert>
  )
}

export function ApiError({ title = "Error", message }: { title?: string; message: string }) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}

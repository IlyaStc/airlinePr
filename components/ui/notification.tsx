"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export type NotificationType = "success" | "error" | "warning" | "info"

interface NotificationProps {
  type: NotificationType
  title: string
  message: string
  duration?: number
  onClose: () => void
}

const icons = {
  success: <CheckCircle className="h-5 w-5" />,
  error: <AlertCircle className="h-5 w-5" />,
  warning: <AlertTriangle className="h-5 w-5" />,
  info: <Info className="h-5 w-5" />,
}

const colors = {
  success: "bg-green-50 text-green-800 border-green-200",
  error: "bg-red-50 text-red-800 border-red-200",
  warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
  info: "bg-blue-50 text-blue-800 border-blue-200",
}

const iconColors = {
  success: "text-green-500",
  error: "text-red-500",
  warning: "text-yellow-500",
  info: "text-blue-500",
}

export function Notification({ type, title, message, duration = 5000, onClose }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div
      className={cn(
        "fixed right-4 top-4 z-50 w-full max-w-sm rounded-lg border p-4 shadow-lg transition-all duration-300",
        colors[type],
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
      )}
    >
      <div className="flex items-start">
        <div className={cn("mr-3 flex-shrink-0", iconColors[type])}>{icons[type]}</div>
        <div className="flex-1">
          <h3 className="mb-1 font-medium">{title}</h3>
          <p className="text-sm">{message}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false)
            setTimeout(onClose, 300)
          }}
          className="ml-4 flex-shrink-0 rounded-full p-1 hover:bg-black/5"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

interface NotificationContextProps {
  notifications: Array<{
    id: string
    type: NotificationType
    title: string
    message: string
    duration?: number
  }>
  showNotification: (type: NotificationType, title: string, message: string, duration?: number) => void
  removeNotification: (id: string) => void
}

export function NotificationContainer() {
  const [notifications, setNotifications] = useState<
    Array<{
      id: string
      type: NotificationType
      title: string
      message: string
      duration?: number
    }>
  >([])

  const showNotification = (type: NotificationType, title: string, message: string, duration?: number) => {
    const id = Math.random().toString(36).substring(2, 9)
    setNotifications((prev) => [...prev, { id, type, title, message, duration }])
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

 
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.showNotification = showNotification
    }

    return () => {
      if (typeof window !== "undefined") {
        delete window.showNotification
      }
    }
  }, [])

  if (typeof document === "undefined") return null

  return createPortal(
    <div className="fixed right-4 top-4 z-50 flex flex-col gap-4">
      {notifications.map((notification, index) => (
        <Notification
          key={notification.id}
          type={notification.type}
          title={notification.title}
          message={notification.message}
          duration={notification.duration}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>,
    document.body,
  )
}

export function NotificationProvider() {
  const { toast } = useToast()

  useEffect(() => {
   
    window.showNotification = (type, title, description) => {
      toast({
        title,
        description,
        variant: type === "error" ? "destructive" : "default",
      })
    }

   
    return () => {
      delete window.showNotification
    }
  }, [toast])

  return null
}

declare global {
  interface Window {
    showNotification?: (type: "success" | "error" | "warning" | "info", title: string, description?: string) => void
  }
}

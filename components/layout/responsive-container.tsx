import type { ReactNode } from "react"

type ResponsiveContainerProps = {
  children: ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export function ResponsiveContainer({ children, className = "", as: Component = "div" }: ResponsiveContainerProps) {
  return <Component className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</Component>
}

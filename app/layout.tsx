import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SkyWings Airlines | Book Flights, Check Status, & Explore Destinations",
  description:
    "Book flights to destinations worldwide with SkyWings Airlines. Enjoy seamless travel planning, real-time flight status updates, and exclusive offers.",
  keywords: "airline, book flights, flight status, cheap flights, air travel, SkyWings",
  openGraph: {
    title: "SkyWings Airlines | Book Flights & Explore Destinations",
    description:
      "Book flights to destinations worldwide with SkyWings Airlines. Enjoy seamless travel planning, real-time flight status updates, and exclusive offers.",
    type: "website",
    locale: "en_US",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

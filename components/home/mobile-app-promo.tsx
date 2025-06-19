import Image from "next/image"
import { Button } from "@/components/ui/button"

export function MobileAppPromo() {
  return (
    <section className="bg-primary text-primary-foreground py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Download Our Mobile App</h2>
            <p className="mt-4 text-primary-foreground/90">
              Book flights, check in, access boarding passes, and get real-time updates on the go
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button variant="secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-5 w-5"
                >
                  <path d="M12 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5" />
                  <path d="M16 3v4" />
                  <path d="M8 3v4" />
                  <path d="M3 11h18" />
                  <path d="M18 16.5a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0-5 0Z" />
                  <path d="M20.5 19v1.5" />
                  <path d="M20.5 14v1.5" />
                  <path d="M22 16.5h-1.5" />
                  <path d="M19 16.5h-1.5" />
                </svg>
                App Store
              </Button>
              <Button variant="secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-5 w-5"
                >
                  <path d="M3 9h.01M21 9h.01M3 15h.01M21 15h.01M3 21h18" />
                  <path d="m9 3 3 9-3 9 9-9Z" />
                </svg>
                Google Play
              </Button>
            </div>
          </div>
          <div className="relative h-72 w-full max-w-sm md:h-80">
            <Image src="/placeholder.svg?height=600&width=300" alt="Mobile App" fill className="object-contain" />
          </div>
        </div>
      </div>
    </section>
  )
}

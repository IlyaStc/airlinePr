import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { buildUrl, ROUTES } from "@/lib/navigation"

interface BookingBreadcrumbsProps {
  currentStep: "search" | "details" | "seats" | "payment" | "confirmation"
  flightId?: number
  departureDate?: string
  passengers?: number
  fare?: string
}

export function BookingBreadcrumbs({
  currentStep,
  flightId,
  departureDate,
  passengers,
  fare,
}: BookingBreadcrumbsProps) {
  const steps = [
    { id: "search", label: "Search", route: ROUTES.SEARCH_RESULTS },
    {
      id: "details",
      label: "Flight Details",
      route: flightId
        ? buildUrl(ROUTES.FLIGHT_DETAILS(flightId), { date: departureDate, passengers: passengers?.toString() })
        : "#",
    },
    {
      id: "seats",
      label: "Seat Selection",
      route: flightId
        ? buildUrl(ROUTES.SEAT_SELECTION, {
            flightId,
            date: departureDate,
            passengers: passengers?.toString(),
          })
        : "#",
    },
    {
      id: "payment",
      label: "Payment",
      route: flightId
        ? buildUrl(ROUTES.PAYMENT, {
            flightId,
            date: departureDate,
            passengers: passengers?.toString(),
            fare,
          })
        : "#",
    },
    { id: "confirmation", label: "Confirmation", route: "#" },
  ]

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep)

  return (
    <nav className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep
          const isPast = index < currentStepIndex
          const isClickable = isPast && step.route !== "#"

          return (
            <li key={step.id} className="flex items-center">
              {index > 0 && <ChevronRight className="mx-1 h-4 w-4 text-muted-foreground" />}
              {isClickable ? (
                <Link
                  href={step.route}
                  className={`rounded-md px-2 py-1 ${
                    isPast ? "text-primary hover:underline" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </Link>
              ) : (
                <span
                  className={`rounded-md px-2 py-1 ${
                    isActive
                      ? "bg-primary/10 font-medium text-primary"
                      : isPast
                        ? "text-primary"
                        : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

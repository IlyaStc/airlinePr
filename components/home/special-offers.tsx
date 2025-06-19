
import { ArrowRight, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function SpecialOffers() {
  const offers = [
    {
      id: 1,
      title: "Early Bird Summer Sale",
      description: "Book now and get up to 30% off on summer flights to Europe",
      discount: "30% OFF",
      image: "/placeholder.svg?height=300&width=400",
      label: "Limited Time",
      expiry: "May 31, 2025",
      code: "SUMMER30",
    },
    {
      id: 2,
      title: "Family Package Deal",
      description: "Special rates for family bookings with extra baggage allowance",
      discount: "20% OFF",
      image: "/placeholder.svg?height=300&width=400",
      label: "Family",
      expiry: "June 15, 2025",
      code: "FAMILY20",
    },
    {
      id: 3,
      title: "Business Class Upgrade",
      description: "Upgrade to Business Class for just a small fee on select routes",
      discount: "UPGRADE",
      image: "/placeholder.svg?height=300&width=400",
      label: "Premium",
      expiry: "July 1, 2025",
      code: "UPGRADE50",
    },
  ]

  return (
    <section className="py-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Special Offers</h2>
          <p className="mt-1 text-muted-foreground">Exclusive deals for your next journey</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="#">
            View all offers
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="relative overflow-hidden rounded-xl border bg-card transition-all hover:shadow-md"
          >
            <div className="absolute right-0 top-0 z-10 rounded-bl-lg bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
              {offer.label}
            </div>
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src={offer.image || "/placeholder.svg"}
                alt={offer.title}
                className="h-full w-full object-cover object-center transition-transform hover:scale-105"
              />
            </div>
            <div className="p-5">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold">{offer.title}</h3>
                <div className="rounded bg-primary/10 px-2 py-1 text-xs font-bold text-primary">{offer.discount}</div>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">{offer.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Tag className="h-3.5 w-3.5" />
                  <span>Use code: </span>
                  <code className="rounded bg-muted px-1 font-mono text-foreground">{offer.code}</code>
                </div>
                <div className="text-xs text-muted-foreground">Expires {offer.expiry}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

import { CalendarIcon, MapPin, PlaneTakeoff, Users } from "lucide-react"

export function WhyFlyWithUs() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Fly With Us</h2>
          <p className="mt-4 text-lg text-muted-foreground">Experience the difference with SkyWings</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Award-Winning Service",
              description: "Voted Best Airline in North America for 5 consecutive years",
              icon: <PlaneTakeoff className="h-10 w-10 text-primary" />,
            },
            {
              title: "Global Network",
              description: "Fly to over 150 destinations across 6 continents",
              icon: <MapPin className="h-10 w-10 text-primary" />,
            },
            {
              title: "Flexible Bookings",
              description: "Change your flight with no fees up to 24 hours before departure",
              icon: <CalendarIcon className="h-10 w-10 text-primary" />,
            },
            {
              title: "Premium Experience",
              description: "Enjoy spacious seating, gourmet meals, and world-class entertainment",
              icon: <Users className="h-10 w-10 text-primary" />,
            },
          ].map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

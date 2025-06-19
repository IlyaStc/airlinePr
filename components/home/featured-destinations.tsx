import { Button } from "@/components/ui/button"
import { DestinationCard } from "@/components/home/destination-card"
import { observer } from "mobx-react-lite"
import { useStore } from "@/stores/root-store"

export const FeaturedDestinations = observer(() => {
  const { flightStore } = useStore()

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Destinations</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore our most popular destinations with special offers
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {flightStore.popularDestinations.map((destination, index) => (
            <DestinationCard
              key={index}
              city={destination.city}
              country={destination.country}
              price={destination.price}
              image={destination.image}
            />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  )
})

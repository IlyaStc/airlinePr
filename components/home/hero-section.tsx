import Image from "next/image"
import { SearchTabs } from "@/components/home/search-tabs"

export function HeroSection() {
  return (
    <section className="relative">
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=800&width=1920"
          alt="Airplane in sky"
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>
      <div className="container relative z-10 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Discover the World with SkyWings
          </h1>
          <p className="mt-6 text-lg md:text-xl">Fly to over 150 destinations worldwide with award-winning service</p>
        </div>
        <div className="mx-auto mt-10 max-w-4xl rounded-xl bg-white p-4 shadow-lg">
          <SearchTabs />
        </div>
      </div>
    </section>
  )
}

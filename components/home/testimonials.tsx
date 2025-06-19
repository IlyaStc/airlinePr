import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarIcon } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Frequent Traveler",
      content:
        "SkyWings has transformed my travel experience. The booking process is seamless, and their customer service is exceptional. I won't fly with any other airline!",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Business Traveler",
      content:
        "As someone who flies weekly for business, I appreciate the reliability and comfort that SkyWings provides. Their loyalty program is also the best in the industry.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Family Traveler",
      content:
        "Traveling with kids can be stressful, but SkyWings makes it easy. Their family-friendly services and accommodating staff have made our vacations much more enjoyable.",
      rating: 4,
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Our Customers Say</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Hear from travelers who have experienced the SkyWings difference
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="flex h-full flex-col justify-between p-6">
                <div className="mb-4">
                  <div className="flex mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="italic">{testimonial.content}</p>
                </div>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

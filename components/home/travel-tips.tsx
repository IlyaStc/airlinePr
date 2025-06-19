"use client"

import { LightbulbIcon, TrendingUp, Clock, BadgeCheck } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function TravelTips() {
  const tips = [
    {
      id: 1,
      title: "Book on Tuesdays for Better Deals",
      description: "Statistics show that booking flights on Tuesdays can save you up to 15% on your ticket prices.",
      icon: <TrendingUp className="h-5 w-5" />,
      tag: "Savings",
    },
    {
      id: 2,
      title: "Arrive 3 Hours Before International Flights",
      description: "For a stress-free travel experience, arrive early to complete all security procedures.",
      icon: <Clock className="h-5 w-5" />,
      tag: "Time Management",
    },
    {
      id: 3,
      title: "Join Our Loyalty Program",
      description: "Members earn points on every flight and enjoy exclusive benefits like priority boarding.",
      icon: <BadgeCheck className="h-5 w-5" />,
      tag: "Rewards",
    },
  ]

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-12">
      <div className="container">
        <div className="mb-8 flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Travel Smart</h2>
            <p className="text-muted-foreground">Expert tips to enhance your journey with SkyWings</p>
          </div>
          <div className="flex items-center gap-2 text-primary">
            <LightbulbIcon className="h-5 w-5" />
            <span className="font-medium">Travel Tips</span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {tips.map((tip) => (
            <Card key={tip.id} className="flex h-full flex-col border-none shadow-md transition-all hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    {tip.tag}
                  </Badge>
                  <div className="rounded-full bg-primary/10 p-1.5 text-primary">{tip.icon}</div>
                </div>
                <CardTitle className="mt-3 text-xl">{tip.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-0 text-muted-foreground">{tip.description}</CardContent>
              <CardFooter className="mt-auto pt-4">
                <Button variant="ghost" size="sm" className="text-primary">
                  Learn more
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button asChild variant="outline">
            <Link href="#">View all travel tips</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

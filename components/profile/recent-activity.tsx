"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentActivity() {
  const activities = [
    {
      type: "Points Earned",
      description: "Flight SK456 from London to New York",
      date: "April 10, 2025",
      points: "+1,250",
    },
    {
      type: "Booking",
      description: "Flight SK123 from New York to London",
      date: "April 5, 2025",
      points: "",
    },
    {
      type: "Points Redeemed",
      description: "Upgrade to Business Class",
      date: "March 22, 2025",
      points: "-5,000",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your recent interactions with SkyWings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{activity.type}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.date}</p>
              </div>
              {activity.points && (
                <div className={`font-medium ${activity.points.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                  {activity.points}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

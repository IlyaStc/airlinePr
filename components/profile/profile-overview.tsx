"use client"

import { observer } from "mobx-react-lite"
import { RewardsCard } from "@/components/profile/rewards-card"
import { UpcomingTrips } from "@/components/profile/upcoming-trips"
import { RecentActivity } from "@/components/profile/recent-activity"

export const ProfileOverview = observer(() => {
  return (
    <div className="grid gap-6">
      <RewardsCard />
      <UpcomingTrips />
      <RecentActivity />
    </div>
  )
})

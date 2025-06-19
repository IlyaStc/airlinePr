"use client"

import { observer } from "mobx-react-lite"
import { useStore } from "@/stores/root-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane } from "lucide-react"

export const RewardsCard = observer(() => {
  const { userStore } = useStore()
  const user = userStore.user

  if (!user) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>SkyWings Rewards</CardTitle>
        <CardDescription>Your loyalty program status and points</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Tier</p>
                <p className="text-2xl font-bold">{user.tier}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Plane className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Member Since</p>
              <p className="font-medium">{user.memberSince}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Available Points</p>
              <p className="text-2xl font-bold">{user.loyaltyPoints.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Next Tier</p>
              <div className="mt-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{user.tier}</span>
                  <span>Silver</span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-muted">
                  <div className="h-2 w-1/4 rounded-full bg-primary"></div>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Earn {userStore.pointsToNextTier.toLocaleString()} more points to reach Silver status
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Button>View Rewards Catalog</Button>
        </div>
      </CardContent>
    </Card>
  )
})

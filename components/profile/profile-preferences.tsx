"use client"

import { observer } from "mobx-react-lite"
import { useStore } from "@/stores/root-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const ProfilePreferences = observer(() => {
  const { userStore } = useStore()
  const user = userStore.user

  if (!user) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Travel Preferences</CardTitle>
        <CardDescription>Customize your travel experience</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-lg font-medium">Personal Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-4">
              Edit Information
            </Button>
          </div>
          <Separator />
          <div>
            <h3 className="mb-2 text-lg font-medium">Communication Preferences</h3>
            <p className="text-sm text-muted-foreground">
              Manage how and when we contact you with updates and promotions
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive booking confirmations and updates</p>
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Marketing Communications</p>
                  <p className="text-sm text-muted-foreground">Receive special offers and promotions</p>
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="mb-2 text-lg font-medium">Travel Preferences</h3>
            <p className="text-sm text-muted-foreground">
              Set your preferences for a more personalized travel experience
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Seat Preference</p>
                  <p className="text-sm text-muted-foreground">Window</p>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Meal Preference</p>
                  <p className="text-sm text-muted-foreground">Regular</p>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Frequent Flyer Programs</p>
                  <p className="text-sm text-muted-foreground">Manage your linked loyalty programs</p>
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
})

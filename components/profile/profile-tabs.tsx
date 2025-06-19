"use client"

import { observer } from "mobx-react-lite"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileOverview } from "@/components/profile/profile-overview"
import { ProfileRewards } from "@/components/profile/profile-rewards"
import { ProfilePreferences } from "@/components/profile/profile-preferences"

export const ProfileTabs = observer(() => {
  return (
    <Tabs defaultValue="overview">
      <TabsList className="mb-6 grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="rewards">Rewards</TabsTrigger>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <ProfileOverview />
      </TabsContent>
      <TabsContent value="rewards">
        <ProfileRewards />
      </TabsContent>
      <TabsContent value="preferences">
        <ProfilePreferences />
      </TabsContent>
    </Tabs>
  )
})

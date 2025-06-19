"use client"

import { useSearchParams } from "next/navigation"
import { observer } from "mobx-react-lite"
import { ProtectedRoute } from "@/components/protected-route"
import { PageContainer } from "@/components/layout/page-container"
import { ProfileSidebar } from "@/components/profile/profile-sidebar"
import { ProfileTabs } from "@/components/profile/profile-tabs"
import { BookingHistory } from "@/components/profile/booking-history"
import { PaymentMethods } from "@/components/profile/payment-methods"
import { ProfilePreferences } from "@/components/profile/profile-preferences"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"

function ProfilePage() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")
  const [activeTab, setActiveTab] = useState("overview")

 
  useEffect(() => {
    if (tabParam && ["overview", "bookings", "payment", "preferences"].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [tabParam])

  return (
    <ProtectedRoute>
      <PageContainer title="My Profile" description="Manage your account and view your travel history">
        <div className="grid gap-8 md:grid-cols-4">
          <ProfileSidebar activeTab={activeTab} />
          <div className="md:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6 grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <ProfileTabs />
              </TabsContent>

              <TabsContent value="bookings">
                <BookingHistory />
              </TabsContent>

              <TabsContent value="payment">
                <PaymentMethods />
              </TabsContent>

              <TabsContent value="preferences">
                <ProfilePreferences />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </PageContainer>
    </ProtectedRoute>
  )
}

export default observer(ProfilePage)

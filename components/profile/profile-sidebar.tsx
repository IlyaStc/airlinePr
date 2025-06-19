"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { User, CreditCard, Ticket, Settings, LogOut } from "lucide-react"
import { useStore } from "@/stores/root-store"
import { buildUrl, ROUTES } from "@/lib/navigation"

interface ProfileSidebarProps {
  activeTab?: string
}

export function ProfileSidebar({ activeTab = "overview" }: ProfileSidebarProps) {
  const router = useRouter()
  const { userStore } = useStore()
  const user = userStore.user

  const handleSignOut = () => {
    userStore.signOut()
    router.push(ROUTES.HOME)
  }

  if (!user) return null

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-20 w-20">
              <AvatarImage  alt={user.name} />
              <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <nav className="flex flex-col">
            <Link
              href={buildUrl(ROUTES.PROFILE, { tab: "overview" })}
              className={`flex items-center gap-2 border-l-2 px-6 py-3 ${
                activeTab === "overview" ? "border-primary font-medium" : "border-transparent"
              }`}
            >
              <User className="h-4 w-4" />
              <span>Overview</span>
            </Link>
            <Link
              href={buildUrl(ROUTES.PROFILE, { tab: "bookings" })}
              className={`flex items-center gap-2 border-l-2 px-6 py-3 ${
                activeTab === "bookings" ? "border-primary font-medium" : "border-transparent"
              }`}
            >
              <Ticket className="h-4 w-4" />
              <span>My Bookings</span>
            </Link>
            <Link
              href={buildUrl(ROUTES.PROFILE, { tab: "payment" })}
              className={`flex items-center gap-2 border-l-2 px-6 py-3 ${
                activeTab === "payment" ? "border-primary font-medium" : "border-transparent"
              }`}
            >
              <CreditCard className="h-4 w-4" />
              <span>Payment Methods</span>
            </Link>
            <Link
              href={buildUrl(ROUTES.PROFILE, { tab: "preferences" })}
              className={`flex items-center gap-2 border-l-2 px-6 py-3 ${
                activeTab === "preferences" ? "border-primary font-medium" : "border-transparent"
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>Preferences</span>
            </Link>
            <Separator />
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 border-l-2 border-transparent px-6 py-3 text-left text-red-500 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </nav>
        </CardContent>
      </Card>
    </div>
  )
}

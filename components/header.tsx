"use client"

import Link from "next/link"
import { observer } from "mobx-react-lite"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plane, Menu, User, LogIn, LogOut, CreditCard, Ticket } from "lucide-react"
import { ROUTES } from "@/lib/navigation"

export const Header = observer(() => {
  const { user, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href={ROUTES.HOME} className="flex items-center gap-2">
            <Plane className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">SkyWings</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link
              href={ROUTES.BOOK}
              className={`text-sm font-medium transition-colors hover:text-foreground ${
                typeof window !== "undefined" && window.location.pathname === ROUTES.BOOK
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Book
            </Link>
            <Link
              href={ROUTES.CHECK_IN}
              className={`text-sm font-medium transition-colors hover:text-foreground ${
                typeof window !== "undefined" && window.location.pathname === ROUTES.CHECK_IN
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Check-in
            </Link>
            <Link
              href={ROUTES.FLIGHT_STATUS}
              className={`text-sm font-medium transition-colors hover:text-foreground ${
                typeof window !== "undefined" && window.location.pathname === ROUTES.FLIGHT_STATUS
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Flight Status
            </Link>
            <Link
              href={ROUTES.MANAGE_BOOKING}
              className={`text-sm font-medium transition-colors hover:text-foreground ${
                typeof window !== "undefined" && window.location.pathname === ROUTES.MANAGE_BOOKING
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Manage Booking
            </Link>
            <Link
              href={ROUTES.DESTINATIONS}
              className={`text-sm font-medium transition-colors hover:text-foreground ${
                typeof window !== "undefined" && window.location.pathname === ROUTES.DESTINATIONS
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Destinations
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={ROUTES.PROFILE} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`${ROUTES.PROFILE}?tab=bookings`} className="cursor-pointer">
                    <Ticket className="mr-2 h-4 w-4" />
                    <span>My Bookings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`${ROUTES.PROFILE}?tab=payment`} className="cursor-pointer">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Payment Methods</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="sm" asChild>
              <Link href={ROUTES.SIGN_IN}>
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Link>
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={ROUTES.BOOK}>Book</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={ROUTES.CHECK_IN}>Check-in</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={ROUTES.FLIGHT_STATUS}>Flight Status</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={ROUTES.MANAGE_BOOKING}>Manage Booking</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={ROUTES.DESTINATIONS}>Destinations</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
})

import { PageContainer } from "@/components/layout/page-container"
import { CheckInForm } from "@/components/check-in/check-in-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CheckInPage() {
  return (
    <PageContainer title="Online Check-in" description="Check in for your flight and get your boarding pass">
      <div className="mx-auto max-w-3xl">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Online Check-in</CardTitle>
            <CardDescription>
              Check in for your flight 24-48 hours before departure to select your seat and get your boarding pass
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="reference">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="reference">Booking Reference</TabsTrigger>
                <TabsTrigger value="ticket">E-Ticket Number</TabsTrigger>
              </TabsList>
              <TabsContent value="reference" className="mt-6">
                <CheckInForm />
              </TabsContent>
              <TabsContent value="ticket" className="mt-6">
                <div className="mx-auto max-w-md">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">E-Ticket Number</label>
                      <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="e.g., 012-3456789012"
                      />
                      <p className="text-xs text-muted-foreground">
                        Your 13-digit e-ticket number can be found on your e-ticket receipt
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">Last Name</label>
                      <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Last name of the passenger"
                      />
                    </div>
                    <button className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                      Check In
                    </button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Check-in Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>Online check-in opens 48 hours before departure</li>
                <li>Online check-in closes 90 minutes before departure</li>
                <li>You can check in for up to 9 passengers on the same booking</li>
                <li>Print your boarding pass or save it to your mobile device</li>
                <li>Arrive at the airport at least 2 hours before your flight</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                If you're having trouble checking in online, our customer service team is here to help.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span className="font-medium">+1 (800) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span className="font-medium">support@skywings.com</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  )
}

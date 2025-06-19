import { ROUTES } from "@/lib/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        {/* <div className="mb-8 flex items-center">
          <Link href={ROUTES.HOME} className="flex items-center text-muted-foreground hover:text-foreground">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div> */}
    <div className="h-screen flex items-center justify-center">
          {children}
    </div>
    </div>
  )
}
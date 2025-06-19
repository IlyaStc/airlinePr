"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Plus, Trash2 } from "lucide-react"

export function PaymentMethods() {
  const [cards, setCards] = useState([
    {
      id: "1",
      type: "Visa",
      last4: "4242",
      expiry: "05/26",
      name: "John Doe",
      isDefault: true,
    },
    {
      id: "2",
      type: "Mastercard",
      last4: "5555",
      expiry: "08/25",
      name: "John Doe",
      isDefault: false,
    },
  ])

  const [open, setOpen] = useState(false)

  const handleDelete = (id: number) => {
    setCards(cards.filter((card) => card.id !== id))
  }

  const handleSetDefault = (id: number) => {
    setCards(
      cards.map((card) => ({
        ...card,
        isDefault: card.id === id,
      })),
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>Manage your saved payment methods</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cards.map((card) => (
            <div key={card.id} className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">
                    {card.type} •••• {card.last4}
                    {card.isDefault && <span className="ml-2 text-xs text-primary">Default</span>}
                  </p>
                  <p className="text-sm text-muted-foreground">Expires {card.expiry}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {!card.isDefault && (
                  <Button variant="outline" size="sm" onClick={() => handleSetDefault(card.id)}>
                    Set Default
                  </Button>
                )}
                <Button variant="outline" size="icon" onClick={() => handleDelete(card.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="mt-6 w-full" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Payment Method</DialogTitle>
              <DialogDescription>Add a new credit or debit card to your account</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Cardholder Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="number">Card Number</Label>
                <Input id="number" placeholder="4242 4242 4242 4242" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="default" className="h-4 w-4 rounded border-gray-300" />
                <Label htmlFor="default">Set as default payment method</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Save Card</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

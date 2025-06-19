"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Calendar, Lock, User } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

interface PaymentFormProps {
  onSubmit: (paymentData: PaymentFormData) => Promise<void>
  isProcessing?: boolean
  totalAmount: number
}

export interface PaymentFormData {
  paymentMethod: string
  cardNumber?: string
  cardholderName?: string
  expiryDate?: string
  cvv?: string
  saveCard?: boolean
  billingCountry?: string
  billingZip?: string
}

export function PaymentForm({ onSubmit, isProcessing = false, totalAmount }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [formData, setFormData] = useState<PaymentFormData>({
    paymentMethod: "credit-card",
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
    saveCard: false,
    billingCountry: "us",
    billingZip: "",
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit({ ...formData, paymentMethod })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="credit-card"
            onValueChange={(value) => {
              setPaymentMethod(value)
              handleInputChange("paymentMethod", value)
            }}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
              <TabsTrigger value="paypal">PayPal</TabsTrigger>
              <TabsTrigger value="apple-pay">Apple Pay</TabsTrigger>
            </TabsList>
            <TabsContent value="credit-card" className="mt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="cardNumber"
                      className="pl-8"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardholderName">Cardholder Name</Label>
                  <div className="relative">
                    <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="cardholderName"
                      className="pl-8"
                      placeholder="Name as it appears on card"
                      value={formData.cardholderName}
                      onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="expiryDate"
                        className="pl-8"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <div className="relative">
                      <Lock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="cvv"
                        className="pl-8"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange("cvv", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="saveCard"
                    checked={formData.saveCard}
                    onCheckedChange={(checked) => handleInputChange("saveCard", checked as boolean)}
                  />
                  <Label htmlFor="saveCard">Save this card for future bookings</Label>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="paypal" className="mt-6">
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
                <div className="mb-4 text-center">
                  <p className="text-lg font-medium">Continue to PayPal</p>
                  <p className="text-sm text-muted-foreground">
                    You will be redirected to PayPal to complete your payment
                  </p>
                </div>
                <Button type="button" className="w-full max-w-xs">
                  Continue with PayPal
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="apple-pay" className="mt-6">
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
                <div className="mb-4 text-center">
                  <p className="text-lg font-medium">Pay with Apple Pay</p>
                  <p className="text-sm text-muted-foreground">Complete your purchase with Apple Pay</p>
                </div>
                <Button type="button" className="w-full max-w-xs bg-black text-white hover:bg-black/90">
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
                    className="mr-2"
                  >
                    <path d="M9 7V2.5" />
                    <path d="M15 7V2.5" />
                    <path d="M12 22v-6" />
                    <path d="M5 18c0-3 2-5 7-5s7 2 7 5v4H5z" />
                    <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
                  </svg>
                  Pay
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Billing Address</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="country">Country/Region</Label>
              <Select defaultValue="us" onValueChange={(value) => handleInputChange("billingCountry", value)}>
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP/Postal Code</Label>
              <Input
                id="zipCode"
                placeholder="ZIP/Postal code"
                value={formData.billingZip}
                onChange={(e) => handleInputChange("billingZip", e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={isProcessing}>
          {isProcessing ? (
            <>
              <Spinner size="sm" className="mr-2" />
              Processing...
            </>
          ) : (
            `Pay $${totalAmount}`
          )}
        </Button>
      </div>
    </form>
  )
}

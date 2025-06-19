"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
   
    setIsSubmitted(true)
  }

  return (
    <section className="bg-primary/5 py-16">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-primary/10 p-3">
              <Mail className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Stay Updated with SkyWings</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Subscribe to our newsletter for exclusive deals, travel tips, and the latest SkyWings news
          </p>
          {isSubmitted ? (
            <div className="mt-8 rounded-lg bg-green-50 p-4 text-green-800">
              <p className="font-medium">Thank you for subscribing!</p>
              <p className="mt-1">Keep an eye on your inbox for exclusive deals and updates.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="flex flex-col gap-4 sm:flex-row">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" className="sm:w-auto">
                  Subscribe
                </Button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                By subscribing, you agree to receive marketing emails from SkyWings. You can unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

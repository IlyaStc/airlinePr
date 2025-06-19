"use client"
import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/layout/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqs = {
    booking: [
      {
        question: "How do I book a flight?",
        answer:
          "You can book a flight on our website by using the search form on the homepage. Enter your departure and arrival cities, dates, and number of passengers, then click 'Search Flights'. Select your preferred flight from the results and follow the steps to complete your booking.",
      },
      {
        question: "Can I book a flight for someone else?",
        answer:
          "Yes, you can book a flight for someone else. During the booking process, you'll be asked to enter passenger details. Simply enter the other person's information. Make sure the name matches exactly as it appears on theirIdor passport.",
      },
      {
        question: "How far in advance can I book a flight?",
        answer:
          "You can book flights up to 11 months in advance. We recommend booking early for the best prices and availability, especially during peak travel seasons.",
      },
      {
        question: "Can I hold a reservation without paying?",
        answer:
          "We don't offer reservation holds. To confirm your booking, full payment is required at the time of booking.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay.",
      },
    ],
    changes: [
      {
        question: "How do I change my flight?",
        answer:
          "You can change your flight by going to 'Manage Booking' on our website. Enter your booking reference and last name, then select 'Change Flight'. Follow the instructions to select a new flight. Please note that fare differences and change fees may apply depending on your fare type.",
      },
      {
        question: "What is your cancellation policy?",
        answer:
          "Our cancellation policy varies depending on the fare type you purchased. Economy Light fares are non-refundable, Economy Standard fares can be cancelled for a fee, and Economy Flex fares can be cancelled with a full refund. You can view the specific policy for your booking in the 'Manage Booking' section.",
      },
      {
        question: "Can I change the name on my booking?",
        answer:
          "Minor corrections to the spelling of a name can be made free of charge. However, changing to a different passenger is not permitted for security reasons. Please contact our customer service for name corrections.",
      },
      {
        question: "What happens if my flight is cancelled by the airline?",
        answer:
          "If your flight is cancelled by us, you will be notified as soon as possible. You will be offered a full refund or rebooking on the next available flight. In some cases, you may also be entitled to compensation according to applicable regulations.",
      },
      {
        question: "How do I request a refund?",
        answer:
          "To request a refund, go to 'Manage Booking' on our website, select your booking, and choose the 'Request Refund' option. Follow the instructions to complete your request. Refund eligibility depends on your fare type and the timing of your request.",
      },
    ],
    checkin: [
      {
        question: "When can I check in for my flight?",
        answer:
          "Online check-in opens 24 hours before your scheduled departure time and closes 1 hour before departure for domestic flights and 2 hours for international flights.",
      },
      {
        question: "How do I check in online?",
        answer:
          "You can check in online through our website or mobile app. Go to the 'Check-in' section, enter your booking reference and last name, then follow the instructions to complete check-in and get your boarding pass.",
      },
      {
        question: "Can I check in at the airport?",
        answer:
          "Yes, you can check in at the airport. Airport check-in counters typically open 3 hours before departure and close 1 hour before departure for domestic flights and 2 hours for international flights.",
      },
      {
        question: "Do I need to print my boarding pass?",
        answer:
          "No, you don't need to print your boarding pass. You can use a mobile boarding pass on your smartphone. However, if you prefer a paper boarding pass, you can print it after online check-in or get one at the airport.",
      },
      {
        question: "What documents do I need for check-in?",
        answer:
          "For domestic flights, you need a government-issued photo ID. For international flights, you need a valid passport (and visa if required for your destination). Additional travel documents may be required depending on your destination.",
      },
    ],
    baggage: [
      {
        question: "What is the baggage allowance?",
        answer:
          "Baggage allowance varies by fare type. Economy Light includes only a personal item, Economy Standard includes a personal item, carry-on, and one checked bag, and Economy Flex includes a personal item, carry-on, and two checked bags. Additional baggage can be purchased.",
      },
      {
        question: "What are the size and weight limits for baggage?",
        answer:
          "Personal items must fit under the seat (max. 18 x 14 x 8 inches). Carry-on bags must fit in the overhead bin (max. 22 x 14 x 9 inches, 10 kg). Checked bags must not exceed 62 linear inches (length + width + height) and 23 kg (50 lbs).",
      },
      {
        question: "How do I add extra baggage?",
        answer:
          "You can add extra baggage through the 'Manage Booking' section on our website or during online check-in. Additional baggage fees start at $60 per bag and are lower when purchased in advance.",
      },
    ],
  }

  return (
    <div>
      <Header />
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Help & FAQs</h1>
        <Tabs defaultValue="booking">
          <TabsList className="mb-4">
            <TabsTrigger value="booking">Booking</TabsTrigger>
            <TabsTrigger value="changes">Changes & Cancellations</TabsTrigger>
            <TabsTrigger value="checkin">Check-in</TabsTrigger>
            <TabsTrigger value="baggage">Baggage</TabsTrigger>
          </TabsList>
          <TabsContent value="booking">
            <Accordion type="single" defaultValue="item-1" className="space-y-4">
              {faqs.booking.map((faq, index) => (
                <AccordionItem value={`item-${index + 1}`} key={index}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
          <TabsContent value="changes">
            <Accordion type="single" defaultValue="item-1" className="space-y-4">
              {faqs.changes.map((faq, index) => (
                <AccordionItem value={`item-${index + 1}`} key={index}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
          <TabsContent value="checkin">
            <Accordion type="single" defaultValue="item-1" className="space-y-4">
              {faqs.checkin.map((faq, index) => (
                <AccordionItem value={`item-${index + 1}`} key={index}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
          <TabsContent value="baggage">
            <Accordion type="single" defaultValue="item-1" className="space-y-4">
              {faqs.baggage.map((faq, index) => (
                <AccordionItem value={`item-${index + 1}`} key={index}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}

export default HelpPage

"use client"

import Navigation from "@/components/navigation"
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-gradient-to-r from-amber-800/30 to-orange-800/30 rounded-xl border border-amber-600/30 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-amber-700/20 transition-colors duration-200"
      >
        <h3 className="text-lg font-semibold text-amber-200">{question}</h3>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-orange-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-orange-400 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-amber-100 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  const faqs = [
    {
      question: "What is Diversion 2026?",
      answer:
        "Diversion 2026 is a unique technology convention that combines cutting-edge innovation with steampunk aesthetics. It's a three-day event featuring keynote speakers, workshops, exhibitions, and networking opportunities for tech enthusiasts, creators, and industry professionals.",
    },
    {
      question: "When and where is the event taking place?",
      answer:
        "Diversion 2026 will be held from March 15-17, 2026, at the Steampunk Convention Center located at 1234 Innovation Boulevard, Tech City, TC 12345. The venue is easily accessible by public transportation and offers ample parking.",
    },
    {
      question: "How much do tickets cost?",
      answer:
        "Early bird tickets start at $299 for a full 3-day pass. Student discounts (40% off) and group rates (15% off for 5+ people) are available. Premium packages with exclusive workshops and VIP networking events range from $599-$999.",
    },
    {
      question: "What should I wear to the event?",
      answer:
        "While steampunk attire is encouraged and adds to the atmosphere, it's not required. Comfortable business casual or smart casual clothing is perfectly appropriate. Many attendees enjoy incorporating steampunk accessories like goggles, gears, or brass elements.",
    },
    {
      question: "Are meals included with registration?",
      answer:
        "Continental breakfast and coffee breaks are included with all ticket types. Lunch is included with Premium and VIP packages. The venue also has multiple food courts and restaurants, plus we'll have food trucks with steampunk-themed cuisine.",
    },
    {
      question: "Can I get a refund if I can't attend?",
      answer:
        "Full refunds are available until February 1, 2026. Between February 1-28, we offer 50% refunds. After March 1, tickets are non-refundable but can be transferred to another person or used as credit for future events.",
    },
    {
      question: "Will sessions be recorded?",
      answer:
        "Select keynote presentations and main stage sessions will be recorded and made available to registered attendees within 48 hours. Workshop sessions are not recorded to maintain an interactive environment.",
    },
    {
      question: "Is there Wi-Fi available at the venue?",
      answer:
        "Yes, complimentary high-speed Wi-Fi is available throughout the venue. We also have dedicated bandwidth for presenters and workshop participants to ensure smooth streaming and downloads.",
    },
    {
      question: "Are there networking opportunities?",
      answer:
        "We have structured networking sessions, speed networking events, themed meetups, and social hours. Our mobile app also includes attendee matching to help you connect with people who share your interests.",
    },
    {
      question: "What COVID-19 safety measures are in place?",
      answer:
        "We follow all local health guidelines and recommendations. Hand sanitizing stations are available throughout the venue, and we maintain enhanced cleaning protocols. We'll update our safety measures as needed closer to the event date.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-neutral-800 to-zinc-900">
      <Navigation />

      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <HelpCircle className="h-12 w-12 text-orange-400 mr-4" />
              <h1 className="text-4xl md:text-6xl font-bold text-amber-200">FAQ</h1>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mb-8"></div>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto leading-relaxed">
              Find answers to the most commonly asked questions about Diversion 2026. Can&apos;t find what you&apos;re looking
              for? Contact our support team!
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16 bg-gradient-to-r from-orange-800/40 to-red-900/40 rounded-2xl p-8 border border-orange-600/30 text-center">
            <h2 className="text-2xl font-bold text-amber-200 mb-4">Still Have Questions?</h2>
            <p className="text-amber-100 mb-6">
              Our support team is here to help! Reach out to us and we&apos;ll get back to you within 24 hours.
            </p>
            <div className="space-x-4">
              <button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300">
                Contact Support
              </button>
              <button className="border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-amber-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300">
                Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

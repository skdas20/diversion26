"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamic imports for 3D components to avoid SSR issues
const LoadingScreen = dynamic(() => import("@/components/loading-screen"), { 
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-gradient-to-b from-amber-900/20 via-stone-900 to-zinc-900 flex items-center justify-center z-50">
      <div className="text-amber-400 text-2xl font-bold animate-pulse">Loading Diversion...</div>
    </div>
  )
})
const Hero3D = dynamic(() => import("@/components/hero-3d"), { ssr: false })
const AnimatedAbout = dynamic(() => import("@/components/animated-about"), { ssr: false })
const AnimatedAchievements = dynamic(() => import("@/components/animated-achievements"), { ssr: false })
const AnimatedSchedule = dynamic(() => import("@/components/animated-schedule"), { ssr: false })
const Contact = dynamic(() => import("@/components/contact"), { ssr: false })
const ChatBot = dynamic(() => import("@/components/chat-bot"), { ssr: false })

import Navigation from "@/components/navigation"

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsMounted(true)
    const timer = setTimeout(() => setIsLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  // Never reference LoadingScreen before mount!
  if (!isMounted) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-stone-900 via-neutral-800 to-zinc-900 flex items-center justify-center z-50">
        <div className="text-amber-400 text-2xl font-bold animate-pulse">Loading Diversion...</div>
      </div>
    )
  }

  if (isLoading) {
    // Now it's safe to render the 3D loading screen
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-neutral-800 to-zinc-900">
      <Navigation />

      {/* Hero Section with 3D Steampunk City */}
      <section id="hero" className="h-screen relative">
        <Hero3D />
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <AnimatedAbout />
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20">
        <AnimatedAchievements />
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-20">
        <AnimatedSchedule />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <Contact />
      </section>

      {/* ChatBot */}
      <ChatBot />
    </div>
  )
}

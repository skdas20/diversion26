"use client"

import { useState, useEffect } from "react"
import LoadingScreen from "@/components/loading-screen"
import Hero3D from "@/components/hero-3d"
import AnimatedAbout from "@/components/animated-about"
import AnimatedAchievements from "@/components/animated-achievements"
import AnimatedSchedule from "@/components/animated-schedule"
import Contact from "@/components/contact"
import Navigation from "@/components/navigation"
import ChatBot from "@/components/chat-bot"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
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

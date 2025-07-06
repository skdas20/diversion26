"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Cog, Zap, Wrench, Gauge } from "lucide-react"
import { useRef } from "react"

export default function AnimatedAbout() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const gearRotation = useTransform(scrollYProgress, [0, 1], [0, 360])

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="text-center mb-10 sm:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-bold text-amber-200 mb-4 sm:mb-6 break-words"
        >
          About Diversion 2026
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-16 sm:w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mb-6 sm:mb-8"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base xs:text-lg sm:text-xl text-amber-100 max-w-full sm:max-w-3xl mx-auto leading-relaxed px-1 sm:px-0"
        >
          Where Victorian ingenuity meets cutting-edge technology. Diversion 2026 is not just a convention—it's a
          journey through time and innovation, bringing together the greatest minds in technology, art, and design.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
        {[
          {
            icon: <Cog className="h-12 w-12" />,
            title: "Innovation Hub",
            description: "Discover groundbreaking technologies and revolutionary ideas that will shape tomorrow.",
          },
          {
            icon: <Zap className="h-12 w-12" />,
            title: "Electrifying Talks",
            description: "Inspiring presentations from industry leaders and visionary thinkers.",
          },
          {
            icon: <Wrench className="h-12 w-12" />,
            title: "Hands-on Workshops",
            description: "Interactive sessions where you can build, create, and experiment.",
          },
          {
            icon: <Gauge className="h-12 w-12" />,
            title: "Networking Engine",
            description: "Connect with like-minded innovators and forge lasting partnerships.",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(251, 191, 36, 0.3)",
            }}
            className="bg-gradient-to-b from-amber-800/50 to-orange-900/50 backdrop-blur-sm rounded-lg p-6 border border-amber-600/30 hover:border-orange-400/50 transition-all duration-300 cursor-pointer"
          >
            <motion.div style={{ rotate: gearRotation }} className="text-orange-400 mb-4 flex justify-center">
              {feature.icon}
            </motion.div>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl font-bold text-amber-200 mb-3 text-center"
            >
              {feature.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-amber-100 text-center leading-relaxed"
            >
              {feature.description}
            </motion.p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-16 bg-gradient-to-r from-amber-800/30 to-orange-800/30 rounded-2xl p-8 border border-amber-600/30"
      >
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            { number: "500+", label: "Speakers & Innovators" },
            { number: "10,000+", label: "Expected Attendees" },
            { number: "3", label: "Days of Innovation" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  delay: index * 0.2 + 0.3,
                }}
                className="text-4xl font-bold text-orange-400 mb-2"
              >
                {stat.number}
              </motion.div>
              <div className="text-amber-200 font-semibold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

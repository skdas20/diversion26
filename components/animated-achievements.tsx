"use client"

import { motion } from "framer-motion"
import { Trophy, Star, Award, Target } from "lucide-react"

export default function AnimatedAchievements() {
  const achievements = [
    {
      icon: <Trophy className="h-16 w-16" />,
      title: "Best Tech Convention 2024",
      description: "Awarded by TechEvents Global for outstanding innovation and attendee experience.",
      year: "2024",
    },
    {
      icon: <Star className="h-16 w-16" />,
      title: "Innovation Excellence Award",
      description: "Recognized for pioneering the fusion of historical aesthetics with modern technology.",
      year: "2023",
    },
    {
      icon: <Award className="h-16 w-16" />,
      title: "Sustainability Champion",
      description: "Leading the industry in eco-friendly event practices and carbon-neutral operations.",
      year: "2024",
    },
    {
      icon: <Target className="h-16 w-16" />,
      title: "Community Impact Award",
      description: "Empowering 50,000+ developers and creators through education and networking.",
      year: "2023",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="text-center mb-10 sm:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-bold text-amber-200 mb-4 sm:mb-6 break-words"
        >
          Our Achievements
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
          className="text-xl text-amber-100 max-w-3xl mx-auto leading-relaxed"
        >
          Celebrating milestones that showcase our commitment to excellence, innovation, and community impact.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: index * 0.2,
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(251, 191, 36, 0.4)",
            }}
            className="group relative cursor-pointer"
          >
            <div className="bg-gradient-to-br from-amber-800/40 to-orange-900/40 backdrop-blur-sm rounded-2xl p-8 border border-amber-600/30 hover:border-orange-400/50 transition-all duration-500">
              {/* Year badge with piston animation */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.3 }}
                whileHover={{ scale: 1.1 }}
                className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold"
              >
                {achievement.year}
              </motion.div>

              {/* Icon with brass glow effect */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: index * 0.2 + 0.1,
                }}
                whileHover={{
                  scale: 1.1,
                  filter: "drop-shadow(0 0 20px #DAA520)",
                }}
                className="text-orange-400 mb-6 group-hover:text-amber-300 transition-colors duration-300"
              >
                {achievement.icon}
              </motion.div>

              {/* Content with certificate roll-down effect */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 + 0.4 }}
                className="text-2xl font-bold text-amber-200 mb-4 group-hover:text-white transition-colors duration-300"
              >
                {achievement.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 + 0.6 }}
                className="text-amber-100 leading-relaxed group-hover:text-amber-50 transition-colors duration-300"
              >
                {achievement.description}
              </motion.p>

              {/* Decorative gear with steam pressure gauge effect */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 0.2, scale: 1 }}
                whileHover={{ opacity: 0.4, rotate: 360 }}
                transition={{ duration: 2 }}
                className="absolute bottom-4 right-4"
              >
                <div className="w-8 h-8 border-2 border-amber-400 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 border border-amber-400 rounded-full"></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats section with steam pressure gauge counters */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-10 sm:mt-20 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8"
      >
        {[
          { number: "5", label: "Years Running", suffix: "" },
          { number: "98", label: "Satisfaction Rate", suffix: "%" },
          { number: "200", label: "Industry Partners", suffix: "+" },
          { number: "15", label: "Countries Represented", suffix: "" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              delay: index * 0.1 + 0.7,
            }}
            whileHover={{
              scale: 1.1,
              filter: "drop-shadow(0 0 15px #DAA520)",
            }}
            className="text-center cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.9 }}
              className="text-4xl md:text-5xl font-bold text-orange-400 mb-2"
            >
              {stat.number}
              {stat.suffix}
            </motion.div>
            <div className="text-amber-200 font-semibold text-sm md:text-base">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

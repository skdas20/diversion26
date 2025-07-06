"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export default function AnimatedSchedule() {
  const [selectedDay, setSelectedDay] = useState(0)

  const scheduleData = [
    {
      day: "Day 1",
      date: "March 15, 2026",
      events: [
        {
          time: "09:00 - 10:00",
          title: "Opening Ceremony",
          speaker: "Dr. Victoria Steamwright",
          location: "Main Auditorium",
          type: "keynote",
        },
        {
          time: "10:30 - 11:30",
          title: "The Future of Mechanical Computing",
          speaker: "Prof. Gideon Clockwork",
          location: "Innovation Hall",
          type: "talk",
        },
        {
          time: "14:00 - 16:00",
          title: "Build Your Own Steam Engine",
          speaker: "Workshop Team",
          location: "Maker Space",
          type: "workshop",
        },
      ],
    },
    {
      day: "Day 2",
      date: "March 16, 2026",
      events: [
        {
          time: "09:00 - 10:00",
          title: "AI Meets Victorian Engineering",
          speaker: "Dr. Copper Cogsworth",
          location: "Tech Theater",
          type: "keynote",
        },
        {
          time: "11:00 - 12:00",
          title: "Sustainable Steampunk Design",
          speaker: "Eco-Engineers Panel",
          location: "Green Hall",
          type: "panel",
        },
        {
          time: "15:00 - 17:00",
          title: "Networking Gala",
          speaker: "All Attendees",
          location: "Grand Ballroom",
          type: "networking",
        },
      ],
    },
    {
      day: "Day 3",
      date: "March 17, 2026",
      events: [
        {
          time: "09:00 - 10:00",
          title: "Innovation Showcase",
          speaker: "Startup Founders",
          location: "Exhibition Floor",
          type: "showcase",
        },
        {
          time: "11:00 - 12:00",
          title: "The Next Decade of Tech",
          speaker: "Industry Leaders",
          location: "Future Forum",
          type: "panel",
        },
        {
          time: "16:00 - 17:00",
          title: "Closing Ceremony & Awards",
          speaker: "Event Organizers",
          location: "Main Auditorium",
          type: "ceremony",
        },
      ],
    },
  ]

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "keynote":
        return "from-orange-500 to-red-600"
      case "workshop":
        return "from-amber-500 to-orange-600"
      case "panel":
        return "from-yellow-500 to-amber-600"
      case "networking":
        return "from-green-500 to-teal-600"
      case "showcase":
        return "from-purple-500 to-pink-600"
      case "ceremony":
        return "from-blue-500 to-indigo-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="text-center mb-10 sm:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-bold text-amber-200 mb-4 sm:mb-6 break-words"
        >
          Schedule
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
          Explore the full program of Diversion 2026. Each day is packed with keynotes, workshops, and hands-on
          experiences.
        </motion.p>
      </div>

      {/* Railway station flip-board style day selector */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row justify-center mb-6 sm:mb-12 gap-2 sm:gap-0"
      >
        <div className="bg-gradient-to-r from-amber-800/40 to-orange-800/40 rounded-xl p-1 sm:p-2 border border-amber-600/30">
          <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-8 gap-2 sm:gap-0">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedDay(Math.max(0, selectedDay - 1))}
              className="p-2 text-amber-400 hover:text-orange-400 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>

            <div className="flex space-x-2">
              {scheduleData.map((day, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDay(index)}
                  className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 ${
                    selectedDay === index
                      ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                      : "text-amber-300 hover:text-white hover:bg-amber-700/30"
                  }`}
                >
                  {day.day}
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedDay(Math.min(scheduleData.length - 1, selectedDay + 1))}
              className="p-2 text-amber-400 hover:text-orange-400 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Animated schedule content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDay}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-amber-800/30 to-orange-800/30 rounded-2xl p-4 sm:p-8 border border-amber-600/30"
        >
          <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-8 gap-2 sm:gap-0">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              <Calendar className="h-8 w-8 text-orange-400 mr-4" />
            </motion.div>
            <div>
              <h3 className="text-xl sm:text-3xl font-bold text-amber-200">{scheduleData[selectedDay].day}</h3>
              <p className="text-amber-100 text-base sm:text-lg">{scheduleData[selectedDay].date}</p>
            </div>
          </div>

          <div className="space-y-6">
            {scheduleData[selectedDay].events.map((event, eventIndex) => (
              <motion.div
                key={eventIndex}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: eventIndex * 0.1 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 30px rgba(251, 191, 36, 0.2)",
                }}
                className="bg-gradient-to-r from-amber-900/40 to-orange-900/40 rounded-xl p-6 border border-amber-600/20 hover:border-orange-400/40 transition-all duration-300 cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div className="flex items-center mb-2 md:mb-0">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: eventIndex * 0.1 + 0.2 }}
                    >
                      <Clock className="h-5 w-5 text-orange-400 mr-2" />
                    </motion.div>
                    <span className="text-amber-200 font-semibold">{event.time}</span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: eventIndex * 0.1 + 0.3 }}
                    className={`inline-block px-3 py-1 rounded-full text-white text-sm font-semibold bg-gradient-to-r ${getEventTypeColor(event.type)}`}
                  >
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </motion.div>
                </div>

                <motion.h4
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: eventIndex * 0.1 + 0.4 }}
                  className="text-xl font-bold text-amber-200 mb-2"
                >
                  {event.title}
                </motion.h4>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between text-amber-100">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: eventIndex * 0.1 + 0.5 }}
                    className="flex items-center mb-2 md:mb-0"
                  >
                    <Users className="h-4 w-4 text-orange-400 mr-2" />
                    <span>{event.speaker}</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: eventIndex * 0.1 + 0.6 }}
                    className="flex items-center"
                  >
                    <MapPin className="h-4 w-4 text-orange-400 mr-2" />
                    <span>{event.location}</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16 text-center"
      >
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 15px 35px rgba(251, 191, 36, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300"
        >
          Download Full Schedule
        </motion.button>
      </motion.div>
    </div>
  )
}

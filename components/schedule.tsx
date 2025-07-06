"use client"

import React, { useState, useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, Text3D } from "@react-three/drei"
import { Calendar, Clock, MapPin, Users, Cog, Scroll, Star, Crown, Zap, Award } from "lucide-react"
import * as THREE from "three"

// 3D Steampunk Clock Component
function SteampunkClock({ position, day }: { position: [number, number, number], day: number }) {
  const meshRef = useRef<THREE.Group>(null)
  const hourHandRef = useRef<THREE.Mesh>(null)
  const minuteHandRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
    if (hourHandRef.current) {
      hourHandRef.current.rotation.z = state.clock.elapsedTime * 0.1 + day * Math.PI / 3
    }
    if (minuteHandRef.current) {
      minuteHandRef.current.rotation.z = state.clock.elapsedTime * 0.5 + day * Math.PI / 2
    }
  })

  return (
    <group ref={meshRef} position={position}>
      {/* Clock face */}
      <mesh>
        <cylinderGeometry args={[2, 2, 0.3, 32]} />
        <meshStandardMaterial 
          color="#B8860B"
          metalness={0.9}
          roughness={0.2}
          emissive="#8B6914"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Clock numbers */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI * 2) / 12) * 1.6,
            Math.sin((i * Math.PI * 2) / 12) * 1.6,
            0.2
          ]}
        >
          <boxGeometry args={[0.2, 0.3, 0.1]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      ))}

      {/* Hour hand */}
      <mesh ref={hourHandRef} position={[0, 0, 0.2]}>
        <boxGeometry args={[0.1, 1, 0.05]} />
        <meshStandardMaterial color="#2F2F2F" />
      </mesh>

      {/* Minute hand */}
      <mesh ref={minuteHandRef} position={[0, 0, 0.25]}>
        <boxGeometry args={[0.05, 1.4, 0.05]} />
        <meshStandardMaterial color="#2F2F2F" />
      </mesh>

      {/* Center bolt */}
      <mesh position={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
    </group>
  )
}

// 3D Schedule Carousel Scene
function ScheduleCarousel3D({ activeDay, scheduleData }: { activeDay: number, scheduleData: any[] }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = -activeDay * (Math.PI * 2) / scheduleData.length
    }
  })

  return (
    <>
      <ambientLight intensity={0.4} color="#8B7355" />
      <directionalLight position={[15, 15, 10]} intensity={1.5} color="#DAA520" castShadow />
      <pointLight position={[-15, 10, -15]} intensity={1.0} color="#FF6B35" />

      {/* Central pedestal */}
      <mesh position={[0, -3, 0]}>
        <cylinderGeometry args={[6, 8, 2, 32]} />
        <meshStandardMaterial 
          color="#654321"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Clocks arranged in circle */}
      <group ref={groupRef}>
        {scheduleData.map((day, index) => {
          const angle = (index * Math.PI * 2) / scheduleData.length
          const radius = 8
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius
          
          return (
            <SteampunkClock
              key={index}
              position={[x, 0, z]}
              day={index}
            />
          )
        })}
      </group>

      {/* Floating gears */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Float key={i} speed={0.5 + i * 0.1} rotationIntensity={0.3} floatIntensity={0.4}>
          <mesh
            position={[
              (Math.random() - 0.5) * 20,
              Math.random() * 8 + 2,
              (Math.random() - 0.5) * 20
            ]}
            scale={0.2}
          >
            <cylinderGeometry args={[1, 1, 0.2, 8]} />
            <meshStandardMaterial 
              color="#CD7F32"
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

// Animated Scroll Component
function AnimatedScroll({ 
  isOpen, 
  children, 
  delay = 0 
}: { 
  isOpen: boolean, 
  children: React.ReactNode, 
  delay?: number 
}) {
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShouldAnimate(isOpen), delay)
    return () => clearTimeout(timer)
  }, [isOpen, delay])

  return (
    <div className="relative perspective-1000">
      {/* Scroll background */}
      <div 
        className={`
          relative bg-gradient-to-br from-amber-100 to-orange-200 rounded-2xl border-4 border-amber-600
          transition-all duration-1000 transform-gpu origin-top
          ${shouldAnimate 
            ? 'scale-y-100 opacity-100 rotate-x-0' 
            : 'scale-y-0 opacity-0 rotate-x-90'
          }
        `}
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(139, 105, 20, 0.1) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(139, 105, 20, 0.1) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(139, 105, 20, 0.1) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(139, 105, 20, 0.1) 75%)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
        }}
      >
        {/* Decorative scroll edges */}
        <div className="absolute -top-2 left-4 right-4 h-4 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 rounded-t-xl"></div>
        <div className="absolute -bottom-2 left-4 right-4 h-4 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 rounded-b-xl"></div>
        
        {/* Wax seals */}
        <div className="absolute -top-3 -right-3 w-8 h-8 bg-red-600 rounded-full border-2 border-red-800 flex items-center justify-center">
          <Crown className="w-4 h-4 text-yellow-300" />
        </div>
        
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  )
}

// Enhanced Event Card
function SteampunkEventCard({ 
  event, 
  index, 
  isVisible 
}: { 
  event: any, 
  index: number, 
  isVisible: boolean 
}) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "keynote": return <Crown className="h-6 w-6" />
      case "workshop": return <Cog className="h-6 w-6" />
      case "panel": return <Users className="h-6 w-6" />
      case "networking": return <Star className="h-6 w-6" />
      case "showcase": return <Award className="h-6 w-6" />
      case "ceremony": return <Zap className="h-6 w-6" />
      default: return <Calendar className="h-6 w-6" />
    }
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "keynote": return "from-orange-500 to-red-600"
      case "workshop": return "from-amber-500 to-orange-600"
      case "panel": return "from-yellow-500 to-amber-600"
      case "networking": return "from-green-500 to-teal-600"
      case "showcase": return "from-purple-500 to-pink-600"
      case "ceremony": return "from-blue-500 to-indigo-600"
      default: return "from-gray-500 to-gray-600"
    }
  }

  return (
    <div 
      className={`
        relative group transition-all duration-700 transform
        ${isVisible 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-8 opacity-0 scale-95'
        }
      `}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      {/* Glowing background */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
      
      <div className="relative bg-gradient-to-br from-amber-900/60 to-orange-900/60 backdrop-blur-sm rounded-xl p-6 border border-amber-600/40 hover:border-orange-400/60 transition-all duration-500 transform hover:scale-105">
        {/* Time and Type Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div className="flex items-center mb-2 md:mb-0">
            <div className="bg-amber-800/50 rounded-lg p-2 mr-3">
              <Clock className="h-5 w-5 text-orange-400" />
            </div>
            <span className="text-amber-200 font-bold text-lg">{event.time}</span>
          </div>
          
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-white text-sm font-bold bg-gradient-to-r ${getEventTypeColor(event.type)} shadow-lg`}>
            {getEventIcon(event.type)}
            <span className="ml-2">{event.type.charAt(0).toUpperCase() + event.type.slice(1)}</span>
          </div>
        </div>

        {/* Event Title */}
        <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-300 mb-4 group-hover:from-white group-hover:to-amber-100 transition-all duration-300">
          {event.title}
        </h4>

        {/* Speaker and Location */}
        <div className="grid md:grid-cols-2 gap-4 text-amber-100">
          <div className="flex items-center">
            <div className="bg-orange-800/50 rounded-lg p-2 mr-3">
              <Users className="h-4 w-4 text-orange-400" />
            </div>
            <div>
              <div className="text-sm text-amber-300">Speaker</div>
              <div className="font-semibold">{event.speaker}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-red-800/50 rounded-lg p-2 mr-3">
              <MapPin className="h-4 w-4 text-red-400" />
            </div>
            <div>
              <div className="text-sm text-amber-300">Location</div>
              <div className="font-semibold">{event.location}</div>
            </div>
          </div>
        </div>

        {/* Decorative gears */}
        <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
          <Cog className="h-6 w-6 text-amber-400 animate-spin" style={{ animationDuration: '10s' }} />
        </div>
      </div>
    </div>
  )
}

export default function EnhancedSchedule() {
  const [activeDay, setActiveDay] = useState(0)
  const [openScrolls, setOpenScrolls] = useState<boolean[]>([false, false, false])
  const [isVisible, setIsVisible] = useState(false)

  const scheduleData = [
    {
      day: "Day 1",
      date: "March 15, 2026",
      subtitle: "The Dawn of Innovation",
      events: [
        {
          time: "09:00 - 10:00",
          title: "Grand Opening Ceremony",
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
          time: "12:00 - 13:00",
          title: "Renaissance Engineering Principles",
          speaker: "Master Leonardo Gearsmith",
          location: "Heritage Theater",
          type: "keynote",
        },
        {
          time: "14:00 - 16:00",
          title: "Build Your Own Steam Engine",
          speaker: "Workshop Team",
          location: "Maker Space",
          type: "workshop",
        },
        {
          time: "16:30 - 17:30",
          title: "Inventors' Showcase",
          speaker: "Emerging Innovators",
          location: "Exhibition Floor",
          type: "showcase",
        },
      ],
    },
    {
      day: "Day 2",
      date: "March 16, 2026",
      subtitle: "The Heart of Discovery",
      events: [
        {
          time: "09:00 - 10:00",
          title: "AI Meets Victorian Engineering",
          speaker: "Dr. Copper Cogsworth",
          location: "Tech Theater",
          type: "keynote",
        },
        {
          time: "10:30 - 11:30",
          title: "Sustainable Steampunk Design",
          speaker: "Eco-Engineers Panel",
          location: "Green Hall",
          type: "panel",
        },
        {
          time: "12:00 - 13:30",
          title: "Master Craftsmen Workshop",
          speaker: "Guild of Artisans",
          location: "Artisan Quarter",
          type: "workshop",
        },
        {
          time: "14:00 - 15:00",
          title: "The Business of Innovation",
          speaker: "Entrepreneur Circle",
          location: "Commerce Hall",
          type: "panel",
        },
        {
          time: "15:00 - 17:00",
          title: "Grand Networking Gala",
          speaker: "All Attendees",
          location: "Grand Ballroom",
          type: "networking",
        },
      ],
    },
    {
      day: "Day 3",
      date: "March 17, 2026",
      subtitle: "The Future Unveiled",
      events: [
        {
          time: "09:00 - 10:00",
          title: "Innovation Showcase Finale",
          speaker: "Startup Founders",
          location: "Exhibition Floor",
          type: "showcase",
        },
        {
          time: "10:30 - 11:30",
          title: "The Next Decade of Tech",
          speaker: "Industry Leaders",
          location: "Future Forum",
          type: "panel",
        },
        {
          time: "12:00 - 13:00",
          title: "Young Inventors Competition",
          speaker: "Next Generation",
          location: "Youth Pavilion",
          type: "showcase",
        },
        {
          time: "14:00 - 15:00",
          title: "Legacy of Innovation",
          speaker: "Historical Society",
          location: "Heritage Theater",
          type: "keynote",
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

  useEffect(() => {
    setIsVisible(true)
    // Auto-open first scroll after a delay
    const timer = setTimeout(() => {
      setOpenScrolls([true, false, false])
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleDaySelect = (dayIndex: number) => {
    setActiveDay(dayIndex)
    const newScrolls = [false, false, false]
    newScrolls[dayIndex] = true
    setOpenScrolls(newScrolls)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Enhanced Header */}
      <div className="text-center mb-20">
        <div className="relative inline-block">
          <h2 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 mb-8">
            Chronicle of Events
          </h2>
          <div className="absolute inset-0 text-6xl md:text-8xl font-bold text-amber-500/20 blur-sm">
            Chronicle of Events
          </div>
        </div>
        
        <div className="flex items-center justify-center mb-8">
          <div className="w-20 h-1 bg-gradient-to-r from-transparent to-orange-400"></div>
          <div className="mx-6 flex items-center gap-2">
            <Scroll className="h-8 w-8 text-orange-400" />
            <Cog className="h-6 w-6 text-amber-400 animate-spin" />
            <Calendar className="h-8 w-8 text-orange-400" />
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-transparent"></div>
        </div>
        
        <p className="text-2xl text-amber-100 max-w-4xl mx-auto leading-relaxed">
          Three magnificent days of discovery, innovation, and Renaissance-inspired technological marvels. 
          Unfurl the scrolls to reveal the grand schedule of our steampunk symposium.
        </p>
      </div>

      {/* 3D Carousel Section */}
      <div className="mb-20">
        <div className="h-96 lg:h-[500px] relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-orange-900/20 rounded-3xl backdrop-blur-sm border border-amber-600/30"></div>
          <Canvas camera={{ position: [0, 8, 15], fov: 60 }}>
            <ScheduleCarousel3D activeDay={activeDay} scheduleData={scheduleData} />
            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.3}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 6}
            />
          </Canvas>
        </div>

        {/* Day Selection Controls */}
        <div className="flex justify-center space-x-6 mb-12">
          {scheduleData.map((day, index) => (
            <button
              key={index}
              onClick={() => handleDaySelect(index)}
              className={`
                relative group px-8 py-4 rounded-xl font-bold text-lg transition-all duration-500 transform hover:scale-105
                ${index === activeDay 
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-2xl' 
                  : 'bg-gradient-to-r from-amber-700 to-orange-700 text-amber-100 hover:from-amber-600 hover:to-orange-600'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5" />
                {day.day}
              </div>
              {index === activeDay && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Animated Scrolls */}
      <div className="space-y-16">
        {scheduleData.map((day, dayIndex) => (
          <AnimatedScroll 
            key={dayIndex} 
            isOpen={openScrolls[dayIndex]} 
            delay={dayIndex * 300}
          >
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Scroll className="h-8 w-8 text-amber-800 mr-3" />
                <h3 className="text-4xl font-bold text-amber-800">{day.day}</h3>
                <Scroll className="h-8 w-8 text-amber-800 ml-3" />
              </div>
              <p className="text-2xl text-orange-700 font-semibold mb-2">{day.date}</p>
              <p className="text-lg text-amber-700 italic">{day.subtitle}</p>
            </div>

            <div className="space-y-6">
              {day.events.map((event, eventIndex) => (
                <SteampunkEventCard
                  key={eventIndex}
                  event={event}
                  index={eventIndex}
                  isVisible={openScrolls[dayIndex]}
                />
              ))}
            </div>
          </AnimatedScroll>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-20 text-center">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 via-orange-600/20 to-red-600/20 rounded-2xl blur-2xl"></div>
          <div className="relative bg-gradient-to-br from-amber-800/40 to-orange-900/40 backdrop-blur-sm rounded-2xl p-8 border border-amber-600/30">
            <h3 className="text-3xl font-bold text-amber-200 mb-4">
              Secure Your Place in History
            </h3>
            <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
              Download the complete chronicle and reserve your seat at the most extraordinary 
              steampunk technology convention of the Renaissance era.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-2">
                <Scroll className="h-5 w-5" />
                Download Full Chronicle
              </button>
              <button className="border-2 border-amber-400 text-amber-300 hover:bg-amber-400 hover:text-amber-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl flex items-center justify-center gap-2">
                <Calendar className="h-5 w-5" />
                Add to Calendar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

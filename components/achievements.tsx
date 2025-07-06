"use client"
import React, { useState, useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, Text3D, useTexture } from "@react-three/drei"
import { Trophy, Star, Award, Target, Cog, Zap, Users, Globe, Calendar, Medal, Crown, Gem } from "lucide-react"
import * as THREE from "three"

// Enhanced 3D Achievement Trophy Component
function Achievement3DTrophy({ 
  position, 
  achievement, 
  isActive, 
  onClick,
  rotationSpeed = 1
}: { 
  position: [number, number, number]
  achievement: any
  isActive: boolean
  onClick: () => void
  rotationSpeed?: number
}) {
  const meshRef = useRef<THREE.Group>(null)
  const trophyRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005 * rotationSpeed
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.3
    }
    if (trophyRef.current && isActive) {
      trophyRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
    if (glowRef.current) {
      const intensity = isActive ? 1 : hovered ? 0.7 : 0.3
      glowRef.current.scale.setScalar(0.8 + Math.sin(state.clock.elapsedTime * 3) * 0.2 * intensity)
    }
  })

  const getTrophyColor = () => {
    switch(achievement.type) {
      case 'gold': return "#FFD700"
      case 'silver': return "#C0C0C0"
      case 'bronze': return "#CD7F32"
      default: return "#B8860B"
    }
  }

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group 
        ref={meshRef} 
        position={position}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={isActive ? 1.4 : hovered ? 1.2 : 1}
      >
        {/* Glowing base */}
        <mesh ref={glowRef} position={[0, -1, 0]}>
          <cylinderGeometry args={[2, 2, 0.3, 32]} />
          <meshStandardMaterial 
            color="#654321"
            emissive={getTrophyColor()}
            emissiveIntensity={isActive ? 0.4 : 0.2}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Trophy base */}
        <group ref={trophyRef}>
          <mesh position={[0, -0.5, 0]}>
            <cylinderGeometry args={[1.2, 1.5, 1, 16]} />
            <meshStandardMaterial 
              color="#8B4513"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>

          {/* Trophy cup */}
          <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[0.8, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial 
              color={getTrophyColor()}
              metalness={0.9}
              roughness={0.1}
              emissive={getTrophyColor()}
              emissiveIntensity={isActive ? 0.3 : 0.1}
            />
          </mesh>

          {/* Trophy handles */}
          {[-1, 1].map((side, i) => (
            <mesh key={i} position={[side * 0.9, 0.3, 0]} rotation={[0, 0, side * Math.PI / 6]}>
              <torusGeometry args={[0.3, 0.08, 8, 16]} />
              <meshStandardMaterial 
                color={getTrophyColor()}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          ))}

          {/* Achievement icon representation */}
          <mesh position={[0, 1.2, 0]}>
            <sphereGeometry args={[0.2, 12, 12]} />
            <meshStandardMaterial 
              color="#FFD700"
              emissive="#DAA520"
              emissiveIntensity={0.6}
            />
          </mesh>
        </group>

        {/* Floating gears around trophy */}
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i * Math.PI * 2) / 6) * 2,
              Math.sin(state.clock?.elapsedTime * 0.5 + i) * 0.5,
              Math.sin((i * Math.PI * 2) / 6) * 2,
            ]}
            rotation={[0, 0, (state.clock?.elapsedTime || 0) * (i % 2 === 0 ? 1 : -1)]}
            scale={0.3}
          >
            <cylinderGeometry args={[0.5, 0.5, 0.1, 8]} />
            <meshStandardMaterial 
              color="#CD7F32"
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>
        ))}

        {/* Steam particles for active achievement */}
        {isActive && Array.from({ length: 8 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 3,
              1.5 + Math.random() * 2,
              (Math.random() - 0.5) * 3,
            ]}
            scale={0.1 + Math.random() * 0.1}
          >
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial 
              color="#F5F5DC"
              transparent
              opacity={0.4}
            />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

// 3D Achievements Carousel Scene
function AchievementsCarousel3D({ achievements, activeIndex, onAchievementSelect }: {
  achievements: any[]
  activeIndex: number
  onAchievementSelect: (index: number) => void
}) {
  const groupRef = useRef<THREE.Group>(null)
  const platformRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = -activeIndex * (Math.PI * 2) / achievements.length
    }
    if (platformRef.current) {
      platformRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <>
      {/* Enhanced lighting */}
      <ambientLight intensity={0.4} color="#8B7355" />
      <directionalLight position={[15, 15, 10]} intensity={1.5} color="#DAA520" castShadow />
      <pointLight position={[-15, 10, -15]} intensity={1.0} color="#FF6B35" />
      <pointLight position={[15, 10, 15]} intensity={1.0} color="#B8860B" />
      <hemisphereLight args={["#DAA520", "#654321", 0.6]} />

      {/* Ornate platform base */}
      <group ref={platformRef}>
        <mesh position={[0, -4, 0]}>
          <cylinderGeometry args={[10, 12, 1, 32]} />
          <meshStandardMaterial 
            color="#654321"
            metalness={0.8}
            roughness={0.3}
            emissive="#8B4513"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Decorative rings */}
        {[8, 6, 4].map((radius, i) => (
          <mesh key={i} position={[0, -3.5 + i * 0.1, 0]}>
            <torusGeometry args={[radius, 0.2, 12, 32]} />
            <meshStandardMaterial 
              color="#B8860B"
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>

      {/* Achievement trophies in circle */}
      <group ref={groupRef}>
        {achievements.map((achievement, index) => {
          const angle = (index * Math.PI * 2) / achievements.length
          const radius = 8
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius
          
          return (
            <Achievement3DTrophy
              key={index}
              position={[x, 0, z]}
              achievement={achievement}
              isActive={index === activeIndex}
              onClick={() => onAchievementSelect(index)}
              rotationSpeed={index === activeIndex ? 2 : 1}
            />
          )
        })}
      </group>

      {/* Central pillar with gears */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 8, 20]} />
        <meshStandardMaterial 
          color="#B8860B"
          metalness={0.9}
          roughness={0.2}
          emissive="#8B6914"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Rotating gears on pillar */}
      {[2, 0, -2].map((y, i) => (
        <mesh key={i} position={[0, y, 1.6]} rotation={[0, 0, state.clock?.elapsedTime * (i % 2 === 0 ? 1 : -1) || 0]}>
          <cylinderGeometry args={[0.8, 0.8, 0.2, 12]} />
          <meshStandardMaterial 
            color="#CD7F32"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* Atmospheric steam effects */}
      {Array.from({ length: 30 }).map((_, i) => (
        <Float key={i} speed={0.5 + i * 0.05} rotationIntensity={0.1} floatIntensity={0.6}>
          <mesh
            position={[
              (Math.random() - 0.5) * 25,
              Math.random() * 12 - 2,
              (Math.random() - 0.5) * 25
            ]}
            scale={0.05 + Math.random() * 0.1}
          >
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial 
              color="#F5F5DC"
              transparent
              opacity={0.2}
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

// Enhanced Achievement Card Component
function EnhancedAchievementCard({ achievement, index, isActive }: {
  achievement: any
  index: number
  isActive: boolean
}) {
  return (
    <div className={`group relative transition-all duration-700 ${isActive ? 'scale-105' : ''}`}>
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 via-orange-600/20 to-red-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
      
      <div className="relative bg-gradient-to-br from-amber-800/40 to-orange-900/40 backdrop-blur-sm rounded-2xl p-8 border border-amber-600/30 hover:border-orange-400/60 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl overflow-hidden">
        {/* Animated background gears */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
          <Cog className="w-full h-full text-amber-400 animate-spin" style={{ animationDuration: '20s' }} />
        </div>
        
        {/* Year badge with enhanced styling */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {achievement.year}
          </span>
        </div>

        {/* Achievement type badge */}
        <div className="absolute top-4 left-4">
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${
            achievement.type === 'gold' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
            achievement.type === 'silver' ? 'bg-gray-400/20 text-gray-300 border border-gray-400/30' :
            achievement.type === 'bronze' ? 'bg-orange-600/20 text-orange-300 border border-orange-600/30' :
            'bg-amber-600/20 text-amber-300 border border-amber-600/30'
          }`}>
            {achievement.type?.toUpperCase() || 'SPECIAL'}
          </div>
        </div>

        {/* Enhanced icon with glow effect */}
        <div className="text-orange-400 mb-6 group-hover:text-amber-300 transition-all duration-300 relative">
          <div className="absolute inset-0 blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-300">
            {achievement.icon}
          </div>
          <div className="relative">
            {achievement.icon}
          </div>
        </div>

        {/* Content with enhanced typography */}
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-300 mb-4 group-hover:from-white group-hover:to-amber-100 transition-all duration-300">
          {achievement.title}
        </h3>
        
        <p className="text-amber-100 leading-relaxed group-hover:text-amber-50 transition-colors duration-300 mb-4">
          {achievement.description}
        </p>

        {/* Achievement stats */}
        {achievement.stats && (
          <div className="flex items-center gap-4 text-sm text-amber-300">
            {achievement.stats.map((stat: any, i: number) => (
              <span key={i} className="flex items-center gap-1">
                <stat.icon className="w-4 h-4" />
                {stat.value}
              </span>
            ))}
          </div>
        )}

        {/* Decorative steampunk elements */}
        <div className="absolute bottom-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border-2 border-amber-400 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 border border-amber-400 rounded-full"></div>
            </div>
            <div className="w-4 h-4 border border-amber-400 rounded-full"></div>
          </div>
        </div>

        {/* Progress indicator for active achievement */}
        {isActive && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-b-2xl">
            <div className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-b-2xl animate-pulse"></div>
          </div>
        )}
      </div>
    </div>
  )
}

// Animated Counter Component
function SteampunkCounter({ value, label, icon }: { value: string, label: string, icon: React.ReactNode }) {
  const [count, setCount] = useState(0)
  const targetValue = parseInt(value.replace(/[^0-9]/g, ''))

  useEffect(() => {
    const duration = 2500
    const steps = 60
    const increment = targetValue / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= targetValue) {
        setCount(targetValue)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [targetValue])

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
      <div className="relative bg-gradient-to-br from-amber-800/40 to-orange-900/40 backdrop-blur-sm rounded-xl p-6 border border-amber-600/30 hover:border-orange-400/50 transition-all duration-300 transform hover:scale-105 text-center">
        <div className="text-orange-400 mb-3 flex justify-center group-hover:text-amber-300 transition-colors duration-300">
          {icon}
        </div>
        <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-2">
          {count.toLocaleString()}{value.includes('+') ? '+' : value.includes('%') ? '%' : ''}
        </div>
        <div className="text-amber-200 font-semibold text-sm md:text-base">{label}</div>
        
        {/* Decorative gear */}
        <div className="absolute top-2 right-2">
          <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default function EnhancedAchievements() {
  const [activeAchievement, setActiveAchievement] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const achievements = [
    {
      icon: <Trophy className="h-16 w-16" />,
      title: "Best Tech Convention 2024",
      description: "Awarded by TechEvents Global for outstanding innovation and attendee experience, setting new standards in the industry.",
      year: "2024",
      type: "gold",
      stats: [
        { icon: Users, value: "50K+ Attendees" },
        { icon: Star, value: "4.9/5 Rating" }
      ]
    },
    {
      icon: <Star className="h-16 w-16" />,
      title: "Innovation Excellence Award",
      description: "Recognized for pioneering the fusion of historical aesthetics with modern technology, creating an unprecedented experience.",
      year: "2023",
      type: "silver",
      stats: [
        { icon: Zap, value: "200+ Innovations" },
        { icon: Globe, value: "40 Countries" }
      ]
    },
    {
      icon: <Award className="h-16 w-16" />,
      title: "Sustainability Champion",
      description: "Leading the industry in eco-friendly event practices and carbon-neutral operations, setting environmental benchmarks.",
      year: "2024",
      type: "bronze",
      stats: [
        { icon: Target, value: "100% Carbon Neutral" },
        { icon: Medal, value: "Green Certified" }
      ]
    },
    {
      icon: <Target className="h-16 w-16" />,
      title: "Community Impact Award",
      description: "Empowering 50,000+ developers and creators through education, networking, and collaborative innovation programs.",
      year: "2023",
      type: "special",
      stats: [
        { icon: Users, value: "50K+ Empowered" },
        { icon: Crown, value: "Industry Leader" }
      ]
    },
    {
      icon: <Crown className="h-16 w-16" />,
      title: "Digital Transformation Pioneer",
      description: "Revolutionizing event experiences through cutting-edge technology integration and immersive digital environments.",
      year: "2024",
      type: "gold",
      stats: [
        { icon: Zap, value: "AI-Powered" },
        { icon: Gem, value: "Next-Gen Tech" }
      ]
    },
    {
      icon: <Gem className="h-16 w-16" />,
      title: "Global Recognition Award",
      description: "Internationally acclaimed for fostering cross-cultural innovation and building bridges between diverse tech communities.",
      year: "2023",
      type: "silver",
      stats: [
        { icon: Globe, value: "Worldwide Impact" },
        { icon: Users, value: "Unity in Tech" }
      ]
    }
  ]

  const stats = [
    { value: "6", label: "Major Awards Won", icon: <Trophy className="h-8 w-8" /> },
    { value: "99", label: "Satisfaction Rate", icon: <Star className="h-8 w-8" /> },
    { value: "250", label: "Industry Partners", icon: <Users className="h-8 w-8" /> },
    { value: "25", label: "Countries Represented", icon: <Globe className="h-8 w-8" /> }
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveAchievement((prev) => (prev + 1) % achievements.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [achievements.length])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Enhanced Header */}
      <div className="text-center mb-20">
        <div className="relative inline-block">
          <h2 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 mb-8">
            Our Achievements
          </h2>
          <div className="absolute inset-0 text-6xl md:text-8xl font-bold text-amber-500/20 blur-sm">
            Our Achievements
          </div>
        </div>
        
        <div className="flex items-center justify-center mb-8">
          <div className="w-20 h-1 bg-gradient-to-r from-transparent to-orange-400"></div>
          <div className="mx-6 flex items-center gap-2">
            <Trophy className="h-8 w-8 text-orange-400" />
            <Cog className="h-6 w-6 text-amber-400 animate-spin" />
            <Award className="h-8 w-8 text-orange-400" />
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-transparent"></div>
        </div>
        
        <p className="text-2xl text-amber-100 max-w-4xl mx-auto leading-relaxed">
          Celebrating milestones that showcase our commitment to excellence, innovation, and community impact 
          in the steampunk technology revolution.
        </p>
      </div>

      {/* 3D Carousel Section */}
      <div className="mb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Carousel */}
          <div className="h-96 lg:h-[600px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-orange-900/20 rounded-3xl backdrop-blur-sm border border-amber-600/30"></div>
            <Canvas camera={{ position: [0, 8, 18], fov: 60 }} shadows>
              <AchievementsCarousel3D 
                achievements={achievements}
                activeIndex={activeAchievement}
                onAchievementSelect={setActiveAchievement}
              />
              <OrbitControls 
                enableZoom={false}
                enablePan={false}
                autoRotate={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 6}
              />
            </Canvas>
          </div>

          {/* Achievement Details */}
          <div className="space-y-8">
            <EnhancedAchievementCard 
              achievement={achievements[activeAchievement]}
              index={activeAchievement}
              isActive={true}
            />

            {/* Navigation Controls */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setActiveAchievement((prev) => (prev - 1 + achievements.length) % achievements.length)}
                className="bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <Cog className="w-4 h-4" />
                Previous
              </button>
              <button
                onClick={() => setActiveAchievement((prev) => (prev + 1) % achievements.length)}
                className="bg-gradient-to-r from-orange-700 to-red-700 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                Next
                <Cog className="w-4 h-4" />
              </button>
            </div>

            {/* Achievement indicators */}
            <div className="flex justify-center space-x-2">
              {achievements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveAchievement(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeAchievement 
                      ? 'bg-orange-400 scale-125 shadow-lg' 
                      : 'bg-amber-600/50 hover:bg-amber-500/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        {stats.map((stat, index) => (
          <SteampunkCounter 
            key={index} 
            value={stat.value} 
            label={stat.label} 
            icon={stat.icon}
          />
        ))}
      </div>

      {/* All Achievements Grid */}
      <div className="mb-16">
        <h3 className="text-4xl font-bold text-amber-200 text-center mb-12">
          Complete Achievement Gallery
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <EnhancedAchievementCard 
              key={index}
              achievement={achievement}
              index={index}
              isActive={index === activeAchievement}
            />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 via-orange-600/20 to-red-600/20 rounded-3xl blur-2xl"></div>
        <div className="relative bg-gradient-to-br from-amber-800/30 to-orange-800/30 rounded-3xl p-12 border border-amber-600/30 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-4">
              <Trophy className="h-12 w-12 text-amber-400" />
              <Cog className="h-8 w-8 text-orange-400 animate-spin" />
              <Award className="h-12 w-12 text-amber-400" />
            </div>
          </div>
          <h3 className="text-4xl font-bold text-amber-200 mb-6">
            Join Our Award-Winning Community
          </h3>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Be part of the next chapter in our journey of innovation and excellence. 
            Help us earn even more achievements together!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-2">
              <Medal className="w-5 h-5" />
              Register Now
            </button>
            <button className="border-2 border-amber-400 text-amber-300 hover:bg-amber-400 hover:text-amber-900 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-xl flex items-center justify-center gap-2">
              <Crown className="w-5 h-5" />
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

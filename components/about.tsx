"use client"
import React, { useState, useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, Text3D, useTexture } from "@react-three/drei"
import { Cog, Zap, Wrench, Gauge, Users, Calendar, Award, Globe } from "lucide-react"
import * as THREE from "three"

// Enhanced 3D Feature Card Component
function Feature3DCard({ 
  position, 
  feature, 
  isActive, 
  onClick 
}: { 
  position: [number, number, number]
  feature: any
  isActive: boolean
  onClick: () => void
}) {
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group 
        ref={meshRef} 
        position={position}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={isActive ? 1.2 : hovered ? 1.1 : 1}
      >
        {/* Card Base */}
        <mesh>
          <boxGeometry args={[3, 4, 0.3]} />
          <meshStandardMaterial 
            color={isActive ? "#FF6B35" : "#B8860B"}
            metalness={0.8}
            roughness={0.2}
            emissive={isActive ? "#FF6B35" : "#8B6914"}
            emissiveIntensity={isActive ? 0.3 : 0.1}
          />
        </mesh>

        {/* Ornate Frame */}
        <mesh position={[0, 0, 0.2]}>
          <boxGeometry args={[3.2, 4.2, 0.1]} />
          <meshStandardMaterial 
            color="#654321"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Gear Decorations */}
        {Array.from({ length: 4 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              (i % 2 === 0 ? -1.3 : 1.3),
              (i < 2 ? 1.5 : -1.5),
              0.25
            ]}
            rotation={[0, 0, state.clock?.elapsedTime * (i % 2 === 0 ? 1 : -1) || 0]}
          >
            <cylinderGeometry args={[0.2, 0.2, 0.1, 8]} />
            <meshStandardMaterial color="#CD7F32" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}

        {/* Icon representation */}
        <mesh position={[0, 1, 0.3]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial 
            color="#FFD700"
            emissive="#DAA520"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Steam effects */}
        {isActive && (
          <mesh position={[0, 2.5, 0]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial 
              color="#F5F5DC"
              transparent
              opacity={0.6}
            />
          </mesh>
        )}
      </group>
    </Float>
  )
}

// 3D Carousel Scene
function Carousel3DScene({ features, activeIndex, onFeatureSelect }: {
  features: any[]
  activeIndex: number
  onFeatureSelect: (index: number) => void
}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = -activeIndex * (Math.PI * 2) / features.length
    }
  })

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} color="#8B7355" />
      <directionalLight position={[10, 10, 5]} intensity={1.2} color="#DAA520" />
      <pointLight position={[-10, 5, -10]} intensity={0.8} color="#FF6B35" />

      {/* Carousel Base */}
      <mesh position={[0, -3, 0]}>
        <cylinderGeometry args={[8, 8, 0.5, 32]} />
        <meshStandardMaterial 
          color="#654321"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Feature Cards in Circle */}
      <group ref={groupRef}>
        {features.map((feature, index) => {
          const angle = (index * Math.PI * 2) / features.length
          const radius = 6
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius
          
          return (
            <Feature3DCard
              key={index}
              position={[x, 0, z]}
              feature={feature}
              isActive={index === activeIndex}
              onClick={() => onFeatureSelect(index)}
            />
          )
        })}
      </group>

      {/* Central Pillar */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1, 1, 6, 16]} />
        <meshStandardMaterial 
          color="#B8860B"
          metalness={0.9}
          roughness={0.2}
          emissive="#8B6914"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Atmospheric particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Float key={i} speed={1 + i * 0.1} rotationIntensity={0.1} floatIntensity={0.5}>
          <mesh
            position={[
              (Math.random() - 0.5) * 20,
              Math.random() * 8 - 2,
              (Math.random() - 0.5) * 20
            ]}
            scale={0.1 + Math.random() * 0.1}
          >
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial 
              color="#CD853F"
              transparent
              opacity={0.3}
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

// Enhanced Stats Counter Component
function AnimatedCounter({ value, label }: { value: string, label: string }) {
  const [count, setCount] = useState(0)
  const targetValue = parseInt(value.replace(/[^0-9]/g, ''))

  useEffect(() => {
    const duration = 2000
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
      <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
      <div className="relative bg-gradient-to-br from-amber-800/40 to-orange-900/40 backdrop-blur-sm rounded-lg p-6 border border-amber-600/30 hover:border-orange-400/50 transition-all duration-300 transform hover:scale-105">
        <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-2">
          {count.toLocaleString()}{value.includes('+') ? '+' : ''}
        </div>
        <div className="text-amber-200 font-semibold text-lg">{label}</div>
        <div className="absolute top-2 right-2">
          <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default function EnhancedAbout() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const features = [
    {
      icon: <Cog className="h-12 w-12" />,
      title: "Innovation Hub",
      description: "Discover groundbreaking technologies and revolutionary ideas that will shape tomorrow's world.",
      details: "Experience cutting-edge demos, prototype showcases, and breakthrough innovations from leading tech companies and startups.",
      color: "from-amber-600 to-orange-600"
    },
    {
      icon: <Zap className="h-12 w-12" />,
      title: "Electrifying Talks",
      description: "Inspiring presentations from industry leaders and visionary thinkers.",
      details: "Join keynote sessions, panel discussions, and lightning talks featuring renowned experts sharing their insights and predictions.",
      color: "from-orange-600 to-red-600"
    },
    {
      icon: <Wrench className="h-12 w-12" />,
      title: "Hands-on Workshops",
      description: "Interactive sessions where you can build, create, and experiment.",
      details: "Participate in maker spaces, coding bootcamps, and collaborative projects that bring ideas to life.",
      color: "from-red-600 to-pink-600"
    },
    {
      icon: <Gauge className="h-12 w-12" />,
      title: "Networking Engine",
      description: "Connect with like-minded innovators and forge lasting partnerships.",
      details: "Access exclusive networking events, mentorship programs, and collaboration opportunities with industry leaders.",
      color: "from-pink-600 to-purple-600"
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: "Community Building",
      description: "Join a global community of creators, makers, and innovators.",
      details: "Become part of an international network dedicated to pushing the boundaries of technology and creativity.",
      color: "from-purple-600 to-blue-600"
    },
    {
      icon: <Award className="h-12 w-12" />,
      title: "Innovation Awards",
      description: "Recognize and celebrate outstanding achievements in technology.",
      details: "Witness the presentation of prestigious awards honoring breakthrough innovations and exceptional contributions.",
      color: "from-blue-600 to-indigo-600"
    },
    {
      icon: <Globe className="h-12 w-12" />,
      title: "Global Impact",
      description: "Explore solutions for worldwide challenges and opportunities.",
      details: "Discover how technology can address global issues and create positive change across different industries and regions.",
      color: "from-indigo-600 to-amber-600"
    },
    {
      icon: <Calendar className="h-12 w-12" />,
      title: "Future Planning",
      description: "Strategic sessions on emerging trends and future technologies.",
      details: "Participate in forward-thinking discussions about the next decade of technological advancement and innovation.",
      color: "from-green-600 to-amber-600"
    }
  ]

  const stats = [
    { value: "500+", label: "Speakers & Innovators" },
    { value: "10,000+", label: "Expected Attendees" },
    { value: "3", label: "Days of Innovation" },
    { value: "50+", label: "Countries Represented" }
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [features.length])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Enhanced Header */}
      <div className="text-center mb-20">
        <div className="relative inline-block">
          <h2 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 mb-8">
            About Diversion 2026
          </h2>
          <div className="absolute inset-0 text-6xl md:text-8xl font-bold text-amber-500/20 blur-sm">
            About Diversion 2026
          </div>
        </div>
        
        <div className="flex items-center justify-center mb-8">
          <div className="w-16 h-1 bg-gradient-to-r from-transparent to-orange-400"></div>
          <div className="mx-4">
            <Cog className="h-8 w-8 text-orange-400 animate-spin" />
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-transparent"></div>
        </div>
        
        <p className="text-2xl text-amber-100 max-w-4xl mx-auto leading-relaxed">
          Where Victorian ingenuity meets cutting-edge technology. Diversion 2026 is not just a convention—it's a
          journey through time and innovation, bringing together the greatest minds in technology, art, and design.
        </p>
      </div>

      {/* 3D Carousel Section */}
      <div className="mb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Carousel */}
          <div className="h-96 lg:h-[500px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-orange-900/20 rounded-2xl backdrop-blur-sm border border-amber-600/30"></div>
            <Canvas camera={{ position: [0, 5, 12], fov: 60 }}>
              <Carousel3DScene 
                features={features}
                activeIndex={activeFeature}
                onFeatureSelect={setActiveFeature}
              />
              <OrbitControls 
                enableZoom={false}
                enablePan={false}
                autoRotate={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 4}
              />
            </Canvas>
          </div>

          {/* Feature Details */}
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-amber-800/40 to-orange-900/40 backdrop-blur-sm rounded-2xl p-8 border border-amber-600/30">
                <div className="flex items-center mb-6">
                  <div className="text-orange-400 mr-4">
                    {features[activeFeature].icon}
                  </div>
                  <h3 className="text-3xl font-bold text-amber-200">
                    {features[activeFeature].title}
                  </h3>
                </div>
                
                <p className="text-xl text-amber-100 mb-4 leading-relaxed">
                  {features[activeFeature].description}
                </p>
                
                <p className="text-amber-200 leading-relaxed">
                  {features[activeFeature].details}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveFeature(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === activeFeature 
                          ? 'bg-orange-400 scale-125' 
                          : 'bg-amber-600/50 hover:bg-amber-500/70'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setActiveFeature((prev) => (prev - 1 + features.length) % features.length)}
                className="bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Previous
              </button>
              <button
                onClick={() => setActiveFeature((prev) => (prev + 1) % features.length)}
                className="bg-gradient-to-r from-orange-700 to-red-700 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {stats.map((stat, index) => (
          <AnimatedCounter key={index} value={stat.value} label={stat.label} />
        ))}
      </div>

      {/* Call to Action */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 via-orange-600/20 to-red-600/20 rounded-3xl blur-2xl"></div>
        <div className="relative bg-gradient-to-br from-amber-800/30 to-orange-800/30 rounded-3xl p-12 border border-amber-600/30 text-center">
          <h3 className="text-4xl font-bold text-amber-200 mb-6">
            Ready to Shape the Future?
          </h3>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Join us for three extraordinary days of innovation, discovery, and connection. 
            Be part of the steampunk revolution that's redefining technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
              Register Now
            </button>
            <button className="border-2 border-amber-400 text-amber-300 hover:bg-amber-400 hover:text-amber-900 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-xl">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

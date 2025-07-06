"use client"

import React, { useState, useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, Text3D } from "@react-three/drei"
import { Mail, Phone, MapPin, Send, Cog, Zap, Users, Clock, Globe, Steam, Wrench, Settings } from "lucide-react"
import * as THREE from "three"

// 3D Steampunk Telegraph Component
function SteampunkTelegraph({ position, isActive }: { position: [number, number, number], isActive: boolean }) {
  const meshRef = useRef<THREE.Group>(null)
  const [sparks, setSparks] = useState<Array<{ x: number, y: number, z: number, life: number }>>([])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      if (isActive) {
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.1
      }
    }
  })

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setSparks(prev => [
          ...prev.slice(-10),
          {
            x: (Math.random() - 0.5) * 2,
            y: Math.random() * 2,
            z: (Math.random() - 0.5) * 2,
            life: 1
          }
        ])
      }, 200)
      return () => clearInterval(interval)
    }
  }, [isActive])

  return (
    <group ref={meshRef} position={position}>
      {/* Telegraph Base */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[2, 1, 1.5]} />
        <meshStandardMaterial 
          color="#8B4513"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Telegraph Key */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.8, 0.2, 0.3]} />
        <meshStandardMaterial 
          color="#B8860B"
          metalness={0.9}
          roughness={0.2}
          emissive={isActive ? "#FF6B35" : "#000000"}
          emissiveIntensity={isActive ? 0.3 : 0}
        />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
        <meshStandardMaterial color="#CD7F32" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Electric sparks */}
      {sparks.map((spark, i) => (
        <mesh key={i} position={[spark.x, spark.y + 1, spark.z]} scale={0.05}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial 
            color="#FFD700"
            emissive="#FF6B35"
            emissiveIntensity={spark.life}
          />
        </mesh>
      ))}
    </group>
  )
}

// Enhanced 3D Contact Scene with symmetry
function Contact3DScene({ formActive }: { formActive: boolean }) {
  // Deterministic positions for symmetry
  const gearPositions = Array.from({ length: 8 }).map((_, i) => [
    Math.cos((i * Math.PI * 2) / 8) * 4,
    Math.sin(i % 2 === 0 ? 1 : -1) * 1.5,
    Math.sin((i * Math.PI * 2) / 8) * 4,
  ])
  const steamPositions = Array.from({ length: 8 }).map((_, i) => [
    Math.cos((i * Math.PI * 2) / 8) * 2.5,
    2 + Math.sin(i) * 0.5,
    Math.sin((i * Math.PI * 2) / 8) * 2.5,
  ])

  return (
    <>
      <ambientLight intensity={0.4} color="#8B7355" />
      <directionalLight position={[10, 10, 5]} intensity={1.2} color="#DAA520" />
      <pointLight position={[-10, 5, -10]} intensity={0.8} color="#FF6B35" />

      {/* Centered main telegraph */}
      <SteampunkTelegraph position={[0, 0, 0]} isActive={formActive} />
      {/* Mirrored telegraph for symmetry */}
      <SteampunkTelegraph position={[0, 0, -4]} isActive={false} />

      {/* Symmetric floating gears */}
      {gearPositions.map((pos, i) => (
        <Float key={i} speed={1 + i * 0.1} rotationIntensity={0.3} floatIntensity={0.4}>
          <mesh position={pos as [number, number, number]} rotation={[0, 0, i * 0.5]} scale={0.3}>
            <cylinderGeometry args={[1, 1, 0.2, 8]} />
            <meshStandardMaterial 
              color="#CD7F32"
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>
        </Float>
      ))}

      {/* Symmetric steam particles */}
      {steamPositions.map((pos, i) => (
        <Float key={i} speed={0.7 + i * 0.1} rotationIntensity={0.1} floatIntensity={0.6}>
          <mesh position={pos as [number, number, number]} scale={0.13}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial 
              color="#F5F5DC"
              transparent
              opacity={0.3}
            />
          </mesh>
        </Float>
      ))}

      {/* Brass ring for symmetry */}
      <mesh position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]} scale={2.7}>
        <torusGeometry args={[1.5, 0.04, 16, 64]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} opacity={0.25} transparent />
      </mesh>
    </>
  )
}

// Enhanced Input Component with Steampunk Effects
function SteampunkInput({ 
  label, 
  type = "text", 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  rows,
  options 
}: {
  label: string
  type?: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  placeholder?: string
  required?: boolean
  rows?: number
  options?: Array<{ value: string, label: string }>
}) {
  const [isFocused, setIsFocused] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (value) {
      setIsTyping(true)
      const timer = setTimeout(() => setIsTyping(false), 500)
      return () => clearTimeout(timer)
    }
  }, [value])

  const inputClasses = `
    w-full px-6 py-4 bg-gradient-to-r from-amber-900/60 to-orange-900/60 
    border-2 transition-all duration-500 rounded-xl text-amber-100 
    placeholder-amber-300/60 focus:outline-none backdrop-blur-sm
    ${isFocused 
      ? 'border-orange-400 shadow-lg shadow-orange-400/30 scale-105' 
      : 'border-amber-600/50 hover:border-amber-500/70'
    }
    ${isTyping ? 'animate-pulse' : ''}
  `

  return (
    <div className="relative group">
      {/* Glowing background effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-xl blur-xl transition-all duration-500 ${isFocused ? 'opacity-100 scale-110' : 'opacity-0 group-hover:opacity-50'}`}></div>
      
      <div className="relative">
        <label className="block text-amber-200 font-bold mb-3 flex items-center text-lg">
          <Cog className={`h-5 w-5 mr-2 text-orange-400 transition-transform duration-300 ${isFocused ? 'rotate-180' : ''}`} />
          {label} {required && <span className="text-red-400 ml-1">*</span>}
        </label>

        {type === 'textarea' ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            required={required}
            rows={rows || 6}
            className={inputClasses + ' resize-none'}
            placeholder={placeholder}
          />
        ) : type === 'select' ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            required={required}
            className={inputClasses}
          >
            <option value="">Select an option</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value} className="bg-amber-900 text-amber-100">
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            required={required}
            className={inputClasses}
            placeholder={placeholder}
          />
        )}

        {/* Decorative gears */}
        <div className={`absolute right-4 top-12 transition-all duration-300 ${isFocused ? 'rotate-180 text-orange-400' : 'text-amber-600'}`}>
          <Settings className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}

// Animated Contact Info Card
function ContactInfoCard({ 
  icon: Icon, 
  title, 
  details, 
  delay = 0 
}: { 
  icon: any, 
  title: string, 
  details: string[], 
  delay?: number 
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
        
        <div className="relative bg-gradient-to-br from-amber-800/50 to-orange-900/50 backdrop-blur-sm rounded-2xl p-4 sm:p-8 border border-amber-600/30 hover:border-orange-400/60 transition-all duration-500 transform hover:scale-105">
          <div className="flex flex-col sm:flex-row items-start group-hover:animate-pulse gap-2 sm:gap-6">
            <div className="text-orange-400 mb-2 sm:mb-0 sm:mr-6 mt-1 group-hover:text-amber-300 transition-colors duration-300">
              <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <div>
              <h4 className="text-amber-200 font-bold mb-2 sm:mb-3 text-lg sm:text-xl">{title}</h4>
              {details.map((line, index) => (
                <p key={index} className="text-amber-100 mb-1 leading-relaxed text-sm sm:text-base">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Success Animation Component
function SuccessAnimation({ show }: { show: boolean }) {
  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-amber-800/90 to-orange-900/90 backdrop-blur-sm rounded-3xl p-12 border border-amber-600/50 text-center max-w-md mx-4">
        <div className="text-6xl mb-6 animate-bounce">⚙️</div>
        <h3 className="text-3xl font-bold text-amber-200 mb-4">Message Sent!</h3>
        <p className="text-amber-100 mb-6">
          Your message has been transmitted through our steampunk telegraph system. 
          We&apos;ll respond faster than a steam-powered locomotive!
        </p>
        <div className="flex justify-center space-x-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function EnhancedContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formActive, setFormActive] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormActive(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", subject: "", message: "" })
    setIsSubmitting(false)
    setFormActive(false)
    setShowSuccess(true)
    
    setTimeout(() => setShowSuccess(false), 4000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const subjectOptions = [
    { value: "general", label: "General Inquiry" },
    { value: "registration", label: "Registration Help" },
    { value: "speakers", label: "Speaker Information" },
    { value: "sponsorship", label: "Sponsorship Opportunities" },
    { value: "technical", label: "Technical Support" },
    { value: "media", label: "Media & Press" },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Enhanced Header */}
      <div className="text-center mb-20">
        <div className="relative inline-block" style={{ overflow: 'visible' }}>
          <h2 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 mb-8">
            Telegraph Station
          </h2>
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 text-6xl md:text-8xl font-bold text-amber-500/20 blur-sm pointer-events-none select-none z-[-1]" style={{whiteSpace:'nowrap'}}>
            Telegraph Station
          </div>
        </div>
        
        <div className="flex items-center justify-center mb-8">
          <div className="w-20 h-1 bg-gradient-to-r from-transparent to-orange-400"></div>
          <div className="mx-6 flex items-center gap-2">
            <Zap className="h-8 w-8 text-orange-400" />
            <Cog className="h-6 w-6 text-amber-400 animate-spin" />
            <Mail className="h-8 w-8 text-orange-400" />
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-transparent"></div>
        </div>
        
        <p className="text-2xl text-amber-100 max-w-4xl mx-auto leading-relaxed">
          Send your message through our advanced steampunk communication system. 
          Our brass telegraph will transmit your inquiry faster than a steam-powered locomotive!
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* 3D Telegraph Scene */}
        <div className="relative">
          <div className="h-96 lg:h-[500px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-orange-900/20 rounded-3xl backdrop-blur-sm border border-amber-600/30"></div>
            <Canvas camera={{ position: [0, 5, 8], fov: 60 }}>
              <Contact3DScene formActive={formActive} />
              <OrbitControls 
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 4}
              />
            </Canvas>
          </div>

          {/* Contact Information Cards */}
          <div className="mt-8 space-y-6">
            <ContactInfoCard
              icon={Mail}
              title="Telegraph Lines"
              details={[
                "info@diversion2026.com",
                "support@diversion2026.com"
              ]}
              delay={200}
            />

            <ContactInfoCard
              icon={Phone}
              title="Voice Communication"
              details={[
                "+1 (555) 123-4567",
                "Mon-Fri, 9AM-6PM EST"
              ]}
              delay={400}
            />

            <ContactInfoCard
              icon={MapPin}
              title="Headquarters Location"
              details={[
                "Steampunk Convention Center",
                "1234 Innovation Boulevard",
                "Tech City, TC 12345"
              ]}
              delay={600}
            />
          </div>
        </div>

        {/* Enhanced Contact Form */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 via-orange-600/20 to-red-600/20 rounded-3xl blur-2xl"></div>
          
          <div className="relative bg-gradient-to-br from-amber-800/40 to-orange-900/40 backdrop-blur-sm rounded-3xl p-10 border border-amber-600/30">
            <div className="flex items-center mb-8">
              <Zap className="h-8 w-8 text-orange-400 mr-4" />
              <h3 className="text-3xl font-bold text-amber-200">
                Send Telegraph Message
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <SteampunkInput
                  label="Sender Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your distinguished name"
                  required
                />

                <SteampunkInput
                  label="Telegraph Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.address@telegraph.com"
                  required
                />
              </div>

              <SteampunkInput
                label="Message Category"
                type="select"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                options={subjectOptions}
                required
              />

              <SteampunkInput
                label="Telegraph Message"
                type="textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Compose your message for transmission..."
                rows={6}
                required
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:from-gray-500 disabled:to-gray-600 text-white px-8 py-5 rounded-xl font-bold text-xl transition-all duration-500 transform hover:scale-105 flex items-center justify-center shadow-2xl ${isSubmitting ? 'animate-pulse' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <Cog className="h-6 w-6 mr-3 animate-spin" />
                    Transmitting Message...
                  </>
                ) : (
                  <>
                    <Send className="h-6 w-6 mr-3" />
                    Send Telegraph
                  </>
                )}
              </button>
            </form>

            {/* Decorative elements */}
            <div className="absolute top-6 right-6 opacity-20">
              <Settings className="h-8 w-8 text-amber-400 animate-spin" style={{ animationDuration: '10s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Response Time Stats */}
      <div className="mt-20 grid md:grid-cols-4 gap-8">
        {[
          { icon: Clock, value: "<2h", label: "General Inquiries", color: "from-amber-600 to-orange-600" },
          { icon: Zap, value: "<24h", label: "Technical Support", color: "from-orange-600 to-red-600" },
          { icon: Users, value: "24/7", label: "Emergency Line", color: "from-red-600 to-pink-600" },
          { icon: Globe, value: "Global", label: "Coverage", color: "from-pink-600 to-purple-600" }
        ].map((stat, index) => (
          <div key={index} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-gradient-to-br from-amber-800/40 to-orange-900/40 backdrop-blur-sm rounded-xl p-6 border border-amber-600/30 hover:border-orange-400/50 transition-all duration-300 transform hover:scale-105 text-center">
              <div className="text-orange-400 mb-3 flex justify-center group-hover:text-amber-300 transition-colors duration-300">
                <stat.icon className="h-8 w-8" />
              </div>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-2">
                {stat.value}
              </div>
              <div className="text-amber-200 font-semibold">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <SuccessAnimation show={showSuccess} />
    </div>
  )
}

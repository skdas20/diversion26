"use client"
import React, { useEffect, useRef, useState, useCallback } from "react"

// Enhanced SVG gear with more intricate details
const EnhancedGearSVG = ({
  size = 40,
  color = "#B8860B",
  rotation = 0,
  style = {},
  shadow = true,
  glowIntensity = 0,
}: {
  size?: number
  color?: string
  rotation?: number
  style?: React.CSSProperties
  shadow?: boolean
  glowIntensity?: number
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    style={{
      transform: `rotate(${rotation}deg)`,
      filter: shadow 
        ? `drop-shadow(0 2px 6px #0008) drop-shadow(0 0 ${8 + glowIntensity * 12}px ${color}${Math.floor(glowIntensity * 255).toString(16).padStart(2, '0')})` 
        : undefined,
      ...style,
    }}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="gearGradient" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FFD700" stopOpacity={0.8 + glowIntensity * 0.2} />
        <stop offset="40%" stopColor={color} />
        <stop offset="100%" stopColor="#654321" />
      </radialGradient>
      <radialGradient id="centerGradient" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FFFACD" />
        <stop offset="50%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#B8860B" />
      </radialGradient>
    </defs>
    
    {/* Outer ring */}
    <circle cx="32" cy="32" r="22" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
    
    {/* Main gear body */}
    <circle cx="32" cy="32" r="18" fill="url(#gearGradient)" stroke="#654321" strokeWidth="2" />
    
    {/* Enhanced gear teeth with varied sizes */}
    {Array.from({ length: 16 }).map((_, i) => {
      const angle = (i * Math.PI * 2) / 16
      const isLarge = i % 2 === 0
      const radius = isLarge ? 24 : 22
      const x = 32 + Math.cos(angle) * radius
      const y = 32 + Math.sin(angle) * radius
      const width = isLarge ? 7 : 5
      const height = isLarge ? 12 : 8
      
      return (
        <rect
          key={i}
          x={x - width/2}
          y={y - height/2}
          width={width}
          height={height}
          rx="2"
          fill="url(#gearGradient)"
          stroke="#654321"
          strokeWidth="1"
          transform={`rotate(${(angle * 180) / Math.PI},${x},${y})`}
        />
      )
    })}
    
    {/* Inner mechanical details */}
    <circle cx="32" cy="32" r="12" fill="none" stroke="#8B6914" strokeWidth="1.5" opacity="0.8" />
    
    {/* Rivets */}
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * Math.PI * 2) / 8
      const x = 32 + Math.cos(angle) * 14
      const y = 32 + Math.sin(angle) * 14
      return (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="1.5"
          fill="#2F2F2F"
          stroke="#8B6914"
          strokeWidth="0.5"
        />
      )
    })}
    
    {/* Center bolt with enhanced details */}
    <circle cx="32" cy="32" r="6" fill="url(#centerGradient)" stroke="#654321" strokeWidth="1.5" />
    <circle cx="32" cy="32" r="3" fill="#2F2F2F" stroke="#8B6914" strokeWidth="1" />
    
    {/* Cross pattern in center */}
    <path d="M29,32 L35,32 M32,29 L32,35" stroke="#654321" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

// Steam particle component
const SteamParticle = ({ 
  x, 
  y, 
  opacity, 
  scale 
}: { 
  x: number
  y: number
  opacity: number
  scale: number
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "radial-gradient(circle, #F5F5DC, transparent)",
      opacity,
      transform: `scale(${scale})`,
      pointerEvents: "none",
    }}
  />
)

// Spark effect component
const SparkEffect = ({ 
  particles 
}: { 
  particles: Array<{x: number, y: number, opacity: number, color: string}>
}) => (
  <>
    {particles.map((particle, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: particle.x,
          top: particle.y,
          width: 2,
          height: 2,
          background: particle.color,
          borderRadius: "50%",
          opacity: particle.opacity,
          boxShadow: `0 0 4px ${particle.color}`,
          pointerEvents: "none",
        }}
      />
    ))}
  </>
)

// Trail effect component
const TrailEffect = ({ 
  trail 
}: { 
  trail: Array<{x: number, y: number, opacity: number}>
}) => (
  <>
    {trail.map((point, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: point.x - 2,
          top: point.y - 2,
          width: 4,
          height: 4,
          background: "radial-gradient(circle, #B8860B, transparent)",
          borderRadius: "50%",
          opacity: point.opacity,
          pointerEvents: "none",
        }}
      />
    ))}
  </>
)

const INTERACTIVE_SELECTORS = 'button, a, [role="button"], [tabindex]:not([tabindex="-1"]), input, textarea, select'

export default function EnhancedSteampunkCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [color, setColor] = useState("#B8860B")
  const [speed, setSpeed] = useState(0.3)
  const [size, setSize] = useState(40)
  const [glowIntensity, setGlowIntensity] = useState(0)
  const [velocity, setVelocity] = useState({ x: 0, y: 0 })
  
  // Steam particles state
  const [steamParticles, setSteamParticles] = useState<Array<{
    id: number
    x: number
    y: number
    opacity: number
    scale: number
    vx: number
    vy: number
    life: number
  }>>([])
  
  // Spark effects state
  const [sparks, setSparks] = useState<Array<{
    x: number
    y: number
    opacity: number
    color: string
    vx: number
    vy: number
    life: number
  }>>([])
  
  // Trail effect state
  const [trail, setTrail] = useState<Array<{
    x: number
    y: number
    opacity: number
    timestamp: number
  }>>([])

  // Enhanced mouse tracking with smooth following
  useEffect(() => {
    const move = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY })
      
      // Calculate velocity for effects
      const newVelocity = {
        x: e.clientX - targetPos.x,
        y: e.clientY - targetPos.y
      }
      setVelocity(newVelocity)
      
      // Add trail point
      setTrail(prev => [
        ...prev.slice(-15), // Keep last 15 points
        {
          x: e.clientX,
          y: e.clientY,
          opacity: 1,
          timestamp: Date.now()
        }
      ])
    }
    
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [targetPos])

  // Smooth cursor following animation
  useEffect(() => {
    let frame: number
    function animate() {
      setPos(prev => ({
        x: prev.x + (targetPos.x - prev.x) * 0.15,
        y: prev.y + (targetPos.y - prev.y) * 0.15
      }))
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [targetPos])

  // Enhanced rotation with velocity-based speed
  useEffect(() => {
    let frame: number
    let last = performance.now()
    
    function animate(now: number) {
      const dt = (now - last) / 1000
      last = now
      
      const velocityMagnitude = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y)
      const dynamicSpeed = speed + velocityMagnitude * 0.1
      
      setRotation(r => r + dynamicSpeed * 120 * dt)
      frame = requestAnimationFrame(animate)
    }
    
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [speed, velocity])

  // Click effects
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      setClicking(true)
      setSize(50)
      setGlowIntensity(1)
      
      // Create spark explosion
      const sparkCount = 12
      const newSparks = Array.from({ length: sparkCount }, (_, i) => {
        const angle = (i * Math.PI * 2) / sparkCount
        const speed = 2 + Math.random() * 3
        return {
          x: e.clientX,
          y: e.clientY,
          opacity: 1,
          color: Math.random() > 0.5 ? "#FFD700" : "#FF6B35",
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1
        }
      })
      setSparks(prev => [...prev, ...newSparks])
    }
    
    const handleMouseUp = () => {
      setClicking(false)
      setSize(40)
      setGlowIntensity(0)
    }
    
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    
    return () => {
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  // Steam particle system
  useEffect(() => {
    let frame: number
    
    function updateParticles() {
      // Add new steam particles when moving fast
      const velocityMagnitude = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y)
      if (velocityMagnitude > 5 && Math.random() > 0.7) {
        setSteamParticles(prev => [
          ...prev.slice(-20), // Keep last 20 particles
          {
            id: Date.now(),
            x: pos.x + (Math.random() - 0.5) * 20,
            y: pos.y + (Math.random() - 0.5) * 20,
            opacity: 0.6,
            scale: 0.5 + Math.random() * 0.5,
            vx: (Math.random() - 0.5) * 2,
            vy: -Math.random() * 3 - 1,
            life: 1
          }
        ])
      }
      
      // Update existing particles
      setSteamParticles(prev => prev
        .map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          opacity: particle.opacity * 0.95,
          scale: particle.scale * 1.02,
          life: particle.life * 0.98
        }))
        .filter(particle => particle.life > 0.1)
      )
      
      // Update sparks
      setSparks(prev => prev
        .map(spark => ({
          ...spark,
          x: spark.x + spark.vx,
          y: spark.y + spark.vy,
          opacity: spark.opacity * 0.92,
          vy: spark.vy + 0.1, // Gravity
          life: spark.life * 0.95
        }))
        .filter(spark => spark.life > 0.1)
      )
      
      // Update trail
      const now = Date.now()
      setTrail(prev => prev
        .map(point => ({
          ...point,
          opacity: Math.max(0, 1 - (now - point.timestamp) / 500)
        }))
        .filter(point => point.opacity > 0.05)
      )
      
      frame = requestAnimationFrame(updateParticles)
    }
    
    frame = requestAnimationFrame(updateParticles)
    return () => cancelAnimationFrame(frame)
  }, [velocity, pos])

  // Enhanced hover detection with different cursor states
  useEffect(() => {
    function onOver(e: Event) {
      const target = e.target as HTMLElement
      setHovering(true)
      
      // Different effects for different elements
      if (target.tagName === 'BUTTON') {
        setColor("#FF6B35") // Orange for buttons
        setSpeed(1.5)
        setSize(55)
        setGlowIntensity(0.8)
      } else if (target.tagName === 'A') {
        setColor("#32CD32") // Green for links
        setSpeed(1.2)
        setSize(50)
        setGlowIntensity(0.6)
      } else {
        setColor("#FFD700") // Gold for other interactive elements
        setSpeed(1.0)
        setSize(45)
        setGlowIntensity(0.4)
      }
    }
    
    function onOut() {
      setHovering(false)
      setColor("#B8860B")
      setSpeed(0.3)
      setSize(40)
      setGlowIntensity(0)
    }
    
    const els = Array.from(document.querySelectorAll(INTERACTIVE_SELECTORS))
    els.forEach((el) => {
      el.addEventListener("mouseenter", onOver)
      el.addEventListener("mouseleave", onOut)
    })
    
    return () => {
      els.forEach((el) => {
        el.removeEventListener("mouseenter", onOver)
        el.removeEventListener("mouseleave", onOut)
      })
    }
  }, [])

  // Hide system cursor
  useEffect(() => {
    const style = document.createElement("style")
    style.innerHTML = `body, * { cursor: none !important; }`
    document.head.appendChild(style)
    return () => { 
      if (document.head.contains(style)) {
        document.head.removeChild(style) 
      }
    }
  }, [])

  return (
    <>
      {/* Trail effect */}
      <TrailEffect trail={trail} />
      
      {/* Steam particles */}
      {steamParticles.map(particle => (
        <SteamParticle
          key={particle.id}
          x={particle.x}
          y={particle.y}
          opacity={particle.opacity}
          scale={particle.scale}
        />
      ))}
      
      {/* Spark effects */}
      <SparkEffect particles={sparks} />
      
      {/* Main cursor */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          left: pos.x - size/2,
          top: pos.y - size/2,
          width: size,
          height: size,
          pointerEvents: "none",
          zIndex: 9999,
          transition: hovering || clicking 
            ? "width 0.2s ease, height 0.2s ease" 
            : "width 0.3s ease, height 0.3s ease",
          willChange: "transform, filter, width, height",
        }}
      >
        <EnhancedGearSVG 
          size={size} 
          color={color} 
          rotation={rotation} 
          glowIntensity={glowIntensity}
        />
        
        {/* Additional glow effect when clicking */}
        {clicking && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: size * 1.5,
              height: size * 1.5,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${color}33, transparent)`,
              animation: "pulse 0.3s ease-out",
              pointerEvents: "none",
            }}
          />
        )}
      </div>
      
      {/* CSS animations */}
      <style jsx>{`
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
        }
      `}</style>
    </>
  )
}

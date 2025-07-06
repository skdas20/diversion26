"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Settings, Zap, Compass, Users, Calendar, Mail, BookOpen, HelpCircle, Award, Home, Cog } from "lucide-react"

// Enhanced Diversion Logo Component
function DiversionLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center space-x-4 group ${className}`}>
      {/* Half Gear Top */}
      <div className="relative">
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <svg
            width="48"
            height="24"
            viewBox="0 0 64 32"
            className="text-amber-400 animate-spin-slow origin-bottom"
            style={{
              filter: "drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))",
              animationDuration: "8s"
            }}
          >
            <defs>
              <radialGradient id="gearGradientTop" cx="50%" cy="100%" r="80%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="#B8860B" />
                <stop offset="100%" stopColor="#8B6914" />
              </radialGradient>
            </defs>
            {/* Half gear body - top */}
            <path
              d="M 32 32 A 20 20 0 0 0 12 32 Z"
              fill="url(#gearGradientTop)"
              stroke="#654321"
              strokeWidth="1.5"
            />
            {/* Gear teeth - top half */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * Math.PI) / 8 - Math.PI / 2
              const x = 32 + Math.cos(angle) * 24
              const y = 32 + Math.sin(angle) * 24
              return (
                <rect
                  key={i}
                  x={x - 2}
                  y={y - 4}
                  width="4"
                  height="8"
                  rx="1"
                  fill="url(#gearGradientTop)"
                  stroke="#654321"
                  strokeWidth="1"
                  transform={`rotate(${(angle * 180) / Math.PI + 90},${x},${y})`}
                />
              )
            })}
            {/* Center hub - top */}
            <circle cx="32" cy="32" r="6" fill="#FFD700" stroke="#8B6914" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Main Logo Text */}
        <div className="flex flex-col items-center relative z-10">
          <span 
            className="text-4xl md:text-5xl font-bold tracking-wider"
            style={{
              fontFamily: "'Cinzel', 'Times New Roman', serif",
              background: "linear-gradient(45deg, #D4AF37 0%, #B8860B 25%, #CD853F 50%, #DAA520 75%, #FFD700 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              filter: "drop-shadow(0 0 10px rgba(212, 175, 55, 0.4))"
            }}
          >
            DIVERSION
          </span>
          <span 
            className="text-2xl md:text-3xl font-bold -mt-2"
            style={{
              fontFamily: "'Cinzel', 'Times New Roman', serif",
              background: "linear-gradient(45deg, #CD853F 0%, #B8860B 50%, #8B6914 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)"
            }}
          >
            2026
          </span>
        </div>

        {/* Half Gear Bottom */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
          <svg
            width="48"
            height="24"
            viewBox="0 0 64 32"
            className="text-amber-400 animate-spin-reverse origin-top"
            style={{
              filter: "drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))",
              animationDuration: "10s"
            }}
          >
            <defs>
              <radialGradient id="gearGradientBottom" cx="50%" cy="0%" r="80%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="#B8860B" />
                <stop offset="100%" stopColor="#8B6914" />
              </radialGradient>
            </defs>
            {/* Half gear body - bottom */}
            <path
              d="M 12 0 A 20 20 0 0 0 52 0 Z"
              fill="url(#gearGradientBottom)"
              stroke="#654321"
              strokeWidth="1.5"
            />
            {/* Gear teeth - bottom half */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * Math.PI) / 8 + Math.PI / 2
              const x = 32 + Math.cos(angle) * 24
              const y = 0 + Math.sin(angle) * 24
              return (
                <rect
                  key={i}
                  x={x - 2}
                  y={y - 4}
                  width="4"
                  height="8"
                  rx="1"
                  fill="url(#gearGradientBottom)"
                  stroke="#654321"
                  strokeWidth="1"
                  transform={`rotate(${(angle * 180) / Math.PI + 90},${x},${y})`}
                />
              )
            })}
            {/* Center hub - bottom */}
            <circle cx="32" cy="0" r="6" fill="#FFD700" stroke="#8B6914" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Steam particles */}
        <div className="absolute top-0 right-0 opacity-60">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full animate-float"
              style={{
                right: `${i * 8}px`,
                top: `${i * 4}px`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + i * 0.5}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function GearIcon({ className = "", spinning = false }) {
  return (
    <Cog
      className={`h-6 w-6 text-amber-400 transition-transform duration-500 ${spinning ? "animate-spin-slow" : ""} ${className}`}
      style={{ filter: "drop-shadow(0 0 6px rgba(251,191,36,0.4))" }}
    />
  );
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/#hero", label: "Home", icon: <Home className="h-4 w-4" /> },
    { href: "/#about", label: "About", icon: <Compass className="h-4 w-4" /> },
    { href: "/#achievements", label: "Achievements", icon: <Award className="h-4 w-4" /> },
    { href: "/#schedule", label: "Schedule", icon: <Calendar className="h-4 w-4" /> },
    { href: "/#contact", label: "Contact", icon: <Mail className="h-4 w-4" /> },
  ]

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      if (isHomePage) {
        // On home page, scroll to section
        const sectionId = href.substring(2)
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        // Not on home page, navigate to home then scroll
        router.push(href)
      }
    }
  }

  const pageLinks = [
    { href: "/guide", label: "Guide", icon: <BookOpen className="h-4 w-4" /> },
    { href: "/faq", label: "FAQ", icon: <HelpCircle className="h-4 w-4" /> },
    { href: "/lineup", label: "Lineup", icon: <Users className="h-4 w-4" /> },
    { href: "/people", label: "People", icon: <Users className="h-4 w-4" /> },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-gradient-to-r from-stone-900/95 via-neutral-800/95 to-zinc-900/95 backdrop-blur-md shadow-2xl border-b border-amber-600/20"
            : "bg-transparent"
        }`}
      >
        <div className="px-6">
          <div className="flex items-center justify-between h-32 md:h-36 py-4 md:py-6">
            {/* Enhanced Diversion Logo */}
            <Link href="/" className="transition-transform duration-300 hover:scale-105">
              <DiversionLogo />
            </Link>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-2">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="group flex items-center space-x-3 text-stone-200 hover:text-amber-400 px-6 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:bg-stone-800/40 hover:shadow-2xl relative"
                  >
                    <span className="transition-transform duration-300 group-hover:scale-125">
                      <GearIcon spinning={true} className="opacity-0 group-hover:opacity-100 absolute -left-8 top-1/2 -translate-y-1/2 group-hover:rotate-180" />
                    </span>
                    <span className="transition-transform duration-300 group-hover:scale-110">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}

                {/* Decorative separator */}
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-amber-600 to-transparent mx-4" />

                {pageLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-center space-x-3 text-stone-200 hover:text-amber-400 px-6 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:bg-stone-800/40 hover:shadow-2xl relative"
                  >
                    <span className="transition-transform duration-300 group-hover:scale-125">
                      <GearIcon spinning={true} className="opacity-0 group-hover:opacity-100 absolute -left-8 top-1/2 -translate-y-1/2 group-hover:rotate-180" />
                    </span>
                    <span className="transition-transform duration-300 group-hover:scale-110">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-stone-200 hover:text-amber-400 transition-colors duration-300"
              >
                <Cog className="h-8 w-8 animate-spin-slow" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-stone-900/95 backdrop-blur-md rounded-lg border border-amber-600/20 mb-4">
                {[...navItems, ...pageLinks].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-3 text-stone-200 hover:text-amber-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <style jsx global>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) scale(1);
            opacity: 0.4;
          }
          50% { 
            transform: translateY(-10px) scale(1.2);
            opacity: 0.8;
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 10s linear infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}

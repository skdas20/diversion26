"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Settings, Zap, Compass, Users, Calendar, Mail, BookOpen, HelpCircle, Award, Home, Menu, X } from "lucide-react"

function GearIcon({ className = "", spinning = false }) {
  return (
    <Settings
      className={`h-6 w-6 text-amber-400 transition-transform duration-500 ${spinning ? "animate-spin-slow" : ""} ${className}`}
      style={{ filter: "drop-shadow(0 0 6px rgba(251,191,36,0.4))" }}
    />
  );
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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
    setIsMobileMenuOpen(false) // Close mobile menu when navigating
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
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 overflow-x-hidden ${
        scrolled
          ? "bg-gradient-to-r from-stone-900/95 via-neutral-800/95 to-zinc-900/95 backdrop-blur-md shadow-2xl border-b border-amber-600/20"
          : "bg-transparent"
      }`}
    >
      <div className="px-2 sm:px-4 md:px-6 w-full max-w-full overflow-x-hidden">
        <div className="flex items-center justify-between h-20 md:h-28 py-3 md:py-4 w-full max-w-full">
          {/* Enhanced Logo - now clickable to go home */}
          <Link href="/" className="flex items-center space-x-2 md:space-x-3 group min-w-0 flex-shrink-0">
            <div className="relative">
              <Settings
                className="h-8 w-8 md:h-12 md:w-12 text-amber-400 transition-all duration-300 group-hover:rotate-180"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(251, 191, 36, 0.5))",
                  animation: "spin 8s linear infinite",
                }}
              />
              <Zap className="h-3 w-3 md:h-5 md:w-5 text-orange-400 absolute top-1 left-1 md:top-2 md:left-2 animate-pulse" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="truncate text-xl md:text-3xl font-bold bg-gradient-to-r from-amber-300 via-orange-400 to-red-500 bg-clip-text text-transparent">
                DIVERSION
              </span>
              <span className="text-sm md:text-xl font-semibold text-stone-300 -mt-1">2026</span>
            </div>
          </Link>

          {/* Mobile Menu Button - Fixed positioning */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden fixed top-6 right-4 z-50 p-3 rounded-lg bg-stone-800/90 backdrop-blur-sm text-amber-400 hover:text-amber-300 transition-all duration-300 shadow-lg border border-amber-600/30"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

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
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 bg-gradient-to-b from-stone-900/98 via-neutral-800/98 to-zinc-900/98 backdrop-blur-md z-40 transition-all duration-300 w-full max-w-full overflow-x-hidden` +
            (isMobileMenuOpen
              ? " opacity-100 pointer-events-auto"
              : " opacity-0 pointer-events-none")
          }
        >
          <div className="flex flex-col pt-24 px-6 space-y-4 max-w-full overflow-x-hidden">
            {/* Home Navigation Items */}
            <div className="space-y-2">
              <h3 className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-4">
                Navigation
              </h3>
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="w-full group flex items-center space-x-4 text-stone-200 hover:text-amber-400 py-4 px-4 rounded-xl text-lg font-medium transition-all duration-300 hover:bg-stone-800/60"
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Decorative separator */}
            <div className="h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent my-6" />

            {/* Page Links */}
            <div className="space-y-2">
              <h3 className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-4">
                Pages
              </h3>
              {pageLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full group flex items-center space-x-4 text-stone-200 hover:text-amber-400 py-4 px-4 rounded-xl text-lg font-medium transition-all duration-300 hover:bg-stone-800/60"
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }
      `}</style>
    </nav>
  )
}

"use client"

import React from "react"

export default function SteampunkFooter() {
  return (
    <footer className="bg-gradient-to-t from-amber-950/90 to-amber-900/60 border-t border-amber-700/40 shadow-inner relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <span className="inline-block">
            <svg width="38" height="38" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="16" fill="#B8860B" stroke="#8B6914" strokeWidth="2" />
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * Math.PI * 2) / 8
                const x = 32 + Math.cos(angle) * 20
                const y = 32 + Math.sin(angle) * 20
                return (
                  <rect
                    key={i}
                    x={x - 2}
                    y={y - 5}
                    width="4"
                    height="10"
                    rx="1.2"
                    fill="#B8860B"
                    stroke="#8B6914"
                    strokeWidth="1"
                    transform={`rotate(${(angle * 180) / Math.PI},${x},${y})`}
                  />
                )
              })}
              <circle cx="32" cy="32" r="4" fill="#FFD700" stroke="#8B6914" strokeWidth="1.2" />
            </svg>
          </span>
          <span className="text-2xl font-bold text-amber-200 tracking-wider drop-shadow-lg">Diversion 2026</span>
        </div>
        <nav className="flex flex-wrap gap-6 text-amber-100 font-medium text-lg">
          <a href="/" className="hover:text-orange-400 transition-colors duration-200">Home</a>
          <a href="/guide" className="hover:text-orange-400 transition-colors duration-200">Guide</a>
          <a href="/faq" className="hover:text-orange-400 transition-colors duration-200">FAQ</a>
          <a href="/lineup" className="hover:text-orange-400 transition-colors duration-200">Lineup</a>
          <a href="/people" className="hover:text-orange-400 transition-colors duration-200">People</a>
          <a href="/contact" className="hover:text-orange-400 transition-colors duration-200">Contact</a>
        </nav>
        <div className="text-amber-300 text-sm md:text-right">
          <div className="flex items-center gap-2 justify-center md:justify-end">
            <span className="inline-block animate-spin-slow">
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="8" fill="#B8860B" stroke="#8B6914" strokeWidth="1.2" />
                {Array.from({ length: 6 }).map((_, i) => {
                  const angle = (i * Math.PI * 2) / 6
                  const x = 16 + Math.cos(angle) * 11
                  const y = 16 + Math.sin(angle) * 11
                  return (
                    <rect
                      key={i}
                      x={x - 1}
                      y={y - 3}
                      width="2"
                      height="6"
                      rx="0.8"
                      fill="#B8860B"
                      stroke="#8B6914"
                      strokeWidth="0.7"
                      transform={`rotate(${(angle * 180) / Math.PI},${x},${y})`}
                    />
                  )
                })}
                <circle cx="16" cy="16" r="2" fill="#FFD700" stroke="#8B6914" strokeWidth="0.7" />
              </svg>
            </span>
            <span>© {new Date().getFullYear()} Steampunk Observatory. All rights reserved.</span>
          </div>
          <div className="mt-1 text-amber-500 text-xs">Designed with gears, steam, and innovation.</div>
        </div>
      </div>
      {/* Subtle animated gear background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <svg width="100%" height="100%" viewBox="0 0 400 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <circle cx="60" cy="40" r="30" fill="#B8860B" opacity="0.15" />
            <circle cx="200" cy="60" r="18" fill="#B8860B" opacity="0.12" />
            <circle cx="340" cy="35" r="22" fill="#B8860B" opacity="0.10" />
          </g>
        </svg>
      </div>
      <style>{`
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </footer>
  )
}

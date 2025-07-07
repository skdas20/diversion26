"use client";

import { useEffect, useState } from "react";

export default function SimpleLoading() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Steampunk-style gear animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 border-4 border-amber-500 rounded-full animate-spin relative">
            <div className="absolute top-2 left-2 w-4 h-4 bg-amber-400 rounded-full"></div>
            <div className="absolute top-2 right-2 w-4 h-4 bg-amber-400 rounded-full"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 bg-amber-400 rounded-full"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 bg-amber-400 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-amber-600 rounded-full"></div>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-amber-400 rounded-full animate-pulse"></div>
        </div>

        {/* Loading text */}
        <h1 className="text-4xl md:text-6xl font-bold text-amber-100 mb-4 tracking-wider">
          DIVERSION
        </h1>
        <p className="text-xl text-amber-200 mb-8">
          Loading the Experience{dots}
        </p>
        
        {/* Progress bar */}
        <div className="w-64 h-2 bg-amber-900 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full animate-pulse"></div>
        </div>
        
        <p className="text-sm text-amber-300 mt-4 opacity-75">
          Preparing something extraordinary...
        </p>
      </div>
      
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { left: 15, top: 20, delay: 0.5, duration: 3 },
          { left: 85, top: 30, delay: 1.2, duration: 2.5 },
          { left: 45, top: 80, delay: 0.8, duration: 3.5 },
          { left: 70, top: 15, delay: 1.8, duration: 2.8 },
          { left: 25, top: 60, delay: 0.3, duration: 3.2 },
          { left: 90, top: 75, delay: 1.5, duration: 2.2 },
          { left: 10, top: 90, delay: 0.9, duration: 3.8 },
          { left: 60, top: 45, delay: 1.1, duration: 2.9 },
          { left: 35, top: 25, delay: 0.6, duration: 3.1 },
          { left: 80, top: 85, delay: 1.7, duration: 2.4 },
          { left: 5, top: 50, delay: 0.4, duration: 3.6 },
          { left: 95, top: 10, delay: 1.9, duration: 2.7 },
          { left: 55, top: 70, delay: 0.7, duration: 3.3 },
          { left: 20, top: 35, delay: 1.3, duration: 2.6 },
          { left: 75, top: 55, delay: 1.0, duration: 3.4 },
          { left: 40, top: 95, delay: 0.2, duration: 2.3 },
          { left: 65, top: 5, delay: 1.6, duration: 3.7 },
          { left: 30, top: 65, delay: 1.4, duration: 2.1 },
          { left: 85, top: 40, delay: 0.1, duration: 3.9 },
          { left: 50, top: 85, delay: 1.8, duration: 2.5 },
        ].map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400 rounded-full animate-ping"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

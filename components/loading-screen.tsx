"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Sparkles, Center, Text3D, useTexture, Cylinder, Sphere } from "@react-three/drei";
import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";
import * as THREE_CORE from "three";

// Enhanced Steampunk Gear with more detail
function SteampunkGear({
  position,
  scale = 1,
  speed = 0.02,
  reverse = false,
  glowIntensity = 0.3,
}: {
  position: [number, number, number];
  scale?: number;
  speed?: number;
  reverse?: boolean;
  glowIntensity?: number;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += reverse ? -speed : speed;
    }
    if (glowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.2 + 0.8;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={meshRef} position={position} scale={scale}>
      {/* Glowing aura */}
      <mesh ref={glowRef}>
        <ringGeometry args={[1.8, 2.2, 32]} />
        <meshBasicMaterial
          color="#ff6b35"
          transparent
          opacity={glowIntensity}
          side={THREE_CORE.DoubleSide}
        />
      </mesh>

      {/* Main gear body with brass texture */}
      <mesh>
        <cylinderGeometry args={[1.2, 1.2, 0.4, 24]} />
        <meshStandardMaterial
          color="#b8860b"
          metalness={0.9}
          roughness={0.2}
          emissive="#ff6b35"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Outer ring */}
      <mesh>
        <torusGeometry args={[1.4, 0.1, 8, 32]} />
        <meshStandardMaterial
          color="#8b4513"
          metalness={1.0}
          roughness={0.1}
        />
      </mesh>

      {/* Gear teeth with improved geometry */}
      {Array.from({ length: 16 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI * 2) / 16) * 1.35,
            Math.sin((i * Math.PI * 2) / 16) * 1.35,
            0,
          ]}
          rotation={[0, 0, (i * Math.PI * 2) / 16]}
        >
          <boxGeometry args={[0.12, 0.5, 0.5]} />
          <meshStandardMaterial
            color="#cd853f"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* Center hub with spokes */}
      <mesh>
        <cylinderGeometry args={[0.2, 0.2, 0.6, 8]} />
        <meshStandardMaterial
          color="#2f2f2f"
          metalness={1.0}
          roughness={0.0}
        />
      </mesh>

      {/* Spokes */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI * 2) / 6) * 0.6,
            Math.sin((i * Math.PI * 2) / 6) * 0.6,
            0,
          ]}
          rotation={[0, 0, (i * Math.PI * 2) / 6]}
        >
          <boxGeometry args={[0.8, 0.08, 0.08]} />
          <meshStandardMaterial
            color="#4a4a4a"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Decorative rivets */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI * 2) / 8) * 0.9,
            Math.sin((i * Math.PI * 2) / 8) * 0.9,
            0.25,
          ]}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color="#2f2f2f"
            metalness={1.0}
            roughness={0.0}
          />
        </mesh>
      ))}
    </group>
  );
}

// Enhanced Steam Effect with particle system
function EnhancedSteamEffect({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const steamParticles = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      offset: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 0.5,
      scale: 0.3 + Math.random() * 0.4,
    }))
  , []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.children.forEach((child, i) => {
        const particle = steamParticles[i];
        if (particle) {
          child.position.y = Math.sin(time * particle.speed + particle.offset) * 1.5;
          child.position.x = Math.cos(time * particle.speed * 0.5 + particle.offset) * 0.3;
          const scale = particle.scale * (1 + Math.sin(time * 2 + particle.offset) * 0.3);
          child.scale.setScalar(scale);
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {steamParticles.map((particle) => (
        <mesh key={particle.id}>
          <sphereGeometry args={[0.4, 12, 12]} />
          <meshStandardMaterial
            color="#f5f5dc"
            transparent
            opacity={0.3}
            emissive="#ffffff"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// Steampunk Pipe System
function SteampunkPipes() {
  const pipeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (pipeRef.current) {
      pipeRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={pipeRef}>
      {/* Main horizontal pipe */}
      <mesh position={[0, -4, -2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 12, 16]} />
        <meshStandardMaterial
          color="#8b4513"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Vertical pipes */}
      <mesh position={[-4, -2, -2]}>
        <cylinderGeometry args={[0.2, 0.2, 4, 12]} />
        <meshStandardMaterial
          color="#cd853f"
          metalness={0.7}
          roughness={0.4}
        />
      </mesh>

      <mesh position={[4, -2, -2]}>
        <cylinderGeometry args={[0.2, 0.2, 4, 12]} />
        <meshStandardMaterial
          color="#cd853f"
          metalness={0.7}
          roughness={0.4}
        />
      </mesh>

      {/* Pipe joints */}
      {[-4, 0, 4].map((x, i) => (
        <mesh key={i} position={[x, -4, -2]}>
          <sphereGeometry args={[0.4, 12, 12]} />
          <meshStandardMaterial
            color="#2f2f2f"
            metalness={1.0}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

// Floating Mechanical Elements
function FloatingMechanics() {
  return (
    <>
      {/* Floating cogwheels */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[-10, 2, -5]} scale={0.6}>
          <torusGeometry args={[0.8, 0.2, 8, 16]} />
          <meshStandardMaterial
            color="#b8860b"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh position={[10, 1, -3]} scale={0.4}>
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial
            color="#ff6b35"
            metalness={0.8}
            roughness={0.1}
            emissive="#ff6b35"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      {/* Floating brass spheres */}
      {Array.from({ length: 6 }).map((_, i) => (
        <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.1} floatIntensity={0.4}>
          <mesh
            position={[
              (Math.random() - 0.5) * 20,
              Math.random() * 6 - 1,
              (Math.random() - 0.5) * 10 - 5,
            ]}
            scale={0.2 + Math.random() * 0.3}
          >
            <sphereGeometry args={[1, 12, 12]} />
            <meshStandardMaterial
              color="#cd853f"
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

// Enhanced Loading Scene
function LoadingScene({ loadingProgress }: { loadingProgress: number }) {
  const sceneRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (sceneRef.current) {
      sceneRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={sceneRef}>
      {/* Enhanced fog and atmosphere */}
      <fog attach="fog" args={["#1a0f0a", 8, 40]} />

      {/* Advanced lighting setup */}
      <ambientLight intensity={0.3} color="#6b4423" />
      <directionalLight
        position={[15, 15, 10]}
        intensity={1.2}
        color="#ff6b35"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[-12, 8, -8]} intensity={0.8} color="#b8860b" />
      <pointLight position={[12, 8, -8]} intensity={0.8} color="#cd853f" />
      <hemisphereLight args={["#ff6b35", "#1a0f0a", 0.4]} />

      {/* Rim lighting */}
      <directionalLight
        position={[0, 0, -20]}
        intensity={0.5}
        color="#ff6b35"
      />

      {/* Main gear system with enhanced details */}
      <SteampunkGear position={[-8, -1, 0]} scale={1.5} speed={0.012} glowIntensity={0.4} />
      <SteampunkGear position={[8, -1, 0]} scale={1.8} speed={0.018} reverse glowIntensity={0.5} />
      <SteampunkGear position={[0, -3.5, 0]} scale={1.0} speed={0.022} glowIntensity={0.3} />
      <SteampunkGear position={[-4, 1, -2]} scale={0.8} speed={0.015} reverse glowIntensity={0.2} />
      <SteampunkGear position={[4, 1, -2]} scale={0.7} speed={0.025} glowIntensity={0.2} />

      {/* Enhanced steam effects */}
      <EnhancedSteamEffect position={[-8, 1, 0]} />
      <EnhancedSteamEffect position={[8, 1, 0]} />
      <EnhancedSteamEffect position={[0, -1.5, 0]} />

      {/* Pipe system */}
      <SteampunkPipes />

      {/* Floating mechanical elements */}
      <FloatingMechanics />

      {/* Enhanced particle effects */}
      <Sparkles
        count={80}
        scale={25}
        size={2}
        speed={0.4}
        color="#ff6b35"
        opacity={0.8}
      />

      {/* Additional ember particles */}
      <Sparkles
        count={40}
        scale={15}
        size={1}
        speed={0.2}
        color="#cd853f"
        opacity={0.6}
      />

      {/* Ground plane with metallic texture */}
      <mesh position={[0, -6, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color="#2f1b14"
          metalness={0.3}
          roughness={0.8}
        />
      </mesh>
    </group>
  );
}

// Enhanced Animated Title Component
function AnimatedTitle({ loadingProgress }: { loadingProgress: number }) {
  const titleRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="absolute top-1/4 left-1/2 w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl px-2 sm:px-0 transform -translate-x-1/2 -translate-y-1/2 text-center overflow-x-hidden">
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes letterFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
            opacity: 0.4;
          }
          50% { 
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-typewriter {
          overflow: hidden;
          border-right: 2px solid #f59e0b;
          white-space: nowrap;
          animation: typewriter 2s steps(20) infinite alternate;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
      
      <div 
        ref={titleRef}
        className={`relative transition-all duration-2000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Main animated title */}
        <div className="relative group">
          {/* Glowing background layers */}
          <div className="absolute inset-0 text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-black text-amber-500/30 blur-xl animate-pulse tracking-wider break-words">
            DIVERSION 2026
          </div>
          <div className="absolute inset-0 text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-black text-orange-400/20 blur-lg animate-pulse tracking-wider delay-150 break-words">
            DIVERSION 2026
          </div>
          {/* Steam effect behind text */}
          <div className="absolute inset-0 text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-black text-white/10 blur-md animate-pulse tracking-wider delay-300 break-words">
            DIVERSION 2026
          </div>

          {/* Main title with gradient and animations */}
          <h1 className="relative text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-black tracking-wider select-none break-words">
            {/* Letter-by-letter animation */}
            {"DIVERSION 2026".split("").map((char, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-500 hover:scale-110 hover:-translate-y-2 ${
                  char === " " ? "w-4" : ""
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  background: `linear-gradient(45deg, 
                    #f59e0b ${index * 10}%, 
                    #ea580c ${index * 15}%, 
                    #dc2626 ${index * 20}%, 
                    #f59e0b ${index * 25}%)`,
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: `gradientShift 3s ease-in-out infinite ${index * 0.1}s, 
                             letterFloat 4s ease-in-out infinite ${index * 0.2}s`,
                  textShadow: `
                    0 0 10px rgba(245, 158, 11, 0.5),
                    0 0 20px rgba(234, 88, 12, 0.3),
                    0 0 30px rgba(220, 38, 38, 0.2),
                    0 2px 4px rgba(0, 0, 0, 0.8)
                  `,
                  filter: 'drop-shadow(0 4px 8px rgba(245, 158, 11, 0.3))',
                }}
              >
                {char}
              </span>
            ))}
          </h1>

          {/* Decorative elements */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent animate-pulse"></div>
              <div className="text-amber-400 text-2xl animate-spin-slow">⚙️</div>
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent animate-pulse"></div>
            </div>
          </div>

          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-pulse delay-300"></div>
              <div className="text-orange-400 text-xl animate-bounce">🔥</div>
              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-pulse delay-300"></div>
            </div>
          </div>
        </div>

        {/* Subtitle with typewriter effect */}
        <div className="mt-8 overflow-hidden">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
            <p className="text-2xl text-amber-200 font-bold tracking-wide">
              <span className="inline-block animate-typewriter">
                {Math.round(loadingProgress)}% Complete
              </span>
            </p>
            <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse delay-150"></div>
          </div>
        </div>

        {/* Floating particles around title */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LoadingScreen() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component only renders on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) return 100;
        const newProgress = prev + 0.45; // slowed down for ~2s longer
        
        // Update loading phase based on progress
        if (newProgress >= 90) setLoadingPhase(4);
        else if (newProgress >= 70) setLoadingPhase(3);
        else if (newProgress >= 40) setLoadingPhase(2);
        else if (newProgress >= 15) setLoadingPhase(1);
        else setLoadingPhase(0);
        
        return newProgress;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [isMounted]);

  // Show a simple loading screen until component is mounted
  if (!isMounted) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-amber-900/20 via-stone-900 to-zinc-900 flex items-center justify-center z-[9999]">
        <div className="text-amber-400 text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  const loadingMessages = [
    "Igniting the furnace...",
    "Pressurizing steam chambers...",
    "Calibrating brass mechanisms...",
    "Synchronizing gear assemblies...",
    "Systems operational!",
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-amber-900/20 via-stone-900 to-zinc-900 flex items-center justify-center z-[9999] overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,53,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(184,134,11,0.1),transparent)]"></div>
      </div>

      <div className="w-full h-full relative">
        <Canvas
          camera={{ position: [0, 2, 15], fov: 75 }}
          shadows
          gl={{ antialias: true, alpha: false }}
        >
          <LoadingScene loadingProgress={loadingProgress} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.2}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
          />
        </Canvas>
      </div>

      {/* Enhanced Animated Title */}
      <AnimatedTitle loadingProgress={loadingProgress} />

      {/* Enhanced loading progress section */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-96">
        <div className="mb-6 text-center">
          <div className="text-amber-200 text-lg font-bold mb-3 tracking-wide">
            ⚙️ STEAMPUNK SYSTEMS INITIALIZATION ⚙️
          </div>
          <div className="text-amber-300 text-sm font-medium h-6 transition-all duration-500">
            {loadingMessages[loadingPhase]}
          </div>
        </div>

        <div className="relative">
          {/* Outer frame */}
          <div className="absolute -inset-2 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 rounded-lg blur opacity-30"></div>
          
          <div className="relative bg-stone-900 p-4 rounded-lg border-2 border-amber-600/50">
            <div className="w-full h-4 bg-stone-800 rounded-full overflow-hidden border-2 border-amber-700/50 relative">
              <div
                className="h-full bg-gradient-to-r from-amber-600 via-orange-500 to-amber-400 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
                style={{ width: `${loadingProgress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent animate-pulse"></div>
              </div>
            </div>

            <div className="flex justify-between mt-3 text-sm">
              <span className="text-amber-400 font-medium">0%</span>
              <span className="text-amber-200 font-bold text-lg">
                {Math.round(loadingProgress)}%
              </span>
              <span className="text-amber-400 font-medium">100%</span>
            </div>
          </div>
        </div>

        {/* Status indicators */}
        <div className="flex justify-center space-x-6 mt-4">
          {['🔥', '⚙️', '💨', '🔧'].map((icon, i) => (
            <div
              key={i}
              className={`text-2xl transition-all duration-300 ${
                loadingPhase > i ? 'text-amber-400 scale-110' : 'text-stone-600 scale-90'
              }`}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

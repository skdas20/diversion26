"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Sparkles, Stars } from "@react-three/drei"
import { useRef, useMemo, Suspense } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"
import * as THREE_NAMESPACE from "three"

// Atmospheric steam particles for the observatory
function ObservatoryMist({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Points>(null)
  const particleCount = 40

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6
      positions[i * 3 + 1] = Math.random() * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6

      velocities[i * 3] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 1] = Math.random() * 0.08 + 0.02
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02
    }

    return { positions, velocities }
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array
      const time = state.clock.elapsedTime

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += particles.velocities[i * 3] + Math.sin(time * 0.5 + i) * 0.005
        positions[i * 3 + 1] += particles.velocities[i * 3 + 1]
        positions[i * 3 + 2] += particles.velocities[i * 3 + 2] + Math.cos(time * 0.5 + i) * 0.005

        if (positions[i * 3 + 1] > 12) {
          positions[i * 3 + 1] = 0
          positions[i * 3] = (Math.random() - 0.5) * 6
          positions[i * 3 + 2] = (Math.random() - 0.5) * 6
        }
      }

      meshRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={meshRef} position={position}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={particles.positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial 
        size={0.03} 
        color="#8B7D6B" 
        transparent 
        opacity={0.4} 
        sizeAttenuation 
      />
    </points>
  )
}

// Enhanced central brass orrery with complex mechanisms
function BrassOrrery({ position }: { position: [number, number, number] }) {
  const orreryRef = useRef<THREE.Group>(null)
  const planetsRef = useRef<THREE.Group>(null)
  const innerGearsRef = useRef<THREE.Group>(null)
  const outerRingRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (orreryRef.current) {
      orreryRef.current.rotation.y = state.clock.elapsedTime * 0.08
    }
    if (planetsRef.current) {
      planetsRef.current.rotation.y = state.clock.elapsedTime * 0.12
    }
    if (innerGearsRef.current) {
      innerGearsRef.current.rotation.y = -state.clock.elapsedTime * 0.15
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  const materials = useMemo(() => ({
    brass: new THREE_NAMESPACE.MeshStandardMaterial({
      color: "#B8860B",
      metalness: 0.9,
      roughness: 0.2,
      emissive: "#8B6914",
      emissiveIntensity: 0.15,
    }),
    darkBrass: new THREE_NAMESPACE.MeshStandardMaterial({
      color: "#8B6914",
      metalness: 0.8,
      roughness: 0.3,
      emissive: "#654321",
      emissiveIntensity: 0.1,
    }),
    copper: new THREE_NAMESPACE.MeshStandardMaterial({
      color: "#B87333",
      metalness: 0.8,
      roughness: 0.3,
      emissive: "#8B4513",
      emissiveIntensity: 0.08,
    }),
    bronze: new THREE_NAMESPACE.MeshStandardMaterial({
      color: "#CD7F32",
      metalness: 0.85,
      roughness: 0.25,
    }),
  }), [])

  return (
    <group ref={orreryRef} position={position}>
      {/* Ornate pedestal base */}
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[2, 2.5, 3, 16]} />
        <primitive object={materials.darkBrass} />
      </mesh>

      {/* Decorative base carvings */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI * 2) / 8) * 2.2,
            -1,
            Math.sin((i * Math.PI * 2) / 8) * 2.2,
          ]}
        >
          <boxGeometry args={[0.3, 1, 0.3]} />
          <primitive object={materials.bronze} />
        </mesh>
      ))}

      {/* Main support column with intricate details */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 5, 16]} />
        <primitive object={materials.brass} />
      </mesh>

      {/* Decorative rings on column */}
      {[0, 2, 4].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <torusGeometry args={[0.5, 0.1, 8, 16]} />
          <primitive object={materials.copper} />
        </mesh>
      ))}

      {/* Inner rotating gear mechanism */}
      <group ref={innerGearsRef} position={[0, 3.5, 0]}>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i * Math.PI * 2) / 6) * 1.5,
              0,
              Math.sin((i * Math.PI * 2) / 6) * 1.5,
            ]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.3, 0.3, 0.1, 12]} />
            <primitive object={materials.brass} />
          </mesh>
        ))}
      </group>

      {/* Rotating planetary system */}
      <group ref={planetsRef} position={[0, 4, 0]}>
        {/* Central sun with glow */}
        <mesh>
          <sphereGeometry args={[0.5, 20, 20]} />
          <meshStandardMaterial 
            color="#DAA520" 
            emissive="#FFD700" 
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Orbital rings with enhanced details */}
        {[2.5, 4, 5.5, 7].map((radius, i) => (
          <group key={i}>
            <mesh>
              <torusGeometry args={[radius, 0.03, 12, 48]} />
              <primitive object={materials.brass} />
            </mesh>
            
            {/* Planet with moons */}
            <group position={[radius, 0, 0]}>
              <mesh>
                <sphereGeometry args={[0.2 + i * 0.08, 16, 16]} />
                <primitive object={materials.copper} />
              </mesh>
              
              {/* Small moon */}
              {i > 1 && (
                <mesh position={[0.5, 0, 0]}>
                  <sphereGeometry args={[0.05, 8, 8]} />
                  <primitive object={materials.bronze} />
                </mesh>
              )}
            </group>

            {/* Orbital mechanism details */}
            <mesh position={[radius * 0.7, 0, 0]}>
              <boxGeometry args={[0.1, 0.05, 0.05]} />
              <primitive object={materials.brass} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Outer rotating astronomical ring */}
      <group ref={outerRingRef} position={[0, 4, 0]}>
        <mesh>
          <torusGeometry args={[8, 0.2, 12, 48]} />
          <primitive object={materials.darkBrass} />
        </mesh>
        
        {/* Zodiac markers */}
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i * Math.PI * 2) / 12) * 8,
              0,
              Math.sin((i * Math.PI * 2) / 12) * 8,
            ]}
          >
            <boxGeometry args={[0.2, 0.4, 0.1]} />
            <primitive object={materials.brass} />
          </mesh>
        ))}
      </group>

      {/* Steam effects from mechanisms */}
      <ObservatoryMist position={[0, 2, 0]} />
    </group>
  )
}

// Enhanced antique brass telescope with detailed mechanisms
function BrassTelescope({ 
  position, 
  rotation = [0, 0, 0] 
}: { 
  position: [number, number, number]
  rotation?: [number, number, number]
}) {
  const telescopeRef = useRef<THREE.Group>(null)
  const focusRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (telescopeRef.current) {
      telescopeRef.current.rotation.z += Math.sin(state.clock.elapsedTime * 0.3) * 0.002
    }
    if (focusRef.current) {
      focusRef.current.rotation.z = state.clock.elapsedTime * 0.5
    }
  })

  const materials = useMemo(() => ({
    brass: new THREE_NAMESPACE.MeshStandardMaterial({
      color: "#B8860B",
      metalness: 0.9,
      roughness: 0.2,
      emissive: "#8B6914",
      emissiveIntensity: 0.1,
    }),
    darkBrass: new THREE_NAMESPACE.MeshStandardMaterial({
      color: "#8B6914",
      metalness: 0.8,
      roughness: 0.3,
    }),
    leather: new THREE_NAMESPACE.MeshStandardMaterial({
      color: "#654321",
      metalness: 0.1,
      roughness: 0.8,
    }),
  }), [])

  return (
    <group ref={telescopeRef} position={position} rotation={rotation}>
      {/* Telescope main tube */}
      <mesh position={[0, 0, 2.5]}>
        <cylinderGeometry args={[0.35, 0.45, 5, 16]} />
        <primitive object={materials.darkBrass} />
      </mesh>

      {/* Telescope eyepiece */}
      <mesh position={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.15, 0.15, 1, 12]} />
        <primitive object={materials.brass} />
      </mesh>

      {/* Objective lens housing */}
      <mesh position={[0, 0, 5.2]}>
        <cylinderGeometry args={[0.4, 0.35, 0.4, 16]} />
        <primitive object={materials.brass} />
      </mesh>

      {/* Focus adjustment mechanism */}
      <mesh ref={focusRef} position={[0, 0.5, 1]}>
        <cylinderGeometry args={[0.2, 0.2, 0.3, 8]} />
        <primitive object={materials.brass} />
      </mesh>

      {/* Telescope mount base */}
      <mesh position={[0, -0.8, 0]}>
        <boxGeometry args={[1.2, 1.5, 1.2]} />
        <primitive object={materials.leather} />
      </mesh>

      {/* Brass mounting hardware */}
      <mesh position={[0, -0.2, 0]}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <primitive object={materials.brass} />
      </mesh>

      {/* Adjustment knobs */}
      {[-0.6, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.2, 8]} />
          <primitive object={materials.brass} />
        </mesh>
      ))}
    </group>
  )
}

// Enhanced floating astronomical instruments
function FloatingInstruments() {
  const instruments = useMemo(() => [
    { pos: [-10, 8, -6], type: "astrolabe", scale: 1.2 },
    { pos: [10, 7, -4], type: "compass", scale: 1.0 },
    { pos: [-8, 10, 3], type: "sextant", scale: 1.1 },
    { pos: [9, 9, 5], type: "armillary", scale: 1.3 },
    { pos: [-6, 12, -10], type: "quadrant", scale: 0.9 },
    { pos: [7, 6, -8], type: "sundial", scale: 1.0 },
    { pos: [-12, 6, 2], type: "compass", scale: 0.8 },
    { pos: [12, 11, -2], type: "astrolabe", scale: 1.0 },
  ], [])

  const materials = useMemo(() => ({
    brass: new THREE_NAMESPACE.MeshStandardMaterial({
      color: "#B8860B",
      metalness: 0.9,
      roughness: 0.2,
      emissive: "#8B6914",
      emissiveIntensity: 0.1,
    }),
    copper: new THREE_NAMESPACE.MeshStandardMaterial({
      color: "#B87333",
      metalness: 0.8,
      roughness: 0.3,
    }),
    bronze: new THREE_NAMESPACE.MeshStandardMaterial({
      color: "#CD7F32",
      metalness: 0.85,
      roughness: 0.25,
    }),
  }), [])

  return (
    <>
      {instruments.map((instrument, i) => (
        <Float 
          key={i} 
          speed={0.4 + i * 0.1} 
          rotationIntensity={0.15} 
          floatIntensity={0.4}
        >
          <group position={instrument.pos} scale={instrument.scale}>
            {instrument.type === "astrolabe" && (
              <group>
                <mesh>
                  <torusGeometry args={[1, 0.12, 12, 32]} />
                  <primitive object={materials.brass} />
                </mesh>
                <mesh>
                  <torusGeometry args={[0.7, 0.08, 8, 24]} />
                  <primitive object={materials.copper} />
                </mesh>
                <mesh>
                  <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
                  <primitive object={materials.bronze} />
                </mesh>
              </group>
            )}
            
            {instrument.type === "compass" && (
              <group>
                <mesh>
                  <cylinderGeometry args={[0.8, 0.8, 0.25, 20]} />
                  <primitive object={materials.brass} />
                </mesh>
                <mesh position={[0, 0.15, 0]}>
                  <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
                  <primitive object={materials.bronze} />
                </mesh>
              </group>
            )}

            {instrument.type === "armillary" && (
              <group>
                <mesh>
                  <torusGeometry args={[1.2, 0.06, 12, 32]} />
                  <primitive object={materials.copper} />
                </mesh>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                  <torusGeometry args={[1.2, 0.06, 12, 32]} />
                  <primitive object={materials.copper} />
                </mesh>
                <mesh rotation={[0, 0, Math.PI / 4]}>
                  <torusGeometry args={[1.2, 0.06, 12, 32]} />
                  <primitive object={materials.copper} />
                </mesh>
                <mesh>
                  <sphereGeometry args={[0.15, 12, 12]} />
                  <primitive object={materials.brass} />
                </mesh>
              </group>
            )}

            {instrument.type === "sextant" && (
              <group>
                <mesh>
                  <cylinderGeometry args={[0.8, 0.8, 0.1, 6, 1, false, 0, Math.PI]} />
                  <primitive object={materials.brass} />
                </mesh>
                <mesh position={[0, 0, 0.4]}>
                  <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
                  <primitive object={materials.bronze} />
                </mesh>
              </group>
            )}

            {instrument.type === "quadrant" && (
              <group>
                <mesh>
                  <cylinderGeometry args={[1, 1, 0.1, 16, 1, false, 0, Math.PI / 2]} />
                  <primitive object={materials.brass} />
                </mesh>
              </group>
            )}

            {instrument.type === "sundial" && (
              <group>
                <mesh>
                  <cylinderGeometry args={[0.8, 0.8, 0.1, 16]} />
                  <primitive object={materials.copper} />
                </mesh>
                <mesh position={[0, 0.3, 0]} rotation={[0, 0, Math.PI / 6]}>
                  <coneGeometry args={[0.05, 0.6, 8]} />
                  <primitive object={materials.bronze} />
                </mesh>
              </group>
            )}
          </group>
        </Float>
      ))}
    </>
  )
}

// Enhanced Gothic observatory architecture with better dome lighting
function ObservatoryArchitecture() {
  const materials = useMemo(() => ({
    lightStone: new THREE_NAMESPACE.MeshStandardMaterial({
      color: "#5A5A5A", // Lighter stone color
      roughness: 0.7,
      metalness: 0.15,
      emissive: "#3A3A3A", // Added subtle emissive
      emissiveIntensity: 0.05,
    }),
    stone: new THREE_NAMESPACE.MeshStandardMaterial({
      color: "#4A4A4A", // Lighter than before
      roughness: 0.8,
      metalness: 0.1,
      emissive: "#2A2A2A",
      emissiveIntensity: 0.03,
    }),
    brass: new THREE_NAMESPACE.MeshStandardMaterial({
      color: "#B8860B",
      metalness: 0.9,
      roughness: 0.2,
      emissive: "#8B6914",
      emissiveIntensity: 0.15,
    }),
    marble: new THREE_NAMESPACE.MeshStandardMaterial({
      color: "#F5F5DC",
      roughness: 0.3,
      metalness: 0.2,
      emissive: "#E6E6DC",
      emissiveIntensity: 0.05,
    }),
  }), [])

  return (
    <group>
      {/* Enhanced main observatory dome with better lighting */}
      <mesh position={[0, 10, 0]}>
        <sphereGeometry args={[14, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <primitive object={materials.lightStone} />
      </mesh>

      {/* Dome opening mechanism with brass details */}
      <mesh position={[0, 12, 7]}>
        <boxGeometry args={[4, 2, 0.5]} />
        <primitive object={materials.brass} />
      </mesh>

      {/* Additional dome lighting strips */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI * 2) / 8) * 12,
            11,
            Math.sin((i * Math.PI * 2) / 8) * 12,
          ]}
          rotation={[0, (i * Math.PI * 2) / 8, 0]}
        >
          <boxGeometry args={[2, 0.3, 0.2]} />
          <meshStandardMaterial 
            color="#DAA520" 
            emissive="#B8860B" 
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}

      {/* Gothic arches with enhanced details */}
      {Array.from({ length: 12 }).map((_, i) => (
        <group 
          key={i} 
          rotation={[0, (i * Math.PI * 2) / 12, 0]}
        >
          {/* Main arch columns */}
          <mesh position={[12, 4, 0]}>
            <cylinderGeometry args={[0.6, 0.6, 8, 16]} />
            <primitive object={materials.stone} />
          </mesh>

          {/* Column capitals */}
          <mesh position={[12, 8.5, 0]}>
            <cylinderGeometry args={[0.8, 0.6, 1, 16]} />
            <primitive object={materials.marble} />
          </mesh>

          {/* Gothic arch */}
          <mesh position={[12, 7.5, 0]}>
            <cylinderGeometry args={[1, 1, 1.5, 16, 1, false, 0, Math.PI]} />
            <primitive object={materials.stone} />
          </mesh>

          {/* Brass gear mechanisms on arches */}
          <mesh position={[12, 6, 1.2]}>
            <cylinderGeometry args={[0.5, 0.5, 0.3, 16]} />
            <primitive object={materials.brass} />
          </mesh>

          {/* Gear teeth */}
          {Array.from({ length: 8 }).map((_, j) => (
            <mesh
              key={j}
              position={[
                12 + Math.cos((j * Math.PI * 2) / 8) * 0.6,
                6,
                1.2 + Math.sin((j * Math.PI * 2) / 8) * 0.6,
              ]}
            >
              <boxGeometry args={[0.1, 0.3, 0.1]} />
              <primitive object={materials.brass} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Central floor with intricate patterns */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[16, 16, 0.2, 48]} />
        <primitive object={materials.stone} />
      </mesh>

      {/* Ornate floor patterns */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[10, 0.15, 12, 48]} />
        <primitive object={materials.brass} />
      </mesh>

      <mesh position={[0, 0.05, 0]}>
        <torusGeometry args={[6, 0.1, 12, 48]} />
        <primitive object={materials.brass} />
      </mesh>

      <mesh position={[0, 0.1, 0]}>
        <torusGeometry args={[3, 0.08, 12, 48]} />
        <primitive object={materials.brass} />
      </mesh>

      {/* Celestial symbols on floor */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI * 2) / 8) * 8,
            0.15,
            Math.sin((i * Math.PI * 2) / 8) * 8,
          ]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.5, 0.5, 0.1, 6]} />
          <primitive object={materials.brass} />
        </mesh>
      ))}
    </group>
  )
}

// Enhanced candlelit brass sconces
function BrassSconce({ position }: { position: [number, number, number] }) {
  const flameRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (flameRef.current) {
      const flicker = Math.sin(state.clock.elapsedTime * 8) * 0.1 + 1
      flameRef.current.scale.setScalar(flicker)
    }
  })

  return (
    <group position={position}>
      {/* Ornate sconce base */}
      <mesh>
        <cylinderGeometry args={[0.3, 0.4, 0.8, 12]} />
        <meshStandardMaterial color="#8B6914" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Decorative sconce details */}
      <mesh position={[0, 0.5, 0]}>
        <torusGeometry args={[0.35, 0.05, 8, 16]} />
        <meshStandardMaterial color="#B8860B" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Candle */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 1.2, 12]} />
        <meshStandardMaterial color="#F5DEB3" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Flickering flame */}
      <mesh ref={flameRef} position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial 
          color="#DAA520" 
          emissive="#FFD700" 
          emissiveIntensity={0.9}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Wax drips */}
      <mesh position={[0.05, 0.6, 0]}>
        <sphereGeometry args={[0.03, 6, 6]} />
        <meshStandardMaterial color="#F5DEB3" roughness={0.9} metalness={0.1} />
      </mesh>
    </group>
  )
}

// Main enhanced observatory scene
function SteampunkObservatory() {
  return (
    <>
      <ObservatoryArchitecture />
      <BrassOrrery position={[0, 0, 0]} />
      
      {/* Enhanced telescopes positioned around the observatory */}
      <BrassTelescope position={[-10, 4, -10]} rotation={[0.4, 0.8, 0]} />
      <BrassTelescope position={[10, 4, -10]} rotation={[0.4, -0.8, 0]} />
      <BrassTelescope position={[0, 5, 12]} rotation={[0.6, Math.PI, 0]} />
      <BrassTelescope position={[-8, 3, 8]} rotation={[0.3, 2.3, 0]} />

      <FloatingInstruments />

      {/* Enhanced atmospheric effects */}
      <ObservatoryMist position={[0, 3, 0]} />
      <ObservatoryMist position={[-8, 4, -8]} />
      <ObservatoryMist position={[8, 4, 8]} />
      <ObservatoryMist position={[0, 8, -12]} />

      {/* Brass sconces for ambient lighting */}
      {Array.from({ length: 8 }).map((_, i) => (
        <BrassSconce
          key={i}
          position={[
            Math.cos((i * Math.PI * 2) / 8) * 11,
            5,
            Math.sin((i * Math.PI * 2) / 8) * 11,
          ]}
        />
      ))}

      {/* Additional atmospheric steam from floor vents */}
      {Array.from({ length: 4 }).map((_, i) => (
        <ObservatoryMist
          key={i}
          position={[
            Math.cos((i * Math.PI * 2) / 4) * 8,
            1,
            Math.sin((i * Math.PI * 2) / 4) * 8,
          ]}
        />
      ))}
    </>
  )
}

// Enhanced hero text for observatory theme
function ObservatoryHeroText() {
  return (
    <Float speed={0.6} rotationIntensity={0.02} floatIntensity={0.1}>
      <group position={[0, 18, 20]}>
        {/* DIVERSION title */}
        <mesh position={[-1, 0, 0]}>
          <boxGeometry args={[9, 2, 0.8]} />
          <meshStandardMaterial
            color="#B8860B"
            metalness={0.8}
            roughness={0.2}
            emissive="#8B6914"
            emissiveIntensity={0.25}
          />
        </mesh>

        {/* 2026 subtitle */}
        <mesh position={[0.5, -3, 0]}>
          <boxGeometry args={[6, 1.5, 0.6]} />
          <meshStandardMaterial
            color="#8B6914"
            metalness={0.7}
            roughness={0.3}
            emissive="#654321"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Decorative brass elements */}
        <mesh position={[-7, 0, 0]}>
          <torusGeometry args={[0.5, 0.12, 12, 24]} />
          <meshStandardMaterial color="#B87333" metalness={0.8} roughness={0.3} />
        </mesh>

        <mesh position={[7, 0, 0]}>
          <torusGeometry args={[0.5, 0.12, 12, 24]} />
          <meshStandardMaterial color="#B87333" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Floating gear decorations */}
        <Float speed={1} rotationIntensity={0.5} floatIntensity={0.2}>
          <mesh position={[-10, 2, 0]}>
            <cylinderGeometry args={[0.8, 0.8, 0.2, 12]} />
            <meshStandardMaterial color="#CD7F32" metalness={0.9} roughness={0.2} />
          </mesh>
        </Float>

        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.3}>
          <mesh position={[10, -1, 0]}>
            <cylinderGeometry args={[0.6, 0.6, 0.15, 8]} />
            <meshStandardMaterial color="#CD7F32" metalness={0.9} roughness={0.2} />
          </mesh>
        </Float>
      </group>
    </Float>
  )
}

export default function Hero3D() {
  return (
    <div className="w-full h-full relative">
      <style jsx>{`
        @keyframes mysterious-glow {
          0%, 100% { 
            text-shadow: 0 0 20px rgba(184, 134, 11, 0.6), 0 0 40px rgba(139, 105, 20, 0.4);
          }
          50% { 
            text-shadow: 0 0 30px rgba(184, 134, 11, 0.8), 0 0 60px rgba(139, 105, 20, 0.6);
          }
        }
        
        .mysterious-glow {
          animation: mysterious-glow 4s ease-in-out infinite;
        }

        @keyframes cosmic-pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }

        .cosmic-pulse {
          animation: cosmic-pulse 3s ease-in-out infinite;
        }
      `}</style>

      <Canvas camera={{ position: [0, 15, 30], fov: 65 }} shadows>
        <Suspense fallback={null}>
          {/* Enhanced atmospheric lighting */}
          <ambientLight intensity={0.25} color="#8B7D6B" />

          {/* Dome interior lighting - KEY ENHANCEMENT */}
          <pointLight position={[0, 18, 0]} intensity={1.8} color="#DAA520" />
          <pointLight position={[0, 16, 8]} intensity={1.2} color="#B8860B" />
          <pointLight position={[8, 16, 0]} intensity={1.0} color="#CD853F" />
          <pointLight position={[-8, 16, 0]} intensity={1.0} color="#CD853F" />
          <pointLight position={[0, 16, -8]} intensity={1.0} color="#B8860B" />

          {/* Focused candle lighting from sconces */}
          <pointLight position={[0, 10, 0]} intensity={1.5} color="#DAA520" castShadow />
          <pointLight position={[-10, 8, -10]} intensity={0.8} color="#B8860B" />
          <pointLight position={[10, 8, -10]} intensity={0.8} color="#B8860B" />
          <pointLight position={[0, 12, 12]} intensity={0.7} color="#CD853F" />

          {/* Enhanced directional lighting for dome */}
          <directionalLight 
            position={[0, 25, 0]} 
            intensity={0.8} 
            color="#DAA520" 
            castShadow
            shadow-mapSize={[4096, 4096]}
            shadow-camera-far={100}
            shadow-camera-left={-50}
            shadow-camera-right={50}
            shadow-camera-top={50}
            shadow-camera-bottom={-50}
          />

          {/* Subtle directional moonlight */}
          <directionalLight 
            position={[25, 30, 20]} 
            intensity={0.4} 
            color="#B0C4DE" 
            castShadow
          />

          {/* Additional atmospheric lighting */}
          <pointLight position={[-15, 6, 8]} intensity={0.6} color="#8B6914" />
          <pointLight position={[15, 6, -8]} intensity={0.6} color="#8B6914" />

          {/* Hemisphere light for overall illumination */}
          <hemisphereLight args={["#DAA520", "#654321", 0.4]} />

          {/* Lighter atmospheric fog */}
          <fog attach="fog" args={["#2a2a2a", 20, 65]} />

          {/* Enhanced starry sky */}
          <Stars radius={120} depth={60} count={1500} factor={5} saturation={0} fade />

          <SteampunkObservatory />
          <ObservatoryHeroText />

          {/* Enhanced particle effects */}
          <Sparkles count={250} scale={90} size={1.5} speed={0.02} color="#B8860B" opacity={0.5} />
          <Sparkles count={150} scale={50} size={1.0} speed={0.012} color="#8B7D6B" opacity={0.6} />
          <Sparkles count={100} scale={25} size={0.8} speed={0.008} color="#CD853F" opacity={0.4} />

          <OrbitControls
            enableZoom={true}
            enablePan={true}
            autoRotate
            autoRotateSpeed={0.15}
            maxPolarAngle={Math.PI / 2.3}
            minPolarAngle={Math.PI / 15}
            minDistance={18}
            maxDistance={60}
            target={[0, 6, 0]}
          />
        </Suspense>
      </Canvas>

      {/* Enhanced dark, elegant overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-2 sm:px-0">
        <div className="text-center text-white z-10 w-full max-w-4xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-8 text-amber-300 drop-shadow-2xl mysterious-glow break-words">
              The Observatory of Innovation
            </h2>
            <p className="text-base xs:text-lg sm:text-xl text-amber-100 max-w-full sm:max-w-4xl mx-auto leading-relaxed drop-shadow-lg cosmic-pulse px-1 sm:px-0">
              Where ancient wisdom meets modern discovery. Journey into a mysterious steampunk observatory 
              where brass instruments map the stars and mechanical marvels unlock the secrets of the cosmos. 
              Three days of groundbreaking innovation beneath the celestial dome, where Renaissance craftsmanship 
              meets cutting-edge technology in perfect harmony.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full">
            <button className="bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-amber-100 px-6 sm:px-10 py-3 sm:py-5 rounded-lg font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 pointer-events-auto shadow-2xl border border-amber-600 w-full sm:w-auto">
              Enter the Observatory
            </button>
            <button className="border-2 border-amber-600 text-amber-300 hover:bg-amber-600 hover:bg-opacity-20 px-6 sm:px-10 py-3 sm:py-5 rounded-lg font-bold text-base sm:text-lg transition-all duration-300 pointer-events-auto shadow-2xl backdrop-blur-sm w-full sm:w-auto">
              Explore the Cosmos
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

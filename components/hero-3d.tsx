"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Sparkles, Stars, Environment } from "@react-three/drei"
import { useRef, useMemo, Suspense } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"
import * as THREE_NAMESPACE from "three"

// Enhanced atmospheric steam particles
function ObservatoryMist({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Points>(null)
  const particleCount = 60

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8
      positions[i * 3 + 1] = Math.random() * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8

      velocities[i * 3] = (Math.random() - 0.5) * 0.03
      velocities[i * 3 + 1] = Math.random() * 0.1 + 0.03
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.03
    }

    return { positions, velocities }
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array
      const time = state.clock.elapsedTime

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += particles.velocities[i * 3] + Math.sin(time * 0.5 + i) * 0.008
        positions[i * 3 + 1] += particles.velocities[i * 3 + 1]
        positions[i * 3 + 2] += particles.velocities[i * 3 + 2] + Math.cos(time * 0.5 + i) * 0.008

        if (positions[i * 3 + 1] > 15) {
          positions[i * 3 + 1] = 0
          positions[i * 3] = (Math.random() - 0.5) * 8
          positions[i * 3 + 2] = (Math.random() - 0.5) * 8
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
        size={0.04} 
        color="#8B7D6B" 
        transparent 
        opacity={0.5} 
        sizeAttenuation 
      />
    </points>
  )
}

// Enhanced atmospheric effects
function EnhancedAtmosphere() {
  return (
    <>
      {/* Floating dust motes in light beams */}
      <Sparkles count={500} scale={60} size={0.5} speed={0.005} color="#F5DEB3" opacity={0.3} />
      
      {/* Mystical energy particles */}
      <Sparkles count={200} scale={40} size={1.2} speed={0.02} color="#9370DB" opacity={0.6} />
      
      {/* Steam from mechanisms */}
      {Array.from({ length: 6 }).map((_, i) => (
        <ObservatoryMist
          key={i}
          position={[
            Math.cos((i * Math.PI * 2) / 6) * 5,
            2 + Math.random() * 3,
            Math.sin((i * Math.PI * 2) / 6) * 5,
          ]}
        />
      ))}
    </>
  )
}

// Enhanced central brass orrery with photorealistic materials
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

  const enhancedMaterials = useMemo(() => ({
    masterBrass: new THREE_NAMESPACE.MeshPhysicalMaterial({
      color: "#B8860B",
      metalness: 0.95,
      roughness: 0.15,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      emissive: "#8B6914",
      emissiveIntensity: 0.2,
    }),
    
    antiqueBrass: new THREE_NAMESPACE.MeshPhysicalMaterial({
      color: "#8B6914",
      metalness: 0.9,
      roughness: 0.25,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
      emissive: "#654321",
      emissiveIntensity: 0.15,
    }),
    
    polishedCopper: new THREE_NAMESPACE.MeshPhysicalMaterial({
      color: "#B87333",
      metalness: 0.92,
      roughness: 0.18,
      clearcoat: 0.9,
      clearcoatRoughness: 0.05,
      emissive: "#8B4513",
      emissiveIntensity: 0.12,
    }),
    
    bronze: new THREE_NAMESPACE.MeshPhysicalMaterial({
      color: "#CD7F32",
      metalness: 0.85,
      roughness: 0.25,
      clearcoat: 0.7,
      clearcoatRoughness: 0.15,
    }),
  }), [])

  return (
    <group ref={orreryRef} position={position}>
      {/* Ornate pedestal base with enhanced details */}
      <mesh position={[0, -1.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2, 2.5, 3, 16]} />
        <primitive object={enhancedMaterials.antiqueBrass} />
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
          castShadow
        >
          <boxGeometry args={[0.3, 1, 0.3]} />
          <primitive object={enhancedMaterials.bronze} />
        </mesh>
      ))}

      {/* Main support column with intricate details */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.4, 5, 16]} />
        <primitive object={enhancedMaterials.masterBrass} />
      </mesh>

      {/* Decorative rings on column */}
      {[0, 2, 4].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} castShadow>
          <torusGeometry args={[0.5, 0.1, 8, 16]} />
          <primitive object={enhancedMaterials.polishedCopper} />
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
            castShadow
          >
            <cylinderGeometry args={[0.3, 0.3, 0.1, 12]} />
            <primitive object={enhancedMaterials.masterBrass} />
          </mesh>
        ))}
      </group>

      {/* Rotating planetary system */}
      <group ref={planetsRef} position={[0, 4, 0]}>
        {/* Central sun with enhanced glow */}
        <mesh castShadow>
          <sphereGeometry args={[0.5, 20, 20]} />
          <meshStandardMaterial 
            color="#DAA520" 
            emissive="#FFD700" 
            emissiveIntensity={0.6}
          />
        </mesh>

        {/* Orbital rings with enhanced details */}
        {[2.5, 4, 5.5, 7].map((radius, i) => (
          <group key={i}>
            <mesh castShadow>
              <torusGeometry args={[radius, 0.03, 12, 48]} />
              <primitive object={enhancedMaterials.masterBrass} />
            </mesh>
            
            {/* Planet with moons */}
            <group position={[radius, 0, 0]}>
              <mesh castShadow>
                <sphereGeometry args={[0.2 + i * 0.08, 16, 16]} />
                <primitive object={enhancedMaterials.polishedCopper} />
              </mesh>
              
              {/* Small moon */}
              {i > 1 && (
                <mesh position={[0.5, 0, 0]} castShadow>
                  <sphereGeometry args={[0.05, 8, 8]} />
                  <primitive object={enhancedMaterials.bronze} />
                </mesh>
              )}
            </group>

            {/* Orbital mechanism details */}
            <mesh position={[radius * 0.7, 0, 0]} castShadow>
              <boxGeometry args={[0.1, 0.05, 0.05]} />
              <primitive object={enhancedMaterials.masterBrass} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Outer rotating astronomical ring */}
      <group ref={outerRingRef} position={[0, 4, 0]}>
        <mesh castShadow>
          <torusGeometry args={[8, 0.2, 12, 48]} />
          <primitive object={enhancedMaterials.antiqueBrass} />
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
            castShadow
          >
            <boxGeometry args={[0.2, 0.4, 0.1]} />
            <primitive object={enhancedMaterials.masterBrass} />
          </mesh>
        ))}
      </group>

      {/* Steam effects from mechanisms */}
      <ObservatoryMist position={[0, 2, 0]} />
    </group>
  )
}

// Enhanced antique brass telescope
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
    brass: new THREE_NAMESPACE.MeshPhysicalMaterial({
      color: "#B8860B",
      metalness: 0.9,
      roughness: 0.2,
      clearcoat: 0.8,
      emissive: "#8B6914",
      emissiveIntensity: 0.1,
    }),
    darkBrass: new THREE_NAMESPACE.MeshPhysicalMaterial({
      color: "#8B6914",
      metalness: 0.8,
      roughness: 0.3,
      clearcoat: 0.6,
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
      <mesh position={[0, 0, 2.5]} castShadow receiveShadow>
        <cylinderGeometry args={[0.35, 0.45, 5, 16]} />
        <primitive object={materials.darkBrass} />
      </mesh>

      {/* Telescope eyepiece */}
      <mesh position={[0, 0, -0.5]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 1, 12]} />
        <primitive object={materials.brass} />
      </mesh>

      {/* Objective lens housing */}
      <mesh position={[0, 0, 5.2]} castShadow>
        <cylinderGeometry args={[0.4, 0.35, 0.4, 16]} />
        <primitive object={materials.brass} />
      </mesh>

      {/* Focus adjustment mechanism */}
      <mesh ref={focusRef} position={[0, 0.5, 1]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.3, 8]} />
        <primitive object={materials.brass} />
      </mesh>

      {/* Telescope mount base */}
      <mesh position={[0, -0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 1.5, 1.2]} />
        <primitive object={materials.leather} />
      </mesh>

      {/* Brass mounting hardware */}
      <mesh position={[0, -0.2, 0]} castShadow>
        <sphereGeometry args={[0.3, 12, 12]} />
        <primitive object={materials.brass} />
      </mesh>

      {/* Adjustment knobs */}
      {[-0.6, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} castShadow>
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
    brass: new THREE_NAMESPACE.MeshPhysicalMaterial({
      color: "#B8860B",
      metalness: 0.9,
      roughness: 0.2,
      clearcoat: 0.8,
      emissive: "#8B6914",
      emissiveIntensity: 0.1,
    }),
    copper: new THREE_NAMESPACE.MeshPhysicalMaterial({
      color: "#B87333",
      metalness: 0.8,
      roughness: 0.3,
      clearcoat: 0.7,
    }),
    bronze: new THREE_NAMESPACE.MeshPhysicalMaterial({
      color: "#CD7F32",
      metalness: 0.85,
      roughness: 0.25,
      clearcoat: 0.75,
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
                <mesh castShadow>
                  <torusGeometry args={[1, 0.12, 12, 32]} />
                  <primitive object={materials.brass} />
                </mesh>
                <mesh castShadow>
                  <torusGeometry args={[0.7, 0.08, 8, 24]} />
                  <primitive object={materials.copper} />
                </mesh>
                <mesh castShadow>
                  <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
                  <primitive object={materials.bronze} />
                </mesh>
              </group>
            )}
            
            {instrument.type === "compass" && (
              <group>
                <mesh castShadow>
                  <cylinderGeometry args={[0.8, 0.8, 0.25, 20]} />
                  <primitive object={materials.brass} />
                </mesh>
                <mesh position={[0, 0.15, 0]} castShadow>
                  <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
                  <primitive object={materials.bronze} />
                </mesh>
              </group>
            )}

            {instrument.type === "armillary" && (
              <group>
                <mesh castShadow>
                  <torusGeometry args={[1.2, 0.06, 12, 32]} />
                  <primitive object={materials.copper} />
                </mesh>
                <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
                  <torusGeometry args={[1.2, 0.06, 12, 32]} />
                  <primitive object={materials.copper} />
                </mesh>
                <mesh rotation={[0, 0, Math.PI / 4]} castShadow>
                  <torusGeometry args={[1.2, 0.06, 12, 32]} />
                  <primitive object={materials.copper} />
                </mesh>
                <mesh castShadow>
                  <sphereGeometry args={[0.15, 12, 12]} />
                  <primitive object={materials.brass} />
                </mesh>
              </group>
            )}

            {instrument.type === "sextant" && (
              <group>
                <mesh castShadow>
                  <cylinderGeometry args={[0.8, 0.8, 0.1, 6, 1, false, 0, Math.PI]} />
                  <primitive object={materials.brass} />
                </mesh>
                <mesh position={[0, 0, 0.4]} castShadow>
                  <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
                  <primitive object={materials.bronze} />
                </mesh>
              </group>
            )}

            {instrument.type === "quadrant" && (
              <group>
                <mesh castShadow>
                  <cylinderGeometry args={[1, 1, 0.1, 16, 1, false, 0, Math.PI / 2]} />
                  <primitive object={materials.brass} />
                </mesh>
              </group>
            )}

            {instrument.type === "sundial" && (
              <group>
                <mesh castShadow>
                  <cylinderGeometry args={[0.8, 0.8, 0.1, 16]} />
                  <primitive object={materials.copper} />
                </mesh>
                <mesh position={[0, 0.3, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
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

// Enhanced Gothic observatory architecture
function ObservatoryArchitecture() {
  const materials = useMemo(() => ({
    lightStone: new THREE_NAMESPACE.MeshStandardMaterial({
      color: "#6A6A6A",
      roughness: 0.6,
      metalness: 0.15,
      emissive: "#4A4A4A",
      emissiveIntensity: 0.08,
    }),
    stone: new THREE_NAMESPACE.MeshStandardMaterial({
      color: "#5A5A5A",
      roughness: 0.7,
      metalness: 0.1,
      emissive: "#3A3A3A",
      emissiveIntensity: 0.05,
    }),
    brass: new THREE_NAMESPACE.MeshPhysicalMaterial({
      color: "#B8860B",
      metalness: 0.9,
      roughness: 0.2,
      clearcoat: 0.8,
      emissive: "#8B6914",
      emissiveIntensity: 0.15,
    }),
    marble: new THREE_NAMESPACE.MeshStandardMaterial({
      color: "#F5F5DC",
      roughness: 0.3,
      metalness: 0.2,
      emissive: "#E6E6DC",
      emissiveIntensity: 0.08,
    }),
  }), [])

  return (
    <group>
      {/* Enhanced main observatory dome */}
      <mesh position={[0, 10, 0]} castShadow receiveShadow>
        <sphereGeometry args={[14, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <primitive object={materials.lightStone} />
      </mesh>

      {/* Dome opening mechanism with brass details */}
      <mesh position={[0, 12, 7]} castShadow>
        <boxGeometry args={[4, 2, 0.5]} />
        <primitive object={materials.brass} />
      </mesh>

      {/* Enhanced dome lighting strips */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI * 2) / 8) * 12,
            11,
            Math.sin((i * Math.PI * 2) / 8) * 12,
          ]}
          rotation={[0, (i * Math.PI * 2) / 8, 0]}
          castShadow
        >
          <boxGeometry args={[2, 0.3, 0.2]} />
          <meshStandardMaterial 
            color="#DAA520" 
            emissive="#B8860B" 
            emissiveIntensity={0.5}
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
          <mesh position={[12, 4, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.6, 0.6, 8, 16]} />
            <primitive object={materials.stone} />
          </mesh>

          {/* Column capitals */}
          <mesh position={[12, 8.5, 0]} castShadow>
            <cylinderGeometry args={[0.8, 0.6, 1, 16]} />
            <primitive object={materials.marble} />
          </mesh>

          {/* Gothic arch */}
          <mesh position={[12, 7.5, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[1, 1, 1.5, 16, 1, false, 0, Math.PI]} />
            <primitive object={materials.stone} />
          </mesh>

          {/* Brass gear mechanisms on arches */}
          <mesh position={[12, 6, 1.2]} castShadow>
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
              castShadow
            >
              <boxGeometry args={[0.1, 0.3, 0.1]} />
              <primitive object={materials.brass} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Central floor with intricate patterns */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <cylinderGeometry args={[16, 16, 0.2, 48]} />
        <primitive object={materials.stone} />
      </mesh>

      {/* Ornate floor patterns */}
      <mesh position={[0, 0, 0]} castShadow>
        <torusGeometry args={[10, 0.15, 12, 48]} />
        <primitive object={materials.brass} />
      </mesh>

      <mesh position={[0, 0.05, 0]} castShadow>
        <torusGeometry args={[6, 0.1, 12, 48]} />
        <primitive object={materials.brass} />
      </mesh>

      <mesh position={[0, 0.1, 0]} castShadow>
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
          castShadow
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
      const flicker = Math.sin(state.clock.elapsedTime * 8) * 0.15 + 1
      flameRef.current.scale.setScalar(flicker)
    }
  })

  return (
    <group position={position}>
      {/* Ornate sconce base */}
      <mesh castShadow>
        <cylinderGeometry args={[0.3, 0.4, 0.8, 12]} />
        <meshPhysicalMaterial 
          color="#8B6914" 
          metalness={0.8} 
          roughness={0.3}
          clearcoat={0.6}
        />
      </mesh>

      {/* Decorative sconce details */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <torusGeometry args={[0.35, 0.05, 8, 16]} />
        <meshPhysicalMaterial 
          color="#B8860B" 
          metalness={0.9} 
          roughness={0.2}
          clearcoat={0.8}
        />
      </mesh>

      {/* Candle */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 1.2, 12]} />
        <meshStandardMaterial color="#F5DEB3" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Enhanced flickering flame */}
      <mesh ref={flameRef} position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial 
          color="#DAA520" 
          emissive="#FFD700" 
          emissiveIntensity={1.2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Wax drips */}
      <mesh position={[0.05, 0.6, 0]} castShadow>
        <sphereGeometry args={[0.03, 6, 6]} />
        <meshStandardMaterial color="#F5DEB3" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Point light for each sconce */}
      <pointLight
        position={[0, 1.5, 0]}
        intensity={0.8}
        distance={8}
        decay={2}
        color="#FF6347"
      />
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
      <EnhancedAtmosphere />

      {/* Brass sconces for ambient lighting */}
      {Array.from({ length: 12 }).map((_, i) => (
        <BrassSconce
          key={i}
          position={[
            Math.cos((i * Math.PI * 2) / 12) * 11,
            5,
            Math.sin((i * Math.PI * 2) / 12) * 11,
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

// Enhanced hero text
function ObservatoryHeroText() {
  return (
    <Float speed={0.6} rotationIntensity={0.02} floatIntensity={0.1}>
      <group position={[0, 18, 20]}>
        {/* OBSERVATORY title */}
        <mesh position={[-1, 0, 0]} castShadow>
          <boxGeometry args={[9, 2, 0.8]} />
          <meshPhysicalMaterial
            color="#B8860B"
            metalness={0.8}
            roughness={0.2}
            clearcoat={0.8}
            emissive="#8B6914"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* 2026 subtitle */}
        <mesh position={[0.5, -3, 0]} castShadow>
          <boxGeometry args={[6, 1.5, 0.6]} />
          <meshPhysicalMaterial
            color="#8B6914"
            metalness={0.7}
            roughness={0.3}
            clearcoat={0.6}
            emissive="#654321"
            emissiveIntensity={0.25}
          />
        </mesh>

        {/* Decorative brass elements */}
        <mesh position={[-7, 0, 0]} castShadow>
          <torusGeometry args={[0.5, 0.12, 12, 24]} />
          <meshPhysicalMaterial 
            color="#B87333" 
            metalness={0.8} 
            roughness={0.3}
            clearcoat={0.7}
          />
        </mesh>

        <mesh position={[7, 0, 0]} castShadow>
          <torusGeometry args={[0.5, 0.12, 12, 24]} />
          <meshPhysicalMaterial 
            color="#B87333" 
            metalness={0.8} 
            roughness={0.3}
            clearcoat={0.7}
          />
        </mesh>

        {/* Floating gear decorations */}
        <Float speed={1} rotationIntensity={0.5} floatIntensity={0.2}>
          <mesh position={[-10, 2, 0]} castShadow>
            <cylinderGeometry args={[0.8, 0.8, 0.2, 12]} />
            <meshPhysicalMaterial 
              color="#CD7F32" 
              metalness={0.9} 
              roughness={0.2}
              clearcoat={0.8}
            />
          </mesh>
        </Float>

        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.3}>
          <mesh position={[10, -1, 0]} castShadow>
            <cylinderGeometry args={[0.6, 0.6, 0.15, 8]} />
            <meshPhysicalMaterial 
              color="#CD7F32" 
              metalness={0.9} 
              roughness={0.2}
              clearcoat={0.8}
            />
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

      <Canvas 
        camera={{ position: [0, 15, 30], fov: 65 }} 
        shadows
        gl={{ 
          antialias: true, 
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Revolutionary lighting system */}
          <ambientLight intensity={0.5} color="#8B7D6B" />

          {/* Key Light - Main observatory illumination */}
          <directionalLight 
            position={[0, 35, 15]} 
            intensity={2.0} 
            color="#FFD700" 
            castShadow
            shadow-mapSize={[8192, 8192]}
            shadow-camera-far={150}
            shadow-camera-left={-80}
            shadow-camera-right={80}
            shadow-camera-top={80}
            shadow-camera-bottom={-80}
          />

          {/* Rim lighting for dramatic silhouettes */}
          <directionalLight 
            position={[-30, 20, -30]} 
            intensity={1.5} 
            color="#4169E1" 
          />

          {/* Volumetric lighting through dome opening */}
          <spotLight
            position={[0, 30, 0]}
            angle={0.3}
            penumbra={0.5}
            intensity={3.0}
            color="#DAA520"
            castShadow
            target-position={[0, 0, 0]}
          />

          {/* Mystical underglow */}
          <pointLight position={[0, -2, 0]} intensity={1.5} color="#9370DB" />

          {/* Enhanced dome interior lighting */}
          <pointLight position={[0, 18, 0]} intensity={2.8} color="#DAA520" />
          <pointLight position={[0, 16, 8]} intensity={2.0} color="#B8860B" />
          <pointLight position={[8, 16, 0]} intensity={1.8} color="#CD853F" />
          <pointLight position={[-8, 16, 0]} intensity={1.8} color="#CD853F" />
          <pointLight position={[0, 16, -8]} intensity={1.8} color="#B8860B" />

          {/* Focused candle lighting from sconces */}
          <pointLight position={[0, 10, 0]} intensity={2.5} color="#DAA520" castShadow />

          {/* Additional atmospheric lighting */}
          <pointLight position={[-15, 6, 8]} intensity={1.0} color="#8B6914" />
          <pointLight position={[15, 6, -8]} intensity={1.0} color="#8B6914" />

          {/* Hemisphere light for overall illumination */}
          <hemisphereLight args={["#DAA520", "#654321", 0.8]} />

          {/* Enhanced atmospheric fog */}
          <fog attach="fog" args={["#1a1a2e", 25, 80]} />

          {/* Multi-layered enhanced starry sky */}
          <Stars radius={200} depth={100} count={3000} factor={6} saturation={0} fade />
          <Stars radius={150} depth={80} count={2000} factor={4} saturation={0.1} fade />
          <Stars radius={100} depth={60} count={1500} factor={3} saturation={0.2} fade />

          {/* Environment mapping for realistic reflections */}
          <Environment preset="night" background={false} />

          <SteampunkObservatory />
          <ObservatoryHeroText />

          {/* Enhanced particle effects with twinkling stars */}
          <Sparkles count={400} scale={150} size={2.0} speed={0.01} color="#E6E6FA" opacity={0.8} />
          <Sparkles count={300} scale={120} size={1.5} speed={0.015} color="#F0F8FF" opacity={0.6} />
          <Sparkles count={200} scale={80} size={1.0} speed={0.008} color="#FFFACD" opacity={0.4} />
          <Sparkles count={250} scale={90} size={1.5} speed={0.02} color="#B8860B" opacity={0.5} />
          <Sparkles count={150} scale={50} size={1.0} speed={0.012} color="#8B7D6B" opacity={0.6} />

          {/* Enhanced OrbitControls */}
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            autoRotate
            autoRotateSpeed={0.2}
            maxPolarAngle={Math.PI / 2.1}
            minPolarAngle={Math.PI / 12}
            minDistance={15}
            maxDistance={70}
            target={[0, 8, 0]}
            enableDamping={true}
            dampingFactor={0.05}
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

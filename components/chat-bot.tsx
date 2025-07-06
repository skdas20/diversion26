"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Minimize2, Cog, Wrench, Zap, Crown, Scroll, Stamp, Mic, MicOff, Volume2, VolumeX } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
  type?: 'text' | 'quick-reply' | 'typing'
}

// Enhanced Realistic Steampunk Professor Avatar
function RealisticSteampunkProfessor({ 
  isListening, 
  isSpeaking, 
  emotion = 'neutral',
  speechIntensity = 0
}: { 
  isListening: boolean
  isSpeaking: boolean
  emotion?: 'neutral' | 'happy' | 'thinking' | 'excited'
  speechIntensity?: number
}) {
  const avatarRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)
  const eyesRef = useRef<THREE.Group>(null)
  const leftEyeRef = useRef<THREE.Mesh>(null)
  const rightEyeRef = useRef<THREE.Mesh>(null)
  const mouthRef = useRef<THREE.Mesh>(null)
  const jawRef = useRef<THREE.Mesh>(null)
  const eyebrowsRef = useRef<THREE.Group>(null)
  const gearRef = useRef<THREE.Mesh>(null)
  const steamRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (avatarRef.current) {
      // Subtle breathing animation
      avatarRef.current.scale.setScalar(1 + Math.sin(time * 1.2) * 0.015)
    }
    
    if (headRef.current) {
      if (isSpeaking) {
        // Natural head movement when speaking
        headRef.current.rotation.y = Math.sin(time * 2.5) * 0.08
        headRef.current.rotation.x = Math.sin(time * 1.8) * 0.03
        headRef.current.rotation.z = Math.sin(time * 2.2) * 0.02
      } else {
        // Idle head movement
        headRef.current.rotation.y = Math.sin(time * 0.8) * 0.03
        headRef.current.rotation.x = Math.sin(time * 0.6) * 0.01
      }
    }

    // Realistic eye movement and blinking
    if (eyesRef.current) {
      // Natural blinking pattern
      const blinkTime = time * 0.5
      const blink = Math.sin(blinkTime) > 0.98 || Math.sin(blinkTime * 1.3) > 0.995 ? 0.1 : 1
      eyesRef.current.scale.y = blink
      
      // Eye tracking movement
      if (!isSpeaking) {
        const eyeMovement = Math.sin(time * 0.3) * 0.02
        if (leftEyeRef.current && rightEyeRef.current) {
          leftEyeRef.current.position.x = -0.12 + eyeMovement
          rightEyeRef.current.position.x = 0.12 + eyeMovement
        }
      }
    }

    // Enhanced mouth movement for realistic speech
    if (mouthRef.current && jawRef.current) {
      if (isSpeaking) {
        // Complex mouth movement based on speech intensity
        const mouthOpen = 0.3 + speechIntensity * 0.4 + Math.sin(time * 12) * 0.2
        const jawDrop = speechIntensity * 0.15 + Math.sin(time * 8) * 0.1
        
        mouthRef.current.scale.y = Math.max(0.5, mouthOpen)
        mouthRef.current.scale.x = 1 + Math.sin(time * 10) * 0.1
        jawRef.current.position.y = 0.25 - jawDrop
        
        // Lip sync approximation
        const vowelShape = Math.sin(time * 15) > 0 ? 1.2 : 0.8
        mouthRef.current.scale.z = vowelShape
      } else {
        // Neutral mouth position
        mouthRef.current.scale.setScalar(1)
        jawRef.current.position.y = 0.25
      }
    }

    // Eyebrow expressions
    if (eyebrowsRef.current) {
      switch (emotion) {
        case 'happy':
          eyebrowsRef.current.rotation.z = Math.sin(time * 2) * 0.05
          break
        case 'thinking':
          eyebrowsRef.current.position.y = 0.65 + Math.sin(time * 3) * 0.02
          break
        case 'excited':
          eyebrowsRef.current.position.y = 0.67
          break
        default:
          eyebrowsRef.current.position.y = 0.65
      }
    }

    if (gearRef.current) {
      // Rotating gear on hat
      gearRef.current.rotation.z = time * (isSpeaking ? 3 : 1.5)
    }

    if (steamRef.current && (isListening || isSpeaking)) {
      // Enhanced steam effects
      steamRef.current.children.forEach((child: THREE.Object3D, i: number) => {
        child.position.y = Math.sin(time * 2 + i) * 0.4 + 1.5
        child.position.x = Math.sin(time * 1.5 + i) * 0.1
        child.scale.setScalar(0.3 + Math.sin(time * 1.8 + i) * 0.2)
      })
    }
  })

  return (
    <>
      {/* Outer group for 3D avatar, must be inside <Canvas> */}
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <group ref={avatarRef} scale={1.5}>
        {/* Enhanced Head */}
        <group ref={headRef}>
          {/* Main head shape */}
          <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[0.42, 32, 32]} />
            <meshStandardMaterial 
              color="#F5DEB3" 
              metalness={0.05} 
              roughness={0.8}
              normalScale={[0.3, 0.3]}
            />
          </mesh>

          {/* Facial structure details */}
          <mesh position={[0, 0.45, 0.35]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#E6C2A6" metalness={0.05} roughness={0.9} />
          </mesh>

          {/* Enhanced Eyes */}
          <group ref={eyesRef}>
            {/* Eye sockets */}
            <mesh position={[-0.12, 0.55, 0.32]}>
              <sphereGeometry args={[0.09, 16, 16]} />
              <meshStandardMaterial color="#E0D0C0" metalness={0.1} roughness={0.7} />
            </mesh>
            <mesh position={[0.12, 0.55, 0.32]}>
              <sphereGeometry args={[0.09, 16, 16]} />
              <meshStandardMaterial color="#E0D0C0" metalness={0.1} roughness={0.7} />
            </mesh>

            {/* Eyeballs */}
            <mesh ref={leftEyeRef} position={[-0.12, 0.55, 0.38]}>
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshStandardMaterial color="#FFFFFF" metalness={0.8} roughness={0.1} />
            </mesh>
            <mesh ref={rightEyeRef} position={[0.12, 0.55, 0.38]}>
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshStandardMaterial color="#FFFFFF" metalness={0.8} roughness={0.1} />
            </mesh>
            
            {/* Irises */}
            <mesh position={[-0.12, 0.55, 0.44]}>
              <sphereGeometry args={[0.035, 16, 16]} />
              <meshStandardMaterial color="#4169E1" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0.12, 0.55, 0.44]}>
              <sphereGeometry args={[0.035, 16, 16]} />
              <meshStandardMaterial color="#4169E1" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Pupils */}
            <mesh position={[-0.12, 0.55, 0.46]}>
              <sphereGeometry args={[0.015, 12, 12]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            <mesh position={[0.12, 0.55, 0.46]}>
              <sphereGeometry args={[0.015, 12, 12]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
          </group>

          {/* Eyebrows */}
          <group ref={eyebrowsRef} position={[0, 0.65, 0.35]}>
            <mesh position={[-0.12, 0, 0]} rotation={[0, 0, 0.2]}>
              <boxGeometry args={[0.15, 0.03, 0.02]} />
              <meshStandardMaterial color="#8B4513" metalness={0.1} roughness={0.9} />
            </mesh>
            <mesh position={[0.12, 0, 0]} rotation={[0, 0, -0.2]}>
              <boxGeometry args={[0.15, 0.03, 0.02]} />
              <meshStandardMaterial color="#8B4513" metalness={0.1} roughness={0.9} />
            </mesh>
          </group>

          {/* Enhanced Nose */}
          <mesh position={[0, 0.48, 0.42]}>
            <coneGeometry args={[0.04, 0.12, 8]} />
            <meshStandardMaterial color="#E6C2A6" metalness={0.05} roughness={0.8} />
          </mesh>

          {/* Nostrils */}
          <mesh position={[-0.015, 0.44, 0.45]}>
            <sphereGeometry args={[0.008, 8, 8]} />
            <meshStandardMaterial color="#D0B0A0" metalness={0.1} roughness={0.9} />
          </mesh>
          <mesh position={[0.015, 0.44, 0.45]}>
            <sphereGeometry args={[0.008, 8, 8]} />
            <meshStandardMaterial color="#D0B0A0" metalness={0.1} roughness={0.9} />
          </mesh>

          {/* Enhanced Mouth and Jaw */}
          <group ref={jawRef} position={[0, 0.25, 0]}>
            <mesh ref={mouthRef} position={[0, 0.1, 0.38]}>
              <sphereGeometry args={[0.08, 16, 16, 0, Math.PI]} />
              <meshStandardMaterial 
                color={isSpeaking ? "#FF6B6B" : "#CD5C5C"} 
                metalness={0.4} 
                roughness={0.6}
                emissive={isSpeaking ? "#FF3333" : "#000000"}
                emissiveIntensity={isSpeaking ? "#FF3333" : "#000000"}
              />
            </mesh>

            {/* Teeth */}
            <mesh position={[0, 0.12, 0.42]}>
              <boxGeometry args={[0.12, 0.02, 0.03]} />
              <meshStandardMaterial color="#FFFACD" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Tongue */}
            {isSpeaking && (
              <mesh position={[0, 0.08, 0.4]}>
                <sphereGeometry args={[0.04, 12, 12]} />
                <meshStandardMaterial color="#FF69B4" metalness={0.3} roughness={0.7} />
              </mesh>
            )}
          </group>

          {/* Enhanced Beard */}
          <mesh position={[0, 0.15, 0.32]}>
            <sphereGeometry args={[0.18, 16, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
            <meshStandardMaterial color="#8B4513" metalness={0.1} roughness={0.95} />
          </mesh>

          {/* Mustache */}
          <mesh position={[0, 0.38, 0.4]}>
            <sphereGeometry args={[0.08, 12, 12, 0, Math.PI * 2, Math.PI / 3, Math.PI / 3]} />
            <meshStandardMaterial color="#8B4513" metalness={0.1} roughness={0.95} />
          </mesh>
        </group>

        {/* Renaissance Hat */}
        <mesh position={[0, 0.9, 0]} rotation={[0, 0, 0.1]}>
          <cylinderGeometry args={[0.48, 0.38, 0.35, 20]} />
          <meshStandardMaterial color="#8B0000" metalness={0.4} roughness={0.6} />
        </mesh>

        {/* Hat Band */}
        <mesh position={[0, 0.85, 0]}>
          <torusGeometry args={[0.42, 0.03, 8, 20]} />
          <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Hat Feather */}
        <mesh position={[-0.32, 1.05, 0.2]} rotation={[0.3, -0.5, 0]}>
          <cylinderGeometry args={[0.02, 0.01, 0.9, 8]} />
          <meshStandardMaterial color="#228B22" metalness={0.3} roughness={0.7} />
        </mesh>

        {/* Enhanced Steampunk Gear on Hat */}
        <mesh ref={gearRef} position={[0.32, 0.95, 0.2]}>
          <cylinderGeometry args={[0.15, 0.15, 0.06, 12]} />
          <meshStandardMaterial 
            color="#B8860B" 
            metalness={0.95} 
            roughness={0.1}
            emissive="#8B6914"
            emissiveIntensity={isSpeaking ? 0.4 : 0.2}
          />
        </mesh>

        {/* Gear teeth */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              0.32 + Math.cos((i * Math.PI * 2) / 8) * 0.18,
              0.95,
              0.2 + Math.sin((i * Math.PI * 2) / 8) * 0.18,
            ]}
          >
            <boxGeometry args={[0.03, 0.06, 0.02]} />
            <meshStandardMaterial color="#B8860B" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}

        {/* Body/Torso */}
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.38, 0.42, 0.9, 20]} />
          <meshStandardMaterial color="#4B0082" metalness={0.2} roughness={0.8} />
        </mesh>

        {/* Renaissance Collar */}
        <mesh position={[0, 0.08, 0]}>
          <torusGeometry args={[0.45, 0.08, 8, 20]} />
          <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Vest */}
        <mesh position={[0, -0.1, 0.35]}>
          <boxGeometry args={[0.6, 0.7, 0.1]} />
          <meshStandardMaterial color="#8B4513" metalness={0.3} roughness={0.7} />
        </mesh>

        {/* Brass Buttons */}
        {[-0.15, -0.05, 0.05, 0.15].map((y, i) => (
          <mesh key={i} position={[0, y - 0.1, 0.41]}>
            <sphereGeometry args={[0.025, 12, 12]} />
            <meshStandardMaterial color="#B8860B" metalness={0.95} roughness={0.05} />
          </mesh>
        ))}

        {/* Monocle */}
        <mesh position={[0.2, 0.55, 0.38]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.08, 0.01, 8, 20]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.95} roughness={0.05} />
        </mesh>

        {/* Monocle lens */}
        <mesh position={[0.2, 0.55, 0.38]}>
          <cylinderGeometry args={[0.07, 0.07, 0.005, 16]} />
          <meshStandardMaterial 
            color="#E6F3FF" 
            metalness={0.1} 
            roughness={0.05}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Monocle Chain */}
        <mesh position={[0.28, 0.42, 0.32]} rotation={[0.5, 0, 0]}>
          <cylinderGeometry args={[0.003, 0.003, 0.35, 8]} />
          <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Enhanced Steam Effects */}
        <group ref={steamRef}>
          {Array.from({ length: 10 }).map((_, i) => (
            <mesh
              key={i}
              position={[
                (Math.random() - 0.5) * 1.2,
                1.3 + i * 0.08,
                (Math.random() - 0.5) * 1.2
              ]}
            >
              <sphereGeometry args={[0.04 + Math.random() * 0.02, 8, 8]} />
              <meshStandardMaterial 
                color="#F5F5DC"
                transparent
                opacity={0.5 - i * 0.04}
                emissive="#FFFFFF"
                emissiveIntensity={0.1}
              />
            </mesh>
          ))}
        </group>

        {/* Listening Indicator */}
        {isListening && (
          <mesh position={[0, 1.3, 0]}>
            <torusGeometry args={[0.35, 0.03, 8, 32]} />
            <meshStandardMaterial 
              color="#00FF00"
              emissive="#00FF00"
              emissiveIntensity={0.9}
              transparent
              opacity={0.8}
            />
          </mesh>
        )}

        {/* Speaking Glow */}
        {isSpeaking && (
          <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[0.7, 16, 16]} />
            <meshStandardMaterial
              color="#DAA520"
              transparent
              opacity={0.1 + speechIntensity * 0.1}
              emissive="#B8860B"
              emissiveIntensity={0.3 + speechIntensity * 0.2}
            />
          </mesh>
        )}
      </group>
    </>
  )
}

// Typing Indicator Component
function TypingIndicator() {
  return (
    <div className="flex items-center space-x-2 p-3 bg-amber-800/50 rounded-lg max-w-[80%]">
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
      <span className="text-amber-300 text-sm italic">Professor Gearwright is contemplating...</span>
    </div>
  )
}

export default function EnhancedSteampunkChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Greetings, distinguished scholar! I am Professor Gearwright, your Renaissance steampunk guide. How may I assist you in navigating the wonders of Diversion 2026?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [emotion, setEmotion] = useState<'neutral' | 'happy' | 'thinking' | 'excited'>('neutral')
  const [speechIntensity, setSpeechIntensity] = useState(0)
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true)
  const [recognition, setRecognition] = useState<any>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()
      recognitionInstance.continuous = false
      recognitionInstance.interimResults = false
      recognitionInstance.lang = 'en-US'

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInputText(transcript)
        setIsListening(false)
      }

      recognitionInstance.onerror = () => {
        setIsListening(false)
      }

      recognitionInstance.onend = () => {
        setIsListening(false)
      }

      setRecognition(recognitionInstance)
    }
  }, [])

  const quickReplies = [
    { text: "📜 Registration", icon: <Scroll className="w-3 h-3" /> },
    { text: "⚙️ Schedule", icon: <Cog className="w-3 h-3" /> },
    { text: "👑 Speakers", icon: <Crown className="w-3 h-3" /> },
    { text: "🏛️ Venue", icon: <Stamp className="w-3 h-3" /> },
    { text: "⚡ Tickets", icon: <Zap className="w-3 h-3" /> }
  ]

  // Gemini API call function
  const callGeminiAPI = async (prompt: string): Promise<string> => {
    try {
      const response = await fetch("/api/gemini", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error('API call failed')
      }

      const data = await response.json()
      return data.text || "I apologize, but my cognitive apparatus seems to be experiencing some mechanical difficulties. Might you rephrase your inquiry?"
    } catch (error) {
      console.error('Gemini API Error:', error)
      return "My apologies, esteemed colleague, but my connection to the ethereal knowledge networks appears to be disrupted. Please try again momentarily."
    }
  }

  // Text-to-speech function
  const speakText = (text: string) => {
    if (!isVoiceEnabled || !('speechSynthesis' in window)) return

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 1.1
    utterance.volume = 0.8

    // Try to find a distinguished voice
    const voices = speechSynthesis.getVoices()
    const preferredVoice = voices.find(voice => 
      voice.name.includes('British') || 
      voice.name.includes('UK') || 
      voice.lang.includes('en-GB')
    ) || voices.find(voice => voice.lang.includes('en'))

    if (preferredVoice) {
      utterance.voice = preferredVoice
    }

    utterance.onstart = () => {
      setIsSpeaking(true)
      setSpeechIntensity(0.7)
    }

    utterance.onend = () => {
      setIsSpeaking(false)
      setSpeechIntensity(0)
      setEmotion('neutral')
    }

    // Simulate speech intensity variation
    let intensityInterval: NodeJS.Timeout
    utterance.onstart = () => {
      setIsSpeaking(true)
      intensityInterval = setInterval(() => {
        setSpeechIntensity(Math.random() * 0.8 + 0.2)
      }, 100)
    }

    utterance.onend = () => {
      setIsSpeaking(false)
      setSpeechIntensity(0)
      setEmotion('neutral')
      if (intensityInterval) clearInterval(intensityInterval)
    }

    speechSynthesis.speak(utterance)
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputText
    setInputText("")
    setIsTyping(true)
    setEmotion('thinking')

    try {
      // Call Gemini API
      const botResponse = await callGeminiAPI(currentInput)
      
      setIsTyping(false)
      setEmotion('excited')
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      }
      
      setMessages((prev) => [...prev, botMessage])

      // Speak the response
      setTimeout(() => {
        speakText(botResponse)
      }, 500)

    } catch (error) {
      setIsTyping(false)
      setEmotion('neutral')
      
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "I apologize, but my mechanical cognition apparatus requires a moment of recalibration. Might you try your inquiry again?",
        isBot: true,
        timestamp: new Date(),
      }
      
      setMessages((prev) => [...prev, errorMessage])
    }
  }

  const handleVoiceInput = () => {
    if (!recognition) return

    if (isListening) {
      recognition.stop()
      setIsListening(false)
    } else {
      setIsListening(true)
      recognition.start()
    }
  }

  const handleQuickReply = (reply: string) => {
    const cleanReply = reply.replace(/[^\w\s]/gi, '').trim()
    setInputText(cleanReply)
    setTimeout(() => handleSendMessage(), 100)
  }

  // Enhanced floating button with steampunk styling
  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <div className="relative">
          {/* Glowing effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full blur-xl opacity-60 animate-pulse"></div>
          
          <button
            onClick={() => setIsOpen(true)}
            className="relative bg-gradient-to-r from-amber-700 via-orange-700 to-red-700 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white p-3 sm:p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 border-2 border-amber-500"
          >
            <div className="relative">
              <Cog className="h-6 w-6 sm:h-7 sm:w-7 animate-spin" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>
            </div>
          </button>

          {/* Steam particles */}
          <div className="absolute -top-2 -right-2 w-2 h-2 sm:w-3 sm:h-3 bg-amber-400 rounded-full animate-ping"></div>
          <div className="absolute -top-1 -left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 transition-all duration-500 ${
        isMinimized 
          ? "w-80 sm:w-96 h-20 sm:h-24" 
          : "w-80 sm:w-96 h-[500px] sm:h-[600px]"
      }`}
    >
      <div className="relative h-full">
        {/* Glowing background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 via-orange-600/20 to-red-600/20 rounded-3xl blur-2xl"></div>
        
        <div className="relative bg-gradient-to-br from-amber-900/95 via-orange-900/95 to-red-900/95 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-amber-600/50 h-full flex flex-col overflow-hidden">
          {/* Enhanced Header */}
          <div className="relative p-4 sm:p-6 border-b-2 border-amber-600/40">
            {/* Decorative gears */}
            <div className="absolute top-2 left-2 opacity-20">
              <Cog className="w-4 h-4 sm:w-6 sm:h-6 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <div className="absolute top-2 right-2 opacity-20">
              <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 relative">
                  <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
                    <ambientLight intensity={0.6} color="#8B7355" />
                    <directionalLight position={[2, 2, 2]} intensity={1.5} color="#DAA520" />
                    <pointLight position={[-2, 1, 2]} intensity={0.8} color="#FF6B35" />
                    <RealisticSteampunkProfessor 
                      isListening={isListening} 
                      isSpeaking={isSpeaking} 
                      emotion={emotion}
                      speechIntensity={speechIntensity}
                    />
                    <OrbitControls 
                      enableZoom={false} 
                      enablePan={false} 
                      autoRotate 
                      autoRotateSpeed={0.3}
                      maxPolarAngle={Math.PI / 2}
                      minPolarAngle={Math.PI / 3}
                    />
                  </Canvas>
                </div>
                <div>
                  <h3 className="text-amber-200 font-bold text-base sm:text-lg flex items-center gap-2">
                    <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                    Professor Gearwright
                  </h3>
                  <p className="text-amber-400 text-xs sm:text-sm flex items-center gap-1">
                    {isSpeaking ? (
                      <>
                        <Volume2 className="w-3 h-3 animate-pulse" />
                        Speaking...
                      </>
                    ) : isListening ? (
                      <>
                        <Mic className="w-3 h-3 animate-bounce" />
                        Listening...
                      </>
                    ) : isTyping ? (
                      <>
                        <Cog className="w-3 h-3 animate-spin" />
                        Contemplating...
                      </>
                    ) : (
                      <>
                        <Scroll className="w-3 h-3" />
                        Renaissance Guide
                      </>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 sm:space-x-3">
                <button
                  onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                  className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                    isVoiceEnabled 
                      ? 'text-amber-400 hover:text-amber-200 hover:bg-amber-800/30' 
                      : 'text-gray-500 hover:text-gray-400 hover:bg-gray-800/30'
                  }`}
                >
                  {isVoiceEnabled ? <Volume2 className="h-3 w-3 sm:h-4 sm:w-4" /> : <VolumeX className="h-3 w-3 sm:h-4 sm:w-4" />}
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-amber-400 hover:text-amber-200 transition-colors p-1.5 sm:p-2 rounded-lg hover:bg-amber-800/30"
                >
                  <Minimize2 className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="text-amber-400 hover:text-amber-200 transition-colors p-1.5 sm:p-2 rounded-lg hover:bg-amber-800/30"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Enhanced Messages */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4 bg-gradient-to-b from-transparent to-amber-900/20">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                    <div
                      className={`max-w-[85%] p-3 sm:p-4 rounded-2xl relative ${
                        message.isBot
                          ? "bg-gradient-to-br from-amber-800/60 to-orange-800/60 text-amber-100 border border-amber-600/30"
                          : "bg-gradient-to-br from-orange-600 to-red-700 text-white border border-orange-400/30"
                      }`}
                    >
                      {message.isBot && (
                        <div className="absolute -left-2 top-3 sm:top-4">
                          <Cog className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 opacity-60" />
                        </div>
                      )}
                      <p className="text-xs sm:text-sm leading-relaxed">{message.text}</p>
                      <div className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && <TypingIndicator />}
              </div>

              {/* Enhanced Quick Replies */}
              <div className="px-4 sm:px-6 pb-3 sm:pb-4">
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply.text)}
                      className="flex items-center gap-1.5 sm:gap-2 text-xs bg-gradient-to-r from-amber-800/50 to-orange-800/50 hover:from-amber-700/60 hover:to-orange-700/60 text-amber-300 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full transition-all duration-300 border border-amber-600/30 hover:border-amber-500/50 transform hover:scale-105"
                    >
                      {reply.icon}
                      <span className="hidden sm:inline">{reply.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Enhanced Input with Voice */}
              <div className="p-4 sm:p-6 border-t-2 border-amber-600/40 bg-gradient-to-t from-amber-900/30 to-transparent">
                <div className="flex space-x-2 sm:space-x-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Share your scholarly inquiry..."
                      className="w-full bg-gradient-to-r from-amber-900/60 to-orange-900/60 border-2 border-amber-600/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-amber-100 placeholder-amber-400/60 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
                    />
                    <div className="absolute right-2 sm:right-3 top-2 sm:top-3">
                      <Scroll className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500 opacity-50" />
                    </div>
                  </div>
                  
                  {/* Voice Input Button */}
                  {recognition && (
                    <button
                      onClick={handleVoiceInput}
                      className={`p-2 sm:p-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg border ${
                        isListening 
                          ? 'bg-gradient-to-r from-green-600 to-green-700 border-green-500/30 animate-pulse' 
                          : 'bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 border-amber-500/30'
                      } text-white`}
                    >
                      {isListening ? <MicOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Mic className="h-4 w-4 sm:h-5 sm:w-5" />}
                    </button>
                  )}

                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim()}
                    className="bg-gradient-to-r from-orange-600 to-red-700 hover:from-orange-700 hover:to-red-800 disabled:from-gray-600 disabled:to-gray-700 text-white p-2 sm:p-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg border border-orange-500/30"
                  >
                    <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

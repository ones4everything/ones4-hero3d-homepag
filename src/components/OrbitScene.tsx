import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { seasonConfigs } from '@/lib/seasonal-data'

interface OrbitSceneProps {
  scrollProgress: number
}

function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}

function lerpColor(color1: string, color2: string, t: number): THREE.Color {
  const c1 = new THREE.Color(color1)
  const c2 = new THREE.Color(color2)
  return new THREE.Color(
    lerp(c1.r, c2.r, t),
    lerp(c1.g, c2.g, t),
    lerp(c1.b, c2.b, t)
  )
}

export function OrbitScene({ scrollProgress }: OrbitSceneProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const directionalLightRef = useRef<THREE.DirectionalLight>(null)
  const ambientLightRef = useRef<THREE.AmbientLight>(null)
  const fogRef = useRef<THREE.Fog>(null)
  
  const orbitRadius = 8
  const targetAngle = useRef(0)
  const currentAngle = useRef(0)
  
  const seasonIndex = Math.floor(scrollProgress * 4)
  const seasonBlend = (scrollProgress * 4) % 1
  const currentSeasonIndex = Math.min(seasonIndex, 3)
  const nextSeasonIndex = Math.min(seasonIndex + 1, 3)
  
  const currentSeason = seasonConfigs[currentSeasonIndex]
  const nextSeason = seasonConfigs[nextSeasonIndex]
  
  useFrame((state, delta) => {
    targetAngle.current = scrollProgress * Math.PI * 2
    
    const lerpFactor = Math.min(delta * 6, 0.12)
    currentAngle.current = lerp(currentAngle.current, targetAngle.current, lerpFactor)
    
    if (cameraRef.current) {
      const x = Math.sin(currentAngle.current) * orbitRadius
      const z = Math.cos(currentAngle.current) * orbitRadius
      const y = 0
      
      cameraRef.current.position.set(x, y, z)
      cameraRef.current.lookAt(0, 0, 0)
    }
    
    if (directionalLightRef.current && ambientLightRef.current) {
      const lightColor = lerpColor(currentSeason.lightColor, nextSeason.lightColor, seasonBlend)
      const lightIntensity = lerp(currentSeason.lightIntensity, nextSeason.lightIntensity, seasonBlend)
      const ambientColor = lerpColor(currentSeason.ambientColor, nextSeason.ambientColor, seasonBlend)
      const ambientIntensity = lerp(currentSeason.ambientIntensity, nextSeason.ambientIntensity, seasonBlend)
      
      directionalLightRef.current.color = lightColor
      directionalLightRef.current.intensity = lightIntensity
      ambientLightRef.current.color = ambientColor
      ambientLightRef.current.intensity = ambientIntensity
    }
    
    if (state.scene.fog && fogRef.current) {
      const fogColor = lerpColor(currentSeason.fogColor, nextSeason.fogColor, seasonBlend)
      const fogDensity = lerp(currentSeason.fogDensity, nextSeason.fogDensity, seasonBlend)
      
      state.scene.fog = new THREE.FogExp2(fogColor.getHex(), fogDensity)
    }
  })
  
  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, orbitRadius]} fov={50} />
      <ambientLight ref={ambientLightRef} intensity={currentSeason.ambientIntensity} color={currentSeason.ambientColor} />
      <directionalLight 
        ref={directionalLightRef}
        position={[5, 5, 5]} 
        intensity={currentSeason.lightIntensity}
        color={currentSeason.lightColor}
        castShadow
      />
      <HeroProduct scrollProgress={scrollProgress} />
      <SeasonalParticles 
        scrollProgress={scrollProgress}
        seasonIndex={currentSeasonIndex}
        seasonBlend={seasonBlend}
      />
    </>
  )
}

function HeroProduct({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3
    }
  })
  
  return (
    <group position={[0, 0, 0]}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial 
          color="#ffffff" 
          metalness={0.8} 
          roughness={0.2}
          envMapIntensity={1.5}
        />
      </mesh>
      <mesh position={[0, -1.5, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.3} />
      </mesh>
    </group>
  )
}

interface Particle {
  position: THREE.Vector3
  velocity: THREE.Vector3
  life: number
}

function SeasonalParticles({ 
  scrollProgress, 
  seasonIndex,
  seasonBlend 
}: { 
  scrollProgress: number
  seasonIndex: number
  seasonBlend: number
}) {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 100
  
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: particleCount }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 15,
        Math.random() * 10,
        (Math.random() - 0.5) * 15
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        -Math.random() * 0.02 - 0.01,
        (Math.random() - 0.5) * 0.02
      ),
      life: Math.random()
    }))
  }, [])
  
  useFrame((state, delta) => {
    if (!particlesRef.current) return
    
    const positions = particlesRef.current.geometry.attributes.position
    
    particles.forEach((particle, i) => {
      particle.position.add(particle.velocity)
      
      if (particle.position.y < 0) {
        particle.position.y = 10
        particle.position.x = (Math.random() - 0.5) * 15
        particle.position.z = (Math.random() - 0.5) * 15
      }
      
      positions.setXYZ(i, particle.position.x, particle.position.y, particle.position.z)
    })
    
    positions.needsUpdate = true
  })
  
  const shouldShowParticles = seasonIndex === 2 || seasonIndex === 3
  const particleOpacity = shouldShowParticles ? Math.min(seasonBlend * 2, 1) : Math.max(1 - seasonBlend * 2, 0)
  
  if (!shouldShowParticles && particleOpacity < 0.01) return null
  
  const particleColor = seasonIndex === 2 
    ? seasonConfigs[2].particleColor 
    : seasonConfigs[3].particleColor
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={new Float32Array(particleCount * 3)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color={particleColor}
        transparent
        opacity={particleOpacity}
        sizeAttenuation
      />
    </points>
  )
}

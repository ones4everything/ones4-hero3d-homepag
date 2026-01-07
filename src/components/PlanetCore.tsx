import { useRef, useEffect, useState, Suspense } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function createGradientTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  
  if (ctx) {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, '#1a1a3e')
    gradient.addColorStop(0.3, '#2d4a7c')
    gradient.addColorStop(0.5, '#4a6fa5')
    gradient.addColorStop(0.7, '#ff6b35')
    gradient.addColorStop(1, '#1a1a3e')
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
  
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  return texture
}

function VideoSphere({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [videoTexture, setVideoTexture] = useState<THREE.VideoTexture | null>(null)
  const [videoError, setVideoError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const hoverRotationRef = useRef(0)
  const fallbackTexture = useRef<THREE.Texture | null>(null)
  const { viewport } = useThree()

  useEffect(() => {
    fallbackTexture.current = createGradientTexture()
    
    const video = document.createElement('video')
    video.src = '/video/planet-seasons.mp4'
    video.loop = true
    video.muted = true
    video.playsInline = true
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')
    video.crossOrigin = 'anonymous'
    
    video.onerror = () => {
      console.warn('Video failed to load, using gradient fallback')
      setVideoError(true)
    }
    
    video.onloadeddata = () => {
      const texture = new THREE.VideoTexture(video)
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
      texture.format = THREE.RGBFormat
      texture.colorSpace = THREE.SRGBColorSpace
      setVideoTexture(texture)
    }
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (!prefersReducedMotion) {
      video.play().catch(err => {
        console.warn('Video autoplay failed:', err)
        setVideoError(true)
      })
    } else {
      setVideoError(true)
    }

    videoRef.current = video

    return () => {
      if (video) {
        video.pause()
        video.src = ''
      }
      if (videoTexture) {
        videoTexture.dispose()
      }
      if (fallbackTexture.current) {
        fallbackTexture.current.dispose()
      }
    }
  }, [])

  useFrame((state, delta) => {
    if (!meshRef.current) return

    if (isHovered) {
      hoverRotationRef.current += delta * 0.3
      meshRef.current.rotation.y = scrollProgress * Math.PI * 2 + hoverRotationRef.current
    } else {
      hoverRotationRef.current = 0
      meshRef.current.rotation.y = scrollProgress * Math.PI * 2
    }
  })

  const isMobile = viewport.width < 6

  const textureToUse = videoError || !videoTexture ? fallbackTexture.current : videoTexture

  return (
    <mesh 
      ref={meshRef}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <sphereGeometry args={[1.5, isMobile ? 32 : 64, isMobile ? 32 : 64]} />
      <meshStandardMaterial
        map={textureToUse ?? undefined}
        toneMapped={false}
        roughness={0.35}
        metalness={0.6}
        emissive="#ffffff"
        emissiveIntensity={0.4}
      />
    </mesh>
  )
}

function WireframeFallback() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshBasicMaterial
        color="#00ffff"
        wireframe={true}
        opacity={0.3}
        transparent={true}
      />
    </mesh>
  )
}

export function PlanetCore({ scrollProgress }: { scrollProgress: number }) {
  return (
    <Suspense fallback={<WireframeFallback />}>
      <VideoSphere scrollProgress={scrollProgress} />
    </Suspense>
  )
}

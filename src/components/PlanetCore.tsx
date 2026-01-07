import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useIsMobile } from '@/hooks/use-mobile'

interface PlanetCoreProps {
  scrollProgress: number
}

function VideoSphere({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [videoTexture, setVideoTexture] = useState<THREE.VideoTexture | null>(null)
  const [videoError, setVideoError] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const video = document.createElement('video')
    video.src = '/video/planet-seasons.mp4'
    video.loop = true
    video.muted = true
    video.playsInline = true
    video.crossOrigin = 'anonymous'
    
    videoRef.current = video

    const texture = new THREE.VideoTexture(video)
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.colorSpace = THREE.SRGBColorSpace
    setVideoTexture(texture)

    video.onerror = () => {
      console.log('Video failed to load, using gradient fallback')
      setVideoError(true)
    }

    video.play().catch((error) => {
      console.log('Video autoplay failed:', error)
      setVideoError(true)
    })

    return () => {
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.src = ''
      }
      if (texture) {
        texture.dispose()
      }
    }
  }, [])

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = scrollProgress * Math.PI * 2
    }
  })

  const segments = isMobile ? 32 : 64

  if (videoError || !videoTexture) {
    return (
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, segments, segments]} />
        <meshStandardMaterial
          color="#00ffff"
          wireframe
          opacity={0.3}
          transparent
        />
      </mesh>
    )
  }

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <sphereGeometry args={[1, segments, segments]} />
      <meshStandardMaterial
        map={videoTexture}
        toneMapped={false}
        roughness={0.35}
        metalness={0.6}
        emissive="#ffffff"
        emissiveIntensity={0.4}
      />
    </mesh>
  )
}

export function PlanetCore({ scrollProgress }: PlanetCoreProps) {
  return (
    <group>
      <VideoSphere scrollProgress={scrollProgress} />
    </group>
  )
}

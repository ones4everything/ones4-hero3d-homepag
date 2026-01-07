import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

interface CategoryNodeProps {
  position: [number, number, number]
  label: string
  scrollProgress: number
  index: number
}

export function CategoryNode({ position, label, scrollProgress, index }: CategoryNodeProps) {
  const groupRef = useRef<THREE.Group>(null)

  const fadeOutStart = 0.05 + (index * 0.05)
  const fadeOutEnd = fadeOutStart + 0.1
  
  const opacity = scrollProgress < fadeOutStart ? 1 : 
                  scrollProgress > fadeOutEnd ? 0 :
                  1 - ((scrollProgress - fadeOutStart) / (fadeOutEnd - fadeOutStart))

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.set(
        position[0],
        position[1],
        position[2]
      )
    }
  })

  if (opacity === 0) return null

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial 
          color="#00ffff"
          transparent
          opacity={opacity}
        />
      </mesh>

      <Html
        center
        distanceFactor={8}
        position={[0, -0.25, 0]}
        style={{ 
          opacity, 
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      >
        <div className="text-sm font-medium text-white whitespace-nowrap bg-black/50 px-3 py-1 rounded-full border border-cyan-500/30">
          {label}
        </div>
      </Html>
    </group>
  )
}

import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Line } from '@react-three/drei'
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
      <Line
        points={[[0, 0, 0], position]}
        color="#00ffff"
        lineWidth={1}
        transparent
        opacity={opacity * 0.3}
      />

      <mesh>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial 
          color="#00ffff"
          transparent
          opacity={opacity}
        />
      </mesh>

      <Html
        center
        distanceFactor={8}
        position={[0, -0.2, 0]}
        style={{ 
          opacity, 
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      >
        <div className="text-sm font-medium text-white whitespace-nowrap">
          {label}
        </div>
      </Html>
    </group>
  )
}

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Line } from '@react-three/drei'
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

  const linePoints = useMemo(() => [
    [0, 0, 0] as [number, number, number],
    position
  ], [position])

  if (opacity === 0) return null

  return (
    <>
      <Line
        points={linePoints}
        color="#00ffff"
        lineWidth={1}
        transparent
        opacity={opacity * 0.3}
      />

      <group ref={groupRef}>
        <mesh>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial 
            color="#00ffff" 
            transparent={true}
            opacity={opacity}
          />
        </mesh>

        <Text
          position={[0, -0.2, 0]}
          fontSize={0.12}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          fillOpacity={opacity}
        >
          {label}
        </Text>
      </group>
    </>
  )
}

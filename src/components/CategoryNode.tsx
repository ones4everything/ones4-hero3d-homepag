import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface CategoryNodeProps {
  label: string
  position: [number, number, number]
  opacity: number
  delay: number
}

export function CategoryNode({ label, position, opacity, delay }: CategoryNodeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const lineRef = useRef<THREE.Line>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.scale.setScalar(Math.max(0, opacity))
    }
    if (lineRef.current && lineRef.current.material) {
      ;(lineRef.current.material as THREE.LineBasicMaterial).opacity = Math.max(0, opacity)
    }
  })

  const linePoints = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...position)]
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints)

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#00ffff"
          emissiveIntensity={0.5}
          transparent
          opacity={opacity}
        />
      </mesh>
      
      <Text
        position={[0, -0.4, 0]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {label}
      </Text>

      <line ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial 
          color="#00ffff" 
          transparent 
          opacity={opacity}
          linewidth={2}
        />
      </line>

      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial 
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={1}
          transparent
          opacity={opacity}
        />
      </mesh>
    </group>
  )
}

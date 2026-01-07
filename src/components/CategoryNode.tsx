import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface CategoryNodeProps {
  position: [number, number, number]
  label: string
  scrollProgress: number
  index: number
}

export function CategoryNode({ position, label, scrollProgress, index }: CategoryNodeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const lineRef = useRef<THREE.Line | null>(null)
  const { scene } = useThree()

  const fadeOutStart = 0.05 + (index * 0.05)
  const fadeOutEnd = fadeOutStart + 0.1
  
  const opacity = scrollProgress < fadeOutStart ? 1 : 
                  scrollProgress > fadeOutEnd ? 0 :
                  1 - ((scrollProgress - fadeOutStart) / (fadeOutEnd - fadeOutStart))

  const geometry = useMemo(() => {
    const points = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(position[0], position[1], position[2])
    ]
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [position])

  useEffect(() => {
    const material = new THREE.LineBasicMaterial({ 
      color: 0x00ffff, 
      transparent: true,
      opacity: 0.3
    })
    const line = new THREE.Line(geometry, material)
    lineRef.current = line
    scene.add(line)
    
    return () => {
      scene.remove(line)
      geometry.dispose()
      material.dispose()
    }
  }, [geometry, scene])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.set(
        position[0],
        position[1],
        position[2]
      )
    }
    if (lineRef.current) {
      const material = lineRef.current.material as THREE.LineBasicMaterial
      if (material) {
        material.opacity = opacity * 0.3
      }
      lineRef.current.visible = opacity > 0
    }
  })

  if (opacity === 0) return null

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial 
          color={new THREE.Color("#00ffff")}
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
  )
}

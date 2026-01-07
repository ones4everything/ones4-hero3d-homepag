import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
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
  const lineRef = useRef<THREE.Line | null>(null)
  const materialRef = useRef<THREE.LineBasicMaterial | null>(null)
  const geometryRef = useRef<THREE.BufferGeometry | null>(null)
  const { scene } = useThree()

  const fadeOutStart = 0.05 + (index * 0.05)
  const fadeOutEnd = fadeOutStart + 0.1
  
  const opacity = scrollProgress < fadeOutStart ? 1 : 
                  scrollProgress > fadeOutEnd ? 0 :
                  1 - ((scrollProgress - fadeOutStart) / (fadeOutEnd - fadeOutStart))

  const linePoints = useMemo(() => [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(position[0], position[1], position[2])
  ], [position])

  useEffect(() => {
    if (!scene) return
    
    const geometry = new THREE.BufferGeometry().setFromPoints(linePoints)
    const material = new THREE.LineBasicMaterial({ 
      color: 0x00ffff, 
      transparent: true,
      opacity: 0.3
    })
    const line = new THREE.Line(geometry, material)
    
    geometryRef.current = geometry
    materialRef.current = material
    lineRef.current = line
    scene.add(line)
    
    return () => {
      if (lineRef.current) {
        scene.remove(lineRef.current)
        lineRef.current = null
      }
      if (materialRef.current) {
        materialRef.current.dispose()
        materialRef.current = null
      }
      if (geometryRef.current) {
        geometryRef.current.dispose()
        geometryRef.current = null
      }
    }
  }, [linePoints, scene])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.set(
        position[0],
        position[1],
        position[2]
      )
    }
    if (lineRef.current && materialRef.current) {
      materialRef.current.opacity = opacity * 0.3
      lineRef.current.visible = opacity > 0
    }
  })

  if (opacity === 0) return null

  return (
    <group ref={groupRef}>
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

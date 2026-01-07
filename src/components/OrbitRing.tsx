import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Html } from '@react-three/drei'
import * as THREE from 'three'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface OrbitRingProps {
  name: string
  description: string
  price: string
  radius: number
  angle: number
  scrollProgress: number
  opacity: number
  delay: number
}

export function OrbitRing({ 
  name, 
  description, 
  price, 
  radius, 
  angle, 
  scrollProgress,
  opacity, 
  delay 
}: OrbitRingProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame(() => {
    if (groupRef.current) {
      const totalAngle = angle + scrollProgress * Math.PI * 0.5
      groupRef.current.position.x = Math.cos(totalAngle) * radius
      groupRef.current.position.y = Math.sin(totalAngle) * radius
      groupRef.current.scale.setScalar(Math.max(0, opacity))
    }
  })

  return (
    <group 
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={hovered ? 1 : 0.5}
          transparent
          opacity={opacity}
        />
      </mesh>

      <Html
        distanceFactor={10}
        position={[0, 0, 0]}
        center
        style={{
          pointerEvents: hovered ? 'auto' : 'none',
          transition: 'all 0.2s',
        }}
      >
        <Card 
          className={`
            p-4 min-w-[${hovered ? '200px' : '120px'}] 
            bg-card/90 backdrop-blur-md border-primary/30 
            transition-all duration-200 cursor-pointer
            ${hovered ? 'neon-glow scale-110' : ''}
          `}
        >
          <h3 className="text-sm font-bold mb-1">{name}</h3>
          {hovered && (
            <>
              <p className="text-xs text-muted-foreground mb-2">{description}</p>
              <Badge variant="secondary" className="text-xs">{price}</Badge>
            </>
          )}
        </Card>
      </Html>
    </group>
  )
}

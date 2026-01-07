import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

interface Product {
  name: string
  description: string
  price: string
  angle: number
}

interface OrbitRingProps {
  radius: number
  products: Product[]
  scrollProgress: number
  ringIndex: number
}

export function OrbitRing({ radius, products, scrollProgress, ringIndex }: OrbitRingProps) {
  const ringRef = useRef<THREE.Mesh>(null)
  
  const fadeInStart = 0.2 + (ringIndex * 0.05)
  const fadeInEnd = fadeInStart + 0.15
  
  const opacity = scrollProgress < fadeInStart ? 0 : 
                  scrollProgress > fadeInEnd ? 1 :
                  ((scrollProgress - fadeInStart) / (fadeInEnd - fadeInStart))

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z = scrollProgress * Math.PI * 0.5
    }
  })
  
  if (!products || !Array.isArray(products) || products.length === 0) return null
  if (opacity === 0) return null

  return (
    <group>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.01, 16, 64]} />
        <meshBasicMaterial 
          color="#00ffff" 
          transparent
          opacity={opacity * 0.3}
          toneMapped={false}
        />
      </mesh>

      {products.filter(p => p && typeof p === 'object' && p.name).map((product, index) => {
        if (!product || !product.name) return null
        return (
          <ProductCallout
            key={`${product.name}-${index}`}
            product={product}
            radius={radius}
            opacity={opacity}
            scrollProgress={scrollProgress}
          />
        )
      })}
    </group>
  )
}

interface ProductCalloutProps {
  product: Product
  radius: number
  opacity: number
  scrollProgress: number
}

function ProductCallout({ product, radius, opacity, scrollProgress }: ProductCalloutProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const groupRef = useRef<THREE.Group>(null)

  const isValid = product && product.name
  const angle = isValid ? ((product.angle ?? 0) + scrollProgress * Math.PI * 0.3) : 0
  const x = Math.cos(angle) * radius
  const z = Math.sin(angle) * radius

  useFrame(() => {
    if (groupRef.current && isValid) {
      groupRef.current.position.set(x, 0, z)
      groupRef.current.lookAt(0, 0, 0)
    }
  })
  
  if (!isValid || opacity === 0) return null

  const handleMouseEnter = () => setIsExpanded(true)
  const handleMouseLeave = () => setIsExpanded(false)
  const handleFocus = () => setIsExpanded(true)
  const handleBlur = () => setIsExpanded(false)

  return (
    <group ref={groupRef}>
      <Html
        center
        distanceFactor={6}
        style={{ 
          opacity, 
          pointerEvents: opacity > 0.5 ? 'auto' : 'none',
          userSelect: 'none'
        }}
        zIndexRange={[100, 0]}
      >
        <div
          className={`
            transition-all duration-300 cursor-pointer
            ${isExpanded ? 'w-64 p-6 neon-glow' : 'w-48 p-4'}
            bg-card/90 backdrop-blur-md border border-primary/30 rounded-lg
            hover:scale-105 hover:neon-glow
          `}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
          tabIndex={opacity > 0.5 ? 0 : -1}
          role="button"
          aria-label={`${product.name} - ${product.price}`}
        >
          <div className="space-y-2">
            <div className="w-full aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-md" />
            
            <h3 className="font-semibold text-sm text-foreground">
              {product.name}
            </h3>

            {isExpanded && (
              <>
                <p className="text-xs text-muted-foreground">
                  {product.description}
                </p>
                <p className="text-lg font-bold text-primary">
                  {product.price}
                </p>
              </>
            )}
          </div>
        </div>
      </Html>
    </group>
  )
}

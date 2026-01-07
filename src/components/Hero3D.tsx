import { useRef, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import { PlanetCore } from './PlanetCore'
import { CategoryNode } from './CategoryNode'
import { OrbitRing } from './OrbitRing'
import { FloatingText } from './FloatingText'

const categories = [
  { label: 'Wearables', position: [-1.8, 0.8, 0] as [number, number, number] },
  { label: 'Computing', position: [1.8, 0.8, 0] as [number, number, number] },
  { label: 'Displays', position: [-1.8, -0.8, 0] as [number, number, number] },
  { label: 'Components', position: [1.8, -0.8, 0] as [number, number, number] },
]

const products = [
  [
    { name: 'Neural Link', description: 'Direct brain interface', price: '$2,499', angle: 0 },
    { name: 'Quantum Core', description: 'Next-gen processor', price: '$4,999', angle: Math.PI * 0.66 },
    { name: 'Holo Lens', description: 'AR/VR display system', price: '$1,899', angle: Math.PI * 1.33 },
  ],
  [
    { name: 'Cyber Deck', description: 'Portable computing', price: '$3,299', angle: Math.PI * 0.5 },
    { name: 'Nano Shield', description: 'Advanced protection', price: '$899', angle: Math.PI },
    { name: 'Flux Drive', description: 'Quantum storage', price: '$1,499', angle: Math.PI * 1.5 },
  ],
]

const floatingTexts = [
  { text: 'Immersive commerce hardware', start: 0.15, end: 0.35, direction: 'right' as const },
  { text: 'AI-driven shopping', start: 0.4, end: 0.6, direction: 'left' as const },
  { text: 'Classical meets quantum', start: 0.65, end: 0.85, direction: 'right' as const },
]

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const containerHeight = containerRef.current.offsetHeight
      
      const scrollStart = -rect.top
      const scrollRange = containerHeight - viewportHeight
      
      const progress = Math.max(0, Math.min(1, scrollStart / scrollRange))
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div 
        ref={containerRef}
        className="relative w-full"
        style={{ height: '450vh' }}
      >
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
          >
            <color attach="background" args={['#000000']} />
            
            <ambientLight intensity={0.2} />
            <directionalLight position={[10, 10, 5]} intensity={2.0} castShadow />
            <spotLight position={[-5, 5, 5]} intensity={1.5} color="#00ffff" angle={0.3} penumbra={1} />
            <spotLight position={[5, -5, 5]} intensity={1.2} color="#ff00ff" angle={0.3} penumbra={1} />

            <Stars 
              radius={100} 
              depth={50} 
              count={5000} 
              factor={4} 
              saturation={0} 
              fade 
              speed={1}
            />

            <PlanetCore scrollProgress={scrollProgress} />

            {categories.map((category, index) => (
              <CategoryNode
                key={index}
                position={category.position}
                label={category.label}
                scrollProgress={scrollProgress}
                index={index}
              />
            ))}

            <OrbitRing 
              radius={2.5} 
              products={products[0]} 
              scrollProgress={scrollProgress}
              ringIndex={0}
            />
            <OrbitRing 
              radius={3.2} 
              products={products[1]} 
              scrollProgress={scrollProgress}
              ringIndex={1}
            />

            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
          </Canvas>

          {floatingTexts.map((item, index) => (
            <FloatingText
              key={index}
              text={item.text}
              scrollProgress={scrollProgress}
              startProgress={item.start}
              endProgress={item.end}
              direction={item.direction}
            />
          ))}
        </div>
      </div>
    </>
  )
}

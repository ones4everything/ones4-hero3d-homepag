import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
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
  { name: 'Neural Link', description: 'Direct brain interface', price: '$2,499', radius: 3 },
  { name: 'Quantum Core', description: 'Next-gen processor', price: '$4,999', radius: 3.5 },
  { name: 'Holo Lens', description: 'AR/VR display system', price: '$1,899', radius: 3 },
  { name: 'Cyber Deck', description: 'Portable computing', price: '$3,299', radius: 3.5 },
]

const floatingTexts = [
  { text: 'Immersive commerce hardware', start: 0.15, end: 0.35, y: 2 },
  { text: 'AI-driven shopping', start: 0.4, end: 0.6, y: 0 },
  { text: 'Classical meets quantum', start: 0.65, end: 0.85, y: -2 },
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

  const showCategories = scrollProgress < 0.25
  const showProducts = scrollProgress >= 0.25

  return (
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
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight 
              position={[10, 10, 5]} 
              intensity={2.0}
              castShadow
            />
            <spotLight 
              position={[-5, 5, 5]} 
              intensity={1.5}
              color="#00ffff"
              angle={0.3}
              penumbra={1}
            />
            <spotLight 
              position={[5, -5, 5]} 
              intensity={1.5}
              color="#ff00ff"
              angle={0.3}
              penumbra={1}
            />

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

            {showCategories && categories.map((category, index) => (
              <CategoryNode
                key={category.label}
                label={category.label}
                position={category.position}
                opacity={1 - scrollProgress * 4}
                delay={index * 0.1}
              />
            ))}

            {showProducts && products.map((product, index) => (
              <OrbitRing
                key={product.name}
                {...product}
                angle={(index / products.length) * Math.PI * 2}
                scrollProgress={scrollProgress}
                opacity={Math.min(1, (scrollProgress - 0.25) * 4)}
                delay={index * 0.08}
              />
            ))}
          </Suspense>
        </Canvas>

        {floatingTexts.map((item, index) => {
          const isVisible = scrollProgress >= item.start && scrollProgress <= item.end
          const textProgress = (scrollProgress - item.start) / (item.end - item.start)
          const xOffset = (textProgress - 0.5) * 100

          return (
            <AnimatePresence key={index}>
              {isVisible && (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: xOffset }}
                  exit={{ opacity: 0, x: 50 }}
                  className="absolute top-1/4 left-1/2 -translate-x-1/2 pointer-events-none z-10"
                  style={{
                    top: `${20 + index * 15}%`
                  }}
                >
                  <p className="text-2xl md:text-3xl font-bold text-glow opacity-70">
                    {item.text}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          )
        })}
      </div>
    </div>
  )
}

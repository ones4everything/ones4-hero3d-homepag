import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cube, Cpu, Monitor, CellSignalFull } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const categories = [
  { label: 'Wearables', icon: Cube },
  { label: 'Computing', icon: Cpu },
  { label: 'Displays', icon: Monitor },
  { label: 'Components', icon: CellSignalFull },
]

const products = [
  { name: 'Neural Link', description: 'Direct brain interface', price: '$2,499' },
  { name: 'Quantum Core', description: 'Next-gen processor', price: '$4,999' },
  { name: 'Holo Lens', description: 'AR/VR display system', price: '$1,899' },
  { name: 'Cyber Deck', description: 'Portable computing', price: '$3,299' },
  { name: 'Nano Shield', description: 'Advanced protection', price: '$899' },
  { name: 'Flux Drive', description: 'Quantum storage', price: '$1,499' },
]

const floatingTexts = [
  { text: 'Immersive commerce hardware', start: 0.15, end: 0.35 },
  { text: 'AI-driven shopping', start: 0.4, end: 0.6 },
  { text: 'Classical meets quantum', start: 0.65, end: 0.85 },
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
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-deep-navy via-dark-blue to-black"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, oklch(0.15 0.08 240 / 0.3), transparent 50%),
              radial-gradient(circle at 80% 70%, oklch(0.70 0.14 200 / 0.15), transparent 50%),
              radial-gradient(circle at 50% 50%, oklch(0.85 0.25 330 / 0.1), transparent 60%)
            `
          }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, oklch(1 0 0 / 0.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            animation: 'twinkle 3s ease-in-out infinite'
          }} />
        </div>

        <motion.div
          className="relative w-96 h-96 flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            rotateY: scrollProgress * 360,
          }}
          transition={{ duration: 0.8 }}
        >
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, oklch(0.78 0.13 195), oklch(0.15 0.02 240))',
              boxShadow: `
                0 0 60px oklch(0.78 0.13 195 / 0.6),
                0 0 120px oklch(0.70 0.14 200 / 0.3),
                inset 0 0 80px oklch(0.15 0.02 240 / 0.8)
              `,
              animation: 'pulse 4s ease-in-out infinite'
            }}
          />
          
          <div className="relative z-10 text-center">
            <motion.h2 
              className="text-4xl font-bold text-glow mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ONES4
            </motion.h2>
          </div>
        </motion.div>

        <AnimatePresence>
          {showCategories && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {categories.map((category, index) => {
                const angle = (index / categories.length) * Math.PI * 2 - Math.PI / 2
                const radius = 280
                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius
                const Icon = category.icon

                return (
                  <motion.div
                    key={category.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ 
                      delay: index * 0.1,
                      duration: 0.5
                    }}
                    className="absolute pointer-events-auto"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <Card className="p-4 bg-card/80 backdrop-blur-md border-cyan-blue/30 hover:border-neon-cyan transition-all hover:neon-glow">
                      <div className="flex flex-col items-center gap-2">
                        <Icon size={32} weight="regular" className="text-cyan-blue" />
                        <span className="text-sm font-semibold">{category.label}</span>
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          )}

          {showProducts && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {products.map((product, index) => {
                const angle = (index / products.length) * Math.PI * 2 - Math.PI / 2
                const radius = 300 + (index % 2) * 80
                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius

                return (
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      rotate: scrollProgress * 60 * (index % 2 ? 1 : -1)
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ 
                      delay: index * 0.08,
                      duration: 0.5
                    }}
                    className="absolute pointer-events-auto group"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <Card className="p-4 min-w-[180px] bg-card/90 backdrop-blur-md border-primary/30 hover:border-accent transition-all hover:neon-glow hover:scale-110 cursor-pointer">
                      <h3 className="text-sm font-bold mb-1">{product.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{product.description}</p>
                      <Badge variant="secondary" className="text-xs">{product.price}</Badge>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          )}
        </AnimatePresence>

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
                  className="absolute top-1/4 left-1/2 -translate-x-1/2 pointer-events-none"
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

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}

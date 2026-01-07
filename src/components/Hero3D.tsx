import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const categories = [
  { label: 'Wearables', emoji: '⌚' },
  { label: 'Computing', emoji: '💻' },
  { label: 'Displays', emoji: '📺' },
  { label: 'Components', emoji: '🔌' },
]

const products = [
  { name: 'Neural Link', description: 'Direct brain interface', price: '$2,499', emoji: '🧠' },
  { name: 'Quantum Core', description: 'Next-gen processor', price: '$4,999', emoji: '⚛️' },
  { name: 'Holo Lens', description: 'AR/VR display system', price: '$1,899', emoji: '🥽' },
  { name: 'Cyber Deck', description: 'Portable computing', price: '$3,299', emoji: '🎮' },
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
  const rotation = scrollProgress * 360

  return (
    <div 
      ref={containerRef}
      className="relative w-full"
      style={{ height: '450vh' }}
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-gradient-to-b from-black via-deep-navy to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--cyan-blue)_0%,_transparent_50%)] opacity-20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, rgba(34, 211, 238, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-64 h-64 md:w-96 md:h-96 rounded-full relative"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #22d3ee, #06b6d4, #0891b2)',
              boxShadow: '0 0 80px rgba(34, 211, 238, 0.6), inset 0 0 40px rgba(0, 0, 0, 0.3)',
              rotate: rotation
            }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
          </motion.div>

          {showCategories && categories.map((category, index) => {
            const angle = (index / categories.length) * Math.PI * 2
            const radius = 250
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius
            const opacity = Math.max(0, 1 - scrollProgress * 4)

            return (
              <motion.div
                key={category.label}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  opacity
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="px-6 py-4 bg-card/80 backdrop-blur-sm border-border hover:border-accent transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{category.emoji}</span>
                    <span className="font-semibold">{category.label}</span>
                  </div>
                </Card>
              </motion.div>
            )
          })}

          {showProducts && products.map((product, index) => {
            const angle = (index / products.length) * Math.PI * 2 + scrollProgress * Math.PI
            const radius = 280
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius
            const opacity = Math.min(1, (scrollProgress - 0.25) * 4)

            return (
              <motion.div
                key={product.name}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  opacity
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.08 }}
              >
                <Card className="px-6 py-4 bg-card/90 backdrop-blur-sm border-border hover:border-accent hover:neon-glow transition-all group cursor-pointer min-w-[200px]">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{product.emoji}</span>
                      <div>
                        <h3 className="font-bold text-sm">{product.name}</h3>
                        <p className="text-xs text-muted-foreground">{product.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-accent">{product.price}</span>
                      <Button size="sm" variant="ghost" className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        View
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

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
                  className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-10"
                  style={{
                    top: `${20 + index * 15}%`
                  }}
                >
                  <p className="text-2xl md:text-3xl font-bold text-glow opacity-70 whitespace-nowrap">
                    {item.text}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          )
        })}

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-muted-foreground text-sm">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="mb-2">Scroll to explore</p>
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

import { useRef, useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const categories = [
  { label: 'Wearables', icon: '👓' },
  { label: 'Computing', icon: '💻' },
  { label: 'Displays', icon: '📺' },
  { label: 'Components', icon: '⚙️' },
]

const products = [
  { name: 'Neural Link', description: 'Direct brain interface', price: '$2,499', category: 'Wearables' },
  { name: 'Quantum Core', description: 'Next-gen processor', price: '$4,999', category: 'Computing' },
  { name: 'Holo Lens', description: 'AR/VR display system', price: '$1,899', category: 'Displays' },
  { name: 'Cyber Deck', description: 'Portable computing', price: '$3,299', category: 'Computing' },
  { name: 'Nano Shield', description: 'Advanced protection', price: '$899', category: 'Components' },
  { name: 'Flux Drive', description: 'Quantum storage', price: '$1,499', category: 'Components' },
  'AI-driven shopping',
  'Classical meets quantum',
export function Hero3D() {
  'Immersive commerce hardware',
  'AI-driven shopping',
  'Classical meets quantum',
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
        style={{ height: '300vh' }}
      >
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
          <div className="absolute inset-0 bg-background">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, oklch(0.78 0.13 195) 0%, transparent 50%),
        style={{ height: '300vh' }}h(0.85 0.25 330) 0%, transparent 50%)`,
            }} />
            <div className="absolute inset-0 opacity-10" style={{
          <div className="absolute inset-0 bg-background">, transparent 2px, oklch(1 0 0 / 0.03) 2px, oklch(1 0 0 / 0.03) 4px)`,
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, oklch(0.78 0.13 195) 0%, transparent 50%),
                               radial-gradient(circle at 80% 50%, oklch(0.85 0.25 330) 0%, transparent 50%)`,
            }} />-full flex flex-col items-center justify-center px-6">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(1 0 0 / 0.03) 2px, oklch(1 0 0 / 0.03) 4px)`,
            }} />
          </div>2,
eY(${scrollProgress * -100}px) scale(${1 - scrollProgress * 0.3})`,
          <div className="relative h-full flex flex-col items-center justify-center px-6">
            <div 
              className="mb-12 text-center transform transition-all duration-1000"
              style={{
                opacity: 1 - scrollProgress * 2,tive overflow-hidden"
                transform: `translateY(${scrollProgress * -100}px) scale(${1 - scrollProgress * 0.3})`,
              }}adient(from ${scrollProgress * 360}deg, 
            >
              <div className="relative inline-block">
                <div 
                  className="w-64 h-64 md:w-80 md:h-80 rounded-full mx-auto mb-8 relative overflow-hidden"
                  style={{deg)`,
                    background: `conic-gradient(from ${scrollProgress * 360}deg, 
                      oklch(0.78 0.13 195), 
                      oklch(0.85 0.25 330), ackground flex items-center justify-center">
                      oklch(0.78 0.13 195))`,ES4</div>
                    boxShadow: '0 0 60px oklch(0.78 0.13 195), 0 0 120px oklch(0.85 0.25 330)',
                    transform: `rotate(${scrollProgress * 360}deg)`,
                  }}
                >
                  <div className="absolute inset-4 rounded-full bg-background flex items-center justify-center">
                    <div className="text-6xl md:text-8xl font-bold text-glow">ONES4</div>
                  </div>
                </div>
              </div>
ame="text-xl md:text-2xl text-muted-foreground mb-2"
              {floatingTexts.map((text, index) => {
                const progress = Math.max(0, Math.min(1, (scrollProgress - index * 0.2) * 3))
                return (slateX(${index % 2 === 0 ? -20 + progress * 20 : 20 - progress * 20}px)`,
                  <div
                    key={index}
                    className="text-xl md:text-2xl text-muted-foreground mb-2"
                    style={{
                      opacity: progress > 0.5 ? 1 - (progress - 0.5) * 2 : progress * 2,
                      transform: `translateX(${index % 2 === 0 ? -20 + progress * 20 : 20 - progress * 20}px)`,
                    }}
                  >
                    {text}
                  </div>d-cols-4 gap-4 w-full max-w-5xl transform transition-all duration-1000"
                )
              })} Math.min(1, (scrollProgress - 0.3) * 2) : 0,
            </div>Progress > 0.3 ? 0 : 50}px)`,

            <div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl transform transition-all duration-1000"
              style={{
                opacity: scrollProgress > 0.3 ? Math.min(1, (scrollProgress - 0.3) * 2) : 0,
                transform: `translateY(${scrollProgress > 0.3 ? 0 : 50}px)`, transition-all cursor-pointer group"
              }}
            >4xl mb-2 group-hover:scale-110 transition-transform">{category.icon}</div>
              {categories.map((category, index) => (
                <Card 
                  key={index}
                  className="p-6 text-center bg-card/80 backdrop-blur-sm border-border hover:border-accent transition-all cursor-pointer group"
                >
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{category.icon}</div>
                  <div className="font-semibold">{category.label}</div>ransition-all duration-1000"
                </Card>
              ))}? Math.min(1, (scrollProgress - 0.6) * 2) : 0,
            </div>rollProgress > 0.6 ? 0 : 50}px)`,
}}
            <div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mt-12 transform transition-all duration-1000"
              style={{
                opacity: scrollProgress > 0.6 ? Math.min(1, (scrollProgress - 0.6) * 2) : 0,
                transform: `translateY(${scrollProgress > 0.6 ? 0 : 50}px)`,on-all group"
              }}
            >y-between mb-3">
              {products.map((product, index) => (
                <Card xt-accent transition-colors">{product.name}</h3>
                  key={index}eground">{product.description}</p>
                  className="p-6 bg-card/80 backdrop-blur-sm border-border hover:border-accent transition-all group"
                >nt="outline" className="border-accent text-accent">{product.price}</Badge>
                  <div className="flex items-start justify-between mb-3">
                    <div>ors">
                      <h3 className="font-bold text-lg group-hover:text-accent transition-colors">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                    </div>
                    <Badge variant="outline" className="border-accent text-accent">{product.price}</Badge>
                  </div>
                  <Button className="w-full bg-primary hover:bg-accent transition-colors">
                    View Details
                  </Button>
                </Card>
              ))}
            </div>
          </div>
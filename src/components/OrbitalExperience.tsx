import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitScene } from './OrbitScene'
import { StationUI } from './StationUI'

export function OrbitalExperience() {
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
      
      const rawProgress = scrollStart / scrollRange
      const progress = Math.max(0, Math.min(1, rawProgress))
      
      setScrollProgress(progress)
    }
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])
  
  const seasonIndex = Math.floor(scrollProgress * 4)
  const seasonBlend = (scrollProgress * 4) % 1
  
  const getBackgroundGradient = () => {
    const gradients = [
      'linear-gradient(135deg, oklch(0.95 0.05 145) 0%, oklch(0.92 0.08 160) 100%)',
      'linear-gradient(135deg, oklch(0.98 0.02 80) 0%, oklch(0.95 0.05 70) 100%)',
      'linear-gradient(135deg, oklch(0.92 0.08 50) 0%, oklch(0.88 0.12 40) 100%)',
      'linear-gradient(135deg, oklch(0.96 0.03 240) 0%, oklch(0.92 0.05 250) 100%)'
    ]
    
    return gradients[Math.min(seasonIndex, 3)]
  }
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full"
      style={{ height: '400vh' }}
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        <div 
          className="absolute inset-0 transition-all duration-700"
          style={{ background: getBackgroundGradient() }}
        />
        
        <div className="absolute top-4 right-4 z-10 text-sm font-mono bg-black/50 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
          Progress: {(scrollProgress * 100).toFixed(1)}% | 
          Angle: {(scrollProgress * 360).toFixed(0)}° | 
          Season: {['Spring', 'Summer', 'Fall', 'Winter'][Math.min(seasonIndex, 3)]}
        </div>
        
        <Canvas
          className="absolute inset-0"
          shadows
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
          }}
        >
          <Suspense fallback={null}>
            <OrbitScene scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
        
        <StationUI scrollProgress={scrollProgress} />
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
          <div className="text-sm text-foreground/70">Scroll to explore</div>
          <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-1">
            <div 
              className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce"
              style={{ animationDuration: '2s' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

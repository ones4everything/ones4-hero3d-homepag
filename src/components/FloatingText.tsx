import { useEffect, useState } from 'react'

interface FloatingTextProps {
  text: string
  scrollProgress: number
  startProgress: number
  endProgress: number
  direction?: 'left' | 'right'
}

export function FloatingText({ 
  text, 
  scrollProgress, 
  startProgress, 
  endProgress,
  direction = 'right' 
}: FloatingTextProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const opacity = scrollProgress < startProgress ? 0 :
                  scrollProgress > endProgress ? 0 :
                  scrollProgress < (startProgress + 0.05) 
                    ? (scrollProgress - startProgress) / 0.05
                    : scrollProgress > (endProgress - 0.05)
                    ? (endProgress - scrollProgress) / 0.05
                    : 1

  const translateX = prefersReducedMotion ? 0 : 
    direction === 'right' 
      ? ((scrollProgress - startProgress) / (endProgress - startProgress)) * 100
      : ((endProgress - scrollProgress) / (endProgress - startProgress)) * 100

  if (opacity === 0) return null

  return (
    <div
      className="fixed top-1/2 left-0 w-full pointer-events-none z-10"
      style={{
        opacity,
        transform: `translate(${translateX}%, -50%)`,
        transition: prefersReducedMotion ? 'opacity 0.3s' : 'none'
      }}
    >
      <p className="text-2xl md:text-4xl font-bold text-muted-foreground/30 whitespace-nowrap px-8">
        {text}
      </p>
    </div>
  )
}

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface SphereManagementCenterProps {
  scrollProgress: number
}

const seasonalSphereStyles = {
  spring: {
    gradient: 'radial-gradient(circle at 30% 30%, #FFB6C1, #FFC0CB, #FF69B4)',
    glow: 'rgba(255, 182, 193, 0.8)',
    particles: '#FFB6C1',
  },
  summer: {
    gradient: 'radial-gradient(circle at 30% 30%, #FFD700, #FFA500, #FF8C00)',
    glow: 'rgba(255, 215, 0, 0.8)',
    particles: '#FFD700',
  },
  autumn: {
    gradient: 'radial-gradient(circle at 30% 30%, #FF8C00, #D2691E, #8B4513)',
    glow: 'rgba(255, 140, 0, 0.8)',
    particles: '#FF8C00',
  },
  winter: {
    gradient: 'radial-gradient(circle at 30% 30%, #ADD8E6, #87CEEB, #4682B4)',
    glow: 'rgba(173, 216, 230, 0.8)',
    particles: '#ADD8E6',
  },
}

function getCurrentSeason(progress: number): keyof typeof seasonalSphereStyles {
  if (progress < 0.25) return 'spring'
  if (progress < 0.5) return 'summer'
  if (progress < 0.75) return 'autumn'
  return 'winter'
}

export function SphereManagementCenter({ scrollProgress }: SphereManagementCenterProps) {
  const [mounted, setMounted] = useState(false)
  const currentSeason = getCurrentSeason(scrollProgress)
  const style = seasonalSphereStyles[currentSeason]
  const rotation = scrollProgress * 360

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-30">
      <motion.div
        className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
        style={{
          rotate: rotation,
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
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: style.gradient,
            boxShadow: `0 0 100px ${style.glow}, inset 0 0 60px rgba(0, 0, 0, 0.3)`,
          }}
          animate={{
            boxShadow: [
              `0 0 80px ${style.glow}, inset 0 0 40px rgba(0, 0, 0, 0.3)`,
              `0 0 120px ${style.glow}, inset 0 0 60px rgba(0, 0, 0, 0.3)`,
              `0 0 80px ${style.glow}, inset 0 0 40px rgba(0, 0, 0, 0.3)`,
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-transparent" />
          
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div 
              className="absolute w-full h-full opacity-30"
              style={{
                backgroundImage: `radial-gradient(circle, ${style.particles} 1px, transparent 1px)`,
                backgroundSize: '30px 30px',
                animation: 'float 20s linear infinite',
              }}
            />
          </div>

          <motion.div
            className="absolute inset-8 rounded-full border-2 opacity-20"
            style={{ borderColor: style.particles }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <motion.div
            className="absolute inset-12 rounded-full border-2 opacity-20"
            style={{ borderColor: style.particles }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.2, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          />
        </motion.div>

        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/5 to-white/20 animate-pulse" />
      </motion.div>
    </div>
  )
}

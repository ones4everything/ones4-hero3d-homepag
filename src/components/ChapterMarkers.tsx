import { useEffect, useState } from 'react'
import { useIsMobile } from '@/hooks/u
import { useIsMobile } from '@/hooks/use-mobile'

interface ChapterMarkersProps {
  currentChapter: number

 

const chapters = [
  { id: 0, season: 'Menu Categories', emoji: '🌸' },
  { id: 1, season: 'Seasonal Products', emoji: '☀️' },
  { id: 2, season: 'Best Selling', emoji: '🍂' },
  { id: 3, season: 'Sale Items', emoji: '❄️' },
]

export function ChapterMarkers({ currentChapter, onChapterClick }: ChapterMarkersProps) {
  const isMobile = useIsMobile()
  const [isVisible, setIsVisible] = useState(true)
  const [timeoutId, setTimeoutId] = useState<number | null>(null)

      }
      const newTimeoutId = windo
      setIsVisible(true)
      
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }

      const newTimeoutId = window.setTimeout(() => {
      if (timeoutId !== nul
      }, 2000)

      setTimeoutId(newTimeoutId)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }
        {chapters.map((chapter) => (
     
  }, [timeoutId])

      </motion.di
  }
  return (
      className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-4 px-3 py-4 rounded-full bg-card/80 backdrop-blur-md border border-bo
      animate={{ opacity: isVisible ? 1
    >
        <button
       
          aria-label={`Go to ${chapt
          <motion
              currentChapter
                : 'bg-muted text-muted-foreground hove
            whileTap={{ scale: 0.9 }}
            <span className="text-2xl">{chapter.emoji}</sp
          
            <div classN
            </div>
        </button>
    </motion.div>
}

















  return (
    <motion.div
      className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-4 px-3 py-4 rounded-full bg-card/80 backdrop-blur-md border border-border"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: isVisible ? 1 : 0.3, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {chapters.map((chapter) => (
        <button
          key={chapter.id}
          onClick={() => onChapterClick(chapter.id)}
          className="relative group"
          aria-label={`Go to ${chapter.season} chapter`}
        >
          <motion.div
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              currentChapter === chapter.id
                ? 'bg-primary text-primary-foreground scale-110'
                : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-2xl">{chapter.emoji}</span>
          </motion.div>
          
          <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-popover text-popover-foreground text-sm px-3 py-1.5 rounded whitespace-nowrap">
              {chapter.season}
            </div>
          </div>
        </button>
      ))}
    </motion.div>
  )
}

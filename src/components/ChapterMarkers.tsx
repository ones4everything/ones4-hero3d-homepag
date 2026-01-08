import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/hooks/use-mobile'

interface ChapterMarkersProps {
  currentChapter: number
  onChapterClick: (chapter: number) => void
}

const chapters = [
  { id: 0, season: 'Spring', emoji: '🌸' },
  { id: 1, season: 'Summer', emoji: '☀️' },
  { id: 2, season: 'Autumn', emoji: '🍂' },
  { id: 3, season: 'Winter', emoji: '❄️' },
]

export function ChapterMarkers({ currentChapter, onChapterClick }: ChapterMarkersProps) {
  const isMobile = useIsMobile()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    const handleScroll = () => {
      setIsVisible(true)
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setIsVisible(false)
      }, 2000)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutId)
    }
  }, [])

  if (isMobile) {
    return (
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-4 py-3 rounded-full bg-card/80 backdrop-blur-md border border-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0.3, y: 0 }}
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
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                currentChapter === chapter.id
                  ? 'bg-primary text-primary-foreground scale-110'
                  : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-xl">{chapter.emoji}</span>
            </motion.div>
            
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-popover text-popover-foreground text-xs px-2 py-1 rounded whitespace-nowrap">
                {chapter.season}
              </div>
            </div>
          </button>
        ))}
      </motion.div>
    )
  }

  return (
    <motion.div
      className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-4 py-4 px-3 rounded-full bg-card/80 backdrop-blur-md border border-border"
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
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              currentChapter === chapter.id
                ? 'bg-primary text-primary-foreground scale-110'
                : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-xl">{chapter.emoji}</span>
          </motion.div>
          
          <div className="absolute right-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-popover text-popover-foreground text-sm px-3 py-1.5 rounded whitespace-nowrap">
              {chapter.season}
            </div>
          </div>
        </button>
      ))}
    </motion.div>
  )
}

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/hooks/use-mobile'

interface ChapterMarkersProps {
  currentChapter: number
  onChapterClick: (id: number) => void
}

const chapters = [
  { id: 0, label: 'Categories', emoji: '🌸' },
  { id: 1, label: 'Seasonal', emoji: '☀️' },
  { id: 2, label: 'Best Selling', emoji: '🍂' },
  { id: 3, label: 'Sale', emoji: '❄️' },
]

export function ChapterMarkers({ currentChapter, onChapterClick }: ChapterMarkersProps) {
  const [isVisible, setIsVisible] = useState(true)
  const isMobile = useIsMobile()

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsVisible(scrollTop > 100)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (isMobile) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: isVisible ? 1 : 0.3, x: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4"
    >
      {chapters.map((chapter) => (
        <button
          key={chapter.id}
          onClick={() => onChapterClick(chapter.id)}
          className="relative group"
          aria-label={`Go to ${chapter.label}`}
        >
          <div
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentChapter === chapter.id
                ? 'bg-accent scale-125 shadow-lg'
                : 'bg-muted-foreground/30 hover:bg-accent/50 hover:scale-110'
            }`}
          />
          
          <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-lg">
              <span className="text-sm font-medium">
                {chapter.emoji} {chapter.label}
              </span>
            </div>
          </div>
        </button>
      ))}
    </motion.div>
  )
}

import { useEffect, useState } from 'react'
import { useIsMobile } from '@/hooks/u
interface ChapterMarkersProps {

interface ChapterMarkersProps {
  currentChapter: number
  onChapterClick: (chapter: number) => void
}

  const [isVisible
  useEffect(() => {
    const handleScroll = () => {
      clearTimeout(timeoutId)
        setIsVisible(false)
 

      window.removeEventListener('scroll', handleScroll)
    }


        className="
        animate={{ opacity: isVis
      >
          <button
            onClick={() => on
            aria-label={`Go to ${cha
            <motion.div
              
     

              <span className="text-xl">{chapter.em
            
              <div className="bg-popover text-popover-fo
              </div>
     
      </

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





































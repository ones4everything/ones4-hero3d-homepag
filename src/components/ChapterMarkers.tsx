import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
interface ChapterMarkersProps {

interface ChapterMarkersProps {
  currentChapter: number
  onChapterClick: (id: number) => void
}

]
export function ChapterMarkers({ currentChapter, onC
  const [isVisible, setIsVisible] = useState(true)

    const handleScroll = () => {
 


        setIsVisible(false)

    }

  useEffect(() => {
    const handleScroll = () => {
      }
  }, [
  if (isMobile) {
  }



        setIsVisible(false)



  ret

      animate={{ opacity: isVisible ? 1 : 0.3, x: 0

        <button
      window.removeEventListener('scroll', handleScroll)
          className="relative g
        >
       
    }
            while

  if (isMobile) {
    return null
   

          </div>
button>





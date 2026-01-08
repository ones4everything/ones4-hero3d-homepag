import { useState, useEffect } from 'react'
import { ChapterContent, type ChapterData } from '@/components/ChapterContent'
import { SphereManagementCenter } from '@/components/SphereManagementCenter'
import { ChapterMarkers } from '@/components/ChapterMarkers'

const chaptersData: ChapterData[] = [
  {
    id: 0,
    season: 'spring',
    title: '🌸 Menu Categories',
    items: [
      { id: 'cat-1', name: 'Wearables', description: 'Smart devices you wear', emoji: '⌚', price: 'From $299' },
      { id: 'cat-2', name: 'Computing', description: 'Processing powerhouses', emoji: '💻', price: 'From $1,999' },
      { id: 'cat-3', name: 'Displays', description: 'Visual excellence', emoji: '📺', price: 'From $899' },
      { id: 'cat-4', name: 'Components', description: 'Build your setup', emoji: '🔌', price: 'From $49' },
      { id: 'cat-5', name: 'Audio', description: 'Crystal clear sound', emoji: '🎧', price: 'From $199' },
      { id: 'cat-6', name: 'Accessories', description: 'Complete your tech', emoji: '🎮', price: 'From $29' },
    ],
  },
  {
    id: 1,
    season: 'summer',
    title: '☀️ Seasonal Products',
    items: [
      { id: 'sea-1', name: 'Beach Tech Kit', description: 'Waterproof essentials', emoji: '🏖️', price: '$599', badge: 'New' },
      { id: 'sea-2', name: 'Solar Charger', description: 'Eco-friendly power', emoji: '☀️', price: '$149', badge: 'Eco' },
      { id: 'sea-3', name: 'Outdoor Speaker', description: 'Adventure audio', emoji: '🔊', price: '$299' },
      { id: 'sea-4', name: 'Travel Router', description: 'WiFi anywhere', emoji: '📡', price: '$179' },
      { id: 'sea-5', name: 'Action Camera', description: 'Capture the moment', emoji: '📸', price: '$449', badge: 'Hot' },
      { id: 'sea-6', name: 'Fitness Tracker', description: 'Track your goals', emoji: '💪', price: '$229' },
    ],
  },
  {
    id: 2,
    season: 'autumn',
    title: '🍂 Best Selling',
    items: [
      { id: 'best-1', name: 'Neural Link Pro', description: 'Brain-computer interface', emoji: '🧠', price: '$2,499', badge: 'Bestseller' },
      { id: 'best-2', name: 'Quantum Core', description: 'Next-gen processor', emoji: '⚛️', price: '$4,999', badge: 'Pro' },
      { id: 'best-3', name: 'Holo Lens X', description: 'AR/VR excellence', emoji: '🥽', price: '$1,899', badge: 'Popular' },
      { id: 'best-4', name: 'Cyber Deck', description: 'Ultimate portability', emoji: '🎮', price: '$3,299', badge: 'Featured' },
      { id: 'best-5', name: 'Smart Mirror', description: 'Interactive display', emoji: '🪞', price: '$899', badge: 'New' },
      { id: 'best-6', name: 'Voice Assistant', description: 'AI companion', emoji: '🤖', price: '$399', badge: 'Hot' },
    ],
  },
  {
    id: 3,
    season: 'winter',
    title: '❄️ Sale Items',
    items: [
      { id: 'sale-1', name: 'Last Gen Tablet', description: 'Still powerful', emoji: '📱', price: '$399', badge: '50% OFF' },
      { id: 'sale-2', name: 'Classic Headphones', description: 'Premium sound', emoji: '🎧', price: '$149', badge: '40% OFF' },
      { id: 'sale-3', name: 'Smart Watch v2', description: 'Previous model', emoji: '⌚', price: '$199', badge: '60% OFF' },
      { id: 'sale-4', name: 'Wireless Mouse', description: 'Ergonomic design', emoji: '🖱️', price: '$49', badge: '30% OFF' },
      { id: 'sale-5', name: 'USB Hub', description: 'Expand connectivity', emoji: '🔌', price: '$29', badge: '45% OFF' },
      { id: 'sale-6', name: 'Cable Pack', description: 'Everything you need', emoji: '🔗', price: '$19', badge: '50% OFF' },
    ],
  },
]

export function Hero3D() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentChapter, setCurrentChapter] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.max(0, Math.min(1, scrollTop / docHeight))
      setScrollProgress(progress)

      const chapterIndex = Math.floor(progress * 4)
      setCurrentChapter(Math.min(3, Math.max(0, chapterIndex)))
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleChapterClick = (chapterIndex: number) => {
    const chapterElement = document.getElementById(`chapter-${chapterIndex}`)
    if (chapterElement) {
      chapterElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <SphereManagementCenter scrollProgress={scrollProgress} />
      <ChapterMarkers currentChapter={currentChapter} onChapterClick={handleChapterClick} />
      
      <div className="scroll-smooth snap-y snap-mandatory">
        {chaptersData.map((chapter, index) => (
          <ChapterContent key={chapter.id} data={chapter} index={index} />
        ))}
      </div>
    </>
  )
}

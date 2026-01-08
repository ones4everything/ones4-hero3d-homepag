import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ShoppingCart, Star } from '@phosphor-icons/react'

export interface ChapterData {
  id: number
  season: 'spring' | 'summer' | 'autumn' | 'winter'
  title: string
  items: Array<{
    id: string
    name: string
    description: string
    price?: string
    emoji: string
    badge?: string
  }>
}

interface ChapterContentProps {
  data: ChapterData
  index: number
}

const seasonalBackgrounds = {
  spring: `
    linear-gradient(135deg, rgba(255, 182, 193, 0.3) 0%, rgba(255, 218, 224, 0.2) 100%),
    radial-gradient(circle at 20% 30%, rgba(255, 192, 203, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(173, 216, 230, 0.3) 0%, transparent 50%)
  `,
  summer: `
    linear-gradient(135deg, rgba(255, 223, 0, 0.3) 0%, rgba(255, 165, 0, 0.2) 100%),
    radial-gradient(circle at 30% 20%, rgba(255, 200, 0, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(255, 140, 0, 0.3) 0%, transparent 50%)
  `,
  autumn: `
    linear-gradient(135deg, rgba(255, 140, 0, 0.3) 0%, rgba(139, 69, 19, 0.2) 100%),
    radial-gradient(circle at 25% 25%, rgba(255, 99, 71, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(184, 134, 11, 0.3) 0%, transparent 50%)
  `,
  winter: `
    linear-gradient(135deg, rgba(173, 216, 230, 0.3) 0%, rgba(176, 224, 230, 0.2) 100%),
    radial-gradient(circle at 40% 40%, rgba(135, 206, 235, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 60% 60%, rgba(176, 196, 222, 0.3) 0%, transparent 50%)
  `,
}

const seasonalPatterns = {
  spring: `repeating-linear-gradient(45deg, rgba(255, 192, 203, 0.05) 0px, transparent 2px, transparent 12px, rgba(255, 192, 203, 0.05) 14px)`,
  summer: `repeating-radial-gradient(circle at 0 0, transparent 0, rgba(255, 200, 0, 0.05) 10px, transparent 20px)`,
  autumn: `repeating-linear-gradient(-45deg, rgba(255, 140, 0, 0.05) 0px, transparent 2px, transparent 12px, rgba(255, 140, 0, 0.05) 14px)`,
  winter: `repeating-conic-gradient(from 0deg, rgba(173, 216, 230, 0.05) 0deg, transparent 10deg, transparent 20deg, rgba(173, 216, 230, 0.05) 30deg)`,
}

export function ChapterContent({ data, index }: ChapterContentProps) {
  return (
    <section
      id={`chapter-${data.id}`}
      className="min-h-screen w-full relative snap-start snap-always"
      style={{
        background: seasonalBackgrounds[data.season],
      }}
    >
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: seasonalPatterns[data.season],
        }}
      />
      
      <div className="relative z-10 h-full min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-6xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-glow">
              {data.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              Discover our {data.season} collection
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.items.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="relative overflow-hidden bg-card/90 backdrop-blur-sm border-border hover:border-accent hover:shadow-xl transition-all group h-full">
                  {item.badge && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                        <Star size={12} weight="fill" />
                        {item.badge}
                      </span>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-5xl">{item.emoji}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {item.price && (
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-2xl font-bold text-accent">
                          {item.price}
                        </span>
                        <Button 
                          size="sm" 
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ShoppingCart size={16} weight="bold" className="mr-1" />
                          Add
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

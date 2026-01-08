import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, ArrowRight, Flower, Sun, Leaf, Snowflake } from '@phosphor-icons/react'
import { seasonalData, type Product, type Category } from '@/lib/seasonal-data'

interface StationUIProps {
  scrollProgress: number
}

function getStationOpacity(scrollProgress: number, stationIndex: number): number {
  const stationStart = stationIndex * 0.25
  const stationEnd = (stationIndex + 1) * 0.25
  const fadeRange = 0.08
  
  if (scrollProgress < stationStart - fadeRange || scrollProgress > stationEnd + fadeRange) {
    return 0
  }
  
  if (scrollProgress < stationStart + fadeRange) {
    return Math.max(0, (scrollProgress - (stationStart - fadeRange)) / (fadeRange * 2))
  }
  
  if (scrollProgress > stationEnd - fadeRange) {
    return Math.max(0, (stationEnd + fadeRange - scrollProgress) / (fadeRange * 2))
  }
  
  return 1
}

export function StationUI({ scrollProgress }: StationUIProps) {
  const springOpacity = getStationOpacity(scrollProgress, 0)
  const summerOpacity = getStationOpacity(scrollProgress, 1)
  const fallOpacity = getStationOpacity(scrollProgress, 2)
  const winterOpacity = getStationOpacity(scrollProgress, 3)
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 flex items-center justify-center px-6 md:px-12">
        {springOpacity > 0.01 && (
          <SpringStation opacity={springOpacity} />
        )}
        {summerOpacity > 0.01 && (
          <SummerStation opacity={summerOpacity} />
        )}
        {fallOpacity > 0.01 && (
          <FallStation opacity={fallOpacity} />
        )}
        {winterOpacity > 0.01 && (
          <WinterStation opacity={winterOpacity} />
        )}
      </div>
    </div>
  )
}

function SpringStation({ opacity }: { opacity: number }) {
  return (
    <div 
      className="absolute w-full max-w-6xl"
      style={{ 
        opacity,
        transform: `translateY(${(1 - opacity) * 20}px)`,
        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
      }}
    >
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Flower size={32} weight="duotone" className="text-[oklch(0.75_0.15_145)]" />
          <h2 className="text-5xl md:text-6xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'oklch(0.15 0.02 145)' }}>
            Spring Collection
          </h2>
        </div>
        <p className="text-xl text-muted-foreground">Explore our categories</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pointer-events-auto">
        {seasonalData.spring.categories.map((category: Category, index: number) => (
          <Card 
            key={category.id}
            className="p-8 text-center backdrop-blur-md bg-white/90 border-2 hover:border-[oklch(0.75_0.15_145)] transition-all cursor-pointer group hover:scale-105 hover:shadow-xl"
            style={{
              transitionDelay: `${index * 50}ms`,
              borderColor: 'oklch(0.95 0.05 145)'
            }}
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
              {category.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-[oklch(0.75_0.15_145)] transition-colors">
              {category.name}
            </h3>
            <p className="text-sm text-muted-foreground">{category.description}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

function SummerStation({ opacity }: { opacity: number }) {
  return (
    <div 
      className="absolute w-full max-w-6xl"
      style={{ 
        opacity,
        transform: `translateY(${(1 - opacity) * 20}px)`,
        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
      }}
    >
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sun size={32} weight="duotone" className="text-[oklch(0.82_0.20_80)]" />
          <h2 className="text-5xl md:text-6xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'oklch(0.20 0.03 80)' }}>
            Summer Essentials
          </h2>
        </div>
        <p className="text-xl text-muted-foreground">Curated for the season</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pointer-events-auto">
        {seasonalData.summer.products.map((product: Product, index: number) => (
          <Card 
            key={product.id}
            className="p-6 backdrop-blur-md bg-white/90 border-2 hover:border-[oklch(0.82_0.20_80)] transition-all cursor-pointer group hover:scale-105 hover:shadow-xl"
            style={{
              transitionDelay: `${index * 80}ms`,
              borderColor: 'oklch(0.98 0.02 80)'
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-[oklch(0.82_0.20_80)] transition-colors">
                  {product.name}
                </h3>
                {product.rating && (
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        weight={i < Math.floor(product.rating!) ? "fill" : "regular"}
                        className="text-[oklch(0.82_0.20_80)]"
                      />
                    ))}
                    <span className="text-xs ml-1">{product.rating}</span>
                  </div>
                )}
              </div>
              <Badge className="bg-[oklch(0.82_0.20_80)] text-[oklch(0.20_0.03_80)]">
                {product.price}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
            <Button className="w-full bg-[oklch(0.82_0.20_80)] hover:bg-[oklch(0.70_0.25_40)] text-[oklch(0.20_0.03_80)]">
              View Details
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}

function FallStation({ opacity }: { opacity: number }) {
  return (
    <div 
      className="absolute w-full max-w-6xl"
      style={{ 
        opacity,
        transform: `translateY(${(1 - opacity) * 20}px)`,
        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
      }}
    >
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Leaf size={32} weight="duotone" className="text-[oklch(0.68_0.18_50)]" />
          <h2 className="text-5xl md:text-6xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'oklch(0.18 0.02 50)' }}>
            Best Sellers
          </h2>
        </div>
        <p className="text-xl text-muted-foreground">Top picks this season</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pointer-events-auto">
        {seasonalData.fall.bestSellers.map((product: Product, index: number) => (
          <Card 
            key={product.id}
            className="p-6 backdrop-blur-md bg-white/90 border-2 hover:border-[oklch(0.68_0.18_50)] transition-all cursor-pointer group hover:scale-105 hover:shadow-xl relative"
            style={{
              transitionDelay: `${index * 80}ms`,
              borderColor: 'oklch(0.92 0.08 50)'
            }}
          >
            {product.rank && (
              <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-[oklch(0.68_0.18_50)] text-white flex items-center justify-center font-bold text-lg shadow-lg">
                #{product.rank}
              </div>
            )}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-[oklch(0.68_0.18_50)] transition-colors">
                  {product.name}
                </h3>
                {product.rating && (
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        weight={i < Math.floor(product.rating!) ? "fill" : "regular"}
                        className="text-[oklch(0.68_0.18_50)]"
                      />
                    ))}
                    <span className="text-xs ml-1">{product.rating}</span>
                  </div>
                )}
              </div>
              <Badge className="bg-[oklch(0.68_0.18_50)] text-white">
                {product.price}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
            <Button className="w-full bg-[oklch(0.68_0.18_50)] hover:bg-[oklch(0.60_0.22_30)] text-white">
              View Details
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}

function WinterStation({ opacity }: { opacity: number }) {
  return (
    <div 
      className="absolute w-full max-w-6xl"
      style={{ 
        opacity,
        transform: `translateY(${(1 - opacity) * 20}px)`,
        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
      }}
    >
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Snowflake size={32} weight="duotone" className="text-[oklch(0.80_0.08_240)]" />
          <h2 className="text-5xl md:text-6xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'oklch(0.12 0.02 240)' }}>
            Featured Collection
          </h2>
        </div>
        <p className="text-xl text-muted-foreground">Premium winter essentials</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pointer-events-auto">
        {seasonalData.winter.featured.map((product: Product, index: number) => (
          <Card 
            key={product.id}
            className={`p-8 backdrop-blur-md bg-white/90 border-2 hover:border-[oklch(0.80_0.08_240)] transition-all cursor-pointer group hover:scale-105 hover:shadow-2xl ${index === 0 ? 'md:col-span-3 lg:col-span-1' : ''}`}
            style={{
              transitionDelay: `${index * 100}ms`,
              borderColor: 'oklch(0.96 0.03 240)'
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className={`font-bold mb-2 group-hover:text-[oklch(0.80_0.08_240)] transition-colors ${index === 0 ? 'text-2xl' : 'text-lg'}`}>
                  {product.name}
                </h3>
                {product.rating && (
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        weight={i < Math.floor(product.rating!) ? "fill" : "regular"}
                        className="text-[oklch(0.80_0.08_240)]"
                      />
                    ))}
                    <span className="text-sm ml-1">{product.rating}</span>
                  </div>
                )}
              </div>
              <Badge className="bg-[oklch(0.80_0.08_240)] text-[oklch(0.12_0.02_240)] text-lg px-3 py-1">
                {product.price}
              </Badge>
            </div>
            <p className={`text-muted-foreground mb-6 ${index === 0 ? 'text-base' : 'text-sm'}`}>
              {product.description}
            </p>
            <Button className="w-full bg-[oklch(0.80_0.08_240)] hover:bg-[oklch(0.65_0.15_250)] text-white group/btn">
              Shop Now
              <ArrowRight size={18} weight="bold" className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}

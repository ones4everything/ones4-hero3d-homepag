export interface Category {
  id: string
  name: string
  description: string
  icon: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: string
  rating?: number
  category?: string
  rank?: number
}

export interface SeasonalData {
  spring: {
    categories: Category[]
  }
  summer: {
    products: Product[]
  }
  fall: {
    bestSellers: Product[]
  }
  winter: {
    featured: Product[]
  }
}

export const seasonalData: SeasonalData = {
  spring: {
    categories: [
      {
        id: 'men',
        name: 'Men',
        description: 'Explore men\'s collection',
        icon: '👔'
      },
      {
        id: 'women',
        name: 'Women',
        description: 'Discover women\'s styles',
        icon: '👗'
      },
      {
        id: 'kids',
        name: 'Kids',
        description: 'Shop for children',
        icon: '🧸'
      },
      {
        id: 'accessories',
        name: 'Accessories',
        description: 'Complete your look',
        icon: '👜'
      }
    ]
  },
  summer: {
    products: [
      {
        id: 'summer-1',
        name: 'Ocean Breeze Sunglasses',
        description: 'Polarized UV protection with style',
        price: '$129',
        rating: 4.8,
        category: 'Accessories'
      },
      {
        id: 'summer-2',
        name: 'Coastal Linen Shirt',
        description: 'Lightweight breathable summer wear',
        price: '$89',
        rating: 4.6,
        category: 'Men'
      },
      {
        id: 'summer-3',
        name: 'Beach Wave Sandals',
        description: 'Comfortable all-day wear',
        price: '$65',
        rating: 4.7,
        category: 'Accessories'
      },
      {
        id: 'summer-4',
        name: 'Sun Hat Collection',
        description: 'Wide brim sun protection',
        price: '$45',
        rating: 4.5,
        category: 'Accessories'
      }
    ]
  },
  fall: {
    bestSellers: [
      {
        id: 'fall-1',
        name: 'Heritage Wool Coat',
        description: 'Classic tailored outerwear',
        price: '$299',
        rating: 4.9,
        category: 'Men',
        rank: 1
      },
      {
        id: 'fall-2',
        name: 'Cashmere Scarf Set',
        description: 'Luxuriously soft accessories',
        price: '$159',
        rating: 4.8,
        category: 'Accessories',
        rank: 2
      },
      {
        id: 'fall-3',
        name: 'Leather Ankle Boots',
        description: 'Premium Italian leather',
        price: '$249',
        rating: 4.7,
        category: 'Women',
        rank: 3
      },
      {
        id: 'fall-4',
        name: 'Knit Cardigan',
        description: 'Cozy layering essential',
        price: '$119',
        rating: 4.6,
        category: 'Women',
        rank: 4
      }
    ]
  },
  winter: {
    featured: [
      {
        id: 'winter-1',
        name: 'Alpine Down Parka',
        description: 'Premium insulation for extreme cold, water-resistant shell with adjustable hood',
        price: '$449',
        rating: 4.9,
        category: 'Men'
      },
      {
        id: 'winter-2',
        name: 'Thermal Base Layer Set',
        description: 'Moisture-wicking performance fabric',
        price: '$89',
        rating: 4.7,
        category: 'Accessories'
      },
      {
        id: 'winter-3',
        name: 'Merino Wool Sweater',
        description: 'Timeless elegance meets warmth',
        price: '$179',
        rating: 4.8,
        category: 'Women'
      }
    ]
  }
}

export interface SeasonConfig {
  name: string
  lightColor: string
  lightIntensity: number
  fogColor: string
  fogDensity: number
  ambientColor: string
  ambientIntensity: number
  particleColor?: string
  gradeColor: string
}

export const seasonConfigs: SeasonConfig[] = [
  {
    name: 'Spring',
    lightColor: '#b8f5d4',
    lightIntensity: 1.5,
    fogColor: '#e8f5e0',
    fogDensity: 0.01,
    ambientColor: '#a8e6cf',
    ambientIntensity: 0.6,
    gradeColor: '#d4f5e8'
  },
  {
    name: 'Summer',
    lightColor: '#fff176',
    lightIntensity: 2.0,
    fogColor: '#fff9c4',
    fogDensity: 0.005,
    ambientColor: '#ffeb3b',
    ambientIntensity: 0.7,
    gradeColor: '#ffe0c2'
  },
  {
    name: 'Fall',
    lightColor: '#ffb74d',
    lightIntensity: 1.8,
    fogColor: '#ffe0b2',
    fogDensity: 0.02,
    ambientColor: '#ff8a65',
    ambientIntensity: 0.5,
    particleColor: '#d84315',
    gradeColor: '#ffcc80'
  },
  {
    name: 'Winter',
    lightColor: '#b3e5fc',
    lightIntensity: 1.0,
    fogColor: '#e1f5fe',
    fogDensity: 0.04,
    ambientColor: '#81d4fa',
    ambientIntensity: 0.5,
    particleColor: '#ffffff',
    gradeColor: '#e3f2fd'
  }
]

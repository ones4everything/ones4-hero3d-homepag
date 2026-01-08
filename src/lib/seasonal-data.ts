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
  rank?: number
  image?: string
  category?: string
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
        description: 'Comfortable all-day beachwear',
        price: '$65',
        rating: 4.7,
        category: 'Accessories'
      },
      {
        id: 'summer-4',
        name: 'Sunset Swim Shorts',
        description: 'Quick-dry performance fabric',
        price: '$75',
        rating: 4.9,
        category: 'Men'
      }
    ]
  },
  fall: {
    bestSellers: [
      {
        id: 'fall-1',
        name: 'Autumn Wool Coat',
        description: 'Classic tailored warmth',
        price: '$299',
        rating: 4.9,
        rank: 1,
        category: 'Women'
      },
      {
        id: 'fall-2',
        name: 'Harvest Leather Boots',
        description: 'Premium crafted footwear',
        price: '$249',
        rating: 4.8,
        rank: 2,
        category: 'Accessories'
      },
      {
        id: 'fall-3',
        name: 'Maple Cashmere Scarf',
        description: 'Soft luxury for cool days',
        price: '$145',
        rating: 4.7,
        rank: 3,
        category: 'Accessories'
      },
      {
        id: 'fall-4',
        name: 'Forest Flannel Shirt',
        description: 'Cozy comfort redefined',
        price: '$79',
        rating: 4.6,
        category: 'Men'
      }
    ]
  },
  winter: {
    featured: [
      {
        id: 'winter-1',
        name: 'Arctic Parka Collection',
        description: 'Ultimate cold-weather protection with sustainable down insulation',
        price: '$599',
        rating: 5.0,
        category: 'Featured'
      },
      {
        id: 'winter-2',
        name: 'Alpine Merino Set',
        description: 'Premium base layer system',
        price: '$199',
        rating: 4.9,
        category: 'Featured'
      },
      {
        id: 'winter-3',
        name: 'Glacier Thermal Gloves',
        description: 'Smart-touch winter protection',
        price: '$89',
        rating: 4.8,
        category: 'Accessories'
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
    lightIntensity: 1.2,
    fogColor: '#e8f5e9',
    fogDensity: 0.02,
    ambientColor: '#c8e6c9',
    ambientIntensity: 0.6,
    gradeColor: '#d4f5e0',
  },
  {
    name: 'Summer',
    lightColor: '#fff4e6',
    lightIntensity: 1.8,
    fogColor: '#fffaeb',
    fogDensity: 0.01,
    ambientColor: '#ffe082',
    ambientIntensity: 0.8,
    gradeColor: '#fff9e1',
  },
  {
    name: 'Fall',
    lightColor: '#ffb74d',
    lightIntensity: 1.4,
    fogColor: '#ffe0b2',
    fogDensity: 0.03,
    ambientColor: '#ff8a65',
    ambientIntensity: 0.7,
    particleColor: '#d84315',
    gradeColor: '#ffe0c2',
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
    gradeColor: '#e3f2fd',
  }
]

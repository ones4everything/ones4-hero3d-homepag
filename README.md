# 3D Orbital Seasonal Shopping Experience

A scroll-driven immersive e-commerce platform featuring seamless transitions through four seasonal shopping stations with dynamic 3D camera orbits, atmospheric effects, and curated product collections.

## 🌟 Features

### Core Interaction
- **Scroll-Driven Orbit**: Vertical scroll controls a smooth 360° camera orbit around a centered hero product
- **Bidirectional Motion**: Scroll up/down to rotate the camera forward/backward with consistent smoothing
- **Constant Radius**: Camera maintains a fixed distance from the center, creating a cinematic viewing experience

### Four Seasonal Stations

#### 🌸 Spring (0-25% / 0°-90°) - Categories
- Browse by category: Men, Women, Kids, Accessories
- Fresh green color palette with soft bloom effects
- Minimal card-based UI for easy navigation

#### ☀️ Summer (25-50% / 90°-180°) - Seasonal Products
- Curated summer essentials collection
- Bright, vibrant lighting with high saturation
- Product cards with ratings and pricing

#### 🍂 Fall (50-75% / 180°-270°) - Best Sellers
- Top-selling products with rank badges (#1, #2, #3)
- Warm golden-hour lighting with amber tones
- Optional falling leaf particle effects

#### ❄️ Winter (75-100% / 270°-360°) - Featured Collection
- Premium featured products with hero card layout
- Cool blue atmosphere with soft fog
- Prominent CTAs and optional snow particles

### Dynamic Atmosphere
- **Continuous Lighting Interpolation**: Smooth transitions between seasonal lighting setups
- **Adaptive Fog Density**: Environmental fog adjusts per season for depth
- **Color Grading**: Background gradients shift to match seasonal palettes
- **Particle Systems**: Contextual particles (leaves/snow) in Fall and Winter

### Performance Optimizations
- Adaptive frame-rate smoothing (lerp) for consistent motion
- Conditional particle rendering based on visibility thresholds
- Responsive layouts with mobile-first design
- Hardware-accelerated 3D rendering via Three.js

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero3D.tsx              # Main entry component
│   ├── OrbitalExperience.tsx   # Container with scroll handling
│   ├── OrbitScene.tsx          # Three.js 3D scene with camera orbit
│   ├── StationUI.tsx           # Seasonal UI overlays with content
│   └── ui/                     # Shadcn component library
├── lib/
│   ├── seasonal-data.ts        # Product data and season configs
│   └── utils.ts                # Utility functions
├── index.css                   # Global styles and theme variables
└── App.tsx                     # Root application component

BEHAVIOR_SPEC.md               # Detailed behavior specification
PRD.md                         # Product requirements document
```

## 🎨 Design System

### Typography
- **Display Font**: Space Grotesk (headings, titles)
- **Body Font**: Inter (content, UI elements)
- **Hierarchy**: Bold seasonal station titles, medium product names, regular descriptions

### Color Palettes

**Spring**: Fresh greens and cream
- Primary: `oklch(0.75 0.15 145)` soft green
- Background: `oklch(0.95 0.05 145)` cream

**Summer**: Bright yellows and warm whites
- Primary: `oklch(0.82 0.20 80)` golden yellow
- Background: `oklch(0.98 0.02 80)` warm white

**Fall**: Warm ambers and rust
- Primary: `oklch(0.68 0.18 50)` amber
- Background: `oklch(0.92 0.08 50)` warm beige

**Winter**: Cool blues and ice white
- Primary: `oklch(0.80 0.08 240)` ice blue
- Background: `oklch(0.96 0.03 240)` ice white

### Components
- Cards: Glass morphism with backdrop blur
- Buttons: Seasonal accent colors with hover glow
- Badges: Context-aware colors for pricing and ranks
- Icons: Phosphor Icons for seasonal indicators and UI elements

## 🔧 Technical Implementation

### Scroll Progress Calculation
```typescript
scrollProgress = clamp(scrollY / scrollMax, 0, 1)
angle = scrollProgress * 2π
seasonIndex = floor(scrollProgress * 4)
seasonBlend = fract(scrollProgress * 4)
```

### Camera Positioning
```typescript
x = sin(angle) * orbitRadius
z = cos(angle) * orbitRadius
y = 0
camera.lookAt(0, 0, 0)
```

### Smoothing (Lerp)
```typescript
lerpFactor = min(deltaTime * 6, 0.12)
currentAngle = lerp(currentAngle, targetAngle, lerpFactor)
```

### Station Visibility
Each station's UI fades in/out based on scroll position with an 8% crossfade range:
- Fade in: `(scrollProgress - stationStart + fadeRange) / (fadeRange * 2)`
- Fade out: `(stationEnd + fadeRange - scrollProgress) / (fadeRange * 2)`

## 📊 Data Structure

### Product Schema
```typescript
{
  id: string
  name: string
  description: string
  price: string
  rating?: number
  rank?: number
  category?: string
}
```

### Season Configuration
```typescript
{
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
```

## 🚀 Key Interactions

1. **Scroll to Explore**: Vertical scroll drives the entire experience
2. **Hover Effects**: Cards scale and glow on hover
3. **Station Transitions**: Automatic crossfades between seasonal content
4. **Responsive Layout**: Adapts from single-column mobile to multi-column desktop
5. **Debug Overlay**: Top-right display shows current scroll progress, angle, and season

## 🎯 Use Cases

- E-commerce product showcases
- Seasonal collection launches
- Portfolio presentations
- Interactive brand experiences
- Educational 3D walkthroughs

## 📝 Documentation

- **BEHAVIOR_SPEC.md**: Complete technical specification of orbital mechanics, station state machine, and UI rules
- **PRD.md**: Product requirements with design direction, color theory, and component selection

## 🔍 Debugging

The debug overlay (top-right corner) provides real-time feedback:
- **Progress**: Current scroll percentage (0-100%)
- **Angle**: Current camera angle (0-360°)
- **Season**: Active season name (Spring/Summer/Fall/Winter)

## 🎨 Customization

To modify the experience:

1. **Adjust Station Boundaries**: Edit the `0.25` multipliers in station calculations
2. **Change Season Colors**: Update `seasonConfigs` in `seasonal-data.ts`
3. **Add New Stations**: Increase multiplier from `4` to desired station count
4. **Modify Orbit**: Change `orbitRadius` constant in `OrbitScene.tsx`
5. **Update Products**: Edit the `seasonalData` object in `seasonal-data.ts`

## 🌐 Browser Support

- Modern browsers with WebGL 2.0 support
- Hardware-accelerated rendering recommended
- Touch scrolling fully supported on mobile devices

## ⚡ Performance Tips

- Particle systems can be disabled on low-end devices
- Orbit radius can be reduced for smaller viewports
- Lerp factor can be adjusted for different smoothness levels
- Consider preloading 3D assets for faster initial render

---

Built with React, Three.js, React Three Fiber, Tailwind CSS, and Shadcn UI.

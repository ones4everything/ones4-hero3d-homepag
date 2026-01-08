# Quick Start Guide

## Overview

This project implements a scroll-driven 3D orbital shopping experience with four seasonal stations. As you scroll, the camera orbits 360° around a central product while the UI smoothly transitions between Spring, Summer, Fall, and Winter collections.

## How It Works

### Scroll Mechanics
- **Scroll down** → Camera rotates clockwise (0° → 360°)
- **Scroll up** → Camera rotates counter-clockwise (360° → 0°)
- **Smooth motion** → Lerp (linear interpolation) prevents jitter
- **Fixed orbit** → Camera maintains constant distance from center

### Four Stations

1. **Spring (0-25% scroll)** - Browse by category
2. **Summer (25-50% scroll)** - Seasonal products
3. **Fall (50-75% scroll)** - Best sellers with rank badges
4. **Winter (75-100% scroll)** - Featured products with CTAs

## File Structure

```
src/
├── components/
│   ├── Hero3D.tsx             → Entry point
│   ├── OrbitalExperience.tsx  → Scroll handler & container
│   ├── OrbitScene.tsx         → 3D scene with camera & lighting
│   └── StationUI.tsx          → Seasonal UI overlays
├── lib/
│   └── seasonal-data.ts       → Product data & season configs
└── index.css                  → Theme & color variables

BEHAVIOR_SPEC.md               → Technical specification
PSEUDOCODE.md                  → Implementation algorithms
PRD.md                         → Product requirements
```

## Key Components

### OrbitalExperience.tsx
The main container that:
- Measures scroll position
- Calculates `scrollProgress` (0 to 1)
- Renders the Three.js Canvas
- Displays UI overlays
- Shows debug info

### OrbitScene.tsx
The 3D scene that:
- Positions camera on orbital path
- Applies lerp smoothing to camera movement
- Interpolates lighting between seasons
- Updates fog density
- Renders particle effects (leaves/snow)

### StationUI.tsx
The UI layer that:
- Calculates opacity for each station
- Fades content in/out based on scroll
- Renders seasonal product cards
- Applies seasonal color themes

### seasonal-data.ts
Data file containing:
- Product information for all stations
- Season configuration (lighting, fog, colors)
- Category definitions

## Core Algorithms

### Scroll → Angle
```typescript
scrollProgress = scrollY / scrollMax  // 0 to 1
angle = scrollProgress * 2π           // 0 to 360°
```

### Station Selection
```typescript
seasonIndex = floor(scrollProgress * 4)  // 0, 1, 2, or 3
seasonBlend = fract(scrollProgress * 4)  // Blend factor
```

### Camera Position
```typescript
x = sin(angle) * radius
z = cos(angle) * radius
y = 0
camera.lookAt(0, 0, 0)
```

### Smooth Motion
```typescript
lerpFactor = min(deltaTime * 6, 0.12)
currentAngle = lerp(currentAngle, targetAngle, lerpFactor)
```

### Station Opacity
```typescript
// Each station fades in/out over 8% scroll range
fadeRange = 0.08

if (scrollProgress in fadeInRange)
  opacity = (scrollProgress - fadeStart) / fadeWindow

if (scrollProgress in fadeOutRange)
  opacity = (fadeEnd - scrollProgress) / fadeWindow
```

## Customization Guide

### Change Station Count
In `OrbitalExperience.tsx` and `OrbitScene.tsx`:
```typescript
// Change from 4 stations to N stations
seasonIndex = floor(scrollProgress * N)
```

### Adjust Orbit Radius
In `OrbitScene.tsx`:
```typescript
const orbitRadius = 8  // Change to desired radius
```

### Modify Season Colors
In `lib/seasonal-data.ts`, edit `seasonConfigs`:
```typescript
{
  name: 'Spring',
  lightColor: '#b8f5d4',      // Change color
  lightIntensity: 1.2,         // Adjust brightness
  fogDensity: 0.02,            // Change fog amount
  // ... more properties
}
```

### Add Products
In `lib/seasonal-data.ts`, edit `seasonalData`:
```typescript
summer: {
  products: [
    {
      id: 'new-product',
      name: 'New Summer Item',
      description: 'Description here',
      price: '$99',
      rating: 4.5
    },
    // ... more products
  ]
}
```

### Change Crossfade Duration
In `StationUI.tsx`:
```typescript
const fadeRange = 0.08  // Change from 8% to desired range
```

## Debugging

### Debug Overlay
The top-right overlay shows:
- **Progress**: Current scroll percentage
- **Angle**: Current camera angle in degrees
- **Season**: Active season name

### Console Logging
Add logging in `OrbitalExperience.tsx`:
```typescript
useEffect(() => {
  console.log('Scroll Progress:', scrollProgress)
  console.log('Season Index:', Math.floor(scrollProgress * 4))
}, [scrollProgress])
```

### Station Boundaries
Log station transitions in `OrbitScene.tsx`:
```typescript
useEffect(() => {
  if (seasonIndex !== prevSeasonIndex) {
    console.log(`Transitioned to ${seasonConfigs[seasonIndex].name}`)
  }
}, [seasonIndex])
```

## Performance Tips

### Reduce Particle Count
In `OrbitScene.tsx`:
```typescript
const particleCount = 100  // Reduce for better performance
```

### Disable Particles on Mobile
```typescript
const isMobile = window.innerWidth < 768
const particleCount = isMobile ? 0 : 100
```

### Adjust Lerp Smoothness
In `OrbitScene.tsx`:
```typescript
const lerpFactor = Math.min(delta * 6, 0.12)
// Increase 6 for snappier motion
// Decrease for more smoothing
```

### Simplify Lighting
Remove fog or reduce shadow quality for low-end devices.

## Common Issues

### Camera Jerky Motion
- Check lerp factor is being applied
- Ensure deltaTime is passed correctly
- Verify scroll calculation is clamped to [0, 1]

### UI Not Showing
- Check opacity calculation
- Verify scroll ranges match station boundaries
- Ensure content is rendered when opacity > 0.01

### Wrong Season Colors
- Verify seasonIndex calculation
- Check seasonBlend interpolation
- Ensure configs array has correct indices

### Particles Not Appearing
- Particles only show in Fall (index 2) and Winter (index 3)
- Check opacity calculation
- Verify particle position updates

## Testing Checklist

- [ ] Scroll down smoothly transitions through all 4 stations
- [ ] Scroll up reverses through stations correctly
- [ ] Camera maintains constant orbit radius
- [ ] UI content appears only in designated scroll ranges
- [ ] Lighting transitions smoothly between seasons
- [ ] Particles appear in Fall and Winter stations
- [ ] Debug overlay shows correct values
- [ ] Mobile layout stacks cards vertically
- [ ] Performance maintains 60 FPS on target devices

## Next Steps

See `README.md` for full documentation and `BEHAVIOR_SPEC.md` for technical details.

To extend the experience:
1. Add more stations by changing the station count
2. Create custom 3D models for hero product
3. Add product detail views on card click
4. Implement shopping cart functionality
5. Add sound effects for seasonal atmosphere
6. Create loading animations for initial render
7. Add keyboard navigation (arrow keys)
8. Implement URL hash for direct station access

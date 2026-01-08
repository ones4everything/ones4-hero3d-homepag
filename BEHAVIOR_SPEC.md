# Scroll-Driven 3D Orbital Experience - Behavior Specification

## Core Orbit Mechanics

### Scroll-to-Angle Mapping
```typescript
scrollProgress = clamp(scrollY / scrollMax, 0, 1)
angle = scrollProgress * 2π  // Maps 0-100% scroll to 0-360°
```

### Camera Orbital Positioning
- **Constant Radius**: `orbitRadius = 8` units (Three.js space)
- **Position Calculation**:
  ```typescript
  x = sin(angle) * orbitRadius
  z = cos(angle) * orbitRadius  
  y = 0  // Keep camera at hero product's eye level
  camera.lookAt(0, 0, 0)  // Always faces center
  ```
- **Smoothing (Lerp)**:
  ```typescript
  lerpFactor = min(deltaTime * 6, 0.12)  // Adaptive smoothing
  currentAngle = lerp(currentAngle, targetAngle, lerpFactor)
  ```
  - Prevents jitter on rapid scroll
  - Maintains smooth trailing motion
  - Frame-rate independent

### Scroll Direction Handling
- **Forward (Down)**: `angle` increases 0° → 360°
- **Backward (Up)**: `angle` decreases 360° → 0°
- Bidirectional with no special cases
- No wrapping: scroll is clamped to [0, 1]

---

## Station State Machine

### Season Index Calculation
```typescript
seasonIndex = floor(scrollProgress * 4)  // 0, 1, 2, or 3
seasonBlend = fract(scrollProgress * 4)  // 0.0 to 1.0 within station
```

### Station Boundaries (Exact)
| Station | Scroll Range | Angle Range | Season Index |
|---------|-------------|-------------|--------------|
| **Spring** (Categories) | 0.00 - 0.25 | 0° - 90° | 0 |
| **Summer** (Seasonal Products) | 0.25 - 0.50 | 90° - 180° | 1 |
| **Fall** (Best Sellers) | 0.50 - 0.75 | 180° - 270° | 2 |
| **Winter** (Featured Products) | 0.75 - 1.00 | 270° - 360° | 3 |

### Station State Transitions
```
scrollProgress crosses 0.25 threshold →
  seasonIndex updates to 1 →
  lighting begins interpolation to Summer config →
  Spring UI fades out (opacity → 0) →
  Summer UI fades in (opacity → 1)
```

---

## UI Overlay System

### Content Visibility Rules
```typescript
function getStationOpacity(scrollProgress, stationIndex) {
  const stationStart = stationIndex * 0.25
  const stationEnd = (stationIndex + 1) * 0.25
  const fadeRange = 0.08  // 8% scroll buffer for crossfade
  
  // Outside station range: invisible
  if (scrollProgress < stationStart - fadeRange || 
      scrollProgress > stationEnd + fadeRange) {
    return 0
  }
  
  // Fade in at station entrance
  if (scrollProgress < stationStart + fadeRange) {
    return (scrollProgress - (stationStart - fadeRange)) / (fadeRange * 2)
  }
  
  // Fade out at station exit
  if (scrollProgress > stationEnd - fadeRange) {
    return (stationEnd + fadeRange - scrollProgress) / (fadeRange * 2)
  }
  
  // Fully visible in station center
  return 1
}
```

### Station Content Specs

#### Spring (0-25%): CATEGORIES
- **Content**: 4 category cards (Men, Women, Kids, Accessories)
- **Layout**: 2x2 grid on mobile, 4x1 grid on desktop
- **Style**: Minimal white cards, soft green accents
- **Interaction**: Hover scales card 1.05x, shows green border

#### Summer (25-50%): SEASONAL PRODUCTS
- **Content**: 4 product cards with ratings
- **Layout**: 1-column mobile, 4-column desktop
- **Style**: Bright yellow/orange accents, crisp shadows
- **Metadata**: Name, price badge, star rating, description

#### Fall (50-75%): BEST SELLING
- **Content**: 4 products with rank badges (#1, #2, #3, #4)
- **Layout**: Same as Summer
- **Style**: Warm amber/rust colors, golden glow
- **Special**: Circular rank badge positioned top-right

#### Winter (75-100%): FEATURED PRODUCTS
- **Content**: 3 products, first is hero card
- **Layout**: 1-column mobile, 3-column desktop (hero spans if needed)
- **Style**: Cool blue palette, larger hero card
- **CTA**: "Shop Now" button with arrow icon, prominent

### Crossfade Timing
- **Fade In Duration**: 0.4s `easeInOutQuad` when `seasonBlend > 0.2`
- **Fade Out Duration**: 0.3s `easeOutQuad` when exiting station
- **Opacity Threshold**: Content with `opacity < 0.01` is not rendered (performance)

---

## Seasonal Atmosphere System

### Lighting Interpolation
```typescript
currentSeason = seasonConfigs[seasonIndex]
nextSeason = seasonConfigs[min(seasonIndex + 1, 3)]

// Continuous color lerp
lightColor = lerpColor(currentSeason.lightColor, nextSeason.lightColor, seasonBlend)
lightIntensity = lerp(currentSeason.intensity, nextSeason.intensity, seasonBlend)

// Apply every frame
directionalLight.color = lightColor
directionalLight.intensity = lightIntensity
```

### Season Configurations
```typescript
[
  { // Spring
    lightColor: '#b8f5d4', intensity: 1.2,
    fogColor: '#e8f5e9', fogDensity: 0.02,
    ambientColor: '#c8e6c9', ambientIntensity: 0.6,
    gradeColor: '#d4f5e0'
  },
  { // Summer
    lightColor: '#fff4e6', intensity: 1.8,
    fogColor: '#fffaeb', fogDensity: 0.01,
    ambientColor: '#ffe082', ambientIntensity: 0.8,
    gradeColor: '#fff9e1'
  },
  { // Fall
    lightColor: '#ffb74d', intensity: 1.4,
    fogColor: '#ffe0b2', fogDensity: 0.03,
    ambientColor: '#ff8a65', ambientIntensity: 0.7,
    particleColor: '#d84315', gradeColor: '#ffe0c2'
  },
  { // Winter
    lightColor: '#b3e5fc', intensity: 1.0,
    fogColor: '#e1f5fe', fogDensity: 0.04,
    ambientColor: '#81d4fa', ambientIntensity: 0.5,
    particleColor: '#ffffff', gradeColor: '#e3f2fd'
  }
]
```

### Fog & Environmental Tint
- **Fog Type**: `FogExp2` (exponential density falloff)
- **Update**: Recreate fog object every frame with interpolated values
- **Background Gradient**: CSS gradient transitions between station backgrounds over 0.7s

### Particle Systems

#### Fall Particles (Leaves)
- **Activation**: `seasonIndex === 2` (Fall station)
- **Fade In**: `opacity = min(seasonBlend * 2, 1)` when entering Fall
- **Fade Out**: `opacity = max(1 - seasonBlend * 2, 0)` when exiting Fall
- **Behavior**: Falling motion with slight horizontal drift
- **Color**: Rust orange `#d84315`

#### Winter Particles (Snow)
- **Activation**: `seasonIndex === 3` (Winter station)
- **Fade In/Out**: Same pattern as Fall
- **Behavior**: Gentle downward drift, slower than leaves
- **Color**: White `#ffffff`

#### Particle Logic
```typescript
particles.forEach(particle => {
  particle.position.add(particle.velocity)
  
  // Respawn at top when hitting ground
  if (particle.position.y < 0) {
    particle.position.y = 10
    particle.position.x = random(-7.5, 7.5)
    particle.position.z = random(-7.5, 7.5)
  }
})
```

---

## Performance & Edge Cases

### Scroll Handling
- **Clamping**: `scrollProgress = clamp(rawProgress, 0, 1)` prevents overflow
- **Resize**: Recalculate `scrollMax` on window resize event
- **Initial Position**: Set camera to angle 0° (scrollProgress = 0) on mount

### Frame Rate Adaptation
- **Lerp Factor**: `min(deltaTime * 6, 0.12)` adapts to frame rate
  - 60 FPS: `deltaTime ≈ 0.016`, factor ≈ 0.096
  - 30 FPS: `deltaTime ≈ 0.033`, clamped to 0.12
- **Particle Optimization**: Conditionally render only when `opacity > 0.01`

### Mobile Considerations
- **Orbit Radius**: Same radius on all devices (responsive via CSS zoom)
- **Particle Systems**: Could disable on mobile via media query if needed
- **Touch Scroll**: Native touch handling, same smoothing applies
- **Grid Layout**: Responsive breakpoints collapse multi-column to single-column

### Debugging Display
Top-right overlay shows:
- `Progress: {scrollProgress * 100}%`
- `Angle: {scrollProgress * 360}°`
- `Season: {seasonName}`

---

## Data Flow Summary

```
User scrolls ↓
  ↓
scrollY captured by event listener
  ↓
scrollProgress = clamp(scrollY / scrollMax, 0, 1)
  ↓
┌─────────────────────────────────────┐
│  angle = scrollProgress * 2π        │
│  seasonIndex = floor(progress * 4)  │
│  seasonBlend = fract(progress * 4)  │
└─────────────────────────────────────┘
  ↓                    ↓                    ↓
Camera Update    Lighting Update      UI Update
  ↓                    ↓                    ↓
Lerp to new      Lerp colors/fog      Fade stations
position         Apply to scene       Show/hide content
  ↓                    ↓                    ↓
lookAt(0,0,0)    Update particles     Render cards
```

---

## Pseudocode Summary

```javascript
// Main scroll handler
function handleScroll() {
  const rect = container.getBoundingClientRect()
  const scrollStart = -rect.top
  const scrollMax = container.height - viewport.height
  
  scrollProgress = clamp(scrollStart / scrollMax, 0, 1)
}

// Frame update (60 FPS)
function onFrame(deltaTime) {
  // Orbital mechanics
  targetAngle = scrollProgress * Math.PI * 2
  currentAngle = lerp(currentAngle, targetAngle, min(deltaTime * 6, 0.12))
  
  camera.position.x = sin(currentAngle) * orbitRadius
  camera.position.z = cos(currentAngle) * orbitRadius
  camera.lookAt(0, 0, 0)
  
  // Seasonal atmosphere
  seasonIndex = floor(scrollProgress * 4)
  seasonBlend = (scrollProgress * 4) % 1
  
  const current = seasonConfigs[seasonIndex]
  const next = seasonConfigs[min(seasonIndex + 1, 3)]
  
  light.color = lerpColor(current.lightColor, next.lightColor, seasonBlend)
  light.intensity = lerp(current.intensity, next.intensity, seasonBlend)
  
  fog.color = lerpColor(current.fogColor, next.fogColor, seasonBlend)
  fog.density = lerp(current.fogDensity, next.fogDensity, seasonBlend)
  
  // Particle updates
  if (seasonIndex >= 2) {
    updateParticles(deltaTime)
  }
}

// UI rendering
function renderUI() {
  const springOpacity = getStationOpacity(scrollProgress, 0)
  const summerOpacity = getStationOpacity(scrollProgress, 1)
  const fallOpacity = getStationOpacity(scrollProgress, 2)
  const winterOpacity = getStationOpacity(scrollProgress, 3)
  
  if (springOpacity > 0.01) renderSpringStation(springOpacity)
  if (summerOpacity > 0.01) renderSummerStation(summerOpacity)
  if (fallOpacity > 0.01) renderFallStation(fallOpacity)
  if (winterOpacity > 0.01) renderWinterStation(winterOpacity)
}
```

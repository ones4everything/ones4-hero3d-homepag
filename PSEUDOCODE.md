# Pseudocode Implementation Guide

## Core Mathematical Functions

### Scroll Progress Calculation
```javascript
// Calculate normalized scroll progress from 0 to 1
function calculateScrollProgress(container, viewport) {
  const rect = container.getBoundingClientRect()
  const scrollStart = -rect.top  // How far scrolled past viewport top
  const scrollMax = container.offsetHeight - viewport.height
  
  const rawProgress = scrollStart / scrollMax
  const scrollProgress = clamp(rawProgress, 0, 1)
  
  return scrollProgress
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}
```

### Angle Conversion
```javascript
// Convert scroll progress to orbital angle
function progressToAngle(scrollProgress) {
  return scrollProgress * 2 * Math.PI  // 0 to 2π radians (0° to 360°)
}

// Or in degrees
function progressToAngleDegrees(scrollProgress) {
  return scrollProgress * 360
}
```

### Season Index and Blend
```javascript
// Determine which season station we're in
function getSeasonIndex(scrollProgress) {
  return Math.floor(scrollProgress * 4)  // Returns 0, 1, 2, or 3
}

// Get blend factor within current season (for interpolation)
function getSeasonBlend(scrollProgress) {
  return (scrollProgress * 4) % 1  // Returns 0.0 to 1.0
}

// Example:
// scrollProgress = 0.35 (35% scrolled)
// seasonIndex = floor(0.35 * 4) = floor(1.4) = 1 (Summer)
// seasonBlend = (0.35 * 4) % 1 = 1.4 % 1 = 0.4 (40% through Summer)
```

---

## Camera Orbital Positioning

### Calculate Camera Position on Orbit
```javascript
function calculateCameraPosition(angle, radius) {
  const x = Math.sin(angle) * radius
  const z = Math.cos(angle) * radius
  const y = 0  // Keep camera at hero product level
  
  return { x, y, z }
}

// Make camera look at center
function updateCamera(camera, position) {
  camera.position.set(position.x, position.y, position.z)
  camera.lookAt(0, 0, 0)  // Always face the center
}
```

### Smooth Camera Movement (Lerp)
```javascript
// Linear interpolation between current and target values
function lerp(start, end, factor) {
  return start + (end - start) * factor
}

// Adaptive lerp factor for consistent motion across frame rates
function calculateLerpFactor(deltaTime) {
  const baseFactor = deltaTime * 6  // Adjust 6 for faster/slower response
  return Math.min(baseFactor, 0.12)  // Cap at 0.12 to prevent overshoot
}

// Apply smoothing to angle
let currentAngle = 0
let targetAngle = 0

function smoothCameraUpdate(scrollProgress, deltaTime) {
  targetAngle = progressToAngle(scrollProgress)
  
  const lerpFactor = calculateLerpFactor(deltaTime)
  currentAngle = lerp(currentAngle, targetAngle, lerpFactor)
  
  const position = calculateCameraPosition(currentAngle, orbitRadius)
  updateCamera(camera, position)
}
```

---

## Station State Machine

### Get Active Station(s)
```javascript
const STATION_COUNT = 4
const STATIONS = ['Spring', 'Summer', 'Fall', 'Winter']

function getActiveStation(scrollProgress) {
  const index = Math.floor(scrollProgress * STATION_COUNT)
  return {
    index: Math.min(index, STATION_COUNT - 1),
    name: STATIONS[Math.min(index, STATION_COUNT - 1)]
  }
}

// Get scroll range for a specific station
function getStationRange(stationIndex) {
  const stationSize = 1.0 / STATION_COUNT
  return {
    start: stationIndex * stationSize,
    end: (stationIndex + 1) * stationSize
  }
}

// Example:
// Spring (index 0): start = 0.00, end = 0.25
// Summer (index 1): start = 0.25, end = 0.50
// Fall (index 2):   start = 0.50, end = 0.75
// Winter (index 3): start = 0.75, end = 1.00
```

### Calculate Station Opacity (Crossfade)
```javascript
function getStationOpacity(scrollProgress, stationIndex) {
  const range = getStationRange(stationIndex)
  const fadeRange = 0.08  // 8% of total scroll for smooth fade
  
  const fadeInStart = range.start - fadeRange
  const fadeInEnd = range.start + fadeRange
  const fadeOutStart = range.end - fadeRange
  const fadeOutEnd = range.end + fadeRange
  
  // Completely outside station range
  if (scrollProgress < fadeInStart || scrollProgress > fadeOutEnd) {
    return 0.0
  }
  
  // Fading in
  if (scrollProgress < fadeInEnd) {
    const fadeProgress = (scrollProgress - fadeInStart) / (fadeRange * 2)
    return clamp(fadeProgress, 0, 1)
  }
  
  // Fading out
  if (scrollProgress > fadeOutStart) {
    const fadeProgress = (fadeOutEnd - scrollProgress) / (fadeRange * 2)
    return clamp(fadeProgress, 0, 1)
  }
  
  // Fully visible in center of station range
  return 1.0
}

// Usage: Only render content if opacity is significant
function renderStationUI(scrollProgress) {
  for (let i = 0; i < STATION_COUNT; i++) {
    const opacity = getStationOpacity(scrollProgress, i)
    
    if (opacity > 0.01) {  // Skip rendering if nearly invisible
      renderStation(i, opacity)
    }
  }
}
```

---

## Seasonal Atmosphere Interpolation

### Color Interpolation
```javascript
// Helper to parse hex color to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : null
}

// Lerp between two colors
function lerpColor(color1, color2, t) {
  const c1 = hexToRgb(color1)
  const c2 = hexToRgb(color2)
  
  return {
    r: lerp(c1.r, c2.r, t),
    g: lerp(c1.g, c2.g, t),
    b: lerp(c1.b, c2.b, t)
  }
}

// Convert back to hex
function rgbToHex(rgb) {
  const toHex = (n) => {
    const hex = Math.round(n * 255).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  return '#' + toHex(rgb.r) + toHex(rgb.g) + toHex(rgb.b)
}
```

### Lighting Update
```javascript
const seasonConfigs = [
  { // Spring
    lightColor: '#b8f5d4',
    lightIntensity: 1.2,
    fogColor: '#e8f5e9',
    fogDensity: 0.02,
    ambientColor: '#c8e6c9',
    ambientIntensity: 0.6
  },
  { // Summer
    lightColor: '#fff4e6',
    lightIntensity: 1.8,
    fogColor: '#fffaeb',
    fogDensity: 0.01,
    ambientColor: '#ffe082',
    ambientIntensity: 0.8
  },
  { // Fall
    lightColor: '#ffb74d',
    lightIntensity: 1.4,
    fogColor: '#ffe0b2',
    fogDensity: 0.03,
    ambientColor: '#ff8a65',
    ambientIntensity: 0.7
  },
  { // Winter
    lightColor: '#b3e5fc',
    lightIntensity: 1.0,
    fogColor: '#e1f5fe',
    fogDensity: 0.04,
    ambientColor: '#81d4fa',
    ambientIntensity: 0.5
  }
]

function updateLighting(scrollProgress, scene) {
  const seasonIndex = getSeasonIndex(scrollProgress)
  const seasonBlend = getSeasonBlend(scrollProgress)
  
  const currentSeason = seasonConfigs[seasonIndex]
  const nextSeasonIndex = Math.min(seasonIndex + 1, 3)
  const nextSeason = seasonConfigs[nextSeasonIndex]
  
  // Interpolate light properties
  const lightColor = lerpColor(
    currentSeason.lightColor,
    nextSeason.lightColor,
    seasonBlend
  )
  const lightIntensity = lerp(
    currentSeason.lightIntensity,
    nextSeason.lightIntensity,
    seasonBlend
  )
  
  // Apply to scene lights
  scene.directionalLight.color = rgbToHex(lightColor)
  scene.directionalLight.intensity = lightIntensity
  
  // Interpolate ambient light
  const ambientColor = lerpColor(
    currentSeason.ambientColor,
    nextSeason.ambientColor,
    seasonBlend
  )
  const ambientIntensity = lerp(
    currentSeason.ambientIntensity,
    nextSeason.ambientIntensity,
    seasonBlend
  )
  
  scene.ambientLight.color = rgbToHex(ambientColor)
  scene.ambientLight.intensity = ambientIntensity
  
  // Interpolate fog
  const fogColor = lerpColor(
    currentSeason.fogColor,
    nextSeason.fogColor,
    seasonBlend
  )
  const fogDensity = lerp(
    currentSeason.fogDensity,
    nextSeason.fogDensity,
    seasonBlend
  )
  
  scene.fog.color = rgbToHex(fogColor)
  scene.fog.density = fogDensity
}
```

---

## Particle System

### Particle Update Logic
```javascript
class Particle {
  constructor() {
    this.position = { x: 0, y: 0, z: 0 }
    this.velocity = { x: 0, y: 0, z: 0 }
    this.life = 1.0
    this.reset()
  }
  
  reset() {
    this.position.x = (Math.random() - 0.5) * 15
    this.position.y = Math.random() * 10
    this.position.z = (Math.random() - 0.5) * 15
    
    this.velocity.x = (Math.random() - 0.5) * 0.02
    this.velocity.y = -Math.random() * 0.02 - 0.01  // Falling motion
    this.velocity.z = (Math.random() - 0.5) * 0.02
  }
  
  update(deltaTime) {
    // Update position
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.position.z += this.velocity.z
    
    // Reset when hitting ground
    if (this.position.y < 0) {
      this.reset()
    }
  }
}

function updateParticles(particles, deltaTime) {
  particles.forEach(particle => particle.update(deltaTime))
}
```

### Conditional Particle Rendering
```javascript
function shouldShowParticles(seasonIndex) {
  // Only show particles in Fall (2) and Winter (3)
  return seasonIndex >= 2
}

function getParticleOpacity(seasonIndex, seasonBlend) {
  if (!shouldShowParticles(seasonIndex)) {
    return 0.0
  }
  
  // Fade in over first half of season entry
  if (seasonBlend < 0.5) {
    return seasonBlend * 2
  }
  
  return 1.0
}

function renderParticles(scrollProgress, particles) {
  const seasonIndex = getSeasonIndex(scrollProgress)
  const seasonBlend = getSeasonBlend(scrollProgress)
  
  const opacity = getParticleOpacity(seasonIndex, seasonBlend)
  
  if (opacity < 0.01) {
    return  // Don't render if invisible
  }
  
  // Render particles with interpolated opacity
  particles.forEach(particle => {
    renderParticle(particle, opacity)
  })
}
```

---

## Complete Frame Update Loop

### Main Update Function
```javascript
// State variables
let scrollProgress = 0
let currentAngle = 0
const orbitRadius = 8
const particles = createParticles(100)

function onScroll() {
  scrollProgress = calculateScrollProgress(container, viewport)
}

function onFrame(deltaTime) {
  // 1. Update camera orbit
  const targetAngle = progressToAngle(scrollProgress)
  const lerpFactor = calculateLerpFactor(deltaTime)
  currentAngle = lerp(currentAngle, targetAngle, lerpFactor)
  
  const cameraPos = calculateCameraPosition(currentAngle, orbitRadius)
  updateCamera(camera, cameraPos)
  
  // 2. Update seasonal atmosphere
  updateLighting(scrollProgress, scene)
  
  // 3. Update particles
  const seasonIndex = getSeasonIndex(scrollProgress)
  if (shouldShowParticles(seasonIndex)) {
    updateParticles(particles, deltaTime)
  }
  
  // 4. Render scene
  renderer.render(scene, camera)
}

// Setup
window.addEventListener('scroll', onScroll)
requestAnimationFrame(function loop(time) {
  const deltaTime = (time - lastTime) / 1000
  lastTime = time
  
  onFrame(deltaTime)
  requestAnimationFrame(loop)
})
```

### UI Render Function
```javascript
function renderUI(scrollProgress) {
  const stationData = [
    { name: 'Spring', content: getCategoriesContent() },
    { name: 'Summer', content: getSeasonalProducts() },
    { name: 'Fall', content: getBestSellers() },
    { name: 'Winter', content: getFeaturedProducts() }
  ]
  
  // Render each station with calculated opacity
  stationData.forEach((station, index) => {
    const opacity = getStationOpacity(scrollProgress, index)
    
    if (opacity > 0.01) {
      renderStationOverlay(station, opacity)
    }
  })
  
  // Render debug info
  renderDebugOverlay({
    progress: (scrollProgress * 100).toFixed(1) + '%',
    angle: (scrollProgress * 360).toFixed(0) + '°',
    season: stationData[getSeasonIndex(scrollProgress)].name
  })
}
```

---

## Performance Optimizations

### Throttle Scroll Events
```javascript
let scrollTimeout
function throttledScrollHandler() {
  if (scrollTimeout) return
  
  scrollTimeout = setTimeout(() => {
    onScroll()
    scrollTimeout = null
  }, 16)  // ~60 FPS
}

window.addEventListener('scroll', throttledScrollHandler, { passive: true })
```

### Adaptive Quality
```javascript
function getDeviceCapability() {
  const isMobile = window.innerWidth < 768
  const isLowEnd = navigator.hardwareConcurrency < 4
  
  return {
    particleCount: isMobile ? 0 : (isLowEnd ? 50 : 100),
    shadowQuality: isLowEnd ? 'low' : 'high',
    antialiasing: !isLowEnd
  }
}
```

---

## Edge Cases

### Handle Resize
```javascript
window.addEventListener('resize', () => {
  // Recalculate scroll max
  scrollProgress = calculateScrollProgress(container, viewport)
  
  // Update camera aspect ratio
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  
  // Update renderer size
  renderer.setSize(window.innerWidth, window.innerHeight)
})
```

### Initial Load
```javascript
function initialize() {
  // Set initial scroll position to 0
  window.scrollTo(0, 0)
  
  // Calculate initial progress
  scrollProgress = 0
  currentAngle = 0
  
  // Position camera at start
  updateCamera(camera, calculateCameraPosition(0, orbitRadius))
  
  // Initialize lighting for Spring season
  updateLighting(0, scene)
}
```

### Boundary Clamping
```javascript
// Ensure values never exceed bounds
function safeDivide(numerator, denominator) {
  if (denominator === 0) return 0
  return numerator / denominator
}

function calculateScrollProgress(container, viewport) {
  const rect = container.getBoundingClientRect()
  const scrollStart = Math.max(0, -rect.top)
  const scrollMax = Math.max(1, container.offsetHeight - viewport.height)
  
  const rawProgress = safeDivide(scrollStart, scrollMax)
  return clamp(rawProgress, 0, 1)
}
```

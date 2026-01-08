# System Architecture Diagram

## High-Level Component Flow

```
┌─────────────────────────────────────────────────────────────┐
│                         App.tsx                             │
│                     (Root Component)                         │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                      Hero3D.tsx                              │
│                   (Entry Point)                              │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                 OrbitalExperience.tsx                        │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  1. Scroll Event Listener                             │  │
│  │  2. Calculate scrollProgress (0-1)                    │  │
│  │  3. Manage 400vh container                            │  │
│  │  4. Sticky viewport (100vh)                           │  │
│  └───────────────────────────────────────────────────────┘  │
└────────────┬──────────────────────┬─────────────────────────┘
             │                      │
             ▼                      ▼
┌─────────────────────┐  ┌─────────────────────────────────┐
│   Three.js Canvas   │  │       StationUI.tsx            │
│   (3D Viewport)     │  │     (2D Overlay Layer)          │
└──────────┬──────────┘  └──────────┬──────────────────────┘
           │                        │
           ▼                        ▼
┌──────────────────────┐  ┌────────────────────────────────┐
│   OrbitScene.tsx     │  │  • SpringStation (0-25%)       │
│                      │  │  • SummerStation (25-50%)      │
│  • Camera Orbit      │  │  • FallStation (50-75%)        │
│  • Lighting Lerp     │  │  • WinterStation (75-100%)     │
│  • Fog Updates       │  │                                │
│  • Particles         │  │  Each calculates opacity       │
│  • Hero Product      │  │  and renders conditionally     │
└──────────────────────┘  └────────────────────────────────┘
```

## Data Flow Architecture

```
                    User Scrolls
                         │
                         ▼
         ┌───────────────────────────────┐
         │  Scroll Event Handler         │
         │  (OrbitalExperience.tsx)      │
         └───────────────┬───────────────┘
                         │
                         ▼
         ┌───────────────────────────────┐
         │  Calculate scrollProgress     │
         │  = scrollY / scrollMax        │
         │  Clamp to [0, 1]              │
         └───────────────┬───────────────┘
                         │
         ┌───────────────┴───────────────┐
         │                               │
         ▼                               ▼
┌────────────────────┐        ┌──────────────────────┐
│  OrbitScene.tsx    │        │   StationUI.tsx      │
│                    │        │                      │
│  scrollProgress    │        │   scrollProgress     │
│        ↓           │        │         ↓            │
│  angle = p * 2π    │        │   seasonIndex =      │
│  seasonIndex       │        │     floor(p * 4)     │
│  seasonBlend       │        │   Calculate opacity  │
│        ↓           │        │   for each station   │
│  Camera Position   │        │         ↓            │
│  Lighting Colors   │        │   Render visible     │
│  Fog Density       │        │   station content    │
│  Particles         │        │                      │
└────────────────────┘        └──────────────────────┘
```

## Scroll Progress Mapping

```
Scroll Range:  0vh ────── 100vh ────── 200vh ────── 300vh ────── 400vh
                │            │            │            │            │
Progress:      0.0         0.25         0.5          0.75         1.0
                │            │            │            │            │
Angle:         0°          90°         180°         270°         360°
                │            │            │            │            │
Station:    ├─ Spring ─┤├─ Summer ─┤├── Fall ──┤├─ Winter ─┤
                │            │            │            │            │
Content:    Categories   Seasonal    Best Selling   Featured
                         Products                    Products
```

## Station Opacity Crossfade

```
Station Index: 0 (Spring)

Opacity
  1.0 ┤     ╭───────────╮
      │    ╱             ╲
  0.8 ┤   ╱               ╲
      │  ╱                 ╲
  0.6 ┤ ╱                   ╲
      │╱                     ╲
  0.4 ┤                       ╲
      │                        ╲
  0.2 ┤                         ╲
      │                          ╲
  0.0 ┼────────────────────────────╲─────
      0    0.08   0.17   0.25  0.33
           │fade│  │full│  │fade│
           │ in │  │vis │  │out │

Fade In:  0.00 - 0.08 (8% range before station)
Full:     0.08 - 0.17 (center of station)
Fade Out: 0.17 - 0.25 (8% range after station)
```

## Camera Orbital Path (Top View)

```
                     North (0°)
                         ▲
                         │
                    ┌────●────┐
                   ╱     │     ╲
                  ╱   Winter   ╲
                 ╱   (270-360°) ╲
                ╱        │       ╲
    West       │         │        │      East
    (270°)     │    ┌────┴────┐   │     (90°)
           ────●────┤  Hero   │───●────
               │    │ Product │   │
              Fall  └─────────┘  Spring
          (180-270°)      │   (0-90°)
                ╲         │        ╱
                 ╲     Summer     ╱
                  ╲   (90-180°)  ╱
                   ╲      │     ╱
                    └─────●────┘
                          │
                          ▼
                     South (180°)

Camera Path: Clockwise orbit (scroll down)
Radius: Constant (8 units)
Height: y = 0 (eye level with product)
LookAt: (0, 0, 0) - always center
```

## Season Interpolation Timeline

```
Progress:  0.0 ───── 0.25 ───── 0.5 ───── 0.75 ───── 1.0

           ├─ Spring ─┤├ Summer ─┤├─ Fall ──┤├ Winter ─┤
           │          ││         ││         ││         │
           │  Index 0 ││ Index 1 ││ Index 2 ││ Index 3 │
           │          ││         ││         ││         │
Lighting:  Green ─────┴┴─Yellow──┴┴─Orange──┴┴──Blue───┤
           │           ││         ││         ││         │
           │    Lerp   ││  Lerp   ││  Lerp   ││  Lerp   │
           │   0→1     ││  0→1    ││  0→1    ││  0→1    │
           │           ││         ││         ││         │
seasonBlend: 0 ────→ 1  0 ────→ 1  0 ────→ 1  0 ────→ 1

At progress = 0.375 (37.5%):
  seasonIndex = 1 (Summer)
  seasonBlend = 0.5
  Lighting = lerp(summer, fall, 0.5)
```

## Component Hierarchy Tree

```
App
└── Hero3D
    └── OrbitalExperience
        ├── Canvas (Three.js)
        │   └── OrbitScene
        │       ├── PerspectiveCamera (ref)
        │       ├── ambientLight (ref)
        │       ├── directionalLight (ref)
        │       ├── HeroProduct
        │       │   ├── mesh (box)
        │       │   └── mesh (ground plane)
        │       └── SeasonalParticles
        │           └── points (particles)
        │
        └── StationUI (absolute positioned)
            ├── SpringStation
            │   └── 4x Category Cards
            ├── SummerStation
            │   └── 4x Product Cards
            ├── FallStation
            │   └── 4x Best Seller Cards
            └── WinterStation
                └── 3x Featured Cards
```

## State Management Flow

```
┌─────────────────────────────────────────────────────────┐
│                    React State                          │
├─────────────────────────────────────────────────────────┤
│  scrollProgress: number (0-1)                           │
│  currentAngle: useRef<number>                           │
│  targetAngle: useRef<number>                            │
│                                                          │
│  Derived Values:                                        │
│  • seasonIndex = floor(scrollProgress * 4)              │
│  • seasonBlend = fract(scrollProgress * 4)              │
│  • angle = scrollProgress * 2π                          │
│  • cameraPosition = orbital calculation                 │
│  • springOpacity = getStationOpacity(progress, 0)       │
│  • summerOpacity = getStationOpacity(progress, 1)       │
│  • fallOpacity = getStationOpacity(progress, 2)         │
│  • winterOpacity = getStationOpacity(progress, 3)       │
└─────────────────────────────────────────────────────────┘
```

## Render Pipeline

```
Frame Update (60 FPS)
      │
      ├─→ useFrame Hook (Three.js)
      │   │
      │   ├─→ Calculate targetAngle from scrollProgress
      │   │
      │   ├─→ Lerp currentAngle toward targetAngle
      │   │
      │   ├─→ Update camera position (x, z) on orbit
      │   │
      │   ├─→ Interpolate lighting colors
      │   │
      │   ├─→ Interpolate fog density
      │   │
      │   └─→ Update particle positions
      │
      └─→ React Render
          │
          ├─→ Calculate station opacities
          │
          ├─→ Conditionally render visible stations
          │
          └─→ Apply opacity to station containers
```

## Event Flow

```
User Action: Scroll Down
      │
      ▼
Window Scroll Event
      │
      ▼
handleScroll()
      │
      ├─→ Get container bounds
      ├─→ Calculate scrollStart = -rect.top
      ├─→ Calculate scrollMax = height - viewport
      ├─→ scrollProgress = clamp(scrollStart / scrollMax, 0, 1)
      │
      ▼
setState(scrollProgress)
      │
      ▼
React Re-render
      │
      ├─→ OrbitScene receives new scrollProgress
      │   └─→ useFrame updates camera & lighting
      │
      └─→ StationUI receives new scrollProgress
          └─→ Recalculates opacities & renders
```

## Performance Optimization Layers

```
┌─────────────────────────────────────────────┐
│         Performance Optimizations            │
├─────────────────────────────────────────────┤
│                                              │
│  1. Scroll Event Layer                      │
│     • Passive event listeners               │
│     • No throttling (native smooth)         │
│                                              │
│  2. State Update Layer                      │
│     • Single scrollProgress state           │
│     • Derived calculations (no extra state) │
│                                              │
│  3. Render Decision Layer                   │
│     • Opacity threshold (0.01)              │
│     • Conditional station rendering         │
│     • Particle visibility check             │
│                                              │
│  4. Animation Layer                         │
│     • Adaptive lerp factor (deltaTime)      │
│     • Clamped lerp (prevent overshoot)      │
│     • useFrame (Three.js RAF)               │
│                                              │
│  5. Graphics Layer                          │
│     • Hardware-accelerated Canvas           │
│     • Instanced particles                   │
│     • Shadow caching                        │
│                                              │
└─────────────────────────────────────────────┘
```

## File Dependencies

```
App.tsx
 └─ Hero3D.tsx
     └─ OrbitalExperience.tsx
         ├─ @react-three/fiber (Canvas)
         ├─ OrbitScene.tsx
         │   ├─ @react-three/fiber (useFrame)
         │   ├─ @react-three/drei (PerspectiveCamera)
         │   ├─ three (THREE.*)
         │   └─ seasonal-data.ts (seasonConfigs)
         │
         └─ StationUI.tsx
             ├─ ui/card.tsx
             ├─ ui/badge.tsx
             ├─ ui/button.tsx
             ├─ @phosphor-icons/react
             └─ seasonal-data.ts (seasonalData)
```

---

This diagram suite provides visual understanding of:
- Component hierarchy
- Data flow
- Scroll mapping
- Station transitions
- Camera orbit path
- Season interpolation
- Performance layers

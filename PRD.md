# ONES4 Hero3D Homepage - Product Requirements Document

An immersive e-commerce homepage centered around a 3D video-textured planet sphere with scroll-driven product reveal animations, creating a futuristic shopping experience.

**Experience Qualities**:
1. **Immersive** - Users journey through a cosmic space with a central planet that morphs through seasons, making product discovery feel like exploration
2. **Fluid** - Scroll-driven animations create seamless transitions from category overview to product details with smooth parallax effects
3. **Premium** - Dark cyberpunk aesthetic with neon accents and glowing effects conveys high-end technology products

**Complexity Level**: Complex Application (advanced functionality, likely with multiple views)
This is a sophisticated 3D web experience requiring Three.js rendering, video texture management, scroll-based animation orchestration, responsive optimizations, and accessibility considerations across multiple interaction states.

## Essential Features

### Video-Textured Planet Sphere
- **Functionality**: Central 3D sphere with looping video texture showing season morphs (Moon → Sun → Moon cycle)
- **Purpose**: Creates an eye-catching hero element that communicates the brand's futuristic, immersive commerce vision
- **Trigger**: Automatically loads and plays on page load with Suspense fallback
- **Progression**: Video loads → Wireframe placeholder displays → Video texture applies → Continuous loop plays while sphere rotation responds to scroll
- **Success criteria**: Video loops smoothly, sphere rotates only with scroll movement (stops when scroll stops), mobile autoplay works with muted/playsInline attributes

### Scroll-Driven Content Reveal
- **Functionality**: Initial 4 category cards transition to 4 orbiting product callouts as user scrolls through 450vh container
- **Purpose**: Guides users from broad categories to specific products through an engaging narrative journey
- **Trigger**: User scrolls down from initial viewport
- **Progression**: Categories visible at top → User scrolls → Categories fade out one-by-one → Orbit rings expand → Products appear one-by-one on orbits
- **Success criteria**: Staggered animations feel smooth, scroll progress directly controls transition states, no abrupt pop-ins

### Interactive Product Callouts
- **Functionality**: Mini product cards orbit the planet, expanding on hover to show details
- **Purpose**: Allows quick product browsing without leaving the immersive 3D environment
- **Trigger**: Hover or keyboard focus on orbiting callout
- **Progression**: User hovers callout → Card scales and glows → Full details appear (image, description, price) → User moves away → Card returns to mini state
- **Success criteria**: Hover states are responsive, keyboard navigation works, ARIA labels present, focus visible states clear

### Parallax Text Callouts
- **Functionality**: Floating text phrases move across screen at different speeds/positions based on scroll
- **Purpose**: Reinforces brand messaging and adds depth to the 3D scene
- **Trigger**: Appears at specific scroll thresholds
- **Progression**: Scroll reaches threshold → Text fades in → Parallax movement occurs → Fades out at next threshold
- **Success criteria**: Never obscures central sphere or products, smooth transitions, respects reduced-motion preferences

### Sticky Navigation Header
- **Functionality**: Navigation bar with hamburger menu, logo, search with microphone icon, profile and cart
- **Purpose**: Provides persistent access to core navigation and shopping functions
- **Trigger**: Always visible, applies blur backdrop on scroll
- **Progression**: Page loads → Header displays → User scrolls → Backdrop blur increases
- **Success criteria**: Search bar glows on focus, microphone icon visible, all icons interactive, sticky positioning works

## Edge Case Handling

- **Video Load Failure**: Display cyan wireframe sphere fallback indefinitely with retry button
- **Slow Networks**: Show Suspense fallback (wireframe) immediately, progressive video loading
- **Mobile Performance**: Reduce sphere geometry to 32x32 segments, simplify orbit animations to slider on small screens
- **Reduced Motion Preference**: Pause video or show static frame, disable orbit animations, maintain scroll-driven rotation at minimal speed
- **Keyboard Navigation**: All interactive elements have focus states and logical tab order, orbiting callouts only focusable when visible
- **Screen Readers**: ARIA labels on all controls, meaningful alt text, skip links to main content
- **Touch Devices**: Ensure orbit callouts expand on tap, search microphone button works, no hover-dependent critical functionality

## Design Direction

The design should evoke a premium cyberpunk aesthetic - futuristic, high-tech, and mysterious. Users should feel like they're browsing a cutting-edge technology marketplace in a sci-fi universe. The dark space theme with neon cyan/magenta accents creates dramatic contrast and focuses attention on the glowing planet and products.

## Color Selection

A dark cyberpunk palette with electric neon accents for a premium tech aesthetic.

- **Primary Color**: Cyan Blue (oklch(0.78 0.13 195)) - Main interactive elements and primary calls-to-action, communicates innovation and technology
- **Secondary Colors**: 
  - Deep Navy (oklch(0.15 0.02 240)) - Primary background, provides depth without pure black
  - Electric Teal (oklch(0.70 0.14 200)) - Secondary accents and hover states
- **Accent Color**: Neon Cyan (oklch(0.95 0.20 195)) - Attention-grabbing glow effects on focus states, orbit rings, and active elements
- **Foreground/Background Pairings**:
  - Deep Navy (oklch(0.15 0.02 240)): White text (oklch(1 0 0)) - Ratio 11.8:1 ✓
  - Cyan Blue (oklch(0.78 0.13 195)): Black text (oklch(0.15 0 0)) - Ratio 8.2:1 ✓
  - Pure Black (oklch(0 0 0)): Muted White (oklch(1 0 0 / 0.7)) - Ratio 14.2:1 ✓
  - Neon Cyan glow: Used only as box-shadow/border, not as background

## Font Selection

Inter provides the clean, modern geometric aesthetic perfect for a tech-forward brand while maintaining excellent readability at all sizes for UI and product information.

- **Typographic Hierarchy**:
  - H1 (Hero Title): Inter Bold / 64px / -0.02em letter spacing / line-height 1.1
  - H2 (Section Headers): Inter Semibold / 40px / -0.01em letter spacing / line-height 1.2
  - H3 (Product Names): Inter Semibold / 28px / normal spacing / line-height 1.3
  - Body (Descriptions): Inter Regular / 16px / normal spacing / line-height 1.6
  - Caption (Labels, Prices): Inter Medium / 12px / 0.01em spacing / line-height 1.4
  - Button Text: Inter Semibold / 14px / 0.02em spacing / uppercase

## Animations

Animations should feel physically grounded yet futuristic - smooth easing with momentum that respects real-world physics while adding subtle sci-fi flair. Balance functional scroll-driven transitions with delightful micro-interactions.

- **Scroll-driven transitions**: Smooth easeInOut curves (0.3-0.5s) for category/product reveals
- **Hover interactions**: Quick elastic scale (0.15s spring) with neon glow fade-in
- **Orbit rotation**: Continuous smooth rotation tied directly to scroll position (no auto-rotation)
- **Parallax text**: Linear movement at varying speeds (0.5x to 1.5x scroll speed)
- **Video texture**: Continuous seamless loop independent of scroll state
- **Suspense fallback**: Gentle pulse animation on wireframe sphere (1s cycle)

## Component Selection

- **Components**:
  - Button (shadcn): Search bar, CTA buttons with cyan accent variant and neon glow on focus
  - Input (shadcn): Search field with custom microphone icon, neon border on focus
  - Card (shadcn): Orbit product callouts and category cards with custom glassmorphic dark background
  - Separator (shadcn): Footer sections with low opacity
  - Sheet (shadcn): Mobile hamburger menu navigation
  - Skeleton (shadcn): Loading states for product details on hover
  
- **Customizations**:
  - Custom 3D components: PlanetCore, OrbitRing, FloatingText, CategoryNode
  - Video texture management with Three.js VideoTexture and Suspense
  - Scroll progress hook for animation orchestration
  - Canvas wrapper with responsive camera positioning
  
- **States**:
  - Buttons: Default (cyan border), Hover (neon glow + scale 1.05), Active (scale 0.98), Focus (cyan ring), Disabled (50% opacity)
  - Orbit Callouts: Mini (200px card), Hover/Focus (expanded with full details + glow), Loading (skeleton)
  - Video Sphere: Loading (wireframe), Loaded (video texture), Error (wireframe + retry)
  - Search Input: Default (transparent), Focus (neon cyan border + glow), Filled (white text)
  
- **Icon Selection**:
  - List (Hamburger menu) - Navigation drawer trigger
  - MagnifyingGlass (Search) - Search functionality
  - Microphone (Voice search) - Voice input trigger
  - User (Profile) - Account access
  - ShoppingCart (Cart) - Shopping cart access
  - Package (Products) - Product categories
  - Cpu (Computing) - Tech category
  - DeviceMobile (Wearables) - Wearable category
  - Desktop (Displays) - Display category
  
- **Spacing**:
  - Header padding: px-6 py-4 (24px horizontal, 16px vertical)
  - Section gaps: gap-32 (128px between major sections)
  - Card padding: p-6 (24px all sides for expanded state), p-4 (16px for mini state)
  - Text margins: mb-8 (32px below headers), mb-4 (16px below subheaders)
  - Icon sizes: 24px for header icons, 20px for card icons, 16px for inline icons
  
- **Mobile**:
  - Header: Collapse search bar to icon-only, reduce spacing to px-4
  - Hero: Reduce sphere size by 40%, simplify to single orbit ring
  - Orbit callouts: Transform to horizontal swipeable carousel below sphere
  - Categories: Stack vertically with reduced size
  - Footer: Single column layout with centered text
  - Typography: Scale down by 20% (H1: 48px, H2: 32px, Body: 14px)
  - Touch targets: Minimum 44x44px for all interactive elements

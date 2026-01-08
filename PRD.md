# Planning Guide

An immersive e-commerce platform featuring a scroll-driven 3D orbital camera system that seamlessly transitions through four seasonal shopping experiences, each offering distinct product categories with dynamic lighting and atmospheric effects.

**Experience Qualities**:
1. **Cinematic** - Every scroll movement feels like navigating through a meticulously crafted film sequence, with smooth camera motion and dramatic seasonal transitions
2. **Intuitive** - The vertical scroll naturally maps to orbital rotation, creating an immediately understandable spatial metaphor that requires zero learning curve
3. **Immersive** - Rich atmospheric effects, dynamic lighting, and seasonal ambiance transport users through distinct shopping environments that feel alive and reactive

**Complexity Level**: Complex Application (advanced functionality, likely with multiple views)
This requires sophisticated 3D rendering with Three.js, real-time scroll interpolation, multi-station state management, dynamic lighting systems, particle effects, seamless UI crossfades, and precise mathematical mapping of scroll progress to camera orbit and seasonal blending.

## Essential Features

**Scroll-Driven Orbital Camera**
- Functionality: Vertical scroll controls camera position along a perfect circular orbit (360°) around a centered hero product, with bidirectional movement and constant radius
- Purpose: Creates a tangible sense of spatial exploration while maintaining consistent focus on the central product
- Trigger: User scrolls page vertically
- Progression: User scrolls down → scrollProgress calculates (scrollY / scrollMax) → angle updates (progress × 2π) → camera position lerps to new orbital coordinates → smooth easing prevents jitter
- Success criteria: Camera maintains constant orbit radius, smooth 60fps motion, no stuttering, scroll up reverses smoothly

**Seasonal Station System (Spring/Summer/Fall/Winter)**
- Functionality: Four distinct shopping experiences mapped to scroll quarters (0-25%, 25-50%, 50-75%, 75-100%), each with unique lighting, atmosphere, UI overlays, and product collections
- Purpose: Organizes product discovery into memorable seasonal contexts that enhance browsing engagement
- Trigger: scrollProgress crosses station boundaries (0.25, 0.5, 0.75)
- Progression: Scroll enters station range → seasonIndex calculates floor(progress × 4) → seasonBlend calculates fract(progress × 4) → lighting/fog/particles lerp between adjacent seasons → UI content crossfades in/out → product data updates
- Success criteria: Exact station boundaries at 0%, 25%, 50%, 75%, 100%; smooth lighting transitions; UI appears only in designated ranges; no visual popping

**Spring Station (0-25% / 0°-90°) - Categories**
- Functionality: Display 4 category tiles (Men/Women/Kids/Accessories) with minimal, clean overlay design
- Purpose: Initial product categorization for broad navigation
- Trigger: scrollProgress < 0.25
- Progression: User scrolls into Spring range → category cards fade in with stagger → hover reveals category details → click navigates to category
- Success criteria: Cards visible only 0-25%, fade out by 25%, fresh green lighting active, soft bloom applied

**Summer Station (25-50% / 90°-180°) - Seasonal Products**
- Functionality: Display 3-6 curated seasonal product cards appropriate for Summer (swimwear, sunglasses, outdoor gear)
- Purpose: Highlight timely, season-relevant merchandise
- Trigger: 0.25 ≤ scrollProgress < 0.5
- Progression: User scrolls to 25% → Spring fades out → Summer products fade in → bright lighting increases → user browses cards
- Success criteria: Products visible only 25-50%, warm bright lighting, crisp shadows, higher saturation

**Fall Station (50-75% / 180°-270°) - Best Selling**
- Functionality: Display best-selling products with ranking badges (#1, #2, #3) and star ratings
- Purpose: Leverage social proof to drive conversions
- Trigger: 0.5 ≤ scrollProgress < 0.75
- Progression: User scrolls to 50% → Summer fades out → Best sellers fade in with rank badges → golden-hour lighting activates → optional leaf particles appear
- Success criteria: Products visible only 50-75%, warm orange/red color grade, golden light, badges prominent

**Winter Station (75-100% / 270°-360°) - Featured Products**
- Functionality: Display featured products with larger hero card layout and prominent CTA button
- Purpose: Showcase premium or promoted items with maximum visual impact
- Trigger: scrollProgress ≥ 0.75
- Progression: User scrolls to 75% → Fall fades out → Featured hero card appears → cool blue lighting activates → snow particles optional → CTA button prominent
- Success criteria: Hero layout visible only 75-100%, cool blue grade, soft fog, CTA highly visible

**Continuous Lighting & Atmosphere Interpolation**
- Functionality: Real-time lerp of light color/intensity, fog density, environment tint, color grading based on seasonBlend value
- Purpose: Eliminate jarring transitions, create seamless atmospheric flow
- Trigger: scrollProgress changes
- Progression: seasonBlend calculates → lighting.color lerps between current and next season colors → fog.density lerps → post-processing color grade interpolates → particle systems crossfade
- Success criteria: No visual popping, smooth gradients between stations, 60fps maintained

## Edge Case Handling

- **Rapid Scrolling**: Implement velocity-based damping to prevent camera overshoot and ensure smooth catch-up without jitter
- **Scroll Boundary Limits**: Clamp scrollProgress to [0, 1] to prevent out-of-range values breaking orbital math or station selection
- **Initial Load Position**: Set scroll position to 0 and camera to 0° on mount to ensure consistent starting state
- **Resize During Scroll**: Recalculate scrollMax on window resize to maintain accurate progress mapping
- **Low Frame Rate Devices**: Use adaptive lerp factors based on deltaTime to maintain smooth motion even on slower devices
- **Multiple Station Content**: Ensure only one station's UI is fully visible at boundaries by using opacity thresholds (< 0.01 = hidden)
- **Particle System Performance**: Conditionally disable particles on mobile or low-end devices to maintain 60fps target

## Design Direction

The design should evoke a sense of **luxury cinematography**, **spatial exploration**, and **seasonal poetry**. Users should feel they are navigating through a high-end film production where each season is a beautifully art-directed act. The 3D space should feel expansive yet focused, with the hero product acting as an anchor point. Lighting should be dramatic and painterly, with smooth gradients that feel natural rather than digital. UI overlays should be refined and minimal, never competing with the 3D atmosphere. The overall impression should be premium, effortless, and memorable.

## Color Selection

The color scheme is seasonal-adaptive, with each station having its own distinct palette that interpolates smoothly during transitions.

- **Spring Palette (Fresh Growth)**: Primary color `oklch(0.75 0.15 145)` soft green, accent `oklch(0.88 0.12 160)` warm mint, light cream backgrounds. Communicates renewal, clarity, gentle warmth.
- **Summer Palette (Vibrant Energy)**: Primary color `oklch(0.82 0.20 80)` bright golden yellow, accent `oklch(0.70 0.25 40)` vivid orange, clear sky blues. Communicates vitality, heat, boldness.
- **Fall Palette (Golden Hour)**: Primary color `oklch(0.68 0.18 50)` warm amber, accent `oklch(0.60 0.22 30)` deep rust, rich burgundy accents. Communicates warmth, nostalgia, harvest.
- **Winter Palette (Cool Serenity)**: Primary color `oklch(0.80 0.08 240)` cool blue-white, accent `oklch(0.65 0.15 250)` ice blue, soft lavender. Communicates calm, purity, sophistication.

**Foreground/Background Pairings**:
- Spring: `oklch(0.15 0.02 145)` dark forest text on `oklch(0.95 0.05 145)` cream background - Ratio 12.3:1 ✓
- Summer: `oklch(0.20 0.03 80)` deep brown text on `oklch(0.98 0.02 80)` warm white - Ratio 14.1:1 ✓
- Fall: `oklch(0.18 0.02 50)` dark chestnut on `oklch(0.92 0.08 50)` warm beige - Ratio 11.8:1 ✓
- Winter: `oklch(0.12 0.02 240)` deep navy on `oklch(0.96 0.03 240)` ice white - Ratio 15.2:1 ✓

## Font Selection

The typeface should convey **modern sophistication**, **technical precision**, and **editorial quality** to match the cinematic 3D experience.

- **Primary**: "Space Grotesk" - A geometric sans with technical character that feels contemporary without being cold
- **Secondary**: "Inter" - For UI elements and body text where maximum legibility is required

**Typographic Hierarchy**:
- H1 (Station Titles): Space Grotesk Bold / 56px / tight (-0.02em) letter spacing / line-height 1.1
- H2 (Product Names): Space Grotesk Semibold / 28px / normal spacing / line-height 1.3
- H3 (Section Labels): Space Grotesk Medium / 18px / wide (0.05em) spacing / line-height 1.4
- Body (Product Descriptions): Inter Regular / 16px / normal spacing / line-height 1.6
- Small (Prices/Metadata): Inter Medium / 14px / normal spacing / line-height 1.5

## Animations

Animations should balance **functional clarity** with **moments of delight**, using physics-based easing to create natural motion that enhances rather than distracts.

**Camera Orbit Motion**: Use lerp with factor 0.08-0.12 for smooth trailing motion that feels responsive yet cinematic. Apply easeOutCubic for final positioning.

**Station UI Crossfades**: Fade in new station content over 0.4s using easeInOutQuad when seasonBlend crosses 0.2 threshold. Fade out previous station over 0.3s with easeOutQuad.

**Card Entrance**: Stagger product card appearances by 0.08s with translateY(40px) → 0 and opacity 0 → 1 over 0.5s easeOutCubic when station becomes active.

**Lighting Transitions**: Continuous lerp of all lighting parameters (color, intensity, position) with no discrete keyframes - creates organic atmospheric flow.

**Particle Systems**: Gentle perpetual motion with Perlin noise for natural drift. Fade in/out particles over 1.5s when crossing station boundaries.

**Hover States**: Scale transform 1 → 1.05 over 0.2s easeOutBack for cards. Glow intensity 0 → 1 over 0.25s for buttons.

## Component Selection

- **Components**:
  - `Card` - For all product cards and category tiles, with custom `backdrop-blur-md` and `bg-white/10` for glass morphism
  - `Badge` - For ranking indicators (#1, #2, #3) and price tags, using `variant="secondary"` with seasonal color overrides
  - `Button` - For CTAs, using `variant="default"` with custom seasonal accent colors and glow effects
  - Three.js `Canvas` - Root 3D container with `camera` prop for orbital control
  - `PerspectiveCamera` from drei - For manual camera positioning along orbit path
  - `Environment` from drei - For lighting and reflections, intensity adjusted per season
  - Custom `SeasonalLighting` component - Manages directional lights with interpolated colors
  - Custom `ParticleSystem` component - Instanced mesh for leaves/snow with conditional rendering

- **Customizations**:
  - Custom `OrbitController` component - Manages scroll → camera position mapping with lerp smoothing
  - Custom `StationUI` component - Handles content visibility and crossfades based on scrollProgress
  - Custom `SeasonalAtmosphere` component - Controls fog, color grading, and environmental tint
  - Tailwind extensions: `backdrop-blur-glass`, `text-glow-spring/summer/fall/winter` classes for seasonal text effects

- **States**:
  - Buttons: default (seasonal accent bg) / hover (scale 1.05, glow intensity +20%) / active (scale 0.98) / disabled (opacity 0.5, grayscale)
  - Cards: default (glass morphism) / hover (border glow, scale 1.02, z-index lift) / active (maintains hover state)
  - Inputs: Only for potential search/filter within stations - default (subtle border) / focus (seasonal accent border, glow)

- **Icon Selection**:
  - `Leaf` for Fall station indicators
  - `Sun` for Summer station indicators  
  - `Snowflake` for Winter station indicators
  - `Flower` for Spring station indicators
  - `ArrowRight` for CTA buttons
  - `Star` filled for product ratings
  - `Trophy` for best-seller badges
  - `Tag` for category indicators

- **Spacing**:
  - Container: `px-6 md:px-12 lg:px-24` for responsive horizontal padding
  - Card Grid: `gap-6 md:gap-8` for product card layouts
  - Card Internal: `p-6` standard padding for all cards
  - Section Vertical: `mb-12 md:mb-16` between major sections
  - Typography: `mb-4` for headings, `mb-2` for small labels

- **Mobile**:
  - Reduce orbit radius on mobile to keep hero product visible at smaller viewport widths
  - Switch from grid-cols-3 to grid-cols-1 for product cards below 768px
  - Disable particle systems on mobile to maintain 60fps performance
  - Reduce lighting complexity (fewer shadow casters) on mobile
  - Station titles use smaller font scale (H1: 36px on mobile vs 56px desktop)
  - Touch scrolling should maintain smooth camera tracking with touch-specific damping factors

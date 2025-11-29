# Template Enhancement Agent Instructions

## Agent Persona

You are **TemplateForge**, an elite UI/UX design agent specializing in converting basic website templates into stunning, conversion-optimized, industry-leading designs. You have deep expertise in:

- Modern web design trends and best practices
- Industry-specific design patterns and user expectations
- Tailwind CSS advanced techniques and animations
- Conversion rate optimization (CRO) principles
- Accessibility standards (WCAG 2.1)
- Mobile-first responsive design
- Micro-interactions and delightful user experiences

Your design philosophy centers on: **"Every pixel serves a purpose. Every interaction tells a story."**

---

## Project Context

You are working on a Next.js template gallery application that contains 30+ mini-website demos across 20 business niches. Each template is a complete, functional website preview that users can explore before purchasing or using.

### Current Architecture

```
template-agent/
├── src/
│   ├── app/                           # Next.js App Router pages
│   │   ├── page.tsx                   # Main gallery (enhance this)
│   │   ├── category/[slug]/page.tsx   # Category pages
│   │   └── template/[id]/             # Template detail & preview
│   ├── components/
│   │   └── template-renderer.tsx      # THE MAIN FILE TO ENHANCE
│   ├── lib/
│   │   ├── template-agent.ts          # Template generation logic
│   │   └── templates-data.ts          # Template definitions
│   └── types/
│       └── template.ts                # TypeScript interfaces
```

### Key File: `template-renderer.tsx`

This is your primary focus. It renders every mini-website template. Currently it has basic sections:
- Navigation
- Hero
- Stats
- Services
- Features
- About
- Testimonials
- CTA
- Contact
- Footer

---

## Your Mission

Transform each template section from "functional" to "exceptional" by implementing the enhancements below. Work systematically through each section and each niche.

---

## Phase 1: Section-Level Enhancements

### 1. Navigation Enhancements
**Current:** Basic sticky nav with links
**Enhance to:**
- [ ] Add scroll-based transparency/blur effect
- [ ] Implement mobile hamburger menu with slide-in animation
- [ ] Add dropdown menus for services
- [ ] Include social media icons
- [ ] Add phone number/CTA button in nav
- [ ] Implement scroll progress indicator
- [ ] Add logo hover animation

**Code Pattern:**
```tsx
// Add state for scroll position
const [scrolled, setScrolled] = useState(false);
useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 50);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### 2. Hero Section Enhancements
**Current:** Basic gradient with text
**Enhance to:**
- [ ] Add animated background patterns (floating shapes, particles)
- [ ] Implement text reveal animations on load
- [ ] Add parallax scrolling effect
- [ ] Include trust badges/certifications
- [ ] Add video background option
- [ ] Implement typewriter effect for taglines
- [ ] Add floating elements that respond to mouse movement
- [ ] Include announcement bar above hero

**Niche-Specific Hero Ideas:**
| Niche | Enhancement |
|-------|-------------|
| Restaurant | Animated food imagery, reservation widget |
| Law Firm | Professional headshots, case counter |
| Real Estate | Property search bar, featured listing |
| Fitness | Animated workout silhouettes, class schedule |
| SaaS | Product screenshot with annotations, demo button |
| Medical | Appointment booking widget, emergency banner |

### 3. Stats Section Enhancements
**Current:** Basic number display
**Enhance to:**
- [ ] Add count-up animation on scroll into view
- [ ] Include icons for each stat
- [ ] Add subtle background patterns
- [ ] Implement hover effects with stat descriptions
- [ ] Add progress bars or circular progress indicators

**Code Pattern:**
```tsx
// Intersection Observer for triggering animations
const [isVisible, setIsVisible] = useState(false);
const ref = useRef<HTMLDivElement>(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => setIsVisible(entry.isIntersecting),
    { threshold: 0.3 }
  );
  if (ref.current) observer.observe(ref.current);
  return () => observer.disconnect();
}, []);
```

### 4. Services Section Enhancements
**Current:** Basic card grid
**Enhance to:**
- [ ] Add hover animations (lift, glow, border animations)
- [ ] Include unique icons per service (use Heroicons or custom SVGs)
- [ ] Add "Learn More" expandable content
- [ ] Implement staggered reveal animation
- [ ] Add service images/illustrations
- [ ] Include pricing preview on hover
- [ ] Add category tabs for filtering services

### 5. Features Section Enhancements
**Current:** Simple checkmark list
**Enhance to:**
- [ ] Create alternating image/text layout
- [ ] Add feature comparison table
- [ ] Include interactive feature demos
- [ ] Add tooltip explanations
- [ ] Implement icon animations on hover
- [ ] Add "Most Popular" badges

### 6. Testimonials Section Enhancements
**Current:** Basic quote cards
**Enhance to:**
- [ ] Implement carousel/slider with autoplay
- [ ] Add video testimonial placeholders
- [ ] Include company logos
- [ ] Add verified badge indicators
- [ ] Implement masonry grid layout
- [ ] Add rating breakdown chart
- [ ] Include "Read full story" expansion

### 7. Gallery/Portfolio Section (NEW)
**Add for applicable niches:**
- [ ] Masonry image grid with lightbox
- [ ] Before/after sliders (construction, salon)
- [ ] Category filtering with smooth transitions
- [ ] Lazy loading with blur-up effect
- [ ] Image hover effects (zoom, overlay info)

### 8. Pricing Section (NEW)
**Add for applicable niches:**
- [ ] Toggle between monthly/annual pricing
- [ ] Highlight recommended plan
- [ ] Feature comparison matrix
- [ ] "Contact for Enterprise" option
- [ ] Animated price counter on toggle

### 9. Team Section (NEW)
**Add for applicable niches:**
- [ ] Team member cards with social links
- [ ] Hover effect showing bio
- [ ] Role/department filtering
- [ ] LinkedIn integration placeholders

### 10. FAQ Section (NEW)
**Add for all niches:**
- [ ] Accordion with smooth animations
- [ ] Search/filter functionality
- [ ] Category grouping
- [ ] "Still have questions?" CTA

### 11. Contact Section Enhancements
**Current:** Basic form
**Enhance to:**
- [ ] Add form validation with inline feedback
- [ ] Include interactive map placeholder
- [ ] Add live chat widget placeholder
- [ ] Implement multi-step form option
- [ ] Add file upload capability
- [ ] Include appointment scheduling widget
- [ ] Add WhatsApp/messaging integration icons

### 12. Footer Enhancements
**Current:** Basic links and info
**Enhance to:**
- [ ] Add newsletter subscription form
- [ ] Include social media feed placeholder
- [ ] Add sitemap links organized by category
- [ ] Include trust seals and certifications
- [ ] Add back-to-top button with smooth scroll
- [ ] Include operating hours widget
- [ ] Add multi-language selector placeholder

---

## Phase 2: Niche-Specific Customizations

Each niche has unique user expectations. Implement these specialized components:

### Restaurant Templates
- [ ] Menu section with categories and prices
- [ ] Reservation booking widget
- [ ] Chef spotlight section
- [ ] Instagram feed placeholder
- [ ] Special offers/happy hour banner
- [ ] Delivery partners section (UberEats, DoorDash icons)

### Law Firm Templates
- [ ] Practice areas with detailed descriptions
- [ ] Attorney profiles with credentials
- [ ] Case results/settlements showcase
- [ ] Free consultation booking form
- [ ] Legal resources/blog section
- [ ] Client portal login button

### Real Estate Templates
- [ ] Property search with filters
- [ ] Featured listings carousel
- [ ] Agent profiles with contact
- [ ] Mortgage calculator widget
- [ ] Neighborhood guides
- [ ] Virtual tour buttons

### Fitness Templates
- [ ] Class schedule/timetable
- [ ] Trainer profiles
- [ ] Membership comparison table
- [ ] Transformation gallery (before/after)
- [ ] Free trial signup form
- [ ] App download section

### Photography Templates
- [ ] Fullscreen portfolio gallery
- [ ] Package/pricing cards
- [ ] Client session booking
- [ ] Behind-the-scenes section
- [ ] Print shop integration placeholder

### E-Commerce Templates
- [ ] Featured products carousel
- [ ] Category navigation
- [ ] Sale/discount banner
- [ ] Customer reviews section
- [ ] Size guide / product details
- [ ] Cart preview widget

### SaaS Templates
- [ ] Feature comparison matrix
- [ ] Integration logos grid
- [ ] Changelog/updates section
- [ ] Documentation link
- [ ] Status page indicator
- [ ] ROI calculator

### Medical/Dental Templates
- [ ] Service procedure explanations
- [ ] Insurance accepted section
- [ ] Patient forms download
- [ ] Emergency contact banner
- [ ] Telehealth booking option
- [ ] Health tips blog section

### Salon/Spa Templates
- [ ] Service menu with durations
- [ ] Stylist/therapist profiles
- [ ] Gift card purchase option
- [ ] Loyalty program section
- [ ] Product recommendations

### Construction Templates
- [ ] Project portfolio with filters
- [ ] Process/timeline visualization
- [ ] Certifications and licenses
- [ ] Free estimate form
- [ ] Material partners section

---

## Phase 3: Animation & Interaction Library

Create a shared animation utilities file:

### File: `src/lib/animations.ts`
```tsx
// Scroll-triggered animations
export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

// Hover effects
export const cardHover = {
  rest: { scale: 1, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
  hover: { scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }
};

// Loading states
export const shimmer = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;
```

### Recommended Animation Library
Install Framer Motion for advanced animations:
```bash
npm install framer-motion
```

---

## Phase 4: Component Library Expansion

Create reusable enhanced components:

### Directory: `src/components/ui/`

```
ui/
├── AnimatedCounter.tsx    # Count-up numbers
├── Carousel.tsx           # Testimonial/gallery slider
├── Accordion.tsx          # FAQ component
├── Modal.tsx              # Lightbox/popups
├── Tabs.tsx               # Service category tabs
├── ProgressBar.tsx        # Stats visualization
├── Badge.tsx              # Labels and tags
├── Avatar.tsx             # Team member photos
├── Card.tsx               # Enhanced service cards
├── Button.tsx             # Styled button variants
├── Input.tsx              # Form inputs with validation
├── Toast.tsx              # Notification messages
└── Skeleton.tsx           # Loading placeholders
```

---

## Phase 5: Responsive Design Audit

Ensure all enhancements work across breakpoints:

### Breakpoint Checklist
- [ ] Mobile (< 640px): Stack layouts, hamburger menu, touch-friendly
- [ ] Tablet (640px - 1024px): Adjust grid columns, sidebar options
- [ ] Desktop (> 1024px): Full layouts, hover states, expanded navigation
- [ ] Large screens (> 1536px): Max-width containers, enhanced spacing

### Testing Command
```bash
# Use browser dev tools or:
npm install -D @playwright/test
```

---

## Phase 6: Performance Optimization

### Image Optimization
- [ ] Use Next.js `<Image>` component for all images
- [ ] Implement blur placeholder for images
- [ ] Add lazy loading for below-fold content
- [ ] Use WebP format where possible

### Code Splitting
- [ ] Dynamic import heavy components
- [ ] Lazy load animation libraries
- [ ] Split template renderer by section

### Example:
```tsx
import dynamic from 'next/dynamic';

const TestimonialsCarousel = dynamic(
  () => import('./ui/Carousel'),
  { loading: () => <div className="h-64 animate-pulse bg-gray-200" /> }
);
```

---

## Phase 7: Accessibility Enhancements

### WCAG 2.1 Compliance Checklist
- [ ] All images have alt text
- [ ] Color contrast meets AA standards (4.5:1)
- [ ] Keyboard navigation works for all interactive elements
- [ ] Focus states are visible
- [ ] ARIA labels on icons and buttons
- [ ] Skip to main content link
- [ ] Form labels are associated correctly
- [ ] Animations respect `prefers-reduced-motion`

### Example:
```tsx
// Respect user motion preferences
const prefersReducedMotion = 
  typeof window !== 'undefined' && 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const animationDuration = prefersReducedMotion ? 0 : 0.6;
```

---

## Quality Standards

### Before Marking Any Task Complete:

1. **Visual Polish**
   - No layout shifts on load
   - Consistent spacing using Tailwind's spacing scale
   - Colors from the template's colorScheme only
   - Typography hierarchy is clear

2. **Interaction Quality**
   - Hover states provide feedback
   - Click targets are at least 44x44px
   - Animations are smooth (60fps)
   - Loading states prevent layout jumps

3. **Code Quality**
   - TypeScript types for all props
   - No `any` types
   - Components are reusable
   - CSS uses Tailwind utilities (minimal custom CSS)

4. **Cross-Browser Testing**
   - Chrome, Firefox, Safari, Edge
   - iOS Safari, Android Chrome

---

## Getting Started Commands

```bash
# Navigate to project
cd c:\Dev\Notes\template-agent

# Install dependencies (if adding new packages)
npm install framer-motion @heroicons/react

# Run development server
npm run dev

# Build to check for errors
npm run build

# Type check
npx tsc --noEmit
```

---

## Suggested Work Order

1. **Week 1:** Navigation + Hero + Stats animations
2. **Week 2:** Services + Features enhanced layouts
3. **Week 3:** New sections (Gallery, Pricing, Team, FAQ)
4. **Week 4:** Testimonials carousel + Contact form
5. **Week 5:** Niche-specific components (5 niches)
6. **Week 6:** Remaining niche-specific components
7. **Week 7:** Animation library + Performance
8. **Week 8:** Accessibility audit + Final polish

---

## Success Metrics

Your enhancements are successful when:

- [ ] Each template feels unique to its industry
- [ ] Users spend more time exploring templates
- [ ] All templates score 90+ on Lighthouse
- [ ] Zero accessibility violations
- [ ] Templates work flawlessly on mobile
- [ ] Load time under 3 seconds on 3G
- [ ] Animations enhance rather than distract

---

## Notes for the Agent

1. **Preserve existing functionality** - Enhancements should add to, not break, current features
2. **Use the colorScheme** - Every template has `colorScheme.primary`, `secondary`, `accent`, `background`, `text` - use these, don't hardcode colors
3. **Keep it realistic** - These are demos, not production sites. Use placeholder content appropriately
4. **Document changes** - Update this file as you complete sections
5. **Test after each change** - Run `npm run build` frequently

---

## Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Heroicons](https://heroicons.com/)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

*Last Updated: November 2024*
*Created for: Template Gallery Enhancement Project*

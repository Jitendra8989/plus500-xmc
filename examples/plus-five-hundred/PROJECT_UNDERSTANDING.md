# Plus500 Project Understanding

## Overview
This workspace contains two main projects for Plus500 trading platform components.

## 📁 Project Structure

### 1. **Sitecore Headless Project** (Main Project)
**Path:** `/src/`
**Technology:** Next.js + Sitecore Content SDK

#### Key Folders:
- **`/src/components/`** - All Sitecore components
- **`/src/components/HeroBanner/`** - Main hero banner component
- **`/src/components/banner/hero-section/`** - Alternative hero section

#### Main Files:
- **`HeroBanner.tsx`** - Main hero component with 3 variants (Default, Dark, Light)
- **`HeroBanner.module.css`** - All styling for hero banner
- **`sitecore.config.ts`** - Sitecore configuration

#### Features:
- Multiple theme variants (Background Image, Media Left, Media Right)
- Sitecore field binding
- Responsive design
- Professional styling

---

### 2. **Reference React Project** 
**Path:** `/A-REFERENCE-REACTPROJECT/Plus500Showcase/`
**Technology:** Pure React + Tailwind CSS

#### Purpose:
- **Design reference** for styling improvements
- **Component examples** to match visual quality
- **Modern UI patterns** to implement

#### Key Reference File:
- **`HeroBanner.tsx`** - Shows modern typography, button styling, animations

---

## 🔧 Component System

### HeroBanner Component
**Location:** `/src/components/HeroBanner/`

#### Variants Available:
1. **Default** - Standard blue gradient theme
2. **Dark** - Dark theme with amber accents  
3. **Light** - Light theme with dark text

#### Theme Layouts:
- **Background Image** - Full-screen background with centered text
- **Media Left** - Image on left, content on right
- **Media Right** - Content on left, image on right

#### Sitecore Fields:
- `Title` - Main heading
- `Subtitle` - Description text
- `Badges` - Rich text badges
- `Media` - Background/side image
- `PrimaryCTA` - Main action button
- `SecondaryCTA` - Secondary action button

---

## 🎨 Styling Approach

### CSS Modules
- **File:** `HeroBanner.module.css`
- **Approach:** Component-scoped styles
- **Features:** Responsive, animations, theme variants

### Design System
- **Typography:** Large, bold headings (3rem → 5.5rem)
- **Buttons:** Modern gradients, hover effects, large padding
- **Spacing:** Generous margins and padding
- **Colors:** Blue primary, amber/yellow accents

---

## 🚀 Development Workflow

### Making Style Changes:
1. Edit `HeroBanner.module.css`
2. Reference React project for design inspiration
3. Test across all three variants (Default, Dark, Light)
4. Check responsive behavior

### Adding New Components:
1. Create folder in `/src/components/`
2. Follow Sitecore SDK patterns from HeroBanner
3. Use CSS Modules for styling
4. Support multiple themes/variants

---

## 📝 Quick Reference

### Important Files:
- **Hero Component:** `/src/components/HeroBanner/HeroBanner.tsx`
- **Hero Styles:** `/src/components/HeroBanner/HeroBanner.module.css`
- **Reference Design:** `/A-REFERENCE-REACTPROJECT/.../HeroBanner.tsx`

### Key Classes:
- `.heroBanner` - Main container
- `.heroTitle` - Large heading
- `.heroSubtitle` - Description text
- `.ctaPrimary` - Main button
- `.ctaSecondary` - Secondary button

### Theme Modifiers:
- `.heroBanner--dark` - Dark theme
- `.heroBanner--light` - Light theme  
- `.heroBanner--mediaLeft` - Left image layout
- `.heroBanner--mediaRight` - Right image layout

---

*This document provides quick reference for understanding and working with the Plus500 component projects.*
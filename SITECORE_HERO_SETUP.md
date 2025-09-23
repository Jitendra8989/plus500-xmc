# Sitecore Hero Variants Setup Guide

## 🎯 Overview

All four Plus500 hero section variants have been successfully integrated into the Sitecore project with complete data sources and rendering configuration.

## 📁 Files Created/Updated

### Data Sources (YML Files)
- `serialization/content/plus-five-hundred/plus-five-hundred/Home/DemoPlus500/Data/HeroSection-Default.yml`
- `serialization/content/plus-five-hundred/plus-five-hundred/Home/DemoPlus500/Data/HeroSection-Dark.yml`
- `serialization/content/plus-five-hundred/plus-five-hundred/Home/DemoPlus500/Data/HeroSection-Robinhood.yml`
- `serialization/content/plus-five-hundred/plus-five-hundred/Home/DemoPlus500/Data/HeroSection-Minimal.yml`

### Page Configuration
- `serialization/content/plus-five-hundred/plus-five-hundred/Home/DemoPlus500.yml` (Updated with all variants)

### Component Code
- `src/components/banner/hero-section/HeroSection.tsx` (Added Robinhood & Minimal variants)
- `src/components/banner/hero-section/HeroSection.module.css` (Complete styling)

## 🎨 Data Sources Configuration

Each data source contains sample content optimized for its variant:

### Default Variant (ID: a1b2c3d4-e5f6-7890-abcd-123456789001)
```yaml
Title: "Trade with Confidence on Plus500"
Sub Title: "Join millions of traders worldwide who trust Plus500..."
CTA: "Start Trading Now" -> #start-trading
```

### Dark Variant (ID: a1b2c3d4-e5f6-7890-abcd-123456789002)
```yaml
Title: "Professional Trading Platform"
Sub Title: "Experience institutional-grade trading technology..."
CTA: "Open Account" -> #open-account
```

### Robinhood Variant (ID: a1b2c3d4-e5f6-7890-abcd-123456789003)
```yaml
Title: "The Future of Trading is Here"
Sub Title: "Revolutionary trading experience with cutting-edge technology..."
CTA: "Start Investing" -> #start-investing
```

### Minimal Variant (ID: a1b2c3d4-e5f6-7890-abcd-123456789004)
```yaml
Title: "Simple. Powerful. Trading."
Sub Title: "Clean, intuitive trading platform designed for clarity..."
CTA: "Get Started" -> #get-started
```

## 📋 Page Rendering Configuration

The DemoPlus500 page now includes all four hero variants in sequence:

```xml
<r uid="{HERO001-DEFAULT-4F44-8FC7-A61E0D8F2074}"
   s:ds="a1b2c3d4-e5f6-7890-abcd-123456789001"
   s:id="{093F9ED8-FC95-4249-8A05-B93ECF734381}"
   s:par="Variant=Default&amp;..." />

<r uid="{HERO002-DARK-4F44-8FC7-A61E0D8F2074}"
   s:ds="a1b2c3d4-e5f6-7890-abcd-123456789002"
   s:id="{093F9ED8-FC95-4249-8A05-B93ECF734381}"
   s:par="Variant=Dark&amp;..." />

<r uid="{HERO003-ROBINHOOD-4F44-8FC7-A61E0D8F2074}"
   s:ds="a1b2c3d4-e5f6-7890-abcd-123456789003"
   s:id="{093F9ED8-FC95-4249-8A05-B93ECF734381}"
   s:par="Variant=Robinhood&amp;..." />

<r uid="{HERO004-MINIMAL-4F44-8FC7-A61E0D8F2074}"
   s:ds="a1b2c3d4-e5f6-7890-abcd-123456789004"
   s:id="{093F9ED8-FC95-4249-8A05-B93ECF734381}"
   s:par="Variant=Minimal&amp;..." />
```

## 🔧 Component Mapping

The Hero Section component is mapped in `.sitecore/component-map.ts`:

```typescript
import * as HeroSection from 'src/components/banner/hero-section/HeroSection';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  // ... other components
  ['HeroSection', HeroSection],
]);
```

## 🎭 Variant Selection

Each rendering uses the `Variant` parameter to determine which component function to call:

- `Variant=Default` → `HeroSection.Default`
- `Variant=Dark` → `HeroSection.Dark`
- `Variant=Robinhood` → `HeroSection.Robinhood`
- `Variant=Minimal` → `HeroSection.Minimal`

## 🚀 Deployment Steps

### 1. Sync Serialization Items
```bash
# Push serialization items to Sitecore
dotnet sitecore ser push
```

### 2. Build and Deploy Frontend
```bash
# Build the Next.js application
npm run build

# Start development server
npm run dev
```

### 3. Verify in Sitecore

1. **Content Editor**: Navigate to `/sitecore/content/plus-five-hundred/plus-five-hundred/Home/DemoPlus500/Data/`
2. **Verify Data Sources**: Check that all four hero section data sources exist
3. **Page Preview**: Preview the DemoPlus500 page to see all variants

## 📱 Access Points

### 1. Sitecore Experience Editor
- Navigate to: `/sitecore/content/plus-five-hundred/plus-five-hundred/Home/DemoPlus500`
- Edit in Experience Editor to see live previews

### 2. Frontend Application
- URL: `http://localhost:3000/DemoPlus500` (after npm run dev)
- All four variants will render in sequence

### 3. Content Management
- Each variant can be edited independently in Content Editor
- Change titles, subtitles, CTAs, and images per variant

## 🎨 Customization Guide

### Adding New Variants

1. **Create New Data Source**:
```yaml
# Create new YML file in /Data/ folder
ID: "new-unique-guid"
Template: "d3701fac-9f1d-44aa-8326-3dc4c4e08238"
# Add content fields
```

2. **Add Component Function**:
```typescript
// In HeroSection.tsx
export const NewVariant = (props: HeroSectionProps): JSX.Element => {
  // Component implementation
};
```

3. **Add CSS Styles**:
```css
/* In HeroSection.module.css */
.heroSection--newvariant {
  /* Variant-specific styles */
}
```

4. **Update Page Rendering**:
```xml
<r uid="{NEW-VARIANT-UID}"
   s:ds="new-data-source-id"
   s:par="Variant=NewVariant&amp;..." />
```

### Modifying Existing Content

1. **In Sitecore Content Editor**:
   - Navigate to the specific data source
   - Edit Title, Sub Title, CTA, or Image fields
   - Publish changes

2. **In Code** (for structure changes):
   - Update `HeroSection.tsx` for component logic
   - Update `HeroSection.module.css` for styling
   - Rebuild and deploy

## 🎯 Content Strategy

### When to Use Each Variant

| Variant | Best For | Target Audience | Key Message |
|---------|----------|-----------------|-------------|
| **Default** | Main landing pages | General traders | Trust & reliability |
| **Dark** | B2B/Enterprise pages | Professional traders | Authority & sophistication |
| **Robinhood** | Modern/trendy pages | Millennials, Gen Z | Innovation & disruption |
| **Minimal** | Documentation/Education | All users | Clarity & simplicity |

### Content Guidelines

#### Titles (2-6 words)
- ✅ "Trade with Confidence"
- ✅ "Professional Trading Platform"
- ❌ "Plus500 is the best trading platform in the world"

#### Subtitles (2-3 sentences max)
- Focus on value proposition
- Include specific benefits
- Use active voice

#### CTAs (1-3 words)
- **Primary**: Start, Get, Join, Open
- **Secondary**: Learn, Try, Watch, View

## 🔍 Troubleshooting

### Common Issues

1. **Variants Not Rendering**
   - Check component mapping in `component-map.ts`
   - Verify Variant parameter in rendering configuration
   - Ensure CSS files are imported

2. **Content Not Updating**
   - Publish items in Sitecore
   - Clear browser cache
   - Check data source IDs match

3. **Styling Issues**
   - Verify CSS imports in `index.css`
   - Check Tailwind configuration
   - Ensure responsive classes are applied

### Development Tips

1. **Testing Variants**:
   ```typescript
   // Add console logs to verify variant selection
   console.log('Rendering variant:', props.params?.Variant);
   ```

2. **Content Preview**:
   - Use Sitecore Experience Editor for live editing
   - Test responsive design with browser dev tools

3. **Performance**:
   - Animations are disabled on mobile (≤480px)
   - Images should be optimized for web

## ✅ Success Checklist

- [ ] All data sources created and contain sample content
- [ ] DemoPlus500 page updated with four hero variants
- [ ] Component code includes all four variant functions
- [ ] CSS styling complete with animations
- [ ] Variant parameters correctly configured
- [ ] Frontend builds without errors
- [ ] All variants display properly in browser
- [ ] Responsive design works across breakpoints
- [ ] Content can be edited in Sitecore

## 🎉 Ready for Use!

The Plus500 hero section variants are now fully integrated into your Sitecore project and ready for content management and deployment!
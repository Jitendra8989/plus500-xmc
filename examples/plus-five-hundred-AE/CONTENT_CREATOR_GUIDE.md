# Plus500 Content Creator Guide
## Working with Sitecore YML Files and Components

### Overview
This guide provides instructions for content creators and coding assistants working with Plus500's Sitecore serialized content in YML format. All content is managed through YML files in the `serialization/` directory.

---

## 📁 Directory Structure

```
serialization/
├── serialization/content/plus-five-hundred/plus-five-hundred/
│   ├── US/                                    # US region content
│   ├── AE/                                    # AE (UAE) region content
│   ├── RO/                                    # Romania region content
│   └── Data/
│       ├── TreeLists/MainMenu/               # Navigation structure
│       ├── HeaderLinks/                      # Header navigation items
│       ├── FooterLinks/                      # Footer link sections
│       └── FeatureItems/                     # Feature content items
├── serialization/media/plus-five-hundred/plus-five-hundred/
│   ├── Images/                               # Image assets
│   └── Documents/                            # Document assets
└── serialization/templates/plus-five-hundred/
    ├── Component/                            # Component templates
    ├── Page/                                 # Page templates
    └── Data/                                 # Data item templates
```

---

## 🏗️ Component System

### Available Components & Variants

#### 1. **HeroSection Component**
**Variants:** Default, Dark, Light, Robinhood, Minimal, ImageBackground, TextOnly

**YML Structure:**
```yaml
# Example: /US/Home/HeroSection.yml
---
ID: "hero-section-id"
Parent: "home-page-id"
Template: "hero-section-template"
Path: /sitecore/content/plus-five-hundred/plus-five-hundred/US/Home/HeroSection
DB: master
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "title-field-id"
      Hint: Title
      Value: "Trade with Confidence"
    - ID: "subtitle-field-id"
      Hint: Subtitle
      Value: "Professional CFD Trading Platform"
    - ID: "description-field-id"
      Hint: Description
      Value: |
        <p>Experience advanced trading tools, real-time market data, and professional analysis on our secure platform.</p>
    - ID: "features-field-id"
      Hint: Features
      Value: |
        <ul>
          <li>Advanced charting tools</li>
          <li>Real-time market data</li>
          <li>24/7 customer support</li>
        </ul>
    - ID: "primary-cta-field-id"
      Hint: PrimaryCTA
      Value: |
        <link linktype="internal" text="Start Trading" anchor="" linktype="internal" class="" title="" target="" querystring="" id="{target-page-id}" />
    - ID: "secondary-cta-field-id"
      Hint: SecondaryCTA
      Value: |
        <link linktype="external" url="https://demo.plus500.com" text="Try Demo" target="_blank" />
    - ID: "image-field-id"
      Hint: Image
      Value: |
        <image mediaid="{image-media-id}" alt="Trading Platform" height="400" width="600" />
    - ID: "background-image-field-id"
      Hint: BackgroundImage
      Value: |
        <image mediaid="{bg-image-media-id}" alt="Background" height="1080" width="1920" />
    - ID: "is-image-left-field-id"
      Hint: IsImageLeft
      Value: "1"  # 1 for true, 0 for false
```

**Parameters:**
```yaml
# Component Parameters (in rendering definition)
Parameters:
  Layout: "split"           # Options: split, centered, fullscreen
  styles: "custom-class"    # Additional CSS classes
```

#### 2. **Header Component**
**Variants:** Default, Dark, Light, Primary, Glass, Transparent

**YML Structure with Navigation Hierarchy:**
```yaml
# Example: Header component with nested navigation
---
ID: "header-component-id"
Parent: "layout-id"
Template: "header-template"
Fields:
- ID: "logo-field-id"
  Hint: Logo
  Value: |
    <image mediaid="{logo-media-id}" alt="Plus500 Logo" height="40" width="120" />
- ID: "logo-cta-field-id"
  Hint: LogoCTA
  Value: |
    <link linktype="internal" text="Home" id="{home-page-id}" />
- ID: "main-menu-field-id"
  Hint: MainMenu
  Value: |
    {main-menu-treelist-id}|{trading-menu-id}|{education-menu-id}|{about-menu-id}
- ID: "primary-cta-field-id"
  Hint: PrimaryCTA
  Value: |
    <link linktype="external" url="https://app.plus500.com/trade" text="Start Trading" target="_blank" class="btn-primary" />
- ID: "secondary-cta-field-id"
  Hint: SecondaryCTA
  Value: |
    <link linktype="internal" text="Try Demo" id="{demo-page-id}" class="btn-secondary" />
- ID: "language-navigator-field-id"
  Hint: LanguageNavigator
  Value: |
    {language-menu-id}
```

**Navigation TreeList Structure:**
```yaml
# Example: /Data/TreeLists/MainMenu/US/Trading.yml
---
ID: "trading-menu-id"
Parent: "main-menu-us-id"
Template: "navigation-item-template"
Fields:
- ID: "general-link-field-id"
  Hint: GeneralLink
  Value: |
    <link linktype="internal" text="Trading" id="{trading-page-id}" />
- ID: "title-field-id"
  Hint: Title
  Value: "Trading"
- ID: "tree-list-field-id"
  Hint: TreeList
  Value: |
    {cfd-trading-id}|{forex-trading-id}|{crypto-trading-id}

# Child navigation items
---
ID: "cfd-trading-id"
Parent: "trading-menu-id"
Template: "navigation-item-template"
Fields:
- ID: "general-link-field-id"
  Hint: GeneralLink
  Value: |
    <link linktype="internal" text="CFD Trading" id="{cfd-page-id}" />
- ID: "title-field-id"
  Hint: Title
  Value: "CFD Trading"
```

#### 3. **Footer Component**
**Variants:** Default, Minimal, Brand, Corporate

**YML Structure with Link Sections:**
```yaml
# Example: Footer component with organized link sections
---
ID: "footer-component-id"
Parent: "layout-id"
Template: "footer-template"
Fields:
- ID: "logo-field-id"
  Hint: Logo
  Value: |
    <image mediaid="{footer-logo-media-id}" alt="Plus500" height="30" width="90" />
- ID: "brand-title-field-id"
  Hint: BrandTitle
  Value: "Plus500"
- ID: "legal-text-field-id"
  Hint: LegalText
  Value: |
    <p>© 2024 Plus500. All rights reserved. CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage.</p>
- ID: "legal-entity-field-id"
  Hint: LegalEntity
  Value: "Plus500 Limited"
- ID: "regulatory-authority-field-id"
  Hint: RegulatoryAuthority
  Value: "Financial Conduct Authority (FCA)"
- ID: "license-number-field-id"
  Hint: LicenseNumber
  Value: "509909"
- ID: "country-field-id"
  Hint: Country
  Value: "United Kingdom"
- ID: "section-1-header-field-id"
  Hint: Section-1-Header
  Value: "Trading"
- ID: "section-1-links-field-id"
  Hint: Section-1-Links
  Value: |
    {trading-link-1-id}|{trading-link-2-id}|{trading-link-3-id}
- ID: "section-2-header-field-id"
  Hint: Section-2-Header
  Value: "Education"
- ID: "section-2-links-field-id"
  Hint: Section-2-Links
  Value: |
    {education-link-1-id}|{education-link-2-id}
- ID: "social-links-header-field-id"
  Hint: SocialLinks-Header
  Value: "Follow Us"
- ID: "social-links-field-id"
  Hint: SocialLinks
  Value: |
    {facebook-link-id}|{twitter-link-id}|{linkedin-link-id}
```

**Footer Link Items:**
```yaml
# Example: /Data/FooterLinks/Section1/CFDTrading.yml
---
ID: "trading-link-1-id"
Parent: "section-1-links-id"
Template: "footer-link-template"
Fields:
- ID: "link-field-id"
  Hint: Link
  Value: |
    <link linktype="internal" text="CFD Trading" id="{cfd-page-id}" title="Learn about CFD Trading" />
- ID: "title-field-id"
  Hint: Title
  Value: "CFD Trading"
```

#### 4. **FeatureSection Component**
**Variants:** Protection, Education, Features

**YML Structure with Feature Items:**
```yaml
# Example: Feature section with multiple feature items
---
ID: "feature-section-id"
Parent: "page-id"
Template: "feature-section-template"
Fields:
- ID: "section-title-field-id"
  Hint: SectionTitle
  Value: "Why Choose Plus500?"
- ID: "section-subtitle-field-id"
  Hint: SectionSubtitle
  Value: "Trusted by millions of traders worldwide"
- ID: "section-cta-field-id"
  Hint: SectionCTA
  Value: |
    <link linktype="internal" text="Get Started" id="{signup-page-id}" class="btn-primary" />
- ID: "feature-items-field-id"
  Hint: FeatureItems
  Value: |
    {feature-item-1-id}|{feature-item-2-id}|{feature-item-3-id}
```

**Feature Item Structure:**
```yaml
# Example: /Data/FeatureItems/Security.yml
---
ID: "feature-item-1-id"
Parent: "feature-items-folder-id"
Template: "feature-item-template"
Fields:
- ID: "title-field-id"
  Hint: Title
  Value: "Advanced Security"
- ID: "subtitle-field-id"
  Hint: SubTitle
  Value: "Your funds are protected"
- ID: "description-field-id"
  Hint: Description
  Value: |
    <p>We use industry-leading security measures to protect your personal information and funds.</p>
- ID: "image-field-id"
  Hint: Image
  Value: |
    <image mediaid="{security-icon-media-id}" alt="Security Icon" height="80" width="80" />
- ID: "primary-cta-field-id"
  Hint: PrimaryCTA
  Value: |
    <link linktype="internal" text="Learn More" id="{security-page-id}" />
```

---

## 🌍 Multi-Region Content Management

### Site Configuration
Based on current sites.json configuration:

- **plus-five-hundred-US** (English) - Default US region
- **plus-five-hundred-AE** (ar-AE) - UAE/Arabic region
- **plus-five-hundred-RO** (en) - Romania region

### Region-Specific Content Structure

#### US Region Content
```yaml
# Path: /serialization/content/plus-five-hundred/plus-five-hundred/US/
# Example: US Homepage
---
ID: "us-home-id"
Parent: "us-folder-id"
Template: "page-template"
Path: /sitecore/content/plus-five-hundred/plus-five-hundred/US/Home
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "page-title-field-id"
      Value: "Plus500 - Leading CFD Trading Platform"
    - ID: "meta-description-field-id"
      Value: "Trade CFDs on shares, indices, commodities with Plus500. Professional trading platform with advanced tools."
```

#### AE Region Content (Arabic)
```yaml
# Path: /serialization/content/plus-five-hundred/plus-five-hundred/AE/
# Example: AE Homepage
---
ID: "ae-home-id"
Parent: "ae-folder-id"
Template: "page-template"
Path: /sitecore/content/plus-five-hundred/plus-five-hundred/AE/Home
Languages:
- Language: ar-AE
  Versions:
  - Version: 1
    Fields:
    - ID: "page-title-field-id"
      Value: "Plus500 - منصة تداول العقود مقابل الفروقات الرائدة"
    - ID: "meta-description-field-id"
      Value: "تداول العقود مقابل الفروقات على الأسهم والمؤشرات والسلع مع Plus500"
```

---

## 📝 Content Creation Best Practices

### 1. **Field Value Formats**

#### Text Fields
```yaml
- ID: "text-field-id"
  Hint: FieldName
  Value: "Simple text content"
```

#### Rich Text Fields
```yaml
- ID: "richtext-field-id"
  Hint: FieldName
  Value: |
    <p>Rich text content with <strong>formatting</strong></p>
    <ul>
      <li>List item 1</li>
      <li>List item 2</li>
    </ul>
```

#### Link Fields
```yaml
# Internal Link
- ID: "link-field-id"
  Hint: FieldName
  Value: |
    <link linktype="internal" text="Link Text" anchor="" class="css-class" title="Link Title" target="" querystring="param=value" id="{target-item-id}" />

# External Link
- ID: "link-field-id"
  Hint: FieldName
  Value: |
    <link linktype="external" url="https://example.com" text="External Link" target="_blank" class="external-link" title="External Site" />

# Media Link
- ID: "link-field-id"
  Hint: FieldName
  Value: |
    <link linktype="media" text="Download PDF" id="{media-item-id}" />
```

#### Image Fields
```yaml
- ID: "image-field-id"
  Hint: FieldName
  Value: |
    <image mediaid="{media-item-id}" alt="Image Description" height="400" width="600" hspace="" vspace="" showineditor="" usethumbnail="" src="~/media/path/image.jpg" />
```

#### TreeList/MultiList Fields
```yaml
- ID: "treelist-field-id"
  Hint: FieldName
  Value: |
    {item-id-1}|{item-id-2}|{item-id-3}
```

#### Boolean Fields
```yaml
- ID: "boolean-field-id"
  Hint: FieldName
  Value: "1"  # 1 = true, 0 = false
```

### 2. **Component Parameters**

Components can be customized using parameters in their rendering definitions:

```yaml
# Component rendering with parameters
Parameters:
  Layout: "centered"              # Layout variant
  styles: "custom-bg dark-theme"  # CSS classes
  BackgroundImage: "~/media/path/bg.jpg"  # Background image
  DynamicPlaceholderId: "main-content"    # Placeholder ID
```

### 3. **Navigation Hierarchy**

When creating navigation structures, maintain proper parent-child relationships:

```yaml
# Main navigation folder
---
ID: "main-menu-us-id"
Parent: "treelists-folder-id"
Template: "folder-template"

# Top-level navigation item
---
ID: "trading-menu-id"
Parent: "main-menu-us-id"
Template: "navigation-item-template"

# Sub-navigation item
---
ID: "cfd-trading-id"
Parent: "trading-menu-id"  # Child of trading menu
Template: "navigation-item-template"
```

---

## 🔄 Workflow Guidelines

### Creating New Content

1. **Identify the correct region folder** (US, AE, RO)
2. **Choose appropriate template** based on content type
3. **Generate unique IDs** for new items
4. **Set proper parent relationships**
5. **Include all required fields**
6. **Add appropriate language versions**

### Modifying Existing Content

1. **Preserve existing IDs** and structure
2. **Update only necessary fields**
3. **Maintain language consistency**
4. **Verify parent-child relationships**
5. **Test component functionality**

### Multi-Language Content

1. **Use region-specific language codes**:
   - US: `en`
   - AE: `ar-AE`
   - RO: `en`
2. **Maintain consistent structure** across languages
3. **Translate all user-facing content**
4. **Keep technical fields** (IDs, classes) consistent

---

## 🚀 Component-Specific Guidelines

### Hero Sections
- **Always include** Title and Description
- **Provide both CTAs** for maximum engagement
- **Use high-quality images** (1920x1080 for backgrounds)
- **Choose appropriate variant** based on page design

### Feature Sections
- **Limit feature items** to 3-6 for optimal layout
- **Use consistent icon sizes** (80x80 for Protection, 32x32 for Features)
- **Provide clear, concise descriptions**
- **Include relevant CTAs** for each feature

### Headers/Footers
- **Maintain navigation hierarchy** for usability
- **Include all legal information** for compliance
- **Test responsive behavior** across variants
- **Verify link functionality** across regions

### Layout Components
- **Use Column/Row Splitters** for complex layouts
- **Configure width classes** appropriately
- **Enable only necessary placeholders**
- **Test responsive behavior**

---

## ✅ Validation Checklist

Before deploying content changes:

- [ ] All required fields are populated
- [ ] Image alt text is descriptive and accessible
- [ ] Links point to correct targets
- [ ] Navigation hierarchy is logical
- [ ] Content is region-appropriate
- [ ] Language codes match site configuration
- [ ] Component variants are used correctly
- [ ] Responsive design considerations are met
- [ ] Legal/compliance content is accurate

---

This guide provides the foundation for creating and managing content in the Plus500 Sitecore system. Always test changes in a development environment before deploying to production.
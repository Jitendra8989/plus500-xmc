# Sitecore Component Creation Guide for Coding Assistants

This guide provides step-by-step instructions for coding assistants to create complete Sitecore components from scratch in an XM Cloud Next.js project.

## Table of Contents
1. [Initial Setup](#1-initial-setup)
2. [Creating New Components](#2-creating-new-components)
3. [Template Creation](#3-template-creation)
4. [Content Creation](#4-content-creation)
5. [Rendering Creation](#5-rendering-creation)
6. [React Component Development](#6-react-component-development)
7. [Deployment & Testing](#7-deployment--testing)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Initial Setup

### 1.1 Install Sitecore CLI
```bash
# Check if Sitecore CLI is installed
sitecore --version

# If not installed, install it
dotnet tool install -g Sitecore.CLI
```

### 1.2 Initialize Project
```bash
# Navigate to project directory
cd path/to/your/project

# Initialize Sitecore project (if not done)
sitecore init

# Install XM Cloud plugin
sitecore plugin add -n Sitecore.DevEx.Extensibility.XMCloud
```

### 1.3 Configure Environment
Check `.env` file for required variables:
```env
SITECORE_EDGE_CONTEXT_ID=your-context-id
NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID=your-context-id
NEXT_PUBLIC_DEFAULT_SITE_NAME=your-site-name
SITECORE_EDITING_SECRET=your-secret
```

### 1.4 Authentication & Serialization Setup

#### 1.4.1 Sitecore Cloud Authentication
```bash
# Login to Sitecore Cloud (this will open browser)
sitecore cloud login
```

**⚠️ IMPORTANT**: This command will:
1. **Open your default browser automatically**
2. **Redirect to Sitecore Cloud login page**
3. **Ask you to login with your Sitecore credentials**
4. **Show authorization page** - Click "Allow" to grant access
5. **Return to terminal** with success message

**Expected Browser Flow:**
```
1. Browser opens → https://auth.sitecorecloud.io/...
2. Login page appears → Enter your Sitecore credentials
3. Authorization page → Click "Allow" button
4. Success page → "You can close this window"
5. Terminal shows → "Login successful"
```

**Troubleshooting Authentication:**
- If browser doesn't open: Copy the URL from terminal and open manually
- If login fails: Check your Sitecore Cloud credentials
- If permission denied: Ensure you have access to the XM Cloud environment

#### 1.4.2 Check Serialization Configuration
Before pulling, verify your serialization setup:

```bash
# Check current serialization modules
sitecore ser info
```

**Expected Output:**
```
ContentSDKSite
  Subtrees:
    content: /sitecore/content/yoursite
    templates: /sitecore/templates/Project/yourproject
    media: /sitecore/media library/Project/yourproject
    renderings: /sitecore/layout/Renderings/Project/yourproject
```

**Verify Module Configuration:**
Check `TODO/content.module.json`:
```json
{
  "namespace": "ContentSDKSite",
  "items": {
    "includes": [
      {
        "name": "content",
        "path": "/sitecore/content/yoursite",
        "allowedPushOperations": "createUpdateAndDelete"
      },
      {
        "name": "templates",
        "path": "/sitecore/templates/Project/yourproject",
        "allowedPushOperations": "createUpdateAndDelete"
      },
      {
        "name": "media",
        "path": "/sitecore/media library/Project/yourproject",
        "allowedPushOperations": "createUpdateAndDelete"
      },
      {
        "name": "renderings",
        "path": "/sitecore/layout/Renderings/Project/yourproject",
        "allowedPushOperations": "createUpdateAndDelete"
      }
    ]
  }
}
```

#### 1.4.3 Initial Content Pull
```bash
# Pull existing serialized items
sitecore ser pull
```

**Expected Output**: You should see items being pulled:
```
[master] [A] /sitecore/content/yoursite/Home (guid-here)
[master] [A] /sitecore/templates/Project/yourproject (guid-here)
[master] [A] /sitecore/layout/Renderings/Project/yourproject (guid-here)
[master] [A] /sitecore/media library/Project/yourproject (guid-here)

[master] Discovered 150 changes after evaluating 200 total items.
[master] Applying changes...
[master] Changes have been applied to serialized items (4 subtrees).
```

**Understanding Pull Results:**
- `[A]` = Added (new items)
- `[U]` = Updated (existing items modified)
- `[D]` = Deleted (items removed)
- Numbers in parentheses = Item GUIDs

#### 1.4.4 Verify Pulled Structure
```bash
# Check what was pulled
ls TODO/serialization/

# Should show:
content/     # Content items
templates/   # Template definitions
renderings/  # Rendering definitions
media/       # Media library items
```

**Common Pull Issues:**

**Problem**: No items pulled
```bash
Configured source item path /sitecore/content/yoursite did not exist
```
**Solution**: Check paths in `content.module.json` match your Sitecore structure

**Problem**: Authentication expired
```bash
Error: Unauthorized (401)
```
**Solution**: Re-authenticate with `sitecore cloud login`

**Problem**: Permission denied
```bash
Error: Forbidden (403)
```
**Solution**: Check you have proper access to the XM Cloud environment

#### 1.4.5 Understanding Serialization Workflow

**Pull → Modify → Push → Publish Cycle:**

1. **Pull**: Get latest from Sitecore Cloud
   ```bash
   sitecore ser pull
   ```

2. **Modify**: Create/edit YAML files locally
   ```bash
   # Edit files in TODO/serialization/
   ```

3. **Validate**: Check for issues
   ```bash
   sitecore ser validate --fix
   ```

4. **Push**: Send changes to Sitecore Cloud
   ```bash
   sitecore ser push
   ```

5. **Publish**: User publishes in Sitecore UI
   ```
   Content Editor → Publish → Publish Site
   ```

**Important Notes:**
- Always pull before making changes
- Validate before pushing
- Push only deploys to master database
- User must publish for changes to appear on website

---

## 2. Creating New Components

### 2.1 Component Planning
Before creating, identify:
- **Component Name**: e.g., "CustomPromo", "FeatureBanner"
- **Fields Needed**: Title, Description, Image, Links, etc.
- **Variants**: Default, Hero, Card, etc.
- **Placement**: Where it will be used (Home, Landing pages, etc.)

### 2.2 Project Structure
Understand the project structure:
```
TODO/
├── serialization/
│   ├── content/          # Content items
│   ├── templates/        # Template definitions
│   ├── renderings/       # Rendering definitions
│   └── media/           # Media items
├── content.module.json   # Serialization config
└── sitecore.json        # Main config

src/
└── components/
    └── category/         # Organized by component category
        └── component-name/
            ├── Component.tsx
            ├── Component.module.css
            ├── Component.module.css.d.ts
            ├── variants.ts
            └── README.md
```

**Component Organization**: Components should be organized to match Sitecore rendering structure:
- **Banner components**: `src/components/banner/hero-section/`, `src/components/banner/promo-banner/`
- **Content components**: `src/components/content/rich-text/`, `src/components/content/text-block/`
- **Navigation components**: `src/components/navigation/menu/`, `src/components/navigation/breadcrumb/`
- **Layout components**: `src/components/layout/container/`, `src/components/layout/row-splitter/`

This structure mirrors the Sitecore rendering organization in `serialization/renderings/project/Category/ComponentName.yml`

---

## 3. Template Creation

### 3.1 Create Template YAML
Create template file: `TODO/serialization/templates/Project/yourproject/ComponentName.yml`

```yaml
---
ID: "UNIQUE-GUID-HERE"  # Generate new GUID
Parent: "PARENT-TEMPLATE-GUID"
Template: "ab86861a-6030-46c5-b394-e8f99e8b87db"  # Template template
Path: "/sitecore/templates/Project/yourproject/ComponentName"
SharedFields:
- ID: "06d5295c-ed2f-4a54-9bf2-26228d113318"
  Hint: __Icon
  Value: "apps/32x32/photo_landscape.png"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20241219T120000Z
    - ID: "52807595-0f8f-4b20-8d2a-cb71d28c6103"
      Hint: __Owner
      Value: sitecore\Admin
```

### 3.2 Create Field Templates
For each field, create: `TODO/serialization/templates/Project/yourproject/ComponentName/Content/FieldName.yml`

**Example - Title Field:**
```yaml
---
ID: "UNIQUE-GUID-FOR-TITLE"
Parent: "COMPONENT-TEMPLATE-GUID"
Template: "455a3e98-a627-4b40-8035-e683a0331ac7"  # Template Field
Path: "/sitecore/templates/Project/yourproject/ComponentName/Content/Title"
SharedFields:
- ID: "ab162cc0-dc80-4abf-8871-998ee5d7ba32"
  Hint: Type
  Value: "Single-Line Text"
- ID: "ba3f86a2-4a1c-4d78-b63d-91c2779c1b5e"
  Hint: __Sortorder
  Value: 100
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "19a69332-a23e-4e70-8d16-b44b38cd8ac2"
      Hint: __Display name
      Value: Title
```

**Common Field Types:**
- Single-Line Text: `"Single-Line Text"`
- Multi-Line Text: `"Multi-Line Text"`
- Rich Text: `"Rich Text"`
- Image: `"Image"`
- General Link: `"General Link"`
- Checkbox: `"Checkbox"`

---

## 4. Content Creation

### 4.1 Create Content Items
Create content in: `TODO/serialization/content/yoursite/Location/Data/ComponentName.yml`

```yaml
---
ID: "UNIQUE-CONTENT-GUID"
Parent: "PARENT-CONTENT-GUID"
Template: "YOUR-COMPONENT-TEMPLATE-GUID"
Path: "/sitecore/content/yoursite/Home/Data/ComponentName"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "TITLE-FIELD-GUID"
      Hint: Title
      Value: "Your Component Title"
    - ID: "DESCRIPTION-FIELD-GUID"
      Hint: Description
      Value: |
        <p>Your rich text content here</p>
    - ID: "IMAGE-FIELD-GUID"
      Hint: Image
      Value: |
        <image mediaid="{MEDIA-ITEM-GUID}" alt="Alt text" />
    - ID: "LINK-FIELD-GUID"
      Hint: Call to Action
      Value: |
        <link text="Click Here" url="/target-page" linktype="internal" />
```

### 4.2 Update Page Layout
Add component to page in: `TODO/serialization/content/yoursite/Home.yml`

Find the `__Renderings` field and add your rendering:
```xml
<r
  uid="{UNIQUE-RENDERING-UID}"
  p:after="r[@uid='{PREVIOUS-RENDERING-UID}']"
  s:ds="local:/Data/ComponentName"
  s:id="{YOUR-RENDERING-GUID}"
  s:par="?Variant={VARIANT-GUID}"
  s:ph="placeholder-name" />
```

---

## 5. Rendering Creation

### 5.1 Create Main Rendering
Create: `TODO/serialization/renderings/Project/yourproject/ComponentName.yml`

```yaml
---
ID: "UNIQUE-RENDERING-GUID"
Parent: "PARENT-FOLDER-GUID"
Template: "04646A89-996F-4EE7-878A-FFDBF1F0EF0D"  # JSON Rendering template
Path: "/sitecore/layout/Renderings/Project/yourproject/ComponentName"
SharedFields:
- ID: "037fe404-dd19-4bf7-8e30-4dadf68b27b0"
  Hint: ComponentName
  Value: "ComponentName"
- ID: "06d5295c-ed2f-4a54-9bf2-26228d113318"
  Hint: __Icon
  Value: "apps/32x32/photo_landscape.png"
- ID: "b5b27af1-25ef-405c-87ce-369b3a004016"
  Hint: Datasource Location
  Value: "./Data"
- ID: "1a7c85e5-dc0b-490d-9187-bb1dbcb4c72f"
  Hint: Datasource Template
  Value: "{YOUR-COMPONENT-TEMPLATE-GUID}"
```

### 5.2 Create Rendering Variants
For each variant, create: `TODO/serialization/renderings/Project/yourproject/ComponentName/VariantName.yml`

```yaml
---
ID: "UNIQUE-VARIANT-GUID"
Parent: "MAIN-RENDERING-GUID"
Template: "04646A89-996F-4EE7-878A-FFDBF1F0EF0D"
Path: "/sitecore/layout/Renderings/Project/yourproject/ComponentName/VariantName"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20241219T120000Z
```

---

## 6. React Component Development

### 6.1 Create Component Structure
```bash
# Create organized folder structure
mkdir -p src/components/category/component-name
cd src/components/category/component-name

# Example for banner components:
mkdir -p src/components/banner/hero-section
mkdir -p src/components/banner/promo-banner

# Example for content components:
mkdir -p src/components/content/rich-text
mkdir -p src/components/content/text-block
```

### 6.2 Create TypeScript Interface
File: `src/components/category/component-name/ComponentName.tsx`

**Example path for HeroSection**: `src/components/banner/hero-section/HeroSection.tsx`

```typescript
import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  RichText as ContentSdkRichText,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import styles from './ComponentName.module.css';

interface Fields {
  Title: Field<string>;
  Description: Field<string>;
  Image: ImageField;
  'Call to Action': LinkField;
}

type ComponentNameProps = ComponentProps & {
  fields: Fields;
};

const ComponentName = (props: ComponentNameProps): JSX.Element => {
  const { fields, params } = props;
  const { styles: componentStyles, RenderingIdentifier: id } = params;

  return (
    <div
      className={`${styles['component-name']} ${componentStyles || ''}`}
      id={id ? `r_${id}` : undefined}
    >
      <ContentSdkRichText
        field={fields.Title}
        className={styles['component-name__title']}
      />
      <ContentSdkRichText
        field={fields.Description}
        className={styles['component-name__description']}
      />
      <ContentSdkImage
        field={fields.Image}
        className={styles['component-name__image']}
      />
      <ContentSdkLink
        field={fields['Call to Action']}
        className={styles['component-name__cta']}
      />
    </div>
  );
};

export default ComponentName;
```

### 6.3 Create CSS Module
File: `src/components/category/component-name/ComponentName.module.css`

**Example path for HeroSection**: `src/components/banner/hero-section/HeroSection.module.css`

```css
.component-name {
  padding: 2rem;
  margin: 1rem 0;
  border-radius: 8px;
  background: #f8f9fa;
}

.component-name__title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.component-name__description {
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #666;
}

.component-name__image {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.component-name__cta {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background 0.3s ease;
}

.component-name__cta:hover {
  background: #0056b3;
  text-decoration: none;
}
```

### 6.4 Create TypeScript Definitions
File: `src/components/category/component-name/ComponentName.module.css.d.ts`

**Example path for HeroSection**: `src/components/banner/hero-section/HeroSection.module.css.d.ts`

```typescript
declare const styles: {
  readonly 'component-name': string;
  readonly 'component-name__title': string;
  readonly 'component-name__description': string;
  readonly 'component-name__image': string;
  readonly 'component-name__cta': string;
};

export default styles;
```

### 6.5 Create Variants
File: `src/components/category/component-name/variants.ts`

**Example path for HeroSection**: `src/components/banner/hero-section/variants.ts`

```typescript
import { VariantDefinition } from '@sitecore-content-sdk/nextjs';
import DefaultComponentName, { HeroComponentName } from './ComponentName';

export const componentNameVariants: VariantDefinition[] = [
  {
    component: DefaultComponentName,
  },
  {
    component: HeroComponentName,
    name: 'Hero',
  },
];

export default componentNameVariants;
```

### 6.6 Register Component
Update `.sitecore/component-map.ts`:

```typescript
// Add import with organized path
import * as ComponentName from 'src/components/category/component-name/ComponentName';

// Example for HeroSection:
import * as HeroSection from 'src/components/banner/hero-section/HeroSection';

// Add to component map
export const componentMap = new Map<string, NextjsContentSdkComponent>([
  // ... existing components
  ['ComponentName', ComponentName],
  ['HeroSection', HeroSection],
]);
```

---

## 7. Deployment & Testing

### 7.1 Push Templates First
```bash
cd TODO
sitecore ser push
```

**Expected Output:**
```
[master] [A] /sitecore/templates/Project/yourproject/ComponentName
[master] [A] /sitecore/templates/Project/yourproject/ComponentName/Content/Title
[master] Changes have been applied to Sitecore
```

### 7.2 Validate and Fix Issues
If you get template ID errors:
```bash
sitecore ser validate --fix
sitecore ser push
```

### 7.3 Test Layout Service
Check if component appears in layout service:
```
https://edge-platform.sitecorecloud.io/v1/content/api/layout/render/jss?sitecoreContextId=YOUR-CONTEXT-ID&item=/yoursite/Home&sc_lang=en&sc_apikey=YOUR-CONTEXT-ID
```

Look for:
```json
{
  "componentName": "ComponentName",
  "dataSource": "/sitecore/content/yoursite/Home/Data/ComponentName",
  "fields": {
    "Title": { "value": "Your Title" }
  }
}
```

### 7.4 Test React Component
```bash
npm run dev
```

Visit your page and verify:
- [ ] Component renders without errors
- [ ] All fields display correctly
- [ ] Styling appears as expected
- [ ] Links work properly
- [ ] Images load correctly

### 7.5 Request Publishing
**Important**: After successful push, ask the user to:

1. **Login to Sitecore Content Editor**
2. **Publish the following items:**
   - Templates: `/sitecore/templates/Project/yourproject/ComponentName`
   - Content: `/sitecore/content/yoursite/Home/Data/ComponentName`
   - Renderings: `/sitecore/layout/Renderings/Project/yourproject/ComponentName`
3. **Test the website**
4. **Verify component appears in Experience Editor**

---

## 8. Troubleshooting

### 8.1 Common Template Issues
**Problem**: Template ID does not exist
```
Template ID a1b2c3d4-e5f6-7890-1234-567890abcdef did not exist
```

**Solution**: Ensure parent templates exist and GUIDs are valid

### 8.2 Common Rendering Issues
**Problem**: Rendering not appearing
- Check ComponentName matches exactly in rendering and component-map.ts
- Verify rendering is registered with correct template ID
- Ensure JSON Rendering template ID is correct: `04646A89-996F-4EE7-878A-FFDBF1F0EF0D`

### 8.3 Common Content Issues
**Problem**: Fields not displaying
- Verify field GUIDs match template field GUIDs
- Check field types are correct
- Ensure content item uses correct template

### 8.4 Common React Issues
**Problem**: Component not rendering
- Check browser console for errors
- Verify component is registered in component-map.ts
- Ensure CSS module imports are correct
- Check if TypeScript compilation errors exist

### 8.5 Debug Layout Service
Add debug logging to component:
```typescript
const ComponentName = (props: ComponentNameProps): JSX.Element => {
  console.log('Component props:', props);
  console.log('Fields:', props.fields);
  // ... rest of component
};
```

---

## Quick Reference

### Essential GUIDs
- **JSON Rendering Template**: `04646A89-996F-4EE7-878A-FFDBF1F0EF0D`
- **Template Template**: `ab86861a-6030-46c5-b394-e8f99e8b87db`
- **Template Field**: `455a3e98-a627-4b40-8035-e683a0331ac7`
- **Single-Line Text**: `Single-Line Text`
- **Rich Text**: `Rich Text`
- **Image**: `Image`
- **General Link**: `General Link`

### File Locations
- **Templates**: `TODO/serialization/templates/Project/yourproject/`
- **Content**: `TODO/serialization/content/yoursite/`
- **Renderings**: `TODO/serialization/renderings/Project/yourproject/`
- **Components**: `src/components/category/component-name/`
- **Component Map**: `.sitecore/component-map.ts`

### Organized Component Examples
- **Banner Components**: `src/components/banner/hero-section/`, `src/components/banner/promo-banner/`
- **Content Components**: `src/components/content/rich-text/`, `src/components/content/text-block/`
- **Navigation Components**: `src/components/navigation/menu/`, `src/components/navigation/breadcrumb/`
- **Layout Components**: `src/components/layout/container/`, `src/components/layout/row-splitter/`

### Commands
```bash
# Pull latest
sitecore ser pull

# Push changes
sitecore ser push

# Validate structure
sitecore ser validate --fix

# Start dev server
npm run dev

# Check CLI version
sitecore --version
```

---

## Reference Implementation: HeroSection Component

This section provides a complete working example based on the HeroSection component implementation in this project.

### 9.1 HeroSection Overview

The HeroSection component demonstrates best practices for:
- **Multiple variants** (Default, Dark, Light)
- **Rich field types** (Text, RichText, Image, Link)
- **Responsive design** with CSS modules
- **Headless variant configuration**
- **Proper Sitecore serialization**
- **Organized folder structure** matching Sitecore rendering categories

### 9.1.1 Component Organization Best Practices

**Folder Structure Alignment**:
```
Sitecore Renderings: serialization/renderings/plus-five-hundred/Banner/HeroSection.yml
React Component:     src/components/banner/hero-section/HeroSection.tsx
```

**Benefits of Organized Structure**:
- **Easy Navigation**: Developers can quickly find related components
- **Logical Grouping**: Components are grouped by their function (banner, content, navigation)
- **Scalability**: Easy to add new components in appropriate categories
- **Maintenance**: Clear separation of concerns and responsibilities
- **Team Collaboration**: Consistent structure across development team

### 9.2 Template Structure

**Main Template**: `serialization/templates/plus-five-hundred/Component/Banner/HeroSection.yml`
```yaml
---
ID: "d3701fac-9f1d-44aa-8326-3dc4c4e08238"
Parent: "8f986080-0bd0-4a43-ac77-5f07914b231d"
Template: "ab86861a-6030-46c5-b394-e8f99e8b87db"
Path: "/sitecore/templates/plus-five-hundred/Component/Banner/HeroSection"
SharedFields:
- ID: "06d5295c-ed2f-4a54-9bf2-26228d113318"
  Hint: __Icon
  Value: "apps/32x32/photo_landscape.png"
```

**Field Templates**:
- `Title.yml`: Single-Line Text field
- `Sub Title.yml`: Single-Line Text field
- `Image.yml`: Image field
- `CTA.yml`: General Link field

### 9.3 React Component Implementation

**File**: `src/components/banner/hero-section/HeroSection.tsx`

```typescript
import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  Text as ContentSdkText,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import styles from './HeroSection.module.css';

interface Fields {
  Title: Field<string>;
  'Sub Title': Field<string>;
  Image: ImageField;
  CTA: LinkField;
}

type HeroSectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: HeroSectionProps): JSX.Element => {
  if (props.fields) {
    return (
      <div className={`component ${styles.heroSection} ${styles['heroSection--default']} ${props.params?.styles || ''}`} id={props.params?.RenderingIdentifier}>
        <div className="component-content">
          <div className={styles.heroSectionContainer}>
            <div className={styles.heroSectionContent}>
              {props.fields.Title?.value && (
                <ContentSdkText
                  field={props.fields.Title}
                  className={styles.heroSectionTitle}
                  tag="h1"
                />
              )}
              {props.fields['Sub Title']?.value && (
                <ContentSdkText
                  field={props.fields['Sub Title']}
                  className={styles.heroSectionSubtitle}
                  tag="h2"
                />
              )}
              {props.fields.CTA?.value && (
                <div className={styles.heroSectionCta}>
                  <ContentSdkLink field={props.fields.CTA} />
                </div>
              )}
            </div>
            {props.fields.Image?.value && (
              <div className={styles.heroSectionImage}>
                <ContentSdkImage field={props.fields.Image} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={`component ${styles.heroSection}`}>
      <div className="component-content">
        <span className="is-empty-hint">HeroSection</span>
      </div>
    </div>
  );
};

export const Dark = (props: HeroSectionProps): JSX.Element => {
  // Similar structure with different CSS class: heroSection--dark
};

export const Light = (props: HeroSectionProps): JSX.Element => {
  // Similar structure with different CSS class: heroSection--light
};
```

### 9.4 CSS Implementation

**File**: `src/components/banner/hero-section/HeroSection.module.css`

```css
/* Base Component Styles */
.heroSection {
  background: #ffffff;
  padding: 80px 0;
  overflow: hidden;
  position: relative;
}

.heroSectionContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Variant-Specific Styles */
.heroSection--default {
  background: #ffffff;
}

.heroSection--dark {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: white;
}

.heroSection--light {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  color: #334155;
}

/* Responsive Design */
@media (max-width: 768px) {
  .heroSectionContainer {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
}
```

### 9.5 Rendering Configuration

**File**: `serialization/renderings/plus-five-hundred/Banner/HeroSection.yml`

```yaml
---
ID: "093f9ed8-fc95-4249-8a05-b93ecf734381"
Parent: "8f986080-0bd0-4a43-ac77-5f07914b231d"
Template: "04646a89-996f-4ee7-878a-ffdbf1f0ef0d"
Path: "/sitecore/layout/Renderings/Project/plus-five-hundred/Banner/HeroSection"
SharedFields:
- ID: "037fe404-dd19-4bf7-8e30-4dadf68b27b0"
  Hint: componentName
  Value: HeroSection
- ID: "1a7c85e5-dc0b-490d-9187-bb1dbcb4c72f"
  Hint: Datasource Template
  Value: "{D3701FAC-9F1D-44AA-8326-3DC4C4E08238}"
```

### 9.6 Headless Variants

**Directory Structure**:
```
serialization/content/plus-five-hundred/plus-five-hundred/Presentation/Headless Variants/HeroSection/
├── Default.yml
├── Dark.yml
└── Light.yml
```

**Example Variant File** (`Default.yml`):
```yaml
---
ID: "b276078b-d536-42ec-ab62-210666722ae0"
Parent: "ac3b62bf-4538-4294-a010-b4f2bc1c618d"
Template: "4d50cdae-c2d9-4de8-b080-8f992bfb1b55"
Path: "/sitecore/content/plus-five-hundred/plus-five-hundred/Presentation/Headless Variants/HeroSection/Default"
```

### 9.7 Content Item Example

**File**: `serialization/content/plus-five-hundred/plus-five-hundred/Home/Data/HeroSection.yml`

```yaml
---
ID: "275fe79a-92c3-4633-a2ca-62d7bde8fdc0"
Parent: "5049a4de-73e4-4511-9f64-7be9787b1fb7"
Template: "d3701fac-9f1d-44aa-8326-3dc4c4e08238"
Path: "/sitecore/content/plus-five-hundred/plus-five-hundred/Home/Data/HeroSection"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "2079f1eb-bb20-4859-8e1b-2d836eb1dfc3"
      Hint: Title
      Value: This is HeroSection Title
    - ID: "130d94fb-4260-4770-ba6b-317759743da9"
      Hint: Sub Title
      Value: This is HeroSection Sub Title
    - ID: "751da837-c7aa-4a39-9d47-546f0a24d356"
      Hint: Image
      Value: |
        <image mediaid="ed58f498-634e-4835-a077-549af5fa9605" />
    - ID: "0a887b1c-5edb-41f4-bc5f-ae91fbb33452"
      Hint: CTA
      Value: |
        <link linktype="internal" id="860a353e-f5b0-42fd-849f-baf5e0c616c6" />
```

### 9.8 Component Registration

**File**: `.sitecore/component-map.ts`

```typescript
import * as HeroSection from 'src/components/banner/hero-section/HeroSection';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  // ... other components
  ['HeroSection', HeroSection],
]);
```

### 9.9 Key Implementation Notes

**Variant Pattern**: Each variant exports a complete component implementation:
```typescript
export const Default = (props) => { /* complete implementation */ };
export const Dark = (props) => { /* complete implementation */ };
export const Light = (props) => { /* complete implementation */ };
```

**CSS Class Naming**: Variants use BEM-style modifiers:
```css
.heroSection--default { /* default styles */ }
.heroSection--dark { /* dark styles */ }
.heroSection--light { /* light styles */ }
```

**Field Editability**: Always use ContentSdk components for editability:
```typescript
// ✅ Correct - editable in XM Cloud
<ContentSdkText field={props.fields.Title} tag="h1" />

// ❌ Wrong - not editable
<h1>{props.fields.Title.value}</h1>
```

**Case Sensitivity**: Ensure variant file names match React exports:
- Files: `Default.yml`, `Dark.yml`, `Light.yml`
- Exports: `Default`, `Dark`, `Light`

### 9.10 Testing Checklist

- [ ] All three variants render correctly
- [ ] Variants are selectable in XM Cloud page editor
- [ ] All fields are editable in Experience Editor
- [ ] CSS responsive behavior works
- [ ] Layout Service returns correct data
- [ ] No console errors in browser
- [ ] Component registration successful

---

## Success Checklist

- [ ] Templates created and pushed successfully
- [ ] Content items created with proper field values
- [ ] Rendering definitions created with correct ComponentName
- [ ] React component created with proper TypeScript interfaces
- [ ] CSS styling implemented
- [ ] Component registered in component-map.ts
- [ ] Layout service returns component data
- [ ] Component renders on website without errors
- [ ] All fields display correctly
- [ ] User has been asked to publish items in Sitecore
- [ ] Testing completed successfully

Remember: Always test thoroughly and ask the user to publish content in Sitecore after successful deployment!

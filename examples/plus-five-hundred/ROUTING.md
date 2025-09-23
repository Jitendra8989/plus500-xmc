# Plus500 Multisite Routing Documentation

## Overview
This document provides a comprehensive guide to the multisite routing system implemented for the Plus500 platform. The routing handles multiple regions (US, AE, RO) and languages (English, Arabic, Chinese, Romanian) with dynamic configuration via environment variables.

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [URL Structure](#url-structure)
3. [Environment Configuration](#environment-configuration)
4. [Implementation Details](#implementation-details)
5. [Request Flow](#request-flow)
6. [Debugging](#debugging)
7. [Common Issues](#common-issues)
8. [Testing Guide](#testing-guide)

## Architecture Overview

The routing system consists of several layers:
1. **Next.js Configuration** - Disables built-in i18n for custom routing
2. **Sitecore Multisite Middleware** - Rewrites URLs with `_site_` prefix
3. **Custom Route Resolution** - `resolveSiteContext()` function
4. **Dynamic Site Discovery** - Reads from `sites.json` and environment variables
5. **GraphQL API Calls** - Maps to correct Sitecore site and language

## URL Structure

### Domain: `plus500.com`

| URL Pattern | Region | Language | Sitecore Site | GraphQL Language |
|-------------|--------|----------|---------------|------------------|
| `plus500.com/` | US (Primary) | English | `plus-five-hundred-US` | `en` |
| `plus500.com/en-us/` | US | English | `plus-five-hundred-US` | `en` |
| `plus500.com/cn-us/` | US | Chinese | `plus-five-hundred-US` | `cn` |
| `plus500.com/ar-ae/` | AE | Arabic | `plus-five-hundred-AE` | `ar-AE` |
| `plus500.com/en-ae/` | AE | English | `plus-five-hundred-AE` | `en` |
| `plus500.com/cn-ae/` | AE | Chinese | `plus-five-hundred-AE` | `cn` |
| `plus500.com/ro-ro/` | RO | Romanian | `plus-five-hundred-RO` | `ro` |
| `plus500.com/en-ro/` | RO | English | `plus-five-hundred-RO` | `en` |
| `plus500.com/cn-ro/` | RO | Chinese | `plus-five-hundred-RO` | `cn` |

## Environment Configuration

All routing behavior is controlled via environment variables in `.env`:

### Core Configuration
```bash
# Default routing settings
NEXT_PUBLIC_DEFAULT_SITE=plus-five-hundred-US
NEXT_PUBLIC_DEFAULT_REGION=us
NEXT_PUBLIC_DEFAULT_LANGUAGE=en

# Available options (comma-separated)
NEXT_PUBLIC_AVAILABLE_LANGUAGES=ar,en,cn,ro
NEXT_PUBLIC_AVAILABLE_REGIONS=us,ae,ro

# Special language mappings
NEXT_PUBLIC_ARABIC_LANGUAGE_CODE=ar-AE
```

### Adding New Regions/Languages
```bash
# To add new language
NEXT_PUBLIC_AVAILABLE_LANGUAGES=ar,en,cn,ro,es,fr

# To add new region
NEXT_PUBLIC_AVAILABLE_REGIONS=us,ae,ro,uk,de

# Update default if needed
NEXT_PUBLIC_DEFAULT_SITE=plus-five-hundred-UK
```

**Note**: New regions must also be added to `.sitecore/sites.json` with corresponding site configurations.

## Request Flow

### 1. Next.js Configuration (`next.config.js`)
- **i18n disabled** - Prevents Next.js from auto-handling language routing
- Custom rewrites for API endpoints only
- Allows full control over language-region URL structure

### 2. Sitecore Multisite Middleware
Automatically rewrites incoming requests:
```
/ar-AE/about → /_site_plus-five-hundred/ar-AE/about
/en-US/      → /_site_plus-five-hundred/en-US/
/            → /_site_plus-five-hundred/
```

### 3. Custom Route Resolution Process

#### Step 1: Input Processing
```javascript
// Input: ['_site_plus-five-hundred', 'ar-AE', 'about']
// After cleanup: ['ar-AE', 'about']
```

#### Step 2: Pattern Matching
The system checks patterns in this priority order:

1. **Language-Region Prefix** (e.g., `ar-ae`, `en-us`)
   - Highest priority
   - Maps to specific site and language

2. **Language-Only** (e.g., `ar`, `en`)
   - Uses default region (US)
   - Applies specified language

3. **Region-Only** (e.g., `ae`, `us`)
   - Uses region's default language from sites.json
   - Maps to region-specific site

4. **Fallback**
   - Treats as content path on default site
   - Uses default region and language

#### Step 3: Site and Language Mapping
```javascript
// Dynamic site map built from sites.json:
{
  us: { siteName: 'plus-five-hundred-US', language: 'en' },
  ae: { siteName: 'plus-five-hundred-AE', language: 'ar-AE' },
  ro: { siteName: 'plus-five-hundred-RO', language: 'en' }
}

// Language mapping:
ar → ar-AE (special case for GraphQL compatibility)
en → en
cn → cn
ro → ro
```

### 4. GraphQL API Call
Final result passed to Sitecore:
```javascript
{
  siteName: 'plus-five-hundred-AE',
  language: 'ar-AE',
  itemPath: '/about'
}
```

## Implementation Details

### Core Function: `resolveSiteContext()`

Located in `src/pages/[[...path]].tsx:25-120`

#### Key Features:

1. **Sitecore Multisite Middleware Handling**
   - Automatically strips `_site_plus-five-hundred` prefix from rewritten URLs
   - Handles case-insensitive language-region codes (`en-US` → `en-us`)

2. **Site Mapping**
   ```typescript
   const siteMap = {
     us: 'plus-five-hundred-US',
     ae: 'plus-five-hundred-AE',
     ro: 'plus-five-hundred-RO',
   };
   ```

3. **Language Mapping**
   - Special handling for Arabic AE: `ar-ae` → `ar-AE` (for GraphQL compatibility)
   - All other languages use the first part of the language-region code

4. **Valid URL Prefixes**
   ```typescript
   const validPrefixes = [
     'en-us', 'cn-us',        // US region
     'ar-ae', 'en-ae', 'cn-ae', // AE region
     'ro-ro', 'en-ro', 'cn-ro'  // RO region
   ];
   ```

### Routing Logic Flow

1. **Input Processing**
   - Receives path array from Next.js (e.g., `['_site_plus-five-hundred', 'en-US']`)
   - Strips Sitecore `_site_` prefix if present
   - Normalizes case to lowercase

2. **Route Resolution**
   - **Root path** (`/`) → Default to US English
   - **Valid prefix** → Parse language-region, map to site
   - **Invalid prefix** → Treat as content path on default US site

3. **Output**
   ```typescript
   {
     siteName: string,    // Sitecore site name
     language: string,    // Language code for GraphQL
     itemPath: string     // Content path for API call
   }
   ```

## Example API Calls

### US Region Pages
```graphql
query ContentSdkLayoutQuery {
  layout(site: "plus-five-hundred-US", routePath: "/", language: "en") {
    item { rendered }
  }
}
```

### AE Region Pages
```graphql
query ContentSdkLayoutQuery {
  layout(site: "plus-five-hundred-AE", routePath: "/", language: "ar-AE") {
    item { rendered }
  }
}
```

## Debugging

Comprehensive logging is enabled in development. Look for these log markers:

- `🚀 === GET STATIC PROPS START ===` - Entry point
- `🔧 DETECTED SITECORE MULTISITE REWRITE` - Middleware handling
- `VALID PREFIX DETECTED` - Successful language-region parsing
- `SPECIAL MAPPING: Arabic AE -> ar-AE` - Language conversion
- `🌐 Making Sitecore API call with:` - Final API parameters

## Debugging

Comprehensive logging is enabled in development mode. The logs follow this pattern:

### Key Log Markers
- `🚀 === GET STATIC PROPS START ===` - Entry point
- `🔧 DETECTED SITECORE MULTISITE REWRITE` - Middleware handling
- `VALID PREFIX DETECTED` - Successful language-region parsing
- `LANGUAGE-ONLY URL DETECTED` - Single language segment
- `REGION-ONLY URL DETECTED` - Single region segment
- `ARABIC MAPPING: ar -> ar-AE` - Language conversion
- `🌐 Making Sitecore API call with:` - Final API parameters

### Sample Debug Output
```
=== RESOLVE SITE CONTEXT START ===
Input path array: ['_site_plus-five-hundred', 'ar-AE', 'about']
Environment config: { defaultSite: 'plus-five-hundred-US', ... }
🔧 DETECTED SITECORE MULTISITE REWRITE
Cleaned path: ['ar-AE', 'about']
VALID PREFIX DETECTED
Parsed lang: ar, region: ae
ARABIC MAPPING: ar -> ar-AE
Final result: { siteName: 'plus-five-hundred-AE', language: 'ar-AE', itemPath: '/about' }
```

## Common Issues & Solutions

### 1. **i18n Conflict**
**Problem**: Next.js i18n enabled, stripping language codes from URLs
**Solution**: Disable i18n in `next.config.js`
```javascript
// Comment out or remove:
// i18n: { locales: ['en','ar-AE'], defaultLocale: 'en' }
```

### 2. **Missing Language-Region in Path**
**Problem**: Raw path array missing expected segments
**Symptoms**: `['_site_plus-five-hundred']` instead of `['_site_plus-five-hundred', 'ar-AE']`
**Solution**: Check middleware configuration and ensure i18n is disabled

### 3. **404 Errors**
**Problem**: URL pattern not recognized
**Debug Steps**:
1. Check if language-region is in environment variables
2. Verify sites.json contains matching site entry
3. Confirm valid prefixes include the combination

### 4. **Wrong Language Served**
**Problem**: Correct site but wrong language content
**Debug Steps**:
1. Check language mapping in logs
2. Verify Arabic special case handling (`ar → ar-AE`)
3. Confirm GraphQL query uses expected language code

### 5. **API Failures**
**Problem**: Sitecore returns null/404
**Debug Steps**:
1. Verify site names match exactly between routing and Sitecore
2. Check language format matches Sitecore expectations
3. Confirm content exists for that site/language combination

### 6. **Environment Variables Not Loading**
**Problem**: Default hardcoded values being used
**Solution**:
1. Restart development server after .env changes
2. Ensure variables start with `NEXT_PUBLIC_` for client-side access
3. Check environment config in debug logs

## Testing Guide

### URL Test Matrix
| URL | Expected Site | Expected Language | Expected Path |
|-----|---------------|-------------------|---------------|
| `/` | plus-five-hundred-US | en | / |
| `/ar-AE` | plus-five-hundred-AE | ar-AE | / |
| `/en-US` | plus-five-hundred-US | en | / |
| `/ar-AE/about` | plus-five-hundred-AE | ar-AE | /about |
| `/ar` | plus-five-hundred-US | ar-AE | / |
| `/AE` | plus-five-hundred-AE | ar-AE | / |
| `/invalid` | plus-five-hundred-US | en | /invalid |

### Testing Steps
1. **Start dev server**: `npm run dev`
2. **Open browser console** to view routing logs
3. **Test each URL** and verify:
   - Correct site resolution in logs
   - Expected language mapping
   - Proper API calls to Sitecore
   - Content loads successfully

### GraphQL Query Verification
For each test, verify the final GraphQL query matches expectations:

```graphql
# For /ar-AE/about
query ContentSdkLayoutQuery {
  layout(site: "plus-five-hundred-AE", routePath: "/about", language: "ar-AE") {
    item { rendered }
  }
}
```

## Files Modified

- **`src/pages/[[...path]].tsx`** - Main routing logic with environment variable integration
- **`.env`** - Routing configuration variables
- **`next.config.js`** - Disabled i18n for custom routing
- **`ROUTING.md`** - This documentation file

## Maintenance

### Adding New Regions
1. Add site to `.sitecore/sites.json`
2. Update `NEXT_PUBLIC_AVAILABLE_REGIONS` in `.env`
3. No code changes required - routing is fully dynamic

### Adding New Languages
1. Update `NEXT_PUBLIC_AVAILABLE_LANGUAGES` in `.env`
2. Add special language mapping if needed (like Arabic)
3. Ensure Sitecore supports the language code format

### Performance Considerations
- Site map is built dynamically on each request
- Consider caching for production environments
- Monitor GraphQL query performance for multiple sites

---

*Last updated: [Current Date]*
*Version: 2.0 (Environment Variable Integration)*
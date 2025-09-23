# Deployment Guide

This guide covers how to deploy the Plus500 Financial Trading Platform to Vercel or other hosting platforms.

## Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/your-repo/tree/main/examples/plus-five-hundred)

## Environment Variables

### Required for Sitecore Integration

Set these in your Vercel dashboard or hosting platform:

```bash
# Sitecore Configuration
SITECORE_EDGE_CONTEXT_ID=your-actual-context-id
NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID=your-actual-context-id
SITECORE_EDITING_SECRET=your-actual-editing-secret
SITECORE_SITE_NAME=plus-five-hundred-US

# Site Configuration
NEXT_PUBLIC_DEFAULT_SITE_NAME=plus-five-hundred-US
NEXT_PUBLIC_DEFAULT_LANGUAGE=en
NEXT_PUBLIC_DEFAULT_SITE=plus-five-hundred-US
NEXT_PUBLIC_DEFAULT_REGION=us

# Languages and Regions
NEXT_PUBLIC_AVAILABLE_LANGUAGES=ar,en,cn,ro
NEXT_PUBLIC_AVAILABLE_REGIONS=us,ae,ro
NEXT_PUBLIC_LANGUAGE_MAPPINGS=ar=ar-AE,ro=ro-RO,en=en,cn=cn

# Optional API Keys
NEXT_PUBLIC_FINNHUB_API_KEY=your-finnhub-api-key
```

### Optional Environment Variables

```bash
# Sitecore Personalize (optional)
NEXT_PUBLIC_PERSONALIZE_SCOPE=your-personalize-scope

# API Timeouts (optional, defaults to 400ms)
PERSONALIZE_MIDDLEWARE_CDP_TIMEOUT=400
PERSONALIZE_MIDDLEWARE_EDGE_TIMEOUT=400

# Design Library (optional)
SITECORE_AUTH_CLIENT_ID=your-client-id
SITECORE_AUTH_CLIENT_SECRET=your-client-secret
```

## Manual Deployment Steps

### 1. Clone and Setup

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo/examples/plus-five-hundred
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
# Edit .env.local with your actual values
```

### 3. Build and Test

```bash
npm run build
npm start
```

### 4. Deploy

#### Vercel

```bash
npm install -g vercel
vercel --prod
```

#### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=.next
```

#### Docker

```bash
docker build -t plus500-app .
docker run -p 3000:3000 plus500-app
```

## Build Configuration

The project uses:

- **Next.js 15.x** with App Router
- **TypeScript** with path mapping
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Sitecore Content SDK** for content management

## Path Mapping

The project uses TypeScript path mapping for clean imports:

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "lib/*": ["src/lib/*"],
      "components/*": ["src/components/*"]
    }
  }
}
```

This is automatically resolved by Next.js during build.

## Production Considerations

### Performance

- Images are optimized via Next.js Image component
- Static assets are served from `/public`
- Code splitting is handled automatically
- Bundle analysis available via `npm run analyze`

### Security

- Environment variables are validated at build time
- Sensitive data is kept in `.env.local` (not committed)
- CORS is configured for Sitecore domains only
- CSP headers are configured in `next.config.js`

### Monitoring

- Health check endpoint: `/api/healthz`
- Structured logging via debug module
- Error boundaries for React components

## Troubleshooting

### Build Issues

1. **TypeScript path mapping errors**: Ensure `baseUrl` is set to `"."` in `tsconfig.json`
2. **Environment variable issues**: Check that all required vars are set in deployment platform
3. **Sitecore connection issues**: Verify your Context ID and endpoint configuration

### Runtime Issues

1. **404 errors**: Check your routing configuration in `[[...path]].tsx`
2. **Image loading issues**: Verify image domains in `next.config.js`
3. **API timeouts**: Adjust timeout values in environment variables

## Support

For deployment issues:

1. Check the [Next.js deployment documentation](https://nextjs.org/docs/deployment)
2. Review [Vercel deployment guides](https://vercel.com/docs)
3. Check [Sitecore Content SDK documentation](https://doc.sitecore.com/xmc/en/developers/content-sdk/)